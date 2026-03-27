import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { LogoMorphDemo } from "@/components/morph/LogoMorphDemo";

export function MorphLab() {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(247,6,112,0.12),transparent_32%),radial-gradient(circle_at_70%_30%,rgba(255,184,112,0.08),transparent_24%)]" />

      <div className="relative z-10 flex h-full flex-col px-4 pt-28 pb-4 md:px-8 md:pt-32 md:pb-6">
        <div className="mx-auto flex w-full max-w-[1320px] items-start justify-between gap-6">
          <div className="max-w-3xl">
            <Link
              to="/portfolio"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to portfolio
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-brand-pink/80">
              <Sparkles size={14} />
              Morph Lab
            </div>
          </div>
        </div>

        <div className="mx-auto mt-4 h-full w-full max-w-[1320px] flex-1">
          <LogoMorphDemo />
        </div>
      </div>
    </div>
  );
}
