import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useRef, useState } from "react";

const projects = [
  {
    title: "Launch an Instagram account for a beauty studio from scratch.",
    desc: "3,100 subscribers in the first 2 weeks, recording for 2 weeks ahead.",
    img: "https://picsum.photos/seed/beauty/600/800"
  },
  {
    title: "Rebranding and web design for a local coffee shop.",
    desc: "Increased foot traffic by 40% and online orders by 150%.",
    img: "https://picsum.photos/seed/coffee/600/800"
  },
  {
    title: "E-commerce platform for a fashion boutique.",
    desc: "Conversion rate optimization leading to $100k+ monthly revenue.",
    img: "https://picsum.photos/seed/fashion/600/800"
  },
  {
    title: "Fitness app UI/UX design and user research.",
    desc: "10k+ downloads in the first month with a 4.9 star rating.",
    img: "https://picsum.photos/seed/fitness/600/800"
  },
  {
    title: "Corporate identity for a tech startup.",
    desc: "Secured $2M in seed funding with the new pitch deck and branding.",
    img: "https://picsum.photos/seed/tech/600/800"
  }
];

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(2);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress || 0);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden pt-24 pb-24" ref={containerRef}>
      {/* 1. Global Backgrounds */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        {/* Pink glow in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-brand-pink/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Hero Background (Full Width) */}
      <div 
        className="absolute top-0 left-0 right-0 h-[150vh] pointer-events-none"
        style={{ 
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
        }}
      >
        {/* Local crowd image */}
        <img 
          src="/people.png" 
          alt="Crowd" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-50 mix-blend-screen"
          referrerPolicy="no-referrer"
        />
        {/* Pink tint overlay */}
        <div className="absolute inset-0 bg-brand-pink/10 mix-blend-color"></div>
        {/* Glow behind the crowd */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-brand-pink/20 blur-[150px]"></div>
      </div>

      {/* 2. Big vertical card for scenes */}
      <div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8">
        {/* The Card Outline */}
        <div className="w-full border border-brand-pink/50 rounded-[2.5rem] md:rounded-[4rem] relative flex flex-col overflow-hidden">
          
          {/* Continuous Card Background (Flows through all scenes) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] bg-brand-pink/5 blur-[120px] rounded-full"></div>
            <div className="absolute top-[50%] right-[-10%] w-[40vw] h-[40vw] bg-brand-pink/5 blur-[120px] rounded-full"></div>
            <div className="absolute top-[80%] left-[20%] w-[60vw] h-[60vw] bg-brand-pink/5 blur-[120px] rounded-full"></div>
          </div>

          {/* SCENE 1: Hero */}
          <div className="relative w-full flex flex-col p-8 md:p-16 lg:p-24">
            
            {/* Scene 1 Content */}
            <div className="relative z-20 flex-1 flex flex-col">
              
              {/* Top Section: Title and Cards */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mt-12 relative">
                
                {/* Background Text behind cards */}
                <div className="absolute right-[-5%] top-[-5%] -z-10 flex flex-col items-end pointer-events-none select-none">
                  {/* Deep pink glow behind the text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-brand-pink/20 blur-[120px] rounded-full z-[-1]"></div>
                  
                  {/* Solid, softly blurred text integrated into background */}
                  <div className="flex flex-col items-end">
                    <div className="text-[6rem] md:text-[9rem] xl:text-[7rem] font-display font-black leading-[0.75] text-brand-pink opacity-20 blur-[6px]">AKSTUDIO</div>
                    <div className="text-[6rem] md:text-[9rem] xl:text-[7rem] font-display font-black leading-[0.75] text-brand-pink opacity-40 blur-[3px]">AKSTUDIO</div>
                    <div className="text-[6rem] md:text-[9rem] xl:text-[7rem] font-display font-black leading-[0.75] text-brand-pink opacity-20 blur-[6px] scale-y-[-1]">AKSTUDIO</div>
                  </div>
                </div>

                {/* Left: Title & Button */}
                <div className="flex flex-col items-start">
                  <h2 className="text-6xl md:text-8xl lg:text-[9rem] font-display font-black leading-[0.85] tracking-tighter">
                    <span className="block text-white">Design</span>
                    <span className="block text-brand-pink">AK</span>
                    <span className="block text-white">STUDIO</span>
                  </h2>
                  
                  <p className="mt-8 text-white/60 max-w-xs text-sm md:text-base">
                    We are a team of design experts helping businesses grow through visual identity.
                  </p>
                  
                  <button className="mt-8 bg-brand-pink text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-2 uppercase tracking-wider text-sm">
                    Консультация
                  </button>
                </div>

                {/* Right: Info Cards */}
                <div className="flex flex-col sm:flex-row gap-6 lg:mt-12">
                  {/* White Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white text-black p-8 rounded-[2rem] w-full sm:w-[240px] flex flex-col justify-between aspect-square shadow-2xl"
                  >
                    <div>
                      <h3 className="text-4xl font-bold mb-2">$60k+</h3>
                      <p className="text-black/60 text-xs leading-relaxed">we manage the advertising budget every month</p>
                    </div>
                    <div className="w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center text-white self-end">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.div>

                  {/* Liquid Glass Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative w-full sm:w-[240px] lg:translate-y-12"
                  >
                    {/* Matte blur underlay */}
                    <div className="absolute inset-0 bg-black/60 blur-[30px] rounded-[2rem] z-0 translate-y-2 scale-95"></div>
                    
                    <div className="relative z-10 bg-white/5 backdrop-blur-3xl border border-white/10 text-white p-8 rounded-[2rem] w-full flex flex-col justify-between aspect-square shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
                      {/* Grain overlay for matte effect */}
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay pointer-events-none"></div>
                      
                      <div className="relative z-10">
                        <h3 className="text-4xl font-bold mb-2">1.3k+</h3>
                        <p className="text-white/60 text-xs leading-relaxed">we create unique posts and creatives every month for growing brands</p>
                      </div>
                      <div className="relative z-10 w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center text-white self-end">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Section: Big Text */}
              <div className="pt-32 pb-12 flex justify-end">
                <div className="max-w-4xl text-right">
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter">
                    <span className="block text-white">мы превращаем</span>
                    <span className="block text-brand-pink">подписчиков</span>
                    <span className="block text-white">в клиентов</span>
                  </h2>
                  <p className="mt-6 text-white/60 max-w-sm ml-auto text-sm md:text-base text-right">
                    Our approach is based on analytics, creativity and effective marketing strategies.
                  </p>
                </div>
              </div>

            </div>
          </div>
          
          {/* SCENE 2: Services & Impact */}
          <div className="relative w-full flex flex-col p-8 md:p-16 lg:p-24 pt-0">
            {/* Top Section: "we are next-gen..." */}
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-12">
                <span className="text-white">we are </span>
                <span className="text-brand-pink">next-gen</span>
                <br />
                <span className="text-white">design company</span>
              </h2>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {/* Card 1 */}
                <div className="bg-white text-black p-8 rounded-3xl lg:rounded-l-[4rem] lg:rounded-r-2xl flex flex-col items-start text-left h-[280px]">
                  <h3 className="text-2xl font-bold mb-4 leading-tight">UI/UX<br/>Design</h3>
                  <p className="text-black/60 text-sm">User research, wireframing, prototyping, and high-fidelity interface design.</p>
                </div>
                {/* Card 2 (Pink) */}
                <div className="bg-brand-pink text-white p-8 rounded-3xl lg:rounded-2xl flex flex-col items-start text-left h-[280px] relative overflow-hidden">
                  <h3 className="text-2xl font-bold mb-4 leading-tight relative z-10">Brand<br/>Identity</h3>
                  <p className="text-white/80 text-sm relative z-10">Logo design, brand guidelines, typography, and visual language.</p>
                </div>
                {/* Card 3 */}
                <div className="bg-white text-black p-8 rounded-3xl lg:rounded-2xl flex flex-col items-start text-left h-[280px]">
                  <h3 className="text-2xl font-bold mb-4 leading-tight">Web<br/>Development</h3>
                  <p className="text-black/60 text-sm">Front-end development, animations, responsive design, and CMS integration.</p>
                </div>
                {/* Card 4 */}
                <div className="bg-white text-black p-8 rounded-3xl lg:rounded-r-[4rem] lg:rounded-l-2xl flex flex-col items-start text-left h-[280px]">
                  <h3 className="text-2xl font-bold mb-4 leading-tight">Motion<br/>Graphics</h3>
                  <p className="text-black/60 text-sm">2D/3D animations, promotional videos, and interactive web elements.</p>
                </div>
              </div>
            </div>

            {/* Bottom Section: "data that proves our impact" */}
            <div className="flex flex-col lg:flex-row items-start justify-between gap-16 mt-24">
              {/* Left: Text & Tags */}
              <div className="flex-1 max-w-xl">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-10">
                  <span className="block text-white">data that</span>
                  <span className="block text-white">proves</span>
                  <span className="block text-brand-pink">our impact</span>
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-white/20 rounded-full py-3 px-6 text-center text-xs font-bold tracking-wider uppercase text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-pointer">UI/UX Design</div>
                  <div className="border border-white/20 rounded-full py-3 px-6 text-center text-xs font-bold tracking-wider uppercase text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-pointer">Brand Identity</div>
                  <div className="bg-brand-pink rounded-full py-3 px-6 text-center text-xs font-bold tracking-wider uppercase text-white cursor-pointer">Web Dev</div>
                  <div className="border border-white/20 rounded-full py-3 px-6 text-center text-xs font-bold tracking-wider uppercase text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-pointer">Motion Graphics</div>
                </div>
              </div>

              {/* Right: Scrolling Cards */}
              <div className="flex-1 w-full overflow-hidden relative">
                <div 
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  className={`flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {/* Card 1 */}
                  <div className="min-w-[260px] bg-white text-black p-8 rounded-[2rem] snap-start flex-shrink-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Our key results</h3>
                      <p className="text-black/60 text-xs mb-6 leading-relaxed">
                        Targeted design campaigns that reach the right audience at the right time.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-brand-pink text-3xl font-bold mb-1">3x</div>
                          <div className="text-[10px] font-bold leading-tight">better conversion</div>
                        </div>
                        <div>
                          <div className="text-brand-pink text-3xl font-bold mb-1">+65%</div>
                          <div className="text-[10px] font-bold leading-tight">ROI improvement</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="min-w-[260px] bg-white text-black p-8 rounded-[2rem] snap-start flex-shrink-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Budget in 2024</h3>
                      <p className="text-black/60 text-xs leading-relaxed">
                        Strategically allocated to reach the target audience and drive conversions.
                      </p>
                    </div>
                    <div className="text-brand-pink text-5xl font-display font-black mt-8">$613k</div>
                  </div>

                  {/* Card 3 */}
                  <div className="min-w-[260px] bg-white text-black p-8 rounded-[2rem] snap-start flex-shrink-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Satisfaction</h3>
                      <p className="text-black/60 text-xs leading-relaxed">
                        Based on post-project surveys across all our enterprise clients.
                      </p>
                    </div>
                    <div className="text-brand-pink text-5xl font-display font-black mt-8">98%</div>
                  </div>

                  {/* Card 4 */}
                  <div className="min-w-[260px] bg-white text-black p-8 rounded-[2rem] snap-start flex-shrink-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Projects Delivered</h3>
                      <p className="text-black/60 text-xs leading-relaxed">
                        Successfully launched digital products, brands, and marketing campaigns.
                      </p>
                    </div>
                    <div className="text-brand-pink text-5xl font-display font-black mt-8">150+</div>
                  </div>

                  {/* Card 5 */}
                  <div className="min-w-[260px] bg-white text-black p-8 rounded-[2rem] snap-start flex-shrink-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Global Reach</h3>
                      <p className="text-black/60 text-xs leading-relaxed">
                        Working with clients and partners across multiple continents and timezones.
                      </p>
                    </div>
                    <div className="text-brand-pink text-5xl font-display font-black mt-8">24</div>
                  </div>

                  {/* Card 6 */}
                  <div className="min-w-[260px] bg-white text-black p-8 rounded-[2rem] snap-start flex-shrink-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Awards Won</h3>
                      <p className="text-black/60 text-xs leading-relaxed">
                        Recognized by Awwwards, CSS Design Awards, and other industry leaders.
                      </p>
                    </div>
                    <div className="text-brand-pink text-5xl font-display font-black mt-8">12</div>
                  </div>
                </div>
                
                {/* Custom Scrollbar / Roller */}
                <div className="w-full h-1 bg-white/10 rounded-full mt-4 relative overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full w-1/3 bg-brand-pink rounded-full transition-all duration-150 ease-out"
                    style={{ transform: `translateX(${scrollProgress * 200}%)` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* SCENE 3: Who our services are for */}
          <div className="relative w-full flex flex-col p-8 md:p-16 lg:p-24 pt-32">
            
            {/* Background Typography */}
            <div className="absolute top-[20%] -z-10 flex flex-col items-end pointer-events-none select-none opacity-30">
              <div className="text-[8rem] md:text-[9rem] xl:text-[14rem] font-display font-black leading-[0.75] text-brand-pink blur-[10px]">AKSTUDIO</div>
              <div className="text-[8rem] md:text-[9rem] xl:text-[14rem] font-display font-black leading-[0.75] text-brand-pink blur-[16px]">DESIGN</div>
              <div className="text-[8rem] md:text-[9rem] xl:text-[14rem] font-display font-black leading-[0.75] text-brand-pink blur-[10px]">AGENCY</div>
            </div>

            {/* Header */}
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter">
                <span className="block text-white">who our</span>
                <span className="block text-white">services</span>
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-white/80 max-w-sm leading-tight mb-2">
                / are the perfect<br/>solution for
              </h3>
            </div>

            {/* Cards Zig-Zag Layout */}
            <div className="relative z-10 w-full max-w-6xl mx-auto">
              
              {/* Desktop Grid Layout */}
              <div className="hidden md:grid grid-cols-12 gap-x-6 gap-y-8 relative">
                {/* Row 1 */}
                <div className="col-start-4 col-span-3 aspect-square bg-white rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl z-10">
                  <div className="text-brand-pink text-5xl font-display font-medium">01</div>
                  <div className="text-black font-bold text-xl leading-tight">Small and Medium-<br/>Sized Businesses</div>
                </div>
                <div className="col-start-7 col-span-5 rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl z-10 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-pink via-[#ff0055] to-[#cc0044] z-0"></div>
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 blur-2xl rounded-full z-0"></div>
                  <div className="absolute bottom-0 right-0 w-60 h-60 bg-black/20 blur-3xl rounded-full z-0"></div>
                  <div className="relative z-10 flex justify-between items-start h-full">
                    <div className="text-white text-5xl font-display font-medium">02</div>
                    <div className="text-white/90 text-xs max-w-[220px] leading-relaxed text-right">
                      High-level targeted advertising attracts students and clients seeking professional education or consulting, increasing sign-ups and inquiries.
                    </div>
                  </div>
                  <div className="relative z-10 text-white font-bold text-xl leading-tight mt-auto">Educational and<br/>Consulting<br/>Services</div>
                </div>

                {/* Row 2 */}
                <div className="col-start-2 col-span-3 aspect-square rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl z-10 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff0055] to-brand-pink z-0"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black/10 blur-2xl rounded-full z-0"></div>
                  <div className="relative z-10 text-white text-5xl font-display font-medium">03</div>
                  <div className="relative z-10 text-white font-bold text-xl leading-tight">Marketing<br/>Agencies</div>
                </div>
                <div className="col-start-6 col-span-3 aspect-square bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl z-10">
                  <div className="text-brand-pink text-5xl font-display font-medium">04</div>
                  <div className="text-white font-bold text-xl leading-tight">E-commerce<br/>Stores</div>
                </div>

                {/* Row 3 */}
                <div className="col-start-4 col-span-3 aspect-square bg-white rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl z-10">
                  <div className="text-brand-pink text-5xl font-display font-medium">05</div>
                  <div className="text-black font-bold text-xl leading-tight">Corporate<br/>Clients</div>
                </div>
                <div className="col-start-8 col-span-3 aspect-square bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl z-10">
                  <div className="text-brand-pink text-5xl font-display font-medium">06</div>
                  <div className="text-white font-bold text-xl leading-tight">Startups</div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="flex flex-col gap-6 md:hidden">
                {/* Card 1 */}
                <div className="w-full aspect-square bg-white rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl">
                  <div className="text-brand-pink text-5xl font-display font-medium">01</div>
                  <div className="text-black font-bold text-xl leading-tight">Small and Medium-<br/>Sized Businesses</div>
                </div>
                {/* Card 2 */}
                <div className="w-full rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl relative min-h-[250px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-pink via-[#ff0055] to-[#cc0044] z-0"></div>
                  <div className="relative z-10 flex justify-between items-start mb-8">
                    <div className="text-white text-5xl font-display font-medium">02</div>
                  </div>
                  <div className="relative z-10 text-white/90 text-xs mb-4 leading-relaxed">
                      High-level targeted advertising attracts students and clients seeking professional education or consulting, increasing sign-ups and inquiries.
                  </div>
                  <div className="relative z-10 text-white font-bold text-xl leading-tight">Educational and<br/>Consulting<br/>Services</div>
                </div>
                {/* Card 3 */}
                <div className="w-full aspect-square rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff0055] to-brand-pink z-0"></div>
                  <div className="relative z-10 text-white text-5xl font-display font-medium">03</div>
                  <div className="relative z-10 text-white font-bold text-xl leading-tight">Marketing<br/>Agencies</div>
                </div>
                {/* Card 4 */}
                <div className="w-full aspect-square bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl">
                  <div className="text-brand-pink text-5xl font-display font-medium">04</div>
                  <div className="text-white font-bold text-xl leading-tight">E-commerce<br/>Stores</div>
                </div>
                {/* Card 5 */}
                <div className="w-full aspect-square bg-white rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl">
                  <div className="text-brand-pink text-5xl font-display font-medium">05</div>
                  <div className="text-black font-bold text-xl leading-tight">Corporate<br/>Clients</div>
                </div>
                {/* Card 6 */}
                <div className="w-full aspect-square bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl">
                  <div className="text-brand-pink text-5xl font-display font-medium">06</div>
                  <div className="text-white font-bold text-xl leading-tight">Startups</div>
                </div>
              </div>

            </div>
          </div>
          
          {/* SCENE 4: Our work speaks for us */}
          <div className="relative w-full flex flex-col p-8 md:p-16 lg:p-24 pt-32 overflow-hidden">
            
            {/* Background Typography */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex flex-col items-center pointer-events-none select-none opacity-20 w-full">
              <div className="text-[10rem] md:text-[13rem] xl:text-[15rem] font-display font-black leading-[0.75] text-brand-pink blur-[12px] whitespace-nowrap">AKSTUDIO</div>
            </div>

            {/* Header */}
            <div className="relative z-10 flex flex-col items-center justify-center mb-10 text-center">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter">
                <span className="block text-white">our work</span>
                <span className="block">
                  <span className="text-brand-pink">speaks </span>
                  <span className="text-white">for us</span>
                </span>
              </h2>
            </div>

            {/* 3D Carousel */}
            <div className="relative z-10 h-[600px] md:h-[700px] w-full flex items-center justify-center mt-10" style={{ perspective: "1200px" }}>
              {projects.map((p, i) => {
                const offset = i - activeIndex;
                const isCenter = offset === 0;
                const absOffset = Math.abs(offset);
                
                return (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-[300px] md:w-[400px] h-[460px] md:h-[560px] rounded-[2rem] cursor-pointer bg-[#050505] shadow-2xl"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{
                      x: `calc(-50% + ${offset * 200}px)`,
                      y: "-50%",
                      scale: 1 - absOffset * 0.15,
                      rotateY: -offset * 25,
                      zIndex: 10 - absOffset,
                      opacity: absOffset > 2 ? 0 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    onClick={() => setActiveIndex(i)}
                  >
                    {/* The Pink Background & Text */}
                    <motion.div 
                      className="absolute inset-0 bg-brand-pink p-6 flex flex-col justify-end rounded-[2rem]"
                      initial={false}
                      animate={{ opacity: isCenter ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                       <motion.div
                         initial={false}
                         animate={{ opacity: isCenter ? 1 : 0, y: isCenter ? 0 : 10 }}
                         transition={{ duration: 0.4, delay: isCenter ? 0.1 : 0 }}
                       >
                         <h4 className="text-white font-bold text-xl md:text-2xl leading-tight mb-3">{p.title}</h4>
                         <p className="text-white/90 text-xs md:text-sm mb-6">{p.desc}</p>
                       </motion.div>
                       
                       {/* Arrow Button overlapping bottom edge */}
                       <motion.div 
                         className="absolute -bottom-6 left-8 w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-xl"
                         initial={false}
                         animate={{ opacity: isCenter ? 1 : 0, scale: isCenter ? 1 : 0.5 }}
                         transition={{ duration: 0.4, delay: isCenter ? 0.2 : 0 }}
                       >
                         <ArrowRight size={24} className="-rotate-45" />
                       </motion.div>
                    </motion.div>

                    {/* The Image */}
                    <motion.div
                      className="absolute overflow-hidden rounded-[2rem] z-10"
                      initial={false}
                      animate={{
                        top: isCenter ? 16 : 0,
                        left: isCenter ? 16 : 0,
                        right: isCenter ? 16 : 0,
                        bottom: isCenter ? "52%" : 0,
                        opacity: isCenter ? 1 : 0.4,
                      }}
                      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    >
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover grayscale" />
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>

            {/* Pagination Dots */}
            <div className="relative z-10 flex items-center justify-center gap-2 mt-16">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-brand-pink' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

          </div>
          
          {/* SCENE 5: Creatives that work for you */}
          <div className="relative w-full flex flex-col p-8 md:p-16 lg:p-24 pt-32 overflow-hidden">
            
            {/* Background Typography */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex flex-col items-center pointer-events-none select-none opacity-10 w-full">
              <div className="text-[8rem] md:text-[12rem] xl:text-[14rem] font-display font-black leading-[0.75] text-brand-pink blur-[12px] whitespace-nowrap">CREATIVES</div>
            </div>

            {/* Header: Title and Button */}
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16 w-full">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter">
                <span className="block">
                  <span className="text-white">creatives </span>
                  <span className="text-brand-pink">that</span>
                </span>
                <span className="block">
                  <span className="text-brand-pink">work </span>
                  <span className="text-white">for you</span>
                </span>
              </h2>
              
              <button className="bg-white text-black font-bold py-4 px-10 rounded-full hover:bg-brand-pink hover:text-white transition-colors duration-300 uppercase tracking-wider text-sm shadow-xl shrink-0">
                Consultation
              </button>
            </div>

            {/* Video Container */}
            <div className="relative z-10 w-full max-w-[1200px] mx-auto mt-16 md:mt-24 flex justify-center mix-blend-screen">
              <video 
                src="/mockups.webm" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-auto object-contain transform scale-110 md:scale-125"
              />
            </div>
            
          </div>
          <div className="py-32 flex items-center justify-center">
            <h2 className="text-6xl font-display font-bold text-white/20">scene6</h2>
          </div>
          <div className="py-32 flex items-center justify-center">
            <h2 className="text-6xl font-display font-bold text-white/20">scene7</h2>
          </div>

        </div>
      </div>
    </div>
  );
}
