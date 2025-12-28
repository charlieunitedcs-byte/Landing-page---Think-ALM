import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import { Button } from './ui/Button';

// Fixed rates from the brief
const REACTIVATION_RATE = 0.015; // 1.5%
const CONVERSION_RATE = 0.10; // 10%

interface ROICalculatorProps {
  onBookDemo?: () => void;
  className?: string;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({
  onBookDemo,
  className = ''
}) => {
  const [databaseSize, setDatabaseSize] = useState(10000);
  const [avgCommission, setAvgCommission] = useState(15000);
  const [animatedCommission, setAnimatedCommission] = useState(0);

  // Calculations
  const engagedSellers = Math.round(databaseSize * REACTIVATION_RATE);
  const newListings = Math.round(engagedSellers * CONVERSION_RATE);
  const totalCommission = newListings * avgCommission;

  // Animate the total commission number when it changes
  useEffect(() => {
    const duration = 1000; // 1 second animation
    const steps = 50;
    const increment = totalCommission / steps;
    const stepDuration = duration / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, totalCommission);
      setAnimatedCommission(Math.round(current));

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedCommission(totalCommission);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [totalCommission]);

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  // Format currency
  const formatCurrency = (num: number) => {
    return `$${num.toLocaleString('en-US')}`;
  };

  return (
    <div id="roi-calculator" className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-dark-950">
            <DollarSign className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Your Database Is Worth More Than You Think</h2>
        </div>
      </div>

      {/* Calculator Card */}
      <div className="glass-card p-8 md:p-12 rounded-2xl border-t-4 border-t-brand-500 shadow-2xl">

        {/* Inputs Section */}
        <div className="space-y-8 mb-10">

          {/* Database Size Slider */}
          <div>
            <label className="block text-gray-300 font-medium mb-3">
              Old leads in your database
            </label>
            <div className="mb-2 text-3xl font-bold text-brand-500">
              {formatNumber(databaseSize)}
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={databaseSize}
              onChange={(e) => setDatabaseSize(parseInt(e.target.value))}
              className="w-full h-2 bg-dark-800 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #2CC5A1 0%, #2CC5A1 ${((databaseSize - 1000) / (100000 - 1000)) * 100}%, #171717 ${((databaseSize - 1000) / (100000 - 1000)) * 100}%, #171717 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>1,000</span>
              <span>100,000</span>
            </div>
          </div>

          {/* Average Commission Input */}
          <div>
            <label className="block text-gray-300 font-medium mb-3">
              Average commission per listing
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">$</span>
              <input
                type="number"
                min="1000"
                max="100000"
                step="1000"
                value={avgCommission}
                onChange={(e) => setAvgCommission(parseInt(e.target.value) || 0)}
                className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 pl-8 py-3 text-white text-xl font-bold focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>

        </div>

        {/* Results Display */}
        <div className="bg-dark-900 rounded-xl p-8 mb-8 border border-brand-500/20">

          {/* Main Result */}
          <div className="text-center mb-6">
            <div className="text-5xl md:text-6xl font-bold text-brand-500 mb-2">
              {formatCurrency(animatedCommission)}
            </div>
            <div className="text-gray-400 text-lg">in Hidden Commission</div>
          </div>

          {/* Breakdown */}
          <div className="space-y-3 text-gray-300 bg-dark-950/50 p-6 rounded-lg border border-white/5">
            <p className="text-center mb-4 text-white font-medium">
              If we reactivate just 1.5% of your {formatNumber(databaseSize)} leads...
            </p>
            <div className="space-y-2 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <span className="text-brand-500">→</span>
                <span>That's <span className="font-bold text-white">{formatNumber(engagedSellers)}</span> engaged sellers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand-500">→</span>
                <span>At 10% conversion = <span className="font-bold text-white">{formatNumber(newListings)}</span> new listings</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand-500">→</span>
                <span>{formatNumber(newListings)} × {formatCurrency(avgCommission)} = <span className="font-bold text-brand-400">{formatCurrency(totalCommission)}</span> in new revenue</span>
              </div>
            </div>
          </div>

          {/* Info Tooltips */}
          <div className="flex flex-wrap gap-4 justify-center mt-6 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
              <span>Reactivation rate: 1.5% (conservative)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
              <span>Conversion rate: 10%</span>
            </div>
          </div>

        </div>

        {/* Cost Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 text-center">
          <div className="bg-dark-950/50 p-6 rounded-lg border border-white/5">
            <div className="text-gray-400 text-sm mb-2">ThinkALM Cost</div>
            <div className="text-2xl font-bold text-white">$3-5K<span className="text-sm text-gray-500 font-normal">/month</span></div>
          </div>
          <div className="bg-dark-950/50 p-6 rounded-lg border border-white/5">
            <div className="text-gray-400 text-sm mb-2">Manual Calling (ISA)</div>
            <div className="text-2xl font-bold text-white">$50K+<span className="text-sm text-gray-500 font-normal">/year salary</span></div>
          </div>
        </div>

        {/* ROI Display */}
        <div className="text-center mb-8 bg-brand-500/10 border border-brand-500/20 p-6 rounded-lg">
          <div className="text-brand-400 text-sm font-semibold uppercase tracking-wider mb-1">Projected ROI</div>
          <div className="text-4xl font-bold text-brand-500">
            {Math.round((totalCommission / (5000 * 12)) * 100)}%
          </div>
          <div className="text-gray-400 text-sm mt-2">Based on Pro plan ($5K/mo)</div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="w-full md:w-auto px-12"
            onClick={onBookDemo}
          >
            Book Demo - See How We Do It
          </Button>
        </div>

      </div>
    </div>
  );
};
