import React, { useState } from 'react';
import { Upload, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';

type DiagnosticType = 'call' | 'database';

interface DiagnosticToolProps {
  onSubmit?: (type: DiagnosticType, data: any) => void;
  className?: string;
}

export const DiagnosticTool: React.FC<DiagnosticToolProps> = ({
  onSubmit,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<DiagnosticType>('call');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Call Analysis Form State
  const [callFile, setCallFile] = useState<File | null>(null);
  const [callEmail, setCallEmail] = useState('');
  const [callEmailError, setCallEmailError] = useState('');

  // Database ROI Form State
  const [dbSize, setDbSize] = useState('');
  const [dbCommission, setDbCommission] = useState('');
  const [dbEmail, setDbEmail] = useState('');
  const [dbEmailError, setDbEmailError] = useState('');

  // Email validation
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle Call Analysis Submit
  const handleCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!callFile) {
      alert('Please upload a call recording');
      return;
    }

    if (!validateEmail(callEmail)) {
      setCallEmailError('Please enter a valid email address');
      return;
    }

    setCallEmailError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      if (onSubmit) {
        onSubmit('call', { file: callFile, email: callEmail });
      }

      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setCallFile(null);
        setCallEmail('');
      }, 3000);
    }, 2000);
  };

  // Handle Database ROI Submit
  const handleDatabaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dbSize || !dbCommission) {
      alert('Please fill in all fields');
      return;
    }

    if (!validateEmail(dbEmail)) {
      setDbEmailError('Please enter a valid email address');
      return;
    }

    setDbEmailError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      if (onSubmit) {
        onSubmit('database', { size: dbSize, commission: dbCommission, email: dbEmail });
      }

      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setDbSize('');
        setDbCommission('');
        setDbEmail('');
      }, 3000);
    }, 2000);
  };

  return (
    <div className={className}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">See What AI Finds in Your Business</h2>
        <p className="text-xl text-gray-400">Get a free analysis in 60 seconds—no credit card required</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 justify-center">
        <button
          onClick={() => setActiveTab('call')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'call'
              ? 'bg-brand-500 text-dark-950'
              : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
          }`}
        >
          Call Analysis
        </button>
        <button
          onClick={() => setActiveTab('database')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'database'
              ? 'bg-brand-500 text-dark-950'
              : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
          }`}
        >
          Database ROI
        </button>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">

        {/* Left Side - Form */}
        <div className="glass-card p-8 rounded-2xl">

          {isSuccess ? (
            // Success State
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Analysis Received!</h3>
              <p className="text-gray-400">We'll send your results to your email within 60 seconds.</p>
            </div>
          ) : (
            <>
              {/* Call Analysis Form */}
              {activeTab === 'call' && (
                <form onSubmit={handleCallSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">Upload Your Call</h3>

                  {/* File Upload */}
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Call Recording <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="audio/*,video/*,.mp3,.wav,.mp4,.mov"
                        onChange={(e) => setCallFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="call-file"
                      />
                      <label
                        htmlFor="call-file"
                        className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-brand-500 transition-colors bg-dark-800"
                      >
                        <Upload className="w-6 h-6 text-gray-400" />
                        <span className="text-gray-300">
                          {callFile ? callFile.name : 'Choose audio or video file'}
                        </span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Supports: MP3, WAV, MP4, MOV</p>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={callEmail}
                      onChange={(e) => {
                        setCallEmail(e.target.value);
                        setCallEmailError('');
                      }}
                      placeholder="you@company.com"
                      className={`w-full bg-dark-800 border ${callEmailError ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors`}
                    />
                    {callEmailError && <p className="text-red-400 text-sm mt-1">{callEmailError}</p>}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze My Call'
                    )}
                  </Button>
                </form>
              )}

              {/* Database ROI Form */}
              {activeTab === 'database' && (
                <form onSubmit={handleDatabaseSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">Calculate Your ROI</h3>

                  {/* Database Size */}
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Database Size <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      value={dbSize}
                      onChange={(e) => setDbSize(e.target.value)}
                      placeholder="10000"
                      min="1"
                      className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">Total number of leads in your database</p>
                  </div>

                  {/* Average Commission */}
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Average Commission <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={dbCommission}
                        onChange={(e) => setDbCommission(e.target.value)}
                        placeholder="15000"
                        min="1"
                        className="w-full bg-dark-800 border border-white/10 rounded-lg px-4 pl-8 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Per listing sold</p>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={dbEmail}
                      onChange={(e) => {
                        setDbEmail(e.target.value);
                        setDbEmailError('');
                      }}
                      placeholder="you@company.com"
                      className={`w-full bg-dark-800 border ${dbEmailError ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors`}
                    />
                    {dbEmailError && <p className="text-red-400 text-sm mt-1">{dbEmailError}</p>}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Calculating...
                      </>
                    ) : (
                      'Calculate My ROI'
                    )}
                  </Button>
                </form>
              )}
            </>
          )}

        </div>

        {/* Right Side - Benefits */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-6">
            {activeTab === 'call' ? 'What You Get (Call Analysis)' : 'What You Get (Database ROI)'}
          </h3>

          <ul className="space-y-4">
            {activeTab === 'call' ? (
              <>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Performance score (0-10)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Top 3 strengths</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Top 3 improvement areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Comparison to top performers</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Hidden commission potential</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Reactivation estimate</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Expected timeline to ROI</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Custom strategy call invite</span>
                </li>
              </>
            )}
          </ul>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-gray-400 text-center">
              <span className="text-brand-400 font-semibold">No sales pitch.</span> No obligation. Just insights.
            </p>
            <p className="text-xs text-gray-500 text-center mt-2">Average analysis time: 60 seconds</p>
          </div>
        </div>

      </div>
    </div>
  );
};
