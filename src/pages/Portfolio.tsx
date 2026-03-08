import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState } from "react";
import { DNASpiral } from "../components/DNASpiral";
import { useLanguage } from "@/contexts/LanguageContext";

export function Portfolio() {
  const { t } = useLanguage();
  const projects = [
    {
      title: t('portfolio.projects.1.title'),
      desc: t('portfolio.projects.1.desc'),
      img: "https://picsum.photos/seed/beauty/600/800"
    },
    {
      title: t('portfolio.projects.2.title'),
      desc: t('portfolio.projects.2.desc'),
      img: "https://picsum.photos/seed/coffee/600/800"
    },
    {
      title: t('portfolio.projects.3.title'),
      desc: t('portfolio.projects.3.desc'),
      img: "https://picsum.photos/seed/fashion/600/800"
    },
    {
      title: t('portfolio.projects.4.title'),
      desc: t('portfolio.projects.4.desc'),
      img: "https://picsum.photos/seed/fitness/600/800"
    },
    {
      title: t('portfolio.projects.5.title'),
      desc: t('portfolio.projects.5.desc'),
      img: "https://picsum.photos/seed/tech/600/800"
    }
  ];

  const servicesList = [
    {
      category: t('portfolio.servicesList.category'),
      title: t('portfolio.servicesList.1.title'),
      image: "/design.png"
    },
    {
      category: t('portfolio.servicesList.category'),
      title: t('portfolio.servicesList.2.title'),
      image: "/web.png"
    },
    {
      category: t('portfolio.servicesList.category'),
      title: t('portfolio.servicesList.3.title'),
      image: "/motion.png"
    },
    {
      category: t('portfolio.servicesList.category'),
      title: t('portfolio.servicesList.4.title'),
      image: "/ui.png"
    },
    {
      category: t('portfolio.servicesList.category'),
      title: t('portfolio.servicesList.5.title'),
      image: "/corporate.png"
    },
    {
      category: t('portfolio.servicesList.category'),
      title: t('portfolio.servicesList.6.title'),
      image: "https://picsum.photos/seed/other/400/400"
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(2);

  const scrollServices = (direction: 'left' | 'right') => {
    if (servicesScrollRef.current) {
      const scrollAmount = 300; // Adjust based on card width
      servicesScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden pt-24" ref={containerRef}>
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
                    {t('portfolio.hero.desc')}
                  </p>
                  
                  <button className="mt-8 bg-brand-pink text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-2 uppercase tracking-wider text-sm">
                    {t('portfolio.consultation')}
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
                      <h3 className="text-4xl font-bold mb-2">{t('portfolio.stats.budget.title')}</h3>
                      <p className="text-black/60 text-xs leading-relaxed">{t('portfolio.stats.budget.desc')}</p>
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
                        <h3 className="text-4xl font-bold mb-2">{t('portfolio.stats.posts.title')}</h3>
                        <p className="text-white/60 text-xs leading-relaxed">{t('portfolio.stats.posts.desc')}</p>
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
                    <span className="block text-white">{t('portfolio.transform.title1')}</span>
                    <span className="block text-brand-pink">{t('portfolio.transform.title2')}</span>
                    <span className="block text-white">{t('portfolio.transform.title3')}</span>
                  </h2>
                  <p className="mt-6 text-white/60 max-w-sm ml-auto text-sm md:text-base text-right">
                    {t('portfolio.transform.desc')}
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
                <span className="text-white">{t('portfolio.nextgen.title1')} </span>
                <span className="text-brand-pink">{t('portfolio.nextgen.title2')}</span>
                <br />
                <span className="text-white">{t('portfolio.nextgen.title3')}</span>
              </h2>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {/* Card 1 */}
                <div className="bg-white text-black p-8 rounded-3xl lg:rounded-l-[4rem] lg:rounded-r-2xl flex flex-col items-start text-left h-[280px]">
                  <h3 className="text-2xl font-bold mb-4 leading-tight whitespace-pre-line">{t('portfolio.services.uiux.title')}</h3>
                  <p className="text-black/60 text-sm">{t('portfolio.services.uiux.desc')}</p>
                </div>
                {/* Card 2 (Pink) */}
                <div className="bg-brand-pink text-white p-8 rounded-3xl lg:rounded-2xl flex flex-col items-start text-left h-[280px] relative overflow-hidden">
                  <h3 className="text-2xl font-bold mb-4 leading-tight relative z-10 whitespace-pre-line">{t('portfolio.services.brand.title')}</h3>
                  <p className="text-white/80 text-sm relative z-10">{t('portfolio.services.brand.desc')}</p>
                </div>
                {/* Card 3 */}
                <div className="bg-white text-black p-8 rounded-3xl lg:rounded-2xl flex flex-col items-start text-left h-[280px]">
                  <h3 className="text-2xl font-bold mb-4 leading-tight whitespace-pre-line">{t('portfolio.services.web.title')}</h3>
                  <p className="text-black/60 text-sm">{t('portfolio.services.web.desc')}</p>
                </div>
                {/* Card 4 */}
                <div className="bg-white text-black p-8 rounded-3xl lg:rounded-r-[4rem] lg:rounded-l-2xl flex flex-col items-start text-left h-[280px]">
                  <h3 className="text-2xl font-bold mb-4 leading-tight whitespace-pre-line">{t('portfolio.services.motion.title')}</h3>
                  <p className="text-black/60 text-sm">{t('portfolio.services.motion.desc')}</p>
                </div>
              </div>
            </div>

            {/* Bottom Section: "data that proves our impact" */}
            <div className="flex flex-col lg:flex-row items-start justify-between gap-16 mt-24">
              {/* Left: Text & Tags */}
              <div className="flex-1 max-w-xl">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-10">
                  <span className="block text-white">{t('portfolio.data.title1')}</span>
                  <span className="block text-white">{t('portfolio.data.title2')}</span>
                  <span className="block text-brand-pink">{t('portfolio.data.title3')}</span>
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
                      <h3 className="text-2xl font-bold mb-4">{t('portfolio.data.card1.title')}</h3>
                      <p className="text-black/60 text-xs mb-6 leading-relaxed">
                        {t('portfolio.data.card1.desc')}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-brand-pink text-3xl font-bold mb-1">3x</div>
                          <div className="text-[10px] font-bold leading-tight">{t('portfolio.data.card1.stat1')}</div>
                        </div>
                        <div>
                          <div className="text-brand-pink text-3xl font-bold mb-1">+65%</div>
                          <div className="text-[10px] font-bold leading-tight">{t('portfolio.data.card1.stat2')}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="min-w-[260px] bg-white text-black p-8 rounded-[2rem] snap-start flex-shrink-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{t('portfolio.data.card2.title')}</h3>
                      <p className="text-black/60 text-xs leading-relaxed">
                        {t('portfolio.data.card2.desc')}
                      </p>
                    </div>
                    <div className="text-brand-pink text-5xl font-display font-black mt-8">$613k</div>
                  </div>

                  {/* Card 3 */}
                  <div className="min-w-[260px] bg-white text-black p-8 rounded-[2rem] snap-start flex-shrink-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{t('portfolio.data.card3.title')}</h3>
                      <p className="text-black/60 text-xs leading-relaxed">
                        {t('portfolio.data.card3.desc')}
                      </p>
                    </div>
                    <div className="text-brand-pink text-5xl font-display font-black mt-8">98%</div>
                  </div>

                  {/* Card 4 */}
                  <div className="min-w-[260px] bg-white text-black p-8 rounded-[2rem] snap-start flex-shrink-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{t('portfolio.data.card4.title')}</h3>
                      <p className="text-black/60 text-xs leading-relaxed">
                        {t('portfolio.data.card4.desc')}
                      </p>
                    </div>
                    <div className="text-brand-pink text-5xl font-display font-black mt-8">150+</div>
                  </div>

                  {/* Card 5 */}
                  <div className="min-w-[260px] bg-white text-black p-8 rounded-[2rem] snap-start flex-shrink-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{t('portfolio.data.card5.title')}</h3>
                      <p className="text-black/60 text-xs leading-relaxed">
                        {t('portfolio.data.card5.desc')}
                      </p>
                    </div>
                    <div className="text-brand-pink text-5xl font-display font-black mt-8">24</div>
                  </div>

                  {/* Card 6 */}
                  <div className="min-w-[260px] bg-white text-black p-8 rounded-[2rem] snap-start flex-shrink-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{t('portfolio.data.card6.title')}</h3>
                      <p className="text-black/60 text-xs leading-relaxed">
                        {t('portfolio.data.card6.desc')}
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
                <span className="block text-white">{t('portfolio.who.title1')}</span>
                <span className="block text-white">{t('portfolio.who.title2')}</span>
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-white/80 max-w-sm leading-tight mb-2 whitespace-pre-line">
                {t('portfolio.who.subtitle')}
              </h3>
            </div>

            {/* Cards Zig-Zag Layout */}
            <div className="relative z-10 w-full max-w-6xl mx-auto">
              
              {/* Desktop Grid Layout */}
              <div className="hidden md:grid grid-cols-12 gap-x-6 gap-y-8 relative">
                {/* Row 1 */}
                <div className="col-start-4 col-span-3 aspect-square bg-white rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl z-10">
                  <div className="text-brand-pink text-5xl font-display font-medium">01</div>
                  <div className="text-black font-bold text-xl leading-tight whitespace-pre-line">{t('portfolio.who.card1')}</div>
                </div>
                <div className="col-start-7 col-span-5 rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl z-10 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-pink via-[#ff0055] to-[#cc0044] z-0"></div>
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 blur-2xl rounded-full z-0"></div>
                  <div className="absolute bottom-0 right-0 w-60 h-60 bg-black/20 blur-3xl rounded-full z-0"></div>
                  <div className="relative z-10 flex justify-between items-start h-full">
                    <div className="text-white text-5xl font-display font-medium">02</div>
                    <div className="text-white/90 text-xs max-w-[220px] leading-relaxed text-right">
                      {t('portfolio.who.card2.desc')}
                    </div>
                  </div>
                  <div className="relative z-10 text-white font-bold text-xl leading-tight mt-auto whitespace-pre-line">{t('portfolio.who.card2.title')}</div>
                </div>

                {/* Row 2 */}
                <div className="col-start-2 col-span-3 aspect-square rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl z-10 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff0055] to-brand-pink z-0"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black/10 blur-2xl rounded-full z-0"></div>
                  <div className="relative z-10 text-white text-5xl font-display font-medium">03</div>
                  <div className="relative z-10 text-white font-bold text-xl leading-tight whitespace-pre-line">{t('portfolio.who.card3')}</div>
                </div>
                <div className="col-start-6 col-span-3 aspect-square bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl z-10">
                  <div className="text-brand-pink text-5xl font-display font-medium">04</div>
                  <div className="text-white font-bold text-xl leading-tight whitespace-pre-line">{t('portfolio.who.card4')}</div>
                </div>

                {/* Row 3 */}
                <div className="col-start-4 col-span-3 aspect-square bg-white rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl z-10">
                  <div className="text-brand-pink text-5xl font-display font-medium">05</div>
                  <div className="text-black font-bold text-xl leading-tight whitespace-pre-line">{t('portfolio.who.card5')}</div>
                </div>
                <div className="col-start-8 col-span-3 aspect-square bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl z-10">
                  <div className="text-brand-pink text-5xl font-display font-medium">06</div>
                  <div className="text-white font-bold text-xl leading-tight whitespace-pre-line">{t('portfolio.who.card6')}</div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="flex flex-col gap-6 md:hidden">
                {/* Card 1 */}
                <div className="w-full aspect-square bg-white rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl">
                  <div className="text-brand-pink text-5xl font-display font-medium">01</div>
                  <div className="text-black font-bold text-xl leading-tight whitespace-pre-line">{t('portfolio.who.card1')}</div>
                </div>
                {/* Card 2 */}
                <div className="w-full rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl relative min-h-[250px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-pink via-[#ff0055] to-[#cc0044] z-0"></div>
                  <div className="relative z-10 flex justify-between items-start mb-8">
                    <div className="text-white text-5xl font-display font-medium">02</div>
                  </div>
                  <div className="relative z-10 text-white/90 text-xs mb-4 leading-relaxed">
                      {t('portfolio.who.card2.desc')}
                  </div>
                  <div className="relative z-10 text-white font-bold text-xl leading-tight whitespace-pre-line">{t('portfolio.who.card2.title')}</div>
                </div>
                {/* Card 3 */}
                <div className="w-full aspect-square rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff0055] to-brand-pink z-0"></div>
                  <div className="relative z-10 text-white text-5xl font-display font-medium">03</div>
                  <div className="relative z-10 text-white font-bold text-xl leading-tight whitespace-pre-line">{t('portfolio.who.card3')}</div>
                </div>
                {/* Card 4 */}
                <div className="w-full aspect-square bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl">
                  <div className="text-brand-pink text-5xl font-display font-medium">04</div>
                  <div className="text-white font-bold text-xl leading-tight whitespace-pre-line">{t('portfolio.who.card4')}</div>
                </div>
                {/* Card 5 */}
                <div className="w-full aspect-square bg-white rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl">
                  <div className="text-brand-pink text-5xl font-display font-medium">05</div>
                  <div className="text-black font-bold text-xl leading-tight whitespace-pre-line">{t('portfolio.who.card5')}</div>
                </div>
                {/* Card 6 */}
                <div className="w-full aspect-square bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl">
                  <div className="text-brand-pink text-5xl font-display font-medium">06</div>
                  <div className="text-white font-bold text-xl leading-tight whitespace-pre-line">{t('portfolio.who.card6')}</div>
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
                <span className="block text-white">{t('portfolio.work.title1')}</span>
                <span className="block">
                  <span className="text-brand-pink">{t('portfolio.work.title2')} </span>
                  <span className="text-white">{t('portfolio.work.title3')}</span>
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
                  <span className="text-white">{t('portfolio.creatives.title1')} </span>
                  <span className="text-brand-pink">{t('portfolio.creatives.title2')}</span>
                </span>
                <span className="block">
                  <span className="text-brand-pink">{t('portfolio.creatives.title3')} </span>
                  <span className="text-white">{t('portfolio.creatives.title4')}</span>
                </span>
              </h2>
              
              <button className="bg-white text-black font-bold py-4 px-10 rounded-full hover:bg-brand-pink hover:text-white transition-colors duration-300 uppercase tracking-wider text-sm shadow-xl shrink-0">
                {t('portfolio.consultation')}
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
          {/* Scene 6: Services / The Team Behind Your Success Style */}
          <div className="py-24 md:py-32 flex items-center justify-center relative z-10 px-4 md:px-12">
            <div className="w-full max-w-[1200px] mx-auto bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl overflow-hidden relative">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] tracking-tight">
                    <span className="text-white block">{t('portfolio.services1')}</span>
                    <span className="text-brand-pink block mt-2">{t('portfolio.services2')}</span>
                  </h2>
                </div>
                
                {/* Navigation Arrows */}
                <div className="flex gap-4 shrink-0">
                  <button 
                    onClick={() => scrollServices('left')}
                    className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={24} strokeWidth={2.5} />
                  </button>
                  <button 
                    onClick={() => scrollServices('right')}
                    className="w-14 h-14 rounded-full bg-brand-pink flex items-center justify-center text-white hover:bg-brand-pink/80 transition-colors"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={24} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Scrollable Cards Container */}
              <div 
                ref={servicesScrollRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {servicesList.map((service, index) => (
                  <div 
                    key={index} 
                    className="shrink-0 w-[280px] md:w-[320px] bg-[#1a1a1a] rounded-3xl p-4 snap-start border border-white/5 hover:border-brand-pink/30 transition-colors duration-300 group cursor-pointer"
                  >
                    <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                    <div className="px-2 pb-2">
                      <p className="text-brand-pink text-xs font-bold uppercase tracking-wider mb-2">
                        {service.category}
                      </p>
                      <h3 className="text-white text-2xl font-bold underline decoration-white/30 underline-offset-4 group-hover:decoration-white transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Dots (Visual only) */}
              <div className="flex justify-center gap-2 mt-4">
                <div className="w-12 h-1.5 bg-white rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>
          {/* Scene 7: DNA Spiral & Start a Project */}
          <div className="relative w-full h-[80vh] flex items-center justify-center -mt-48 pt-48 z-0">
            <DNASpiral />
            
            <div className="relative z-10 text-center px-4">
              <a 
                href="#contact" 
                className="group inline-block"
              >
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F70670] group-hover:to-[#8B5CF6]">
                  {t('portfolio.startProject')}
                </h2>
                <div className="h-1 w-0 bg-gradient-to-r from-[#F70670] to-[#8B5CF6] mx-auto transition-all duration-500 group-hover:w-full mt-4"></div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
