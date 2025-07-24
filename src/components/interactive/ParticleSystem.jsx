import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParticleSystem = ({ 
  particleCount = 150, 
  type = 'magic', 
  color = '#4F46E5',
  interactive = true,
  intensity = 'medium'
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles based on type
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(type, canvas.width, canvas.height));
      }
    };

    const createParticle = (particleType, width, height) => {
      const baseParticle = {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        life: 1,
        decay: Math.random() * 0.02 + 0.005,
        color: color,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
      };

      switch (particleType) {
        case 'magic':
          return {
            ...baseParticle,
            trail: [],
            sparkle: Math.random() > 0.7,
            pulse: Math.random() * Math.PI * 2,
            spiralRadius: Math.random() * 50 + 20,
            spiralSpeed: Math.random() * 0.02 + 0.01,
          };
        case 'code':
          return {
            ...baseParticle,
            char: String.fromCharCode(Math.random() * 93 + 33),
            binary: Math.random() > 0.5 ? '1' : '0',
            matrix: Math.random() > 0.8,
            glitch: Math.random() > 0.9,
          };
        case 'stars':
          return {
            ...baseParticle,
            twinkle: Math.random() * Math.PI * 2,
            brightness: Math.random(),
            constellation: Math.random() > 0.85,
          };
        case 'energy':
          return {
            ...baseParticle,
            energy: Math.random(),
            lightning: Math.random() > 0.95,
            charge: Math.random() > 0.5 ? 1 : -1,
          };
        default:
          return baseParticle;
      }
    };

    const updateParticle = (particle, deltaTime, mouseX, mouseY) => {
      // Mouse interaction
      if (interactive && isMouseOver) {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.speedX += (dx / distance) * force * 0.5;
          particle.speedY += (dy / distance) * force * 0.5;
        }
      }

      // Type-specific updates
      switch (type) {
        case 'magic':
          particle.pulse += 0.1;
          particle.angle += particle.spiralSpeed;
          particle.x += Math.cos(particle.angle) * 0.5 + particle.speedX;
          particle.y += Math.sin(particle.angle) * 0.5 + particle.speedY;
          
          if (particle.trail.length > 5) particle.trail.shift();
          particle.trail.push({ x: particle.x, y: particle.y, life: particle.life });
          break;
          
        case 'code':
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          if (Math.random() > 0.98) {
            particle.char = String.fromCharCode(Math.random() * 93 + 33);
          }
          break;
          
        case 'stars':
          particle.twinkle += 0.05;
          particle.x += particle.speedX * 0.1;
          particle.y += particle.speedY * 0.1;
          break;
          
        case 'energy':
          particle.x += particle.speedX + Math.sin(particle.angle) * 2;
          particle.y += particle.speedY + Math.cos(particle.angle) * 2;
          particle.angle += 0.1;
          particle.energy = Math.sin(Date.now() * 0.01 + particle.x * 0.01) * 0.5 + 0.5;
          break;
      }

      // Boundary wrapping
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Life cycle
      particle.life -= particle.decay;
      if (particle.life <= 0) {
        Object.assign(particle, createParticle(type, canvas.width, canvas.height));
      }
    };

    const drawParticle = (particle) => {
      const alpha = particle.life;
      
      switch (type) {
        case 'magic':
          // Draw trail
          particle.trail.forEach((point, index) => {
            const trailAlpha = (index / particle.trail.length) * alpha * 0.5;
            ctx.beginPath();
            ctx.arc(point.x, point.y, particle.size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `${color}${Math.floor(trailAlpha * 255).toString(16).padStart(2, '0')}`;
            ctx.fill();
          });
          
          // Main particle with glow
          const glowSize = particle.size + Math.sin(particle.pulse) * 2;
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, glowSize * 2
          );
          gradient.addColorStop(0, `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
          gradient.addColorStop(0.5, `${color}${Math.floor(alpha * 128).toString(16).padStart(2, '0')}`);
          gradient.addColorStop(1, `${color}00`);
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, glowSize * 2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Sparkle effect
          if (particle.sparkle) {
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.angle);
            ctx.strokeStyle = `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-particle.size * 2, 0);
            ctx.lineTo(particle.size * 2, 0);
            ctx.moveTo(0, -particle.size * 2);
            ctx.lineTo(0, particle.size * 2);
            ctx.stroke();
            ctx.restore();
          }
          break;
          
        case 'code':
          ctx.font = `${particle.size * 8}px 'Courier New', monospace`;
          ctx.fillStyle = `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.fillText(particle.matrix ? particle.binary : particle.char, particle.x, particle.y);
          
          if (particle.glitch) {
            ctx.fillStyle = `#ff0000${Math.floor(alpha * 128).toString(16).padStart(2, '0')}`;
            ctx.fillText(particle.char, particle.x + 2, particle.y + 2);
          }
          break;
          
        case 'stars':
          const brightness = Math.sin(particle.twinkle) * 0.5 + 0.5;
          const starAlpha = alpha * brightness;
          
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.angle);
          
          // Star shape
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5;
            const x = Math.cos(angle) * particle.size;
            const y = Math.sin(angle) * particle.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            
            const innerAngle = ((i + 0.5) * Math.PI * 2) / 5;
            const innerX = Math.cos(innerAngle) * particle.size * 0.5;
            const innerY = Math.sin(innerAngle) * particle.size * 0.5;
            ctx.lineTo(innerX, innerY);
          }
          ctx.closePath();
          ctx.fillStyle = `${color}${Math.floor(starAlpha * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
          ctx.restore();
          break;
          
        case 'energy':
          // Energy orb with electric effect
          const energyGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          energyGradient.addColorStop(0, `#ffffff${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
          energyGradient.addColorStop(0.3, `${color}${Math.floor(alpha * 200).toString(16).padStart(2, '0')}`);
          energyGradient.addColorStop(1, `${color}00`);
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = energyGradient;
          ctx.fill();
          
          // Lightning effect
          if (particle.lightning) {
            ctx.strokeStyle = `#ffffff${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = 0; i < 3; i++) {
              const angle = (i * Math.PI * 2) / 3;
              const startX = particle.x + Math.cos(angle) * particle.size;
              const startY = particle.y + Math.sin(angle) * particle.size;
              const endX = particle.x + Math.cos(angle) * particle.size * 4;
              const endY = particle.y + Math.sin(angle) * particle.size * 4;
              
              ctx.moveTo(startX, startY);
              ctx.lineTo(endX + Math.random() * 10 - 5, endY + Math.random() * 10 - 5);
            }
            ctx.stroke();
          }
          break;
      }
    };

    const animate = (currentTime) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        updateParticle(particle, 16, mouseRef.current.x, mouseRef.current.y);
        drawParticle(particle);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, type, color, interactive, intensity, isMouseOver]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      style={{ 
        mixBlendMode: type === 'energy' ? 'screen' : 'normal',
        filter: intensity === 'high' ? 'brightness(1.2) contrast(1.1)' : 'none'
      }}
    />
  );
};

export default ParticleSystem;