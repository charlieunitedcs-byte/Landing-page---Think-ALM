import React, { useMemo, useState } from 'react';
import { Button } from './ui/Button';

interface DatabaseWorthCalculatorProps {
  onDownloadAudit: () => void;
}

const REACTIVATION_RATE = 0.02;

function parseNumericInput(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

export const DatabaseWorthCalculator: React.FC<DatabaseWorthCalculatorProps> = ({ onDownloadAudit }) => {
  const [contactsInput, setContactsInput] = useState('10000');
  const [averageSalePriceInput, setAverageSalePriceInput] = useState('950000');
  const [commissionPercentInput, setCommissionPercentInput] = useState('2');

  const estimatedValue = useMemo(() => {
    const contacts = Math.max(0, parseNumericInput(contactsInput));
    const averageSalePrice = Math.max(0, parseNumericInput(averageSalePriceInput));
    const commissionPercent = Math.max(0, parseNumericInput(commissionPercentInput));
    const commissionPerSale = averageSalePrice * (commissionPercent / 100);
    return Math.round(contacts * REACTIVATION_RATE * commissionPerSale);
  }, [contactsInput, averageSalePriceInput, commissionPercentInput]);

  return (
    <div id="database-worth-calculator" className="w-full rounded-3xl border border-white/10 bg-white p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.1)]">
      <p className="text-xs font-semibold tracking-[0.2em] text-brand-700 mb-3">DATABASE WORTH AUDIT</p>
      <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">How much is your database worth?</h3>
      <p className="text-slate-600 mb-8">Use your own numbers to estimate dormant pipeline value already sitting in your CRM.</p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-2">Number of contacts in your CRM</span>
          <input
            inputMode="numeric"
            value={contactsInput}
            onChange={(event) => setContactsInput(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
            placeholder="e.g. 10000"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-2">Average sale price in your area (AUD)</span>
          <input
            inputMode="numeric"
            value={averageSalePriceInput}
            onChange={(event) => setAverageSalePriceInput(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
            placeholder="e.g. 950000"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-2">Average commission percentage</span>
          <input
            inputMode="decimal"
            value={commissionPercentInput}
            onChange={(event) => setCommissionPercentInput(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
            placeholder="e.g. 2"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
        <p className="text-sm font-medium text-brand-800 mb-2">Estimated dormant pipeline value</p>
        <p className="text-4xl sm:text-5xl font-extrabold text-brand-900">
          ${estimatedValue.toLocaleString('en-AU')}
        </p>
        <p className="text-slate-700 mt-4">
          Want the full breakdown — the four revenue streams, the math, the playbook? Download the audit.
        </p>
        <Button className="mt-5" onClick={onDownloadAudit}>Download the Audit</Button>
      </div>
    </div>
  );
};
