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
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Compétences Techniques"
          subtitle="Maîtrise des technologies modernes et outils de développement"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => {
            const Icon = skillIcons[skill.name];
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
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
          <h3 className="text-2xl font-bold mb-8">Outils & Frameworks</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool) => {
              const Icon = toolIcons[tool];
              return (
                <motion.span
                  key={tool}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="px-4 py-2 glass-effect rounded-full text-sm font-medium cursor-pointer flex items-center gap-2"
                >
                  {Icon && <Icon className="w-4 h-4 opacity-70" />}
                  {tool}
                </motion.span>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;