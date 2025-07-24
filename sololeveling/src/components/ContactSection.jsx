import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, MapPin, Phone, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀",
      description: "Le système d'envoi de messages sera bientôt disponible.",
    });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://eulogep.github.io/portefolio_new/',
      color: 'hover:text-gray-300',
      description: 'Mon portfolio'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com',
      color: 'hover:text-blue-400',
      description: 'Mon réseau pro'
    }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'Paris (18ᵉ) et Boulogne',
      color: 'text-green-400'
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+33 7 60 83 09 31',
      color: 'text-amber-400'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'mabialaeulogejunior@gmail.com',
      color: 'text-purple-400'
    }
  ];

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
            CONTACT
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Prêt pour une nouvelle quête ? Contactez-moi pour discuter de vos projets !
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="font-orbitron font-bold text-2xl mb-6 text-center">
                Envoyer un Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-purple-400 focus:outline-none transition-colors" placeholder="Votre nom" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-purple-400 focus:outline-none transition-colors" placeholder="votre@email.com" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Sujet</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-purple-400 focus:outline-none transition-colors" placeholder="Sujet de votre message" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows={6} className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:border-purple-400 focus:outline-none transition-colors resize-none" placeholder="Décrivez votre projet ou votre demande..." required />
                </div>
                
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105">
                  <Send className="w-5 h-5 mr-2" />
                  Envoyer le Message
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="font-orbitron font-bold text-2xl mb-6 text-center">
                Informations
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${info.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{info.label}</p>
                        <p className="font-medium">{info.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-8">
              <h3 className="font-orbitron font-bold text-2xl mb-6 text-center">
                Réseaux Sociaux
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a key={index} href={social.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className={`glass-effect rounded-xl p-4 text-center transition-all duration-300 group ${social.color}`}>
                      <Icon className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="font-medium text-sm">{social.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{social.description}</p>
                    </motion.a>
                  );
                })}
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-8 text-center"
            >
              <h3 className="font-orbitron font-bold text-xl mb-4">
                Mon CV complet
              </h3>
              <p className="text-gray-300 mb-6">
                Pour plus de détails sur mon parcours, téléchargez mon CV au format PDF.
              </p>
               <a href="/CV_Mabiala_2025.pdf" download>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto glass-effect border-white/20 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Télécharger CV
                  <Download className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;