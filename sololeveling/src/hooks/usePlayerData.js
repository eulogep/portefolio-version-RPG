import { useState, useEffect } from 'react';

const initialPlayerData = {
  name: "MABIALA Euloge Junior",
  title: "Étudiant Cybersécurité & Dev. Logiciel",
  level: 10,
  currentXP: 450,
  nextLevelXP: 1000,
  rank: "E",
  totalXP: 450,
  stats: {
    python: 90,
    java: 70,
    html_css: 65,
    bash: 60,
    sql: 55,
    devops: 75,
    labview: 50,
    office: 80,
    francais: 100,
    anglais: 60,
    espagnol: 30
  },
  quests: [
    {
      id: 1,
      title: "Five Guys (Équipier polyvalent)",
      description: "Travail en environnement rapide",
      category: "SysOps",
      status: "completed",
      difficulty: "D",
      xpReward: 150,
      completedDate: "2025-01-31",
      technologies: ["Travail d'équipe", "Adaptabilité", "Gestion du stress"],
      reward: "Badge « Service Express »"
    },
    {
      id: 2,
      title: "Évènement 'Essaimées' (Assistante de projet)",
      description: "Robotique & Automatisation",
      category: "Ingénierie",
      status: "completed",
      difficulty: "C",
      xpReward: 200,
      completedDate: "2022-05-31",
      technologies: ["Robotique", "Gestion de projet", "Automatisation"],
      reward: "Badge « Automation Master »"
    },
    {
      id: 3,
      title: "Cyber Café du Centre (Opérateur de saisine)",
      description: "Saisie & traitement de données",
      category: "Productivité",
      status: "completed",
      difficulty: "E",
      xpReward: 100,
      completedDate: "2019-08-31",
      technologies: ["Saisie de données", "MS Office", "Précision"],
      reward: "Badge « Data Entry Pro »"
    }
  ],
  badges: [
    {
      id: 1,
      name: "Étudiant Cybersécurité & Dev. Logiciel",
      description: "ESIEA, Paris",
      icon: "award",
      rarity: "epic",
      obtainedDate: "2023-09-01",
      category: "formation"
    },
    {
      id: 2,
      name: "Classe Prépa MPSI/PSI",
      description: "Lycée Paul Éluard",
      icon: "award",
      rarity: "rare",
      obtainedDate: "2021-09-01",
      category: "formation"
    },
    {
      id: 3,
      name: "Baccalauréat Mention B",
      description: "Spécialités Math & Physique-Chimie",
      icon: "award",
      rarity: "common",
      obtainedDate: "2021-07-01",
      category: "formation"
    },
    {
      id: 4,
      name: "Danse",
      description: "Centre d'intérêt personnel",
      icon: "music",
      rarity: "rare",
      obtainedDate: "2024-01-01",
      category: "item"
    }
  ],
  timeline: [
    {
      id: 1,
      year: "2025",
      title: "Five Guys (Équipier polyvalent)",
      description: "Expérience en environnement rapide",
      type: "career",
      rank: "E"
    },
    {
      id: 2,
      year: "2023",
      title: "Début ESIEA",
      description: "Intégration du cycle ingénieur en Cybersécurité & Développement Logiciel.",
      type: "certification",
      rank: "E"
    },
    {
      id: 3,
      year: "2022",
      title: "Évènement 'Essaimées'",
      description: "Assistanat de projet en robotique et automatisation.",
      type: "achievement",
      rank: "E"
    },
    {
      id: 4,
      year: "2021",
      title: "Classe Préparatoire MPSI/PSI",
      description: "Acquisition de bases solides en mathématiques et physique.",
      type: "certification",
      rank: "E"
    },
    {
      id: 5,
      year: "2019",
      title: "Cyber Café du Centre",
      description: "Première expérience en saisie et traitement de données.",
      type: "career",
      rank: "E"
    }
  ]
};

export function usePlayerData() {
  const [playerData, setPlayerData] = useState(() => {
    const saved = localStorage.getItem('soloportfolio-player-data');
    return saved ? JSON.parse(saved) : initialPlayerData;
  });

  useEffect(() => {
    localStorage.setItem('soloportfolio-player-data', JSON.stringify(playerData));
  }, [playerData]);

  const updatePlayerData = (updates) => {
    setPlayerData(prev => ({ ...prev, ...updates }));
  };

  const calculateRank = (totalXP) => {
    if (totalXP >= 1000) return 'D';
    if (totalXP >= 500) return 'E';
    return 'E';
  };

  const getRankColor = (rank) => {
    const colors = {
      'S': 'text-red-400',
      'A': 'text-amber-400',
      'B': 'text-purple-400',
      'C': 'text-blue-400',
      'D': 'text-green-400',
      'E': 'text-gray-400'
    };
    return colors[rank] || 'text-gray-400';
  };

  const getRankGlow = (rank) => {
    const glows = {
      'S': 'rank-glow-s',
      'A': 'rank-glow-a',
      'B': 'rank-glow-b',
      'C': 'rank-glow-c',
      'D': 'rank-glow-d',
      'E': 'rank-glow-e'
    };
    return glows[rank] || 'rank-glow-e';
  };

  return {
    playerData,
    updatePlayerData,
    calculateRank,
    getRankColor,
    getRankGlow
  };
}