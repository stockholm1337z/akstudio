import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, MessageCircle, Send } from "lucide-react";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";

export function About() {
  const { t } = useLanguage();
  const location = useLocation();
  const formRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-15px", "15px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-15px", "15px"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (location.state?.projectInfo && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  const defaultProjectInfo = location.state?.projectInfo || "";
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    project: defaultProjectInfo,
  });
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    setFormData((current) => ({ ...current, project: defaultProjectInfo }));
  }, [defaultProjectInfo]);

  const handleChange = (field: "name" | "contact" | "project", value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessKey) {
      setSubmitState("error");
      setSubmitMessage("Web3Forms access key is missing. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file.");
      return;
    }

    setSubmitState("loading");
    setSubmitMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New request from the About page",
          from_name: "AK Studio Website",
          name: formData.name,
          email: formData.contact.includes("@") ? formData.contact : "",
          contact: formData.contact,
          message: formData.project,
          source: "About page",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send the form.");
      }

      setSubmitState("success");
      setSubmitMessage("The form has been sent successfully.");
      setFormData({
        name: "",
        contact: "",
        project: "",
      });
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
          
          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-20"
          >
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-8">
              {t('about.title1')} <span className="text-brand-pink">{t('about.title2')}</span>
            </h1>
            
            <div className="space-y-6 text-lg text-white/70 mb-12">
              <p>
                {t('about.desc1')}
              </p>
              <p>
                {t('about.desc2')}
              </p>
            </div>

            <h3 className="text-2xl font-display font-bold mb-6">{t('about.process.title')}</h3>
            <div className="space-y-6 mb-12">
              {[
                { step: "01", title: t('about.process.1.title'), desc: t('about.process.1.desc') },
                { step: "02", title: t('about.process.2.title'), desc: t('about.process.2.desc') },
                { step: "03", title: t('about.process.3.title'), desc: t('about.process.3.desc') },
                { step: "04", title: t('about.process.4.title'), desc: t('about.process.4.desc') }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="text-brand-pink font-mono font-bold text-xl">{item.step}</div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">{item.title}</h4>
                    <p className="text-white/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://t.me/reasonace1337" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#229ED9]/10 text-[#229ED9] border border-[#229ED9]/30 hover:bg-[#229ED9]/20 transition-colors font-bold">
                <MessageCircle className="w-5 h-5" />
                {t('about.contact.tg')}
              </a>
              <a href="mailto:alexey_kalyan@mail.ru" className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors font-bold">
                <Mail className="w-5 h-5" />
                alexey_kalyan@mail.ru
              </a>
            </div>
          </motion.div>

          {/* Right Column: Photo */}
          <div 
            className="relative flex flex-col justify-end items-center lg:items-end mt-12 lg:mt-0 min-h-[500px] lg:min-h-[600px] h-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1200 }}
          >
            {/* Background Photo */}
            <motion.div 
              style={{
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
              }}
              className="absolute inset-0 pointer-events-none z-0"
            >
              <div className="relative w-full h-full">
                {/* Glow behind photo */}
                <div className="absolute top-[40%] left-1/2 lg:left-[60%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-brand-pink/20 blur-[120px] rounded-full" />
                
                <img 
                  src="/profile.png" 
                  alt="Alexey Kalyan"
                  className="w-full h-full object-contain object-bottom lg:object-right-bottom opacity-90 drop-shadow-2xl"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section: Horizontal Contact Form */}
        <motion.div 
          ref={formRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-[#0A0A0A] border border-white/5 p-8 md:p-12 rounded-[2rem] w-full z-10 shadow-2xl mt-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2">
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">{t('about.form.title')}</h3>
              <p className="text-white/50 text-lg">{t('about.form.desc')}</p>
            </div>
            
            <div className="lg:col-span-3">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/50 mb-2">{t('about.form.nameLabel')}</label>
                    <input 
                      name="name"
                      type="text" 
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                      className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-brand-pink transition-colors"
                      placeholder={t('about.form.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/50 mb-2">{t('about.form.contactLabel')}</label>
                    <input 
                      name="contact"
                      type="text" 
                      value={formData.contact}
                      onChange={(e) => handleChange("contact", e.target.value)}
                      required
                      className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-brand-pink transition-colors"
                      placeholder={t('about.form.contactPlaceholder')}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <span className="bg-[#4A0024] text-white px-1.5 py-0.5 rounded-sm">{t('about.form.projectLabel')}</span>
                  </label>
                  <textarea 
                    name="project"
                    rows={4}
                    value={formData.project}
                    onChange={(e) => handleChange("project", e.target.value)}
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-brand-pink transition-colors resize-none"
                    placeholder={t('about.form.projectPlaceholder')}
                  />
                </div>
                {submitMessage && (
                  <p className={`text-sm ${submitState === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                    {submitMessage}
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitState === "loading"}
                    className="w-full md:w-auto md:px-12 flex items-center justify-center gap-2 bg-brand-pink text-white font-bold py-4 rounded-xl hover:bg-brand-pink/90 transition-colors shadow-[0_0_20px_rgba(247,6,112,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitState === "loading" ? "Sending..." : t('about.form.submit')} <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
