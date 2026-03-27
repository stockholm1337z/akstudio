import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const PROJECT_CASES: Record<string, {
  title: string;
  category: string;
  summary: string;
  accent: string;
}> = {
  "industrial-corporate-website": {
    title: "Промышленный корпоративный сайт",
    category: "Corporate / Landing",
    summary: "Заготовка страницы кейса для промышленного проекта. Здесь позже можно будет показать задачу, процесс, визуальные решения и финальный результат.",
    accent: "Надёжность, масштаб и сильная деловая подача.",
  },
  "biotech-platform": {
    title: "Биотехнологическая платформа",
    category: "Biotech / Digital Product",
    summary: "Временная страница кейса для технологического проекта. Пока здесь просто каркас, чтобы работала логика перехода из карусели.",
    accent: "Наука, инновации и визуальный акцент на доверии.",
  },
  "ux-ui-portfolio": {
    title: "UX/UI дизайн-портфолио",
    category: "Portfolio / Experience",
    summary: "Черновик страницы кейса. Позже тут можно разложить архитектуру экранов, UX-логику, анимации и итоговую презентацию проекта.",
    accent: "Минимализм, ритм и сильная визуальная композиция.",
  },
  "cybersecurity-for-business": {
    title: "Кибербезопасность для бизнеса",
    category: "Security / Landing",
    summary: "Техническая заготовка под полноценный кейс. Пока здесь декоративный контент, чтобы у каждой карточки в карусели была своя отдельная страница.",
    accent: "Технологичный тон, структура и ощущение контроля.",
  },
  "digital-creative-studio": {
    title: "Цифровая креативная студия",
    category: "Agency / Showcase",
    summary: "Временное наполнение для страницы проекта. Здесь позже можно будет спокойно заменить блоки на реальные тексты, цифры, экраны и разбор решений.",
    accent: "Креативная подача, динамика и яркий характер бренда.",
  },
};

export function ProjectCase() {
  const { slug } = useParams();
  const project = slug ? PROJECT_CASES[slug] : undefined;

  if (!project) {
    return (
      <div className="relative z-10 min-h-screen px-6 pb-20 pt-36 text-white">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-sm">
          <div className="text-sm uppercase tracking-[0.35em] text-white/35">Project</div>
          <h1 className="mt-6 text-4xl font-display font-black tracking-tight md:text-6xl">Кейс не найден</h1>
          <p className="mt-6 max-w-2xl text-white/60">
            Для этого проекта пока нет отдельной страницы, но механизм маршрута уже работает.
          </p>
          <Link
            to="/portfolio"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#F70670] px-7 py-4 text-sm font-bold uppercase tracking-[0.24em] text-white transition-transform duration-300 hover:scale-[1.03]"
          >
            <ArrowLeft size={16} />
            Вернуться в портфолио
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen overflow-hidden px-6 pb-24 pt-32 text-white">
      <div className="absolute inset-0 pointer-events-none opacity-80">
        <div className="absolute left-[10%] top-[10%] h-64 w-64 rounded-full bg-[#F70670]/15 blur-3xl" />
        <div className="absolute bottom-[12%] right-[8%] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-bold uppercase tracking-[0.28em] text-white/75 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
        >
          <ArrowLeft size={15} />
          Назад к работам
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="rounded-[2.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8 md:p-12">
            <div className="text-[11px] uppercase tracking-[0.45em] text-[#F70670]">{project.category}</div>
            <h1 className="mt-6 max-w-4xl text-4xl font-display font-black leading-[0.9] tracking-tight md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/68 md:text-lg">
              {project.summary}
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {["Research pulse", "Visual direction", "Launch flow"].map((item, index) => (
                <div
                  key={item}
                  className="rounded-[1.7rem] border border-white/10 bg-black/20 p-5"
                >
                  <div className="text-[10px] uppercase tracking-[0.34em] text-white/35">Block 0{index + 1}</div>
                  <div className="mt-4 text-lg font-bold text-white">{item}</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    Временный текст для демонстрации структуры будущего кейса.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(247,6,112,0.22),rgba(95,0,42,0.22))] p-8">
              <div className="text-[10px] uppercase tracking-[0.34em] text-white/45">Accent</div>
              <p className="mt-6 text-2xl font-bold leading-tight text-white">{project.accent}</p>
            </div>

            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.34em] text-white/45">Mock content</div>
                <ArrowUpRight className="text-[#F70670]" size={18} />
              </div>
              <div className="mt-6 aspect-[4/5] rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] p-6">
                <div className="h-full rounded-[1.5rem] border border-dashed border-white/15 bg-black/20 p-6">
                  <div className="text-sm uppercase tracking-[0.28em] text-white/35">Placeholder</div>
                  <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
                    Здесь может быть обложка проекта, галерея экранов, статистика, видео, блоки процесса или любые другие материалы кейса.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
