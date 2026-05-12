// API utility functions for ThinkALM backend

// Use same-origin by default to avoid cross-domain CORS issues
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Generic API call handler
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Submit call analysis
export async function submitCallAnalysis(file: File, email: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('email', email);
  formData.append('type', 'call_analysis');

  return apiCall('/api/diagnostic/call-analysis', {
    method: 'POST',
    body: formData,
  });
}

// Submit database ROI calculation
export async function submitDatabaseROI(databaseSize: string, commission: string, email: string) {
  return apiCall('/api/diagnostic/database-roi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      databaseSize: parseInt(databaseSize),
      avgCommission: parseInt(commission),
      email,
    }),
  });
}

export interface LeadCapturePayload {
  fullName: string;
  workEmail: string;
  phone?: string;
  agencyName?: string;
  databaseSize?: string;
  crm?: string;
  priorities?: string[];
  message?: string;
  consentGiven?: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  pageUrl: string;
  submittedAt: string;
}

export async function submitLeadCapture(payload: LeadCapturePayload) {
  return apiCall('/api/lead-capture', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
