const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/contact - handle contact form submissions
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const inquiry = new Inquiry({ name, email, phone, message });
    await inquiry.save();
    // Send admin notification email using Resend
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      try {
        const adminEmail = await resend.emails.send({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          to: [process.env.ADMIN_EMAIL],
          subject: `New Contact Request from ${name}`,
          html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Message:</strong> ${message}</p>`
        });
        if (adminEmail.error) {
          console.error('Resend admin email error:', adminEmail.error);
        }
      } catch (emailErr) {
        console.error('Error sending admin email:', emailErr);
      }
    }
    res.json({ success: true, message: 'Contact request submitted successfully.' });
  } catch (err) {
    console.error('Error in /api/contact:', err);
    res.status(500).json({ error: 'Failed to process contact request.' });
  }
});

module.exports = router;
