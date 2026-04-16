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

const upload = multer();

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  res.json({ success: true });
});

// POST /api/admin/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

// GET /api/admin/analytics (protected)
router.get('/analytics', auth, async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();
    const pendingInquiries = await Inquiry.countDocuments({ responded: false });

    // Simple monthly aggregation for properties
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

    res.json({
      totalProperties,
      totalInquiries,
      pendingInquiries,
      monthly: monthlyData,
      types: typeData,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// GET /api/admin/properties (protected)
router.get('/properties', auth, async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

// POST /api/admin/properties (protected)
router.post('/properties', auth, upload.array('images'), async (req, res) => {
  try {
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream({ folder: 'properties' }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
        imageUrls.push(result.secure_url);
      }
    }
    const property = new Property({
      ...req.body,
      images: imageUrls,
      amenities: req.body.amenities ? req.body.amenities.split(',').map(a => a.trim()) : [],
    });
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add property', details: err.message });
  }
});

// PUT /api/admin/properties/:id (protected)
router.put('/properties/:id', auth, async (req, res) => {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(property);
});

// DELETE /api/admin/properties/:id (protected)
router.delete('/properties/:id', auth, async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// GET /api/admin/inquiries (protected)
router.get('/inquiries', auth, async (req, res) => {
  const inquiries = await Inquiry.find().populate('property');
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