import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Trophy, Award, Users, Mic, Zap, Cloud, GitBranch, Calendar, Filter, GraduationCap, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const InventorySection = ({ playerData }) => {
  const [filter, setFilter] = useState('all');

  const badgeIcons = {
    'award': Award,
    'music': Music,
  };

  const rarityColors = {
    'legendary': 'from-red-500 to-red-600',
    'epic': 'from-purple-500 to-purple-600',
    'rare': 'from-blue-500 to-blue-600',
    'common': 'from-green-500 to-green-600'
  };

  const rarityGlows = {
    'legendary': 'shadow-red-500/50',
    'epic': 'shadow-purple-500/50',
    'rare': 'shadow-blue-500/50',
    'common': 'shadow-green-500/50'
  };

  const categoryLabels = {
    'formation': 'Formations',
    'item': 'Centres d\'Intérêt'
  };

  const filteredBadges = filter === 'all' 
    ? playerData.badges 
    : playerData.badges.filter(badge => badge.category === filter);

  const handleBadgeClick = (badge) => {
    toast({
      title: badge.name,
      description: `${badge.description} - Obtenu le ${new Date(badge.obtainedDate).toLocaleDateString('fr-FR')}`,
    });
  };

  return (
    <div className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-4xl lg:text-6xl glow-text mb-6">
            INVENTAIRE
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ma collection de badges, certifications et centres d'intérêt. Chaque item raconte une histoire !
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? "default" : "outline"}
            className={`glass-effect border-white/20 ${
              filter === 'all' 
                ? 'bg-purple-600 text-white' 
                : 'hover:bg-white/10'
            }`}
          >
            <Package className="w-4 h-4 mr-2" />
            Tous
          </Button>
          
          {Object.entries(categoryLabels).map(([key, label]) => (
            <Button
              key={key}
              onClick={() => setFilter(key)}
              variant={filter === key ? "default" : "outline"}
              className={`glass-effect border-white/20 ${
                filter === key 
                  ? 'bg-purple-600 text-white' 
                  : 'hover:bg-white/10'
              }`}
            >
              {key === 'formation' ? <GraduationCap className="w-4 h-4 mr-2" /> : <Music className="w-4 h-4 mr-2" />}
              {label}
            </Button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
        >
          {Object.entries(rarityColors).map(([rarity, colorClass]) => {
            const count = playerData.badges.filter(badge => badge.rarity === rarity).length;
            if (count === 0) return null;
            return (
              <div key={rarity} className="glass-effect rounded-xl p-4 text-center">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${colorClass} mx-auto mb-2`} />
                <p className="text-2xl font-bold font-orbitron">{count}</p>
                <p className="text-sm text-gray-400 capitalize">{rarity}</p>
              </div>
            );
          })}
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredBadges.map((badge, index) => {
              const Icon = badgeIcons[badge.icon] || Award;
              const rarityColor = rarityColors[badge.rarity];
              const rarityGlow = rarityGlows[badge.rarity];

              return (
                <motion.div
                  key={badge.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10, rotateY: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className={`glass-effect rounded-2xl p-6 relative overflow-hidden group cursor-pointer ${rarityGlow} shadow-2xl`}
                  onClick={() => handleBadgeClick(badge)}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${rarityColor} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />

                  <div className="relative z-10 text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${rarityColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${rarityColor} text-white mb-3 uppercase`}>
                      {badge.rarity}
                    </div>

                    <h3 className="font-orbitron font-bold text-lg mb-2 group-hover:text-purple-300 transition-colors">
                      {badge.name}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {badge.description}
                    </p>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(badge.obtainedDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>

                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${rarityColor} opacity-60`}
                      style={{ top: `${20 + i * 20}%`, right: `${10 + i * 5}%` }}
                      animate={{ y: [-10, 10, -10], opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    />
                  ))}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredBadges.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-400">Aucun badge trouvé pour cette catégorie</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-effect rounded-2xl p-6 max-w-md mx-auto">
            <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="font-orbitron font-bold text-2xl mb-2">COLLECTION TOTALE</h3>
            <p className="text-4xl font-orbitron font-black glow-text">
              {playerData.badges.length}
            </p>
            <p className="text-gray-400">Badges collectés</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InventorySection;