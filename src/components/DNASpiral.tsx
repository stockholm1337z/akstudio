import React, { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

export function DNASpiral() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const scrollRef = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      scrollRef.current = latest;
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      } else {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    window.addEventListener('resize', resize);
    resize();

    // DNA settings
    const numParticles = 800; // Increased from 300
    const radius = Math.min(width, height) * 0.35;
    const heightScale = height * 2;
    const frequency = 0.03;
    
    // Ambient particles
    const ambientParticles = Array.from({ length: 150 }).map(() => {
      const r = Math.random();
      let color = 'rgba(255, 255, 255, ALPHA)'; // White
      if (r > 0.6) color = 'rgba(247, 6, 112, ALPHA)'; // Deep Pink
      else if (r > 0.3) color = 'rgba(139, 92, 246, ALPHA)'; // Purple
      return {
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * 1000 - 500,
        speed: Math.random() * 0.5 + 0.1,
        size: Math.random() * 2 + 0.5,
        color
      };
    });

    // Time variable for continuous slow rotation
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // We want the spiral to rotate based on scroll + time
      time += 0.002;
      // Scroll offset amplifies the rotation
      const scrollOffset = scrollRef.current * Math.PI * 25;
      const rotation = time + scrollOffset;

      ctx.save();
      // Shift the spiral up so it looks like it's coming from the card
      ctx.translate(width / 2, height / 2 - height * 0.15);

      // Draw ambient particles
      ambientParticles.forEach(p => {
        p.y -= p.speed;
        if (p.y < -height) p.y = height;
        
        const perspective = 800 / (800 + p.z);
        const px = p.x * perspective;
        const py = p.y * perspective;
        const pSize = p.size * perspective;
        
        const alpha = Math.max(0, Math.min(1, (p.z + 500) / 1000)) * 0.5;
        
        ctx.beginPath();
        ctx.fillStyle = p.color.replace('ALPHA', alpha.toString());
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections first
      ctx.beginPath();
      // Gradient from pink to purple for connections
      const gradient = ctx.createLinearGradient(0, -heightScale/2, 0, heightScale/2);
      gradient.addColorStop(0, 'rgba(247, 6, 112, 0.2)'); // Pink
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0.2)'); // Purple
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;

      const points1: {x: number, y: number, z: number, yRatio: number}[] = [];
      const points2: {x: number, y: number, z: number, yRatio: number}[] = [];

      for (let i = 0; i < numParticles; i++) {
        // Center the spiral vertically
        const y = (i / numParticles - 0.5) * heightScale;
        const yRatio = i / numParticles; // 0 to 1
        
        // Add some wave to the radius to make it look more organic
        const currentRadius = radius + Math.sin(i * 0.05 + time * 3) * 30;
        
        const angle = i * frequency + rotation;
        
        // Helix 1
        const x1 = Math.cos(angle) * currentRadius;
        const z1 = Math.sin(angle) * currentRadius;
        
        // Helix 2 (offset by PI)
        const x2 = Math.cos(angle + Math.PI) * currentRadius;
        const z2 = Math.sin(angle + Math.PI) * currentRadius;

        // Apply perspective
        const perspective1 = 800 / (800 + z1);
        const perspective2 = 800 / (800 + z2);

        points1.push({ x: x1 * perspective1, y: y * perspective1, z: z1, yRatio });
        points2.push({ x: x2 * perspective2, y: y * perspective2, z: z2, yRatio });

        // Draw connecting rungs more frequently
        if (i % 4 === 0) {
          ctx.moveTo(x1 * perspective1, y * perspective1);
          ctx.lineTo(x2 * perspective2, y * perspective2);
        }
      }
      ctx.stroke();

      // Draw particles
      const drawParticles = (points: {x: number, y: number, z: number, yRatio: number}[], isWhite: boolean) => {
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          
          // Fade out particles that are further back
          const alpha = Math.max(0.1, (p.z + radius) / (radius * 2));
          const size = Math.max(0.5, ((p.z + radius) / (radius * 2)) * 3.5);

          let r, g, b;
          if (isWhite) {
            r = 255; g = 255; b = 255;
          } else {
            // Gradient from Pink (247, 6, 112) to Purple (139, 92, 246)
            r = Math.round(247 + (139 - 247) * p.yRatio);
            g = Math.round(6 + (92 - 6) * p.yRatio);
            b = Math.round(112 + (246 - 112) * p.yRatio);
          }

          const color = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          const glowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`;

          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
          
          // Add glow effect to more particles
          if (i % 3 === 0) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = glowColor;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      };

      // One strand is white, the other is a pink-to-purple gradient
      drawParticles(points1, true); // White strand
      drawParticles(points2, false); // Gradient strand

      ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
