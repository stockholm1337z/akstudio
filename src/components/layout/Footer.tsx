import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { label: "Telegram", href: "https://t.me/reasonace1337" },
    { label: "Email", href: "mailto:alexey_kalyan@mail.ru" },
    { label: "Behance", href: "https://behance.net" },
  ];

  return (
    <footer className="relative z-10 mt-6 overflow-hidden rounded-t-[2rem] border-t border-white/8 bg-transparent md:rounded-t-[2.75rem]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018)_24%,rgba(255,255,255,0.008)_100%)] backdrop-blur-xl" />
        <div className="absolute left-[8%] top-[-40px] h-28 w-56 rounded-full bg-[#F70670]/10 blur-3xl" />
        <div className="absolute right-[10%] top-[10px] h-24 w-48 rounded-full bg-white/4 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="grid gap-8 px-2 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-4 md:py-10 lg:px-6">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/52">
                <Sparkles size={12} className="text-brand-pink" />
                Liquid Presence
            </div>

            <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <Link to="/" className="font-display text-[2rem] font-black tracking-tight text-white md:text-[2.8rem]">
                  <span className="text-brand-pink">AKSTUDIO</span>.
                </Link>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/48 md:text-base">
                  {t("footer.desc")}
                </p>
              </div>

              <Link
                to="/about"
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-xs font-bold uppercase tracking-[0.28em] text-white/74 transition-all duration-300 hover:border-white/22 hover:bg-white/[0.08] hover:text-white"
              >
                Discuss
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group rounded-[1.2rem] border border-white/9 bg-white/[0.025] px-4 py-4 transition-all duration-300 hover:border-white/18 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-white/68 transition-colors duration-300 group-hover:text-white">
                      {item.label}
                    </span>
                    <ArrowUpRight size={15} className="text-white/30 transition-all duration-300 group-hover:-translate-y-[1px] group-hover:translate-x-[1px] group-hover:text-brand-pink" />
                  </div>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-white/8 pt-5 text-[11px] uppercase tracking-[0.28em] text-white/28 sm:flex-row sm:items-center sm:justify-between">
              <span>Premium digital presence</span>
              <span>Built for motion, brand and clarity</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
