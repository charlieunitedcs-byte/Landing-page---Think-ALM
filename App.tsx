import React, { useEffect, useState } from 'react';
import { ArrowRight, Bot, CalendarCheck, Clock, Database, Mail, Menu, ShieldCheck, X } from 'lucide-react';
import { Button } from './components/ui/Button';
import { Section, SectionContainer } from './components/ui/Section';
import { MobileMenu } from './components/MobileMenu';
import { CalendlyModal } from './components/CalendlyModal';
import { DiagnosticTool } from './components/DiagnosticTool';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { initGA4, trackCTAClick, trackCalendlyOpened, trackCalendlyScheduled, trackScrollDepth } from './src/utils/analytics';

const faqs = [
  {
    question: 'Is the AI agent compliant with Australian privacy laws?',
    answer:
      'Yes. Think ALM agents are built to comply with the Australian Privacy Act 1988 and the Privacy Principles. Lead data is handled securely and is never shared or sold to third parties.',
  },
  {
    question: 'What happens to the recordings I upload for analysis?',
    answer:
      'Uploaded recordings are processed for analysis only and are not stored beyond the analysis session. No recordings are retained, sold, or used to train third-party models.',
  },
  {
    question: 'How long does it take to get an AI agent live?',
    answer:
      "Most agencies are live within 2 to 4 weeks. This includes CRM integration, configuration, script training, and testing before go-live. We handle the setup end to end.",
  },
  {
    question: 'Do I need to change our CRM or tech stack?',
    answer:
      'No. Think ALM agents are designed to work with your existing setup. Our primary integration is Reapit CRM, and we can also support broader commercial CRM environments such as HubSpot and Salesforce based on your workflow.',
  },
  {
    question: 'What does the AI agent actually say to leads?',
    answer:
      "Your agent uses scripts based on your agency voice, language, and process. Nothing goes live without your approval, and you keep full visibility and control.",
  },
  {
    question: 'Can we customise which leads the agent handles?',
    answer:
      'Yes. We configure lead sources, enquiry types, and pipeline stages around your workflow, so your team controls where AI starts and where humans take over.',
  },
  {
    question: 'How is Think ALM different from a chatbot?',
    answer:
      'A chatbot answers basic preset questions. A Think ALM AI agent qualifies leads, books appointments, follows up over time, and logs everything into your CRM.',
  },
];

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  useEffect(() => {
    initGA4();
  }, []);

  useEffect(() => {
    const handleScroll = () => trackScrollDepth();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookDemoClick = (location: string) => {
    trackCTAClick('Book a Demo', location);
    trackCalendlyOpened(location);
    setIsCalendlyOpen(true);
  };

  const handleTryThinkALMClick = (location: string) => {
    trackCTAClick('Try ThinkALM', location);
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
            <a href="#solutions" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors">Solution</a>
            <a href="#agents" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors">Agent Types</a>
            <a href="#faq" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors">FAQ</a>
            <Button size="sm" onClick={() => handleBookDemoClick('navigation')}>Book a Demo</Button>
            <Button variant="outline" size="sm" onClick={() => handleTryThinkALMClick('navigation')}>Try ThinkALM</Button>
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
        onTryThinkALM={() => handleTryThinkALMClick('mobile-menu')}
      />

      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        onEventScheduled={() => {
          trackCalendlyScheduled();
          setIsCalendlyOpen(false);
          window.location.href = '/booking-confirmed/';
        }}
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
            AI Agents Built for Real Estate Agencies.
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-10">
            Think ALM deploys AI agents that qualify leads, book appraisals, follow up on enquiries, and integrate directly with your CRM so your team focuses on closing, not chasing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Button size="lg" className="w-full sm:w-auto px-10 h-14 text-lg" onClick={() => handleBookDemoClick('hero-primary')}>
              Book a Demo
            </Button>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto gap-2 text-white border border-white/10 hover:bg-white/5" onClick={() => scrollToId('how-it-works')}>
              <ArrowRight size={18} /> See How It Works
            </Button>
          </div>
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-5 py-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-sm text-slate-900">
            <span>Trusted by Forsyth Real Estate — serving Sydney for over 100 years.</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span>Integrated with Reapit CRM.</span>
          </div>

          <div className="mt-12 max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
            <div className="rounded-2xl bg-gradient-to-br from-brand-500/20 via-brand-500/10 to-white border border-brand-500/20 p-8 md:p-12 text-left">
              <p className="text-sm font-semibold text-brand-700 mb-4">AI AGENT CONTROL CENTER</p>
              <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-8">Launch AI agents trained for your agency in minutes</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-slate-900 font-semibold mb-1">Lead Qualification Agent</p>
                  <p className="text-sm text-slate-600">Engages new leads in seconds and scores intent instantly.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-slate-900 font-semibold mb-1">Appraisal Booking Agent</p>
                  <p className="text-sm text-slate-600">Books appraisals directly into your team calendars.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-slate-900 font-semibold mb-1">Follow-Up Agent</p>
                  <p className="text-sm text-slate-600">Runs personalised follow-up sequences around the clock.</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </SectionContainer>

      <SectionContainer className="relative z-10 bg-dark-900/50 border-y border-white/5">
        <Section>
          <div className="text-center max-w-4xl mx-auto mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-400 mb-3">THE CHALLENGE</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Real Estate Agencies Are Losing Listings to Slow Follow-Up.</h2>
            <p className="text-lg text-gray-300 mb-4">
              The average lead response time in Australian real estate is over 3 hours. By then, many vendors have already spoken to competitors.
            </p>
            <p className="text-lg text-gray-300">
              Enquiries arrive around the clock and no human team can respond instantly, consistently, and professionally to every lead source.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            <div className="rounded-xl border border-white/10 bg-dark-900/60 p-6">
              <h3 className="text-white font-semibold mb-2">Slow Response</h3>
              <p className="text-gray-400">Leads go cold in minutes. Most agencies respond in hours.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/60 p-6">
              <h3 className="text-white font-semibold mb-2">Inconsistent Follow-Up</h3>
              <p className="text-gray-400">Manual follow-up varies by agent, quality, timing, and tone are never guaranteed.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/60 p-6">
              <h3 className="text-white font-semibold mb-2">Wasted Agent Time</h3>
              <p className="text-gray-400">Your best closers spend hours on admin instead of listing presentations.</p>
            </div>
          </div>
        </Section>
      </SectionContainer>

      <SectionContainer id="solutions" className="relative z-10 bg-brand-500/5">
        <Section>
          <div className="text-center max-w-4xl mx-auto mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-400 mb-3">THE SOLUTION</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Your Agency. Powered by AI Agents.</h2>
            <p className="text-lg text-gray-300">
              Think ALM builds, deploys, and manages AI agents inside your agency. They handle high-volume, time-sensitive tasks while your team focuses on high-value conversations and closing.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/10 bg-dark-900/60 p-6">
              <Clock className="w-6 h-6 text-brand-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">Responds in Seconds</h3>
              <p className="text-gray-400">Every inbound enquiry is acknowledged instantly, 24/7.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/60 p-6">
              <Database className="w-6 h-6 text-brand-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">Integrates with Your CRM</h3>
              <p className="text-gray-400">Works directly with Reapit and other real estate CRMs with no manual data entry.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/60 p-6">
              <Bot className="w-6 h-6 text-brand-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">Fully Managed</h3>
              <p className="text-gray-400">Think ALM handles setup, training, and ongoing optimisation for your team.</p>
            </div>
          </div>
        </Section>
      </SectionContainer>

      <SectionContainer id="how-it-works" className="relative z-10">
        <Section>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Up and Running in 3 Steps.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-brand-500/10 border border-brand-500/20 p-6">
              <p className="text-4xl font-black text-brand-500 mb-4">1</p>
              <h3 className="text-white font-semibold mb-2">We Learn Your Agency</h3>
              <p className="text-gray-300">We map your lead flow, CRM setup, scripts, and brand voice.</p>
            </div>
            <div className="rounded-xl bg-brand-500/10 border border-brand-500/20 p-6">
              <p className="text-4xl font-black text-brand-500 mb-4">2</p>
              <h3 className="text-white font-semibold mb-2">We Deploy Your Agent</h3>
              <p className="text-gray-300">Your AI agent goes live, integrated and trained for day-one lead engagement.</p>
            </div>
            <div className="rounded-xl bg-brand-500/10 border border-brand-500/20 p-6">
              <p className="text-4xl font-black text-brand-500 mb-4">3</p>
              <h3 className="text-white font-semibold mb-2">We Optimise Continuously</h3>
              <p className="text-gray-300">We refine performance and report on leads, appraisals, and pipeline value.</p>
            </div>
          </div>
        </Section>
      </SectionContainer>

      <SectionContainer id="agents" className="relative z-10 bg-dark-900/40">
        <Section>
          <div className="text-center max-w-4xl mx-auto mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-400 mb-3">WHAT OUR AGENTS DO</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">AI Agents for Every Stage of Your Pipeline.</h2>
            <p className="text-gray-300 text-lg">
              Think ALM agents handle the critical work between lead capture and listing presentation where most agencies lose deals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-white/10 bg-dark-900/70 p-6">
              <h3 className="text-white font-semibold text-xl mb-2">Lead Qualification Agent</h3>
              <p className="text-gray-400 mb-4">Engages inbound enquiries in seconds, asks qualifying questions, and grades intent before human follow-up.</p>
              <p className="text-brand-400 text-sm">Outcome: Your agents only call leads worth calling.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/70 p-6">
              <h3 className="text-white font-semibold text-xl mb-2">Appraisal Booking Agent</h3>
              <p className="text-gray-400 mb-4">Books listing appraisals directly into your team calendar and handles confirmations and reminders.</p>
              <p className="text-brand-400 text-sm">Outcome: More appraisals booked without more admin.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/70 p-6">
              <h3 className="text-white font-semibold text-xl mb-2">Follow-Up Agent</h3>
              <p className="text-gray-400 mb-4">Maintains contact with warm and cold leads using timely, personalised messaging over weeks and months.</p>
              <p className="text-brand-400 text-sm">Outcome: Leads re-engage when they are ready to sell.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/70 p-6">
              <h3 className="text-white font-semibold text-xl mb-2">Database Reactivation Agent</h3>
              <p className="text-gray-400 mb-4">Re-engages dormant contacts in your CRM to identify sellers based on timing and historical interaction.</p>
              <p className="text-brand-400 text-sm">Outcome: Revenue from leads you already paid to acquire.</p>
            </div>
          </div>
        </Section>
      </SectionContainer>

      <SectionContainer id="integrations" className="relative z-10">
        <Section>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Works With the Tools Your Agency Already Uses.</h2>
            <p className="text-lg text-gray-300 mb-8">
              Think ALM integrates directly with your real estate CRM so data flows automatically with no double handling and no separate workflow.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-brand-500/30 bg-brand-500/10 p-6">
              <h3 className="text-white text-xl font-semibold mb-2">Reapit CRM</h3>
              <p className="text-gray-300">
                Leads captured by your AI agent are automatically logged as contacts, activities, and opportunities in Reapit.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-900/70 p-6">
              <h3 className="text-white text-xl font-semibold mb-2">Additional Integrations</h3>
              <p className="text-gray-400">
                Additional integrations are available on request, including commercial CRM workflows such as HubSpot and Salesforce.
              </p>
            </div>
          </div>
        </Section>
      </SectionContainer>

      <SectionContainer className="relative z-10 bg-dark-900/60 border-y border-white/5">
        <Section>
          <div className="text-center max-w-4xl mx-auto mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-400 mb-3">TRUSTED BY REAL ESTATE PROFESSIONALS</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">The Agencies Using Think ALM Are Winning More Listings.</h2>
          </div>
          <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-dark-900 p-8 mb-8">
            <p className="text-lg text-gray-300 italic">
              "Forsyth Real Estate pilot performance showed measurable uplift in appraisals booked and lead response speed."
            </p>
            <p className="mt-4 text-white font-semibold">Forsyth Real Estate</p>
            <p className="text-sm text-gray-500">Sydney | Established 1921 | 100+ Years in Real Estate</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <div className="rounded-xl bg-dark-900 border border-white/10 p-5 text-center">
              <p className="text-3xl font-bold text-brand-500">27</p>
              <p className="text-white mt-1">Appraisals Booked</p>
              <p className="text-xs text-gray-500 mt-2">Forsyth Real Estate — 60-day pilot results</p>
            </div>
            <div className="rounded-xl bg-dark-900 border border-white/10 p-5 text-center">
              <p className="text-3xl font-bold text-brand-500">60s</p>
              <p className="text-white mt-1">Average Lead Response Time</p>
              <p className="text-xs text-gray-500 mt-2">Forsyth Real Estate — 60-day pilot results</p>
            </div>
            <div className="rounded-xl bg-dark-900 border border-white/10 p-5 text-center">
              <p className="text-3xl font-bold text-brand-500">375%</p>
              <p className="text-white mt-1">Projected ROI</p>
              <p className="text-xs text-gray-500 mt-2">Forsyth Real Estate — 60-day pilot results</p>
            </div>
          </div>
        </Section>
      </SectionContainer>

      <SectionContainer id="diagnostic-tool" className="relative z-10">
        <Section>
          <div className="text-center max-w-4xl mx-auto mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-400 mb-3">FREE DIAGNOSTIC TOOL</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Find Out What Your Calls Are Costing You. Free.</h2>
            <p className="text-lg text-gray-300">
              Upload a recorded sales call and our AI analyses it in 60 seconds, scoring the conversation and identifying missed opportunities.
            </p>
          </div>
          <DiagnosticTool />
          <div className="text-center mt-10 max-w-3xl mx-auto">
            <p className="text-gray-300 mb-5">
              Seen enough? Most agencies that run an analysis book a demo the same day.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={() => handleBookDemoClick('post-diagnostic')}>Book a Demo</Button>
              <Button size="lg" variant="outline" onClick={() => handleTryThinkALMClick('post-diagnostic')}>Try ThinkALM</Button>
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
        </Section>
      </SectionContainer>

      <footer className="relative z-10 bg-dark-950 text-gray-400 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/thinkalm-logo.png" alt="Think ALM logo" className="w-10 h-10 rounded-md object-cover border border-white/10" />
              <div>
                <p className="text-white font-semibold text-lg">Think ALM</p>
                <p className="text-sm text-gray-500">AI Agents for Real Estate Agencies</p>
              </div>
            </div>
            <p className="flex items-center gap-2 mb-2"><Mail size={16} /> admin@thinkalm.com.au</p>
            <p className="text-sm text-gray-500">Melbourne, Australia</p>
            <p className="text-sm text-gray-500 mt-2">Phone: 03 4157 6313</p>
          </div>
          <div className="md:text-right">
            <div className="flex md:justify-end flex-wrap gap-4 mb-6">
              <a href="#main-content" className="hover:text-brand-400">Home</a>
              <a href="#faq" className="hover:text-brand-400">Privacy Policy</a>
              <a href="#faq" className="hover:text-brand-400">Terms of Service</a>
              <button onClick={() => handleBookDemoClick('footer')} className="hover:text-brand-400">Book a Demo</button>
              <button onClick={() => handleTryThinkALMClick('footer')} className="hover:text-brand-400">Try ThinkALM</button>
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
