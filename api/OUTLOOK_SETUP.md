# Microsoft 365/Outlook Email Setup Guide

Your API is configured to use **charlie@thinklm.ai** with Microsoft 365/Outlook SMTP.

## Option 1: Use Your Regular Password (Simple)

1. Open `api/.env`
2. Replace `your-outlook-password-here` with your actual Outlook password
3. Save and restart the API

**Configuration:**
```env
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_USER=charlie@thinklm.ai
EMAIL_PASSWORD=your-actual-password
```

## Option 2: Use App Password (More Secure - Recommended)

If you have 2-Factor Authentication enabled:

### Step 1: Create App Password

1. Go to: https://account.microsoft.com/security
2. Click **"Advanced security options"**
3. Under **"App passwords"**, click **"Create a new app password"**
4. Copy the generated password (something like: `abcd-efgh-ijkl-mnop`)

### Step 2: Update .env

```env
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_USER=charlie@thinklm.ai
EMAIL_PASSWORD=abcd-efgh-ijkl-mnop
```

## Testing

After configuring, test the setup:

```bash
cd api
npm run dev
```

You should see:
```
✓ Email server is ready to send messages
🚀 ThinkALM API Server running on port 3001
📧 Email configured: ✓
```

## Test Sending an Email

```bash
cd api
./test-api.sh
```

Then check **charlie@thinklm.ai** for the test email!

## Troubleshooting

### "Authentication failed"
- Double-check your password in `api/.env`
- Make sure 2FA is configured correctly if using App Password
- Try using your regular password first

### "Connection refused"
- Check if your organization blocks SMTP
- Verify firewall allows outbound connections on port 587
- Contact your IT admin if using a corporate account

### "Mailbox unavailable"
- Verify charlie@thinklm.ai is the correct email
- Make sure the account is active and not suspended
- Check if SMTP is enabled for your account

### Still not working?

**Check with IT admin if:**
- SMTP authentication is enabled for your account
- Your organization allows SMTP access
- There are any IP restrictions

**Or use a different email service:**
- Update `EMAIL_HOST` to your email provider's SMTP server
- Update `EMAIL_PORT` (usually 587 or 465)
- Update credentials accordingly

## Common Microsoft 365 SMTP Settings

**Standard Office 365:**
```env
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
```

**Exchange Online:**
```env
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
```

**Legacy Exchange:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
```

## Alternative: Use SendGrid (If Outlook Doesn't Work)

SendGrid offers 100 free emails per day:

1. Sign up at https://sendgrid.com
2. Create an API key
3. Update `api/.env`:

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=ThinkALM <charlie@thinklm.ai>
```

## Next Steps

1. ✅ Update `EMAIL_PASSWORD` in `api/.env`
2. ✅ Start API: `cd api && npm run dev`
3. ✅ Test: `./test-api.sh`
4. ✅ Check your inbox for test emails
5. ✅ Try the landing page forms

Once emails are working locally, you're ready to deploy to production!
