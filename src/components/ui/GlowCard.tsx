import { motion } from "framer-motion";
import { useState, useRef, MouseEvent, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

interface GlowCardProps {
  title: string;
  desc: string;
}

export function GlowCard({ title, desc }: GlowCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 200, y: 200 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({ x: rect.width / 2, y: rect.height / 2 });
    }
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-[2rem] overflow-hidden group border border-white/10 bg-[#111111] h-full"
    >
      {/* Ambient Multi-Color Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-100 pointer-events-none">
        {/* Dark Grey */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, -20, 0],
            y: [0, -40, 20, 0],
            rotate: [0, 180, 360],
            borderRadius: ["40% 60% 70% 30%", "30% 70% 50% 50%", "60% 40% 30% 70%", "40% 60% 70% 30%"]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-[#2a2a2a] blur-[50px]"
        />
        {/* Dark Pink */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 30, 0],
            y: [0, 50, -30, 0],
            rotate: [360, 180, 0],
            borderRadius: ["60% 40% 30% 70%", "40% 60% 70% 30%", "30% 70% 50% 50%", "60% 40% 30% 70%"]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] -right-[20%] w-[90%] h-[90%] bg-[#80002a] blur-[60px] opacity-90"
        />
        {/* Deep Pink */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 40, -40, 0],
            y: [0, 30, -50, 0],
            rotate: [0, -180, -360],
            borderRadius: ["30% 70% 50% 50%", "60% 40% 30% 70%", "40% 60% 70% 30%", "30% 70% 50% 50%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[90%] h-[90%] bg-[#ff0055] blur-[70px]"
        />
      </div>

      {/* Cursor Follower Light (Light Pink) */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.5,
        }}
        style={{ zIndex: 5 }}
      >
        <motion.div
          animate={{
            opacity: isHovered ? [0.8, 1, 0.8] : [0.4, 0.6, 0.4],
            scale: isHovered ? [1, 1.1, 1] : [0.9, 1, 0.9],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(255, 179, 198, 0.25) 0%, rgba(255, 0, 85, 0.1) 40%, transparent 60%)",
            borderRadius: "50%",
            mixBlendMode: "screen"
          }}
        />
      </motion.div>
      
      {/* Glass layer to diffuse the light and blend */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[40px] z-10" />

      {/* Content */}
      <div className="relative z-20 p-8 h-full flex flex-col">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 backdrop-blur-md">
          <CheckCircle2 className="w-6 h-6 text-white transition-colors duration-500" />
        </div>
        <h3 className="text-xl font-display font-bold mb-3 text-white transition-colors duration-500">{title}</h3>
        <p className="text-white/70 font-medium leading-relaxed transition-colors duration-500">{desc}</p>
      </div>
    </div>
  );
}
