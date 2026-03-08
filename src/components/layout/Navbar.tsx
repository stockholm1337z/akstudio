import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Главная", path: "/" },
  { name: "Портфолио", path: "/portfolio" },
  { name: "Услуги", path: "/pricing" },
  { name: "Обо мне", path: "/about" },
];

export function Navbar() {
  const location = useLocation();

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
        <Link
          to="/about"
          className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-brand-pink rounded-full hover:bg-brand-pink/90 transition-colors shadow-[0_0_20px_rgba(247,6,112,0.4)] hover:shadow-[0_0_30px_rgba(247,6,112,0.6)]"
        >
          Обсудить проект
        </Link>
      </nav>
    </header>
  );
}
