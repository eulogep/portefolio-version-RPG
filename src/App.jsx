
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import useDarkMode from '@/hooks/useDarkMode';
import useScrollHandler from '@/hooks/useScrollHandler';
import useCursorPosition from '@/hooks/useCursorPosition';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import BackToTopButton from '@/components/layout/BackToTopButton';
import FloatingShapes from '@/components/layout/FloatingShapes';
import CursorTrail from '@/components/layout/CursorTrail';

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const { scrollProgress, activeSection, scrollToSection } = useScrollHandler();
  const cursorPosition = useCursorPosition();
  const { toast } = useToast();

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Fonctionnalité en développement",
      description: "Le formulaire de contact n'est pas encore implémenté—mais n'hésitez pas à me demander de l'ajouter ! 🚀",
      duration: 5000,
    });
  };

  const handleDownloadCV = () => {
    toast({
      title: "🚧 CV en préparation",
      description: "Le téléchargement du CV n'est pas encore disponible—mais vous pouvez me demander de l'implémenter ! 🚀",
      duration: 5000,
    });
  };

  return (
    <>
      <Helmet>
        <title>Euloge Mabiala - Portfolio | Étudiant Ingénieur Informatique</title>
        <meta name="description" content="Portfolio d'Euloge Mabiala, étudiant ingénieur informatique à l'ESIEA. Spécialisé en développement web, cybersécurité et intelligence artificielle." />
      </Helmet>

      <div className="min-h-screen relative overflow-x-hidden">
        <motion.div
          className="scroll-indicator"
          style={{ scaleX: scrollProgress / 100 }}
        />
        <CursorTrail cursorPosition={cursorPosition} />
        <FloatingShapes />
        
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          activeSection={activeSection} 
          scrollToSection={scrollToSection} 
        />

        <main>
          <Hero scrollToSection={scrollToSection} handleDownloadCV={handleDownloadCV} />
          <About />
          <Skills />
          <Projects />
          <Contact handleContactSubmit={handleContactSubmit} />
        </main>
        
        <Footer />
        <BackToTopButton />
        <Toaster />
      </div>
    </>
  );
}

export default App;