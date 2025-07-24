import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Zap, Star, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlayerData } from '@/hooks/usePlayerData';

const HeroSection = ({ playerData }) => {
  const { getRankColor, getRankGlow } = usePlayerData();
  const particlesRef = useRef();

  useEffect(() => {
    const createParticle = () => {
      if (!particlesRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 4 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      
      particlesRef.current.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  const scrollToQuests = () => {
    const questsSection = document.getElementById('quests');
    if (questsSection) {
      questsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const progressPercentage = (playerData.currentXP / playerData.nextLevelXP) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500/10 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start"
          >
             <div className="relative w-96 h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full blur-xl opacity-70 animate-pulse" />
                <img  alt="Photo de MABIALA Euloge Junior" className="relative w-full h-full object-cover rounded-full border-4 border-slate-800 shadow-2xl" src="https://images.unsplash.com/photo-1492283394804-2891416bc76e" />
             </div>
          </motion.div>

          {/* Right Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Rank Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-block"
            >
              <div className={`glass-effect rounded-2xl px-6 py-3 ${getRankGlow(playerData.rank)} inline-flex items-center gap-3`}>
                <Star className={`w-6 h-6 ${getRankColor(playerData.rank)}`} />
                <span className={`font-orbitron font-bold text-2xl ${getRankColor(playerData.rank)}`}>
                  RANG {playerData.rank}
                </span>
              </div>
            </motion.div>

            {/* Name & Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="font-orbitron font-black text-5xl lg:text-7xl glow-text"
              >
                {playerData.name}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-xl lg:text-2xl text-cyan-300 font-medium"
              >
                {playerData.title}
              </motion.p>
            </div>

            {/* Level & XP */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <Zap className="w-8 h-8 text-amber-400" />
                <div>
                  <p className="text-3xl font-bold font-orbitron">NIVEAU {playerData.level}</p>
                  <p className="text-gray-400">
                    {playerData.currentXP.toLocaleString()} / {playerData.nextLevelXP.toLocaleString()} XP
                  </p>
                </div>
              </div>
              
              {/* XP Progress Bar */}
              <div className="relative">
                <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 2, delay: 1.3 }}
                    className="h-full progress-bar rounded-full"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white drop-shadow-lg">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                onClick={scrollToQuests}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 glow-border"
              >
                Commencer ma Quête
                <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
              </Button>
               <a href="/CV_Mabiala_2025.pdf" download>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto glass-effect border-white/20 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Télécharger CV
                  <Download className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-white/60 animate-bounce" />
      </motion.div>
    </div>
  );
};

export default HeroSection;