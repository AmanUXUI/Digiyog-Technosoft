import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Target, 
  MessageCircle, 
  TrendingUp, 
  Settings, 
  Users, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkle
} from "lucide-react";

interface AboutUsPageProps {
  onNavigateHomeAndScroll: (elementId: string) => void;
  setIsBookingOpen: (open: boolean) => void;
}

export default function AboutUsPage({ onNavigateHomeAndScroll, setIsBookingOpen }: AboutUsPageProps) {
  // Simple interactive counter states for Section 7 (Our Impact)
  const [stats, setStats] = useState({
    partnered: 0,
    delivered: 0,
    industries: 0,
    retention: 0,
    campaigns: 0
  });

  useEffect(() => {
    // Scroll to top when page mounts
    window.scrollTo({ top: 0, behavior: "instant" });

    // Staggered incremental animation for impact counters
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setStats({
        partnered: Math.min(Math.round((45 / steps) * currentStep), 45),
        delivered: Math.min(Math.round((120 / steps) * currentStep), 120),
        industries: Math.min(Math.round((15 / steps) * currentStep), 15),
        retention: Math.min(Math.round((98 / steps) * currentStep), 98),
        campaigns: Math.min(Math.round((250 / steps) * currentStep), 250)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Section 4 Stepper active index hover interaction
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Section 3 Belief cards hover interaction
  const [hoveredBelief, setHoveredBelief] = useState<number | null>(null);

  return (
    <div className="w-full bg-white text-zinc-950 font-sans min-h-screen">
      
      {/* Decorative top ambient element to anchor content */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0c3773]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-48 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-36 pb-20 md:px-12 md:pt-44 lg:pt-48 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-widest bg-amber-500/10 text-amber-700 rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Who we are</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-[32px] md:text-[48px] font-sans font-black text-zinc-950 tracking-tight leading-[40px] md:leading-[60px]"
            >
              We believe great businesses deserve <br />
              <span className="text-[#0c3773] relative inline-block">
                great digital partners.
                <svg 
                  className="absolute left-0 -bottom-2 w-full h-[12px] text-[#fcbf4a]" 
                  viewBox="0 0 320 18" 
                  fill="none" 
                  preserveAspectRatio="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M4 12 C 100 4, 220 4, 316 12" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-5 text-zinc-700 font-semibold text-base sm:text-lg max-w-3xl leading-relaxed"
            >
              <p>
                Digital growth isn’t about running more campaigns, building more websites, or chasing the latest trends. It’s about making the right decisions, at the right time, with the right strategy.
              </p>
              <p className="text-zinc-500 font-medium text-sm sm:text-base">
                At DigiYog, we bring together marketing, technology, design, and data to help businesses build stronger brands, better customer experiences, and sustainable growth.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="pt-4"
            >
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-8 py-4 bg-[#0c3773] hover:bg-blue-900 text-white font-sans font-black text-xs tracking-widest rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2 group"
              >
                <span>Let's build together</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          {/* Decorative side badge */}
          <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative p-8 rounded-3xl border border-zinc-100 bg-zinc-50/50 shadow-sm max-w-sm"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#fcbf4a] flex items-center justify-center font-bold text-black text-xs">★</div>
              <p className="text-xs font-mono font-bold text-[#0c3773] tracking-wider mb-2">Tailored digital solutions</p>
              <p className="text-xl font-black text-zinc-950 tracking-tight leading-snug">No cookie-cutter templates. Only hard, data-driven outcomes.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. WHY DIGIYOG EXISTS */}
      <section className="relative z-10 w-full border-t border-zinc-100 bg-zinc-50/50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            <div className="lg:col-span-4 space-y-4">
              <span className="inline-block px-3 py-1 text-[9px] font-mono font-bold tracking-wider bg-zinc-200/80 text-zinc-600 rounded-full">
                Section 2 — Why DigiYog exists
              </span>
              <h2 className="text-[32px] md:text-[48px] font-black text-zinc-950 tracking-tight leading-[40px] md:leading-[60px]">
                The DigiYog mission
              </h2>
              <p className="text-xs font-mono font-bold text-amber-600 tracking-wider">Bridging the strategy gap</p>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0c3773] tracking-tight leading-snug">
                We started DigiYog because too many businesses were buying services instead of solutions.
              </h3>
              
              <div className="space-y-5 text-zinc-700 font-semibold text-sm md:text-base leading-relaxed">
                <p>
                  We’ve seen businesses invest in websites that never generated enquiries, campaigns that delivered clicks but not customers, and software that complicated work instead of simplifying it.
                </p>
                
                {/* Beautiful custom quote board */}
                <div className="p-6 border-l-4 border-[#fcbf4a] bg-[#fcbf4a]/5 rounded-r-2xl space-y-1">
                  <p className="font-mono text-xs tracking-wider text-amber-700 font-bold">The core truth</p>
                  <p className="font-black text-zinc-900 text-base md:text-lg">
                    The problem wasn’t a lack of effort. It was a lack of strategy.
                  </p>
                </div>

                <p className="font-bold text-zinc-950">
                  DigiYog was created to bridge that gap.
                </p>
                
                <p className="text-zinc-500 font-medium">
                  Instead of offering isolated digital services, we build connected solutions that help businesses attract customers, improve experiences, streamline operations, and grow with confidence.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. GROWTH ISN'T A SERVICE. OUR BELIEFS SHAPE EVERY DECISION WE MAKE */}
      <section className="relative z-10 w-full py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <span className="inline-block px-3.5 py-1 text-[9px] font-mono font-bold tracking-widest bg-amber-500/10 text-amber-700 rounded-full">
              Section 3 — Growth isn't a service
            </span>
            <h2 className="text-[32px] md:text-[48px] font-black text-zinc-950 tracking-tight leading-[40px] md:leading-[60px]">
              Our beliefs shape every decision we make.
            </h2>
            <p className="text-xs md:text-sm font-mono tracking-widest font-bold text-zinc-400">
              ★ No shortcuts. No compromises. ★
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {[
              {
                title: "Growth before vanity",
                desc: "We focus on business outcomes—not metrics that look impressive but create little real impact.",
                num: "01"
              },
              {
                title: "Strategy before execution",
                desc: "Every successful project begins with understanding your business, your customers, and your goals.",
                num: "02"
              },
              {
                title: "Partnerships over projects",
                desc: "We believe the best results come from long-term collaboration, not one-time deliveries.",
                num: "03"
              },
              {
                title: "Continuous improvement",
                desc: "Markets evolve, technology changes, and customer expectations grow. So do our solutions.",
                num: "04"
              }
            ].map((card, idx) => (
              <div 
                key={idx} 
                onMouseEnter={() => setHoveredBelief(idx)}
                onMouseLeave={() => setHoveredBelief(null)}
                className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-6 text-left cursor-default ${
                  hoveredBelief === idx 
                    ? "border-[#0c3773] bg-[#0c3773]/5 shadow-md scale-[1.02]" 
                    : "border-zinc-200 bg-zinc-50/40"
                }`}
              >
                <span className="text-3xl font-mono font-black text-[#0c3773]/15 block">
                  {card.num}
                </span>
                <div className="space-y-2">
                  <h4 className="font-black text-base md:text-lg text-neutral-950 tracking-wide">
                    {card.title}
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-600 font-semibold leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. WHAT IT'S LIKE TO WORK WITH DIGIYOG */}
      <section className="relative z-10 w-full py-20 md:py-28 bg-zinc-50/50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 text-[9px] font-mono font-bold tracking-wider bg-zinc-200 text-zinc-600 rounded-full">
              Section 4 — What it’s like to work with DigiYog
            </span>
            <h2 className="text-[32px] md:text-[48px] font-black text-zinc-950 tracking-tight leading-[40px] md:leading-[60px]">
              Every business grows differently. <br />
              Our approach evolves with it.
            </h2>
            <p className="text-sm md:text-base text-zinc-600 font-semibold max-w-2xl mx-auto leading-relaxed">
              Instead of offering disconnected services, we help businesses build a complete digital growth ecosystem.
            </p>
          </div>

          {/* Connected Steps Path with Horizontal / Vertical indicators */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto relative z-10">
            {[
              {
                step: "Find",
                desc: "Improve visibility through SEO and search-driven strategies.",
                icon: "01",
                phase: "Discovery"
              },
              {
                step: "Reach",
                desc: "Accelerate growth with performance marketing and paid campaigns.",
                icon: "02",
                phase: "Outreach"
              },
              {
                step: "Build",
                desc: "Create websites, applications, and digital products that strengthen customer experiences.",
                icon: "03",
                phase: "Experience"
              },
              {
                step: "Scale",
                desc: "Simplify operations with automation, analytics, and technology solutions.",
                icon: "04",
                phase: "Scale"
              }
            ].map((p, idx) => (
              <div 
                key={idx} 
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
                className={`p-6 rounded-3xl border transition-all duration-300 relative text-left ${
                  hoveredStep === idx 
                    ? "border-amber-500 bg-white shadow-md -translate-y-1" 
                    : "border-zinc-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-[#0c3773]/10 text-[#0c3773] flex items-center justify-center font-mono font-black text-xs">
                    {p.icon}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-amber-600 tracking-wider">
                    {p.phase}
                  </span>
                </div>
                <h4 className="font-black text-lg text-neutral-950 tracking-wide">
                  {p.step}
                </h4>
                <p className="text-xs md:text-sm text-neutral-500 font-semibold leading-relaxed mt-2">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#0c3773]/5 rounded-3xl p-6 border border-[#0c3773]/10 max-w-3xl mx-auto text-center">
            <p className="text-xs md:text-sm font-black text-[#0c3773] tracking-widest font-satoshi leading-relaxed">
              ★ One partner. Multiple capabilities. One shared goal—helping your business grow. ★
            </p>
          </div>

        </div>
      </section>

      {/* 6. WHY BUSINESSES CHOOSE DIGIYOG */}
      <section className="relative z-10 w-full py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 text-[9px] font-mono font-bold tracking-wider bg-amber-500/10 text-amber-700 rounded-full">
              Section 6 — Why businesses choose DigiYog
            </span>
            <h2 className="text-[32px] md:text-[48px] font-black text-zinc-950 tracking-tight leading-[40px] md:leading-[60px]">
              Because growth needs more than great ideas.
            </h2>
            <p className="text-xs md:text-sm font-mono tracking-widest font-bold text-zinc-400">
              Critical thinking • Real collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {[
              { 
                title: "Business-first thinking", 
                desc: "Every recommendation starts with your business objectives—not our service list.", 
                icon: Target 
              },
              { 
                title: "Transparent communication", 
                desc: "Clear timelines, honest advice, and regular updates at every stage.", 
                icon: MessageCircle 
              },
              { 
                title: "Data-driven decisions", 
                desc: "Every strategy is backed by insights, not assumptions.", 
                icon: TrendingUp 
              },
              { 
                title: "Tailored solutions", 
                desc: "No templates. No one-size-fits-all approach.", 
                icon: Settings 
              },
              { 
                title: "Long-term support", 
                desc: "Our partnership continues long after launch.", 
                icon: Users 
              },
              { 
                title: "Continuous innovation", 
                desc: "We refine, improve, and adapt as your business evolves.", 
                icon: Sparkles 
              }
            ].map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="p-6 border border-zinc-200 rounded-3xl bg-zinc-50/50 hover:bg-zinc-50 transition-all duration-300 space-y-4 group">
                  <div className="w-11 h-11 rounded-2xl bg-[#0c3773]/10 text-[#0c3773] group-hover:bg-[#0c3773] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-sm md:text-base text-neutral-950 tracking-wide">
                    {f.title}
                  </h4>
                  <p className="text-xs md:text-sm text-neutral-500 font-semibold leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. OUR IMPACT */}
      <section className="relative z-10 w-full py-20 md:py-28 bg-zinc-50 border-t border-zinc-150">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 text-[9px] font-mono font-bold tracking-wider bg-zinc-200 text-zinc-600 rounded-full">
              Section 7 — Our impact
            </span>
            <h2 className="text-[32px] md:text-[48px] font-black text-zinc-950 tracking-tight leading-[40px] md:leading-[60px]">
              Growth measured by the success of our clients.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { val: stats.partnered, suffix: "+", title: "Businesses partnered with" },
              { val: stats.delivered, suffix: "+", title: "Projects delivered" },
              { val: stats.industries, suffix: "+", title: "Industries served" },
              { val: stats.retention, suffix: "%", title: "Client retention" },
              { val: stats.campaigns, suffix: "+", title: "Campaigns & solutions" }
            ].map((stat, idx) => (
              <div key={idx} className="p-6 border border-zinc-200 rounded-3xl bg-white text-center space-y-2 shadow-sm">
                <p className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0c3773]">
                  {stat.val}{stat.suffix}
                </p>
                <p className="text-[10px] md:text-xs font-mono font-bold text-neutral-500 tracking-wider leading-tight">
                  {stat.title}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-amber-500/5 rounded-3xl p-6 border border-amber-500/10 max-w-2xl mx-auto text-center">
            <p className="text-xs md:text-sm font-bold text-amber-800 italic tracking-wider leading-relaxed">
              "Every number represents a business that trusted us to be part of its growth journey."
            </p>
          </div>

        </div>
      </section>

      {/* 8. OUR PROMISE: WHAT YOU'LL NEVER HEAR FROM US */}
      <section className="relative z-10 w-full py-20 md:py-28 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 text-[9px] font-mono font-bold tracking-wider bg-rose-500/10 text-rose-700 rounded-full">
              Section 8 — Our promise
            </span>
            <h2 className="text-[32px] md:text-[48px] font-black text-zinc-950 tracking-tight leading-[40px] md:leading-[60px]">
              What you’ll never hear from us.
            </h2>
            <p className="text-xs md:text-sm font-mono tracking-widest font-bold text-rose-500">
              No false promises. No destructive hyperbole.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              "Guaranteed overnight success.",
              "One-size-fits-all marketing packages.",
              "Technology without purpose.",
              "Vanity metrics presented as growth."
            ].map((p, idx) => (
              <div key={idx} className="flex items-center gap-4 p-5 border border-rose-100 rounded-3xl bg-rose-50/50">
                <span className="text-rose-600 shrink-0 text-xl font-bold font-mono">❌</span>
                <p className="text-xs sm:text-sm font-black text-neutral-800 tracking-wide leading-tight">
                  {p}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center pt-4">
            <p className="text-sm md:text-base text-zinc-600 font-semibold leading-relaxed">
              Instead, you’ll receive honest advice, practical strategies, measurable progress, and a team that’s invested in your long-term success.
            </p>
          </div>

        </div>
      </section>

      {/* 9. OUR MANIFESTO */}
      <section className="relative z-10 w-full py-20 md:py-28 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 text-[9px] font-mono font-bold tracking-wider bg-white/10 text-zinc-300 rounded-full">
              Section 9 — Our manifesto
            </span>
            <h2 className="text-[32px] md:text-[48px] font-black text-white tracking-tight leading-[40px] md:leading-[60px]">
              We believe…
            </h2>
            <p className="text-xs font-mono tracking-widest font-bold text-amber-500">
              The core beliefs that drive DigiYog
            </p>
          </div>

          <div className="bg-neutral-900 border border-white/5 rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Ambient gradients */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0c3773]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 font-sans">
              {[
                "Businesses deserve partners—not vendors.",
                "Marketing should create opportunities—not noise.",
                "Technology should simplify—not complicate.",
                "Growth should be measurable—not assumed.",
                "Trust is earned through consistency—not promises.",
                "The best digital solutions begin by understanding people—not platforms."
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 border-b border-white/5 pb-6">
                  <span className="text-[#fcbf4a] text-lg font-black font-mono bg-white/5 w-8 h-8 rounded-full flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <p className="text-sm md:text-lg font-black tracking-wide leading-snug text-white/95">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="relative z-10 w-full py-20 md:py-28 bg-white border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          
          <span className="inline-block px-3 py-1 text-[9px] font-mono font-bold tracking-wider bg-amber-500/10 text-amber-700 rounded-full">
            Section 10 — Final CTA
          </span>
          
          <h2 className="text-[32px] md:text-[48px] font-black text-zinc-950 tracking-tight leading-[40px] md:leading-[60px]">
            Let’s build something that moves your business forward.
          </h2>
          
          <p className="text-sm md:text-base text-zinc-600 font-semibold leading-relaxed max-w-2xl mx-auto">
            Whether you’re looking to grow your brand, launch a digital product, improve your marketing, or streamline your operations, we’d love to be part of your journey.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              onClick={() => {
                onNavigateHomeAndScroll("proposal-form");
              }}
              className="w-full sm:w-auto px-8 py-4.5 bg-[#0c3773] hover:bg-blue-900 text-white font-sans font-black text-xs tracking-widest rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Start a conversation
            </button>
            <button
              onClick={() => {
                onNavigateHomeAndScroll("services");
              }}
              className="w-full sm:w-auto px-8 py-4.5 bg-zinc-100 hover:bg-zinc-200 text-neutral-800 font-sans font-black text-xs tracking-widest rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Explore our services
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
