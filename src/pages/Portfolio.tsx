import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import React, { useRef, useState, useMemo, useCallback, memo, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";


// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};
const stagger = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0, staggerChildren: 0 } },
};
const staggerD1 = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0, staggerChildren: 0, delayChildren: 0 } },
};
const staggerD2 = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0, staggerChildren: 0, delayChildren: 0 } },
};

// ─── Canvas Aurora Background ─────────────────────────────────────────────────
// Renders a living, breathing aurora on a <canvas> element.
// Uses requestAnimationFrame — no Framer Motion, no heavy JS.
const AuroraCanvas = memo(() => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Orb configuration
    const orbs = [
      { x: 0.15, y: 0.1,  r: 0.55, color: [247, 6, 112],   speed: 0.00018, phase: 0 },
      { x: 0.80, y: 0.75, r: 0.50, color: [139, 92, 246],   speed: 0.00013, phase: 2.1 },
      { x: 0.50, y: 0.45, r: 0.40, color: [247, 6, 112],    speed: 0.00022, phase: 4.3 },
      { x: 0.85, y: 0.15, r: 0.35, color: [80,  20, 180],   speed: 0.00016, phase: 1.5 },
      { x: 0.10, y: 0.80, r: 0.38, color: [220, 0,  80],    speed: 0.00019, phase: 3.7 },
    ];

    let t = 0;
    const draw = (ts: number) => {
      t = ts;
      const W = canvas.width;
      const H = canvas.height;

      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, W, H);

      for (const o of orbs) {
        // Lissajous-ish drift
        const dx = Math.sin(t * o.speed + o.phase) * 0.18 * W;
        const dy = Math.cos(t * o.speed * 1.3 + o.phase + 1) * 0.14 * H;
        const cx = o.x * W + dx;
        const cy = o.y * H + dy;
        const radius = o.r * Math.min(W, H);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        const [r, g, b] = o.color;
        grad.addColorStop(0,   `rgba(${r},${g},${b},0.18)`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},0.09)`);
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";

      // Noise grain — we write random pixels very lightly
      // (cheap: skip most pixels for perf)
      const imageData = ctx.getImageData(0, 0, W, H);
      const data = imageData.data;
      const step = 4; // only touch every 4th pixel
      for (let i = 0; i < data.length; i += 4 * step * 8) {
        const noise = (Math.random() - 0.5) * 14;
        data[i]     = Math.min(255, Math.max(0, data[i]     + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
      ctx.putImageData(imageData, 0, 0);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: "block" }}
    />
  );
});

// ─── Scroll progress bar ──────────────────────────────────────────────────────
const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[300] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg,#F70670,#8B5CF6)" }}
    />
  );
};

// ─── Marquee ──────────────────────────────────────────────────────────────────
const Marquee = memo(({ items }: { items: string[] }) => {
  const rep = [...items, ...items, ...items];
  return (
    <div
      className="relative w-full overflow-hidden py-8 md:py-10"
      style={{
        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
        maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <motion.div
        className="relative flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {rep.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-[10px] md:text-[11px] font-bold tracking-[0.36em] uppercase text-white/18">
            {item}
            <span className="w-1 h-1 rounded-full bg-[#F70670] flex-shrink-0 opacity-60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
});

// ─── Scene label ─────────────────────────────────────────────────────────────
const Tag = memo(({ n, label }: { n: string; label: string }) => (
  <div className="absolute top-10 right-8 md:right-16 z-20 flex items-center gap-2 select-none pointer-events-none">
    <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/25">{label}</span>
    <span className="text-[9px] font-bold text-[#F70670]/50">/{n}</span>
  </div>
));

// ─── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = memo(({ p, i, activeIndex, onClick }: any) => {
  const offset = i - activeIndex;
  const isCenter = offset === 0;
  const abs = Math.abs(offset);
  if (abs > 4) return null;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-[280px] md:w-[380px] h-[480px] md:h-[520px] rounded-[2rem] cursor-pointer bg-[#080808]"
      style={{ transformStyle: "preserve-3d", pointerEvents: abs > 2 ? "none" : "auto" }}
      animate={{
        x: `calc(-50% + ${offset * 150}px)`,
        y: "-50%",
        scale: isCenter ? 1.06 : 1 - abs * 0.1,
        rotateY: -offset * 14,
        zIndex: 10 - abs,
        opacity: abs > 2 ? 0 : 1,
        boxShadow: isCenter
          ? "0 30px 70px -10px rgba(247,6,112,0.45), 0 0 0 1px rgba(247,6,112,0.12)"
          : "0 12px 40px -10px rgba(0,0,0,0.7)",
      }}
      transition={{ type: "spring", stiffness: 240, damping: 26, mass: 0.8 }}
      onClick={() => onClick(i)}
    >
      <motion.div
        className="absolute inset-0 rounded-[2rem] p-6 flex flex-col justify-end"
        style={{ background: "linear-gradient(170deg, #F70670 0%, #9B0045 100%)" }}
        initial={false}
        animate={{ opacity: isCenter ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          initial={false}
          animate={{ opacity: isCenter ? 1 : 0, y: isCenter ? 0 : 20 }}
          transition={{ type: "spring", stiffness: 280, damping: 24, delay: isCenter ? 0.1 : 0 }}
        >
          <h4 className="text-white font-bold text-xl md:text-2xl leading-tight mb-3">{p.title}</h4>
          <p className="text-white/80 text-xs md:text-sm mb-8">{p.desc}</p>
        </motion.div>
        <motion.div
          className="absolute -bottom-6 left-8 w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-2xl"
          initial={false}
          animate={{ opacity: isCenter ? 1 : 0, scale: isCenter ? 1 : 0.4 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: isCenter ? 0.18 : 0 }}
        >
          <ArrowUpRight size={22} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10 rounded-[2rem] overflow-hidden"
        initial={false}
        animate={{ opacity: isCenter ? 0 : 0.55 }}
        transition={{ duration: 0.4 }}
      >
        <img src={p.img} alt={p.title} loading="lazy" decoding="async" className="w-full h-full object-cover grayscale" />
      </motion.div>

      <motion.div
        className="absolute top-4 left-4 right-4 bottom-[50%] md:bottom-[44%] z-20 rounded-2xl overflow-hidden shadow-xl"
        initial={false}
        animate={{ opacity: isCenter ? 1 : 0, y: isCenter ? 0 : 22, scale: isCenter ? 1 : 0.94 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
      >
        <img src={p.img} alt={p.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
      </motion.div>
    </motion.div>
  );
});

// ─── Carousel ─────────────────────────────────────────────────────────────────
const Carousel = memo(({ projects }: { projects: any[] }) => {
  const [active, setActive] = useState(0);
  const tsRef = useRef<number | null>(null);
  const teRef = useRef<number | null>(null);

  const onTS = useCallback((e: React.TouchEvent) => {
    teRef.current = null; tsRef.current = e.targetTouches[0].clientX;
  }, []);
  const onTM = useCallback((e: React.TouchEvent) => { teRef.current = e.targetTouches[0].clientX; }, []);
  const onTE = useCallback(() => {
    if (tsRef.current === null || teRef.current === null) return;
    const d = tsRef.current - teRef.current;
    if (d > 40) setActive(p => Math.min(p + 1, projects.length - 1));
    else if (d < -40) setActive(p => Math.max(p - 1, 0));
    tsRef.current = null; teRef.current = null;
  }, [projects.length]);

  return (
    <>
      <div
        className="relative z-10 h-[560px] md:h-[660px] w-full flex items-center justify-center mt-10"
        style={{ perspective: "1100px" }}
        onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={onTE}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[62%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-80"
          style={{ background: "radial-gradient(circle, rgba(247,6,112,0.18) 0%, rgba(139,92,246,0.12) 34%, rgba(0,0,0,0) 76%)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-[14%] bottom-8 h-px opacity-80"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), rgba(247,6,112,0.28), rgba(255,255,255,0.16), transparent)" }}
        />
        {projects.map((p, i) => (
          <ProjectCard key={i} p={p} i={i} activeIndex={active} onClick={setActive} />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2 mt-14">
        <button onClick={() => setActive(p => Math.max(p - 1, 0))}
          className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-white/35 hover:text-white hover:border-white/40 transition-all mr-4">
          <ChevronLeft size={18} />
        </button>
        {projects.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-[#F70670]" : "w-1.5 bg-white/15 hover:bg-white/30"}`}
            aria-label={`Slide ${i + 1}`} />
        ))}
        <button onClick={() => setActive(p => Math.min(p + 1, projects.length - 1))}
          className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-white/35 hover:text-white hover:border-white/40 transition-all ml-4">
          <ChevronRight size={18} />
        </button>
      </div>
    </>
  );
});

// ─── Main ─────────────────────────────────────────────────────────────────────
// ─── Scene 7 ──────────────────────────────────────────────────────────────────
// Single canvas handles: animated particles, mouse repulsion/swirl, connection mesh.
// Text reveal uses framer-motion's whileInView for reliable triggering.
const Scene7 = memo(({ label }: { label: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999 });

  // ── Canvas + particle loop ─────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let W = 0, H = 0, tick = 0;

    type P = {
      x: number; y: number;
      vx: number; vy: number;
      r: number; a: number; targetA: number;
      hue: number; tw: number; ts: number;
      trail: { x: number; y: number }[];
    };
    let pts: P[] = [];

    const seed = () => {
      const n = Math.min(180, Math.floor((W * H) / 5200));
      pts = Array.from({ length: n }, () => {
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          r: 0.6 + Math.random() * 1.7,
          a: 0,
          targetA: 0.15 + Math.random() * 0.65,
          hue: 290 + Math.random() * 80,
          tw: Math.random() * Math.PI * 2,
          ts: 0.008 + Math.random() * 0.02,
          trail: [],
        };
      });
    };

    const resize = () => {
      W = canvas.width  = wrap.offsetWidth;
      H = canvas.height = wrap.offsetHeight;
      seed();
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      tick++;
      ctx.clearRect(0, 0, W, H);

      // bg radial glow
      const bg = ctx.createRadialGradient(W * .5, H * .5, 0, W * .5, H * .5, W * .55);
      bg.addColorStop(0,   "rgba(247,6,112,0.06)");
      bg.addColorStop(0.5, "rgba(139,92,246,0.03)");
      bg.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const { x: mx, y: my } = mouse.current;

      // connection mesh — first pass
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 75) {
            const t = 1 - d / 75;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) * .5},90%,70%,${t * 0.07})`;
            ctx.lineWidth   = t * 0.6;
            ctx.stroke();
          }
        }
      }

      // particles — second pass
      for (const p of pts) {
        // fade in
        if (p.a < p.targetA) p.a = Math.min(p.a + 0.016, p.targetA);

        const tw = Math.sin(tick * p.ts + p.tw);
        const a  = p.a * (0.7 + tw * 0.3);

        // wander
        p.vx += Math.sin(tick * 0.01 + p.tw) * 0.02;
        p.vy += Math.cos(tick * 0.013 + p.tw) * 0.02;

        // mouse forces
        const dx = p.x - mx, dy = p.y - my;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 120 && d > 0) {
          // hard repel
          const f = ((120 - d) / 120) ** 1.7 * 2.5;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        } else if (d < 220 && d > 120) {
          // tangential swirl
          const t = (d - 120) / 100;
          p.vx += (-dy / d) * (1 - t) * 0.12;
          p.vy += ( dx / d) * (1 - t) * 0.12;
        }

        // damping
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x  += p.vx;
        p.y  += p.vy;

        // wrap around
        let wrapped = false;
        if (p.x < -20) { p.x = W + 20; wrapped = true; }
        if (p.x > W + 20) { p.x = -20; wrapped = true; }
        if (p.y < -20) { p.y = H + 20; wrapped = true; }
        if (p.y > H + 20) { p.y = -20; wrapped = true; }

        // trail
        if (wrapped) {
          p.trail = [];
        }
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > 6) p.trail.pop();
        const spd = Math.abs(p.vx) + Math.abs(p.vy);
        if (spd > 1.0 && p.trail.length > 1) {
          for (let i = 1; i < p.trail.length; i++) {
            const ta = a * (1 - i / p.trail.length) * 0.4;
            ctx.beginPath();
            ctx.moveTo(p.trail[i - 1].x, p.trail[i - 1].y);
            ctx.lineTo(p.trail[i].x,     p.trail[i].y);
            ctx.strokeStyle = `hsla(${p.hue},100%,72%,${ta})`;
            ctx.lineWidth   = p.r * (1.1 - i / p.trail.length);
            ctx.lineCap     = "round";
            ctx.stroke();
          }
        }

        // glow halo
        const gl = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5.5);
        gl.addColorStop(0, `hsla(${p.hue},100%,70%,${a * 0.32})`);
        gl.addColorStop(1, `hsla(${p.hue},100%,70%,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5.5, 0, Math.PI * 2);
        ctx.fillStyle = gl;
        ctx.fill();

        // core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,82%,${a})`;
        ctx.fill();

        // pinpoint
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a * 0.85})`;
        ctx.fill();
      }
    };

    // mouse events
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    const onTouch = (e: TouchEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.current = { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
    };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    wrap.addEventListener("touchmove", onTouch, { passive: true });

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      wrap.removeEventListener("touchmove", onTouch);
    };
  }, []);

  const words = label.split(" ");
  let charIndex = 0;

  return (
    <div ref={wrapRef} className="absolute inset-0 z-[1]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Text overlay — pointer-events:none so it doesn't block the canvas globally */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ perspective: "900px", zIndex: 10 }}
      >
        <Link 
          to="/pricing" 
          className="pointer-events-auto group flex flex-col items-center transition-transform duration-500 hover:scale-105"
          aria-label={label}
        >
          {/* Char-by-char heading */}
          <div className="flex flex-wrap justify-center gap-x-[0.22em] gap-y-2 transition-all duration-500 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
            {words.map((word, wIdx) => (
              <div key={wIdx} className="flex whitespace-nowrap">
                {word.split("").map((ch, cIdx) => {
                  const i = charIndex++;
                  return (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 60, rotateX: -80 },
                        visible: { 
                          opacity: 1, y: 0, rotateX: 0,
                          transition: { duration: 0.85, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }
                        }
                      }}
                      className="font-display font-black tracking-tighter"
                      style={{
                        display:         "inline-block",
                        fontSize:        "clamp(2.8rem, 8.5vw, 9rem)",
                        lineHeight:      0.88,
                        transformOrigin: "bottom center",
                        background:      "linear-gradient(150deg,#ffffff 30%,rgba(255,255,255,0.65) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip:  "text",
                      }}
                    >
                      {ch}
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Gradient underline */}
          <motion.div
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: { 
                scaleX: 1, opacity: 1,
                transition: { duration: 1.1, delay: label.length * 0.05 + 0.2, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            className="transition-all duration-500 group-hover:h-[4px] group-hover:shadow-[0_0_20px_rgba(247,6,112,0.8)]"
            style={{
              marginTop:       "1.1rem",
              height:          "2px",
              width:           "min(55%, 380px)",
              borderRadius:    "4px",
              background:      "linear-gradient(90deg, #F70670, #8B5CF6)",
              transformOrigin: "center",
            }}
          />
        </Link>
      </motion.div>
    </div>
  );
});

export function Portfolio() {
  const [cardHeight, setCardHeight] = useState(0);
  const [compactHeight, setCompactHeight] = useState(0);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = cardContentRef.current;
    if (!node) return;

    const update = () => {
      setCardHeight(node.scrollHeight);
      setCompactHeight(Math.max(460, Math.min(window.innerHeight - 220, 720)));
    };
    update();

    const observer = new ResizeObserver(() => update());
    observer.observe(node);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const projects = useMemo(() => [
    { title: t("portfolio.projects.1.title"), desc: t("portfolio.projects.1.desc"), img: "/landing1.jpg" },
    { title: t("portfolio.projects.2.title"), desc: t("portfolio.projects.2.desc"), img: "/landing2.png" },
    { title: t("portfolio.projects.3.title"), desc: t("portfolio.projects.3.desc"), img: "/landing3.png" },
    { title: t("portfolio.projects.4.title"), desc: t("portfolio.projects.4.desc"), img: "/landing4.png" },
    { title: t("portfolio.projects.5.title"), desc: t("portfolio.projects.5.desc"), img: "/landing5.png" },
  ], [t]);

  const services = useMemo(() => [
    { cat: t("portfolio.servicesList.category"), title: t("portfolio.servicesList.1.title"), img: "/design.png" },
    { cat: t("portfolio.servicesList.category"), title: t("portfolio.servicesList.2.title"), img: "/web.png" },
    { cat: t("portfolio.servicesList.category"), title: t("portfolio.servicesList.3.title"), img: "/motion.png" },
    { cat: t("portfolio.servicesList.category"), title: t("portfolio.servicesList.4.title"), img: "/ui.png" },
    { cat: t("portfolio.servicesList.category"), title: t("portfolio.servicesList.5.title"), img: "/corporate.png" },
    { cat: t("portfolio.servicesList.category"), title: t("portfolio.servicesList.6.title"), img: "https://picsum.photos/seed/other/400/400" },
  ], [t]);

  const svcRef = useRef<HTMLDivElement>(null);
  const scroll = useCallback((dir: "left" | "right") => {
    svcRef.current?.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  }, []);

  const impactRef = useRef<HTMLDivElement>(null);
  const scrollImpact = useCallback((dir: "left" | "right") => {
    impactRef.current?.scrollBy({ left: dir === "left" ? -266 : 266, behavior: "smooth" });
  }, []);

  const ticker = ["UI/UX Design", "Brand Identity", "Web Dev", "Motion Graphics", "Corporate", "Creative Direction"];

  // ── Shared section padding
  const SP = "px-6 md:px-14 lg:px-24";

  return (
    // Root — just the canvas behind, no extra bg
    <div className="min-h-screen text-white relative overflow-hidden pt-24">
      <AuroraCanvas />
      <ScrollBar />

      {/* ╔═══════════════════════════════════════════════════════╗
          ║              THE BIG VERTICAL CARD                   ║
          ╚═══════════════════════════════════════════════════════╝ */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 md:px-8 z-10 flex justify-center">
        <motion.div
          ref={cardRef}
          className="w-full rounded-[2.5rem] md:rounded-[4rem] relative flex flex-col"
          style={{
            backdropFilter: "blur(0px)",
            boxShadow:
              "inset 0 0 0 1px rgba(247,6,112,0.16), 0 0 24px rgba(247,6,112,0.16), 0 0 58px rgba(139,92,246,0.08)",
            transformOrigin: "top center",
            willChange: "width, height, transform, background-color",
          }}
          initial={{ 
            width: "18%", 
            height: compactHeight ? compactHeight * 0.18 : 120, 
            y: -40,
            opacity: 1,
            backgroundColor: "rgba(247,6,112,0.05)"
          }}
          animate={{ 
            width: "100%", 
            height: cardHeight || "auto", 
            y: 0,
            opacity: 1,
            backgroundColor: "rgba(4,3,5,0.88)"
          }}
          transition={{
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div 
            className="relative w-full h-full rounded-[inherit] overflow-hidden"
            style={{
              WebkitMaskImage: "-webkit-radial-gradient(white, black)",
              maskImage: "radial-gradient(white, black)"
            }}
          >
            <motion.div 
              ref={cardContentRef}
              className="relative flex flex-col w-[calc(100vw-2rem)] md:w-[calc(100vw-4rem)] max-w-[1376px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {/* ── Hero people.png — screen blend removes black ── */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <div
                  className="absolute inset-0 opacity-90"
                  style={{
                    background: [
                      "radial-gradient(circle at 12% 12%, rgba(247,6,112,0.16), transparent 28%)",
                      "radial-gradient(circle at 84% 18%, rgba(139,92,246,0.14), transparent 24%)",
                      "radial-gradient(circle at 50% 46%, rgba(255,255,255,0.035), transparent 38%)",
                      "radial-gradient(circle at 50% 100%, rgba(247,6,112,0.08), transparent 30%)",
                    ].join(", "),
                  }}
                />
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/[0.055] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#020203]/72 via-[#020203]/26 to-transparent" />
              </div>

              <div 
                className="absolute top-0 left-0 right-0 h-[100vh] pointer-events-none overflow-hidden z-[0]"
                style={{
                  maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 100%)"
                }}
              >
                <img
                  src="/people.png" alt=""
                  className="absolute inset-0 w-full h-full object-cover object-top scale-[1.1]"
                  style={{ mixBlendMode: "screen", opacity: 0.12, filter: "saturate(0.8) contrast(1.05)" }}
                />
              </div>

              {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  SCENE 1 — HERO
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
              <div className={`relative w-full flex flex-col ${SP} pt-10 pb-0 min-h-screen`}>
              <Tag n="01" label="Intro" />

              <div className="relative z-20 flex-1 flex flex-col">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-14 lg:gap-24 mt-14 md:mt-16">

                  {/* Left: Title */}
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }}
                    variants={staggerD1} className="flex flex-col items-start flex-1 max-w-[760px]">
                    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                      <div className="w-5 h-[1px] bg-[#F70670]" />
                      <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-white/30">Design Studio</span>
                    </motion.div>

                    <motion.h1 variants={fadeUp}
                      className="text-[2.75rem] sm:text-6xl md:text-8xl lg:text-[8.35rem] xl:text-[8.9rem] font-display font-black leading-[0.96] md:leading-[0.82] tracking-tighter">
                      <span className="block text-white">Design</span>
                      <span className="block mt-1 md:mt-3">
                        <span style={{ WebkitTextStroke: "2px #F70670", color: "transparent" }}>AK</span>
                      </span>
                      <span className="block text-white -mt-1 md:-mt-2">STUDIO</span>
                    </motion.h1>

                    <motion.p variants={fadeUp}
                      className="mt-12 text-white/35 max-w-sm text-sm md:text-base leading-relaxed">
                      {t("portfolio.hero.desc")}
                    </motion.p>

                    <motion.button variants={fadeUp} onClick={() => navigate("/pricing")}
                      className="mt-12 group relative overflow-hidden bg-[#F70670] text-white font-bold py-4 px-10 rounded-full uppercase tracking-wider text-sm"
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <motion.span
                        className="absolute inset-0 bg-white"
                        initial={{ x: "-101%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-200">
                        {t("portfolio.consultation")}
                        <ArrowUpRight size={15} />
                      </span>
                    </motion.button>
                  </motion.div>

                  {/* Right: Stat cards */}
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }}
                    variants={staggerD1} className="w-full lg:w-auto lg:flex-none grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 lg:mt-20">
                    {[
                      { title: t("portfolio.stats.budget.title"), desc: t("portfolio.stats.budget.desc"), dark: false },
                      { title: t("portfolio.stats.posts.title"),  desc: t("portfolio.stats.posts.desc"),  dark: true },
                    ].map((c, i) => (
                      <motion.div key={i} variants={fadeUp}
                        className={`${c.dark ? "bg-[#111] border border-white/6" : "bg-white text-black"} p-8 md:p-9 rounded-[2rem] w-full sm:w-[260px] md:w-[272px] min-h-[250px] md:min-h-[272px] flex flex-col justify-between shadow-2xl overflow-hidden ${i === 1 ? "lg:translate-y-10" : ""}`}
                        whileHover={{ y: -6, boxShadow: "0 24px 60px -10px rgba(247,6,112,0.22)" }}
                        transition={{ duration: 0.28 }}>
                        <div>
                          <h3 className={`text-[1.7rem] md:text-[2.05rem] font-bold mb-3 leading-[0.95] break-words max-w-[10ch] ${c.dark ? "text-white" : "text-black"}`}>{c.title}</h3>
                          <p className={`text-xs md:text-[13px] leading-relaxed max-w-[22ch] ${c.dark ? "text-white/35" : "text-black/45"}`}>{c.desc}</p>
                        </div>
                        <div className="w-10 h-10 bg-[#F70670] rounded-full flex items-center justify-center text-white self-end">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Bottom big text */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                  variants={staggerD2} className="pt-36 pb-20 flex justify-end">
                  <div className="max-w-4xl text-right">
                    <motion.h2 variants={fadeUp}
                      className="text-4xl md:text-7xl lg:text-[7rem] font-display font-black leading-[0.88] tracking-tighter">
                      <span className="block text-white">{t("portfolio.transform.title1")}</span>
                      <span className="block text-[#F70670]">{t("portfolio.transform.title2")}</span>
                      <span className="block text-white">{t("portfolio.transform.title3")}</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="mt-6 text-white/35 max-w-sm ml-auto text-sm leading-relaxed text-right">
                      {t("portfolio.transform.desc")}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
              </div>

              {/* Ticker between scenes — no divider line, just motion */}
              <Marquee items={ticker} />

              {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  SCENE 2 — SERVICES & IMPACT
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
              <div className={`relative w-full flex flex-col ${SP} pt-24 pb-0`}>
              <Tag n="02" label="Services" />

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                variants={stagger} className="flex flex-col items-center text-center mb-16">
                <motion.h2 variants={fadeUp}
                  className="text-4xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-12">
                  <span className="text-white">{t("portfolio.nextgen.title1")} </span>
                  <span className="text-[#F70670]">{t("portfolio.nextgen.title2")}</span>
                  <br />
                  <span className="text-white">{t("portfolio.nextgen.title3")}</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  {[
                    { key: "uiux",   pink: false, rounding: "lg:rounded-l-[3.5rem] lg:rounded-r-2xl" },
                    { key: "brand",  pink: true,  rounding: "lg:rounded-2xl" },
                    { key: "web",    pink: false,  rounding: "lg:rounded-2xl" },
                    { key: "motion", pink: false,  rounding: "lg:rounded-r-[3.5rem] lg:rounded-l-2xl" },
                  ].map(({ key, pink, rounding }) => (
                    <motion.div key={key} variants={fadeUp}
                      className={`${pink ? "bg-[#F70670] text-white" : "bg-white text-black"} p-8 rounded-3xl ${rounding} flex flex-col text-left h-[260px] relative overflow-hidden`}
                      whileHover={{ y: -4 }} transition={{ duration: 0.28 }}>
                      {pink && <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />}
                      <h3 className={`text-xl font-bold mb-3 leading-tight whitespace-pre-line relative z-10 ${pink ? "text-white" : "text-black"}`}>
                        {t(`portfolio.services.${key}.title`)}
                      </h3>
                      <p className={`text-sm leading-relaxed relative z-10 ${pink ? "text-white/75" : "text-black/50"}`}>
                        {t(`portfolio.services.${key}.desc`)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Impact data */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                variants={stagger} className="flex flex-col lg:flex-row items-start justify-between gap-16 mt-28 pb-24">
                <div className="flex-1 max-w-xl">
                  <motion.h2 variants={fadeUp}
                    className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-[0.9] tracking-tighter mb-10">
                    <span className="block text-white">{t("portfolio.data.title1")}</span>
                    <span className="block text-white">{t("portfolio.data.title2")}</span>
                    <span className="block text-[#F70670]">{t("portfolio.data.title3")}</span>
                  </motion.h2>
                  <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
                    {["UI/UX Design", "Brand Identity", "Web Dev", "Motion Graphics"].map((tag, i) => (
                      <div key={i}
                        className={`${i === 2 ? "bg-[#F70670] text-white" : "border border-white/12 text-white/40 hover:text-white hover:border-white/30"} rounded-full py-3 px-5 text-center text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer`}>
                        {tag}
                      </div>
                    ))}
                  </motion.div>
                </div>

                <motion.div variants={fadeUp} className="flex-1 w-full min-w-0">
                  <div ref={impactRef} className="flex gap-4 overflow-x-auto pt-10 pb-14 px-6 -mx-6 snap-x snap-mandatory cursor-grab"
                    style={{ scrollbarWidth: "none" }}>
                    {[
                      { title: t("portfolio.data.card1.title"), desc: t("portfolio.data.card1.desc"),
                        stat: <div className="grid grid-cols-2 gap-3 mt-4"><div><div className="text-[#F70670] text-3xl font-bold">3x</div><div className="text-[9px] font-bold leading-tight mt-1">{t("portfolio.data.card1.stat1")}</div></div><div><div className="text-[#F70670] text-3xl font-bold">+65%</div><div className="text-[9px] font-bold leading-tight mt-1">{t("portfolio.data.card1.stat2")}</div></div></div> },
                      { title: t("portfolio.data.card2.title"), desc: t("portfolio.data.card2.desc"), stat: <div className="text-[#F70670] text-4xl font-display font-black mt-4 leading-tight">Рефе-<br/>ренсы<br/>2026</div> },
                      { title: t("portfolio.data.card3.title"), desc: t("portfolio.data.card3.desc"), stat: <div className="text-[#F70670] text-5xl font-display font-black mt-4">98%</div> },
                      { title: t("portfolio.data.card4.title"), desc: t("portfolio.data.card4.desc"), stat: <div className="text-[#F70670] text-3xl font-display font-black mt-4 leading-tight">Более десяти</div> },
                      { title: t("portfolio.data.card5.title"), desc: t("portfolio.data.card5.desc"), stat: <div className="text-[#F70670] text-5xl font-display font-black mt-4">24</div> },
                      { title: t("portfolio.data.card6.title"), desc: t("portfolio.data.card6.desc"), stat: <div className="text-[#F70670] text-4xl font-display font-black mt-4">Behance</div> },
                    ].map((card, idx) => (
                      <motion.div key={idx}
                        className="w-[230px] md:w-[250px] h-[320px] md:h-[350px] bg-white text-black p-6 rounded-[2rem] snap-start flex-shrink-0 flex flex-col justify-between"
                        whileHover={{ y: -8, boxShadow: "0 20px 40px -8px rgba(247,6,112,0.15), 0 0 20px rgba(247,6,112,0.1)" }}
                        transition={{ duration: 0.25 }}>
                        <div>
                          <h3 className="text-lg font-bold mb-2 leading-tight">{card.title}</h3>
                          <p className="text-black/50 text-xs leading-relaxed">{card.desc}</p>
                        </div>
                        {card.stat}
                      </motion.div>
                    ))}
                  </div>
                  <motion.div variants={fadeUp} className="flex gap-3 mt-4 justify-center md:justify-start">
                    <button onClick={() => scrollImpact("left")}
                      className="w-12 h-12 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                      aria-label="Scroll left"><ChevronLeft size={20} /></button>
                    <button onClick={() => scrollImpact("right")}
                      className="w-12 h-12 rounded-full bg-[#F70670] flex items-center justify-center text-white hover:bg-white hover:text-[#F70670] transition-all duration-300"
                      aria-label="Scroll right"><ChevronRight size={20} /></button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            <Marquee items={["For whom", "Our clients", "Who we serve", "Audience", "Partners"]} />

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                SCENE 3 — WHO WE SERVE
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={stagger} className={`relative w-full flex flex-col ${SP} pt-24 pb-24`}>
              <Tag n="03" label="For Whom" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
                <motion.h2 variants={fadeUp}
                  className="text-4xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter">
                  <span className="block text-white">{t("portfolio.who.title1")}</span>
                  <span className="block text-white">{t("portfolio.who.title2")}</span>
                </motion.h2>
                <motion.h3 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-white/50 max-w-sm leading-tight whitespace-pre-line">
                  {t("portfolio.who.subtitle")}
                </motion.h3>
              </div>

              {/* Desktop zigzag */}
              <div className="relative z-10 w-full max-w-6xl mx-auto hidden md:grid grid-cols-12 gap-x-6 gap-y-8">
                {[
                  { col: "col-start-4 col-span-3", bg: "bg-white", num: "text-[#F70670]", text: "text-black", content: t("portfolio.who.card1") },
                  { col: "col-start-7 col-span-5", bg: "bg-gradient-to-br from-[#F70670] via-[#ff0055] to-[#9B0040]", num: "text-white", text: "text-white",
                    content: t("portfolio.who.card2.title"),
                    extra: <div className="absolute top-8 right-8 text-white/70 text-xs max-w-[200px] leading-relaxed text-right z-10">{t("portfolio.who.card2.desc")}</div>
                  },
                  { col: "col-start-2 col-span-3", bg: "bg-gradient-to-br from-[#ff0055] to-[#F70670]", num: "text-white", text: "text-white", content: t("portfolio.who.card3") },
                  { col: "col-start-6 col-span-3", bg: "bg-[#0c0c0c] border border-white/5", num: "text-[#F70670]", text: "text-white", content: t("portfolio.who.card4") },
                  { col: "col-start-4 col-span-3", bg: "bg-white", num: "text-[#F70670]", text: "text-black", content: t("portfolio.who.card5") },
                  { col: "col-start-8 col-span-3", bg: "bg-[#0c0c0c] border border-white/5", num: "text-[#F70670]", text: "text-white", content: t("portfolio.who.card6") },
                ].map((c, i) => (
                  <motion.div key={i} variants={fadeUp}
                    className={`${c.col} aspect-square ${c.bg} rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl z-10 relative overflow-hidden`}
                    whileHover={{ y: -6 }} transition={{ duration: 0.28 }}>
                    {c.extra}
                    <div className={`text-5xl font-display font-medium ${c.num} relative z-10`}>0{i + 1}</div>
                    <div className={`font-bold text-xl leading-tight whitespace-pre-line ${c.text} relative z-10`}>{c.content}</div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-5 md:hidden">
                {[
                  { bg: "bg-white", num: "text-[#F70670]", text: "text-black", content: t("portfolio.who.card1") },
                  { bg: "bg-gradient-to-br from-[#F70670] to-[#9B0040]", num: "text-white", text: "text-white", content: t("portfolio.who.card2.title"), sub: t("portfolio.who.card2.desc") },
                  { bg: "bg-gradient-to-br from-[#ff0055] to-[#F70670]", num: "text-white", text: "text-white", content: t("portfolio.who.card3") },
                  { bg: "bg-[#0c0c0c] border border-white/5", num: "text-[#F70670]", text: "text-white", content: t("portfolio.who.card4") },
                  { bg: "bg-white", num: "text-[#F70670]", text: "text-black", content: t("portfolio.who.card5") },
                  { bg: "bg-[#0c0c0c] border border-white/5", num: "text-[#F70670]", text: "text-white", content: t("portfolio.who.card6") },
                ].map((c, i) => (
                  <motion.div key={i} variants={fadeUp}
                    className={`w-full rounded-[2rem] p-8 flex flex-col justify-between min-h-[200px] ${c.bg}`}>
                    <div className={`text-4xl font-display font-medium ${c.num}`}>0{i + 1}</div>
                    {"sub" in c && <p className="text-white/65 text-xs leading-relaxed my-3">{(c as any).sub}</p>}
                    <div className={`font-bold text-xl leading-tight whitespace-pre-line ${c.text}`}>{c.content}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <Marquee items={["Selected Work", "Case Studies", "Projects", "Portfolio", "Our Work"]} />

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                SCENE 4 — WORK / CAROUSEL
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={stagger} className={`relative w-full flex flex-col ${SP} pt-24 pb-24 overflow-hidden`}>
              <Tag n="04" label="Work" />

              <div className="relative z-10 flex flex-col items-center mb-6 text-center">
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                  <div className="w-5 h-[1px] bg-[#F70670]" />
                  <span className="text-[10px] font-bold tracking-[0.45em] uppercase text-white/28">Selected Projects</span>
                </motion.div>
                <motion.h2 variants={fadeUp}
                  className="text-4xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter">
                  <span className="block text-white">{t("portfolio.work.title1")}</span>
                  <span className="block">
                    <span className="text-[#F70670]">{t("portfolio.work.title2")} </span>
                    <span className="text-white">{t("portfolio.work.title3")}</span>
                  </span>
                </motion.h2>
              </div>

              <Carousel projects={projects} />
            </motion.div>

            <Marquee items={["Creatives", "Showreel", "Motion", "Brand", "Mockups"]} />

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                SCENE 5 — CREATIVES + VIDEO
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <div className={`relative w-full flex flex-col ${SP} pt-24 pb-24`}>
              <Tag n="05" label="Showreel" />

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
                className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12 w-full">
                <motion.h2 variants={fadeUp}
                  className="text-4xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter">
                  <span className="block">
                    <span className="text-white">{t("portfolio.creatives.title1")} </span>
                    <span className="text-[#F70670]">{t("portfolio.creatives.title2")}</span>
                  </span>
                  <span className="block">
                    <span className="text-[#F70670]">{t("portfolio.creatives.title3")} </span>
                    <span className="text-white">{t("portfolio.creatives.title4")}</span>
                  </span>
                </motion.h2>

                <motion.button variants={fadeUp} onClick={() => navigate("/pricing")}
                  className="group bg-white text-black font-bold py-4 px-10 rounded-full uppercase tracking-wider text-sm shadow-xl shrink-0 flex items-center gap-2 hover:bg-[#F70670] hover:text-white transition-colors duration-300">
                  {t("portfolio.consultation")} <ArrowUpRight size={15} />
                </motion.button>
              </motion.div>

              {/* The video — background removed via mix-blend-mode:screen and filter */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="relative z-10 w-full max-w-[1200px] mx-auto mt-12 md:mt-20 flex justify-center"
              style={{ mixBlendMode: "screen" }}>
              <div
                className="absolute left-1/2 top-1/2 h-[42%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-45"
                style={{ background: "radial-gradient(circle, rgba(247,6,112,0.16) 0%, rgba(139,92,246,0.1) 38%, rgba(0,0,0,0) 78%)" }}
              />
              <div
                className="relative z-10 w-full aspect-[16/10] md:aspect-[16/9]"
                style={{
                  maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
                  WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
                }}
              >
                <video
                  src="/mockups.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover scale-[1.22] md:scale-[1.12]"
                  style={{
                    objectPosition: "center center",
                    filter: "contrast(1.2) brightness(0.9)",
                  }}
                />
              </div>
            </motion.div>
            </div>

            <Marquee items={["Services", "What we do", "Capabilities", "Expertise", "Craft"]} />

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                SCENE 6 — SERVICES CARDS
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="pt-24 md:pt-32 pb-10 md:pb-14 flex items-center justify-center relative z-10 px-4 md:px-12">

              <div className="w-full max-w-[1200px] mx-auto rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 overflow-hidden relative"
                style={{
                  background: "linear-gradient(180deg, rgba(11,9,16,0.76) 0%, rgba(7,6,12,0.88) 100%)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.03)",
                }}>
                <Tag n="06" label="Services" />

                <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                  <h2 className="text-4xl md:text-7xl font-display font-bold leading-[0.9] tracking-tight">
                    <span className="text-white block">{t("portfolio.services1")}</span>
                    <span className="text-[#F70670] block mt-2">{t("portfolio.services2")}</span>
                  </h2>
                  <div className="flex gap-3 shrink-0">
                    <button onClick={() => scroll("left")}
                      className="w-14 h-14 rounded-full bg-white/6 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                      aria-label="Scroll left"><ChevronLeft size={22} /></button>
                    <button onClick={() => scroll("right")}
                      className="w-14 h-14 rounded-full bg-[#F70670] flex items-center justify-center text-white hover:bg-white hover:text-[#F70670] transition-all duration-300"
                      aria-label="Scroll right"><ChevronRight size={22} /></button>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} ref={svcRef}
                  className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 md:mx-0 md:px-0"
                  style={{ scrollbarWidth: "none" }}>
                  {services.map((s, idx) => (
                    <motion.div key={idx}
                      className="shrink-0 w-[260px] md:w-[290px] rounded-3xl p-4 snap-start border border-white/4 hover:border-[#F70670]/20 transition-colors duration-300 group cursor-pointer"
                      style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)" }}
                      whileHover={{ y: -5 }} transition={{ duration: 0.25 }}>
                      <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-5 relative bg-black">
                        <img src={s.img} alt={s.title} loading="lazy" decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          style={{ mixBlendMode: "screen" }}
                        />
                      </div>
                      <div className="px-2 pb-2">
                        <p className="text-[#F70670] text-[9px] font-bold uppercase tracking-[0.3em] mb-2">{s.cat}</p>
                        <h3 className="text-white text-xl font-bold underline decoration-white/18 underline-offset-4 group-hover:decoration-white/50 transition-colors leading-tight">
                          {s.title}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

              </div>
            </motion.div>

            <div className="relative">

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                SCENE 7 — START A PROJECT
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <div className="relative w-full h-[80vh] overflow-hidden -mt-20 md:-mt-24">
              <div className="absolute inset-x-0 top-7 md:top-5 z-[3]">
                <Marquee items={[t("portfolio.startProject"), t("portfolio.startProject"), t("portfolio.startProject"), t("portfolio.startProject"), t("portfolio.startProject")]} />
              </div>
              <Tag n="07" label={t("portfolio.startProject")} />
              <Scene7 label={t("portfolio.startProject")} />
            </div>
            </div>
          </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
