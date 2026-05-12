# ThinkALM API Backend

This is the backend API server for the ThinkALM landing page diagnostic tools.

## Features

- ✅ Call analysis file upload and processing
- ✅ Database ROI calculation
- ✅ Automated email responses with detailed reports
- ✅ Admin notifications
- ✅ CORS enabled for cross-origin requests
- ✅ File type validation
- ✅ Professional HTML email templates

## Quick Start

### 1. Install Dependencies

```bash
cd api
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `api` directory:

```bash
cp .env.example .env
```

Edit `.env` and configure your email settings:

```env
PORT=3001

# Gmail Example (recommended for testing)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=ThinkALM <noreply@thinkalm.com.au>

# Your admin email to receive notifications
ADMIN_EMAIL=admin@thinkalm.com.au

# File upload settings
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=52428800
```

### 3. Gmail Setup (if using Gmail)

1. Go to https://myaccount.google.com/apppasswords
2. Generate a new App Password for "Mail"
3. Copy the 16-character password
4. Use it as `EMAIL_PASSWORD` in your `.env` file

**Note:** You need 2-Factor Authentication enabled on your Google account to use App Passwords.

### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on `http://localhost:3001`

### 5. Test the API

**Health Check:**
```bash
curl http://localhost:3001/api/health
```

**Test Call Analysis:**
```bash
curl -X POST http://localhost:3001/api/diagnostic/call-analysis \
  -F "file=@/path/to/test-audio.mp3" \
  -F "email=test@example.com"
```

**Test Database ROI:**
```bash
curl -X POST http://localhost:3001/api/diagnostic/database-roi \
  -H "Content-Type: application/json" \
  -d '{
    "databaseSize": 10000,
    "avgCommission": 15000,
    "email": "test@example.com"
  }'
```

## API Endpoints

### GET /api/health
Health check endpoint
- Returns: `{ status: 'ok', message: 'ThinkALM API is running' }`

### POST /api/diagnostic/call-analysis
Upload and analyze a call recording
- Content-Type: `multipart/form-data`
- Fields:
  - `file`: Audio/video file (MP3, WAV, MP4, MOV)
  - `email`: User's email address
- Returns: Success message
- Sends: Professional email with call analysis results

### POST /api/diagnostic/database-roi
Calculate database ROI potential
- Content-Type: `application/json`
- Body:
  ```json
  {
    "databaseSize": 10000,
    "avgCommission": 15000,
    "email": "user@example.com"
  }
  ```
- Returns: Success message
- Sends: Professional email with ROI report

## Email Providers

### Gmail (Recommended for Testing)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### SendGrid
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

### AWS SES
```env
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_USER=your-ses-smtp-username
EMAIL_PASSWORD=your-ses-smtp-password
```

### Custom SMTP
Use any SMTP server by configuring the appropriate host, port, and credentials.

## Deployment

### Option 1: Deploy to Your Existing Server (thinkalm.com.au)

1. **Upload files to your server:**
   ```bash
   scp -r api/ user@thinkalm.com.au:/var/www/api/
   ```

2. **SSH into your server:**
   ```bash
   ssh user@thinkalm.com.au
   ```

3. **Install dependencies and start:**
   ```bash
   cd /var/www/api
   npm install
   npm start
   ```

4. **Set up PM2 for process management:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name thinkalm-api
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx reverse proxy:**
   ```nginx
   location /api/ {
     proxy_pass http://localhost:3001/api/;
     proxy_http_version 1.1;
     proxy_set_header Upgrade $http_upgrade;
     proxy_set_header Connection 'upgrade';
     proxy_set_header Host $host;
     proxy_cache_bypass $http_upgrade;
   }
   ```

### Option 2: Deploy to Vercel (Serverless)

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

### Option 3: Deploy to Heroku

1. **Create Heroku app:**
   ```bash
   heroku create thinkalm-api
   ```

2. **Set environment variables:**
   ```bash
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASSWORD=your-app-password
   # ... set other variables
   ```

3. **Deploy:**
   ```bash
   git subtree push --prefix api heroku main
   ```

## Updating Frontend Configuration

After deploying, update your frontend `.env` file with your API URL:

```env
# Local development
VITE_API_BASE_URL=http://localhost:3001

# Production
VITE_API_BASE_URL=https://thinkalm.com.au
```

## File Storage

Uploaded call recordings are stored in the `uploads/` directory. For production:

1. **Consider using cloud storage** (AWS S3, Google Cloud Storage)
2. **Set up regular cleanup** for old files
3. **Implement backup strategy**

Example cleanup cron job (delete files older than 30 days):
```bash
0 0 * * * find /var/www/api/uploads -type f -mtime +30 -delete
```

## Security Considerations

1. ✅ CORS is configured (update origin in production)
2. ✅ File type validation
3. ✅ File size limits
4. ⚠️ Add rate limiting for production (use `express-rate-limit`)
5. ⚠️ Add authentication if needed
6. ⚠️ Use HTTPS in production
7. ⚠️ Sanitize user inputs

## Troubleshooting

### Email not sending?
- Check your EMAIL_USER and EMAIL_PASSWORD
- For Gmail, ensure you're using an App Password (not regular password)
- Check that 2FA is enabled on your Google account
- Verify firewall allows outbound connections on port 587

### File upload failing?
- Check UPLOAD_DIR exists and is writable
- Verify MAX_FILE_SIZE is appropriate
- Check file type is in allowed list

### CORS errors?
- Update `cors` origin to match your frontend domain
- In production: `cors({ origin: 'https://yourdomain.com' })`

## Need Help?

Check the logs for detailed error messages:
```bash
pm2 logs thinkalm-api
```

## License

Private - ThinkALM
