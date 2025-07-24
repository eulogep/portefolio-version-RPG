import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Calendar, Award, Briefcase, BrainCircuit, BarChart3, Filter, CheckCircle, Clock, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const QuestsSection = ({ playerData, updatePlayerData }) => {
  const [filter, setFilter] = useState('all');

  const categoryIcons = {
    'SysOps': Briefcase,
    'Ingénierie': BrainCircuit,
    'Productivité': BarChart3,
  };

  const difficultyColors = {
    'S': 'from-red-500 to-red-600',
    'A': 'from-amber-500 to-amber-600',
    'B': 'from-purple-500 to-purple-600',
    'C': 'from-blue-500 to-blue-600',
    'D': 'from-green-500 to-green-600',
    'E': 'from-gray-500 to-gray-600'
  };

  const statusIcons = {
    'completed': CheckCircle,
    'in-progress': Clock,
    'available': Play
  };

  const filteredQuests = filter === 'all' 
    ? playerData.quests 
    : playerData.quests.filter(quest => quest.status === filter);

  const handleQuestAction = (quest) => {
    if (quest.status === 'completed') {
      toast({
        title: "Quête Terminée",
        description: `Vous avez déjà complété "${quest.title}" et gagné ${quest.xpReward} XP !`,
      });
    } else {
      toast({
        title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀",
        description: "Système de quêtes à venir.",
      });
    }
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
            MES QUÊTES
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Chaque expérience est une aventure. Découvrez mes réalisations et défis relevés !
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
            className={`glass-effect border-white/20 ${filter === 'all' ? 'bg-purple-600 text-white' : 'hover:bg-white/10'}`}
          >
            <Target className="w-4 h-4 mr-2" />
            Toutes
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredQuests.map((quest, index) => {
              const CategoryIcon = categoryIcons[quest.category] || Target;
              const StatusIcon = statusIcons[quest.status];
              const difficultyColor = difficultyColors[quest.difficulty];

              return (
                <motion.div
                  key={quest.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="quest-card glass-effect rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                  onClick={() => handleQuestAction(quest)}
                >
                  <div className="absolute inset-0 opacity-20">
                    <img  alt={`Illustration pour l'expérience ${quest.title}`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1623141629340-4686d65d60bc" />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${difficultyColor} flex items-center justify-center`}>
                          <CategoryIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${difficultyColor} text-white mb-1`}>
                            RANG {quest.difficulty}
                          </div>
                          <p className="text-sm text-gray-400">{quest.category}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-5 h-5 ${quest.status === 'completed' ? 'text-green-400' : 'text-gray-400'}`} />
                      </div>
                    </div>

                    <h3 className="font-orbitron font-bold text-xl mb-3 group-hover:text-purple-300 transition-colors">
                      {quest.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {quest.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {quest.reward && (
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-medium flex items-center gap-1">
                          <Award className="w-3 h-3"/> {quest.reward}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span className="font-bold text-amber-400">
                          +{quest.xpReward} XP
                        </span>
                      </div>
                      
                      {quest.completedDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(quest.completedDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredQuests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-400">Aucune quête trouvée pour ce filtre</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuestsSection;