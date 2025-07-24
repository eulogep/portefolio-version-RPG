import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Star, 
  Zap, 
  Shield, 
  Sword, 
  Crown, 
  Heart,
  Gem,
  Target,
  Brain,
  Gamepad2,
  Volume2,
  VolumeX,
  Settings,
  Eye,
  MapPin
} from 'lucide-react';

const ImmersiveUI = ({ 
  userStats = {}, 
  currentSection = 'hero',
  onXPGain,
  onOpenMiniGames,
  onToggleSound,
  soundEnabled = true
}) => {
  const [notifications, setNotifications] = useState([]);
  const [hudVisible, setHudVisible] = useState(true);
  const [combatMode, setCombatMode] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const audioContextRef = useRef(null);
  const nextNotificationId = useRef(0);

  // Initialize audio context for sound effects
  useEffect(() => {
    if (soundEnabled && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, [soundEnabled]);

  // Play sound effect
  const playSound = (frequency, duration = 200, type = 'sine') => {
    if (!soundEnabled || !audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  // Add notification
  const addNotification = (type, message, duration = 3000) => {
    const id = nextNotificationId.current++;
    const notification = { id, type, message, timestamp: Date.now() };
    
    setNotifications(prev => [...prev, notification]);
    
    // Play notification sound
    switch (type) {
      case 'xp':
        playSound(523, 300); // C5
        break;
      case 'achievement':
        playSound(659, 400); // E5
        break;
      case 'levelup':
        playSound(784, 500); // G5
        break;
      default:
        playSound(440, 200); // A4
    }
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, duration);
  };

  // XP gain handler
  useEffect(() => {
    if (onXPGain) {
      const originalOnXPGain = onXPGain;
      onXPGain = (amount) => {
        addNotification('xp', `+${amount} XP`);
        originalOnXPGain(amount);
      };
    }
  }, [onXPGain]);

  // Section-based effects
  useEffect(() => {
    switch (currentSection) {
      case 'projects':
        setCombatMode(true);
        break;
      case 'skills':
        setCombatMode(false);
        break;
      default:
        setCombatMode(false);
    }
  }, [currentSection]);

  const getSectionIcon = (section) => {
    const icons = {
      hero: Crown,
      about: User,
      projects: Sword,
      skills: Star,
      contact: Heart,
      passions: Gem,
      certificates: Shield
    };
    return icons[section] || MapPin;
  };

  const UserStatsHUD = () => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 left-4 z-40 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl p-4 min-w-[250px]"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="text-white" size={20} />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">Euloge Mabiala</h3>
          <p className="text-gray-300 text-xs">Développeur Level {userStats.level || 1}</p>
        </div>
      </div>
      
      {/* XP Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-300 mb-1">
          <span>XP</span>
          <span>{userStats.xp || 0}/{userStats.nextLevelXP || 100}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((userStats.xp || 0) / (userStats.nextLevelXP || 100)) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2 text-yellow-400">
          <Star size={12} />
          <span>{userStats.skillPoints || 0}</span>
        </div>
        <div className="flex items-center gap-2 text-green-400">
          <Zap size={12} />
          <span>{userStats.energy || 100}</span>
        </div>
        <div className="flex items-center gap-2 text-blue-400">
          <Shield size={12} />
          <span>{userStats.defense || 10}</span>
        </div>
        <div className="flex items-center gap-2 text-red-400">
          <Sword size={12} />
          <span>{userStats.attack || 15}</span>
        </div>
      </div>
    </motion.div>
  );

  const MiniMap = () => {
    const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
    const SectionIcon = getSectionIcon(currentSection);
    
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 right-4 z-40 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <SectionIcon className="text-blue-400" size={16} />
          <span className="text-white text-sm font-medium capitalize">{currentSection}</span>
        </div>
        
        <div className="space-y-1">
          {sections.map((section, index) => {
            const Icon = getSectionIcon(section);
            const isActive = section === currentSection;
            
            return (
              <div
                key={section}
                className={`
                  flex items-center gap-2 px-2 py-1 rounded text-xs
                  ${isActive ? 'bg-blue-500/30 text-blue-300' : 'text-gray-400'}
                `}
              >
                <Icon size={12} />
                <span className="capitalize">{section}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const ActionBar = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 
                 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-6 py-3"
    >
      <div className="flex items-center gap-4">
        <motion.button
          onClick={onOpenMiniGames}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white"
          title="Mini-Jeux"
        >
          <Gamepad2 size={20} />
        </motion.button>
        
        <motion.button
          onClick={onToggleSound}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full text-white"
          title={soundEnabled ? 'Désactiver son' : 'Activer son'}
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full text-white"
          title="Compétences"
        >
          <Brain size={20} />
        </motion.button>
        
        <motion.button
          onClick={() => setHudVisible(!hudVisible)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-full text-white"
          title="Basculer UI"
        >
          <Eye size={20} />
        </motion.button>
      </div>
    </motion.div>
  );

  const NotificationSystem = () => (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className={`
              px-4 py-3 rounded-xl border backdrop-blur-md text-sm font-medium min-w-[150px]
              ${notification.type === 'xp' ? 'bg-blue-500/20 border-blue-400/30 text-blue-300' : ''}
              ${notification.type === 'achievement' ? 'bg-yellow-500/20 border-yellow-400/30 text-yellow-300' : ''}
              ${notification.type === 'levelup' ? 'bg-purple-500/20 border-purple-400/30 text-purple-300' : ''}
              ${notification.type === 'error' ? 'bg-red-500/20 border-red-400/30 text-red-300' : ''}
            `}
          >
            <div className="flex items-center gap-2">
              {notification.type === 'xp' && <Zap size={16} />}
              {notification.type === 'achievement' && <Star size={16} />}
              {notification.type === 'levelup' && <Crown size={16} />}
              <span>{notification.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  const CombatModeOverlay = () => {
    if (!combatMode) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 pointer-events-none z-30"
      >
        {/* Combat borders */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-pulse" />
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 via-yellow-500 to-red-500 animate-pulse" />
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-500 via-yellow-500 to-red-500 animate-pulse" />
        
        {/* Corner indicators */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-red-400 animate-pulse" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-red-400 animate-pulse" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-red-400 animate-pulse" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-red-400 animate-pulse" />
      </motion.div>
    );
  };

  const HealthBar = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-16 left-4 z-40 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-3"
    >
      <div className="flex items-center gap-2 mb-2">
        <Heart className="text-red-400" size={16} />
        <span className="text-white text-sm font-medium">Motivation</span>
      </div>
      
      <div className="w-48 bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-red-500 to-pink-500 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${userStats.health || 100}%` }}
          transition={{ duration: 1 }}
        />
      </div>
      
      <div className="text-xs text-gray-300 mt-1 text-center">
        {userStats.health || 100}/100
      </div>
    </motion.div>
  );

  const QuestTracker = () => {
    const currentQuests = [
      { id: 1, title: "Explorer le Portfolio", progress: 60, total: 100 },
      { id: 2, title: "Jouer aux Mini-Jeux", progress: 25, total: 100 },
      { id: 3, title: "Découvrir les Projets", progress: 80, total: 100 }
    ];

    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-64 left-4 z-40 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl p-4 w-64"
      >
        <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
          <Target className="text-yellow-400" size={16} />
          Quêtes Actives
        </h3>
        
        <div className="space-y-3">
          {currentQuests.map((quest) => (
            <div key={quest.id} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">{quest.title}</span>
                <span className="text-gray-400">{quest.progress}/{quest.total}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <motion.div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(quest.progress / quest.total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  if (!hudVisible) {
    return (
      <motion.button
        onClick={() => setHudVisible(true)}
        className="fixed top-4 left-4 z-40 p-3 bg-black/60 backdrop-blur-md border border-white/20 rounded-xl text-white"
        whileHover={{ scale: 1.05 }}
      >
        <Eye size={20} />
      </motion.button>
    );
  }

  return (
    <>
      <UserStatsHUD />
      <MiniMap />
      <ActionBar />
      <NotificationSystem />
      <HealthBar />
      <QuestTracker />
      <CombatModeOverlay />
    </>
  );
};

export default ImmersiveUI;