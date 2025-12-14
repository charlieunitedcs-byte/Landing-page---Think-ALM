import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Phone,
  Mail,
  MessageSquare,
  Linkedin,
  BarChart3,
  Bot,
  Zap,
  Clock,
  Users,
  ArrowRight,
  ShieldCheck,
  Play,
  TrendingUp,
  LayoutDashboard,
  Database,
  RefreshCcw,
  GraduationCap,
  Home,
  DollarSign,
  Activity,
  Search,
  CalendarCheck,
  Menu
} from 'lucide-react';
import { Button } from './components/ui/Button';
import { Section, SectionContainer } from './components/ui/Section';
import { MobileMenu } from './components/MobileMenu';
import { CalendlyModal } from './components/CalendlyModal';
import {
  initGA4,
  trackCTAClick,
  trackCalendlyOpened,
  trackCalendlyScheduled,
  trackSeePlatformClick,
  trackScrollDepth
} from './src/utils/analytics';

// --- VISUAL COMPONENTS ---

const DashboardMockup = () => (
  <div className="relative w-full max-w-5xl mx-auto mt-12 lg:mt-16 rounded-xl bg-dark-900 border border-gray-800 shadow-2xl overflow-hidden group" role="img" aria-label="ThinkALM dashboard preview showing appraisals booked, leads reactivated, and agent performance metrics">
    {/* Glow effect behind the dashboard */}
    <div className="absolute -inset-1 bg-brand-500/20 blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" aria-hidden="true"></div>

    <div className="relative bg-dark-850 border border-white/5 rounded-xl overflow-hidden">
      {/* Window Controls */}
      <div className="bg-dark-900 border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-xs text-gray-500 font-mono">ThinkALM Command Center</div>
      </div>
      
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Cards */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-dark-800/50 p-4 rounded-lg border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10"><Home size={40} className="text-brand-500"/></div>
                <div className="text-sm text-gray-400 mb-1">Appraisals Booked</div>
                <div className="text-3xl font-bold text-white">27</div>
                <div className="text-xs text-brand-500 flex items-center mt-2">
                  <TrendingUp size={12} className="mr-1" /> Last 30 days
                </div>
            </div>
            <div className="bg-dark-800/50 p-4 rounded-lg border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10"><RefreshCcw size={40} className="text-brand-500"/></div>
                <div className="text-sm text-gray-400 mb-1">Leads Reactivated</div>
                <div className="text-3xl font-bold text-white">142</div>
                <div className="text-xs text-brand-500 flex items-center mt-2">
                  <span className="w-2 h-2 bg-brand-500 rounded-full mr-1 animate-pulse"></span> Active conversations
                </div>
            </div>
            <div className="bg-dark-800/50 p-4 rounded-lg border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10"><GraduationCap size={40} className="text-brand-500"/></div>
                <div className="text-sm text-gray-400 mb-1">Avg. Agent Score</div>
                <div className="text-3xl font-bold text-white">87%</div>
                 <div className="text-xs text-gray-500 mt-2">
                  <span className="text-green-400">+12%</span> vs last month
                </div>
            </div>
        </div>

        {/* Chart Area */}
        <div className="md:col-span-2 bg-dark-800/30 p-5 rounded-lg border border-white/5 h-64 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-gray-300">Database Reactivation Pipeline</h4>
                <div className="flex gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-500"></span>
                    <span className="text-xs text-gray-500">Engaged</span>
                    <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                    <span className="text-xs text-gray-500">Booked</span>
                </div>
            </div>
            {/* Fake Chart Visualization */}
            <div className="flex-1 flex items-end gap-2 px-2">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-1 group/bar">
                         <div style={{height: `${h * 0.3}%`}} className="w-full bg-purple-500/30 rounded-t-sm transition-all group-hover/bar:bg-purple-500/50"></div>
                        <div style={{height: `${h}%`}} className="w-full bg-brand-500/50 rounded-t-sm relative transition-all group-hover/bar:bg-brand-500">
                             {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-black text-[10px] text-white rounded opacity-0 group-hover/bar:opacity-100 whitespace-nowrap border border-white/10">
                                {h} Leads
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600 font-mono">
                <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
            </div>
        </div>

        {/* Live Chat Log */}
        <div className="md:col-span-1 bg-dark-800/30 rounded-lg border border-white/5 flex flex-col h-64">
             <div className="p-3 border-b border-white/5 flex justify-between items-center bg-white/5">
                <span className="text-xs font-semibold text-brand-500 uppercase tracking-wider flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-ping"></div> Live Reactivation
                </span>
                <span className="text-[10px] text-gray-500">Just Now</span>
             </div>
             <div className="p-3 space-y-3 overflow-hidden text-xs relative flex-1">
                 <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-dark-800/30 to-transparent z-10 pointer-events-none"></div>
                 
                 <div className="flex gap-2">
                   <div className="w-6 h-6 rounded-full bg-brand-900/50 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
                     <Bot size={12} className="text-brand-500" />
                   </div>
                   <div className="bg-dark-800 p-2 rounded-lg rounded-tl-none border border-white/5 text-gray-300">
                     Hi John, it's Alex from Ray White. Are you still planning to sell your property at 12 Maple St this year?
                   </div>
                 </div>

                 <div className="flex gap-2 flex-row-reverse">
                   <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                     <span className="text-[10px] font-bold text-white">J</span>
                   </div>
                   <div className="bg-brand-500/10 border border-brand-500/20 p-2 rounded-lg rounded-tr-none text-brand-100">
                     We're actually thinking about it for next month. What's the market like?
                   </div>
                 </div>

                 <div className="flex gap-2">
                   <div className="w-6 h-6 rounded-full bg-brand-900/50 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
                     <Bot size={12} className="text-brand-500" />
                   </div>
                   <div className="bg-dark-800 p-2 rounded-lg rounded-tl-none border border-white/5 text-gray-300">
                     Inventory is low, so it's a great time. I can have our senior agent drop by for a quick appraisal Thursday?
                   </div>
                 </div>
                 
                  <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-dark-800 to-transparent z-10 pointer-events-none"></div>
             </div>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  // Initialize Google Analytics on mount
  useEffect(() => {
    initGA4();
  }, []);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      trackScrollDepth();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const handleBookDemoClick = (location: string) => {
    trackCTAClick('Book a Demo', location);
    trackCalendlyOpened(location);
    setIsCalendlyOpen(true);
  };

  const handleSeePlatformClick = (location: string) => {
    trackSeePlatformClick(location);
    // Could add video modal or scroll to demo section
  };

  const handleCalendlyScheduled = () => {
    trackCalendlyScheduled();
    setIsCalendlyOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-gray-300 font-sans selection:bg-brand-500/30 selection:text-brand-200 overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] bg-grid"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
      </div>

      {/* Sticky Header */}
      <nav className="sticky top-0 z-50 bg-dark-950/70 backdrop-blur-xl border-b border-white/5" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 bg-brand-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(44,197,161,0.4)] group-hover:shadow-[0_0_25px_rgba(44,197,161,0.6)] transition-all">
              <Zap className="text-dark-950 w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-brand-400 transition-colors">ThinkALM</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#platform" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors">Platform</a>
            <a href="#solutions" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors">Solutions</a>
            <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors">Pricing</a>
            <Button size="sm" onClick={() => handleBookDemoClick('navigation')} aria-label="Book a demo meeting">
              Book a Demo
            </Button>
          </div>
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            aria-label="Open mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onBookDemo={() => handleBookDemoClick('mobile-menu')}
      />

      {/* Calendly Modal */}
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        onEventScheduled={handleCalendlyScheduled}
      />

      {/* SECTION 1 — HERO (Above the Fold) */}
      <SectionContainer id="main-content" className="relative z-10 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <Section className="!py-0 text-center">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-8 animate-fade-in-up" role="status" aria-label="Product features">
               <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" aria-hidden="true"></span>
               AI Agents • Database Reactivation • Call QA
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white mb-8 mx-auto max-w-5xl">
                The AI Sales OS Built for <span className="text-brand-500 relative inline-block">
                  Real Estate
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-500/30 blur-sm" aria-hidden="true"></span>
                </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10">
                Your agency is sitting on tens of thousands of missed opportunities.
                ThinkALM automates lead contact, follow-up, qualification, booking, and agent improvement — all inside one unified real estate sales system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Button size="lg" className="w-full sm:w-auto px-10 h-14 text-lg" onClick={() => handleBookDemoClick('hero')} aria-label="Book a demo meeting">
                  Book a Demo
                </Button>
                <Button variant="ghost" size="lg" className="w-full sm:w-auto gap-2 text-white border border-white/10 hover:bg-white/5" onClick={() => handleSeePlatformClick('hero')} aria-label="See the platform demo">
                  <Play size={18} className="fill-current" aria-hidden="true" /> See the Platform
                </Button>
            </div>

            <DashboardMockup />

        </Section>
      </SectionContainer>

      {/* SECTION 2 — POSITIONING STATEMENT */}
      <SectionContainer className="relative z-10 bg-dark-900/50 border-y border-white/5 backdrop-blur-sm">
        <Section>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">The All-In-One AI System for Real Estate Growth</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Most real estate businesses rely on too many disconnected tools — CRMs, lead gen platforms, manual follow-up, vendor nurture systems, agent training modules…
            </p>
            <p className="text-2xl font-bold text-white mt-8">ThinkALM replaces it all.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              "Contact leads",
              "Qualify sellers & buyers",
              "Book appraisals",
              "Reactivate old databases",
              "Follow up 24/7",
              "Score agent calls",
              "Train agents automatically",
              "Improve performance weekly"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 glass-card rounded-lg hover:border-brand-500/30 transition-colors">
                <CheckCircle2 className="text-brand-500 w-5 h-5 flex-shrink-0" />
                <span className="text-gray-200 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-brand-500 font-bold text-xl tracking-tight uppercase">This is the future of real estate sales infrastructure.</p>
          </div>
        </Section>
      </SectionContainer>

      {/* SECTION 3 — PROBLEM BLOCK */}
      <SectionContainer className="relative z-10">
        <Section>
           <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Real Estate Has Three Core Problems</h2>
             <p className="text-xl text-red-300 font-medium">And all three are costing your office listings every single month.</p>
           </div>

           <div className="grid lg:grid-cols-3 gap-8">
              {/* Problem 1 */}
              <div className="bg-dark-900/50 border border-white/10 p-8 rounded-2xl relative group hover:border-red-500/30 transition-colors">
                 <div className="text-red-400 font-bold text-sm tracking-widest uppercase mb-4">Problem 1</div>
                 <h3 className="text-2xl font-bold text-white mb-4">Your Database Is Worth Millions… But 90% Is Dormant</h3>
                 <p className="text-gray-300 mb-6">
                   Most agencies sit on 10,000–100,000+ old leads: Past buyers, appraisal requests, open home attendees, landlords.
                 </p>
                 <div className="pt-6 border-t border-white/5">
                    <p className="text-sm text-gray-400 mb-2">Your team will never manually contact all of them.</p>
                    <p className="text-brand-400 font-bold">But ThinkALM will.</p>
                 </div>
              </div>

              {/* Problem 2 */}
              <div className="bg-dark-900/50 border border-white/10 p-8 rounded-2xl relative group hover:border-red-500/30 transition-colors">
                 <div className="text-red-400 font-bold text-sm tracking-widest uppercase mb-4">Problem 2</div>
                 <h3 className="text-2xl font-bold text-white mb-4">Your New Leads Aren't Followed Up Fast Enough</h3>
                 <p className="text-gray-300 mb-6">
                   Web inquiries, missed calls, portal leads — every minute you delay follow-up, conversion drops. Most agencies lose 60–80% of their opportunities in the first 5 minutes.
                 </p>
                 <div className="pt-6 border-t border-white/5">
                    <p className="text-brand-400 font-bold">ThinkALM's AI agent engages leads instantly. 24/7.</p>
                 </div>
              </div>

              {/* Problem 3 */}
              <div className="bg-dark-900/50 border border-white/10 p-8 rounded-2xl relative group hover:border-red-500/30 transition-colors">
                 <div className="text-red-400 font-bold text-sm tracking-widest uppercase mb-4">Problem 3</div>
                 <h3 className="text-2xl font-bold text-white mb-4">Your Team's Call Quality Is Slipping</h3>
                 <p className="text-gray-300 mb-6">
                   Managers don't have time to listen to calls. Agents don't know where they're losing people. Training is inconsistent.
                 </p>
                 <div className="pt-6 border-t border-white/5">
                    <p className="text-brand-400 font-bold">ThinkALM analyses calls, scores reps, and trains them automatically.</p>
                 </div>
              </div>
           </div>
        </Section>
      </SectionContainer>

      {/* SECTION 4 — INTRODUCING THINKALM */}
      <SectionContainer className="relative z-10 bg-dark-900/30">
        <Section>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-full text-sm font-semibold mb-6">
                THE SOLUTION
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white leading-tight">Meet THINKALM — <br/>The Real Estate Sales OS</h2>
              <p className="text-xl text-gray-300 mb-8">
                ThinkALM unifies AI-powered:
              </p>
              
              <div className="space-y-8">
                  <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0 border border-brand-500/20">
                          <Database className="text-brand-500 w-6 h-6" />
                      </div>
                      <div>
                          <h4 className="text-white font-bold text-lg">1. Database Reactivation</h4>
                          <p className="text-gray-300">Your 10,000–100,000+ old leads are contacted, re-engaged, and qualified automatically.</p>
                      </div>
                  </div>

                  <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0 border border-brand-500/20">
                          <Bot className="text-brand-500 w-6 h-6" />
                      </div>
                      <div>
                          <h4 className="text-white font-bold text-lg">2. AI Voice & SMS Agents</h4>
                          <p className="text-gray-300">Instant follow-up for appraisal leads, buyer enquiries, website leads, and missed calls. They qualify deeply and book appointments.</p>
                      </div>
                  </div>

                  <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0 border border-brand-500/20">
                          <GraduationCap className="text-brand-500 w-6 h-6" />
                      </div>
                      <div>
                          <h4 className="text-white font-bold text-lg">3. Call QA + ThinkABC Agent Training</h4>
                          <p className="text-gray-300">Get a score, feedback, weaknesses, and personalised training modules automatically.</p>
                      </div>
                  </div>

                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0 border border-brand-500/20">
                          <Linkedin className="text-brand-500 w-6 h-6" />
                      </div>
                      <div>
                          <h4 className="text-white font-bold text-lg">4. Automated Outreach System</h4>
                          <p className="text-gray-300">Build agent pipelines without manual prospecting via LinkedIn and Email.</p>
                      </div>
                  </div>
              </div>
            </div>
            
            <div className="relative h-full flex items-center justify-center">
               <div className="absolute inset-0 bg-brand-500/20 blur-[100px] opacity-30 rounded-full"></div>
               <div className="relative glass-card rounded-2xl p-8 w-full shadow-2xl border-l-4 border-l-brand-500">
                  <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                      <div className="text-white font-bold text-xl">Agent Performance</div>
                      <div className="text-brand-500 text-sm font-mono">LIVE</div>
                  </div>
                  
                  <div className="space-y-6">
                      <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Database Coverage</span>
                              <span className="text-white font-bold">92%</span>
                          </div>
                          <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                              <div className="h-full bg-brand-500 w-[92%]"></div>
                          </div>
                      </div>

                       <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Appraisals Set</span>
                              <span className="text-white font-bold">18/20</span>
                          </div>
                          <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 w-[85%]"></div>
                          </div>
                      </div>

                       <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Call Quality Score</span>
                              <span className="text-white font-bold">8.4/10</span>
                          </div>
                          <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500 w-[84%]"></div>
                          </div>
                      </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border border-white/20">
                              <Users className="w-5 h-5 text-gray-300" />
                          </div>
                          <div>
                              <div className="text-white text-sm font-bold">Team Training</div>
                              <div className="text-gray-500 text-xs">Recommended: Objection Handling</div>
                          </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs h-8">View Module</Button>
                  </div>
               </div>
            </div>
          </div>
        </Section>
      </SectionContainer>

      {/* SECTION 5 — PLATFORM VISUAL EXPLANATION */}
      <SectionContainer id="platform" className="relative z-10">
        <Section>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">One Dashboard. One Flow. Total Visibility.</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                You're not selling "AI tools". You're selling "sales predictability."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Database, label: "Lead Activation", sub: "Reactivating old data" },
              { icon: Zap, label: "Instant Lead Follow-up", sub: "< 5s response time" },
              { icon: Search, label: "Seller Qualification", sub: "Intent verification" },
              { icon: CalendarCheck, label: "Booking Engine", sub: "Direct calendar sync" },
              { icon: Activity, label: "Call Scoring", sub: "Automated QA" },
              { icon: TrendingUp, label: "Agent Insights", sub: "Performance tracking" },
              { icon: GraduationCap, label: "Training Recs", sub: "Personalized coaching" },
              { icon: LayoutDashboard, label: "Unified View", sub: "All-in-one control" },
            ].map((item, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300 border-white/5 hover:border-brand-500/30">
                <div className="w-14 h-14 bg-dark-800 rounded-full flex items-center justify-center mb-5 border border-white/10 shadow-lg text-brand-500">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </Section>
      </SectionContainer>

      {/* SECTION 6 — DEEP DIVE PILLARS */}
      <SectionContainer id="solutions" className="relative z-10 bg-dark-900/50">
        <Section>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-20">The 4 Pillars of Real Estate Growth</h2>
          
          <div className="space-y-24">
             {/* Pillar 1 */}
             <div className="grid lg:grid-cols-2 gap-12 items-center">
                 <div className="order-2 lg:order-1">
                     <div className="text-brand-500 font-bold tracking-widest text-sm mb-2 uppercase">Pillar 1</div>
                     <h3 className="text-3xl font-bold text-white mb-6">Database Reactivation</h3>
                     <p className="text-lg text-gray-400 mb-6">
                        Your untouched database contains hidden sellers, appraisals, and future listings. ThinkALM reactivates them with AI-led outreach at scale.
                     </p>
                     <ul className="space-y-3 mb-8">
                         {["Natural human-like conversations", "Seller motivation scoring", "Appointment booking", "CRM tagging"].map((li, i) =>(
                             <li key={i} className="flex items-center gap-3 text-gray-300">
                                 <CheckCircle2 className="w-5 h-5 text-brand-500" /> {li}
                             </li>
                         ))}
                     </ul>
                     <div className="p-4 bg-brand-500/10 border border-brand-500/20 rounded-lg text-brand-200 text-sm font-semibold">
                         Even a 0.1% conversion from 100,000 leads = 100 new listings.
                     </div>
                 </div>
                 <div className="order-1 lg:order-2 bg-dark-800 p-8 rounded-2xl border border-white/5 relative">
                     <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 to-blue-500/20 blur-lg opacity-50"></div>
                     <div className="relative z-10">
                        <Database className="w-16 h-16 text-brand-500 mb-6" />
                        <div className="space-y-4">
                            <div className="bg-dark-900 p-4 rounded-lg border border-white/5 flex justify-between items-center">
                                <span>Total Leads</span>
                                <span className="font-bold text-white">42,500</span>
                            </div>
                             <div className="bg-dark-900 p-4 rounded-lg border border-white/5 flex justify-between items-center">
                                <span>Active Conversations</span>
                                <span className="font-bold text-green-400">1,240</span>
                            </div>
                             <div className="bg-dark-900 p-4 rounded-lg border border-white/5 flex justify-between items-center border-l-4 border-l-brand-500">
                                <span>Appraisals Identified</span>
                                <span className="font-bold text-white">85</span>
                            </div>
                        </div>
                     </div>
                 </div>
             </div>

             {/* Pillar 2 */}
             <div className="grid lg:grid-cols-2 gap-12 items-center">
                 <div className="bg-dark-800 p-8 rounded-2xl border border-white/5 relative">
                     <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-lg opacity-50"></div>
                     <div className="relative z-10">
                        <Phone className="w-16 h-16 text-purple-500 mb-6" />
                        <div className="space-y-3">
                             <div className="flex gap-3 items-start bg-dark-900 p-4 rounded-lg">
                                 <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs">AI</div>
                                 <div className="text-sm text-gray-300">"Hi Sarah, I saw you were looking at the property on 5th Ave. Are you looking to buy or just browsing?"</div>
                             </div>
                              <div className="flex gap-3 items-start flex-row-reverse bg-dark-900 p-4 rounded-lg">
                                 <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-xs">S</div>
                                 <div className="text-sm text-gray-300">"We're looking to buy, but we need to sell our current place first."</div>
                             </div>
                             <div className="flex gap-3 items-start bg-dark-900 p-4 rounded-lg border border-brand-500/50">
                                 <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs">AI</div>
                                 <div className="text-sm text-gray-300">"Understood. Would you be open to a free appraisal on your current home to see where you stand?"</div>
                             </div>
                        </div>
                     </div>
                 </div>
                 <div>
                     <div className="text-purple-500 font-bold tracking-widest text-sm mb-2 uppercase">Pillar 2</div>
                     <h3 className="text-3xl font-bold text-white mb-6">AI Agents for Real Estate</h3>
                     <p className="text-lg text-gray-400 mb-6">
                        ThinkALM’s AI voice agents contact leads within seconds via SMS, Phone, Email. They handle missed calls and web inquiries instantly.
                     </p>
                     <ul className="space-y-3 mb-8">
                         {["Qualify seller or buyer", "Confirm property address", "Handle objections", "Book directly into calendars"].map((li, i) =>(
                             <li key={i} className="flex items-center gap-3 text-gray-300">
                                 <CheckCircle2 className="w-5 h-5 text-purple-500" /> {li}
                             </li>
                         ))}
                     </ul>
                     <p className="text-white font-bold text-lg">Your agents ONLY talk to qualified prospects.</p>
                 </div>
             </div>
             
             {/* Pillar 3 */}
             <div className="grid lg:grid-cols-2 gap-12 items-center">
                 <div className="order-2 lg:order-1">
                     <div className="text-blue-500 font-bold tracking-widest text-sm mb-2 uppercase">Pillar 3</div>
                     <h3 className="text-3xl font-bold text-white mb-6">Call QA + ThinkABC Training</h3>
                     <p className="text-lg text-gray-400 mb-6">
                        Upload any rep’s call. Within 60 seconds, ThinkALM gives you a performance score, strengths, weaknesses, and training recommendations.
                     </p>
                     <ul className="space-y-3 mb-8">
                         {["Objection handling analysis", "Tone & rapport analysis", "Missed opportunities", "Automated coaching modules"].map((li, i) =>(
                             <li key={i} className="flex items-center gap-3 text-gray-300">
                                 <CheckCircle2 className="w-5 h-5 text-blue-500" /> {li}
                             </li>
                         ))}
                     </ul>
                     <p className="text-white font-bold text-lg">This is your permanent sales coach inside your business.</p>
                 </div>
                 <div className="order-1 lg:order-2 bg-dark-800 p-8 rounded-2xl border border-white/5 relative">
                     <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-lg opacity-50"></div>
                     <div className="relative z-10 text-center">
                         <div className="inline-block relative">
                            <svg className="w-32 h-32 transform -rotate-90">
                                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-dark-900" />
                                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset="60" className="text-blue-500" />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">84</div>
                         </div>
                         <div className="mt-6 text-left space-y-3">
                             <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                                 <span className="text-gray-400">Opening</span>
                                 <span className="text-green-400">Great</span>
                             </div>
                             <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                                 <span className="text-gray-400">Objection Handling</span>
                                 <span className="text-yellow-400">Needs Work</span>
                             </div>
                             <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                                 <span className="text-gray-400">Closing</span>
                                 <span className="text-green-400">Excellent</span>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

              {/* Pillar 4 */}
             <div className="grid lg:grid-cols-2 gap-12 items-center">
                 <div className="bg-dark-800 p-8 rounded-2xl border border-white/5 relative">
                     <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 to-green-500/20 blur-lg opacity-50"></div>
                     <div className="relative z-10">
                        <Linkedin className="w-16 h-16 text-brand-500 mb-6" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-dark-900 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-white">450</div>
                                <div className="text-xs text-gray-500 uppercase">Connections</div>
                            </div>
                            <div className="bg-dark-900 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-white">28</div>
                                <div className="text-xs text-gray-500 uppercase">Meetings Booked</div>
                            </div>
                        </div>
                     </div>
                 </div>
                 <div>
                     <div className="text-brand-500 font-bold tracking-widest text-sm mb-2 uppercase">Pillar 4</div>
                     <h3 className="text-3xl font-bold text-white mb-6">Automated Acquisition (LinkedIn + Email)</h3>
                     <p className="text-lg text-gray-400 mb-6">
                        Turn individual agents into prospecting machines. ThinkALM handles database nurture, cold outreach, and appointment setting.
                     </p>
                     <ul className="space-y-3 mb-8">
                         {["Automated follow-up sequences", "Personalized messaging", "Calendar integration", "Agents spend less time chasing"].map((li, i) =>(
                             <li key={i} className="flex items-center gap-3 text-gray-300">
                                 <CheckCircle2 className="w-5 h-5 text-brand-500" /> {li}
                             </li>
                         ))}
                     </ul>
                 </div>
             </div>
          </div>
        </Section>
      </SectionContainer>

      {/* SECTION 7 — SOCIAL PROOF / CASE STUDY BLOCK */}
      <SectionContainer className="relative z-10">
        <Section>
           <div className="glass-card p-10 md:p-16 rounded-3xl text-center border-t-4 border-t-brand-500">
               <h2 className="text-sm font-bold text-brand-500 tracking-widest uppercase mb-4">Case Study</h2>
               <h3 className="text-4xl sm:text-5xl font-bold text-white mb-8">27 Appraisals in 30 Days</h3>
               <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">From an untouched database of 4,200 old leads.</p>
               
               <div className="grid md:grid-cols-3 gap-8">
                   <div className="p-6 bg-dark-950/50 rounded-xl">
                       <div className="text-3xl font-bold text-white mb-2">27</div>
                       <div className="text-sm text-gray-500 uppercase">Appraisal Appointments</div>
                   </div>
                   <div className="p-6 bg-dark-950/50 rounded-xl">
                       <div className="text-3xl font-bold text-white mb-2">68</div>
                       <div className="text-sm text-gray-500 uppercase">Warm Seller Convos</div>
                   </div>
                   <div className="p-6 bg-dark-950/50 rounded-xl">
                       <div className="text-3xl font-bold text-white mb-2">100%</div>
                       <div className="text-sm text-gray-500 uppercase">Automated</div>
                   </div>
               </div>
           </div>
        </Section>
      </SectionContainer>

      {/* SECTION 8 — ROI CALCULATOR */}
      <SectionContainer className="relative z-10 bg-dark-900/30">
        <Section>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center text-dark-950">
                        <DollarSign className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">The Math is Simple</h2>
                </div>

                <div className="bg-dark-950 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
                    <div className="grid gap-8 md:grid-cols-5 items-center text-center md:text-left">
                        
                        <div className="md:col-span-1">
                            <div className="text-gray-500 text-sm uppercase font-semibold mb-1">Database</div>
                            <div className="text-2xl font-bold text-white">80,000</div>
                            <div className="text-xs text-gray-600">Leads</div>
                        </div>
                        
                        <div className="hidden md:flex justify-center text-gray-600">×</div>

                        <div className="md:col-span-1">
                            <div className="text-gray-500 text-sm uppercase font-semibold mb-1">Conversion</div>
                            <div className="text-2xl font-bold text-brand-500">0.1%</div>
                            <div className="text-xs text-gray-600">Conservative</div>
                        </div>

                         <div className="hidden md:flex justify-center text-gray-600">=</div>

                        <div className="md:col-span-2 bg-dark-800 p-6 rounded-xl border border-brand-500/20">
                             <div className="text-gray-500 text-sm uppercase font-semibold mb-2">Revenue Potential</div>
                             <div className="text-4xl font-bold text-white mb-1">$960,000+</div>
                             <div className="text-xs text-brand-500">Based on 80 listings @ $12k comm.</div>
                        </div>

                    </div>
                    <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-400 text-sm">
                        Even if only 0.05% convert, that's still <span className="text-white font-bold">$480k+</span> in unlocked revenue.
                    </div>
                </div>
            </div>
        </Section>
      </SectionContainer>

      {/* SECTION 9 — PRICING TIERS */}
      <SectionContainer id="pricing" className="relative z-10">
        <Section>
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple Pricing Plans</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* CORE */}
            <div className="glass-card rounded-2xl p-8 hover:bg-dark-800/50 transition-colors">
              <h3 className="text-2xl font-bold text-white">CORE</h3>
              <div className="text-3xl font-bold text-brand-500 mt-4 mb-2">$3,000<span className="text-lg text-gray-500 font-normal">/month</span></div>
              <ul className="mt-8 space-y-4">
                {["AI Voice Agents", "Database Reactivation", "Weekly Reporting", "Standard Support"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400">
                    <CheckCircle2 className="w-5 h-5 text-brand-500/50" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full mt-8 border-gray-700 text-gray-300 hover:text-brand-500 hover:border-brand-500">Get Core</Button>
            </div>

            {/* PRO */}
            <div className="rounded-2xl p-8 bg-dark-800 border border-brand-500 shadow-[0_0_40px_rgba(44,197,161,0.15)] relative transform md:-translate-y-6 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-dark-950 px-6 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                Best Value
              </div>
              <h3 className="text-2xl font-bold text-white">PRO</h3>
              <div className="text-3xl font-bold text-brand-500 mt-4 mb-2">$5,000<span className="text-lg text-gray-500 font-normal">/month</span></div>
              <ul className="mt-8 space-y-4">
                {["Everything in Core", "AI Widget for Website", "ThinkABC Training", "Call Scoring", "Advanced Analytics", "Priority Support"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-medium">
                    <CheckCircle2 className="w-5 h-5 text-brand-500" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-8">Get Pro</Button>
            </div>

            {/* ENTERPRISE */}
            <div className="glass-card rounded-2xl p-8 hover:bg-dark-800/50 transition-colors">
              <h3 className="text-2xl font-bold text-white">ENTERPRISE</h3>
              <div className="text-3xl font-bold text-brand-500 mt-4 mb-2">Custom<span className="text-lg text-gray-500 font-normal">/month</span></div>
              <ul className="mt-8 space-y-4">
                {["Full OS Rollout", "100k+ Databases", "Dedicated Strategist", "Private AI Instance", "Custom Integrations"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400">
                    <CheckCircle2 className="w-5 h-5 text-brand-500/50" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full mt-8 border-gray-700 text-gray-300 hover:text-brand-500 hover:border-brand-500">Contact Us</Button>
            </div>
          </div>
        </Section>
      </SectionContainer>
      
      {/* SECTION 10 — GUARANTEE */}
       <SectionContainer className="relative z-10">
           <Section>
               <div className="mt-8 glass-card border-dashed border-gray-700 p-10 rounded-xl text-center max-w-4xl mx-auto">
                    <h4 className="text-2xl font-bold text-white mb-2">15 Appraisals in 30–45 Days.</h4>
                    <p className="text-xl text-brand-500">Or We Work for Free Until We Do.</p>
                    <p className="text-gray-500 mt-4 text-sm">Your strongest conversion lever.</p>
               </div>
           </Section>
       </SectionContainer>

      {/* SECTION 11 — FINAL CTA */}
      <SectionContainer className="relative z-10 border-t border-white/5 bg-gradient-to-b from-dark-950 to-brand-900/20">
        <Section className="text-center py-32">
          <h2 className="text-4xl sm:text-6xl font-bold mb-8 text-white tracking-tight">Unlock the Full Power of AI <br/>Across Your Real Estate Business</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Your database. Your leads. Your agents. Your entire revenue engine — fully automated.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto min-w-[200px] h-14 text-lg" onClick={() => handleBookDemoClick('final-cta')} aria-label="Book a demo meeting">
              Book a Demo
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] h-14 text-lg border-white/20 text-white hover:bg-white/10 hover:border-white" onClick={() => handleSeePlatformClick('final-cta')} aria-label="See the platform in action">
              See the Platform in Action
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