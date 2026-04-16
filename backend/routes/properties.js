const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Property = require('../models/Property');
const Inquiry = require('../models/Inquiry');

// GET /api/properties - fetch all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/properties/interest - send interest email and save inquiry
router.post('/interest', async (req, res) => {
  const { name, email, phone, message, propertyId } = req.body;
  try {
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ error: 'Property not found' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Interest in ${property.name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\nProperty: ${property.name} (${property.location})`,
    };

    // Save inquiry to database
    const inquiry = new Inquiry({
      name,
      email,
      phone,
      message,
      property: propertyId,
    });
    await inquiry.save();

    res.json({ success: true });
  } catch (err) {
    console.error('Error in /interest:', err);
    res.status(500).json({ error: 'Failed to process interest' });
  }
});

module.exports = router;