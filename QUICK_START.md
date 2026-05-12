# 🚀 Quick Start Guide

## What You Have Now

✅ **Complete landing page** with diagnostic tools
✅ **Backend API** that sends professional emails
✅ **Call analysis** form (upload audio/video files)
✅ **Database ROI** calculator form
✅ **Email automation** with beautiful HTML templates

## 3-Minute Setup

### 1. Configure Email (REQUIRED)

Open `api/.env` and add your email credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-here
ADMIN_EMAIL=your-admin-email@gmail.com
```

**Getting Gmail App Password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Generate password for "Mail"
3. Copy the 16-character code
4. Paste as EMAIL_PASSWORD (no spaces)

### 2. Start Everything

```bash
./start-dev.sh
```

OR manually:

**Terminal 1 - API:**
```bash
cd api
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 3. Test It

1. Open http://localhost:3002
2. Scroll to "See What AI Finds in Your Business"
3. Try both forms
4. Check your email! 📧

## What Emails Look Like

### Call Analysis Email:
- Performance score (7.5/10)
- Top 3 strengths
- Top 3 improvement areas
- Comparison to top performers
- CTA to book strategy call

### Database ROI Email:
- Hidden commission potential ($225,000)
- Detailed breakdown
- Expected ROI percentage
- Timeline to results
- Custom strategy recommendations

## Deploy to Production

See `SETUP_GUIDE.md` for full deployment instructions.

**Quick deploy checklist:**
1. Update `api/.env` with production email settings
2. Update `.env` with `VITE_API_BASE_URL=https://thinkalm.com.au`
3. Deploy API to your server (see guide)
4. Build and deploy frontend: `npm run build`
5. Test with real submissions

## Troubleshooting

**"Emails not sending"**
→ Check `api/.env` has correct Gmail App Password

**"API not found"**
→ Make sure API server is running on port 3001

**"CORS error"**
→ Update CORS settings in `api/server.js` for production

## File Structure

```
.
├── api/                 # Backend (your API endpoints)
│   ├── server.js       # Main API server
│   ├── .env           # Configure this!
│   └── README.md
├── components/         # React components
├── src/utils/
│   └── api.ts         # API integration
├── .env               # Frontend config
└── SETUP_GUIDE.md     # Full documentation
```

## API Endpoints Created

✅ `POST /api/diagnostic/call-analysis` - Upload call recordings
✅ `POST /api/diagnostic/database-roi` - Calculate ROI
✅ `GET /api/health` - Health check

## Need More Help?

📖 **Full Guide:** See `SETUP_GUIDE.md`
🔧 **API Docs:** See `api/README.md`
📋 **API Specs:** See `API_REQUIREMENTS.md`

## Done! 🎉

Your landing page is now fully functional with automated email responses!
