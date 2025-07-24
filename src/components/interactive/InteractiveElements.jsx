import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useAnimation } from 'framer-motion';
import { Sparkles, Zap, Star, Target } from 'lucide-react';

// Interactive Card with 3D tilt effect
export const InteractiveCard = ({ children, className = '', onInteract, intensity = 1 }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);
  const scale = useSpring(1, { stiffness: 300, damping: 30 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width * intensity);
    y.set((e.clientY - centerY) / rect.height * intensity);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const handleMouseEnter = () => {
    scale.set(1.02);
    if (onInteract) onInteract('hover');
  };

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ scale }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {children}
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
            transform: useTransform([x, y], ([xVal, yVal]) => 
              `translateX(${xVal * 100}px) translateY(${yVal * 100}px)`
            ),
          }}
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Interactive Button with pulse and glow effects
export const InteractiveButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '',
  icon: Icon
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const controls = useAnimation();
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
    secondary: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
    danger: 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const handleClick = async (e) => {
    if (disabled) return;
    
    setIsClicked(true);
    
    // Ripple effect animation
    await controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 }
    });
    
    if (onClick) onClick(e);
    
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      animate={controls}
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        boxShadow: disabled ? 'none' : '0 20px 40px rgba(0,0,0,0.3)',
      }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        relative overflow-hidden rounded-xl font-medium text-white
        transition-all duration-300 transform
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* Animated background gradient */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-white/20 to-transparent
        transform translate-x-[-100%] 
        ${isClicked ? 'animate-shimmer' : ''}
      `} />
      
      {/* Button content */}
      <div className="relative z-10 flex items-center gap-2">
        {Icon && <Icon size={20} />}
        {children}
      </div>
      
      {/* Pulse effect */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 bg-white rounded-xl"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  );
};

// Floating Action Button with magnetic effect
export const FloatingActionButton = ({ children, onClick, className = '', magneticRange = 50 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );
    
    if (distance < magneticRange) {
      const force = (magneticRange - distance) / magneticRange;
      setPosition({
        x: (e.clientX - centerX) * force * 0.3,
        y: (e.clientY - centerY) * force * 0.3,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      animate={{
        x: position.x,
        y: position.y,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={`
        fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600
        rounded-full shadow-lg flex items-center justify-center text-white
        hover:shadow-2xl transition-shadow duration-300 z-50
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

// Interactive Progress Ring
export const InteractiveProgressRing = ({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  color = '#3B82F6',
  showPercentage = true,
  children
}) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          style={{
            strokeDasharray,
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut"
          }}
        />
        
        {/* Glow effect */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth / 2}
          fill="transparent"
          strokeLinecap="round"
          style={{
            strokeDasharray,
            strokeDashoffset,
            filter: 'blur(3px)',
            opacity: 0.6,
          }}
          animate={{
            strokeDashoffset,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut"
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (showPercentage && (
          <span className="text-white font-bold text-lg">
            {Math.round(progress)}%
          </span>
        ))}
      </div>
    </div>
  );
};

// Interactive Skill Meter
export const InteractiveSkillMeter = ({ 
  skill, 
  level, 
  maxLevel = 100, 
  color = '#3B82F6',
  animated = true 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const progressPercentage = (level / maxLevel) * 100;

  return (
    <motion.div
      className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-white/10"
      whileHover={{ scale: 1.02, y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-white font-medium">{skill}</h4>
        <span className="text-gray-300 text-sm">{level}/{maxLevel}</span>
      </div>
      
      <div className="relative">
        {/* Background bar */}
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          {/* Progress bar */}
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            }}
            initial={{ width: 0 }}
            animate={{ width: animated ? `${progressPercentage}%` : `${progressPercentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Glow effect */}
          {isHovered && (
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${color}80, ${color}40)`,
                width: `${progressPercentage}%`,
                filter: 'blur(4px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>
        
        {/* Particle effects on hover */}
        {isHovered && (
          <div className="absolute -top-2 left-0 w-full h-7 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * progressPercentage}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-10, -30],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Interactive Holographic Effect
export const HolographicCard = ({ children, className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0.5, y: 0.5 })}
      className={`
        relative overflow-hidden rounded-xl border border-white/20
        bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-md
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
    >
      {/* Holographic gradient overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
            rgba(59, 130, 246, 0.3) 0%, 
            rgba(147, 51, 234, 0.2) 30%, 
            rgba(236, 72, 153, 0.1) 60%, 
            transparent 100%)`,
        }}
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Scanning line effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{
          y: [0, 200],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

// Interactive Particle Trail
export const ParticleTrail = ({ children, particleCount = 10, color = '#3B82F6' }) => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  const addParticle = (x, y) => {
    const newParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      life: 1,
    };
    
    setParticles(prev => [...prev.slice(-particleCount), newParticle]);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    addParticle(e.clientX - rect.left, e.clientY - rect.top);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({ ...p, life: p.life - 0.05 })).filter(p => p.life > 0));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative"
      onMouseMove={handleMouseMove}
    >
      {children}
      
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: color,
              left: particle.x,
              top: particle.y,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: particle.life,
              y: particle.y - 50,
            }}
            transition={{ duration: 1 }}
          />
        ))}
      </div>
    </div>
  );
};

export default {
  InteractiveCard,
  InteractiveButton,
  FloatingActionButton,
  InteractiveProgressRing,
  InteractiveSkillMeter,
  HolographicCard,
  ParticleTrail,
};