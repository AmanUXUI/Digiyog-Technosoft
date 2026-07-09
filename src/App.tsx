import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Send, Check, Menu, ChevronRight, Globe, Users, Award, Sparkles, TrendingUp, Code, Video, Share2, Palette, ChevronUp, ChevronDown, Lightbulb, Target, Settings, Rocket, Star, Quote, Calendar, Clock, MessageCircle, Megaphone, Smartphone, Laptop, Eye, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LiquidMetal, MeshGradient } from '@paper-design/shaders-react';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "GROWTH":
      return <TrendingUp className="w-3.5 h-3.5" />;
    case "SEO":
      return <Search className="w-3.5 h-3.5" />;
    case "DEV":
      return <Code className="w-3.5 h-3.5" />;
    case "PRODUCTION":
      return <Video className="w-3.5 h-3.5" />;
    case "SOCIAL":
      return <Share2 className="w-3.5 h-3.5" />;
    case "BRANDING":
      return <Palette className="w-3.5 h-3.5" />;
    default:
      return <Sparkles className="w-3.5 h-3.5" />;
  }
};

const getProcessIcon = (iconName: string) => {
  switch (iconName) {
    case "Lightbulb":
      return <Lightbulb className="w-4 h-4 text-[#fcbf4a]" />;
    case "Target":
      return <Target className="w-4 h-4 text-[#fcbf4a]" />;
    case "Settings":
      return <Settings className="w-4 h-4 text-[#fcbf4a]" />;
    case "Rocket":
      return <Rocket className="w-4 h-4 text-[#fcbf4a]" />;
    case "TrendingUp":
      return <TrendingUp className="w-4 h-4 text-[#fcbf4a]" />;
    default:
      return null;
  }
};

const getServiceIcon = (iconName: string, className = "w-5 h-5") => {
  switch (iconName) {
    case "TrendingUp":
      return <TrendingUp className={className} />;
    case "Search":
      return <Search className={className} />;
    case "Code":
      return <Code className={className} />;
    case "Video":
      return <Video className={className} />;
    case "Share2":
      return <Share2 className={className} />;
    case "Palette":
      return <Palette className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

// News Ticker Content (identical to the requested reference image and enhanced with high-quality entries)
interface TickerItem {
  id: number;
  text: string;
  category: string;
  storyUrl?: string;
  details: string;
}

const TICKER_ITEMS: TickerItem[] = [
  {
    id: 1,
    text: "Performance Marketing",
    category: "GROWTH",
    details: "Data-driven marketing to maximize ROI."
  },
  {
    id: 2,
    text: "SEO (Search Engine Optimization)",
    category: "SEO",
    details: "On-page and technical search engine optimization."
  },
  {
    id: 3,
    text: "Web App Design & Development",
    category: "DEV",
    details: "Custom-made interfaces and modern digital web applications."
  },
  {
    id: 4,
    text: "Video Production",
    category: "PRODUCTION",
    details: "High-quality visual storytelling and cinematography."
  },
  {
    id: 5,
    text: "Social Media Management",
    category: "SOCIAL",
    details: "Engaging and growing communities online."
  },
  {
    id: 6,
    text: "Graphics & Print Media",
    category: "BRANDING",
    details: "Elevating print collateral and pristine graphic assets."
  }
];

// High-end minimalist partner brand logos displayed in white
const LOGO_ITEMS = [
  {
    name: "Vercel",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L1 21h22L12 2z" />
      </svg>
    ),
    textClass: "font-sans font-black tracking-[0.2em] text-[13px]"
  },
  {
    name: "stripe",
    icon: null,
    textClass: "font-sans font-black tracking-tight text-lg lowercase"
  },
  {
    name: "Apple",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
      </svg>
    ),
    textClass: "font-sans font-semibold tracking-tight text-[13px] ml-1.5"
  },
  {
    name: "SONY",
    icon: null,
    textClass: "font-serif font-black tracking-[0.15em] text-[13px]"
  },
  {
    name: "PORSCHE",
    icon: null,
    textClass: "font-satoshi font-black tracking-[0.25em] text-[11px]"
  },
  {
    name: "Dolby",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 3v18h4v-7.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5H6V3H2zm16 0v4.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5V21h4V3h-4z" />
      </svg>
    ),
    textClass: "font-sans font-bold tracking-tight text-[13px] ml-1.5"
  },
  {
    name: "Nike",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7.5 h-4 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 6.5c-3 1.5-8.5 6.5-11.5 10-.8.9-1.5 1.8-2 2.5-.5.7-.9 1.2-1 1.3-.1.1-.3.1-.4-.1-.2-.4-.4-1.1-.4-2 0-2 1.3-5.5 3.5-8.5 2-2.7 4.8-5.2 7.8-6.2.7-.2 1.2-.3 1.2-.2 0 .1-.5 1-1.2 2.2-.7 1.2-1.5 2.5-1.8 3.3.4-.8 1.4-1.8 2.8-2.6 1-.6 2.2-1.1 3-1.1h.4c.1 0 0 .5-.4 1.4z" />
      </svg>
    ),
    textClass: "hidden"
  },
  {
    name: "airbnb",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.7c-.5 0-1 .2-1.3.6L2.9 12.8c-.4.5-.4 1.2.1 1.6.4.4 1 .4 1.4 0l1-1V19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-5.6l1 1c.2.2.5.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1.2 0-1.6L13.3 3.3c-.3-.4-.8-.6-1.3-.6zm0 2.2l7.1 8-.9 1V19c0 .6-.4 1-1 1h-8c-.6 0-1-.4-1-1v-5.1l-1-1.1 3.9-4.4c.8-1 2.2-1 3 0l.9 1h-2.1c-.6 0-1 .4-1 1s.4 1 1 1h3.1c0 1.1-.9 2-2 2h-3.1c-.6 0-1 .4-1 1s.4 1 1 1H12c2.2 0 4-1.8 4-4 0-.1-1.1-2.9-1.1-2.9s-.4-.4-.5-.5l-2.4-2.8z" />
      </svg>
    ),
    textClass: "font-sans font-bold tracking-tighter text-[13px] ml-1.5"
  }
];

// Rich logo images specifically provided by the user for the hero marquee
const HERO_LOGO_URLS = [
  "https://imgh.in/host/92jzoz",
  "https://imgh.in/host/g4naat",
  "https://imgh.in/host/xgvnil",
  "https://imgh.in/host/wb04rg",
  "https://imgh.in/host/tlzayz",
  "https://imgh.in/host/wksd6j",
  "https://imgh.in/host/4nobpf",
  "https://imgh.in/host/05gdaq",
  "https://imgh.in/host/2gok4d",
  "https://imgh.in/host/f4u3sh",
  "https://imgh.in/host/04nixe",
  "https://imgh.in/host/4ubrv2",
  "https://imgh.in/host/o2nmme"
];

// Rich, interactive data structures for the main content PDF integration
const DATA_CASE_STUDIES = [
  {
    id: 1,
    title: "Quantum FinTech Growth",
    category: "SEO",
    scope: "Technical SEO & Search Optimization",
    metrics: [
      { label: "Lead Acquisition Boost", value: "+312%" },
      { label: "Search Engine Traffic", value: "+240%" },
      { label: "New Users / Month", value: "3.5 Million" }
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    color: "#0c3773",
    description: "By revamping core technical architecture, eliminating duplicate crawler paths, and engineering high-impact search term landing templates, we drove massive search rankings and organic conversions."
  },
  {
    id: 2,
    title: "Solvent SaaS Scaling",
    category: "GROWTH",
    scope: "Performance Marketing & Ad Funnels",
    metrics: [
      { label: "Cost Per Acquisition (CPA) Reduction", value: "-42%" },
      { label: "Ad Conversion Rate Success", value: "6.1%" },
      { label: "Total Saved Budget Stream", value: "$420K" }
    ],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    color: "#fcbf4a",
    description: "A complete overhaul of Meta and Google advertising targets using custom offline event mapping. We redirected low-converting display traffic into highly qualified bottom-funnel keyword streams."
  },
  {
    id: 3,
    title: "Aura Luxury Cosmetics",
    category: "DEV",
    scope: "Web Application Design & E-Commerce",
    metrics: [
      { label: "Total Digital Sales Boom", value: "+540%" },
      { label: "Direct Advertising ROAS", value: "5.1x" },
      { label: "Checkout Drop-off Drop", value: "-28%" }
    ],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    color: "#000000",
    description: "Crafted a blazing-fast headlessly-fueled e-commerce store with lightweight animations and interactive product match-selectors. Conversions peaked immediately following our optimized launch."
  }
];

const DATA_TESTIMONIALS = [
  {
    id: 1,
    quote: "Digiyog redesigned our digital presence from scratch. Their high-impact design completely transformed how users interact with our brand.",
    author: "Sarah Jenkins",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    quote: "An incredible team that balances aesthetics with technical excellence. Our product performance has never been better.",
    author: "Marcus Reed",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    quote: "Their creative execution is unmatched. The final designs were beautifully responsive, elegant, and delivered well ahead of schedule.",
    author: "Elena Rostova",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  }
];

const DATA_PROCESS_STEPS = [
  {
    title: "Understand",
    num: "01",
    desc: "We learn your business, audience, and goals.",
    detail: "During our initial deep-immersion phase, we audit your historical data, map your competitive landscape, and identify the exact bottlenecks holding your brand back from hyper-growth.",
    iconAlt: "Lightbulb"
  },
  {
    title: "Strategize",
    num: "02",
    desc: "We build a custom roadmap for growth.",
    detail: "No copy-paste marketing plans. We blueprint a dedicated acquisition plan outlining budgets, channels, engineering requirements, content parameters, and performance targets.",
    iconAlt: "Target"
  },
  {
    title: "Create",
    num: "03",
    desc: "Design, content, campaigns, and experiences come to life.",
    detail: "Our world-class developers, designers, and copywriters build elegant conversion funnels, engaging visual systems, and crisp copy crafted to strike visual impact and demand attention.",
    iconAlt: "Settings"
  },
  {
    title: "Launch",
    num: "04",
    desc: "We execute across the right channels.",
    detail: "We orchestrate the complete synchronization. Ads fire, SEO templates go live, software assets are published, and real-time trackers start telemetry analysis for multi-channel accuracy.",
    iconAlt: "Rocket"
  },
  {
    title: "Optimize",
    num: "05",
    desc: "Continuous improvements to maximize results.",
    detail: "We test everything: variables, user behavior patterns, headlines, templates. Weekly iterations ensure performance gains are consistently compounded to make budgets highly optimized.",
    iconAlt: "TrendingUp"
  }
];

const DATA_SERVICES = [
  {
    id: "perf-marketing",
    title: "Performance Marketing",
    icon: "TrendingUp",
    shortDesc: "Reach the right audience, generate qualified leads, and maximize every advertising rupee through data-backed campaigns.",
    tags: [
      "Meta Ads",
      "Google Ads",
      "Lead Generation",
      "Conversion Optimization",
      "Campaign Management"
    ],
    image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    video: "https://www.pexels.com/download/video/36394040/",
    tintColor: "from-[#fcbf4a]/10 to-transparent",
    textColor: "text-[#c68a0c]"
  },
  {
    id: "seo",
    title: "SEO (Search Engine Optimization)",
    icon: "Search",
    shortDesc: "Get found when customers are searching. We help businesses improve rankings, increase organic visibility, and drive long-term traffic that converts.",
    tags: [
      "Technical SEO",
      "On-Page SEO",
      "Keyword Strategy",
      "Local SEO",
      "SEO Audits"
    ],
    image: "https://images.unsplash.com/photo-1657727534442-d436ab275ce2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tintColor: "from-[#0c3773]/10 to-transparent",
    textColor: "text-[#0c3773]"
  },
  {
    id: "web-dev",
    title: "Web App Design & Development",
    icon: "Code",
    shortDesc: "Great brands deserve great digital experiences. We design and develop websites and web applications that are fast, scalable, and built around user experience.",
    tags: [
      "Custom Websites",
      "Web Applications",
      "UI/UX Design",
      "Landing Pages",
      "E-Commerce Solutions"
    ],
    image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tintColor: "from-[#fcbf4a]/10 to-transparent",
    textColor: "text-[#c68a0c]"
  },
  {
    id: "video-production",
    title: "Video Production",
    icon: "Video",
    shortDesc: "Attention starts with great storytelling. From brand films to social media content, we create videos that engage, inspire, and drive action.",
    tags: [
      "Brand Videos",
      "Commercials",
      "Reels",
      "Motion Graphics",
      "Product Videos"
    ],
    image: "https://images.unsplash.com/photo-1607112812619-182cb1c7bb61?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tintColor: "from-[#0c3773]/10 to-transparent",
    textColor: "text-[#0c3773]"
  },
  {
    id: "social-media",
    title: "Social Media Management",
    icon: "Share2",
    shortDesc: "Because consistency builds brands. We create content strategies, campaigns, and communities that help brands stay relevant and connected.",
    tags: [
      "Content Planning",
      "Creative Design",
      "Reels Strategy",
      "Community Management",
      "Monthly Reporting"
    ],
    image: "https://images.unsplash.com/photo-1699895143289-958fa10a57c9?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tintColor: "from-[#fcbf4a]/10 to-transparent",
    textColor: "text-[#c68a0c]"
  },
  {
    id: "graphics-print",
    title: "Graphics & Print Media",
    icon: "Palette",
    shortDesc: "Strong visuals create stronger impressions. From digital creatives to print materials, we design assets that make your brand impossible to ignore.",
    tags: [
      "Brand Identity",
      "Brochures",
      "Flyers",
      "Packaging",
      "Marketing Collaterals",
      "Print Design"
    ],
    image: "https://images.unsplash.com/photo-1541506618330-7c369fc759b5?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tintColor: "from-[#0c3773]/10 to-transparent",
    textColor: "text-[#0c3773]"
  }
];

const DATA_ARTICLES = [
  {
    id: 1,
    title: "The 2026 SEO Blueprint: Navigating Technical Complexity",
    category: "SEARCH MARKETING",
    date: "June 14, 2026",
    readTime: "6 Min Read",
    excerpt: "With changes in modern search engines, legacy keyword stuffing is obsolete. Discover the high-contrast technical architecture strategies that keep premium brands at position zero.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
    content: "## The Evolution of Position Zero\n\nIn 2026, high organic exposure is won by sites demonstrating superior technical health and high-intent core topical architecture. Search crawlers prioritize fast performance, lightweight static pages, and pristine semantic schema.\n\n### Core Engineering Directives\n\n1. **Dynamic HTML Deferral**: Render core content immediately server-side while hydrating interactive widgets incrementally. This reduces First Contentful Paint (FCP) below 0.4s.\n2. **Entity-Based Schema Graphing**: Go beyond basic meta tags. Deliver a JSON-LD structured layout clearly detailing contextual relationship chains.\n3. **Content Density**: Target deep, authoritative answer flows instead of low-value, duplicate landing posts.\n\nAt Digiyog Technosoft, we leverage clean TypeScript architecture to deploy lightning-fast landing segments that convert searches to high-quality revenue streams. Stop thinking keyword volume; start thinking intent conversion."
  },
  {
    id: 2,
    title: "Stop Wasting Rupee: Overhauling Paid Campaigns",
    category: "PERFORMANCE ADVERTISING",
    date: "May 28, 2026",
    readTime: "8 Min Read",
    excerpt: "Why are your lead costs spiking despite beautiful creative designs? Unveiling custom signals mapping and why copy-paste advertising funnels fail under modern consumer scrutiny.",
    image: "https://images.unsplash.com/photo-1682336869523-2c6859f781cb?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "## The Illusion of Vanity Clicks\n\nMany brands measure success by impression pools or click-through percentages. But real business sustainability comes solely from converted leads. Why are brand acquisition costs growing?\n\n### The Failure of Generic Funnels\n- **Ad-to-Home Mismatch**: Driving high-intensity ads straight to a generic company homepage fails because it lacks context.\n- **Uncalibrated Tracking Nodes**: When conversion trackers are fed low-intent button click data, systems automatically find more empty clickers rather than buyers.\n\n### The Direct Fix: Micro-Targeting\nWe deploy isolated landing blocks tailored specifically to match individual ad creative hooks. Combined with server-side API purchase signals, we feed advertising engines exact high-value conversion coordinates, lowering customer CPA by over 40%."
  },
  {
    id: 3,
    title: "Design Friction: Crafting Software Experiences that Retain",
    category: "REACTIVE DEVELOPMENT",
    date: "April 19, 2026",
    readTime: "5 Min Read",
    excerpt: "Great brands demand fast digital products. Explore the aesthetic guidelines and core performance metrics that drive stellar interaction and checkout loyalty.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    content: "## Design Integrity Meets Code Architecture\n\nA brand is only as reliable as its slowest virtual asset. When a prospective client hits a loading screen or an unresponsive button, visual trust drops immediately.\n\n### Minimizing Cognitive Interaction Friction\n\n- **Subtle Micro-Transitions**: Provide reactive feedback instantly via spring physical animations (`motion`). When buttons respond naturally, the UI feels continuous and tangible.\n- **Headless Performance Stack**: Power custom e-commerce baskets on high-speed static CDNs. This allows customers to explore products flawlessly without sudden page flashes.\n\nEvery pixel must look and feel purposeful. At Digiyog, we avoid unnecessary plugins and build custom, tailor-made applications to verify that performance remains flawless, scalable, and beautifully clean."
  }
];

// Interactive 3D on Hover Liquid Metal glassmorphic container
function Liquid3DHeroElement() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Calculate rotation angles (max 15 degrees tilt for intense 3D effect)
    const degX = -(mouseY / (height / 2)) * 14;
    const degY = (mouseX / (width / 2)) * 14;
    setTilt({ x: degX, y: degY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative flex items-center justify-center pointer-events-auto"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: tilt.x === 0 && tilt.y === 0 ? 1 : 1.05,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 22 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative select-none"
      >
        <LiquidMetal 
          speed={1} 
          softness={0.1} 
          repetition={2} 
          shiftRed={0.3} 
          shiftBlue={0.3} 
          distortion={0.07} 
          contour={0.4} 
          scale={1} 
          rotation={0} 
          shape="diamond" 
          angle={70} 
          image="https://app.paper.design/file-assets/01KTNS49KTF59S4ZEK9E7Q9PG9/01KVDAWQ2MAFA6Y67KJZ569FBD.svg" 
          colorBack="#00000000" 
          colorTint="#FFFFFF" 
          style={{ height: '600px', width: '414px' }} 
        />
      </motion.div>
    </div>
  );
}

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Proposal form submission state (Real inline contact form)
  const [proposalWebsite, setProposalWebsite] = useState("");
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  // Interactive UI states for the newly added PDF sections
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false);
  const [isArticlesOpen, setIsArticlesOpen] = useState(false);
  const [showBottomCTA, setShowBottomCTA] = useState(true);
  const [activeArticle, setActiveArticle] = useState<any | null>(null);
  const [caseStudyFilter, setCaseStudyFilter] = useState("ALL");
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  // Redesign interactive states
  const [activeAboutTab, setActiveAboutTab] = useState(0);
  const [hoveredAboutZone, setHoveredAboutZone] = useState<string | null>(null);
  const [activeCaseStudyMetric, setActiveCaseStudyMetric] = useState<string | null>(null);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [selectedBenefitProof, setSelectedBenefitProof] = useState<number | null>(null);
  const [searchArticleQuery, setSearchArticleQuery] = useState("");
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);

  // Booking consultation form fields
  const [bookingFormData, setBookingFormData] = useState({
    name: "",
    email: "",
    website: "",
    service: "Performance Marketing",
    date: ""
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Smooth mouse tracking for the custom interactive glow blob
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Smooth interpolation (lerp) loop for premium performance
    let animationFrameId: number;
    const updatePosition = () => {
      const dx = targetMouse.current.x - currentMouse.current.x;
      const dy = targetMouse.current.y - currentMouse.current.y;
      
      // Interpolate 8% of the distance each frame
      currentMouse.current.x += dx * 0.08;
      currentMouse.current.y += dy * 0.08;

      setMousePos({ x: currentMouse.current.x, y: currentMouse.current.y });
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (proposalWebsite.trim()) {
      setProposalSubmitted(true);
      setTimeout(() => {
        setProposalSubmitted(false);
        setProposalWebsite("");
      }, 5000);
    }
  };



  return (
    <div className="relative min-h-screen bg-zinc-50 font-sans text-zinc-900 overflow-x-hidden selection:bg-[#fcbf4a] selection:text-black flex flex-col justify-between">
      
      {/* 1. FLUID BACKGROUND ANIMATED COMPLEX MESH GRADIENT */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* Soft interactive blue glow following the cursor - extremely subtle */}
        <div 
          className="absolute -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-[#0c3773] opacity-[0.03] blur-[100px] transition-opacity duration-1000 hidden md:block"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`
          }}
        />

        {/* Textured Film Grain Overlay for high-end cinematic tactile feel */}
        <div className="absolute inset-0 grain-overlay opacity-[0.15]" />
      </div>

      {/* 2. DYNAMIC NAVIGATION HEADER - FLOATING GLASS BRIDGE */}
      <header className="relative z-40 w-full px-6 md:px-12 py-4 bg-white/85 backdrop-blur-md border-b border-zinc-200/60 flex items-center justify-between transition-all duration-500 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        
        {/* Left Side: Logo Container (exact 25% width) */}
        <div className="w-1/4 sm:w-[25%] flex items-center justify-start">
          <div className="cursor-pointer relative group flex items-center h-12 sm:h-14 md:h-16 lg:h-18">
            <img 
              referrerPolicy="no-referrer"
              src="https://imgh.in/host/36nsc8" 
              alt="Digiyog Logo" 
              className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
 
        {/* Center: Main Navigation (Desktop) */}
        <nav className="hidden lg:flex flex-1 items-center justify-center space-x-6 text-xs font-semibold tracking-[0.2em] text-zinc-600 font-satoshi">
          {[
            { 
              name: "WORK", 
              id: "work",
              items: ["Case Studies", "Brands", "Creative Index", "International Projects"]
            },
            { 
              name: "EXPERTISE", 
              id: "expertise",
              items: ["Connected Experiences", "Data & Intelligence", "Media Orchestration", "Loyalty & CRM"]
            },
            { 
              name: "PARTNERS", 
              id: "partners",
              items: ["Salesforce", "Adobe", "Google Marketing Platform", "Meta Business"]
            },
            { 
              name: "CAREERS", 
              id: "careers",
              items: ["Our Culture", "Open Roles", "Life at Digiyog"]
            }
          ].map((menu) => (
            <div 
              key={menu.id} 
              className="relative cursor-pointer py-1.5 px-3 rounded-full hover:bg-zinc-100/60 transition-colors duration-300"
              onMouseEnter={() => setActiveMenu(menu.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <span className="hover:text-[#0c3773] transition-colors duration-300">
                {menu.name}
              </span>
              
              {/* Active Menu indicator line */}
              {activeMenu === menu.id && (
                <motion.div 
                  layoutId="header-active-line" 
                  className="absolute bottom-[-2px] left-4 right-4 h-[2px] bg-[#0c3773]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </div>
          ))}
        </nav>
 
        {/* Right Side: Interactive Utilities */}
        <div className="w-auto lg:w-[25%] flex items-center justify-end">
          
          {/* CONTACT US (Pill shape, smooth scrolls to inline form, keeping user on page with no popups) */}
          <button 
            id="contact-btn"
            onClick={() => {
              const el = document.getElementById("proposal-form");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            className="inline-flex items-center text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#0c3773] border border-[#0c3773]/20 bg-[#0c3773]/5 hover:bg-[#0c3773] hover:text-white hover:border-transparent px-6 py-2.5 rounded-full transition-all duration-350 active:scale-95 cursor-pointer font-satoshi animate-pulse"
          >
            CONTACT US
          </button>
        </div>
      </header>

      {/* 3. HERO INSANELY BEAUTIFUL TYPOGRAPHY BLOCK */}
      <main className="relative z-10 w-full px-6 py-12 md:px-12 flex-grow flex items-center min-h-[70vh] md:min-h-[80vh] overflow-hidden bg-white text-zinc-950">
        
        {/* Background MeshGradient from Paper Design */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center">
          <MeshGradient 
            speed={1} 
            scale={1} 
            distortion={0.8} 
            swirl={0.1} 
            colors={['#7BA3FF', '#FFFFFF', '#FFFFFF']} 
            style={{ height: '1080px', width: '1920px' }} 
          />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Left Column: Brand details, headers, buttons and marquee */}
          <div className="relative w-full lg:col-span-7 flex flex-col justify-center">
            
            {/* Subtle sub-header tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[#0c3773] text-xs sm:text-sm font-sans font-bold tracking-[0.16em] uppercase mb-4"
            >
              TOP RATED AND AWARD WINNING
            </motion.div>

            {/* Giant Connected Experience Heading */}
            <h1 className="leading-[1.15] font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-zinc-950 tracking-[-0.03em] select-none text-left mb-6">
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, cubicBezier: [0.16, 1, 0.3, 1] }}
                className="block text-zinc-950"
              >
                Stop Looking Like Every
              </motion.span>
              
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, cubicBezier: [0.16, 1, 0.3, 1] }}
                className="relative inline-block text-zinc-950"
              >
                Other Brand.
                {/* Curved hand-drawn custom SVG gold underline matching the screenshot */}
                <svg 
                  className="absolute left-0 -bottom-3 w-full h-[15px] text-[#fcbf4a]" 
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
              </motion.span>
            </h1>

            {/* Custom Brand Positioning Block */}
            <div className="mt-4 space-y-4 max-w-2xl font-sans mb-8">
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                className="text-sm sm:text-base text-zinc-700 font-normal leading-relaxed tracking-wide"
              >
                In a world where attention lasts seconds, average marketing gets ignored. <strong className="text-zinc-950 font-semibold">Digiyog Technosoft</strong> helps brands stand out, get discovered, and grow through creative storytelling, smart technology, and performance-driven marketing.
              </motion.p>
            </div>

            {/* Inline Action Form mimicking the screenshot */}
            <motion.div
              id="proposal-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="relative z-30"
            >
              {proposalSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-[550px] bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center space-x-3 text-emerald-800 font-satoshi text-xs"
                >
                  <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-white font-extrabold shrink-0">✓</div>
                  <div>
                    <span className="font-bold block text-emerald-950 uppercase tracking-wider text-[10px]">Proposal Requested Successfully!</span>
                    <span>An Experience Architect is analyzing your website and will contact you shortly.</span>
                  </div>
                </motion.div>
              ) : (
                <form 
                  onSubmit={handleProposalSubmit} 
                  className="flex flex-col sm:flex-row gap-3 w-full max-w-[550px]"
                >
                  <div className="relative flex-grow">
                    <input 
                      type="text" 
                      required
                      value={proposalWebsite}
                      onChange={(e) => setProposalWebsite(e.target.value)} 
                      placeholder="Enter Website Address" 
                      className="w-full h-14 px-5 bg-white border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 text-sm font-sans focus:outline-none focus:border-[#0c3773] focus:ring-1 focus:ring-[#0c3773] transition-all shadow-sm"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="h-14 px-8 bg-[#fcbf4a] text-black font-sans font-extrabold text-xs tracking-[0.12em] uppercase rounded-lg hover:bg-amber-400 active:scale-98 transition-all duration-300 shadow-md cursor-pointer shrink-0"
                  >
                    GET MY FREE PROPOSAL
                  </button>
                </form>
              )}
            </motion.div>

            {/* Seamless Interactive Logo Marquee Slider - Redesigned sleek capsule container */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.9 }}
              className="mt-12 px-8 py-6 bg-white border border-zinc-200 rounded-2xl relative overflow-hidden flex items-center w-full max-w-2xl shadow-[0_12px_24px_-10px_rgba(0,0,0,0.05)]"
            >
              {/* Left and right smooth shader overlapping the logos */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/20 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/20 to-transparent z-10 pointer-events-none" />

              <div className="relative w-full flex items-center overflow-hidden h-14">
                <div className="animate-marquee hover:[animation-play-state:paused] flex whitespace-nowrap scroll-smooth items-center">
                  
                  {/* First iteration group */}
                  {HERO_LOGO_URLS.map((url, idx) => (
                    <img 
                      key={`hero-logo-l1-${idx}`}
                      src={url} 
                      alt={`Partner Logo ${idx + 1}`} 
                      className="h-10 md:h-12 w-auto object-contain shrink-0 select-none opacity-75 hover:opacity-100 transition-opacity duration-300 mx-8"
                      referrerPolicy="no-referrer"
                    />
                  ))}

                  {/* Second iteration group for seamless loop */}
                  {HERO_LOGO_URLS.map((url, idx) => (
                    <img 
                      key={`hero-logo-l2-${idx}`}
                      src={url} 
                      alt={`Partner Logo ${idx + 1}`} 
                      className="h-10 md:h-12 w-auto object-contain shrink-0 select-none opacity-75 hover:opacity-100 transition-opacity duration-300 mx-8"
                      referrerPolicy="no-referrer"
                    />
                  ))}

                  {/* Third iteration group */}
                  {HERO_LOGO_URLS.map((url, idx) => (
                    <img 
                      key={`hero-logo-l3-${idx}`}
                      src={url} 
                      alt={`Partner Logo ${idx + 1}`} 
                      className="h-10 md:h-12 w-auto object-contain shrink-0 select-none opacity-75 hover:opacity-100 transition-opacity duration-300 mx-8"
                      referrerPolicy="no-referrer"
                    />
                  ))}

                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Beautiful Interactive 3D LiquidMetal Element */}
          <div className="relative w-full lg:col-span-5 flex justify-center lg:justify-end items-center z-20">
            <Liquid3DHeroElement />
          </div>
          
        </div>
      </main>

      {/* 3. SERVICES TICKER/MARQUEE ENDLESS SCROLLER (Just after Hero) */}
      <section className="relative z-20 w-full bg-black border-y border-white/5 py-4 md:py-5 overflow-hidden">
        {/* Left and right smooth shader overlapping the service logos */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="relative w-full flex items-center">
          {/* Endless Marquee Loop container */}
          <div className="animate-marquee hover:[animation-play-state:paused] flex whitespace-nowrap scroll-smooth py-1 font-satoshi">
            
            {/* Direct Duplicate 1 */}
            {TICKER_ITEMS.map((item, idx) => (
              <div 
                key={`loop-1-${item.id}-${idx}`}
                className="inline-flex items-center mx-8 group pointer-events-auto select-none"
              >
                <span className="text-[11px] md:text-sm font-semibold tracking-wider text-white transition-colors duration-200 group-hover:text-[#fcbf4a]">
                  {item.text}
                </span>
                
                {/* Categorization icon stylized precisely */}
                <span className="ml-3 p-1.5 rounded-full bg-[#fcbf4a]/10 text-[#fcbf4a] border border-[#fcbf4a]/15 transition-all duration-200 group-hover:bg-[#fcbf4a] group-hover:text-black flex items-center justify-center shadow-sm">
                  {getCategoryIcon(item.category)}
                </span>
              </div>
            ))}

            {/* Direct Duplicate 2 (Necessary for seamless scrolling loop) */}
            {TICKER_ITEMS.map((item, idx) => (
              <div 
                key={`loop-2-${item.id}-${idx}`}
                className="inline-flex items-center mx-8 group pointer-events-auto select-none"
              >
                <span className="text-[11px] md:text-sm font-semibold tracking-wider text-white transition-colors duration-200 group-hover:text-[#fcbf4a]">
                  {item.text}
                </span>
                
                {/* Categorization icon stylized precisely */}
                <span className="ml-3 p-1.5 rounded-full bg-[#fcbf4a]/10 text-[#fcbf4a] border border-[#fcbf4a]/15 transition-all duration-200 group-hover:bg-[#fcbf4a] group-hover:text-black flex items-center justify-center shadow-sm">
                  {getCategoryIcon(item.category)}
                </span>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ==================== DIGITAL GROWTH ENGINE (STRATEGIC PARTNER) SECTION ==================== */}
      <section className="relative z-20 w-full bg-white text-zinc-900 py-20 px-6 md:px-12 border-t border-zinc-100 overflow-hidden">
        {/* Decorative ambient background elements matching brand palette */}
        <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#0c3773]/5 rounded-full blur-[130px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-[#fcbf4a]/5 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Column: Powerful Copy & Description */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-[#0c3773] text-[14px] leading-[20px] font-semibold tracking-tight font-sans">
                  Turn Your Website into a High-Converting
                </h3>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-950 tracking-tight font-sans leading-[1.1] md:leading-[75px]">
                  Digital Growth Engine
                </h2>
              </div>
            </div>

            <h4 className="text-zinc-800 text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-snug font-sans">
              Your Strategic Partner for Web Design, Digital Marketing, SEO & AI Search Visibility
            </h4>

            {/* Paragraphs block with left vertical border in brand blue */}
            <div className="border-l-2 border-[#0c3773]/30 pl-6 space-y-6 text-zinc-600 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                Is it frustrating dealing with the costs of a beautiful site but getting no one who will add anything valuable to your organization? Do you feel like your digital strategy is merely some unconnected pieces of the puzzle and not a smartly-designed and profitable one? Welcome to <strong className="text-zinc-950 font-bold">Digiyog Technosoft</strong>, an established provider of digital marketing services businesses depend on to boost visibility, generate qualified leads, and create steady growth.
              </p>
              <p>
                With over 10 years of experience in the industry, we have helped over 2,550+ companies across 25+ countries with our strategically planned SEO as well as content creation, performance marketing, branding, and efficient web-based solutions for conversion. Just having a website is not enough anymore. Our services include professional web designing, digital marketing, SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO). We ensure that our clients gain visibility through various search engine platforms.
              </p>
            </div>
          </div>

          {/* Right Column: High Fidelity Overlapping Image Composition */}
          <div className="lg:col-span-6 relative w-full flex flex-col sm:flex-row gap-6 items-stretch justify-center min-h-[480px]">
            
            {/* Left tall image card */}
            <div className="relative w-full sm:w-1/2 flex items-center justify-center">
              
              {/* Floating circular arch outline shape behind the tall image */}
              <div className="absolute -top-12 -left-8 w-32 h-32 pointer-events-none select-none z-0">
                <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0c3773]/20">
                  <path d="M12 116 C12 44, 116 44, 116 116" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-40" />
                  <path d="M32 116 C32 64, 96 64, 96 116" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" className="opacity-50" />
                  <circle cx="12" cy="116" r="4" fill="currentColor" />
                  <circle cx="116" cy="116" r="4" fill="currentColor" />
                </svg>
              </div>

              <div className="relative z-10 w-full h-[450px] rounded-3xl overflow-hidden border border-zinc-200/80 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&h=900&q=80" 
                  alt="Creative design team collaborating over notebook and laptop" 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right stacked landscape images */}
            <div className="relative w-full sm:w-1/2 flex flex-col justify-between gap-6">
              
              {/* Right top image */}
              <div className="relative w-full h-[212px] rounded-3xl overflow-hidden border border-zinc-200/80 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Digiyog teammates analyzing charts and performance data" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right bottom image */}
              <div className="relative w-full h-[212px] rounded-3xl overflow-hidden border border-zinc-200/80 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="The professional Digiyog team members gathered in office" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Center overlapping floating badge/card */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md rounded-2xl border border-zinc-200/80 p-5 shadow-[0_20px_40px_-10px_rgba(12,55,115,0.08)] max-w-[280px] z-20 hover:scale-[1.03] transition-transform duration-300">
              <p className="text-zinc-800 text-xs sm:text-sm font-semibold leading-relaxed">
                Leveraging <span className="text-[#0c3773] font-bold">10+ years</span> of IT expertise to help businesses operate more efficiently.
              </p>
            </div>

            {/* Decorative organic node background graphic on the right */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 pointer-events-none select-none z-0 opacity-25">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0c3773]/30">
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="60" cy="60" r="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="140" cy="140" r="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
                <line x1="70" y1="70" x2="130" y2="130" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== ABOUT US SECTION ==================== */}
      <section id="about" className="relative z-20 w-full bg-white text-zinc-900 py-16 md:py-20 px-6 md:px-12 border-t border-zinc-100 overflow-hidden">
        {/* Glowing background ambiance toned down for light theme */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#0c3773]/5 rounded-full blur-[120px] pointer-events-none z-10" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#fcbf4a]/5 rounded-full blur-[100px] pointer-events-none z-10" />

        {/* Custom SVG Background Icon */}
        <div className="absolute right-20 bottom-12 md:right-44 md:bottom-20 pointer-events-none select-none z-0 overflow-hidden opacity-30 md:opacity-50">
          <svg width="302" height="439" viewBox="0 0 302 439" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[180px] h-auto md:w-[250px] lg:w-[302px]">
            <path d="M214.464 63.655C214.464 98.8107 186.05 127.31 151 127.31C115.95 127.31 87.5362 98.8107 87.5362 63.655C87.5362 28.4993 115.95 0 151 0C186.05 0 214.464 28.4993 214.464 63.655Z" fill="black" fillOpacity="0.05"/>
            <path d="M302 287.545C302 371.191 234.395 439 151 439C67.605 439 0 371.191 0 287.545C0 203.899 67.605 136.09 151 136.09C234.395 136.09 302 203.899 302 287.545ZM60.4 287.545C60.4 337.733 100.963 378.418 151 378.418C201.037 378.418 241.6 337.733 241.6 287.545C241.6 237.357 201.037 196.672 151 196.672C100.963 196.672 60.4 237.357 60.4 287.545Z" fill="black" fillOpacity="0.05"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Title and Challenge Statements */}
            <div className="lg:col-span-6 space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-xs font-mono font-black tracking-widest text-[#0c3773] uppercase">
                  <span>ABOUT US</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tight leading-tight text-zinc-950">
                  About Us
                </h2>
                <p className="text-zinc-600 font-sans font-medium text-lg md:text-xl max-w-xl">
                  Built For Brands That Want More Than Just Marketing.
                </p>
              </div>

              {/* Brand Statement cards styled as structured staircase Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-4">
                <div className="premium-hover-card sm:col-span-6 p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 hover:bg-white hover:shadow-md hover:-translate-y-1">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-400 block mb-2"> STATUS 01 </span>
                  <p className="text-zinc-800 text-sm md:text-base font-medium">Anyone can run ads.</p>
                </div>

                <div className="premium-hover-card sm:col-span-6 p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 hover:bg-white hover:shadow-md hover:-translate-y-1">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-400 block mb-2"> STATUS 02 </span>
                  <p className="text-zinc-800 text-sm md:text-base font-medium">Anyone can post content.</p>
                </div>

                <div className="premium-hover-card sm:col-span-12 p-8 rounded-2xl bg-[#0c3773] border border-[#0c3773] flex flex-col justify-between min-h-[140px] relative overflow-hidden shadow-md text-white hover:shadow-lg hover:-translate-y-1">
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#fcbf4a]/10 rounded-full blur-2xl" />
                  <span className="text-[10px] font-mono tracking-wider text-[#fcbf4a] block mb-4"> REAL QUESTION </span>
                  <p className="text-white font-black text-lg sm:text-l leading-snug relative z-10">
                    But building a brand people remember?
                  </p>
                  <p className="text-[#fcbf4a] font-sans font-black text-2xl tracking-widest uppercase mt-4 select-none relative z-10 animate-typewriter">
                    That's different.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Digital Philosophy Block */}
            <div className="lg:col-span-6 space-y-12">
              <div className="premium-hover-card p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 relative overflow-hidden flex flex-col justify-between min-h-[320px] group hover:bg-white hover:border-zinc-300/80 hover:shadow-xl hover:-translate-y-1">
                {/* Thin golden linear highlights */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t font-mono border-r border-[#fcbf4a]/40 rounded-tr-3xl group-hover:border-[#fcbf4a]/60 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-zinc-200 rounded-bl-3xl group-hover:border-zinc-300 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />

                <div className="space-y-6">
                  <img 
                    src="https://imgh.in/host/36nsc8" 
                    alt="Digiyog Logo" 
                    className="h-12 w-auto object-contain select-none shrink-0" 
                    referrerPolicy="no-referrer"
                  />
                  <p className="text-zinc-800 text-base md:text-lg font-normal leading-relaxed">
                    At <strong className="font-extrabold text-zinc-950">Digiyog Technosoft</strong>, we combine creativity, technology, and strategy to help businesses <strong className="font-extrabold text-zinc-950">attract attention, build trust, and drive measurable growth.</strong>
                  </p>
                </div>

                <div className="pt-8 border-t border-zinc-200 mt-8 space-y-3">
                  <p className="text-zinc-400 text-xs font-mono tracking-widest uppercase">THE BRAND STATEMENT</p>
                  <h4 className="text-lg md:text-xl font-black text-[#0c3773]">
                    We don't chase trends.
                  </h4>
                  <p className="text-zinc-600 font-medium text-sm md:text-base leading-relaxed">
                    We create digital experiences that keep brands ahead of them.
                  </p>
                </div>
              </div>

              {/* Action trigger portal card */}
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-[#0c3773]/5 border border-[#0c3773]/10 max-w-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0c3773] animate-pulse shrink-0" />
                <p className="text-xs font-mono font-medium text-zinc-800">
                  Ready to rise above the noise? 
                  <span className="text-[#0c3773] font-bold ml-1.5 cursor-pointer hover:underline" onClick={() => setIsBookingOpen(true)}>Book a call →</span>
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== CLIENT SHOWCASE / TRUSTED BY SECTION ==================== */}
      <section id="contributions" className="relative z-20 w-full bg-zinc-50 text-zinc-900 py-16 md:py-20 px-6 md:px-12 border-t border-zinc-200/60 overflow-hidden">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-[#0c3773]/3 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-5 right-1/4 w-[250px] h-[250px] bg-[#fcbf4a]/4 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Crisp, left-aligned explanation and branding details */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-mono font-black tracking-widest text-[#0c3773] uppercase block">
                  CLIENT SHOWCASE & PARTNERS
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-black tracking-tight text-zinc-950 leading-tight">
                  Trusted by Leading Institutions & Brands
                </h2>
              </div>

              <p className="text-zinc-600 text-[18px] leading-[29px] font-normal">
                Over the past decade, we have partnered with world-renowned universities and enterprises to design high-performance media buying, conversion funnels, and marketing analytics that scale brand influence.
              </p>

              {/* Service Areas & Impact Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#0c3773]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#0c3773]" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-zinc-950">Institutional Outreach</h4>
                    <p className="text-zinc-500 text-[14px] mt-0.5 leading-relaxed">Scaling recruitment with audience intelligence models.</p>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#0c3773]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#0c3773]" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-zinc-950">Precision Tracking</h4>
                    <p className="text-zinc-500 text-[14px] mt-0.5 leading-relaxed">Deploying robust, GDPR-compliant attribution tracking.</p>
                  </div>
                </div>
              </div>

              {/* High-Impact Metrics Grid (from Reference) */}
              <div className="grid grid-cols-3 gap-4 pt-6 pb-2 border-t border-zinc-200/80">
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-sans font-black text-zinc-950 tracking-tight leading-none">1,500+</div>
                  <div className="text-xs text-zinc-500 font-medium leading-tight">Projects Delivered</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-sans font-black text-zinc-950 tracking-tight leading-none">500+</div>
                  <div className="text-xs text-zinc-500 font-medium leading-tight">Active Clients</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl md:text-3xl font-sans font-black text-zinc-950 tracking-tight leading-none">7+ Years</div>
                  <div className="text-xs text-zinc-500 font-medium leading-tight">Industry Experience</div>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 text-[#0c3773] font-sans font-black text-xs uppercase tracking-widest hover:text-[#fcbf4a] transition-colors duration-300 group"
                >
                  <span>Explore Collaboration</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right Column: 3 Horizontal Moving Logo Sliders with Continuous Autoplay wrapped in a premium white container */}
            <div className="lg:col-span-6 relative w-full">
              <div className="relative w-full bg-white border border-zinc-200/80 rounded-[2.5rem] p-6 md:p-8 shadow-sm overflow-hidden flex flex-col gap-7 z-10">
                
                {/* Fade out masks for left/right premium blur effect over the white container */}
                <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Row 1: Left -> Right */}
                <div className="w-full overflow-hidden py-1">
                  <div className="animate-marquee-ltr flex gap-6 items-center">
                    {[
                      { url: "https://imgh.in/host/92jzoz", alt: "Logo 1" },
                      { url: "https://imgh.in/host/g4naat", alt: "Logo 2" },
                      { url: "https://imgh.in/host/xgvnil", alt: "Logo 3" },
                      { url: "https://imgh.in/host/wb04rg", alt: "Logo 4" },
                      { url: "https://imgh.in/host/tlzayz", alt: "Logo 5" },
                      { url: "https://imgh.in/host/92jzoz", alt: "Logo 1" },
                      { url: "https://imgh.in/host/g4naat", alt: "Logo 2" },
                      { url: "https://imgh.in/host/xgvnil", alt: "Logo 3" },
                      { url: "https://imgh.in/host/wb04rg", alt: "Logo 4" },
                      { url: "https://imgh.in/host/tlzayz", alt: "Logo 5" },
                      { url: "https://imgh.in/host/92jzoz", alt: "Logo 1" },
                      { url: "https://imgh.in/host/g4naat", alt: "Logo 2" },
                      { url: "https://imgh.in/host/xgvnil", alt: "Logo 3" },
                      { url: "https://imgh.in/host/wb04rg", alt: "Logo 4" },
                      { url: "https://imgh.in/host/tlzayz", alt: "Logo 5" }
                    ].map((logo, idx) => (
                      <img 
                        key={`r1-${idx}`}
                        src={logo.url} 
                        alt={logo.alt} 
                        className="h-12 md:h-[60px] w-auto object-contain shrink-0 select-none opacity-85 hover:opacity-100 transition-opacity duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                </div>

                {/* Row 2: Right -> Left */}
                <div className="w-full overflow-hidden py-1">
                  <div className="animate-marquee-rtl flex gap-6 items-center">
                    {[
                      { url: "https://imgh.in/host/wksd6j", alt: "Logo 6" },
                      { url: "https://imgh.in/host/4nobpf", alt: "Logo 7" },
                      { url: "https://imgh.in/host/05gdaq", alt: "Logo 8" },
                      { url: "https://imgh.in/host/2gok4d", alt: "Logo 9" },
                      { url: "https://imgh.in/host/f4u3sh", alt: "Logo 10" },
                      { url: "https://imgh.in/host/wksd6j", alt: "Logo 6" },
                      { url: "https://imgh.in/host/4nobpf", alt: "Logo 7" },
                      { url: "https://imgh.in/host/05gdaq", alt: "Logo 8" },
                      { url: "https://imgh.in/host/2gok4d", alt: "Logo 9" },
                      { url: "https://imgh.in/host/f4u3sh", alt: "Logo 10" },
                      { url: "https://imgh.in/host/wksd6j", alt: "Logo 6" },
                      { url: "https://imgh.in/host/4nobpf", alt: "Logo 7" },
                      { url: "https://imgh.in/host/05gdaq", alt: "Logo 8" },
                      { url: "https://imgh.in/host/2gok4d", alt: "Logo 9" },
                      { url: "https://imgh.in/host/f4u3sh", alt: "Logo 10" }
                    ].map((logo, idx) => (
                      <img 
                        key={`r2-${idx}`}
                        src={logo.url} 
                        alt={logo.alt} 
                        className="h-12 md:h-[60px] w-auto object-contain shrink-0 select-none opacity-85 hover:opacity-100 transition-opacity duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                </div>

                {/* Row 3: Left -> Right */}
                <div className="w-full overflow-hidden py-1">
                  <div className="animate-marquee-ltr flex gap-6 items-center">
                    {[
                      { url: "https://imgh.in/host/04nixe", alt: "Logo 11" },
                      { url: "https://imgh.in/host/4ubrv2", alt: "Logo 12" },
                      { url: "https://imgh.in/host/o2nmme", alt: "Logo 13" },
                      { url: "https://imgh.in/host/92jzoz", alt: "Logo 1" },
                      { url: "https://imgh.in/host/g4naat", alt: "Logo 2" },
                      { url: "https://imgh.in/host/04nixe", alt: "Logo 11" },
                      { url: "https://imgh.in/host/4ubrv2", alt: "Logo 12" },
                      { url: "https://imgh.in/host/o2nmme", alt: "Logo 13" },
                      { url: "https://imgh.in/host/92jzoz", alt: "Logo 1" },
                      { url: "https://imgh.in/host/g4naat", alt: "Logo 2" },
                      { url: "https://imgh.in/host/04nixe", alt: "Logo 11" },
                      { url: "https://imgh.in/host/4ubrv2", alt: "Logo 12" },
                      { url: "https://imgh.in/host/o2nmme", alt: "Logo 13" },
                      { url: "https://imgh.in/host/92jzoz", alt: "Logo 1" },
                      { url: "https://imgh.in/host/g4naat", alt: "Logo 2" }
                    ].map((logo, idx) => (
                      <img 
                        key={`r3-${idx}`}
                        src={logo.url} 
                        alt={logo.alt} 
                        className="h-12 md:h-[60px] w-auto object-contain shrink-0 select-none opacity-85 hover:opacity-100 transition-opacity duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== SERVICES SECTION (MINDMAP LAYOUT) ==================== */}
      <section id="services" className="relative z-20 w-full bg-zinc-50 text-zinc-900 py-20 px-6 md:px-12 border-t border-zinc-200/60 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#0c3773]/3 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#fcbf4a]/4 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          {/* Header Block matching description */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black tracking-widest text-[#0c3773] uppercase block">
              SERVICES
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-black tracking-tight text-zinc-950 leading-tight">
              Everything You Need To Grow In The Digital World.
            </h2>
            <p className="text-zinc-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              A stunning website gets attention. Our result-driven digital marketing turns that attention into traffic, leads, and loyal customers.
            </p>
          </div>

          {/* DESKTOP VIEW: MINDMAP LAYOUT (lg and up) */}
          <div className="relative w-full hidden lg:block select-none min-h-[640px]">
            
            {/* SVG Connection Paths Overlay for lg screens */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
              viewBox="0 0 1200 680"
              preserveAspectRatio="none"
            >
              {/* Left Top Card Path */}
              <motion.path 
                d="M 380 120 C 500 120, 480 340, 600 340" 
                fill="none" 
                stroke={hoveredService === 1 ? "#fcbf4a" : "#0c3773"} 
                strokeWidth={hoveredService === 1 ? "4" : "2"} 
                strokeDasharray={hoveredService === 1 ? "8 4" : "6 4"} 
                className={`${hoveredService === 1 ? "opacity-100" : "opacity-30"} transition-all duration-300`}
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  strokeDashoffset: hoveredService === 1 ? [0, -20] : 0
                }}
                transition={{ 
                  strokeDashoffset: hoveredService === 1 ? { repeat: Infinity, ease: "linear", duration: 1 } : { duration: 0 },
                  default: { duration: 1.5, delay: 0.2 }
                }}
              />
              {/* Left Top Hidden wider hover path */}
              <path 
                d="M 380 120 C 500 120, 480 340, 600 340" 
                fill="none" 
                stroke="transparent" 
                strokeWidth="24" 
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredService(1)}
                onMouseLeave={() => setHoveredService(null)}
              />

              {/* Left Middle Card Path */}
              <motion.path 
                d="M 380 340 L 600 340" 
                fill="none" 
                stroke={hoveredService === 2 ? "#fcbf4a" : "#0c3773"} 
                strokeWidth={hoveredService === 2 ? "4" : "2"} 
                strokeDasharray={hoveredService === 2 ? "8 4" : "6 4"} 
                className={`${hoveredService === 2 ? "opacity-100" : "opacity-30"} transition-all duration-300`}
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  strokeDashoffset: hoveredService === 2 ? [0, -20] : 0
                }}
                transition={{ 
                  strokeDashoffset: hoveredService === 2 ? { repeat: Infinity, ease: "linear", duration: 1 } : { duration: 0 },
                  default: { duration: 1.5, delay: 0.4 }
                }}
              />
              {/* Left Middle Hidden wider hover path */}
              <path 
                d="M 380 340 L 600 340" 
                fill="none" 
                stroke="transparent" 
                strokeWidth="24" 
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredService(2)}
                onMouseLeave={() => setHoveredService(null)}
              />

              {/* Left Bottom Card Path */}
              <motion.path 
                d="M 380 560 C 500 560, 480 340, 600 340" 
                fill="none" 
                stroke={hoveredService === 3 ? "#fcbf4a" : "#0c3773"} 
                strokeWidth={hoveredService === 3 ? "4" : "2"} 
                strokeDasharray={hoveredService === 3 ? "8 4" : "6 4"} 
                className={`${hoveredService === 3 ? "opacity-100" : "opacity-30"} transition-all duration-300`}
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  strokeDashoffset: hoveredService === 3 ? [0, -20] : 0
                }}
                transition={{ 
                  strokeDashoffset: hoveredService === 3 ? { repeat: Infinity, ease: "linear", duration: 1 } : { duration: 0 },
                  default: { duration: 1.5, delay: 0.6 }
                }}
              />
              {/* Left Bottom Hidden wider hover path */}
              <path 
                d="M 380 560 C 500 560, 480 340, 600 340" 
                fill="none" 
                stroke="transparent" 
                strokeWidth="24" 
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredService(3)}
                onMouseLeave={() => setHoveredService(null)}
              />

              {/* Right Top Card Path */}
              <motion.path 
                d="M 820 120 C 700 120, 720 340, 600 340" 
                fill="none" 
                stroke={hoveredService === 4 ? "#fcbf4a" : "#0c3773"} 
                strokeWidth={hoveredService === 4 ? "4" : "2"} 
                strokeDasharray={hoveredService === 4 ? "8 4" : "6 4"} 
                className={`${hoveredService === 4 ? "opacity-100" : "opacity-30"} transition-all duration-300`}
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  strokeDashoffset: hoveredService === 4 ? [0, -20] : 0
                }}
                transition={{ 
                  strokeDashoffset: hoveredService === 4 ? { repeat: Infinity, ease: "linear", duration: 1 } : { duration: 0 },
                  default: { duration: 1.5, delay: 0.2 }
                }}
              />
              {/* Right Top Hidden wider hover path */}
              <path 
                d="M 820 120 C 700 120, 720 340, 600 340" 
                fill="none" 
                stroke="transparent" 
                strokeWidth="24" 
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredService(4)}
                onMouseLeave={() => setHoveredService(null)}
              />

              {/* Right Middle Card Path */}
              <motion.path 
                d="M 820 340 L 600 340" 
                fill="none" 
                stroke={hoveredService === 5 ? "#fcbf4a" : "#0c3773"} 
                strokeWidth={hoveredService === 5 ? "4" : "2"} 
                strokeDasharray={hoveredService === 5 ? "8 4" : "6 4"} 
                className={`${hoveredService === 5 ? "opacity-100" : "opacity-30"} transition-all duration-300`}
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  strokeDashoffset: hoveredService === 5 ? [0, -20] : 0
                }}
                transition={{ 
                  strokeDashoffset: hoveredService === 5 ? { repeat: Infinity, ease: "linear", duration: 1 } : { duration: 0 },
                  default: { duration: 1.5, delay: 0.4 }
                }}
              />
              {/* Right Middle Hidden wider hover path */}
              <path 
                d="M 820 340 L 600 340" 
                fill="none" 
                stroke="transparent" 
                strokeWidth="24" 
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredService(5)}
                onMouseLeave={() => setHoveredService(null)}
              />

              {/* Right Bottom Card Path */}
              <motion.path 
                d="M 820 560 C 700 560, 720 340, 600 340" 
                fill="none" 
                stroke={hoveredService === 6 ? "#fcbf4a" : "#0c3773"} 
                strokeWidth={hoveredService === 6 ? "4" : "2"} 
                strokeDasharray={hoveredService === 6 ? "8 4" : "6 4"} 
                className={`${hoveredService === 6 ? "opacity-100" : "opacity-30"} transition-all duration-300`}
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  strokeDashoffset: hoveredService === 6 ? [0, -20] : 0
                }}
                transition={{ 
                  strokeDashoffset: hoveredService === 6 ? { repeat: Infinity, ease: "linear", duration: 1 } : { duration: 0 },
                  default: { duration: 1.5, delay: 0.6 }
                }}
              />
              {/* Right Bottom Hidden wider hover path */}
              <path 
                d="M 820 560 C 700 560, 720 340, 600 340" 
                fill="none" 
                stroke="transparent" 
                strokeWidth="24" 
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredService(6)}
                onMouseLeave={() => setHoveredService(null)}
              />

              {/* Connecting Nodes (dots) on Central Hub Circle */}
              <circle 
                cx="485" 
                cy="225" 
                r={hoveredService === 1 ? "8" : "5"} 
                fill={hoveredService === 1 ? "#fcbf4a" : "#0c3773"} 
                className="transition-all duration-350 cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredService(1)}
                onMouseLeave={() => setHoveredService(null)}
              />
              <circle 
                cx="460" 
                cy="340" 
                r={hoveredService === 2 ? "8" : "5"} 
                fill={hoveredService === 2 ? "#fcbf4a" : "#0c3773"} 
                className="transition-all duration-350 cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredService(2)}
                onMouseLeave={() => setHoveredService(null)}
              />
              <circle 
                cx="485" 
                cy="455" 
                r={hoveredService === 3 ? "8" : "5"} 
                fill={hoveredService === 3 ? "#fcbf4a" : "#0c3773"} 
                className="transition-all duration-350 cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredService(3)}
                onMouseLeave={() => setHoveredService(null)}
              />

              <circle 
                cx="715" 
                cy="225" 
                r={hoveredService === 4 ? "8" : "5"} 
                fill={hoveredService === 4 ? "#fcbf4a" : "#0c3773"} 
                className="transition-all duration-350 cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredService(4)}
                onMouseLeave={() => setHoveredService(null)}
              />
              <circle 
                cx="740" 
                cy="340" 
                r={hoveredService === 5 ? "8" : "5"} 
                fill={hoveredService === 5 ? "#fcbf4a" : "#0c3773"} 
                className="transition-all duration-350 cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredService(5)}
                onMouseLeave={() => setHoveredService(null)}
              />
              <circle 
                cx="715" 
                cy="455" 
                r={hoveredService === 6 ? "8" : "5"} 
                fill={hoveredService === 6 ? "#fcbf4a" : "#0c3773"} 
                className="transition-all duration-350 cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredService(6)}
                onMouseLeave={() => setHoveredService(null)}
              />
            </svg>

            {/* Desktop 3-Column Symmetrical Layout */}
            <div className="relative z-10 grid grid-cols-12 gap-6 items-center">
              
              {/* Left Column (Services 1, 2, 3) */}
              <div className="col-span-4 flex flex-col gap-6 justify-center pr-2">
                
                {/* Card 1: Performance Marketing */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.01 }}
                  onMouseEnter={() => setHoveredService(1)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={`transition-all duration-300 flex items-start gap-4 text-left relative group min-h-[160px] p-6 rounded-2xl border ${
                    hoveredService === 1 
                      ? "bg-amber-50/10 border-amber-500/30 shadow-[0_20px_40px_-15px_rgba(252,191,74,0.15)] scale-[1.01]" 
                      : "bg-white border-zinc-200/90 shadow-[0_12px_36px_-15px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#0c3773] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Rocket className="w-5 h-5 text-[#fcbf4a]" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-lg text-[#0c3773] group-hover:text-amber-600 transition-colors duration-300 font-sans">Performance Marketing</h3>
                    <p className="text-zinc-650 text-sm leading-relaxed font-medium">
                      Reach the right audience, generate qualified leads, and maximize every advertising rupee through data-backed campaigns.
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-start pt-1">
                      {["Meta Ads", "Google Ads", "Lead Generation", "Conversion Optimization", "Campaign Management"].map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#0c3773]/5 text-[#0c3773] border border-[#0c3773]/10 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Card 2: SEO */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.01 }}
                  onMouseEnter={() => setHoveredService(2)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={`transition-all duration-300 flex items-start gap-4 text-left relative group min-h-[160px] p-6 rounded-2xl border ${
                    hoveredService === 2 
                      ? "bg-amber-50/10 border-amber-500/30 shadow-[0_20px_40px_-15px_rgba(252,191,74,0.15)] scale-[1.01]" 
                      : "bg-white border-zinc-200/90 shadow-[0_12px_36px_-15px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#0c3773] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Search className="w-5 h-5 text-[#fcbf4a]" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-lg text-[#0c3773] group-hover:text-amber-600 transition-colors duration-300 font-sans">SEO (Search Engine Optimization)</h3>
                    <p className="text-zinc-650 text-sm leading-relaxed font-medium">
                      Get found when customers are searching. We help businesses improve rankings, increase organic visibility, and drive long-term traffic that converts.
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-start pt-1">
                      {["Technical SEO", "On-Page SEO", "Keyword Strategy", "Local SEO", "SEO Audits"].map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#0c3773]/5 text-[#0c3773] border border-[#0c3773]/10 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Card 3: Web App Design & Development */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.01 }}
                  onMouseEnter={() => setHoveredService(3)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={`transition-all duration-300 flex items-start gap-4 text-left relative group min-h-[160px] p-6 rounded-2xl border ${
                    hoveredService === 3 
                      ? "bg-amber-50/10 border-amber-500/30 shadow-[0_20px_40px_-15px_rgba(252,191,74,0.15)] scale-[1.01]" 
                      : "bg-white border-zinc-200/90 shadow-[0_12px_36px_-15px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#0c3773] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Code className="w-5 h-5 text-[#fcbf4a]" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-lg text-[#0c3773] group-hover:text-amber-600 transition-colors duration-300 font-sans">Web App Design & Development</h3>
                    <p className="text-zinc-650 text-sm leading-relaxed font-medium">
                      Great brands deserve great digital experiences. We design and develop websites and web applications that are fast, scalable, and built around user experience.
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-start pt-1">
                      {["Custom Websites", "Web Applications", "UI/UX Design", "Landing Pages", "E-Commerce Solutions"].map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#0c3773]/5 text-[#0c3773] border border-[#0c3773]/10 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Center Column (Interactive Central Hub Circle) */}
              <div className="col-span-4 flex items-center justify-center">
                <div className="relative w-72 h-72 rounded-full bg-gradient-to-tr from-[#0c3773] to-[#124b96] p-1.5 shadow-[0_20px_50px_rgba(12,55,115,0.25)] group cursor-pointer transition-transform duration-500 hover:scale-[1.02]">
                  {/* Rotating border accent */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#fcbf4a]/50 animate-[spin_40s_linear_infinite]" />
                  
                  {/* Nested elegant ring */}
                  <div className="w-full h-full rounded-full border-4 border-white/10 bg-[#0c3773] flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden">
                    <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#fcbf4a]/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <Megaphone className="w-12 h-12 text-[#fcbf4a] mb-4 animate-pulse" />
                    <h4 className="text-2xl font-black tracking-tight leading-tight uppercase font-sans">
                      Digital Solutions
                    </h4>
                    <span className="text-[11px] font-mono tracking-widest text-[#fcbf4a] uppercase block mt-1.5 font-bold">
                      That Deliver
                    </span>
                    <h4 className="text-xl font-bold tracking-tight leading-tight uppercase font-sans mt-0.5 text-zinc-100">
                      Results
                    </h4>
                  </div>
                </div>
              </div>

              {/* Right Column (Services 4, 5, 6) */}
              <div className="col-span-4 flex flex-col gap-6 justify-center pl-2">
                
                {/* Card 4: Video Production */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.01 }}
                  onMouseEnter={() => setHoveredService(4)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={`transition-all duration-300 flex items-start gap-4 text-left relative group min-h-[160px] p-6 rounded-2xl border ${
                    hoveredService === 4 
                      ? "bg-amber-50/10 border-amber-500/30 shadow-[0_20px_40px_-15px_rgba(252,191,74,0.15)] scale-[1.01]" 
                      : "bg-white border-zinc-200/90 shadow-[0_12px_36px_-15px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#0c3773] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Video className="w-5 h-5 text-[#fcbf4a]" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-lg text-[#0c3773] group-hover:text-amber-600 transition-colors duration-300 font-sans">Video Production</h3>
                    <p className="text-zinc-650 text-sm leading-relaxed font-medium">
                      Attention starts with great storytelling. From brand films to social media content, we create videos that engage, inspire, and drive action.
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-start pt-1">
                      {["Brand Videos", "Commercials", "Reels", "Motion Graphics", "Product Videos"].map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#0c3773]/5 text-[#0c3773] border border-[#0c3773]/10 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Card 5: Social Media Management */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.01 }}
                  onMouseEnter={() => setHoveredService(5)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={`transition-all duration-300 flex items-start gap-4 text-left relative group min-h-[160px] p-6 rounded-2xl border ${
                    hoveredService === 5 
                      ? "bg-amber-50/10 border-amber-500/30 shadow-[0_20px_40px_-15px_rgba(252,191,74,0.15)] scale-[1.01]" 
                      : "bg-white border-zinc-200/90 shadow-[0_12px_36px_-15px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#0c3773] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Smartphone className="w-5 h-5 text-[#fcbf4a]" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-lg text-[#0c3773] group-hover:text-amber-600 transition-colors duration-300 font-sans">Social Media Management</h3>
                    <p className="text-zinc-650 text-sm leading-relaxed font-medium">
                      Because consistency builds brands. We create content strategies, campaigns, and communities that help brands stay relevant and connected.
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-start pt-1">
                      {["Content Planning", "Creative Design", "Reels Strategy", "Community Management", "Monthly Reporting"].map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#0c3773]/5 text-[#0c3773] border border-[#0c3773]/10 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Card 6: Graphics & Print Media */}
                <motion.div 
                  whileHover={{ y: -4, scale: 1.01 }}
                  onMouseEnter={() => setHoveredService(6)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={`transition-all duration-300 flex items-start gap-4 text-left relative group min-h-[160px] p-6 rounded-2xl border ${
                    hoveredService === 6 
                      ? "bg-amber-50/10 border-amber-500/30 shadow-[0_20px_40px_-15px_rgba(252,191,74,0.15)] scale-[1.01]" 
                      : "bg-white border-zinc-200/90 shadow-[0_12px_36px_-15px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#0c3773] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Palette className="w-5 h-5 text-[#fcbf4a]" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-extrabold text-lg text-[#0c3773] group-hover:text-amber-600 transition-colors duration-300 font-sans">Graphics & Print Media</h3>
                    <p className="text-zinc-650 text-sm leading-relaxed font-medium">
                      Strong visuals create stronger impressions. From digital creatives to print materials, we design assets that make your brand impossible to ignore.
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-start pt-1">
                      {["Brand Identity", "Brochures", "Flyers", "Packaging", "Marketing Collaterals", "Print Design"].map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#0c3773]/5 text-[#0c3773] border border-[#0c3773]/10 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

              </div>

            </div>

          </div>

          {/* MOBILE VIEW: VERTICAL LIST WITH BADGE (lg hidden) */}
          <div className="block lg:hidden space-y-6">
            
            {/* Center Badges circle as a beautiful focal banner at the top */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-[#0c3773] to-[#124b96] p-1 shadow-lg flex items-center justify-center text-center text-white">
                <div className="w-full h-full rounded-full bg-[#0c3773] flex flex-col items-center justify-center p-4">
                  <Megaphone className="w-8 h-8 text-[#fcbf4a] mb-2" />
                  <h4 className="text-base font-black uppercase font-sans">Digital Solutions</h4>
                  <span className="text-[9px] font-mono tracking-widest text-[#fcbf4a] uppercase mt-0.5">Deliver Results</span>
                </div>
              </div>
            </div>

            {/* List of 6 Cards stacked sequential order */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 1. Performance Marketing */}
              <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0c3773] text-white flex items-center justify-center shrink-0">
                  <Rocket className="w-4 h-4 text-[#fcbf4a]" />
                </div>
                <div className="space-y-1.5 flex-1 text-left">
                  <h3 className="font-bold text-sm text-[#0c3773] font-sans">Performance Marketing</h3>
                  <p className="text-zinc-600 text-xs leading-relaxed">
                    Reach the right audience, generate qualified leads, and maximize every advertising rupee through data-backed campaigns.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {["Meta Ads", "Google Ads", "Lead Generation", "Conversion Optimization", "Campaign Management"].map((tag, i) => (
                      <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. SEO */}
              <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0c3773] text-white flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4 text-[#fcbf4a]" />
                </div>
                <div className="space-y-1.5 flex-1 text-left">
                  <h3 className="font-bold text-sm text-[#0c3773] font-sans">SEO (Search Engine Optimization)</h3>
                  <p className="text-zinc-600 text-xs leading-relaxed">
                    Get found when customers are searching. We help businesses improve rankings, increase organic visibility, and drive long-term traffic that converts.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {["Technical SEO", "On-Page SEO", "Keyword Strategy", "Local SEO", "SEO Audits"].map((tag, i) => (
                      <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Web App Design & Development */}
              <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0c3773] text-white flex items-center justify-center shrink-0">
                  <Code className="w-4 h-4 text-[#fcbf4a]" />
                </div>
                <div className="space-y-1.5 flex-1 text-left">
                  <h3 className="font-bold text-sm text-[#0c3773] font-sans">Web App Design & Development</h3>
                  <p className="text-zinc-600 text-xs leading-relaxed">
                    Great brands deserve great digital experiences. We design and develop websites and web applications that are fast, scalable, and built around user experience.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {["Custom Websites", "Web Applications", "UI/UX Design", "Landing Pages", "E-Commerce Solutions"].map((tag, i) => (
                      <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Video Production */}
              <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0c3773] text-white flex items-center justify-center shrink-0">
                  <Video className="w-4 h-4 text-[#fcbf4a]" />
                </div>
                <div className="space-y-1.5 flex-1 text-left">
                  <h3 className="font-bold text-sm text-[#0c3773] font-sans">Video Production</h3>
                  <p className="text-zinc-600 text-xs leading-relaxed">
                    Attention starts with great storytelling. From brand films to social media content, we create videos that engage, inspire, and drive action.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {["Brand Videos", "Commercials", "Reels", "Motion Graphics", "Product Videos"].map((tag, i) => (
                      <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. Social Media Management */}
              <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0c3773] text-white flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4 text-[#fcbf4a]" />
                </div>
                <div className="space-y-1.5 flex-1 text-left">
                  <h3 className="font-bold text-sm text-[#0c3773] font-sans">Social Media Management</h3>
                  <p className="text-zinc-600 text-xs leading-relaxed">
                    Because consistency builds brands. We create content strategies, campaigns, and communities that help brands stay relevant and connected.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {["Content Planning", "Creative Design", "Reels Strategy", "Community Management", "Monthly Reporting"].map((tag, i) => (
                      <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 6. Graphics & Print Media */}
              <div className="bg-white border border-zinc-200 rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0c3773] text-white flex items-center justify-center shrink-0">
                  <Palette className="w-4 h-4 text-[#fcbf4a]" />
                </div>
                <div className="space-y-1.5 flex-1 text-left">
                  <h3 className="font-bold text-sm text-[#0c3773] font-sans">Graphics & Print Media</h3>
                  <p className="text-zinc-600 text-xs leading-relaxed">
                    Strong visuals create stronger impressions. From digital creatives to print materials, we design assets that make your brand impossible to ignore.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {["Brand Identity", "Brochures", "Flyers", "Packaging", "Marketing Collaterals", "Print Design"].map((tag, i) => (
                      <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Bar: Symmetrical with Pill Shape */}
          <div className="mt-12 md:mt-16 max-w-4xl mx-auto">
            <div className="rounded-[2rem] border border-zinc-200/80 bg-white shadow-[0_10px_25px_-10px_rgba(0,0,0,0.02)] py-4 px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 items-center gap-6 divide-y md:divide-y-0 md:divide-x divide-zinc-150">
              
              <div className="flex items-center justify-center md:justify-start gap-3 py-2 md:py-0">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <Eye className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs md:text-sm text-zinc-800">More Visibility</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 py-2 md:py-0 md:pl-4">
                <div className="w-8 h-8 rounded-full bg-[#0c3773]/5 flex items-center justify-center text-[#0c3773] shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs md:text-sm text-zinc-800">More Leads</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 py-2 md:py-0 md:pl-4">
                <div className="w-8 h-8 rounded-full bg-[#fcbf4a]/10 flex items-center justify-center text-amber-600 shrink-0">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs md:text-sm text-zinc-800">More Sales</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 py-2 md:py-0 md:pl-4">
                <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs md:text-sm text-zinc-800">Sustainable Growth</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ==================== FEATURED CASE STUDIES SECTION ==================== */}
      <section id="case-studies" className="relative z-20 w-full bg-white text-zinc-900 py-16 md:py-20 px-6 md:px-12 border-t border-zinc-200/60 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[450px] h-[450px] bg-[#0c3773]/3 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Metrics & Targets Tracker */}
            <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
              <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-6 relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#0c3773]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4">
                  <span className="text-[10px] font-mono tracking-wider text-[#0c3773] font-bold uppercase">CORE METRIC TELEMETRY</span>
                  <div className="flex space-x-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600/30" />
                  </div>
                </div>

                <div className="space-y-4 font-sans text-zinc-800">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-white rounded-2xl border border-zinc-200/60 flex flex-col justify-between">
                      <span className="text-xs text-zinc-500 font-semibold uppercase font-mono tracking-widest text-[10px]">General Goal</span>
                      <h4 className="text-base font-bold text-zinc-900 tracking-tight mt-2">Every project has a goal.</h4>
                    </div>
                    <div className="p-5 bg-white rounded-2xl border border-zinc-200/60 font-mono">
                      <p className="text-2xl font-black text-[#0c3773]">+312%</p>
                      <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mt-1">More leads.</span>
                    </div>
                    <div className="p-5 bg-white rounded-2xl border border-zinc-200/60 font-mono">
                      <p className="text-2xl font-black text-zinc-900">+240%</p>
                      <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mt-1">More visibility.</span>
                    </div>
                    <div className="p-5 bg-white rounded-2xl border border-zinc-200/60 font-mono">
                      <p className="text-2xl font-black text-[#0c3773]">5.1x</p>
                      <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mt-1">More engagement.</span>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-[#0c3773]/5 border border-[#0c3773]/15 rounded-2xl flex items-center justify-between font-mono">
                    <div>
                      <span className="text-[9px] text-zinc-500 uppercase tracking-widest block">Primary Objective</span>
                      <p className="text-lg font-black text-[#0c3773]">More growth.</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#fcbf4a] text-black flex items-center justify-center shrink-0 select-none">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Copy Represented & Interactive View case study Trigger */}
            <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <span className="text-xs font-mono font-black tracking-widest text-[#0c3773] uppercase">VERIFIED RESULTS</span>
                <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-zinc-950 leading-tight">
                  Featured Case Studies
                </h2>
                <h3 className="text-xl md:text-2xl font-sans font-extrabold text-[#0c3773] tracking-tight">
                  Results You Can Actually Measure.
                </h3>
              </div>
              <p className="text-zinc-600 font-normal text-base md:text-lg leading-relaxed max-w-xl">
                Explore how we've helped brands transform challenges into measurable success.
              </p>
              
              <div className="pt-4">
                <button 
                  onClick={() => setIsCaseStudiesOpen(true)}
                  className="px-8 py-4.5 bg-[#0c3773] text-white hover:bg-[#07244d] font-sans font-black text-xs uppercase tracking-widest rounded-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-md hover:shadow-lg cursor-pointer flex items-center space-x-2"
                >
                  <span>View Case Studies</span>
                  <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== WHY CHOOSE US SECTION ==================== */}
      <section id="why-choose-us" className="relative z-20 w-full bg-white text-zinc-900 py-16 md:py-20 px-6 md:px-12 border-t border-zinc-200/60 overflow-hidden">
        <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-[#0c3773]/3 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Title and High Contrast Tagline Card */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-mono font-black tracking-widest text-[#0c3773] uppercase">THE BRAND REASON</span>
                <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-zinc-950 animate-fade-in">
                  Why Choose Us
                </h2>
                <h3 className="text-xl md:text-2xl font-sans font-bold text-[#0c3773] tracking-tight">
                  Why Brands Partner With Digiyog.
                </h3>
              </div>

              {/* Styled statement card keeping text exactly */}
              <div className="p-8 rounded-2xl bg-[#0c3773]/95 border border-[#0c3773] text-white shadow-md relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#fcbf4a]" />
                <p className="text-white text-base md:text-lg font-semibold leading-relaxed">
                  Because your brand deserves more than copy-paste marketing.
                </p>
              </div>
            </div>

            {/* Right Column: Checked Benefits List */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {[
                  "Strategy before execution",
                  "Creative backed by purpose",
                  "Marketing focused on business growth",
                  "Transparent communication",
                  "Fast-moving and adaptable teams",
                  "Solutions tailored to your goals"
                ].map((benefit, idx) => (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-[#0c3773]/20 hover:shadow-md transition-all duration-300 flex items-start space-x-4 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0c3773]/10 border border-[#0c3773]/20 flex items-center justify-center text-[#0c3773] shrink-0 mt-0.5 group-hover:bg-[#0c3773] group-hover:text-white transition-all duration-300">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <p className="text-zinc-800 text-sm md:text-base font-semibold tracking-wide">
                      {benefit}
                    </p>
                  </div>
                ))}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================== OUR PROCESS SECTION ==================== */}
      <section id="process" className="relative z-20 w-full bg-zinc-950 text-white py-16 md:py-20 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        {/* Soft atmospheric radial glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#0c3773]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[350px] h-[350px] bg-[#fcbf4a]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Content area (Fixed context and primary trigger) */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-xs font-mono font-black tracking-widest text-[#fcbf4a] uppercase">ALIGNED BLUEPRINT</span>
                <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-white leading-tight">
                  Our Process
                </h2>
                <h3 className="text-xl md:text-2xl font-sans font-extrabold text-[#fcbf4a] tracking-tight">
                  From Idea To Impact.
                </h3>
              </div>

              <p className="text-zinc-400 font-normal text-base md:text-lg leading-relaxed max-w-xl">
                We rely on a disciplined, highly calibrated engineering and marketing blueprint to scale your digital presence. No guesswork—just compounding monthly performance.
              </p>

              {/* Supporting context / Micro stats panels */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="bg-zinc-900/50 backdrop-blur border border-white/5 p-5 rounded-2xl">
                  <span className="block text-2xl font-black text-[#fcbf4a] font-mono">100%</span>
                  <span className="text-xs text-zinc-400 font-medium tracking-wide">Data-Driven Iterations</span>
                </div>
                <div className="bg-zinc-900/50 backdrop-blur border border-white/5 p-5 rounded-2xl">
                  <span className="block text-2xl font-black text-white font-mono">5-Step</span>
                  <span className="text-xs text-zinc-400 font-medium tracking-wide">Optimization Loop</span>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => {
                    const el = document.getElementById("cta");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-[#fcbf4a] to-[#f3a91e] hover:from-[#fcbf4a] hover:to-[#fcbf4a] text-black font-sans font-black text-xs uppercase tracking-widest rounded-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center space-x-2 cursor-pointer w-fit"
                >
                  <span>Accelerate Growth</span>
                  <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
                </button>
              </div>
            </div>

            {/* Right Side: Continuous Autoplay Marquee Slider */}
            <div className="lg:col-span-7 relative w-full overflow-hidden py-6">
              {/* Fade out masks on borders for premium aesthetic depth */}
              <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none hidden sm:block" />
              <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none hidden sm:block" />

              <div className="animate-marquee-scroll">
                {/* List fully duplicated once to yield seamless loop */}
                {[...DATA_PROCESS_STEPS, ...DATA_PROCESS_STEPS].map((step, idx) => (
                  <div 
                    key={idx}
                    className="w-[280px] sm:w-[320px] shrink-0 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 sm:p-8 relative group hover:border-[#fcbf4a]/35 hover:bg-zinc-900/70 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[280px] hover:shadow-[0_15px_30px_-5px_rgba(252,191,74,0.03)]"
                  >
                    {/* Golden accent linear path highlight */}
                    <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#fcbf4a]/10 group-hover:border-[#fcbf4a]/40 rounded-tr-2xl transition-all duration-500 pointer-events-none" />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-mono font-black text-zinc-800 group-hover:text-[#fcbf4a]/25 transition-colors duration-500 select-none font-sans">
                          {step.num}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-zinc-800/40 border border-white/5 flex items-center justify-center shrink-0">
                          {getProcessIcon(step.iconAlt)}
                        </div>
                      </div>

                      <h4 className="text-lg font-bold font-sans text-white group-hover:text-[#fcbf4a] transition-colors duration-500">
                        {step.title}
                      </h4>
                      
                      <p className="text-[#fcbf4a]/85 text-xs font-mono tracking-wide font-black uppercase">
                        {step.desc}
                      </p>

                      <p className="text-zinc-400 text-xs sm:text-sm font-medium leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>



        </div>
      </section>


      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section id="testimonials" className="relative z-20 w-full bg-white text-zinc-900 py-16 md:py-20 border-t border-zinc-200/60 overflow-hidden">
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#0c3773]/3 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-mono font-black tracking-widest text-[#0c3773] uppercase">REPUTATION SCORE</span>
            <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-zinc-950">
              Testimonials
            </h2>
            <p className="text-[#0c3773] font-sans font-extrabold text-lg md:text-xl shrink-0 mt-2">
              Don't Just Take Our Word For It.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DATA_TESTIMONIALS.map((t) => (
              <div 
                key={t.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/80 hover:border-zinc-300 duration-400 transition-all hover:shadow-md flex flex-col justify-between min-h-[260px] relative"
              >
                <div className="space-y-4">
                  {/* Star Ratings */}
                  <div className="flex items-center gap-1 text-[#fcbf4a]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-current shrink-0" />
                    ))}
                  </div>

                  {/* Minimalist customer review */}
                  <p className="text-zinc-800 text-sm sm:text-base font-semibold leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                {/* Minimalist Author Info row */}
                <div className="flex items-center space-x-3 pt-5 mt-6 border-t border-zinc-100">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200 shadow-sm">
                    <img src={t.image} alt={t.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h5 className="text-sm font-extrabold text-zinc-900 leading-tight">{t.author}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ==================== FINAL CTA SECTION ==================== */}
      <section id="cta" className="relative z-20 w-full bg-black text-white py-16 md:py-20 border-t border-white/5 overflow-hidden">
        {/* Glowing backdrop spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#0c3773]/20 to-[#fcbf4a]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full text-center space-y-10">
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-black tracking-widest text-[#fcbf4a] uppercase">START ELEVATING TODAY</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tight text-white leading-tight">
              Ready To Build A Brand People Notice?
            </h2>
          </div>

          <div className="space-y-3 font-sans max-w-xl mx-auto text-base sm:text-lg text-white/85">
            <p className="font-normal">The internet is crowded.</p>
            <p className="font-semibold text-white">Your brand doesn't have to blend in.</p>
            <p className="text-[#fcbf4a] font-bold text-lg sm:text-xl">Let's create something worth talking about.</p>
          </div>

          {/* Trigger Free Consultation */}
          <div className="pt-6">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="px-10 py-5 bg-[#fcbf4a] text-black font-sans font-black text-xs uppercase tracking-widest rounded-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-md hover:shadow-lg hover:shadow-[#fcbf4a]/30 cursor-pointer"
            >
              Book A Free Consultation
            </button>
          </div>

          <div className="pt-16 max-w-2xl mx-auto border-t border-white/5">
            <p className="text-xs sm:text-sm font-mono tracking-widest font-bold text-white/50 uppercase">
              Digiyog Technosoft — Where Creativity Meets Growth.
            </p>
          </div>

        </div>
      </section>

      {/* ==================== INTERACTIVE LAYER MODALS (True Inline Overlay Utilities) ==================== */}

      {/* 1. CONSULTATION BOOKING MODAL */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop cover filter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md" 
            />

            {/* Panel console */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative z-10 w-full max-w-lg bg-zinc-950 border border-white/10 rounded-[2.5rem] shadow-2xl p-8 overflow-hidden overflow-y-auto max-h-[90vh] font-sans"
            >
              
              {/* Back ambient elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#fcbf4a]/5 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#fcbf4a] uppercase">BOOKING PORTAL</span>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Free Consultation</h3>
                </div>
                <button 
                  onClick={() => {
                    setIsBookingOpen(false);
                    setBookingSubmitted(false);
                  }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white text-white/60 transition-all active:scale-95 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {bookingSubmitted ? (
                <div className="text-center py-10 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-3xl mx-auto animate-bounce">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-white uppercase tracking-tight">Consultation Scheduled!</h4>
                    <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{bookingFormData.name}</strong>. An account manager has reserved your slots on <strong className="text-white">{bookingFormData.date || "your requested date"}</strong> to discuss scaling up <strong className="text-white">{bookingFormData.website || "your brand"}</strong>.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-white/30 block pt-4 uppercase">DIGIYOG GROWTH TEAM READY</span>
                  <button 
                    onClick={() => {
                      setIsBookingOpen(false);
                      setBookingSubmitted(false);
                      setBookingFormData({
                        name: "",
                        email: "",
                        website: "",
                        service: "Performance Marketing",
                        date: ""
                      });
                    }}
                    className="w-full h-12 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all"
                  >
                    Close Booking console
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold tracking-widest text-white/50 uppercase">Name Address</label>
                    <input 
                      type="text" 
                      required
                      value={bookingFormData.name}
                      onChange={(e) => setBookingFormData({...bookingFormData, name: e.target.value})}
                      placeholder="e.g. David Miller" 
                      className="w-full h-12 px-4 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-white/33 focus:border-[#fcbf4a] focus:outline-none text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold tracking-widest text-white/50 uppercase">Email Coordinates</label>
                    <input 
                      type="email" 
                      required
                      value={bookingFormData.email}
                      onChange={(e) => setBookingFormData({...bookingFormData, email: e.target.value})}
                      placeholder="e.g. brand@partner.com" 
                      className="w-full h-12 px-4 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-white/33 focus:border-[#fcbf4a] focus:outline-none text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold tracking-widest text-white/50 uppercase">Website URL / Domain</label>
                    <input 
                      type="text" 
                      value={bookingFormData.website}
                      onChange={(e) => setBookingFormData({...bookingFormData, website: e.target.value})}
                      placeholder="e.g. mybrand.com" 
                      className="w-full h-12 px-4 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-white/33 focus:border-[#fcbf4a] focus:outline-none text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold tracking-widest text-white/50 uppercase">Service Category</label>
                      <select 
                        value={bookingFormData.service}
                        onChange={(e) => setBookingFormData({...bookingFormData, service: e.target.value})}
                        className="w-full h-12 px-3 bg-zinc-900 border border-white/10 rounded-xl text-white focus:border-[#fcbf4a] focus:outline-none text-xs"
                      >
                        <option value="Performance Marketing">Performance Marketing</option>
                        <option value="SEO">SEO Optimization</option>
                        <option value="Web App Design">Web Design & Dev</option>
                        <option value="Video Production">Video Production</option>
                        <option value="Social Media">Social Media Management</option>
                        <option value="Graphics & Print">Graphics & Print Media</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold tracking-widest text-white/50 uppercase">Preferred Date</label>
                      <input 
                        type="date" 
                        required
                        value={bookingFormData.date}
                        onChange={(e) => setBookingFormData({...bookingFormData, date: e.target.value})}
                        className="w-full h-12 px-3 bg-zinc-900 border border-white/10 rounded-xl text-white focus:border-[#fcbf4a] focus:outline-none text-xs"
                      />
                    </div>
                  </div>

                  <span className="text-[10px] text-white/40 block leading-normal pt-2 font-medium">
                    By booking, you lock-in a 45-minute premium conversion strategy review directly with an Experience Architect. No pushy sales calls.
                  </span>

                  <button 
                    type="submit"
                    className="w-full h-14 bg-[#fcbf4a] hover:bg-amber-400 text-black font-sans font-black text-xs tracking-widest uppercase rounded-xl transition-all shadow-md active:scale-98 mt-6 cursor-pointer"
                  >
                    SCHEDULE MY CONSULTATION
                  </button>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. CASE STUDIES CATALOGUE OVERLAY MODAL */}
      <AnimatePresence>
        {isCaseStudiesOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCaseStudiesOpen(false)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative z-10 w-full max-w-4xl bg-white text-neutral-900 rounded-[2.5rem] shadow-2xl p-8 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200 mb-8">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#0c3773] uppercase">DIGIYOG CASE INDEX</span>
                  <h3 className="text-2xl font-black text-neutral-950 uppercase tracking-tight">Active Portfolio Cases</h3>
                </div>
                <button 
                  onClick={() => setIsCaseStudiesOpen(false)}
                  className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 text-neutral-500 transition-all active:scale-95 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-8">
                <p className="text-sm font-semibold text-neutral-500 max-w-2xl">
                  Each client engagement below represents completed creative blueprints, conversion mapping, and real verified database growth metrics engineered by Digiyog Technosoft.
                </p>

                <div className="space-y-6">
                  {DATA_CASE_STUDIES.map((cs) => (
                    <div key={cs.id} className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-4 aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                        <img src={cs.image} alt={cs.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="md:col-span-8 space-y-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono bg-[#0c3773]/10 text-[#0c3773] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{cs.category}</span>
                          <span className="text-xs font-semibold text-neutral-500">{cs.scope}</span>
                        </div>
                        <h4 className="text-lg font-black uppercase text-neutral-950">{cs.title}</h4>
                        <p className="text-xs text-neutral-600 leading-relaxed">{cs.description}</p>
                        
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-200/60">
                          {cs.metrics.map((m, idx) => (
                            <div key={idx}>
                              <p className="text-xs text-[#0c3773] font-black">{m.value}</p>
                              <p className="text-[8px] text-neutral-500 font-bold uppercase tracking-wider">{m.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-neutral-200 pt-6 flex justify-end">
                <button 
                  onClick={() => {
                    setIsCaseStudiesOpen(false);
                    setIsBookingOpen(true);
                  }}
                  className="bg-[#0c3773] text-white font-sans font-black text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl hover:bg-[#092b5b] transition-all"
                >
                  Request Case Briefings & Consultation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. INSIGHTS ARTICLES READ CONSOLE */}
      <AnimatePresence>
        {isArticlesOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsArticlesOpen(false)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative z-10 w-full max-w-3xl bg-white text-neutral-900 rounded-[2.5rem] shadow-2xl p-8 overflow-y-auto max-h-[90vh] font-sans"
            >
              
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200 mb-6">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#0c3773] uppercase">DIGIYOG READ PLATFORM</span>
                  <h3 className="text-xl font-black text-neutral-950 uppercase tracking-tight">Technical Research Journal</h3>
                </div>
                <button 
                  onClick={() => {
                    setIsArticlesOpen(false);
                    setActiveArticle(null);
                  }}
                  className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 text-neutral-500 transition-all active:scale-95 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {activeArticle ? (
                <div className="space-y-6">
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
                    <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  <div className="flex items-center space-x-3 text-xs font-mono font-bold text-[#0c3773]">
                    <span className="bg-[#0c3773]/5 px-2 py-1 rounded">{activeArticle.category}</span>
                    <span>•</span>
                    <span className="text-neutral-500">PUBLISHED ON {activeArticle.date}</span>
                    <span>•</span>
                    <span className="text-neutral-500">{activeArticle.readTime}</span>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-black uppercase text-neutral-950 tracking-tight leading-tight">
                    {activeArticle.title}
                  </h1>

                  {/* Clean readable body context */}
                  <div className="text-xs sm:text-sm text-neutral-700 space-y-4 leading-relaxed max-w-none pt-4 border-t border-neutral-100">
                    <p className="font-bold text-neutral-900 text-sm italic">
                      &ldquo;{activeArticle.excerpt}&rdquo;
                    </p>
                    
                    {/* Rendered markdown segments simulated beautifully */}
                    <div className="space-y-4">
                      {activeArticle.content.split('\n\n').map((paragraph: string, pIdx: number) => {
                        if (paragraph.startsWith('## ')) {
                          return <h2 key={pIdx} className="text-lg font-black text-neutral-950 uppercase pt-4 tracking-tight">{paragraph.replace('## ', '')}</h2>;
                        }
                        if (paragraph.startsWith('### ')) {
                          return <h3 key={pIdx} className="text-sm font-black text-neutral-950 uppercase pt-2 tracking-tight">{paragraph.replace('### ', '')}</h3>;
                        }
                        if (paragraph.startsWith('- ')) {
                          return (
                            <ul key={pIdx} className="list-disc pl-5 space-y-1">
                              {paragraph.split('\n').map((li, lIdx) => (
                                <li key={lIdx} className="font-semibold text-neutral-800">{li.replace('- ', '')}</li>
                              ))}
                            </ul>
                          );
                        }
                        if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                          return (
                            <ol key={pIdx} className="list-decimal pl-5 space-y-1">
                              {paragraph.split('\n').map((li, lIdx) => (
                                <li key={lIdx} className="font-medium text-neutral-800">{li.substring(3)}</li>
                              ))}
                            </ol>
                          );
                        }
                        return <p key={pIdx} className="font-medium">{paragraph}</p>;
                      })}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DATA_ARTICLES.map((art) => (
                    <div 
                      key={art.id} 
                      onClick={() => setActiveArticle(art)}
                      className="p-5 border border-neutral-200 rounded-2xl hover:border-[#0c3773] transition-all cursor-pointer bg-neutral-50"
                    >
                      <p className="text-[10px] font-mono tracking-widest text-[#0c3773] font-bold uppercase">{art.category}</p>
                      <h4 className="text-base font-black text-neutral-900 uppercase mt-2 hover:underline leading-tight">{art.title}</h4>
                      <p className="text-xs text-neutral-500 mt-2 line-clamp-2">{art.excerpt}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 border-t border-neutral-200 pt-6 flex justify-between items-center">
                {activeArticle && (
                  <button 
                    onClick={() => setActiveArticle(null)}
                    className="text-xs text-[#0c3773] font-black uppercase tracking-wider font-mono hover:underline"
                  >
                    ← Back to journal overview
                  </button>
                )}
                <button 
                  onClick={() => {
                    setIsArticlesOpen(false);
                    setIsBookingOpen(true);
                  }}
                  className="bg-[#0c3773] text-white font-sans font-black text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl hover:bg-[#092b5b] transition-all ml-auto"
                >
                  Consult Directly with Strategists
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Sticky Bottom CTA Banner */}
      <AnimatePresence>
        {showBottomCTA && (
          <motion.div
            id="bottom-sticky-cta"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-0 inset-x-0 z-40 bg-neutral-950/98 backdrop-blur-2xl border-t border-white/15 px-6 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-5 md:px-12 shadow-[0_-15px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Indicator dot */}
              <div className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fcbf4a] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fcbf4a]"></span>
              </div>
              <p className="text-zinc-100 text-sm sm:text-base font-semibold tracking-tight">
                Ready for high-quality engineering & marketing? <span className="text-[#fcbf4a] font-black pb-0.5 border-b border-[#fcbf4a]/30">Secure your tailored roadmap today.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#fcbf4a] to-[#f3a91e] hover:from-[#fcbf4a] hover:to-[#fcbf4a] text-black font-sans font-black text-[11px] uppercase tracking-widest rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Get my free proposal</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>

              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-black text-[11px] uppercase tracking-widest rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                <span>Connect on WhatsApp</span>
              </a>

              <button
                onClick={() => setShowBottomCTA(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                aria-label="Dismiss CTA"
              >
                <X className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-20 w-full bg-[#030303] border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <span className="font-mono tracking-widest text-[10px] uppercase text-white/30">DIGIYOG GLOBAL MEDIA HUB</span>
          <span className="text-right">© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
        </div>
      </footer>

    </div>
  );
}
