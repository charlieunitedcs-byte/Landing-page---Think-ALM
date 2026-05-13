import nodemailer from 'nodemailer';

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function isValidEmail(email) {
  const emailRegex = /^(?:[a-zA-Z0-9_'^&/+-])+(?:\.(?:[a-zA-Z0-9_'^&/+-])+)*@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/;
  return emailRegex.test(email);
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
    const { firstName, email, source, pageUrl, submittedAt } = req.body || {};

    if (!firstName || firstName.length > 60 || !email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid first name or email',
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

    const siteUrl = (process.env.PUBLIC_SITE_URL || 'https://www.thinkalm.com.au').replace(/\/$/, '');
    const auditUrl = `${siteUrl}/assets/dormant-database-audit.pdf`;
    const submittedTime = submittedAt || new Date().toISOString();
    const sourceTag = source || 'dormant_database_audit';

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587', 10),
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Think ALM" <noreply@thinkalm.com.au>',
      to: process.env.ADMIN_EMAIL || 'charlie@thinkalm.ai',
      subject: 'New Audit Opt-in Submission',
      html: `
        <h2>New /audit Lead</h2>
        <p><strong>First name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Source tag:</strong> ${sourceTag}</p>
        <p><strong>Page URL:</strong> ${pageUrl || 'N/A'}</p>
        <p><strong>Submitted At:</strong> ${submittedTime}</p>
      `,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Think ALM" <noreply@thinkalm.com.au>',
      to: email,
      subject: 'Your audit — the dormant database playbook',
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 620px; margin: 0 auto; line-height: 1.6; color: #1f2937;">
          <p>Hi ${firstName},</p>
          <p>Here’s the audit, attached as promised:</p>
          <p><a href="${auditUrl}" style="color:#1F4E79;font-weight:600;">→ ${auditUrl}</a></p>
          <p>It’s a fillable PDF — you can type your CRM numbers straight into the tables and tick the scorecard boxes. Eight pages, fifteen minutes.</p>
          <p>If your total comes out larger than your annual GCI, you’re sitting on the most under-exploited asset in the business. That’s the case where a conversation is worth your time.</p>
          <p>— Charlie<br/>Founder, Think ALM<br/><a href="https://calendly.com/charlie-thinkalm/30min" style="color:#1F4E79;">calendly.com/charlie-thinkalm/30min</a></p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Audit opt-in error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to submit audit form',
    });
  }
}
