import React, { useMemo, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { submitLeadCapture } from '../src/utils/api';

interface LeadCaptureFormProps {
  onSuccess?: () => void;
  className?: string;
  redirectOnSuccess?: boolean;
  successRedirectUrl?: string;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  onSuccess,
  className = '',
  redirectOnSuccess = true,
  successRedirectUrl = '/thank-you/',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
  });

  const utm = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
    };
  }, []);

  const updateField = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!formData.fullName || !formData.workEmail) {
      setErrorMessage('Please complete all required fields.');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      setErrorMessage('Please enter a valid work email.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      await submitLeadCapture({
        ...formData,
        pageUrl: window.location.href,
        submittedAt: new Date().toISOString(),
        ...utm,
      });

      setIsSuccess(true);
      onSuccess?.();
      setFormData({
        fullName: '',
        workEmail: '',
      });

      if (redirectOnSuccess) {
        setTimeout(() => {
          window.location.href = successRedirectUrl;
        }, 300);
      }
    } catch (error) {
      console.error('Lead capture failed:', error);
      setErrorMessage('Could not submit right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto mt-10 rounded-2xl border border-white/15 bg-white p-6 md:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] ${className}`}>
      <div className="mb-6 text-left">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand-700 mb-2">DOWNLOAD THE AUDIT</p>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Enter your details and we will send your audit.</h3>
        <p className="text-slate-600">We reply within 1 business day. No obligation.</p>
      </div>

      {isSuccess && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-800 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          Thanks, your request is in. We will contact you shortly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <input
          value={formData.fullName}
          onChange={(event) => updateField('fullName', event.target.value)}
          placeholder="Name *"
          className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
          required
        />
        <input
          type="email"
          value={formData.workEmail}
          onChange={(event) => updateField('workEmail', event.target.value)}
          placeholder="Work Email *"
          className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
          required
        />

        {errorMessage && <p className="md:col-span-2 text-sm text-red-600">{errorMessage}</p>}

        <div className="md:col-span-2">
          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto min-w-[220px]">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Sending...
              </>
            ) : (
              'Download Audit'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
