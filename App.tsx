import React, { useEffect, useState } from 'react';
import { ArrowRight, CalendarCheck, Clock, Database, Mail, Menu, ShieldCheck, X } from 'lucide-react';
import { Button } from './components/ui/Button';
import { Section, SectionContainer } from './components/ui/Section';
import { MobileMenu } from './components/MobileMenu';
import { DatabaseWorthCalculator } from './components/DatabaseWorthCalculator';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { initGA4, trackCTAClick, trackScrollDepth } from './src/utils/analytics';

const faqs = [
  {
    question: 'Is the audit and deployment process compliant with Australian privacy laws?',
    answer:
      'Yes. Think ALM workflows are aligned to the Australian Privacy Act 1988 and Australian Privacy Principles. Client and lead data is handled securely and is never sold to third parties.',
  },
  {
    question: 'What do we receive in the audit?',
    answer:
      'You receive a practical breakdown of dormant CRM revenue, reactivation opportunities, workflow bottlenecks, and the recommended rollout plan for your team.',
  },
  {
    question: 'How long does it take to get live after the audit?',
    answer:
      'Most agencies are live in 2 to 4 weeks. That includes CRM setup, campaign logic, compliance checks, script approval, and launch support.',
  },
  {
    question: 'Do I need to change our CRM or tech stack?',
    answer:
      'No. We deploy into your existing setup. Think ALM can integrate with any CRM that has an API, including Reapit, HubSpot, Salesforce, and custom agency environments.',
  },
  {
    question: 'How hands-on is Think ALM once we launch?',
    answer:
      'This is managed consultancy, not a handover. We monitor performance, refine messaging, and tune routing rules with your team each month.',
  },
  {
    question: 'Can we control which leads are automated?',
    answer:
      'Yes. Your team approves lead-source rules, handover points, and escalation logic before anything goes live.',
  },
  {
    question: 'How is this different from just buying another AI tool?',
    answer:
      'Think ALM is a consultancy-led deployment model. We design the methodology, configure your workflows, and manage outcomes instead of selling a self-serve software seat.',
  },
];

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  useEffect(() => {
    initGA4();
  }, []);

  useEffect(() => {
    const handleScroll = () => trackScrollDepth();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookDemoClick = (location: string) => {
    trackCTAClick('Free Demo', location);
    const calendlyUrl = 'https://calendly.com/charlie-thinkalm/30min';
    window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadAuditClick = (location: string) => {
    trackCTAClick('Download Audit', location);
    setIsLeadFormOpen(true);
  };

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="light-theme min-h-screen bg-dark-950 text-gray-300 font-sans selection:bg-brand-500/30 selection:text-brand-200 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] bg-grid"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <nav className="sticky top-0 z-50 bg-dark-950/80 backdrop-blur-xl border-b border-white/5" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={() => scrollToId('main-content')} className="flex items-center gap-3 group" aria-label="Go to homepage top">
            <img src="/thinkalm-logo.png" alt="Think ALM logo" className="w-10 h-10 rounded-md object-cover border border-white/10" />
            <span className="font-bold text-xl tracking-tight text-white">ThinkALM</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            <a href="#database-worth-calculator" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors">Calculator</a>
            <a href="#how-it-works-after-audit" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors">Method</a>
            <a href="#case-study-proof" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors">Case Study</a>
            <a href="#faq" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors">FAQ</a>
            <a href="/blog/" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors">Blog</a>
            <Button size="sm" onClick={() => handleDownloadAuditClick('navigation-primary')}>Download Audit</Button>
            <button onClick={() => handleBookDemoClick('navigation-secondary')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Free Demo</button>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            aria-label="Open mobile menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onBookDemo={() => handleBookDemoClick('mobile-menu')}
        onTryThinkALM={() => handleDownloadAuditClick('mobile-menu')}
      />

      {isLeadFormOpen && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto relative">
            <button
              onClick={() => setIsLeadFormOpen(false)}
              aria-label="Close form"
              className="absolute -top-2 right-0 md:-top-4 md:-right-4 w-10 h-10 rounded-full bg-white text-slate-900 border border-slate-200 flex items-center justify-center shadow"
            >
              <X size={20} />
            </button>
            <LeadCaptureForm
              className="mt-0"
              onSuccess={() => {
                setTimeout(() => setIsLeadFormOpen(false), 1500);
              }}
              redirectOnSuccess={true}
              successRedirectUrl="/thank-you/"
            />
          </div>
        </div>
      )}

      <SectionContainer id="main-content" className="relative z-10 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <Section className="!py-0 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white mb-8 mx-auto max-w-5xl">
            How much commission is sitting in your CRM right now?
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-10">
            Think ALM is an audit-led consultancy for Australian real estate agencies. We map where revenue is leaking, then deploy and manage the operating system behind faster follow-up and more appraisals. Proven in live work with Forsyth Real Estate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Button size="lg" className="w-full sm:w-auto px-10 h-14 text-lg" onClick={() => {
              trackCTAClick('Open Calculator', 'hero-primary');
              scrollToId('database-worth-calculator');
            }}>
              Calculate Database Worth
            </Button>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto gap-2 text-white border border-white/10 hover:bg-white/5" onClick={() => handleDownloadAuditClick('hero-secondary')}>
              <ArrowRight size={18} /> Download the Audit
            </Button>
          </div>
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-5 py-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-sm text-slate-900 mb-12">
            <span>Trusted by Forsyth Real Estate — serving Sydney for over 100 years.</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <a href="/case-study/forsyth/" className="underline decoration-brand-700 underline-offset-4">View verified pilot outcomes</a>
          </div>

          <div className="max-w-6xl mx-auto">
            <DatabaseWorthCalculator onDownloadAudit={() => handleDownloadAuditClick('calculator-primary')} />
            <div className="mt-6 rounded-2xl border border-white/10 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <img
                src="/assets/audit-mockup.png"
                alt="The Dormant Database Audit preview"
                className="w-full max-w-2xl mx-auto rounded-xl object-contain"
              />
            </div>
          </div>
        </Section>
      </SectionContainer>

      <SectionContainer className="relative z-10 bg-dark-900/50 border-y border-white/5">
        <Section>
          <div className="text-center max-w-4xl mx-auto mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-400 mb-3">WHAT THE AUDIT USUALLY FINDS</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Most Agencies Already Have Pipeline Hiding in Plain Sight.</h2>
            <p className="text-lg text-gray-300 mb-4">
              The issue is rarely lead volume. It is response speed, inconsistent follow-up, and no repeatable method for turning dormant contacts into listing conversations.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            <div className="rounded-xl border border-white/10 bg-dark-900/60 p-6">
              <h3 className="text-white font-semibold mb-2">Slow first response</h3>
              <p className="text-gray-400">Warm opportunities cool down before your team can engage.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/60 p-6">
              <h3 className="text-white font-semibold mb-2">Manual process drift</h3>
              <p className="text-gray-400">Follow-up quality changes by agent and by week, so conversion is unpredictable.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/60 p-6">
              <h3 className="text-white font-semibold mb-2">Dormant database value</h3>
              <p className="text-gray-400">Thousands of past contacts remain untouched despite strong seller intent signals.</p>
            </div>
          </div>
        </Section>
      </SectionContainer>

      <SectionContainer id="how-it-works-after-audit" className="relative z-10 bg-brand-500/5">
        <Section>
          <div className="text-center max-w-4xl mx-auto mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-400 mb-3">HOW IT WORKS AFTER THE AUDIT</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Methodology First. Automation Second.</h2>
            <p className="text-lg text-gray-300">
              Once the audit defines your revenue leaks and priority workflows, we deploy the operating model in three controlled stages.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/10 bg-dark-900/60 p-6">
              <Clock className="w-6 h-6 text-brand-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">Stage 1: Workflow Design</h3>
              <p className="text-gray-400">We define scripts, handovers, compliance controls, and success metrics with your leadership team.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/60 p-6">
              <Database className="w-6 h-6 text-brand-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">Stage 2: CRM Deployment</h3>
              <p className="text-gray-400">We configure workflows into Reapit and approved systems so data and activity stay in one source of truth.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/60 p-6">
              <CalendarCheck className="w-6 h-6 text-brand-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">Stage 3: Managed Optimisation</h3>
              <p className="text-gray-400">We review outcomes monthly and tune the system to increase appraisals and listing conversations.</p>
            </div>
          </div>
        </Section>
      </SectionContainer>

      <SectionContainer id="agents" className="relative z-10">
        <Section>
          <div className="text-center max-w-4xl mx-auto mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-400 mb-3">IMPLEMENTATION MODULES</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">The Four Automation Streams We Deploy.</h2>
            <p className="text-gray-300 text-lg">
              These modules are implementation details inside the audit-led engagement.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-white/10 bg-dark-900/70 p-6">
              <h3 className="text-white font-semibold text-xl mb-2">Lead Qualification Stream</h3>
              <p className="text-gray-400 mb-4">Engages inbound enquiries quickly, captures intent, and routes qualified prospects to your agents.</p>
              <p className="text-brand-400 text-sm">Outcome: Faster triage and higher quality follow-up lists.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/70 p-6">
              <h3 className="text-white font-semibold text-xl mb-2">Appraisal Booking Stream</h3>
              <p className="text-gray-400 mb-4">Handles booking workflows, confirmations, and reminders with clear ownership across the team.</p>
              <p className="text-brand-400 text-sm">Outcome: More vendor conversations per week.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/70 p-6">
              <h3 className="text-white font-semibold text-xl mb-2">Follow-Up Stream</h3>
              <p className="text-gray-400 mb-4">Runs timed follow-up cycles for warm and delayed intent contacts while preserving agency tone.</p>
              <p className="text-brand-400 text-sm">Outcome: Consistent conversion behaviour from every lead source.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/70 p-6">
              <h3 className="text-white font-semibold text-xl mb-2">Database Reactivation Stream</h3>
              <p className="text-gray-400 mb-4">Re-engages dormant contacts with market-aware campaigns and transparent handover rules.</p>
              <p className="text-brand-400 text-sm">Outcome: New listing opportunities from your existing CRM.</p>
            </div>
          </div>
        </Section>
      </SectionContainer>

      <SectionContainer id="integrations" className="relative z-10 bg-dark-900/40">
        <Section>
          <div className="text-center max-w-4xl mx-auto mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-400 mb-3">SYSTEM COMPATIBILITY</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Built for Australian Real Estate Operations.</h2>
            <p className="text-gray-300 text-lg">
              We implement into your current stack so the operating model is practical for principals, sales teams, and admin.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-brand-500/30 bg-brand-500/10 p-6">
              <h3 className="text-white text-xl font-semibold mb-2">Reapit + Real Estate CRMs</h3>
              <p className="text-gray-300">
                We support native real-estate workflows while keeping activities, notes, and contact outcomes synced to your core system.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/70 p-6">
              <h3 className="text-white text-xl font-semibold mb-2">Any CRM with an API</h3>
              <p className="text-gray-400">
                If your CRM has an API, we can integrate and deploy the same methodology into your existing operating environment.
              </p>
            </div>
          </div>
        </Section>
      </SectionContainer>

      <SectionContainer id="case-study-proof" className="relative z-10 bg-dark-900/60 border-y border-white/5">
        <Section>
          <div className="text-center max-w-4xl mx-auto mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-400 mb-3">PROOF</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Verified Results from Forsyth Real Estate.</h2>
            <p className="text-lg text-gray-300">
              Live operational snapshot based on current Forsyth pilot data.
            </p>
          </div>
          <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-dark-900 p-8 mb-8">
            <p className="text-lg text-gray-300 italic">
              "The pilot gave our team a clearer method for lead response and appraisal booking while reducing manual chase work."
            </p>
            <p className="mt-4 text-white font-semibold">Forsyth Real Estate</p>
            <p className="text-sm text-gray-500">Sydney | Established 1921</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            <div className="rounded-xl bg-dark-900 border border-white/10 p-5 text-center">
              <p className="text-3xl font-bold text-brand-500">88,609</p>
              <p className="text-white mt-1">Total Contacts</p>
              <p className="text-xs text-gray-500 mt-2">Current Forsyth dataset</p>
            </div>
            <div className="rounded-xl bg-dark-900 border border-white/10 p-5 text-center">
              <p className="text-3xl font-bold text-brand-500">8,632</p>
              <p className="text-white mt-1">Calls Made</p>
              <p className="text-xs text-gray-500 mt-2">Current Forsyth dataset</p>
            </div>
            <div className="rounded-xl bg-dark-900 border border-white/10 p-5 text-center">
              <p className="text-3xl font-bold text-brand-500">21</p>
              <p className="text-white mt-1">Appointments Booked</p>
              <p className="text-xs text-gray-500 mt-2">Current Forsyth dataset</p>
            </div>
            <div className="rounded-xl bg-dark-900 border border-white/10 p-5 text-center">
              <p className="text-3xl font-bold text-brand-500">79,977</p>
              <p className="text-white mt-1">Calls Remaining</p>
              <p className="text-xs text-gray-500 mt-2">Current Forsyth dataset</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button onClick={() => {
              trackCTAClick('View Case Study', 'proof-section');
              window.location.href = '/case-study/forsyth/';
            }}>
              Read the Full Case Study
            </Button>
          </div>
        </Section>
      </SectionContainer>

      <SectionContainer className="relative z-10">
        <Section>
          <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-dark-900/70 p-8 md:p-10">
            <div className="grid md:grid-cols-[220px_1fr] gap-8 items-center">
              <img
                src="/assets/charlie-bailey.png"
                alt="Charlie Bailey"
                className="w-full max-w-[220px] mx-auto md:mx-0 rounded-2xl border border-white/10 object-cover"
              />
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-brand-400 mb-3">FOUNDER</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">Built by a Melbourne operator with 15 years in sales leadership.</h2>
                <p className="text-gray-300 text-lg mb-4">
                  Think ALM was built for Australian real estate agencies that need practical systems, not theory. We combine on-the-ground sales experience with managed deployment so principals can see measurable uplift, not another dashboard.
                </p>
                <p className="text-gray-400">
                  You work directly with a local team that understands the rhythm of AU vendor pipelines, appraisals, and listing conversion.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </SectionContainer>

      <SectionContainer id="faq" className="relative z-10 bg-dark-900/50 border-y border-white/5">
        <Section>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Questions We Get Asked First.</h2>
          </div>
          <div className="max-w-5xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-xl border border-white/10 bg-dark-900/70 p-5 open:border-brand-500/30">
                <summary className="cursor-pointer text-white font-semibold list-none">{faq.question}</summary>
                <p className="mt-3 text-gray-400">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button onClick={() => handleDownloadAuditClick('faq-primary')}>Download the Audit</Button>
          </div>
        </Section>
      </SectionContainer>

      <footer className="relative z-10 bg-dark-950 text-gray-400 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/thinkalm-logo.png" alt="Think ALM logo" className="w-10 h-10 rounded-md object-cover border border-white/10" />
              <div>
                <p className="text-white font-semibold text-lg">Think ALM</p>
                <p className="text-sm text-gray-500">Audit-led consultancy for Australian real-estate agencies</p>
              </div>
            </div>
            <p className="flex items-center gap-2 mb-2"><Mail size={16} /> admin@thinkalm.com.au</p>
            <p className="text-sm text-gray-500">Melbourne, Australia</p>
            <p className="text-sm text-gray-500 mt-2">Phone: 03 4157 6313</p>
          </div>
          <div className="md:text-right">
            <div className="flex md:justify-end flex-wrap gap-4 mb-6">
              <a href="#main-content" className="hover:text-brand-400">Home</a>
              <a href="/case-study/forsyth/" className="hover:text-brand-400">Case Study</a>
              <a href="/blog/" className="hover:text-brand-400">Blog</a>
              <a href="#faq" className="hover:text-brand-400">Privacy Policy</a>
              <a href="#faq" className="hover:text-brand-400">Terms of Service</a>
              <button onClick={() => handleBookDemoClick('footer-secondary')} className="hover:text-brand-400">Free Demo</button>
              <button onClick={() => handleDownloadAuditClick('footer-primary')} className="hover:text-brand-400">Download Audit</button>
            </div>
            <div className="flex md:justify-end flex-wrap gap-4 text-sm">
              <a href="https://www.facebook.com/thinkalmaiagent" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400">Facebook</a>
              <a href="https://www.instagram.com/thinkalm.ai/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400">Instagram</a>
              <a href="https://x.com/thinkalmai" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400">X</a>
              <a href="https://www.linkedin.com/company/think-alm/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400">LinkedIn</a>
              <a href="https://www.tiktok.com/@thinkalm.ai" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400">TikTok</a>
              <a href="https://g.page/r/CcMrtIt057feEBM/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400">Google Business Profile</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-white/5 text-xs text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p>© 2026 Think ALM Pty Ltd. All rights reserved.</p>
          <p className="flex items-center gap-2"><ShieldCheck size={14} /> Think ALM is not affiliated with any real estate portal or industry body.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
