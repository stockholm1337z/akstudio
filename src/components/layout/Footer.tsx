import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24 py-12 relative z-10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <Link to="/" className="font-display font-bold text-2xl tracking-tight text-white block mb-2">
            <span className="text-brand-pink">AKSTUDIO</span>.
          </Link>
          <p className="text-white/50 text-sm">Премиальная веб-разработка и дизайн.</p>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-white/60">
          <a href="https://t.me/reasonace1337" target="_blank" rel="noreferrer" className="hover:text-brand-pink transition-colors">Telegram</a>
          <a href="mailto:alexey_kalyan@mail.ru" className="hover:text-brand-pink transition-colors">Email</a>
          <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-brand-pink transition-colors">Behance</a>
        </div>
      </div>
    </footer>
  );
}
