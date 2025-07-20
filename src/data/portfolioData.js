import React from 'react';

export const personalInfo = {
  name: 'Euloge Mabiala',
  title: 'Étudiant Ingénieur Informatique – ESIEA',
  shortDescription: 'Passionné par les nouvelles technologies et le développement logiciel, je me spécialise en développement web, cybersécurité et intelligence artificielle.',
  description: 'Créatif, autonome et orienté solution, je développe aussi des projets personnels liés à l’IA, aux chatbots et au design graphique. Mon objectif est de mettre mes compétences au service de projets innovants et stimulants.',
  email: 'mabiala@et.esiea.fr',
  linkedin: 'https://www.linkedin.com/in/euloge-junior-mabiala',
  github: 'https://github.com/eulogep/portfolio-euloge',
};

export const skills = [
  { name: 'JavaScript', level: 90, color: '#F7DF1E' },
  { name: 'Python', level: 85, color: '#3776AB' },
  { name: 'React', level: 88, color: '#61DAFB' },
  { name: 'Java', level: 80, color: '#ED8B00' },
  { name: 'Vue.js', level: 82, color: '#4FC08D' },
  { name: 'Node.js', level: 75, color: '#339933' },
  { name: 'HTML/CSS', level: 95, color: '#E34F26' },
  { name: 'Git', level: 85, color: '#F05032' }
];

export const tools = ['React', 'FastAPI', 'Vue.js', 'Tailwind CSS', 'Node.js', 'Git', 'GitHub', 'Make.com', 'Voiceflow', 'Cypress', 'Docker', 'Adobe Photoshop', 'Illustrator'];

export const softSkills = ['Autonomie', 'Créativité', 'Résolution de problèmes', 'Esprit d’équipe', 'Pédagogie'];

export const education = [
  {
    date: '2022 - 2025',
    title: 'Cycle Ingénieur en Informatique',
    institution: 'ESIEA',
    description: 'Spécialisation en développement logiciel, cybersécurité et intelligence artificielle.'
  },
  {
    date: '2022',
    title: 'Baccalauréat Scientifique',
    institution: 'Lycée...',
    description: 'Option Sciences de l\'Ingénieur.'
  }
];

export const experiences = [
  {
    date: 'Sept 2024 - Jan 2025',
    title: 'Employé Polyvalent',
    institution: 'Five Guys',
    description: 'Développement de compétences en travail d\'équipe, gestion du temps et service client dans un environnement rapide.'
  }
];

export const projects = [
  {
    title: 'Calculatrice Web Vue.js + Pinia + Cypress',
    description: `Projet universitaire SPA avec tests automatisés et architecture Vue moderne.

- Double interface de calculatrice moderne et responsive (Vue.js + HTML/CSS/JS)
- Animation de fond gradient, effet glassmorphism
- Sauvegarde automatique des calculs avec LocalStorage
- Calculs de base (addition, soustraction, multiplication, division)
- Boutons DEL et C (clear), support des décimaux
- Design moderne, boutons animés, interface mobile friendly

Accédez à la démo locale, au code source et au README ci-dessous.`,
    tech: ['Vue.js', 'Pinia', 'Cypress', 'JavaScript', 'HTML', 'CSS'],
    image: 'Modern calculator interface with Vue.js framework',
    githubLink: '/projet en plus/',
    demoLink: '/projet en plus/index.html',
    pptLink: '/projet en plus/README.md',
    status: 'fini',
    // plus de extraProjects
  },
  {
    title: 'Chatbot IA Voiceflow',
    description: 'Assistant éducatif et commercial avec intégration API, Google Sheets, et Make.com.',
    tech: ['Voiceflow', 'API', 'Google Sheets', 'Make.com'],
    image: 'AI chatbot interface with modern design',
    githubLink: 'https://github.com/eulogep/ai-chatbot-voiceflow',
    demoLink: 'https://voiceflow-chatbot-demo.vercel.app/',
    pptLink: 'https://example.com/voiceflow-presentation.pdf',
    status: 'en cours',
  },
  {
    title: 'BeeWise – Dashboard IoT Apiculture',
    description: 'Collecte de données API, Redis, Bot Discord, et visualisation Python.',
    tech: ['Python', 'Redis', 'Discord Bot', 'IoT'],
    image: 'IoT dashboard for beekeeping with data visualization',
    githubLink: 'https://gitlab.com/mabialaeulogejunior-group/beewise-dashboard',
    demoLink: 'https://beewise-demo.vercel.app/',
    pptLink: 'https://example.com/beewise-presentation.pdf',
    status: 'élaboration',
  },
  {
    title: 'Hip-Hop Master – Formation Danse',
    description: 'Tunnel de vente et formation danse en ligne avec intégrations complètes.',
    tech: ['Notion', 'Tally', 'Make.com', 'Brevo', 'Mollie'],
    image: 'Dance training platform with modern interface',
    githubLink: 'https://github.com/eulogep/hiphop-master',
    demoLink: '',
    pptLink: '',
    status: 'fini',
  },
  {
    title: 'Projet Design Print',
    description: "Étudiant en ingénierie passionné par le développement logiciel et le design d’expériences numériques. À travers la Mission Better Together, j’ai développé des compétences en design collaboratif (Figma) et en création de solutions innovantes pour sensibiliser et accompagner dans des situations de harcèlement.",
    tech: ['Photoshop', 'Illustrator', 'Design Graphique', 'Figma'],
    image: 'Graphic design portfolio with creative layouts',
    githubLink: 'https://www.figma.com/proto/Hd7NYkeueo8cpSuUhVXt9D/Better-together?node-id=8-2&p=f&t=dwX45pgrJ15hf8rv-0&scaling=scale-down&content-scaling=fixed&page-id=2%3A2&starting-point-node-id=8%3A2',
    demoLink: '',
    pptLink: '/MBT nouveau.pptx',
    status: 'fini',
  },
  // Exemple de projet futur
  {
    title: 'Plateforme IA Générative',
    description: 'Projet à venir : plateforme d’expérimentation IA avec démo interactive et présentation détaillée.',
    tech: ['React', 'Node.js', 'OpenAI API'],
    image: 'Coming soon: generative AI platform',
    githubLink: '',
    demoLink: '',
    pptLink: '',
    status: 'prévu',
  },
  // --- AJOUTS AUTOMATIQUES ---
  {
    title: 'App pour Calitenique',
    description: 'Application mobile pour la gestion des entraînements de calisthénie.',
    tech: ['React', 'Capacitor', 'JS'],
    image: 'app-pour-calitenique.png',
    githubLink: '',
    demoLink: '',
    pptLink: '',
    status: 'en cours',
  },
  {
    title: 'Portefolio Nouvelle Génération',
    description: 'Nouveau portfolio moderne et interactif.',
    tech: ['React', 'JS', 'CSS'],
    image: 'portefolio-nouvelle-gen.png',
    githubLink: '',
    demoLink: '',
    pptLink: '',
    status: 'en cours',
  },
  {
    title: 'Projets GitHub',
    description: 'Collection de projets variés hébergés sur GitHub.',
    tech: ['Divers'],
    image: 'github-projects.png',
    githubLink: '',
    demoLink: '',
    pptLink: '',
    status: 'fini',
  },
  {
    title: 'Site Streaming',
    description: 'Plateforme de streaming de mangas et autres contenus.',
    tech: ['React', 'Node.js', 'Python'],
    image: 'site-streaming.png',
    githubLink: '',
    demoLink: '',
    pptLink: '',
    status: 'en cours',
  },
  {
    title: 'Agent IA',
    description: 'Suite d’agents intelligents pour divers usages.',
    tech: ['Python', 'Node.js', 'AI'],
    image: 'agent-ia.png',
    githubLink: '',
    demoLink: '',
    pptLink: '',
    status: 'élaboration',
  },
  {
    title: 'Hip Hop',
    description: 'Ressources et outils autour de la danse hip-hop.',
    tech: ['Web', 'Design', 'PDF'],
    image: 'hip-hop.png',
    githubLink: '',
    demoLink: '',
    pptLink: '',
    status: 'fini',
  },
  {
    title: 'SmartTasks',
    description: 'Gestionnaire de tâches intelligent.',
    tech: ['JS', 'Python'],
    image: 'smarttasks.png',
    githubLink: '',
    demoLink: '',
    pptLink: '',
    status: 'en cours',
  },
  {
    title: 'Tools',
    description: 'Outils utilitaires pour développeurs.',
    tech: ['JS', 'Node.js'],
    image: 'tools.png',
    githubLink: '',
    demoLink: '',
    pptLink: '',
    status: 'fini',
  },
  {
    title: 'Nouveau Portefolio',
    description: 'Version alternative et expérimentale du portfolio.',
    tech: ['React', 'JS', 'CSS'],
    image: 'nouveau-portefolio.png',
    githubLink: '',
    demoLink: '',
    pptLink: '',
    status: 'élaboration',
  },
  {
    title: 'Mentorbot360',
    description: 'Assistant virtuel pour mentorat et coaching.',
    tech: ['Node.js', 'JS', 'AI'],
    image: 'mentorbot360.png',
    githubLink: '',
    demoLink: '',
    pptLink: '',
    status: 'en cours',
  },
  {
    title: 'Todo Reward App',
    description: 'Application de gestion de tâches avec système de récompenses.',
    tech: ['React', 'Node.js', 'JS'],
    image: 'todo-reward-app.png',
    githubLink: '',
    demoLink: '',
    pptLink: '',
    status: 'en cours',
  },
];

export const certifications = [
  'Java Basic Certificate – SoloLearn',
  'Certification Google Cybersécurité (en cours)',
  'Certifications HTML/CSS/JS – FreeCodeCamp / OpenClassrooms'
];