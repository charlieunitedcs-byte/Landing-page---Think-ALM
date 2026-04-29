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

const prioritiesList = [
  'Qualify inbound leads faster',
  'Book more appraisals',
  'Automate follow-up',
  'Reactivate old database leads',
];

const databaseSizeOptions = ['0-2,500', '2,500-10,000', '10,000-25,000', '25,000+'];
const crmOptions = ['Reapit', 'HubSpot', 'Salesforce', 'Pipedrive', 'Other'];

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
    phone: '',
    agencyName: '',
    databaseSize: '',
    crm: '',
    priorities: [] as string[],
    message: '',
    consentGiven: false,
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

  const togglePriority = (priority: string) => {
    setFormData((prev) => {
      const exists = prev.priorities.includes(priority);
      return {
        ...prev,
        priorities: exists ? prev.priorities.filter((item) => item !== priority) : [...prev.priorities, priority],
      };
    });
  };

  const validate = () => {
    if (!formData.fullName || !formData.workEmail || !formData.phone || !formData.agencyName) {
      setErrorMessage('Please complete all required fields.');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      setErrorMessage('Please enter a valid work email.');
      return false;
    }

    if (!formData.consentGiven) {
      setErrorMessage('Please confirm consent to be contacted.');
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
        phone: '',
        agencyName: '',
        databaseSize: '',
        crm: '',
        priorities: [],
        message: '',
        consentGiven: false,
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
        <p className="text-xs font-semibold tracking-[0.2em] text-brand-700 mb-2">GET YOUR AI AGENT PLAN</p>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Tell us about your agency and we will map your rollout.</h3>
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
          placeholder="Full Name *"
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
        <input
          value={formData.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          placeholder="Mobile Number *"
          className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
          required
        />
        <input
          value={formData.agencyName}
          onChange={(event) => updateField('agencyName', event.target.value)}
          placeholder="Agency Name *"
          className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
          required
        />

        <select
          value={formData.databaseSize}
          onChange={(event) => updateField('databaseSize', event.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
          required
        >
          <option value="">Database Size *</option>
          {databaseSizeOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <select
          value={formData.crm}
          onChange={(event) => updateField('crm', event.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
        >
          <option value="">CRM</option>
          {crmOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <div className="md:col-span-2">
          <p className="text-sm text-slate-700 mb-2 font-medium">Biggest Priority</p>
          <div className="flex flex-wrap gap-2">
            {prioritiesList.map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => togglePriority(priority)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  formData.priorities.includes(priority)
                    ? 'border-brand-600 bg-brand-100 text-brand-900'
                    : 'border-slate-300 bg-white text-slate-700'
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={formData.message}
          onChange={(event) => updateField('message', event.target.value)}
          placeholder="Anything specific you want us to solve? (Optional)"
          rows={3}
          className="md:col-span-2 rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
        />

        <label className="md:col-span-2 flex items-start gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={formData.consentGiven}
            onChange={(event) => updateField('consentGiven', event.target.checked)}
            className="mt-1"
          />
          I agree to be contacted by Think ALM regarding AI agent services.
        </label>

        {errorMessage && <p className="md:col-span-2 text-sm text-red-600">{errorMessage}</p>}

        <div className="md:col-span-2">
          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto min-w-[220px]">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Sending...
              </>
            ) : (
              'Get My AI Agent Plan'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
