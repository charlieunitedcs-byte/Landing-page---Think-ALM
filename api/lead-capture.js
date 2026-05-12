import nodemailer from 'nodemailer';

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const {
      fullName,
      workEmail,
      phone,
      agencyName,
      databaseSize,
      crm,
      priorities,
      message,
      consentGiven,
      utmSource,
      utmMedium,
      utmCampaign,
      pageUrl,
      submittedAt,
    } = req.body || {};

    if (!fullName || !workEmail) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
      return res.status(500).json({
        success: false,
        error: 'Email service is not configured on the server',
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587', 10),
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    const safePriorities = Array.isArray(priorities) ? priorities : [];
    const submittedTime = submittedAt || new Date().toISOString();
    const siteUrl = (process.env.PUBLIC_SITE_URL || 'https://www.thinkalm.com.au').replace(/\/$/, '');
    const auditUrl = `${siteUrl}/audit/your-dormant-database-audit.pdf`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"ThinkALM" <noreply@thinkalm.com.au>',
      to: process.env.ADMIN_EMAIL || 'charlie@thinkalm.ai',
      subject: 'New Website Lead Form Submission',
      html: `
        <h2>New Think ALM Lead</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${workEmail}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Agency:</strong> ${agencyName || 'Not provided'}</p>
        <p><strong>Database size:</strong> ${databaseSize || 'Not provided'}</p>
        <p><strong>CRM:</strong> ${crm || 'Not provided'}</p>
        <p><strong>Priorities:</strong> ${safePriorities.length ? safePriorities.join(', ') : 'Not provided'}</p>
        <p><strong>Message:</strong> ${message || 'Not provided'}</p>
        <hr />
        <p><strong>UTM Source:</strong> ${utmSource || 'N/A'}</p>
        <p><strong>UTM Medium:</strong> ${utmMedium || 'N/A'}</p>
        <p><strong>UTM Campaign:</strong> ${utmCampaign || 'N/A'}</p>
        <p><strong>Page URL:</strong> ${pageUrl || 'N/A'}</p>
        <p><strong>Submitted At:</strong> ${submittedTime}</p>
      `,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"ThinkALM" <noreply@thinkalm.com.au>',
      to: workEmail,
      subject: 'Your Dormant Database Audit - Think ALM',
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #1f2937;">
          <h2 style="margin-bottom: 8px;">Thanks ${fullName}, your audit is ready.</h2>
          <p>We've attached your Dormant Database Audit to this email.</p>
          <p>If the attachment does not open, use this secure link:</p>
          <p>
            <a href="${auditUrl}" style="display:inline-block; background:#0f172a; color:#fff; text-decoration:none; padding:12px 18px; border-radius:8px; font-weight:600;">
              Download Audit PDF
            </a>
          </p>
          <p>Want help applying this to your agency? Book a strategy call:</p>
          <p>
            <a href="https://calendly.com/charlie-thinkalm/30min" style="display:inline-block; background:#2CC5A1; color:#fff; text-decoration:none; padding:12px 18px; border-radius:8px; font-weight:600;">
              Book Free Demo
            </a>
          </p>
          <p>Regards,<br />Think ALM Team</p>
        </div>
      `,
      attachments: [
        {
          filename: 'Your-Dormant-Database-Audit.pdf',
          path: auditUrl,
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: 'Lead submitted successfully',
    });
  } catch (error) {
    console.error('Lead capture error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to submit lead form',
    });
  }
}
