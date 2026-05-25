const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Admin = require('../models/Admin');
const Property = require('../models/Property');
const Inquiry = require('../models/Inquiry');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Accept both images and videos as file fields
const upload = multer();

// Helper: upload a buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.cookie('token', token, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' 
  });
  res.json({ success: true });
});

// POST /api/admin/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' 
  });
  res.json({ success: true });
});

// GET /api/admin/analytics (protected)
router.get('/analytics', auth, async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();
    const pendingInquiries = await Inquiry.countDocuments({ responded: false });

    const properties = await Property.find({}, 'createdAt category');
    const monthlyGroups = {};
    const typeGroups = {};

    properties.forEach(p => {
      const month = p.createdAt.toLocaleString('default', { month: 'short' });
      monthlyGroups[month] = (monthlyGroups[month] || 0) + 1;
      const type = p.category || 'Other';
      typeGroups[type] = (typeGroups[type] || 0) + 1;
    });

    const monthlyData = Object.entries(monthlyGroups).map(([month, count]) => ({ month, count }));
    const typeData = Object.entries(typeGroups).map(([name, value]) => ({ name, value }));

    res.json({ totalProperties, totalInquiries, pendingInquiries, monthly: monthlyData, types: typeData });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// GET /api/admin/properties (protected)
router.get('/properties', auth, async (req, res) => {
  const properties = await Property.find().sort({ createdAt: -1 });
  res.json(properties);
});

// POST /api/admin/properties (protected) — handles images + videos
router.post('/properties', auth, upload.fields([{ name: 'images' }, { name: 'videos' }]), async (req, res) => {
  try {
    let imageUrls = [];
    let videoUrls = [];

    if (req.files?.images?.length > 0) {
      for (const file of req.files.images) {
        const result = await uploadToCloudinary(file.buffer, { folder: 'properties/images', resource_type: 'image' });
        imageUrls.push(result.secure_url);
      }
    }

    if (req.files?.videos?.length > 0) {
      for (const file of req.files.videos) {
        const result = await uploadToCloudinary(file.buffer, { folder: 'properties/videos', resource_type: 'video' });
        videoUrls.push(result.secure_url);
      }
    }

    const { name, description, city, state, lat, lng, type, category, amenities } = req.body;

    const property = new Property({
      name,
      description,
      city,
      state,
      coordinates: lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : undefined,
      type,
      category,
      amenities: amenities ? amenities.split(',').map(a => a.trim()).filter(Boolean) : [],
      images: imageUrls,
      videos: videoUrls,
    });

    await property.save();
    res.json(property);
  } catch (err) {
    console.error('Add property error:', err);
    res.status(400).json({ error: 'Failed to add property', details: err.message });
  }
});

// PUT /api/admin/properties/:id (protected)
router.put('/properties/:id', auth, upload.fields([{ name: 'images' }, { name: 'videos' }]), async (req, res) => {
  try {
    const existing = await Property.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Property not found' });

    let imageUrls = existing.images || [];
    let videoUrls = existing.videos || [];

    const removedImages = req.body.removedImages ? JSON.parse(req.body.removedImages) : [];

    if (removedImages.length > 0) {
      for (const url of removedImages) {
        try {
          const urlObj = new URL(url);
          const pathParts = urlObj.pathname.split('/');
          const uploadIndex = pathParts.findIndex(p => p === 'upload');
          if (uploadIndex !== -1 && pathParts.length > uploadIndex + 2) {
            // Check if the next part is a version number (v followed by digits)
            // Sometimes there is no version number, so we need to be careful
            let startIndex = uploadIndex + 1;
            if (pathParts[startIndex].match(/^v\d+$/)) {
              startIndex++;
            }
            const relevantParts = pathParts.slice(startIndex);
            const fullPath = relevantParts.join('/');
            const publicId = fullPath.substring(0, fullPath.lastIndexOf('.'));
            
            if (publicId) {
              await cloudinary.uploader.destroy(publicId);
            }
          }
        } catch (err) {
          console.error('Failed to delete image from Cloudinary:', err);
        }
      }
      imageUrls = imageUrls.filter(url => !removedImages.includes(url));
    }

    if (req.files?.images?.length > 0) {
      for (const file of req.files.images) {
        const result = await uploadToCloudinary(file.buffer, { folder: 'properties/images', resource_type: 'image' });
        imageUrls.push(result.secure_url);
      }
    }

    if (req.files?.videos?.length > 0) {
      for (const file of req.files.videos) {
        const result = await uploadToCloudinary(file.buffer, { folder: 'properties/videos', resource_type: 'video' });
        videoUrls.push(result.secure_url);
      }
    }

    const { name, description, city, state, lat, lng, type, category, amenities } = req.body;

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name }),
        ...(description && { description }),
        ...(city && { city }),
        ...(state && { state }),
        ...(lat && lng && { coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) } }),
        ...(type && { type }),
        ...(category && { category }),
        ...(amenities && { amenities: amenities.split(',').map(a => a.trim()).filter(Boolean) }),
        images: imageUrls,
        videos: videoUrls,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error('Update property error:', err);
    res.status(400).json({ error: 'Failed to update property', details: err.message });
  }
});

// DELETE /api/admin/properties/:id (protected)
router.delete('/properties/:id', auth, async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// GET /api/admin/inquiries (protected)
router.get('/inquiries', auth, async (req, res) => {
  const inquiries = await Inquiry.find().populate('property').sort({ createdAt: -1 });
  res.json(inquiries);
});

// PUT /api/admin/inquiries/:id/responded (protected)
router.put('/inquiries/:id/responded', auth, async (req, res) => {
  const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { responded: true }, { new: true });
  res.json(inquiry);
});

// DELETE /api/admin/inquiries/:id (protected)
router.delete('/inquiries/:id', auth, async (req, res) => {
  await Inquiry.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// TEMPORARY: Create admin user (remove after use)
router.post('/create', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = new Admin({ email, password });
    await admin.save();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Could not create admin', details: err.message });
  }
});

module.exports = router;