const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const Property = require('../models/Property');
const Inquiry = require('../models/Inquiry');

const resend = new Resend(process.env.RESEND_API_KEY);

// GET /api/properties — fetch all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/properties/:id — fetch a single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/properties/interest — save inquiry and send email to admin
router.post('/interest', async (req, res) => {
  const { name, email, phone, message, propertyId } = req.body;

  try {
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ error: 'Property not found' });

    // Save inquiry to database first (always, even if email fails)
    const inquiry = new Inquiry({ name, email, phone, message, property: propertyId });
    await inquiry.save();

    // Send email via Resend if configured
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_your_api_key_here') {
      const locationDisplay = property.city && property.state
        ? `${property.city}, ${property.state}`
        : property.location || 'N/A';

      const isTestMode = (process.env.EMAIL_FROM || '').includes('resend.dev');

      // ── 1. Notify the admin ──────────────────────────────────────────────────
      const { error: adminEmailError } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: [process.env.ADMIN_EMAIL],
        replyTo: email,
        subject: `New Enquiry: ${property.name} — ${locationDisplay}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
              <tr><td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

                  <!-- Header -->
                  <tr>
                    <td style="background:#111111;padding:32px 40px;">
                      <p style="margin:0;color:#ffffff;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;opacity:0.5;">ShivshaktiProperties</p>
                      <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:900;letter-spacing:-0.5px;">New Property Enquiry</h1>
                    </td>
                  </tr>

                  <!-- Property Info -->
                  <tr>
                    <td style="padding:32px 40px 0;">
                      <p style="margin:0 0 16px;font-size:10px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:0.25em;border-bottom:1px solid #f0f0f0;padding-bottom:12px;">Property of Interest</p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:8px 0;color:#999;font-size:12px;width:120px;">Name</td>
                          <td style="padding:8px 0;font-weight:700;font-size:14px;color:#111;">${property.name}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#999;font-size:12px;">Location</td>
                          <td style="padding:8px 0;font-size:13px;color:#333;">${locationDisplay}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#999;font-size:12px;">Category</td>
                          <td style="padding:8px 0;font-size:13px;color:#333;text-transform:capitalize;">${property.category}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#999;font-size:12px;">Type</td>
                          <td style="padding:8px 0;font-size:13px;color:#333;text-transform:capitalize;">${property.type}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Enquirer Info -->
                  <tr>
                    <td style="padding:28px 40px 0;">
                      <p style="margin:0 0 16px;font-size:10px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:0.25em;border-bottom:1px solid #f0f0f0;padding-bottom:12px;">Enquirer Details</p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:8px 0;color:#999;font-size:12px;width:120px;">Name</td>
                          <td style="padding:8px 0;font-weight:700;font-size:14px;color:#111;">${name}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#999;font-size:12px;">Email</td>
                          <td style="padding:8px 0;font-size:13px;"><a href="mailto:${email}" style="color:#111;text-decoration:none;">${email}</a></td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#999;font-size:12px;">Phone</td>
                          <td style="padding:8px 0;font-size:13px;"><a href="tel:${phone}" style="color:#111;text-decoration:none;">${phone}</a></td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Message -->
                  <tr>
                    <td style="padding:28px 40px;">
                      <p style="margin:0 0 12px;font-size:10px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:0.25em;border-bottom:1px solid #f0f0f0;padding-bottom:12px;">Message</p>
                      <p style="margin:0;font-size:14px;color:#444;line-height:1.7;background:#f9f9f9;padding:20px;border-radius:10px;border-left:3px solid #111;">${message}</p>
                    </td>
                  </tr>

                  <!-- Reply CTA -->
                  <tr>
                    <td style="padding:0 40px 32px;">
                      <a href="mailto:${email}?subject=Re: Enquiry about ${encodeURIComponent(property.name)}"
                         style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">
                        Reply to ${name}
                      </a>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #f0f0f0;">
                      <p style="margin:0;font-size:10px;color:#bbb;text-align:center;letter-spacing:0.1em;">ShivshaktiProperties · Admin Notification · Do not reply directly to this email</p>
                    </td>
                  </tr>

                </table>
              </td></tr>
            </table>
          </body>
          </html>
        `,
      });

      if (adminEmailError) {
        console.error('Resend admin email error:', adminEmailError);
      }

      // ── 2. Confirm to the user that their enquiry was received ───────────────
      if (!isTestMode) {
        const { error: userEmailError } = await resend.emails.send({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          to: [email],
          replyTo: process.env.ADMIN_EMAIL,
          subject: `We received your enquiry about ${property.name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
            <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
                <tr><td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

                    <!-- Header -->
                    <tr>
                      <td style="background:#111111;padding:32px 40px;">
                        <p style="margin:0;color:#ffffff;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;opacity:0.5;">ShivshaktiProperties</p>
                        <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:900;letter-spacing:-0.5px;">Enquiry Received</h1>
                      </td>
                    </tr>

                    <!-- Thank you message -->
                    <tr>
                      <td style="padding:36px 40px 20px;">
                        <p style="margin:0 0 12px;font-size:16px;color:#111;font-weight:700;">Hi ${name},</p>
                        <p style="margin:0;font-size:14px;color:#555;line-height:1.7;">
                          Thank you for your enquiry. We have received your message regarding
                          <strong style="color:#111;">${property.name}</strong> and our team will get back to you shortly.
                        </p>
                      </td>
                    </tr>

                    <!-- Property summary -->
                    <tr>
                      <td style="padding:0 40px 32px;">
                        <div style="background:#f9f9f9;border-radius:12px;padding:24px;border:1px solid #eee;">
                          <p style="margin:0 0 16px;font-size:10px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:0.25em;">Property You Enquired About</p>
                          <p style="margin:0 0 6px;font-size:17px;font-weight:900;color:#111;letter-spacing:-0.3px;">${property.name}</p>
                          <p style="margin:0 0 4px;font-size:12px;color:#888;">
                            📍 ${property.city && property.state ? `${property.city}, ${property.state}` : property.location || ''}
                          </p>
                          <p style="margin:8px 0 0;">
                            <span style="display:inline-block;background:#111;color:#fff;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:4px 12px;border-radius:20px;">${property.type}</span>
                            <span style="display:inline-block;background:#eee;color:#555;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:4px 12px;border-radius:20px;margin-left:6px;">${property.category}</span>
                          </p>
                        </div>
                      </td>
                    </tr>

                    <!-- Your message recap -->
                    <tr>
                      <td style="padding:0 40px 36px;">
                        <p style="margin:0 0 12px;font-size:10px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:0.25em;">Your Message</p>
                        <p style="margin:0;font-size:14px;color:#444;line-height:1.7;background:#f9f9f9;padding:20px;border-radius:10px;border-left:3px solid #111;">${message}</p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #f0f0f0;">
                        <p style="margin:0;font-size:11px;color:#999;line-height:1.6;">
                          If you have additional questions, simply reply to this email.<br/>
                          <span style="color:#bbb;font-size:10px;">ShivshaktiProperties · This is an automated confirmation</span>
                        </p>
                      </td>
                    </tr>

                  </table>
                </td></tr>
              </table>
            </body>
            </html>
          `,
        });

        if (userEmailError) {
          console.error('Resend user confirmation error:', userEmailError);
        }
      } else {
        console.log(`Skipping user confirmation email (to ${email}) as Resend is in test mode (onboarding@resend.dev).`);
      }

    } else {
      console.warn('RESEND_API_KEY not configured — inquiry saved but emails not sent.');
    }


    res.json({ success: true });
  } catch (err) {
    console.error('Error in /interest:', err);
    res.status(500).json({ error: 'Failed to process enquiry' });
  }
});

module.exports = router;