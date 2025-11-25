'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      switch (e.key.toLowerCase()) {
        case 'f':
          e.preventDefault();
          document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'p':
          e.preventDefault();
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'q':
          e.preventDefault();
          document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 't':
          e.preventDefault();
          window.open('https://t.me/electra_nft_bot', '_blank');
          break;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a12] text-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Marquee */}
      <StatsMarquee />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* How It Works */}
      <HowItWorksSection />
      
      {/* Pricing Section */}
      <PricingSection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Footer */}
      <Footer />
      
      {/* Cursor glow effect */}
      <div 
        className="fixed pointer-events-none w-[500px] h-[500px] rounded-full opacity-15 blur-[120px] transition-transform duration-100"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)',
          left: mousePos.x - 250,
          top: mousePos.y - 250,
        }}
      />
    </main>
  );
}

function TelegramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

function XIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function Navigation() {
  const [activeSection, setActiveSection] = useState<string>('');
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'pricing', 'faq'];
      const scrollPosition = window.scrollY + 150;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }
      
      // If we're at the very top, no section is active
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a12]/95 backdrop-blur-sm border-b border-[#2a2a40]">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <a href="#" className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-primary)' }}>
            Electra
          </a>
          
          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-0">
            <NavLink label="FEATURES" shortcut="F" href="#features" isActive={activeSection === 'features'} />
            <NavLink label="PRICING" shortcut="P" href="#pricing" isActive={activeSection === 'pricing'} />
            <NavLink label="FAQ" shortcut="Q" href="#faq" isActive={activeSection === 'faq'} />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#666] hidden sm:block font-mono">[T] TELEGRAM</span>
          <a 
            href="https://t.me/electra_nft_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3b82f6]/80 backdrop-blur-md text-white px-4 py-2 text-sm font-bold hover:bg-[#3b82f6] transition-all flex items-center gap-2 rounded border border-[#3b82f6]/50 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
          >
            <TelegramIcon className="w-4 h-4" />
            ADD BOT →
          </a>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ label, shortcut, href, isActive }: { label: string; shortcut: string; href: string; isActive: boolean }) {
  return (
    <a 
      href={href} 
      className={`relative px-4 py-2 text-sm font-mono transition-all duration-200 flex items-center gap-1.5 group
        ${isActive 
          ? 'text-white' 
          : 'text-[#8b8b9e] hover:text-white'
        }`}
    >
      <span className={`transition-colors ${isActive ? 'text-[#3b82f6]' : 'text-[#555] group-hover:text-[#3b82f6]'}`}>
        [{shortcut}]
      </span>
      <span>{label}</span>
      {/* Active indicator bar */}
      <span 
        className={`absolute bottom-0 left-4 right-4 h-0.5 bg-[#3b82f6] transition-all duration-200
          ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
        `}
      />
    </a>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6">
      {/* Grid markers */}
      <GridMarkers />
      
      {/* Gradient orb background */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#3b82f6] opacity-5 blur-[150px] rounded-full" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left side - Text content */}
          <div className="relative z-10">
            {/* Built on Base badge - glassmorphism style */}
            <div className="inline-flex items-center gap-2 mb-8 text-[10px] text-[#8b8b9e] px-3 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded font-mono tracking-wider">
              [ BUILT ON BASE ]
            </div>
            
            {/* Main headline */}
            <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] mb-6 font-bold">
              <span className="block">Boost Engagement</span>
              <span className="block">in Your <span className="text-[#3b82f6]">NFT</span></span>
              <span className="block">Community with</span>
              <span className="block">Real-Time Alerts</span>
            </h1>
            
            {/* Subheadline - monospace style */}
            <p className="text-lg md:text-xl text-[#8b8b9e] leading-relaxed mb-10 max-w-lg" style={{ fontFamily: 'var(--font-mono)' }}>
              Instant buy alerts, sweep tracking, and engagement-driven features designed to keep your community active and excited.
            </p>
            
            {/* CTA button - glassmorphism style */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://t.me/electra_nft_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#3b82f6]/80 backdrop-blur-md text-white px-8 py-4 text-lg font-bold hover:bg-[#3b82f6] transition-all flex items-center gap-3 rounded-lg border border-[#3b82f6]/50 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
              >
                <TelegramIcon className="w-6 h-6" />
                Add to Telegram
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
          
          {/* Right side - Image carousel */}
          <div className="relative flex justify-center lg:justify-end">
            <HeroImageCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const images = [
    '/hero-slider/cicE4hDWZb33GQFDIfyut4F4QJQ.png.webp',
    '/hero-slider/eKFjpPQLKwuhHSD2N2lG9Jh8M.png.webp',
    '/hero-slider/QX4zXoQFk9GlbfQoQ08gMIQbo.png.webp',
  ];
  
  // Create extended array for infinite effect: [last, ...images, first]
  const extendedImages = [images[images.length - 1], ...images, images[0]];
  const [position, setPosition] = useState(1); // Start at first real image
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setPosition((prev) => prev + 1);
    }, 1600);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle infinite loop reset
  useEffect(() => {
    if (position === extendedImages.length - 1) {
      // We've reached the clone of first image, jump back instantly
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setPosition(1);
      }, 500);
      return () => clearTimeout(timeout);
    }
    // Update the visual indicator index
    setCurrentIndex((position - 1 + images.length) % images.length);
  }, [position, extendedImages.length, images.length]);
  
  return (
    <div className="relative w-[300px] h-[440px] sm:w-[340px] sm:h-[500px] md:w-[380px] md:h-[560px] lg:w-[420px] lg:h-[600px]">
      {/* Decorative frame */}
      <div className="absolute inset-0 border-2 border-[#2a2a40] rounded-2xl bg-[#12121c] overflow-hidden">
        {/* Carousel images - infinite vertical slide */}
        <div 
          className={`relative w-full ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{
            height: `${extendedImages.length * 100}%`,
            transform: `translateY(-${position * (100 / extendedImages.length)}%)`,
          }}
        >
          {extendedImages.map((src, i) => (
            <div 
              key={i} 
              className="relative w-full"
              style={{ height: `${100 / extendedImages.length}%` }}
            >
              <Image 
                src={src}
                alt={`NFT Alert Preview`}
                fill
                className="object-cover object-center"
                priority={i <= 2}
              />
            </div>
          ))}
        </div>
        
        {/* Vertical carousel indicators - right side */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsTransitioning(true);
                setPosition(i + 1);
              }}
              className={`w-2 rounded-full transition-all ${
                i === currentIndex 
                  ? 'bg-[#3b82f6] h-6' 
                  : 'bg-[#2a2a40] h-2 hover:bg-[#3b82f6]/50'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 border border-[#3b82f6] rounded-lg opacity-50" />
      <div className="absolute -bottom-4 -left-4 w-8 h-8 border border-[#3b82f6] rounded-lg opacity-50" />
      
      {/* Glow effect behind carousel */}
      <div className="absolute inset-0 bg-[#3b82f6] opacity-10 blur-[80px] rounded-full -z-10" />
    </div>
  );
}

function GridMarkers() {
  return (
    <>
      <span className="grid-marker top-24 left-6">+</span>
      <span className="grid-marker top-24 left-1/3">+</span>
      <span className="grid-marker top-24 left-2/3">+</span>
      <span className="grid-marker top-24 right-6">+</span>
      <span className="grid-marker top-1/2 left-6">+</span>
      <span className="grid-marker top-1/2 right-6">+</span>
      <span className="grid-marker bottom-20 left-6">+</span>
      <span className="grid-marker bottom-20 left-1/3">+</span>
      <span className="grid-marker bottom-20 left-2/3">+</span>
      <span className="grid-marker bottom-20 right-6">+</span>
    </>
  );
}


function StatsMarquee() {
  const stats = [
    { label: 'Sales notifications:', value: '10K+' },
    { label: 'Collections tracked:', value: '10+' },
    { label: 'Built on:', value: 'Base' },
    { label: 'Avg latency:', value: '<2s' },
  ];
  
  return (
    <section className="bg-[#12121c] border-y border-[#2a2a40] py-6 overflow-hidden">
      <div className="flex animate-marquee">
        {[...stats, ...stats, ...stats].map((stat, i) => (
          <div key={i} className="flex items-center gap-2 mx-8 whitespace-nowrap">
            <span className="text-[#666]">{stat.label}</span>
            <span className="text-[#3b82f6] font-bold text-xl">{stat.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-[#0a0a12]">
      <div className="max-w-6xl mx-auto">
        {/* Section header - left aligned like pricing */}
        <div className="mb-16">
          <span className="text-sm text-[#666] tracking-widest">/ FEATURES</span>
          <div className="h-px bg-[#2a2a40] mt-4" />
        </div>
        
        <h2 className="text-5xl md:text-6xl mb-4" style={{ fontFamily: 'var(--font-primary)' }}>Get Connected Fast</h2>
        <p className="text-[#8b8b9e] text-xl mb-16 max-w-2xl">
          Supports high-volume projects with robust real-time monitoring.
        </p>
        
        {/* 3 cards: 2 left, 1 right */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Left column - 2 stacked cards */}
          <div className="flex flex-col gap-5">
            {/* Simple to use - with phone mockup */}
            <div className="group rounded-3xl pt-8 pl-8 pr-8 pb-0 bg-[#f0f4f8] text-[#0a0a12] transition-all duration-300 overflow-hidden flex-1 flex flex-col">
              <div className="flex gap-6 flex-1">
                <div className="flex-1 flex flex-col justify-center pb-8">
                  <h3 className="text-4xl font-semibold mb-4" style={{ fontFamily: 'var(--font-primary)' }}>Simple to use</h3>
                  <p className="text-[#64748b] text-base leading-relaxed">
                    Get started in minutes —just add the bot, and it handles everything automatically.
                  </p>
                </div>
                <div className="w-48 min-h-[320px] relative flex-shrink-0 self-end">
                  <Image 
                    src="/grid-section/xWRng9Enh0RInyhBUCbdk2adbaM.png.webp"
                    alt="Phone mockup"
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </div>
            
            {/* Built For Base - with Base logo */}
            <div className="group rounded-3xl p-8 bg-[#0052FF] text-white transition-all duration-300">
              <div className="flex gap-6 items-center">
                <div className="w-32 h-32 relative flex-shrink-0 bg-white/10 rounded-2xl p-4">
                  <Image 
                    src="/grid-section/Base_square_white.png"
                    alt="Base Logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-semibold mb-3" style={{ fontFamily: 'var(--font-primary)' }}>Built For Base</h3>
                  <p className="text-white/80 text-base leading-relaxed">
                    We built this tool to track <strong className="text-white">Base NFT collections</strong>, ensuring accurate and real-time insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Sweep Alert + Spot big buys as one tall card */}
          <div className="group rounded-3xl bg-[#f0f4f8] border-2 border-[#3b82f6] text-[#0a0a12] transition-all duration-300 flex flex-col overflow-hidden">
            {/* Sweep Alert Image - top section */}
            <div className="relative h-[420px] overflow-hidden">
              <Image 
                src="/grid-section/aDaxIyQIDp4n47mpPNSiyoRo8.png.webp"
                alt="Sweep Alert"
                fill
                className="object-contain object-top"
              />
            </div>
            
            {/* Spot big buys - bottom section */}
            <div className="p-8 bg-[#f0f4f8]">
              <div className="flex gap-6 items-start">
                <h3 className="text-3xl font-semibold leading-tight flex-shrink-0" style={{ fontFamily: 'var(--font-primary)' }}>
                  Spot big buys<br />& engage users
                </h3>
                <p className="text-[#64748b] text-base leading-relaxed">
                  Spark discussions around notable buys and market activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Add the Bot', desc: 'Invite Electra to your Telegram group with one click' },
    { num: '02', title: 'Configure', desc: 'Set your Base NFT collection address and preferences' },
    { num: '03', title: 'Engage', desc: 'Watch as real-time alerts spark discussions' },
  ];
  
  return (
    <section className="py-24 px-6 bg-[#12121c] border-y border-[#2a2a40]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="text-sm text-[#666] tracking-widest">/ HOW IT WORKS</span>
          <div className="h-px bg-[#2a2a40] mt-4" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.num} className="relative">
              <span className="text-[8rem] font-bold text-[#1a1a2e] absolute -top-8 -left-4 leading-none">
                {step.num}
              </span>
              <div className="relative z-10 pt-20">
                <h3 className="text-2xl mb-4 text-[#3b82f6]" style={{ fontFamily: 'var(--font-primary)' }}>{step.title}</h3>
                <p className="text-[#8b8b9e]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'quarterly' | 'annual'>('annual');
  
  const pricingData = {
    monthly: { price: 40, period: '/month', perMonth: 40 },
    quarterly: { price: 100, period: '/quarter', perMonth: 33.33 },
    annual: { price: 300, period: '/year', perMonth: 25 },
  };
  
  const currentPlan = pricingData[billingPeriod];
  const savings = billingPeriod === 'annual' 
    ? Math.round((1 - (pricingData.annual.perMonth / pricingData.monthly.perMonth)) * 100)
    : billingPeriod === 'quarterly'
    ? Math.round((1 - (pricingData.quarterly.perMonth / pricingData.monthly.perMonth)) * 100)
    : 0;
  
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="text-sm text-[#666] tracking-widest">/ PRICING</span>
          <div className="h-px bg-[#2a2a40] mt-4" />
        </div>
        
        <h2 className="text-5xl md:text-6xl mb-4" style={{ fontFamily: 'var(--font-primary)' }}>Get Started</h2>
        <p className="text-[#8b8b9e] text-xl mb-10 max-w-2xl">
          Choose a plan that fits your needs. No hidden fees—just real-time alerts and engagement-driving features for your community.
        </p>
        
        {/* Billing Period Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-[#12121c] border border-[#2a2a40] rounded-xl p-1.5">
            <BillingTab 
              label="Monthly" 
              isActive={billingPeriod === 'monthly'} 
              onClick={() => setBillingPeriod('monthly')} 
            />
            <BillingTab 
              label="Quarterly" 
              isActive={billingPeriod === 'quarterly'} 
              onClick={() => setBillingPeriod('quarterly')} 
            />
            <BillingTab 
              label="Annual" 
              isActive={billingPeriod === 'annual'} 
              onClick={() => setBillingPeriod('annual')}
              badge="Best Value"
            />
          </div>
        </div>
        
        {/* Single Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className={`p-8 bg-[#12121c] relative rounded-2xl transition-all duration-300 ${
            billingPeriod === 'annual' 
              ? 'border-2 border-[#3b82f6]/50 shadow-[0_0_40px_rgba(59,130,246,0.15)]' 
              : 'border-2 border-[#2a2a40] hover:border-[#3b82f6]/30'
          }`}>
            {billingPeriod === 'annual' && (
              <div className="absolute -top-3 right-6 bg-[#3b82f6]/80 backdrop-blur-md text-white text-[10px] px-3 py-1 font-mono tracking-wider rounded border border-[#3b82f6]/50">
                [ BEST VALUE ]
              </div>
            )}
            <div className="flex justify-between items-start mb-6">
              <span className="fig-label">[ FIG. 6 ]</span>
            </div>
            <h3 className="text-2xl mb-2 capitalize" style={{ fontFamily: 'var(--font-primary)' }}>
              {billingPeriod} Plan
            </h3>
            <p className="text-sm text-[#666] mb-6">For communities looking to boost engagement with real-time insights.</p>
            
            <div className="mb-8">
              <span className="text-5xl font-bold">${currentPlan.price}</span>
              <span className="text-[#666] ml-2">USD</span>
              <span className="text-[#8b8b9e] text-sm ml-1">{currentPlan.period}</span>
              {savings > 0 && (
                <span className="text-[#22c55e] text-sm ml-3 bg-[#22c55e]/10 px-2 py-0.5 rounded">Save {savings}%</span>
              )}
            </div>
            
            {billingPeriod !== 'monthly' && (
              <div className="text-sm text-[#8b8b9e] mb-6 -mt-4">
                ~${currentPlan.perMonth.toFixed(2)}/month
              </div>
            )}
            
            <ul className="space-y-3 mb-8">
              <PricingFeature>Instant buy alerts for your Base NFT collection</PricingFeature>
              <PricingFeature>1 group chat integration</PricingFeature>
              <PricingFeature>1 NFT collection tracked</PricingFeature>
              <PricingFeature>Sweep alerts for multi-item buys</PricingFeature>
              <PricingFeature>Simple setup with admin controls</PricingFeature>
              <PricingFeature highlight={billingPeriod === 'annual'}>
                {billingPeriod === 'annual' ? 'Advanced Analytics' : 'Basic Support'}
              </PricingFeature>
            </ul>
            
            <a 
              href="https://t.me/electra_nft_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 font-bold transition-all flex items-center justify-center gap-2 rounded-lg bg-[#3b82f6]/80 backdrop-blur-md hover:bg-[#3b82f6] border border-[#3b82f6]/50 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
            >
              <TelegramIcon className="w-5 h-5" />
              Add to Telegram →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BillingTab({ 
  label, 
  isActive, 
  onClick, 
  badge 
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-[#3b82f6] text-white shadow-lg' 
          : 'text-[#8b8b9e] hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
      {badge && !isActive && (
        <span className="absolute -top-2 -right-2 bg-[#22c55e] text-[9px] text-white px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap">
          {badge}
        </span>
      )}
    </button>
  );
}

function PricingFeature({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <li className="flex items-center gap-3 text-sm">
      <span className={`${highlight ? 'text-[#3b82f6]' : 'text-[#3b82f6]'}`}>✓</span>
      <span className={highlight ? 'text-[#3b82f6]' : 'text-[#8b8b9e]'}>{children}</span>
    </li>
  );
}

function FAQSection() {
  const faqs = [
    { q: 'How does the Electra Tech NFT Buy Bot work?', a: 'Electra monitors your NFT collection on Base and sends instant notifications to your Telegram group whenever a purchase is made.' },
    { q: 'How do I set up the bot in my group?', a: 'Simply add the bot to your Telegram group, configure your collection address, and you\'re ready to go. Setup takes less than 2 minutes.' },
    { q: 'How do I renew my subscription?', a: 'You can renew your subscription anytime through our dashboard or by sending the renewal payment to your assigned wallet.' },
    { q: 'What happens if my subscription expires?', a: 'If your subscription expires, alerts will pause until renewed. Your configuration and history are saved for 30 days.' },
  ];
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  return (
    <section id="faq" className="py-24 px-6 bg-[#12121c] border-t border-[#2a2a40]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="text-sm text-[#666] tracking-widest">/ FAQ</span>
          <div className="h-px bg-[#2a2a40] mt-4" />
        </div>
        
        <h2 className="text-5xl md:text-6xl mb-16" style={{ fontFamily: 'var(--font-primary)' }}>
          Frequently Asked
          <br />
          <span className="text-[#3b82f6]">Questions</span>
        </h2>
        
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border-b border-[#2a2a40] py-6 cursor-pointer hover:bg-[#1a1a2e] px-4 -mx-4 transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold pr-8">{faq.q}</h3>
                <span className={`text-[#3b82f6] transition-transform text-xl ${openIndex === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </div>
              {openIndex === i && (
                <p className="mt-4 text-[#8b8b9e] text-sm leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0a0a12] border-t border-[#2a2a40] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="mb-6">
              <span className="text-2xl" style={{ fontFamily: 'var(--font-primary)' }}>Electra</span>
            </div>
            <p className="text-[#666] text-sm">
              Built to inform and engage.
              <br />
              Real-time NFT alerts for Base.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-[#3b82f6]">/ PRODUCT</h4>
            <ul className="space-y-2 text-sm text-[#666]">
              <li><a href="#features" className="hover:text-[#3b82f6] transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-[#3b82f6] transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-[#3b82f6] transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-[#3b82f6]">/ CONNECT</h4>
            <ul className="space-y-2 text-sm text-[#666]">
              <li>
                <a href="https://t.me/electra_nft_bot" target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2">
                  <TelegramIcon className="w-4 h-4" />
                  Telegram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3b82f6] transition-colors flex items-center gap-2">
                  <XIcon className="w-4 h-4" />
                  Twitter/X
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="h-px bg-[#2a2a40] mb-8" />
        
        <div className="text-sm text-[#666]">
          <div>© Electra 2025. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
