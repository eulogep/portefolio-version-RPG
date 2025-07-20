import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import SkillBar from '@/components/ui/SkillBar';
import { skills, tools } from '@/data/portfolioData';
import { 
  Braces, 
  BrainCircuit, 
  Orbit, 
  Coffee, 
  Eye, 
  Server, 
  Brackets, 
  GitFork,
  Wind,
  Bot,
  TestTube2,
  Ship,
  Image,
  PenTool,
  Zap,
  Github as GithubIcon
} from 'lucide-react';

const skillIcons = {
  'JavaScript': Braces,
  'Python': BrainCircuit,
  'React': Orbit,
  'Java': Coffee,
  'Vue.js': Eye,
  'Node.js': Server,
  'HTML/CSS': Brackets,
  'Git': GitFork
};

const toolIcons = {
    'React': Orbit,
    'FastAPI': Server,
    'Vue.js': Eye,
    'Tailwind CSS': Wind,
    'Node.js': Server,
    'Git': GitFork,
    'GitHub': GithubIcon,
    'Make.com': Zap,
    'Voiceflow': Bot,
    'Cypress': TestTube2,
    'Docker': Ship,
    'Adobe Photoshop': Image,
    'Illustrator': PenTool,
};

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Fond décoratif SVG premium */}
      <svg className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-20 z-0" aria-hidden="true">
        <defs>
          <radialGradient id="skills-grad" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="60%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="80%" cy="20%" rx="220" ry="120" fill="url(#skills-grad)" />
        <ellipse cx="20%" cy="80%" rx="180" ry="100" fill="url(#skills-grad)" />
      </svg>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionTitle
          title={<span className="gradient-text-premium">Compétences Techniques</span>}
          subtitle="Maîtrise des technologies modernes et outils de développement"
        />
        <div className="grid md:grid-cols-2 gap-10 mt-12">
          {skills.map((skill, index) => {
            const Icon = skillIcons[skill.name];
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in mb-6"
              >
                <SkillBar name={skill.name} level={skill.level} color={skill.color} icon={Icon} />
              </motion.div>
            )
          })}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-8 gradient-text-premium">Outils & Frameworks</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool) => {
              const Icon = toolIcons[tool];
              return (
                <motion.span
                  key={tool}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="px-4 py-2 glass-effect-premium rounded-full text-sm font-medium cursor-pointer flex items-center gap-2 shadow-md animate-fade-in"
                >
                  {Icon && <Icon className="w-4 h-4 opacity-70" />}
                  {tool}
                </motion.span>
              )
            })}
          </div>
        </motion.div>
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
          background: linear-gradient(90deg, #60a5fa 0%, #fbbf24 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .animate-fade-in {
          animation: fadeInSkills 0.5s;
        }
        @keyframes fadeInSkills {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Skills;