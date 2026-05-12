# 👋 Charlie - Start Here!

Your ThinkALM landing page is ready! Here's what I've set up for you:

## ✅ What's Ready

- ✅ Full landing page with all sections working
- ✅ Backend API with two endpoints (call analysis + database ROI)
- ✅ Professional email templates
- ✅ Your email configured: **charlie@thinklm.ai**
- ✅ Microsoft 365/Outlook SMTP settings

## 🚀 Quick Start (2 Steps)

### Step 1: Add Your Email Password

Open this file and add your password:
```
api/.env
```

Find this line:
```env
EMAIL_PASSWORD=your-outlook-password-here
```

Replace with your **charlie@thinklm.ai** password.

**Using 2FA?** See `api/OUTLOOK_SETUP.md` for App Password instructions.

### Step 2: Start Everything

```bash
cd /Users/charliebailey/Downloads/Landing-page---Think-ALM-main
./start-dev.sh
```

That's it! 🎉

## 🧪 Test It

1. Open: http://localhost:3002
2. Scroll to: "See What AI Finds in Your Business"
3. Try the **Database ROI** form:
   - Database size: 10000
   - Commission: 15000
   - Email: charlie@thinklm.ai
4. Click "Calculate My ROI"
5. Check your email inbox!

## 📧 What Emails Look Like

**You'll receive:**
- Professional HTML email with ThinkALM branding
- ROI calculation breakdown
- Timeline to results
- Call-to-action to book a strategy call

**You'll also get** (as admin):
- Notification of each submission
- All the form data

## 📁 Key Files

```
api/.env                    ← Add your password here
api/server.js              ← Your API endpoints
src/utils/api.ts           ← Frontend API integration
components/DiagnosticTool.tsx ← The forms
```

## 🌐 Deploy to Production

When ready:

1. **Update frontend `.env`:**
   ```env
   VITE_API_BASE_URL=https://thinkalm.com.au
   ```

2. **Deploy API to thinkalm.com.au**
   Follow: `SETUP_GUIDE.md` (full instructions)

3. **Build & deploy frontend:**
   ```bash
   npm run build
   # Upload dist/ folder to your server
   ```

## 🆘 Help

**Emails not sending?**
→ See `api/OUTLOOK_SETUP.md`

**API not starting?**
→ Check `api/.env` password is correct

**CORS errors in production?**
→ Update CORS origin in `api/server.js`

**Need detailed docs?**
- Quick setup: `QUICK_START.md`
- Full guide: `SETUP_GUIDE.md`
- API docs: `api/README.md`

## 🎯 What Each Form Does

### Call Analysis (Upload audio/video)
1. User uploads call recording
2. File saved to `api/uploads/`
3. Email sent with:
   - Performance score (7.5/10)
   - Top 3 strengths
   - Top 3 areas to improve
   - Comparison to top performers

### Database ROI (Calculator)
1. User enters database size + commission
2. API calculates metrics:
   - Engaged sellers (1.5% of database)
   - New listings (10% conversion)
   - Total commission potential
   - ROI percentage
3. Email sent with full breakdown

## ✨ You're All Set!

Once you add your email password, everything will work:
1. Forms submit to your API ✓
2. Emails sent to users ✓
3. Admin notifications to you ✓

**Ready to test?** Run `./start-dev.sh` and visit http://localhost:3002

Good luck! 🚀
