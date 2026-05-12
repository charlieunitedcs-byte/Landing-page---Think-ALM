# ThinkALM Landing Page - Complete Setup Guide

## 🎯 Overview

Your landing page now has both frontend and backend fully integrated:
- ✅ Frontend: React + Vite + Tailwind CSS
- ✅ Backend: Node.js + Express API
- ✅ Features: Call analysis upload, Database ROI calculator, Email automation

## 📁 Project Structure

```
Landing-page---Think-ALM-main/
├── api/                      # Backend API server
│   ├── server.js            # Main API server
│   ├── package.json         # API dependencies
│   ├── .env                 # API configuration (configure this!)
│   └── README.md            # API documentation
├── components/              # React components
├── src/                     # Source files
│   └── utils/
│       ├── api.ts          # API integration functions
│       └── analytics.ts    # Google Analytics
├── index.tsx               # App entry point
├── package.json            # Frontend dependencies
└── .env                    # Frontend configuration
```

## 🚀 Step 1: Configure Email (REQUIRED)

The API needs email credentials to send analysis results. Here's how:

### Option A: Using Gmail (Easiest for Testing)

1. **Enable 2-Factor Authentication on your Google account:**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate an App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

3. **Update `api/.env`:**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=abcdefghijklmnop
   EMAIL_FROM=ThinkALM <noreply@thinkalm.com.au>
   ADMIN_EMAIL=your-admin-email@gmail.com
   ```

### Option B: Using Other Email Services

**SendGrid:**
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

**AWS SES:**
```env
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_USER=your-ses-username
EMAIL_PASSWORD=your-ses-password
```

## 🖥️ Step 2: Run Locally (Testing)

### Terminal 1 - Start Backend API:
```bash
cd api
npm install
npm run dev
```

You should see:
```
🚀 ThinkALM API Server running on port 3001
📍 Health check: http://localhost:3001/api/health
📧 Email configured: ✓
```

### Terminal 2 - Start Frontend:
```bash
npm run dev
```

Visit: **http://localhost:3002**

### Test the Forms:

1. **Call Analysis:**
   - Scroll to "See What AI Finds in Your Business"
   - Click "Call Analysis" tab
   - Upload any MP3/WAV file
   - Enter your email
   - Click "Analyze My Call"
   - Check your email for results!

2. **Database ROI:**
   - Click "Database ROI" tab
   - Enter database size (e.g., 10000)
   - Enter commission (e.g., 15000)
   - Enter your email
   - Click "Calculate My ROI"
   - Check your email for the report!

## ☁️ Step 3: Deploy to Production

### Backend Deployment Options:

#### Option 1: Deploy to Your Server (thinkalm.com.au)

1. **Upload API files:**
   ```bash
   scp -r api/ user@thinkalm.com.au:/var/www/api/
   ```

2. **SSH and setup:**
   ```bash
   ssh user@thinkalm.com.au
   cd /var/www/api
   npm install

   # Install PM2 for process management
   npm install -g pm2
   pm2 start server.js --name thinkalm-api
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx:**

   Edit your Nginx config (e.g., `/etc/nginx/sites-available/thinkalm.com.au`):

   ```nginx
   server {
       listen 80;
       server_name thinkalm.com.au;

       # API endpoints
       location /api/ {
           proxy_pass http://localhost:3001/api/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }

       # Frontend (build files)
       location / {
           root /var/www/html;
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Restart Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

#### Option 2: Deploy Backend to Vercel (Free & Easy)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd api
   vercel
   ```

3. **Set environment variables in Vercel dashboard**

4. **Update frontend `.env`:**
   ```env
   VITE_API_BASE_URL=https://your-api.vercel.app
   ```

### Frontend Deployment:

#### Deploy to Vercel (Recommended):

```bash
# From project root
npm run build
vercel --prod
```

#### Deploy to Netlify:

```bash
npm run build
netlify deploy --prod --dir=dist
```

## 🔧 Step 4: Update Production URLs

### Update Frontend `.env`:
```env
VITE_API_BASE_URL=https://thinkalm.com.au
VITE_CALENDLY_URL=https://calendly.com/charlie-thinkalm/30min
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Update API CORS (if needed):

In `api/server.js`, change:
```javascript
app.use(cors({
  origin: 'https://thinkalm.com.au', // Your actual domain
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## 🧪 Testing in Production

### Test API Health:
```bash
curl https://thinkalm.com.au/api/health
```

Should return: `{"status":"ok","message":"ThinkALM API is running"}`

### Test Call Analysis:
```bash
curl -X POST https://thinkalm.com.au/api/diagnostic/call-analysis \
  -F "file=@test.mp3" \
  -F "email=test@example.com"
```

### Test Database ROI:
```bash
curl -X POST https://thinkalm.com.au/api/diagnostic/database-roi \
  -H "Content-Type: application/json" \
  -d '{"databaseSize":10000,"avgCommission":15000,"email":"test@example.com"}'
```

## 📧 What Happens When Users Submit Forms

### Call Analysis:
1. User uploads audio/video file
2. API receives file and stores it
3. **Two emails sent:**
   - **To User:** Professional analysis with score, strengths, weaknesses
   - **To Admin:** Notification with file details
4. Success message shown to user

### Database ROI:
1. User enters database size and commission
2. API calculates ROI metrics
3. **Two emails sent:**
   - **To User:** Detailed ROI report with breakdown and timeline
   - **To Admin:** Notification with calculation details
4. Success message shown to user

## 🎨 Email Templates

Both email types include:
- ✅ Professional branding with ThinkALM colors
- ✅ Detailed analysis/calculations
- ✅ Call-to-action to book strategy call
- ✅ Mobile-responsive design
- ✅ No spam triggers

## 🔒 Security Checklist

- [ ] Email credentials stored in `.env` (not committed to git)
- [ ] Update CORS origin for production
- [ ] Use HTTPS in production
- [ ] Set up rate limiting (optional but recommended)
- [ ] Configure firewall to allow ports 80, 443
- [ ] Regular backups of upload directory
- [ ] Monitor API logs

## 🐛 Troubleshooting

### "Email not sending"
- Check `api/.env` has correct EMAIL_USER and EMAIL_PASSWORD
- For Gmail, verify you're using App Password (not regular password)
- Check firewall allows outbound connections on port 587

### "CORS error"
- Update CORS origin in `api/server.js` to match your frontend domain
- Clear browser cache

### "File upload failing"
- Check `api/uploads` directory exists and is writable
- Verify file size is under 50MB
- Check file type is MP3, WAV, MP4, or MOV

### "API not reachable"
- Check API is running: `pm2 status`
- Check logs: `pm2 logs thinkalm-api`
- Verify Nginx configuration
- Check firewall rules

## 📊 Monitoring

Monitor your API:
```bash
# Check API status
pm2 status

# View logs
pm2 logs thinkalm-api

# Restart if needed
pm2 restart thinkalm-api
```

## 🎉 You're All Set!

Your landing page is now fully functional with:
- ✅ Beautiful frontend
- ✅ Working backend API
- ✅ Automated email responses
- ✅ Professional branding
- ✅ Mobile responsive

Visit your live site and test the diagnostic tools!

## 📞 Need Help?

Check the detailed documentation:
- Frontend: `README.md`
- Backend: `api/README.md`
- API specs: `API_REQUIREMENTS.md`
