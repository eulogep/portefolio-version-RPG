
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Avatar3D = () => {
  const avatarRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!avatarRef.current) return;
      
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      
      const rotateX = deltaY * -10;
      const rotateY = deltaX * 10;
      
      avatarRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      if (!avatarRef.current) return;
      avatarRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, rotateY: -180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
      className="relative"
    >
      <div
        ref={avatarRef}
        className="w-80 h-80 lg:w-96 lg:h-96 relative transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Main Avatar Container */}
        <div className="absolute inset-0 glass-effect rounded-3xl overflow-hidden glow-border">
          {/* Avatar Image */}
          <div className="absolute inset-4 rounded-2xl overflow-hidden">
            <img  
              alt="Avatar 3D du développeur en costume professionnel"
              className="w-full h-full object-cover"
             src="https://images.unsplash.com/photo-1603969409447-ba86143a03f6" />
          </div>
          
          {/* Holographic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 rounded-3xl" />
          
          {/* Scan Lines Effect */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                style={{ top: `${i * 5}%` }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleX: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full blur-sm"
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-500 rounded-full blur-sm"
          animate={{
            y: [10, -10, 10],
            x: [5, -5, 5],
            scale: [1.2, 1, 1.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Energy Ring */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-purple-500/50"
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>
    </motion.div>
  );
};

export default Avatar3D;
