import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.portfolio"), path: "/portfolio" },
    { name: t("nav.pricing"), path: "/pricing" },
    { name: t("nav.about"), path: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 py-3 md:px-6 md:py-4">
      <motion.nav
        layout
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className={cn(
          "w-full max-w-[380px] overflow-hidden border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl",
          "rounded-[2rem] px-4 py-3 md:max-w-none md:w-auto md:rounded-full md:px-6",
          isMobileMenuOpen && "shadow-[0_18px_50px_rgba(0,0,0,0.38)]"
        )}
      >
        <div className="flex items-center justify-between gap-3 md:hidden">
          <Link to="/" className="font-display font-bold text-xl tracking-tight text-white">
            <span className="text-brand-pink">AKSTUDIO</span>.
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-sm font-medium">
              <button
                onClick={() => setLanguage("ru")}
                className={cn(
                  "px-2 py-1 rounded-full transition-colors",
                  language === "ru" ? "bg-brand-pink text-white" : "text-white/60 hover:text-white"
                )}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-2 py-1 rounded-full transition-colors",
                  language === "en" ? "bg-brand-pink text-white" : "text-white/60 hover:text-white"
                )}
              >
                EN
              </button>
            </div>

            <button
              className="p-2 text-white/80 transition-colors hover:text-white"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-nav-content"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="space-y-3 border-t border-white/8 pt-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        "flex items-center justify-center rounded-full border px-4 py-4 text-center font-display text-[1.85rem] font-bold tracking-tight transition-all duration-300",
                        isActive
                          ? "border-brand-pink/30 bg-[linear-gradient(180deg,rgba(247,6,112,0.12),rgba(247,6,112,0.04))] text-brand-pink"
                          : "border-white/8 bg-white/[0.02] text-white hover:border-white/14 hover:bg-white/[0.04] hover:text-brand-pink"
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <Link
                  to="/about"
                  className="mt-4 flex w-full items-center justify-center rounded-full bg-brand-pink px-6 py-3.5 text-base font-semibold text-white shadow-[0_0_20px_rgba(247,6,112,0.28)] transition-all duration-300 hover:bg-brand-pink/90 hover:shadow-[0_0_30px_rgba(247,6,112,0.38)]"
                >
                  {t("nav.discuss")}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="font-display font-bold text-xl tracking-tight text-white">
            <span className="text-brand-pink">AKSTUDIO</span>.
          </Link>

          <div className="flex items-center gap-6">
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
                onClick={() => setLanguage("ru")}
                className={cn(
                  "px-2 py-1 rounded-full transition-colors",
                  language === "ru" ? "bg-brand-pink text-white" : "text-white/60 hover:text-white"
                )}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-2 py-1 rounded-full transition-colors",
                  language === "en" ? "bg-brand-pink text-white" : "text-white/60 hover:text-white"
                )}
              >
                EN
              </button>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-brand-pink rounded-full hover:bg-brand-pink/90 transition-colors shadow-[0_0_20px_rgba(247,6,112,0.4)] hover:shadow-[0_0_30px_rgba(247,6,112,0.6)]"
            >
              {t("nav.discuss")}
            </Link>
          </div>
        </div>
      </motion.nav>
    </header>
  );
}
