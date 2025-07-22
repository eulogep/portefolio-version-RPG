import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Medal,
  Shield,
  Crown,
  Gem,
  Wand2,
  Star,
  Swords,
  ScrollText,
  AlarmClock,
  ShoppingCart,
  User,
  UserCog,
  Bot,
  Sparkles,
  Sword,
  BadgeCheck,
  UserCheck,
  User2,
  UserSquare,
} from 'lucide-react';

const XP_PER_TASK = 20;
const LEVEL_UP_XP = 100;

function getInitialState() {
  const saved = localStorage.getItem('chasseurTaches');
  if (saved) return JSON.parse(saved);
  return {
    tasks: [],
    xp: 0,
    level: 1,
    completed: 0,
  };
}

const BADGES = [
  { id: 't5', label: '5 tâches', desc: 'Accomplis 5 tâches', icon: '🎖️', check: s => s.completed >= 5 },
  { id: 't10', label: '10 tâches', desc: 'Accomplis 10 tâches', icon: '🏆', check: s => s.completed >= 10 },
  { id: 't20', label: '20 tâches', desc: 'Accomplis 20 tâches', icon: '🥇', check: s => s.completed >= 20 },
  { id: 'l5', label: 'Niveau 5', desc: 'Atteins le niveau 5', icon: '🛡️', check: s => s.level >= 5 },
  { id: 'l10', label: 'Niveau 10', desc: 'Atteins le niveau 10', icon: '👑', check: s => s.level >= 10 },
];

// Quêtes journalières
const QUESTS_POOL = [
  { id: 'q1', text: "Valide 3 tâches aujourd'hui", type: 'complete', amount: 3, reward: { xp: 30, coins: 10 }, icon: '⚔️' },
  { id: 'q2', text: "Ajoute 2 nouvelles tâches aujourd'hui", type: 'add', amount: 2, reward: { xp: 20, coins: 8 }, icon: '📝' },
  { id: 'q3', text: "Atteins le niveau 2 aujourd'hui", type: 'level', amount: 2, reward: { xp: 40, coins: 15 }, icon: '🌟' },
  { id: 'q4', text: "Valide une tâche avant midi", type: 'early', amount: 1, reward: { xp: 25, coins: 10 }, icon: '⏰' },
  { id: 'q5', text: "Valide 5 tâches aujourd'hui", type: 'complete', amount: 5, reward: { xp: 50, coins: 20 }, icon: '🗡️' },
];

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function getInitialQuests() {
  const key = getTodayKey();
  const saved = localStorage.getItem('chasseurTachesQuests');
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.key === key) return parsed.quests;
  }
  // Génère 1 à 2 quêtes aléatoires
  const shuffled = QUESTS_POOL.sort(() => 0.5 - Math.random());
  const quests = shuffled.slice(0, Math.floor(Math.random() * 2) + 1).map(q => ({ ...q, done: false }));
  localStorage.setItem('chasseurTachesQuests', JSON.stringify({ key, quests }));
  return quests;
}

const SHOP_ITEMS = [
  { id: 'theme-blue', type: 'theme', label: 'Thème Bleu Glacial', price: 30, color: 'from-blue-400 to-blue-700', icon: '💎' },
  { id: 'theme-pink', type: 'theme', label: 'Thème Rose Magique', price: 30, color: 'from-pink-400 to-pink-700', icon: '🔮' },
  { id: 'theme-gold', type: 'theme', label: 'Thème Or Royal', price: 50, color: 'from-yellow-400 to-yellow-600', icon: '🏵️' },
  { id: 'avatar-hero', type: 'avatar', label: 'Avatar Héros', price: 40, icon: '🦸‍♂️' },
  { id: 'avatar-mage', type: 'avatar', label: 'Avatar Mage', price: 40, icon: '🧙‍♂️' },
  { id: 'avatar-robot', type: 'avatar', label: 'Avatar Robot', price: 60, icon: '🤖' },
];

function getEvolvingAvatar(level) {
  if (level >= 10) return '🦄'; // licorne premium
  if (level >= 5) return '🧙‍♂️'; // mage
  return '🦸‍♂️'; // héros
}

function getTodayDateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// Mapping icônes premium
const ICONS = {
  badge_t5: <Medal className="text-yellow-400 drop-shadow-lg" size={32} />,
  badge_t10: <Trophy className="text-orange-500 drop-shadow-lg" size={34} />,
  badge_t20: <BadgeCheck className="text-green-500 drop-shadow-lg" size={36} />,
  badge_l5: <Shield className="text-blue-500 drop-shadow-lg" size={32} />,
  badge_l10: <Crown className="text-pink-500 drop-shadow-lg" size={36} />,
  shop_theme_blue: <Gem className="text-blue-400 drop-shadow-md" size={28} />,
  shop_theme_pink: <Wand2 className="text-pink-400 drop-shadow-md" size={28} />,
  shop_theme_gold: <Star className="text-yellow-400 drop-shadow-md" size={28} />,
  shop_avatar_hero: <User className="text-blue-700 drop-shadow-md" size={30} />,
  shop_avatar_mage: <UserCog className="text-purple-600 drop-shadow-md" size={30} />,
  shop_avatar_robot: <Bot className="text-gray-500 drop-shadow-md" size={30} />,
  quest_q1: <Swords className="text-pink-500 drop-shadow-md" size={28} />,
  quest_q2: <ScrollText className="text-blue-500 drop-shadow-md" size={28} />,
  quest_q3: <Star className="text-yellow-500 drop-shadow-md" size={28} />,
  quest_q4: <AlarmClock className="text-green-500 drop-shadow-md" size={28} />,
  quest_q5: <Sword className="text-pink-700 drop-shadow-md" size={28} />,
  shop: <ShoppingCart className="text-yellow-500 drop-shadow-md" size={28} />,
  levelup: <Sparkles className="text-yellow-400 animate-bounce-slow drop-shadow-lg" size={40} />,
  avatar_1: <User2 className="text-blue-700 drop-shadow-md" size={38} />,
  avatar_5: <UserCheck className="text-purple-600 drop-shadow-md" size={38} />,
  avatar_10: <UserSquare className="text-yellow-500 drop-shadow-md" size={40} />,
};

// Ajout d'un composant Confettis CSS simple pour Level Up
function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex justify-center items-start">
      {[...Array(24)].map((_, i) => (
        <div key={i} className={`confetti confetti-${i % 6}`} style={{ left: `${(i * 4 + 10) % 100}%` }} />
      ))}
      <style>{`
        .confetti {
          position: absolute;
          top: 0;
          width: 12px;
          height: 24px;
          border-radius: 4px;
          opacity: 0.7;
          animation: confetti-fall 1.5s cubic-bezier(.68,-0.55,.27,1.55) forwards;
        }
        .confetti-0 { background: #fbbf24; }
        .confetti-1 { background: #60a5fa; }
        .confetti-2 { background: #f472b6; }
        .confetti-3 { background: #34d399; }
        .confetti-4 { background: #a78bfa; }
        .confetti-5 { background: #f87171; }
        @keyframes confetti-fall {
          0% { transform: translateY(-40px) scale(1) rotate(0deg); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(80vh) scale(0.7) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function ChasseurTaches() {
  const [state, setState] = useState(getInitialState);
  const [input, setInput] = useState('');
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [badgeNotif, setBadgeNotif] = useState(null);
  const [coins, setCoins] = useState(() => Number(localStorage.getItem('chasseurTachesCoins') || 0));
  const [quests, setQuests] = useState(getInitialQuests);
  const [questNotif, setQuestNotif] = useState(null);
  const [shopOwned, setShopOwned] = useState(() => {
    const saved = localStorage.getItem('chasseurTachesShop');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTheme, setActiveTheme] = useState(() => localStorage.getItem('chasseurTachesTheme') || '');
  const [activeAvatar, setActiveAvatar] = useState(() => localStorage.getItem('chasseurTachesAvatar') || '');
  const [shopNotif, setShopNotif] = useState(null);
  const [levelUpNotif, setLevelUpNotif] = useState(false);

  // Statistiques : XP total, tâches totales, streak, historique badges/quetes
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('chasseurTachesStats');
    return saved ? JSON.parse(saved) : { xpTotal: 0, completedTotal: 0, streak: 0, lastDay: '', streakMax: 0, badges: [], quests: [] };
  });

  useEffect(() => {
    localStorage.setItem('chasseurTaches', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem('chasseurTachesCoins', coins);
  }, [coins]);

  useEffect(() => {
    // Vérifie les nouveaux badges à chaque update
    const newBadges = BADGES.filter(b => b.check(state) && !unlockedBadges.includes(b.id));
    if (newBadges.length > 0) {
      setUnlockedBadges(prev => [...prev, ...newBadges.map(b => b.id)]);
      setBadgeNotif(newBadges[0]);
      setTimeout(() => setBadgeNotif(null), 3500);
    }
    // eslint-disable-next-line
  }, [state.completed, state.level]);

  // Quête : validation automatique
  useEffect(() => {
    let changed = false;
    const updated = quests.map(q => {
      if (q.done) return q;
      if (q.type === 'complete' && state.completed >= q.amount) { changed = true; return { ...q, done: true }; }
      if (q.type === 'add' && state.tasks.length >= q.amount) { changed = true; return { ...q, done: true }; }
      if (q.type === 'level' && state.level >= q.amount) { changed = true; return { ...q, done: true }; }
      if (q.type === 'early') {
        const now = new Date();
        if (state.completed > 0 && now.getHours() < 12) { changed = true; return { ...q, done: true }; }
      }
      return q;
    });
    if (changed) {
      setQuests(updated);
      localStorage.setItem('chasseurTachesQuests', JSON.stringify({ key: getTodayKey(), quests: updated }));
      // Récompense : XP/coins
      updated.forEach(q => {
        if (q.done && !q.rewarded) {
          setState(s => ({ ...s, xp: s.xp + (q.reward.xp || 0) }));
          setCoins(c => c + (q.reward.coins || 0));
          setQuestNotif(q);
          setTimeout(() => setQuestNotif(null), 3500);
          q.rewarded = true;
        }
      });
    }
    // eslint-disable-next-line
  }, [state.completed, state.tasks.length, state.level]);

  // Met à jour les stats à chaque validation de tâche ou badge/quête
  useEffect(() => {
    // XP total et tâches totales
    setStats(prev => {
      let xpTotal = prev.xpTotal;
      let completedTotal = prev.completedTotal;
      let streak = prev.streak;
      let lastDay = prev.lastDay;
      let streakMax = prev.streakMax;
      const today = getTodayDateStr();
      if (state.completed > prev.completedTotal) {
        xpTotal += (state.xp - (prev.xp || 0));
        completedTotal = state.completed;
        // Streak
        if (prev.lastDay === today) {
          // déjà compté aujourd'hui
        } else if (prev.lastDay && new Date(today) - new Date(prev.lastDay) === 86400000) {
          streak = prev.streak + 1;
          lastDay = today;
        } else {
          streak = 1;
          lastDay = today;
        }
        if (streak > streakMax) streakMax = streak;
      }
      return { ...prev, xpTotal, completedTotal, streak, lastDay, streakMax };
    });
  }, [state.completed]);

  // Historique badges/quetes
  useEffect(() => {
    setStats(prev => {
      let badges = prev.badges || [];
      unlockedBadges.forEach(b => { if (!badges.includes(b)) badges.push(b); });
      let quests = prev.quests || [];
      quests = quests.concat(quests.filter(q => !q.done).map(q => q.id));
      return { ...prev, badges, quests };
    });
  }, [unlockedBadges, quests]);

  // Sauvegarde stats
  useEffect(() => {
    localStorage.setItem('chasseurTachesStats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('chasseurTachesShop', JSON.stringify(shopOwned));
  }, [shopOwned]);
  useEffect(() => {
    localStorage.setItem('chasseurTachesTheme', activeTheme);
  }, [activeTheme]);
  useEffect(() => {
    localStorage.setItem('chasseurTachesAvatar', activeAvatar);
  }, [activeAvatar]);

  // Animation Level Up!
  useEffect(() => {
    if (state.xp === 0 && state.level > 1) {
      setLevelUpNotif(true);
      setTimeout(() => setLevelUpNotif(false), 2500);
    }
  }, [state.level]);

  function addTask(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setState(s => ({ ...s, tasks: [...s.tasks, { text: input, done: false, id: Date.now() }] }));
    setInput('');
  }

  function toggleTask(id) {
    setState(s => {
      const tasks = s.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
      let xp = s.xp;
      let level = s.level;
      let completed = s.completed;
      const justCompleted = tasks.find(t => t.id === id && t.done);
      if (justCompleted) {
        xp += XP_PER_TASK;
        completed += 1;
        if (xp >= LEVEL_UP_XP) {
          xp -= LEVEL_UP_XP;
          level += 1;
        }
      } else {
        // Si on décoche une tâche, on retire l'XP et le compteur
        xp = Math.max(0, xp - XP_PER_TASK);
        completed = Math.max(0, completed - 1);
      }
      return { ...s, tasks, xp, level, completed };
    });
  }

  function deleteTask(id) {
    setState(s => ({ ...s, tasks: s.tasks.filter(t => t.id !== id) }));
  }

  function buyItem(item) {
    if (shopOwned.includes(item.id) || coins < item.price) return;
    setShopOwned(prev => [...prev, item.id]);
    setCoins(c => c - item.price);
    setShopNotif(item);
    setTimeout(() => setShopNotif(null), 3500);
  }
  function selectTheme(id) { setActiveTheme(id); }
  function selectAvatar(id) { setActiveAvatar(id); }

  const progress = Math.min(100, (state.xp / LEVEL_UP_XP) * 100);

  // Avatar affiché : prioritaire à l’avatar acheté/activé, sinon évolutif
  const avatarIcon = activeAvatar
    ? SHOP_ITEMS.find(i => i.id === activeAvatar)?.icon
    : getEvolvingAvatar(state.level);

  return (
    <section id="chasseur-taches" className={`relative py-24 bg-gradient-to-br ${activeTheme ? SHOP_ITEMS.find(i=>i.id===activeTheme)?.color : 'from-blue-50 via-yellow-50 to-pink-50'} dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden`}>
      {levelUpNotif && <Confetti />}
      {/* Animation Level Up! */}
      {levelUpNotif && (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 px-10 py-6 rounded-3xl shadow-2xl border-4 border-yellow-400 glass-effect-premium bg-gradient-to-r from-yellow-200/80 via-pink-200/80 to-blue-200/80 animate-levelup-pop text-5xl font-extrabold text-yellow-700 flex items-center gap-6 premium-glow">
          <span className="animate-bounce-slow" role="img" aria-label="level up">{ICONS.levelup}</span> LEVEL UP ! <span className="text-3xl font-bold ml-2">Niveau {state.level}</span>
        </div>
      )}
      {/* Notification badge */}
      {badgeNotif && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-2xl shadow-2xl border-2 border-yellow-400 glass-effect-premium bg-gradient-to-r from-yellow-200/80 via-pink-200/80 to-blue-200/80 animate-bounce-in text-3xl font-bold text-yellow-700 flex items-center gap-4 premium-glow">
          <span className="animate-bounce-slow text-4xl">{ICONS[`badge_${badgeNotif.id}`]}</span>
          <span>Badge débloqué :</span> <span className="ml-2 text-2xl font-bold">{badgeNotif.label} !</span>
        </div>
      )}
      {/* Notification quête */}
      {questNotif && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-2xl shadow-2xl border-2 border-pink-400 glass-effect-premium bg-gradient-to-r from-pink-200/80 via-yellow-200/80 to-blue-200/80 animate-bounce-in text-2xl font-bold text-pink-700 flex items-center gap-4 premium-glow">
          <span className="animate-bounce-slow text-3xl">{ICONS[`quest_${questNotif.id}`]}</span>
          <span>Quête accomplie :</span> <span className="ml-2 text-xl font-bold">{questNotif.text} !</span>
        </div>
      )}
      {/* Notification achat boutique */}
      {shopNotif && (
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-2xl shadow-2xl border-2 border-blue-400 glass-effect-premium bg-gradient-to-r from-blue-200/80 via-pink-200/80 to-yellow-200/80 animate-bounce-in text-2xl font-bold text-blue-700 flex items-center gap-4 premium-glow">
          <span className="animate-bounce-slow text-3xl">{ICONS.shop}</span>
          <span>Achat réussi :</span> <span className="ml-2 text-xl font-bold">{shopNotif.label} !</span>
        </div>
      )}
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h2 className="text-4xl font-bold gradient-text-premium mb-2">Chasseur de Tâches</h2>
        <div className="flex justify-center items-center gap-4 mb-4">
          <span className="text-4xl premium-avatar-glow">{avatarIcon}</span>
          <p className="mb-6 text-gray-600 dark:text-gray-300">Accomplis tes tâches, gagne de l'XP et monte de niveau comme dans un RPG !</p>
        </div>
        {/* Tableau de bord/statistiques */}
        <div className="glass-effect-premium mb-8 p-6 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-900 flex flex-col gap-2 text-left">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div><span className="font-bold text-blue-700 dark:text-blue-300">XP total :</span> {stats.xpTotal}</div>
            <div><span className="font-bold text-pink-700 dark:text-pink-300">Tâches totales :</span> {stats.completedTotal}</div>
            <div><span className="font-bold text-yellow-700 dark:text-yellow-300">Streak max :</span> {stats.streakMax} jours</div>
            <div><span className="font-bold text-green-700 dark:text-green-300">Streak actuel :</span> {stats.streak} jours</div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 items-center">
            <span className="font-bold text-blue-500">Badges :</span>
            {unlockedBadges.length === 0 && <span className="text-gray-400 italic">Aucun</span>}
            {BADGES.filter(b => unlockedBadges.includes(b.id)).map(b => (
              <span key={b.id} className="text-lg group relative inline-block transition-transform duration-200 hover:scale-125 hover:rotate-6 cursor-pointer premium-badge-glow" title={b.label}>
                {ICONS[`badge_${b.id}`]}
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-white/90 text-xs text-gray-700 shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none z-20">{b.desc}</span>
              </span>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2 items-center">
            <span className="font-bold text-pink-500">Quêtes accomplies :</span>
            {quests.filter(q => q.done).length === 0 && <span className="text-gray-400 italic">Aucune</span>}
            {quests.filter(q => q.done).map(q => (
              <span key={q.id} className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">{q.text}</span>
            ))}
          </div>
        </div>
        <div className="glass-effect-premium p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 mb-8">
          {/* Boutique d’objets cosmétiques */}
          <div className="mb-8">
            <div className="font-semibold text-yellow-700 dark:text-yellow-300 mb-1 flex items-center justify-center gap-2">
              <span role="img" aria-label="boutique">🛒</span> Boutique d’objets cosmétiques
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {SHOP_ITEMS.map(item => (
                <div key={item.id} className={`flex flex-col items-center px-3 py-2 rounded-xl border shadow-sm group relative transition-all duration-200 ${shopOwned.includes(item.id) ? 'bg-green-100 dark:bg-green-900/30 border-green-400 premium-shop-glow' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700'}`}
                  style={{ minWidth: 90 }}>
                  <span className="text-2xl mb-1 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-200">{ICONS[`shop_${item.id}`]}</span>
                  <span className="text-xs font-bold mb-1">{item.label}</span>
                  <span className="text-xs mb-1">{item.type === 'theme' ? 'Thème' : 'Avatar'}</span>
                  <span className="text-xs mb-2">{item.price} 💰</span>
                  {shopOwned.includes(item.id) ? (
                    item.type === 'theme' ?
                      <button onClick={() => selectTheme(item.id)} className={`text-xs px-2 py-1 rounded ${activeTheme === item.id ? 'bg-blue-500 text-white premium-shop-glow' : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'}`}>Activer</button>
                    : <button onClick={() => selectAvatar(item.id)} className={`text-xs px-2 py-1 rounded ${activeAvatar === item.id ? 'bg-pink-500 text-white premium-shop-glow' : 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300'}`}>Activer</button>
                  ) : (
                    <button onClick={() => buyItem(item)} disabled={coins < item.price} className="text-xs px-2 py-1 rounded bg-yellow-400 text-white font-bold disabled:opacity-50">Acheter</button>
                  )}
                  {/* Aperçu au survol */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-4 py-2 rounded-xl bg-white/95 text-sm text-gray-700 shadow-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none z-30 min-w-[120px] border border-blue-100 dark:border-blue-900">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-3xl mb-1">{ICONS[`shop_${item.id}`]}</span>
                      <span className="font-bold">{item.label}</span>
                      <span className="text-xs text-gray-500">{item.type === 'theme' ? 'Thème de couleur premium' : 'Avatar exclusif'}</span>
                      <span className="text-xs text-yellow-600">Prix : {item.price} 💰</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Quêtes journalières */}
          <div className="mb-6">
            <div className="font-semibold text-pink-700 dark:text-pink-300 mb-1 flex items-center justify-center gap-2">
              <span role="img" aria-label="quête">🗡️</span> Quêtes journalières
            </div>
            <div className="flex flex-col gap-2 mt-2">
              {quests.length === 0 && <div className="text-gray-400 italic">Aucune quête aujourd'hui.</div>}
              {quests.map(q => (
                <div key={q.id} className={`flex items-center justify-between px-4 py-2 rounded-lg group transition-all duration-200 ${q.done ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 premium-quest-glow' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
                  tabIndex={0}>
                  <span className="flex items-center gap-2 text-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200">
                    {ICONS[`quest_${q.id}`]}
                    {q.text}
                  </span>
                  <span className="ml-2 text-xs font-bold">{q.done ? 'Récompensé !' : `XP+${q.reward.xp} 💰+${q.reward.coins}`}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Badges */}
          <div className="mb-6">
            <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1 flex items-center justify-center gap-2">
              <span role="img" aria-label="badge">🎖️</span> Badges débloqués
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {BADGES.map(badge => (
                <div key={badge.id} className={`flex flex-col items-center px-2 py-1 rounded-lg text-2xl ${unlockedBadges.includes(badge.id) ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 shadow' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 opacity-50'}`}
                  title={badge.desc}
                >
                  <span>{ICONS[`badge_${badge.id}`]}</span>
                  <span className="text-xs font-bold mt-1">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center mb-6">
            <div className="text-2xl font-bold mb-1">Niveau <span className="text-blue-500">{state.level}</span> <span className="ml-2 text-yellow-500">💰 {coins}</span></div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2 overflow-hidden">
              <div className="h-4 rounded-full bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 transition-all duration-500" style={{ width: progress + '%' }} />
            </div>
            <div className="text-sm text-gray-500">XP : {state.xp} / {LEVEL_UP_XP}</div>
            <div className="text-sm text-green-600 mt-1">Tâches accomplies : {state.completed}</div>
          </div>
          <form onSubmit={addTask} className="flex gap-2 mb-4">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Nouvelle tâche..."
              className="flex-1 p-2 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80 dark:bg-gray-800/80"
            />
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition">Ajouter</button>
          </form>
          <ul className="space-y-2 text-left">
            {state.tasks.length === 0 && <li className="text-gray-400 italic">Aucune tâche pour l'instant.</li>}
            {state.tasks.map(task => (
              <li key={task.id} className="flex items-center justify-between bg-white/70 dark:bg-gray-800/70 rounded-lg px-4 py-2 shadow-sm">
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} className="accent-blue-500 w-5 h-5" />
                  <span className={task.done ? 'line-through text-gray-400' : ''}>{task.text}</span>
                </label>
                <button onClick={() => deleteTask(task.id)} className="ml-2 text-red-500 hover:text-red-700 text-lg font-bold">×</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xs text-gray-400 mt-4">Progression sauvegardée localement. Inspiré des RPG et de Solo Leveling !</div>
      </div>
      <style>{`
        .glass-effect-premium {
          background: rgba(255,255,255,0.25);
          box-shadow: 0 8px 32px 0 rgba(251,191,36,0.15);
          backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255,255,255,0.18);
        }
        .premium-glow {
          box-shadow: 0 0 32px 8px #fbbf24cc, 0 0 64px 16px #60a5fa55, 0 8px 32px 0 rgba(251,191,36,0.15);
        }
        .premium-badge-glow {
          box-shadow: 0 0 16px 4px #fbbf24cc, 0 0 32px 8px #60a5fa55;
        }
        .premium-quest-glow {
          box-shadow: 0 0 12px 2px #34d39955, 0 0 24px 4px #f472b655;
        }
        .premium-shop-glow {
          box-shadow: 0 0 16px 4px #fbbf24cc, 0 0 32px 8px #60a5fa55;
        }
        .premium-avatar-glow {
          box-shadow: 0 0 32px 8px #a78bfa99, 0 0 64px 16px #fbbf24cc;
        }
        .gradient-text-premium {
          background: linear-gradient(90deg, #60a5fa 0%, #fbbf24 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes bounceIn {
          0% { transform: scale(0.7) translateY(-40px); opacity: 0; }
          60% { transform: scale(1.1) translateY(10px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounceIn 0.7s;
        }
        @keyframes levelupPop {
          0% { transform: scale(0.7) translateY(-60px); opacity: 0; }
          60% { transform: scale(1.2) translateY(10px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-levelup-pop {
          animation: levelupPop 1.2s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 1.5s infinite;
        }
      `}</style>
    </section>
  );
} 