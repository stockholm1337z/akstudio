import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.portfolio'), path: "/portfolio" },
    { name: t('nav.pricing'), path: "/pricing" },
    { name: t('nav.about'), path: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-center">
      <nav className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl">
        <Link to="/" className="font-display font-bold text-xl tracking-tight text-white">
          <span className="text-brand-pink">AKSTUDIO</span>.
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors relative px-2 py-1",
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-pink rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium bg-white/5 rounded-full px-2 py-1 border border-white/10">
            <button 
              onClick={() => setLanguage('ru')}
              className={cn("px-2 py-1 rounded-full transition-colors", language === 'ru' ? "bg-brand-pink text-white" : "text-white/60 hover:text-white")}
            >
              RU
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={cn("px-2 py-1 rounded-full transition-colors", language === 'en' ? "bg-brand-pink text-white" : "text-white/60 hover:text-white")}
            >
              EN
            </button>
          </div>

          <Link
            to="/about"
            className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-brand-pink rounded-full hover:bg-brand-pink/90 transition-colors shadow-[0_0_20px_rgba(247,6,112,0.4)] hover:shadow-[0_0_30px_rgba(247,6,112,0.6)]"
          >
            {t('nav.discuss')}
          </Link>
        </div>
      </nav>
    </header>
  );
}
