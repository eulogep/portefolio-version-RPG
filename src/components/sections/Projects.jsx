
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from '@/components/ui/ProjectCard';
import { projects } from '@/data/portfolioData';

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 overflow-hidden bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Fond décoratif SVG premium */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 z-0" aria-hidden="true">
        <defs>
          <radialGradient id="projects-grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="60%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="20%" cy="20%" rx="220" ry="120" fill="url(#projects-grad)" />
        <ellipse cx="80%" cy="80%" rx="180" ry="100" fill="url(#projects-grad)" />
      </svg>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionTitle
          title={<span className="gradient-text-premium">Mes Projets</span>}
          subtitle="Découvrez mes réalisations et projets qui démontrent mes compétences techniques"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect-premium p-6 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
      {/* Styles premium */}
      <style>{`
        .glass-effect-premium {
          background: rgba(255,255,255,0.25);
          box-shadow: 0 8px 32px 0 rgba(251,191,36,0.15);
          backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255,255,255,0.18);
        }
        .gradient-text-premium {
          background: linear-gradient(90deg, #f472b6 0%, #60a5fa 50%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .animate-fade-in {
          animation: fadeInProjects 0.5s;
        }
        @keyframes fadeInProjects {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Projects;