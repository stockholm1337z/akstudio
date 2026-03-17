import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronUp, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import React from "react";

// Types
type Option = {
  id: string;
  label: string;
  desc?: string;
  price: number;
};

type Section = {
  id: string;
  title: string;
  options: Option[];
  type: "radio" | "checkbox";
};

const configuratorData: Section[] = [
  {
    id: "architecture",
    title: "Проект архитектура",
    type: "radio",
    options: [
      { id: "landing", label: "Landing structure", desc: "Фокусный сайт для запуска продукта или сбора лидов.", price: 15000 },
      { id: "multipage", label: "Multi-page architecture", desc: "Многостраничный сайт с продуманной навигацией.", price: 30000 },
      { id: "platform", label: "Digital platform core", desc: "Сложная платформа с личными кабинетами и дашбордами.", price: 50000 },
    ]
  },
  {
    id: "engineering",
    title: "Инженерный арт",
    type: "checkbox",
    options: [
      { id: "react", label: "React / Next.js", desc: "Гибкая архитектура с современными технологиями", price: 10000 },
      { id: "api", label: "API Integrations", desc: "Подключение сторонних сервисов и баз данных", price: 5000 },
    ]
  },
  {
    id: "style",
    title: "Interface Style",
    type: "checkbox",
    options: [
      { id: "minimal", label: "Minimal", desc: "Чистый минималистичный интерфейс, максимум воздуха и фокус на контенте", price: 0 },
      { id: "neon", label: "Neon Digital", desc: "Тёмный интерфейс с неоновыми акцентами и технологичной атмосферой", price: 0 },
      { id: "tech", label: "Tech Interface", desc: "Интерфейс в стиле технологических систем и цифровых панелей", price: 0 },
      { id: "glass", label: "Glass UI", desc: "Полупрозрачные слои, стеклянные поверхности и мягкое свечение", price: 0 },
      { id: "immersive", label: "Immersive", desc: "Интерфейс с глубокими сценами и эффектом погружения", price: 0 },
    ]
  },
  {
    id: "visual",
    title: "Визуальная система",
    type: "checkbox",
    options: [
      { id: "nature", label: "Nature UI / UX", desc: "Визуальный акцент на цифровую эстетику", price: 8000 },
      { id: "atomic", label: "Atomic design system", desc: "Масштабируемая система компонентов", price: 12000 },
      { id: "identity", label: "Visual identity layer", desc: "Уникальный брендинг и айдентика", price: 10000 },
    ]
  },
  {
    id: "motion",
    title: "Motion и сцены",
    type: "checkbox",
    options: [
      { id: "storytelling", label: "Motion storytelling", desc: "Повествование через плавные анимации", price: 10000 },
      { id: "scroll", label: "Interactive scroll scenes", desc: "Анимации, привязанные к скроллу", price: 5000 },
      { id: "intro", label: "Cinematic intro section", desc: "Эффектный первый экран с видео или 3D", price: 8000 },
      { id: "3d", label: "3D device showcase", desc: "Интерактивная демонстрация продукта в 3D", price: 15000 },
      { id: "data", label: "Visual data streams", desc: "Анимированная инфографика и графики", price: 7000 },
    ]
  },
  {
    id: "experimental",
    title: "Экспериментальные фишки",
    type: "checkbox",
    options: [
      { id: "webgl", label: "WebGL visual effects", desc: "Anti-boring интерфейс, моушн", price: 12000 },
      { id: "start", label: "Start project: Experimental", desc: "Нестандартные решения и смелые концепты", price: 5000 },
    ]
  }
];

const SectionCard = React.memo(function SectionCard({ section, expanded, onToggle, selected, onSelect }: { 
  section: Section, 
  expanded: boolean, 
  onToggle: (id: string) => void,
  selected: string[],
  onSelect: (sectionId: string, optId: string, type: "radio" | "checkbox") => void
}) {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-brand-pink/30 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(247,6,112,0.1)] transition-all duration-300">
      <div 
        className="flex justify-between items-center p-6 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => onToggle(section.id)}
      >
        <h3 className="text-xl font-display">{section.title}</h3>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-white/50" />
        ) : (
          <ChevronDown className="w-5 h-5 text-white/50" />
        )}
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6 space-y-3"
          >
            {section.options.map(opt => {
              const isSelected = selected.includes(opt.id);
              return (
                <div 
                  key={opt.id}
                  onClick={() => onSelect(section.id, opt.id, section.type)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                    isSelected 
                      ? 'border-brand-pink bg-brand-pink/10 shadow-[inset_0_0_20px_rgba(247,6,112,0.1)]' 
                      : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected ? 'border-brand-pink bg-brand-pink/20' : 'border-white/30 group-hover:border-white/50'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-brand-pink" />}
                    </div>
                    <div>
                      <div className={`font-medium mb-1 ${isSelected ? 'text-white' : 'text-white/80'}`}>
                        {opt.label}
                      </div>
                      {opt.desc && (
                        <div className="text-sm text-white/50 leading-relaxed">
                          {opt.desc}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export function Pricing() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({
    architecture: ["landing"],
    engineering: ["react"],
    style: ["neon"],
    visual: ["nature", "atomic", "identity"],
    motion: ["storytelling"],
    experimental: ["webgl"]
  });
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    architecture: true,
    engineering: true,
    style: true,
    visual: true,
    motion: true,
    experimental: true
  });

  const toggleSection = useCallback((id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleOption = useCallback((sectionId: string, optionId: string, type: "radio" | "checkbox") => {
    setSelectedOptions(prev => {
      const current = prev[sectionId] || [];
      if (type === "radio") {
        return { ...prev, [sectionId]: [optionId] };
      } else {
        if (current.includes(optionId)) {
          return { ...prev, [sectionId]: current.filter(id => id !== optionId) };
        } else {
          return { ...prev, [sectionId]: [...current, optionId] };
        }
      }
    });
  }, []);

  const total = useMemo(() => {
    let sum = 0;
    configuratorData.forEach(section => {
      const selected = selectedOptions[section.id] || [];
      section.options.forEach(opt => {
        if (selected.includes(opt.id)) {
          sum += opt.price;
        }
      });
    });
    return Math.round(sum);
  }, [selectedOptions]);

  const selectedItems = useMemo(() => {
    const items: { label: string }[] = [];
    configuratorData.forEach(section => {
      const selected = selectedOptions[section.id] || [];
      section.options.forEach(opt => {
        if (selected.includes(opt.id)) {
          items.push({ label: opt.label });
        }
      });
    });
    return items;
  }, [selectedOptions]);

  const complexityBars = useMemo(() => {
    const count = selectedItems.length;
    if (count >= 13) return 5;
    if (count >= 10) return 4;
    if (count >= 7) return 3;
    if (count >= 4) return 2;
    return 1;
  }, [selectedItems.length]);

  const selectedStyles = useMemo(() => {
    const styleSection = configuratorData.find(s => s.id === "style");
    if (!styleSection) return "Not selected";
    
    return (selectedOptions["style"] || []).map(id => 
      styleSection.options.find(o => o.id === id)?.label
    ).filter(Boolean).join(", ") || "Not selected";
  }, [selectedOptions]);

  const handleStartProject = () => {
    const configText = selectedItems.map(item => item.label).join(', ');
    const projectInfo = `Выбранная конфигурация:\n- Модули: ${configText}`;
    
    navigate('/about', { state: { projectInfo } });
  };

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 relative z-10 bg-[#05000A] text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: ["-10%", "10%", "-5%", "-10%"],
            y: ["-10%", "5%", "10%", "-10%"],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-brand-pink/20 rounded-full blur-[60px] md:blur-[120px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            x: ["10%", "-10%", "5%", "10%"],
            y: ["10%", "-5%", "-10%", "10%"],
            scale: [0.9, 1.1, 1, 0.9]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] md:w-[700px] md:h-[700px] bg-purple-600/20 rounded-full blur-[80px] md:blur-[150px] mix-blend-screen"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-pink/5 via-transparent to-transparent opacity-50"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Соберите цифровую архитектуру проекта
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Выбирайте модули и наблюдайте, как формируется ваша конфигурация.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Column 1 */}
          <div className="lg:col-span-4 space-y-6">
            {configuratorData.slice(0, 3).map(section => (
              <SectionCard 
                key={section.id}
                section={section} 
                expanded={expandedSections[section.id]}
                onToggle={toggleSection}
                selected={selectedOptions[section.id] || []}
                onSelect={toggleOption}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="lg:col-span-4 space-y-6">
            {configuratorData.slice(3, 6).map(section => (
              <SectionCard 
                key={section.id}
                section={section} 
                expanded={expandedSections[section.id]}
                onToggle={toggleSection}
                selected={selectedOptions[section.id] || []}
                onSelect={toggleOption}
              />
            ))}
          </div>

          {/* Column 3 - Summary */}
          <div className="lg:col-span-4">
            <div className="bg-black/40 backdrop-blur-xl border border-brand-pink/50 rounded-3xl p-8 shadow-[0_0_50px_rgba(247,6,112,0.15)] sticky top-32">
              <h2 className="text-2xl font-display mb-8">Ваша конфигурация</h2>
              
              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-brand-pink/30 [&::-webkit-scrollbar-thumb]:rounded-full">
                {selectedItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-pink/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-brand-pink" />
                    </div>
                    <span className="text-white/90 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/60 text-sm">Complexity level</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-4 h-2 rounded-sm ${i < complexityBars ? 'bg-brand-pink' : 'bg-white/20'}`} />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Interface Style</span>
                  <span className="text-white text-sm text-right max-w-[60%] truncate" title={selectedStyles}>{selectedStyles}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-8 text-center">
                <div className="text-white/60 text-sm mb-2">Estimated</div>
                <div className="text-4xl font-display font-bold mb-2">
                  ~ {total.toLocaleString('ru-RU')} ₽
                </div>
                <div className="text-white/40 text-xs">
                  Средний бюджет проектов: 40,000 - 90,000
                </div>
              </div>

              <button 
                onClick={handleStartProject}
                className="w-full py-4 rounded-full bg-gradient-to-r from-brand-pink to-purple-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(247,6,112,0.4)] transition-all duration-300"
              >
                Запустить проект
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
