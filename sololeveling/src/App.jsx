import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import QuestsSection from '@/components/QuestsSection';
import InventorySection from '@/components/InventorySection';
import TimelineSection from '@/components/TimelineSection';
import ContactSection from '@/components/ContactSection';
import Navigation from '@/components/Navigation';
import { usePlayerData } from '@/hooks/usePlayerData';
import KimiChatBot from '@/components/KimiChatBot';

function App() {
  const { playerData, updatePlayerData } = usePlayerData();
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'stats', 'quests', 'inventory', 'timeline', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>SoloPortfolio - {playerData.name}</title>
        <meta name="description" content={`Portfolio RPG immersif de ${playerData.name}. Découvrez mon parcours, mes compétences et mes projets.`} />
      </Helmet>
      
      <div className="min-h-screen relative">
        <Navigation currentSection={currentSection} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <section id="hero">
            <HeroSection playerData={playerData} />
          </section>
          
          <section id="stats">
            <StatsSection playerData={playerData} />
          </section>
          
          <section id="quests">
            <QuestsSection playerData={playerData} updatePlayerData={updatePlayerData} />
          </section>
          
          <section id="inventory">
            <InventorySection playerData={playerData} />
          </section>
          
          <section id="timeline">
            <TimelineSection playerData={playerData} />
          </section>
          
          <section id="contact">
            <ContactSection />
          </section>
        </motion.div>
        
        <Toaster />
        <KimiChatBot />
      </div>
    </>
  );
}

export default App;