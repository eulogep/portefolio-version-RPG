
import React from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, Users, Lightbulb, Target, Zap } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Timeline from '@/components/ui/Timeline';
import { education, experiences, softSkills, personalInfo } from '@/data/portfolioData';

const softSkillIcons = {
  Créativité: Lightbulb,
  'Résolution de problèmes': Target,
  'Esprit d’équipe': Users,
  Pédagogie: BookOpen,
  Autonomie: Zap,
};

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="À propos de moi"
          subtitle="Découvrez mon parcours, mes passions et ce qui me motive dans le monde de la technologie"
        />

        <div className="grid lg:grid-cols-5 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Code className="w-6 h-6 mr-3 text-blue-500" />
                Mon Histoire
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{personalInfo.description}</p>
            </div>
            
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-purple-500" />
                Soft Skills
              </h3>
              <div className="space-y-4">
                {softSkills.map((skill) => {
                  const Icon = softSkillIcons[skill] || Lightbulb;
                  return (
                    <div key={skill} className="flex items-center">
                      <Icon className="w-5 h-5 mr-3 text-purple-400" />
                      <span className="font-medium">{skill}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-blue-500" />
                  Formation
                </h3>
                <Timeline items={education} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-green-500" />
                  Expériences
                </h3>
                <Timeline items={experiences} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;