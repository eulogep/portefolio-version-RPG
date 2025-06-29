import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="project-card glass-effect rounded-2xl overflow-hidden group h-full flex flex-col"
    >
      <div className="relative overflow-hidden">
        <img 
          alt={`Aperçu du projet ${project.title}`}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
         src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
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
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex space-x-3 mt-auto">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Github className="w-4 h-4 mr-2" />
                Code
              </Button>
            </a>
          )}
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button size="sm" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Démo
              </Button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;