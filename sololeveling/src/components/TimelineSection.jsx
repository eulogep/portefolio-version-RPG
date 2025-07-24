
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Award, Briefcase, Star } from 'lucide-react';
import { usePlayerData } from '@/hooks/usePlayerData';

const TimelineSection = ({ playerData }) => {
  const { getRankColor, getRankGlow } = usePlayerData();

  const typeIcons = {
    'rank-up': Star,
    'career': Briefcase,
    'certification': Award,
    'achievement': TrendingUp
  };

  const typeColors = {
    'rank-up': 'from-red-500 to-red-600',
    'career': 'from-blue-500 to-blue-600',
    'certification': 'from-purple-500 to-purple-600',
    'achievement': 'from-amber-500 to-amber-600'
  };

  const typeLabels = {
    'rank-up': 'Montée de Rang',
    'career': 'Évolution Carrière',
    'certification': 'Certification',
    'achievement': 'Réalisation'
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
            TIMELINE
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Mon parcours de développeur, étape par étape. Chaque moment clé de ma progression !
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-cyan-500 to-amber-500 rounded-full" />

          {/* Timeline Items */}
          <div className="space-y-16">
            {playerData.timeline.map((item, index) => {
              const Icon = typeIcons[item.type];
              const colorClass = typeColors[item.type];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="glass-effect rounded-2xl p-6 relative overflow-hidden group"
                    >
                      {/* Background Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${colorClass} text-white mb-1`}>
                              {typeLabels[item.type]}
                            </div>
                            <p className="text-sm text-gray-400">{item.year}</p>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-orbitron font-bold text-xl mb-3 group-hover:text-purple-300 transition-colors">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-300 mb-4">
                          {item.description}
                        </p>

                        {/* Rank Badge */}
                        {item.rank && (
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-effect ${getRankGlow(item.rank)}`}>
                            <Star className={`w-4 h-4 ${getRankColor(item.rank)}`} />
                            <span className={`font-orbitron font-bold ${getRankColor(item.rank)}`}>
                              RANG {item.rank}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    </motion.div>
                  </div>

                  {/* Central Node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className="absolute left-1/2 transform -translate-x-1/2 z-10"
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center border-4 border-slate-950 shadow-2xl`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Pulse Effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${colorClass} opacity-30`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    />
                  </motion.div>

                  {/* Year Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                    className={`absolute ${isEven ? 'right-4' : 'left-4'} top-0 transform -translate-y-1/2`}
                  >
                    <div className="glass-effect rounded-xl px-4 py-2 border border-white/20">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span className="font-orbitron font-bold text-cyan-400">
                          {item.year}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="glass-effect rounded-3xl p-8 max-w-md mx-auto">
            <Star className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h3 className="font-orbitron font-bold text-2xl mb-4">STATUT ACTUEL</h3>
            <div className={`text-4xl font-orbitron font-black mb-2 ${getRankColor(playerData.rank)}`}>
              RANG {playerData.rank}
            </div>
            <p className="text-gray-400">
              Niveau {playerData.level} • {playerData.totalXP.toLocaleString()} XP Total
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineSection;
