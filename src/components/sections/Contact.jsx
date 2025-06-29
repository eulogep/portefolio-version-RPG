
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { personalInfo, certifications } from '@/data/portfolioData';

const Contact = ({ handleContactSubmit }) => {
  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Contactez-moi"
          subtitle="Intéressé par une collaboration ? N'hésitez pas à me contacter !"
        />

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>
              <div className="space-y-4">
                <motion.a whileHover={{ scale: 1.05 }} href={`mailto:${personalInfo.email}`} className="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Mail className="w-6 h-6 mr-4 text-blue-500" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400">{personalInfo.email}</p>
                  </div>
                </motion.a>
                <motion.a whileHover={{ scale: 1.05 }} href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Linkedin className="w-6 h-6 mr-4 text-blue-500" />
                  <div>
                    <h4 className="font-semibold">LinkedIn</h4>
                    <p className="text-gray-600 dark:text-gray-400">{personalInfo.linkedin.split('/').pop()}</p>
                  </div>
                </motion.a>
                <motion.a whileHover={{ scale: 1.05 }} href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Github className="w-6 h-6 mr-4 text-blue-500" />
                  <div>
                    <h4 className="font-semibold">GitHub</h4>
                    <p className="text-gray-600 dark:text-gray-400">{personalInfo.github.split('/').pop()}</p>
                  </div>
                </motion.a>
              </div>
            </div>

            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Certifications</h3>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleContactSubmit} className="glass-effect p-6 rounded-2xl space-y-6">
              <h3 className="text-2xl font-bold mb-6">Envoyez-moi un message</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Nom</label>
                <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="votre.email@exemple.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Sujet</label>
                <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Sujet de votre message" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea required rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder="Votre message..." />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg">
                Envoyer le message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;