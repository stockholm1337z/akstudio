import React, { useEffect, useRef } from 'react';

export const ParticleGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const particles: { x: number, y: number, color: string, targetAngle: number, currentAngle: number }[] = [];
    const spacing = 25; // Distance between particles
    const baseParticleLength = 2;

    // Colors for the gradient (from left to right)
    const colors = ['#1E3A8A', '#3B82F6', '#8B5CF6', '#F70670', '#F59E0B'];

    const initParticles = () => {
      particles.length = 0;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Create concentric circles
      const maxRadius = Math.max(width, height) / 1.5;
      const ringSpacing = 30;
      
      for (let r = ringSpacing; r < maxRadius; r += ringSpacing) {
        // Circumference of the ring
        const circumference = 2 * Math.PI * r;
        // Number of particles in this ring (spacing them out evenly)
        const numParticles = Math.floor(circumference / spacing);
        
        for (let i = 0; i < numParticles; i++) {
          const angle = (i / numParticles) * Math.PI * 2;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          
          // Determine color based on position (left to right gradient)
          const colorIndex = Math.floor((x / width) * colors.length);
          const color = colors[Math.max(0, Math.min(colorIndex, colors.length - 1))];
          
          particles.push({ x, y, color, targetAngle: 0, currentAngle: 0 });
        }
      }
    };

    initParticles();

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseIn = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseIn = true;
    };

    const handleMouseLeave = () => {
      isMouseIn = false;
    };

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Target angle points towards the mouse
        p.targetAngle = Math.atan2(dy, dx);

        // Smooth rotation
        let diff = p.targetAngle - p.currentAngle;
        // Normalize angle difference to -PI to PI
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        p.currentAngle += diff * 0.15;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.currentAngle);
        
        // Calculate length and opacity based on distance
        const maxDistance = 350;
        let intensity = 0;
        
        if (isMouseIn) {
          // Non-linear falloff for a smoother, more localized effect
          const normalizedDist = Math.min(distance / maxDistance, 1);
          intensity = Math.pow(1 - normalizedDist, 1.5);
        }
        
        // Skip drawing entirely if it's too far away
        if (intensity <= 0.01) {
          ctx.restore();
          return;
        }
        
        // Base length + extra length when mouse is near
        const currentLength = baseParticleLength + (intensity * 12);
        const thickness = 0.5 + (intensity * 1.5);
        
        ctx.beginPath();
        // Draw a teardrop/arrow shape
        ctx.moveTo(currentLength / 2, -thickness);
        ctx.lineTo(-currentLength / 2, 0); // Thin end pointing away
        ctx.lineTo(currentLength / 2, thickness); // Thick end pointing towards mouse
        ctx.closePath();
        
        ctx.fillStyle = p.color;
        
        // Opacity based entirely on intensity (invisible when far)
        const opacity = intensity * 0.8;
        ctx.globalAlpha = opacity;
        
        ctx.fill();
        
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};
