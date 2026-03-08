import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const packages = [
  {
    name: "Лендинг",
    price: "от ₽10000",
    desc: "Идеально для запуска продукта, мероприятия или сбора лидов.",
    features: [
      "Уникальный премиум-дизайн",
      "Адаптивная верстка (React/Tailwind)",
      "Базовые анимации (Framer Motion)",
      "Интеграция форм заявки",
      "Базовая SEO-оптимизация"
    ],
    popular: false
  },
  {
    name: "Корпоративный сайт",
    price: "от ₽15000",
    desc: "Многостраничный сайт для полноценного представления компании.",
    features: [
      "До 10 уникальных страниц",
      "Сложные интерактивные элементы",
      "CMS для управления контентом",
      "Продвинутые анимации",
      "Оптимизация скорости загрузки",
      "Поддержка 1 месяц"
    ],
    popular: true
  },
  {
    name: "Frontend Разработка",
    price: "₽2000/час",
    desc: "Реализация вашего готового дизайна на современном стеке.",
    features: [
      "Pixel-perfect верстка",
      "React / Next.js / Vue",
      "Сложные WebGL/Canvas эффекты",
      "Интеграция с API",
      "Рефакторинг старого кода"
    ],
    popular: false
  }
];

export function Pricing() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Инвестиции в <span className="text-brand-pink">результат</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Прозрачное ценообразование. Вы платите за премиальное качество, соблюдение сроков и внимание к деталям.
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
                  Популярный выбор
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
                Выбрать тариф
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
