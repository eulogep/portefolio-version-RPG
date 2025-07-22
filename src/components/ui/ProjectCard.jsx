import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectModal from '@/components/ui/ProjectModal';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import ChasseurTaches from '@/components/sections/ChasseurTaches';

const statusColors = {
  fini: 'bg-green-100 text-green-700 border-green-400',
  'en cours': 'bg-yellow-100 text-yellow-800 border-yellow-400',
  élaboration: 'bg-blue-100 text-blue-700 border-blue-400',
  prévu: 'bg-gray-200 text-gray-600 border-gray-400',
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'fini': return 'Fini';
    case 'en cours': return 'En cours';
    case 'élaboration': return 'En élaboration';
    case 'prévu': return 'À venir';
    default: return status;
  }
};

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const techRef = useRef([]);

  useEffect(() => {
    import('animejs').then(anime => {
      if (cardRef.current) {
        anime.default({
          targets: cardRef.current,
          opacity: [0, 1],
          translateY: [40, 0],
          easing: 'easeOutExpo',
          duration: 900,
          delay: 100,
        });
      }
      if (techRef.current.length > 0) {
        anime.default({
          targets: techRef.current,
          opacity: [0, 1],
          translateY: [20, 0],
          easing: 'easeOutExpo',
          duration: 700,
          delay: anime.default.stagger(80, { start: 400 }),
        });
      }
    });
  }, []);

  const statusClass = statusColors[project.status] || 'bg-gray-100 text-gray-700 border-gray-300';
  const showPPT = project.pptLink && project.pptLink.length > 5;
  const showDemo = project.demoLink && project.demoLink.length > 5;
  const showGithub = project.githubLink && project.githubLink.length > 5;
  const imageUrl = project.image && project.image.startsWith('http') ? project.image : 'https://images.unsplash.com/photo-1572177812156-58036aae439c';

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('demo');
  const [modalUrl, setModalUrl] = useState('');
  const [chasseurModalOpen, setChasseurModalOpen] = useState(false);

  const handleOpenModal = (type, url) => {
    setModalType(type);
    setModalUrl(url);
    setModalOpen(true);
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        whileHover={{ y: -10 }}
        className="project-card glass-effect rounded-2xl overflow-hidden group h-full flex flex-col shadow-xl transition-shadow duration-300 hover:shadow-2xl"
      >
      <div className="relative overflow-hidden">
        <img
          alt={`Aperçu du projet ${project.title}`}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          src={imageUrl}
          onMouseEnter={e => {
            import('animejs').then(anime => {
              anime.default({
                targets: e.currentTarget,
                scale: 1.08,
                duration: 400,
                easing: 'easeOutExpo',
              });
            });
          }}
          onMouseLeave={e => {
            import('animejs').then(anime => {
              anime.default({
                targets: e.currentTarget,
                scale: 1,
                duration: 400,
                easing: 'easeOutExpo',
              });
            });
          }}
        />
        <div className="absolute top-3 left-3">
          {project.status && (
            <span
              className={`border px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm ${statusClass}`}
              aria-label={`Statut du projet : ${getStatusLabel(project.status)}`}
            >
              {getStatusLabel(project.status)}
            </span>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span
              key={tech}
              ref={el => techRef.current[i] = el}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs opacity-0"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex space-x-3 mt-auto">
          {showGithub && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="outline" size="sm" className="w-full group" aria-label="Voir le code sur GitHub"
                onMouseEnter={e => {
                  import('animejs').then(anime => {
                    anime.default({
                      targets: e.currentTarget.querySelector('svg'),
                      rotate: 360,
                      duration: 600,
                      easing: 'easeOutElastic(1, .8)',
                    });
                  });
                }}
                onMouseLeave={e => {
                  import('animejs').then(anime => {
                    anime.default({
                      targets: e.currentTarget.querySelector('svg'),
                      rotate: 0,
                      duration: 600,
                      easing: 'easeOutElastic(1, .8)',
                    });
                  });
                }}
              >
                <Github className="w-4 h-4 mr-2 inline-block" />
                {project.githubLink && project.githubLink.includes('figma.com') ? 'Lecture' : 'Code'}
              </Button>
            </a>
          )}
          {showDemo && (
            <button
              type="button"
              className="flex-1 group"
              aria-label="Voir la démo du projet"
              onClick={() => handleOpenModal('demo', project.demoLink)}
              onMouseEnter={e => {
                import('animejs').then(anime => {
                  anime.default({
                    targets: e.currentTarget.querySelector('svg'),
                    translateY: [0, -8, 0],
                    duration: 500,
                    easing: 'easeOutBounce',
                  });
                });
              }}
            >
              <Button size="sm" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2 inline-block" />
                Démo
              </Button>
            </button>
          )}
          {showPPT && (
            project.pptLink && project.pptLink.endsWith('.pptx') ? (
              <a
                href={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(window.location.origin + project.pptLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
                aria-label="Voir la présentation PowerPoint en ligne"
              >
                <Button size="sm" className="w-full">
                  <span role="img" aria-label="Présentation" className="mr-2 inline-block">📊</span>
                  Présentation
                </Button>
              </a>
            ) : (
              <button
                type="button"
                className="flex-1 group"
                aria-label="Voir la présentation PowerPoint ou PDF"
                onClick={() => handleOpenModal('ppt', project.pptLink)}
                onMouseEnter={e => {
                  import('animejs').then(anime => {
                    anime.default({
                      targets: e.currentTarget.querySelector('span[role="img"]'),
                      scale: [1, 1.2, 1],
                      duration: 400,
                      easing: 'easeInOutSine',
                    });
                  });
                }}
              >
                <Button size="sm" className="w-full">
                  <span role="img" aria-label="Présentation" className="mr-2 inline-block">📊</span>
                  Présentation
                </Button>
              </button>
            )
          )}
        </div>
        {/* Ajout du bouton spécial pour Chasseur de Tâches */}
        {project.title === 'Chasseur de Tâches' && (
          <Button
            size="lg"
            className="w-full mt-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold shadow-lg hover:from-pink-600 hover:to-yellow-500 premium-glow"
            onClick={() => setChasseurModalOpen(true)}
            aria-label="Tester Chasseur de Tâches"
          >
            Tester Chasseur de Tâches
          </Button>
        )}
      </div>
    </motion.div>
    {/* Modale custom pour Chasseur de Tâches */}
    {project.title === 'Chasseur de Tâches' && chasseurModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 animate-fade-in">
          <button
            onClick={() => setChasseurModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 shadow"
            aria-label="Fermer"
          >
            ×
          </button>
          <ChasseurTaches />
        </div>
      </div>
    )}
    {/* Modale existante pour démo/ppt */}
    <ProjectModal
      open={modalOpen}
      onOpenChange={setModalOpen}
      title={project.title}
      url={modalUrl}
      type={modalType}
    />
  </>
);
};

export default ProjectCard;