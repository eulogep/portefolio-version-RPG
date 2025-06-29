
import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/portfolioData';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl font-bold gradient-text">{personalInfo.name}</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {personalInfo.title}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
              © {new Date().getFullYear()} {personalInfo.name}. Tous droits réservés.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;