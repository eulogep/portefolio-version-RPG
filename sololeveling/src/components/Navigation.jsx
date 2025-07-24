
import React from 'react';
import { motion } from 'framer-motion';
import { User, BarChart3, Target, Package, Clock, Mail } from 'lucide-react';

const Navigation = ({ currentSection }) => {
  const navItems = [
    { id: 'hero', icon: User, label: 'Profil' },
    { id: 'stats', icon: BarChart3, label: 'Stats' },
    { id: 'quests', icon: Target, label: 'Quêtes' },
    { id: 'inventory', icon: Package, label: 'Inventaire' },
    { id: 'timeline', icon: Clock, label: 'Timeline' },
    { id: 'contact', icon: Mail, label: 'Contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="glass-effect rounded-2xl p-4 space-y-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative group p-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-purple-500/30 text-purple-300' 
                  : 'hover:bg-white/10 text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={20} />
              
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 bg-purple-500/20 rounded-xl border border-purple-400/50"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {item.label}
                <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;
