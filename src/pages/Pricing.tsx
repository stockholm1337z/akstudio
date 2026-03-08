import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function Pricing() {
  const { t } = useLanguage();

  const packages = [
    {
      name: t('pricing.landing'),
      price: t('pricing.landing.price'),
      desc: t('pricing.landing.desc'),
      features: [
        t('pricing.landing.f1'),
        t('pricing.landing.f2'),
        t('pricing.landing.f3'),
        t('pricing.landing.f4'),
        t('pricing.landing.f5')
      ],
      popular: false
    },
    {
      name: t('pricing.corp'),
      price: t('pricing.corp.price'),
      desc: t('pricing.corp.desc'),
      features: [
        t('pricing.corp.f1'),
        t('pricing.corp.f2'),
        t('pricing.corp.f3'),
        t('pricing.corp.f4'),
        t('pricing.corp.f5'),
        t('pricing.corp.f6')
      ],
      popular: true
    },
    {
      name: t('pricing.front'),
      price: t('pricing.front.price'),
      desc: t('pricing.front.desc'),
      features: [
        t('pricing.front.f1'),
        t('pricing.front.f2'),
        t('pricing.front.f3'),
        t('pricing.front.f4'),
        t('pricing.front.f5')
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            {t('pricing.title1')} <span className="text-brand-pink">{t('pricing.title2')}</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            {t('pricing.desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-[2rem] border ${
                pkg.popular 
                  ? "bg-brand-gray/80 border-brand-pink shadow-[0_0_30px_rgba(247,6,112,0.15)]" 
                  : "bg-brand-gray/30 border-white/10"
              } backdrop-blur-md flex flex-col`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-pink text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  {t('pricing.popular')}
                </div>
              )}
              
              <h3 className="text-2xl font-display font-bold mb-2">{pkg.name}</h3>
              <div className="text-3xl font-bold text-brand-pink mb-4">{pkg.price}</div>
              <p className="text-white/50 mb-8 min-h-[48px]">{pkg.desc}</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {pkg.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3 text-white/80">
                    <Check className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/about" 
                className={`w-full py-4 rounded-full font-bold text-center transition-all ${
                  pkg.popular
                    ? "bg-brand-pink text-white hover:bg-brand-pink/90 shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {t('pricing.choose')}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
