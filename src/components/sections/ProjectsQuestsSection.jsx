import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Award, CheckCircle, Clock, Play, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/portfolioData';

// Mapping status to RPG quest status
const statusMap = {
  'fini': 'completed',
  'en cours': 'in-progress',
  'élaboration': 'in-progress',
  'prévu': 'available',
};

const statusIcons = {
  'completed': CheckCircle,
  'in-progress': Clock,
  'available': Play
};

const difficultyColors = {
  'S': 'from-red-500 to-red-600',
  'A': 'from-amber-500 to-amber-600',
  'B': 'from-purple-500 to-purple-600',
  'C': 'from-blue-500 to-blue-600',
  'D': 'from-green-500 to-green-600',
  'E': 'from-gray-500 to-gray-600'
};

// Assign a fake rank and XP for demo (could be improved)
const getRank = (project, i) => {
  if (project.status === 'fini') return 'B';
  if (project.status === 'en cours') return 'C';
  if (project.status === 'élaboration') return 'D';
  if (project.status === 'prévu') return 'E';
  return 'E';
};
const getXP = (project, i) => 100 + i * 50;

const ProjectsQuestsSection = () => {
  const [filter, setFilter] = useState('all');
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => statusMap[p.status] === filter);

  return (
    <section id="projects" className="min-h-screen py-20 relative bg-gradient-to-br from-slate-900 via-slate-950 to-gray-900">
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
            Chaque projet est une aventure. Découvrez mes réalisations et défis relevés !
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
          <Button
            onClick={() => setFilter('completed')}
            variant={filter === 'completed' ? "default" : "outline"}
            className={`glass-effect border-white/20 ${filter === 'completed' ? 'bg-green-600 text-white' : 'hover:bg-white/10'}`}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Terminées
          </Button>
          <Button
            onClick={() => setFilter('in-progress')}
            variant={filter === 'in-progress' ? "default" : "outline"}
            className={`glass-effect border-white/20 ${filter === 'in-progress' ? 'bg-blue-600 text-white' : 'hover:bg-white/10'}`}
          >
            <Clock className="w-4 h-4 mr-2" />
            En cours
          </Button>
          <Button
            onClick={() => setFilter('available')}
            variant={filter === 'available' ? "default" : "outline"}
            className={`glass-effect border-white/20 ${filter === 'available' ? 'bg-amber-600 text-white' : 'hover:bg-white/10'}`}
          >
            <Play className="w-4 h-4 mr-2" />
            À venir
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => {
              const StatusIcon = statusIcons[statusMap[project.status]];
              const rank = getRank(project, index);
              const difficultyColor = difficultyColors[rank];
              const xp = getXP(project, index);
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="quest-card glass-effect rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 opacity-20">
                    <img alt={project.title} className="w-full h-full object-cover" src={typeof project.image === 'string' ? `/src/assets/${project.image}` : ''} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${difficultyColor} flex items-center justify-center`}>
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${difficultyColor} text-white mb-1`}>
                            RANG {rank}
                          </div>
                          <p className="text-sm text-gray-400">Projet</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-5 h-5 ${statusMap[project.status] === 'completed' ? 'text-green-400' : 'text-gray-400'}`} />
                      </div>
                    </div>
                    <h3 className="font-orbitron font-bold text-xl mb-3 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech && project.tech.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span className="font-bold text-amber-400">
                          +{xp} XP
                        </span>
                      </div>
                      {project.pptLink && (
                        <a href={project.pptLink} className="text-xs text-blue-400 underline ml-2" target="_blank" rel="noopener noreferrer">Voir Présentation</a>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {project.githubLink && (
                        <a href={project.githubLink} className="text-xs text-gray-300 underline" target="_blank" rel="noopener noreferrer">Code</a>
                      )}
                      {project.demoLink && (
                        <a href={project.demoLink} className="text-xs text-green-300 underline" target="_blank" rel="noopener noreferrer">Démo</a>
                      )}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-400">Aucun projet trouvé pour ce filtre</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsQuestsSection; 