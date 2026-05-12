# API Requirements for ThinkALM Landing Page

## Base URL
`https://thinkalm.com.au`

## Required Endpoints

### 1. Call Analysis Submission
**Endpoint:** `POST /api/diagnostic/call-analysis`

**Content-Type:** `multipart/form-data`

**Request Body:**
- `file` (File): Audio or video file of the call recording
  - Supported formats: MP3, WAV, MP4, MOV
- `email` (string): User's email address
- `type` (string): Always "call_analysis"

**Response:**
```json
{
  "success": true,
  "message": "Call analysis submitted successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message here"
}
```

**Expected Backend Actions:**
1. Receive and validate the uploaded file
2. Store the file securely
3. Process the audio/video with speech-to-text
4. Analyze the call using AI (performance scoring, strengths, weaknesses)
5. Send email to the user with:
   - Performance score (0-10)
   - Top 3 strengths
   - Top 3 improvement areas
   - Comparison to top performers

---

### 2. Database ROI Calculation
**Endpoint:** `POST /api/diagnostic/database-roi`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "databaseSize": 10000,
  "avgCommission": 15000,
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Database ROI calculation submitted successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message here"
}
```

**Expected Backend Actions:**
1. Receive and validate the input data
2. Calculate ROI metrics:
   - Engaged sellers = databaseSize × 1.5%
   - New listings = engagedSellers × 10%
   - Total commission = newListings × avgCommission
3. Send email to the user with:
   - Hidden commission potential
   - Reactivation estimate
   - Expected timeline to ROI
   - Custom strategy call invitation

---

## CORS Configuration

Make sure your backend API allows requests from your frontend domain:

```javascript
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## Testing

Use these curl commands to test your endpoints:

### Test Call Analysis:
```bash
curl -X POST https://thinkalm.com.au/api/diagnostic/call-analysis \
  -F "file=@/path/to/test-call.mp3" \
  -F "email=test@example.com" \
  -F "type=call_analysis"
```

### Test Database ROI:
```bash
curl -X POST https://thinkalm.com.au/api/diagnostic/database-roi \
  -H "Content-Type: application/json" \
  -d '{
    "databaseSize": 10000,
    "avgCommission": 15000,
    "email": "test@example.com"
  }'
```

---

## Environment Variables

The frontend uses these environment variables (configure in `.env`):

```
VITE_API_BASE_URL=https://thinkalm.com.au
VITE_CALENDLY_URL=https://calendly.com/charlie-thinkalm/30min
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```
