
import React from 'react';
import { motion } from 'framer-motion';

const FloatingShapes = () => {
  return (
    <div className="floating-shapes -z-10">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-shape"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}rem`,
            height: `${2 + Math.random() * 4}rem`,
            animationDelay: `${i * 2.5}s`,
            animationDuration: `${20 + Math.random() * 20}s`,
          }}
        >
          <div 
            className={`w-full h-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'} ${i % 3 === 0 ? 'rounded-full' : i % 3 === 1 ? 'rounded-2xl' : 'rounded-lg'}`} 
            style={{ transform: `rotate(${Math.random() * 360}deg)`}}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingShapes;