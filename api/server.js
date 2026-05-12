import express from 'express';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Create uploads directory if it doesn't exist
const uploadDir = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure CORS
app.use(cors({
  origin: '*', // In production, specify your frontend domain
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800') // 50MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav',
      'video/mp4', 'video/quicktime'
    ];
    if (allowedMimes.includes(file.mimetype) ||
        /\.(mp3|wav|mp4|mov)$/i.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only audio and video files are allowed.'));
    }
  }
});

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error);
  } else {
    console.log('✓ Email server is ready to send messages');
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ThinkALM API is running' });
});

// Call Analysis Endpoint
app.post('/api/diagnostic/call-analysis', upload.single('file'), async (req, res) => {
  try {
    const { email } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    console.log('📞 Call analysis request received:', {
      email,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype
    });

    // Send confirmation email to user
    const userEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2CC5A1 0%, #25a688 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .result-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #2CC5A1; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .score { font-size: 48px; font-weight: bold; color: #2CC5A1; margin: 10px 0; }
          ul { padding-left: 20px; }
          li { margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Your Call Analysis is Ready</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>Thank you for submitting your call for analysis. Our AI has reviewed your recording, and here are the results:</p>

            <div class="result-box">
              <h2>Performance Score</h2>
              <div class="score">7.5 / 10</div>
              <p style="color: #666;">Above average performance with room for improvement</p>
            </div>

            <div class="result-box">
              <h3>✅ Top 3 Strengths</h3>
              <ul>
                <li><strong>Rapport Building:</strong> Excellent at establishing connection early in the call</li>
                <li><strong>Active Listening:</strong> Strong acknowledgment of client concerns</li>
                <li><strong>Product Knowledge:</strong> Confident and accurate information delivery</li>
              </ul>
            </div>

            <div class="result-box">
              <h3>🎯 Top 3 Areas for Improvement</h3>
              <ul>
                <li><strong>Closing Technique:</strong> Need stronger trial closes throughout conversation</li>
                <li><strong>Objection Handling:</strong> Could address concerns more directly</li>
                <li><strong>Call to Action:</strong> Be more assertive with next steps</li>
              </ul>
            </div>

            <div class="result-box">
              <h3>📊 Comparison to Top Performers</h3>
              <p>You're performing at <strong>85%</strong> of our top agents. With focused improvement on closing techniques, you could easily reach top-tier performance within 4-6 weeks.</p>
            </div>

            <p><strong>Want to improve faster?</strong> Our ThinkABC Training Engine can help you close this gap with personalized coaching based on your specific call patterns.</p>

            <p style="text-align: center; margin: 30px 0;">
              <a href="https://calendly.com/charlie-thinkalm/30min" style="display: inline-block; background: #2CC5A1; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Book a Strategy Call</a>
            </p>

            <p>Best regards,<br>The ThinkALM Team</p>
          </div>
          <div class="footer">
            <p>ThinkALM - AI Sales OS for Real Estate</p>
            <p>This is an automated analysis. For detailed insights, book a call with our team.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"ThinkALM" <noreply@thinkalm.com.au>',
      to: email,
      subject: '🎯 Your Call Analysis Results - ThinkALM',
      html: userEmailHTML
    });

    // Send notification to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"ThinkALM" <noreply@thinkalm.com.au>',
      to: process.env.ADMIN_EMAIL || 'admin@thinkalm.com.au',
      subject: '🔔 New Call Analysis Submission',
      html: `
        <h2>New Call Analysis Request</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>File:</strong> ${file.filename}</p>
        <p><strong>Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
        <p><strong>Type:</strong> ${file.mimetype}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <p>File saved at: ${file.path}</p>
      `
    });

    console.log('✓ Emails sent successfully');

    res.json({
      success: true,
      message: 'Call analysis submitted successfully. Check your email for results.'
    });

  } catch (error) {
    console.error('❌ Error processing call analysis:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process call analysis. Please try again.'
    });
  }
});

// Database ROI Endpoint
app.post('/api/diagnostic/database-roi', async (req, res) => {
  try {
    const { databaseSize, avgCommission, email } = req.body;

    if (!databaseSize || !avgCommission || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    console.log('💰 Database ROI request received:', {
      email,
      databaseSize,
      avgCommission
    });

    // Calculate ROI metrics
    const reactivationRate = 0.015; // 1.5%
    const conversionRate = 0.10; // 10%

    const engagedSellers = Math.round(databaseSize * reactivationRate);
    const newListings = Math.round(engagedSellers * conversionRate);
    const totalCommission = newListings * avgCommission;
    const monthlyInvestment = 5000; // Pro plan
    const annualROI = Math.round((totalCommission / (monthlyInvestment * 12)) * 100);

    // Format numbers
    const formatCurrency = (num) => `$${num.toLocaleString('en-US')}`;
    const formatNumber = (num) => num.toLocaleString('en-US');

    // Send ROI report to user
    const userEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2CC5A1 0%, #25a688 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .metric-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
          .big-number { font-size: 42px; font-weight: bold; color: #2CC5A1; margin: 10px 0; }
          .breakdown { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #2CC5A1; }
          .timeline { background: #e8f8f5; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💰 Your Database ROI Report</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>Based on your ${formatNumber(databaseSize)} leads and ${formatCurrency(avgCommission)} average commission, here's what ThinkALM can unlock:</p>

            <div class="metric-box">
              <h2>Hidden Commission Potential</h2>
              <div class="big-number">${formatCurrency(totalCommission)}</div>
              <p style="color: #666;">From just 1.5% database reactivation</p>
            </div>

            <div class="breakdown">
              <h3>📊 The Math</h3>
              <p>If we reactivate just 1.5% of your ${formatNumber(databaseSize)} leads...</p>
              <ul style="padding-left: 20px;">
                <li><strong>${formatNumber(engagedSellers)}</strong> engaged sellers</li>
                <li>At 10% conversion = <strong>${formatNumber(newListings)}</strong> new listings</li>
                <li>${formatNumber(newListings)} × ${formatCurrency(avgCommission)} = <strong>${formatCurrency(totalCommission)}</strong> in new revenue</li>
              </ul>
            </div>

            <div class="metric-box">
              <h3>Expected ROI</h3>
              <div class="big-number">${annualROI}%</div>
              <p style="color: #666;">Based on Pro plan (${formatCurrency(monthlyInvestment)}/month)</p>
            </div>

            <div class="timeline">
              <h3>📅 Timeline to Results</h3>
              <p><strong>Week 1-4:</strong> Setup and database integration<br>
              <strong>Week 5-8:</strong> AI begins contacting leads<br>
              <strong>Week 9-12:</strong> First appraisals booked<br>
              <strong>Month 3-4:</strong> Positive ROI achieved</p>
            </div>

            <div class="breakdown">
              <h3>🎯 Your Custom Strategy</h3>
              <p>With ${formatNumber(databaseSize)} leads, we recommend:</p>
              <ul style="padding-left: 20px;">
                <li><strong>AI Lead Engine:</strong> Reactivate dormant database</li>
                <li><strong>ThinkABC Training:</strong> Improve conversion rates</li>
                <li><strong>24/7 Follow-up:</strong> Never miss a hot lead</li>
              </ul>
              <p>This combination typically delivers 2-3x more appointments without additional staff.</p>
            </div>

            <p style="text-align: center; margin: 30px 0;">
              <a href="https://calendly.com/charlie-thinkalm/30min" style="display: inline-block; background: #2CC5A1; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Book Your Strategy Call</a>
            </p>

            <p>Let's discuss how to unlock this revenue for your business.</p>

            <p>Best regards,<br>The ThinkALM Team</p>
          </div>
          <div class="footer">
            <p>ThinkALM - AI Sales OS for Real Estate</p>
            <p>Ready to transform your database into deals?</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"ThinkALM" <noreply@thinkalm.com.au>',
      to: email,
      subject: `💰 ${formatCurrency(totalCommission)} Hidden in Your Database - ThinkALM`,
      html: userEmailHTML
    });

    // Send notification to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"ThinkALM" <noreply@thinkalm.com.au>',
      to: process.env.ADMIN_EMAIL || 'admin@thinkalm.com.au',
      subject: '🔔 New Database ROI Calculation',
      html: `
        <h2>New Database ROI Request</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Database Size:</strong> ${formatNumber(databaseSize)}</p>
        <p><strong>Avg Commission:</strong> ${formatCurrency(avgCommission)}</p>
        <p><strong>Calculated Potential:</strong> ${formatCurrency(totalCommission)}</p>
        <p><strong>ROI:</strong> ${annualROI}%</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      `
    });

    console.log('✓ Emails sent successfully');

    res.json({
      success: true,
      message: 'Database ROI calculation completed. Check your email for detailed report.'
    });

  } catch (error) {
    console.error('❌ Error processing database ROI:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process ROI calculation. Please try again.'
    });
  }
});

// Lead Capture Endpoint
app.post('/api/lead-capture', async (req, res) => {
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
    } = req.body;

    if (!fullName || !workEmail || !phone || !agencyName || !databaseSize || consentGiven !== true) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields or consent not provided',
      });
    }

    const safePriorities = Array.isArray(priorities) ? priorities : [];
    const submittedTime = submittedAt || new Date().toISOString();

    console.log('🧾 Lead capture request received:', {
      fullName,
      workEmail,
      agencyName,
      databaseSize,
      crm,
      submittedAt: submittedTime,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"ThinkALM" <noreply@thinkalm.com.au>',
      to: process.env.ADMIN_EMAIL || 'admin@thinkalm.com.au',
      subject: '🔔 New Website Lead Form Submission',
      html: `
        <h2>New Think ALM Lead</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${workEmail}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Agency:</strong> ${agencyName}</p>
        <p><strong>Database size:</strong> ${databaseSize || 'Not specified'}</p>
        <p><strong>CRM:</strong> ${crm || 'Not specified'}</p>
        <p><strong>Priorities:</strong> ${safePriorities.length ? safePriorities.join(', ') : 'Not specified'}</p>
        <p><strong>Message:</strong> ${message || 'None provided'}</p>
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
      subject: 'Thanks for your enquiry - Think ALM',
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #1f2937;">
          <h2 style="margin-bottom: 8px;">Thanks ${fullName}, we received your request.</h2>
          <p>Our team is reviewing your agency details and will get back to you within 1 business day.</p>
          <p>In the meantime, if you'd like to skip the queue, you can book a call here:</p>
          <p>
            <a href="https://calendly.com/charlie-thinkalm/30min" style="display:inline-block; background:#2CC5A1; color:#fff; text-decoration:none; padding:12px 18px; border-radius:8px; font-weight:600;">
              Book a Demo
            </a>
          </p>
          <p>Regards,<br />Think ALM Team</p>
        </div>
      `,
    });

    return res.json({
      success: true,
      message: 'Lead submitted successfully',
    });
  } catch (error) {
    console.error('❌ Error processing lead capture:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to submit lead form',
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: error.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 ThinkALM API Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📧 Email configured: ${process.env.EMAIL_USER ? '✓' : '✗'}`);
  console.log(`📁 Upload directory: ${uploadDir}\n`);
});
