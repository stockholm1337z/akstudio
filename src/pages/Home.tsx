import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { GlowCard } from "../components/ui/GlowCard";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center text-center mt-12 mb-32"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-pink text-sm font-semibold mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse" />
            {t('home.available')}
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-4xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.1] mb-6">
            {t('home.title1')} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-purple-500">
              {t('home.title2')}
            </span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 font-medium">
            {t('home.desc')}
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/portfolio" className="px-8 py-4 rounded-full bg-brand-pink text-white font-bold text-lg hover:bg-brand-pink/90 transition-all shadow-[0_0_30px_rgba(247,6,112,0.4)] hover:shadow-[0_0_50px_rgba(247,6,112,0.6)] flex items-center gap-2">
              {t('home.viewWork')} <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/pricing" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
              {t('home.services')}
            </Link>
          </motion.div>
        </motion.section>

        {/* Value Proposition / Strengths */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-32"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-display font-bold mb-12 text-center">
            {t('home.whyMe').split(' ').slice(0, -1).join(' ')} <span className="text-brand-pink">{t('home.whyMe').split(' ').slice(-1)}</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: t('home.quality.title'),
                desc: t('home.quality.desc')
              },
              {
                title: t('home.conversion.title'),
                desc: t('home.conversion.desc')
              },
              {
                title: t('home.stack.title'),
                desc: t('home.stack.desc')
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                className="h-full"
              >
                <GlowCard title={item.title} desc={item.desc} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-32"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-display font-bold mb-12 text-center">
            {t('home.testimonials').split(' ').slice(0, -1).join(' ')} <span className="text-brand-pink">{t('home.testimonials').split(' ').slice(-1)}</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: t('home.testimonial1.author'),
                role: t('home.testimonial1.role'),
                text: t('home.testimonial1.text')
              },
              {
                name: t('home.testimonial2.author'),
                role: t('home.testimonial2.role'),
                text: t('home.testimonial2.text')
              }
            ].map((review, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-3xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Star className="w-24 h-24 text-brand-pink" />
                </div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-brand-pink text-brand-pink" />
                  ))}
                </div>
                <p className="text-lg text-white/80 mb-6 relative z-10">"{review.text}"</p>
                <div className="relative z-10">
                  <div className="font-bold font-display">{review.name}</div>
                  <div className="text-sm text-white/40">{review.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative rounded-[3rem] overflow-hidden bg-brand-gray/80 border border-white/10 p-12 md:p-20 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brand-pink/20 to-transparent opacity-50" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              {t('home.cta.title1')} <br />
              <span className="text-brand-pink">{t('home.cta.title2')}</span>
            </h2>
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
              {t('home.cta.desc')}
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform shadow-xl">
              {t('home.cta.btn')} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
