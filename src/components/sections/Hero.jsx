import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/portfolioData';

const Hero = ({ scrollToSection, handleDownloadCV }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <img  
              alt={`Photo de profil de ${personalInfo.name}`}
              className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 shadow-2xl object-cover"
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/f6fdc573-ee55-4b1b-bf7d-e8345d3e4a96/b17f966e14bccaedeee67c2f6d90dee0.jpg" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">{personalInfo.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 typing-animation"
          >
            {personalInfo.title}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12"
          >
            {personalInfo.shortDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => scrollToSection('projects')}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full"
            >
              Voir mes projets
            </Button>
            <Button
              onClick={handleDownloadCV}
              variant="outline"
              size="lg"
              className="px-8 py-3 rounded-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger CV
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center space-x-6 mt-12"
          >
            <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass-effect hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2, rotate: -5 }} href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass-effect hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href={`mailto:${personalInfo.email}`} className="p-3 rounded-full glass-effect hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Mail className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;