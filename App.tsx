import React, { useState, useEffect } from 'react';
import {
  Database,
  Bot,
  GraduationCap,
  Linkedin,
  Upload,
  Send,
  Clock,
  Zap,
  BarChart3,
  TrendingUp,
  ArrowRight,
  Play,
  Menu
} from 'lucide-react';
import { Button } from './components/ui/Button';
import { Section, SectionContainer } from './components/ui/Section';
import { MobileMenu } from './components/MobileMenu';
import { PainPointsGrid } from './components/PainPointsGrid';
import { EngineCard } from './components/EngineCard';
import { TimelineStep } from './components/TimelineStep';
import { IntegrationLogos } from './components/IntegrationLogos';
import { ROICalculator } from './components/ROICalculator';
import { DiagnosticTool } from './components/DiagnosticTool';
import {
  initGA4,
  trackCTAClick,
  trackCalendlyOpened,
  trackSeePlatformClick,
  trackScrollDepth
} from './src/utils/analytics';

// --- VISUAL COMPONENTS ---

const DashboardMockup = () => (
  <div className="relative w-full max-w-5xl mx-auto mt-12 lg:mt-16 rounded-xl bg-dark-900 border border-gray-800 shadow-2xl overflow-hidden group" role="img" aria-label="ThinkALM dashboard preview">
    <div className="absolute -inset-1 bg-brand-500/20 blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" aria-hidden="true"></div>
    <div className="relative bg-dark-850 border border-white/5 rounded-xl overflow-hidden">
      <div className="bg-dark-900 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-xs text-gray-500 font-mono">ThinkALM Command Center</div>
      </div>
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-dark-800/50 p-4 rounded-lg border border-white/5">
            <div className="text-sm text-gray-400 mb-1">Appraisals Booked</div>
            <div className="text-3xl font-bold text-white">27</div>
            <div className="text-xs text-brand-500 flex items-center mt-2">
              <TrendingUp size={12} className="mr-1" /> Last 30 days
            </div>
          </div>
          <div className="bg-dark-800/50 p-4 rounded-lg border border-white/5">
            <div className="text-sm text-gray-400 mb-1">Leads Reactivated</div>
            <div className="text-3xl font-bold text-white">142</div>
            <div className="text-xs text-brand-500 flex items-center mt-2">
              <span className="w-2 h-2 bg-brand-500 rounded-full mr-1 animate-pulse"></span> Active
            </div>
          </div>
          <div className="bg-dark-800/50 p-4 rounded-lg border border-white/5">
            <div className="text-sm text-gray-400 mb-1">Avg. Agent Score</div>
            <div className="text-3xl font-bold text-white">87%</div>
            <div className="text-xs text-gray-500 mt-2">
              <span className="text-green-400">+12%</span> vs last month
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    initGA4();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      trackScrollDepth();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookDemoClick = (location: string) => {
    trackCTAClick('Book a Demo', location);
    trackCalendlyOpened(location);
    const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/charlie-thinkalm/30min';
    window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSeePlatformClick = (location: string) => {
    trackSeePlatformClick(location);
  };

  const scrollToCalculator = () => {
    const calculator = document.getElementById('roi-calculator');
    calculator?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-950 text-gray-300 font-sans selection:bg-brand-500/30 selection:text-brand-200 overflow-x-hidden">

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] bg-grid"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[100px] rounded-full mix-blend-screen"></div>
      </div>

      {/* Sticky Header */}
      <nav className="sticky top-0 z-50 bg-dark-950/70 backdrop-blur-xl border-b border-white/5" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 bg-brand-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(44,197,161,0.4)]">
              <Zap className="text-dark-950 w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">ThinkALM</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#platform" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors">Platform</a>
            <a href="#solutions" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors">Solutions</a>
            <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors">Pricing</a>
            <Button size="sm" onClick={() => handleBookDemoClick('navigation')}>Book a Demo</Button>
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
      />

      {/* SECTION 1 — HERO */}
      <SectionContainer id="main-content" className="relative z-10 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <Section className="!py-0 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            AI AGENTS • DATABASE REACTIVATION • CALL QA
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] text-white mb-8 mx-auto max-w-6xl text-center">
            The AI Sales OS Built for<br />
            <span className="text-brand-500">Real Estate</span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10">
            Your agency is sitting on tens of thousands of missed opportunities. ThinkALM automates lead contact, follow-up, qualification, booking, and agent improvement — all inside one unified real estate sales system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="w-full sm:w-auto px-10 h-14 text-lg" onClick={() => handleBookDemoClick('hero')}>
              Book a Demo
            </Button>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto gap-2 text-white border border-white/10 hover:bg-white/5" onClick={() => handleSeePlatformClick('hero')}>
              <Play size={18} className="fill-current" /> See the Platform
            </Button>
          </div>

          <DashboardMockup />
        </Section>
      </SectionContainer>

      {/* SECTION 2 — PROBLEM AGITATION */}
      <SectionContainer className="relative z-10 bg-dark-900/50 border-y border-white/5">
        <Section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The Real Cost of Business as Usual</h2>
          </div>

          <PainPointsGrid
            painPoints={[
              {
                icon: Database,
                text: "10,000+ leads sitting dead in your CRM"
              },
              {
                icon: Zap,
                text: "New leads missed while you're on calls"
              },
              {
                icon: BarChart3,
                text: "Reps making the same mistakes every week"
              },
              {
                icon: Clock,
                text: "No time to coach—too busy firefighting"
              }
            ]}
            className="max-w-5xl mx-auto"
          />
        </Section>
      </SectionContainer>

      {/* SECTION 3 — ROI CALCULATOR */}
      <SectionContainer className="relative z-10">
        <Section>
          <ROICalculator onBookDemo={() => handleBookDemoClick('calculator')} />
        </Section>
      </SectionContainer>

      {/* SECTION 4 — THE THINKALM SYSTEM (3 ENGINES) */}
      <SectionContainer id="platform" className="relative z-10 bg-dark-900/30">
        <Section>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Three AI Engines That Work Together</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Not just tools—a complete system that handles volume and builds skill
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <EngineCard
              icon={Database}
              title="AI Lead Engine"
              subtitle="Never Miss a Deal"
              features={[
                "Database Reactivation (wake up 10,000+ old leads)",
                "Instant Lead Response (< 5 seconds via SMS/Voice)",
                "24/7 Follow-Up (no lead falls through cracks)"
              ]}
              resultText="2-3x more appointments without hiring"
              ctaText="See Database Demo"
              onCtaClick={() => handleBookDemoClick('engine-lead')}
            />

            <EngineCard
              icon={GraduationCap}
              title="ThinkABC Training Engine"
              subtitle="Your 24/7 Sales Coach"
              features={[
                "Analyzes every call automatically",
                "Scores reps in 60 seconds (strengths + gaps)",
                "Auto-assigns personalized training",
                "Tracks improvement week-over-week"
              ]}
              resultText="Bottom performers close like top performers in 8 weeks"
              ctaText="Analyze a Call Free"
              onCtaClick={() => {
                const diagnostic = document.getElementById('diagnostic-tool');
                diagnostic?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <EngineCard
              icon={Linkedin}
              title="Outreach Engine"
              subtitle="Scale Your Prospecting"
              features={[
                "LinkedIn automation (build pipeline while you sleep)",
                "Email sequences (personalized at scale)",
                "Calendar booking (prospects book directly)"
              ]}
              resultText="Pipeline stays full without manual prospecting"
              ctaText="See Outreach Demo"
              onCtaClick={() => handleBookDemoClick('engine-outreach')}
            />
          </div>
        </Section>
      </SectionContainer>

      {/* SECTION 5 — WHY THIS MATTERS */}
      <SectionContainer className="relative z-10">
        <Section>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Why Volume + Quality = Unstoppable</h2>

            <div className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-6">
              <p>
                AI handles the thousands of touches you can't make yourself.<br/>
                ThinkABC makes sure every conversation your team does have is world-class.
              </p>

              <div className="bg-dark-900/50 border border-white/10 rounded-xl p-8 space-y-4 text-left">
                <p className="flex items-start gap-3">
                  <ArrowRight className="w-6 h-6 text-brand-500 flex-shrink-0 mt-1" />
                  <span><strong className="text-white">More at-bats</strong> (AI contacts thousands per week)</span>
                </p>
                <p className="flex items-start gap-3">
                  <ArrowRight className="w-6 h-6 text-brand-500 flex-shrink-0 mt-1" />
                  <span><strong className="text-white">Better swings</strong> (coached reps close 2-3x more)</span>
                </p>
                <p className="flex items-start gap-3">
                  <ArrowRight className="w-6 h-6 text-brand-500 flex-shrink-0 mt-1" />
                  <span><strong className="text-white">Compounding growth</strong> (system gets smarter every week)</span>
                </p>
              </div>

              <p className="text-2xl font-bold text-brand-500 pt-4">
                Think of it like this: It's an unlimited ISA team + a sales coach who never sleeps—for less than one salary.
              </p>
            </div>
          </div>
        </Section>
      </SectionContainer>

      {/* SECTION 7 — HOW IT WORKS */}
      <SectionContainer className="relative z-10">
        <Section>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">From Setup to Results in 4-6 Weeks</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <TimelineStep
              stepNumber={1}
              icon={Upload}
              title="Upload & Connect"
              description="Upload your database. Connect your CRM. Share sample calls. Takes 30 minutes."
            />

            <TimelineStep
              stepNumber={2}
              icon={Bot}
              title="AI Goes to Work"
              description="Our engines analyze your data, start contacting leads, and begin coaching your team. You monitor the dashboard."
            />

            <TimelineStep
              stepNumber={3}
              icon={TrendingUp}
              title="Watch Results Roll In"
              description="Hot leads appear in your calendar. Reps get daily coaching. Pipeline grows. You scale."
              isLast={true}
            />
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 px-8 py-4 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-400 font-semibold">
              <span>Live in 4-6 weeks</span>
              <span className="text-gray-600">|</span>
              <span>First results in 6-8 weeks</span>
              <span className="text-gray-600">|</span>
              <span>ROI in 3-4 months</span>
            </div>
          </div>
        </Section>
      </SectionContainer>

      {/* SECTION 8 — FREE DIAGNOSTIC TOOL */}
      <SectionContainer id="diagnostic-tool" className="relative z-10 bg-dark-900/30">
        <Section>
          <DiagnosticTool />
        </Section>
      </SectionContainer>

      {/* SECTION 9 — INTEGRATIONS */}
      <SectionContainer className="relative z-10">
        <Section>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Works With Your Existing Stack</h2>
          </div>

          <IntegrationLogos
            integrations={[
              { name: 'AgentBox', logoUrl: '/logos/agentbox.svg' },
              { name: 'Rex', logoUrl: '/logos/rex.svg' },
              { name: 'VaultRE', logoUrl: '/logos/vaultre.svg' },
              { name: 'Google Calendar', logoUrl: '/logos/google-calendar.svg' },
              { name: 'Outlook', logoUrl: '/logos/outlook.svg' },
              { name: 'Zoom', logoUrl: '/logos/zoom.svg' }
            ]}
          />
        </Section>
      </SectionContainer>

      {/* SECTION 10 — PRICING */}
      <SectionContainer id="pricing" className="relative z-10 bg-dark-900/50">
        <Section>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Transparent Pricing. Guaranteed ROI.</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our guarantee: See positive ROI in 60 days, or we work for free until you do.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* CORE */}
            <div className="glass-card rounded-2xl p-8 hover:bg-dark-800/50 transition-colors">
              <h3 className="text-2xl font-bold text-white">CORE</h3>
              <div className="text-3xl font-bold text-brand-500 mt-4 mb-2">$3,000<span className="text-lg text-gray-500 font-normal">/month</span></div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-brand-500/50 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  AI Voice Agents
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-brand-500/50 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  Database Reactivation
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-brand-500/50 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  Weekly Reporting
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-brand-500/50 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  Standard Support
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-8" onClick={() => handleBookDemoClick('pricing-core')}>Get Core</Button>
            </div>

            {/* PRO */}
            <div className="rounded-2xl p-8 bg-dark-800 border border-brand-500 shadow-[0_0_40px_rgba(44,197,161,0.15)] relative transform md:-translate-y-6 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-dark-950 px-6 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                Best Value
              </div>
              <h3 className="text-2xl font-bold text-white">PRO</h3>
              <div className="text-3xl font-bold text-brand-500 mt-4 mb-2">$5,000<span className="text-lg text-gray-500 font-normal">/month</span></div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3 text-white font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-dark-950 rounded-full"></div>
                  </div>
                  Everything in Core
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-dark-950 rounded-full"></div>
                  </div>
                  AI Widget for Website
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-dark-950 rounded-full"></div>
                  </div>
                  ThinkABC Training
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-dark-950 rounded-full"></div>
                  </div>
                  Call Scoring
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-dark-950 rounded-full"></div>
                  </div>
                  Advanced Analytics
                </li>
                <li className="flex items-center gap-3 text-white font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-dark-950 rounded-full"></div>
                  </div>
                  Priority Support
                </li>
              </ul>
              <Button className="w-full mt-8" onClick={() => handleBookDemoClick('pricing-pro')}>Get Pro</Button>
            </div>

            {/* ENTERPRISE */}
            <div className="glass-card rounded-2xl p-8 hover:bg-dark-800/50 transition-colors">
              <h3 className="text-2xl font-bold text-white">ENTERPRISE</h3>
              <div className="text-3xl font-bold text-brand-500 mt-4 mb-2">Custom<span className="text-lg text-gray-500 font-normal">/month</span></div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-brand-500/50 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  Full OS Rollout
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-brand-500/50 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  100k+ Databases
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-brand-500/50 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  Dedicated Strategist
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-brand-500/50 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  Private AI Instance
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-brand-500/50 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  Custom Integrations
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-8" onClick={() => handleBookDemoClick('pricing-enterprise')}>Contact Us</Button>
            </div>
          </div>

          {/* Guarantee */}
          <div className="mt-16 glass-card border-dashed border-gray-700 p-10 rounded-xl text-center max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-white mb-2">15 Appraisals in 30–45 Days.</h4>
            <p className="text-xl text-brand-500">Or We Work for Free Until We Do.</p>
            <p className="text-gray-500 mt-4 text-sm">Your strongest conversion lever.</p>
          </div>
        </Section>
      </SectionContainer>

      {/* SECTION 11 — FINAL CTA */}
      <SectionContainer className="relative z-10 border-t border-white/5 bg-gradient-to-b from-dark-950 to-brand-900/20">
        <Section className="text-center py-32">
          <h2 className="text-4xl sm:text-6xl font-bold mb-8 text-white tracking-tight">
            Unlock the Full Power of AI<br/>Across Your Real Estate Business
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Your database. Your leads. Your agents. Your entire revenue engine — fully automated.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto min-w-[200px] h-14 text-lg" onClick={() => handleBookDemoClick('final-cta')}>
              Book a Demo
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] h-14 text-lg border-white/20 text-white hover:bg-white/10" onClick={() => handleSeePlatformClick('final-cta')}>
              See the Platform
            </Button>
          </div>
        </Section>
      </SectionContainer>

      {/* Footer */}
      <footer className="relative z-10 bg-dark-950 text-gray-500 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Zap className="w-6 h-6 text-brand-500" />
            <span className="text-xl font-bold text-white">ThinkALM</span>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} ThinkALM. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;
