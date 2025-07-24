import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Brain, 
  Sparkles, 
  Crown,
  X,
  RotateCcw,
  Play,
  Pause
} from 'lucide-react';

const MiniGameContainer = ({ onXPGain, onClose, isOpen }) => {
  const [activeGame, setActiveGame] = useState(null);
  const [gameStats, setGameStats] = useState({
    totalScore: 0,
    gamesPlayed: 0,
    highScores: {}
  });

  useEffect(() => {
    const saved = localStorage.getItem('portfolioMiniGames');
    if (saved) {
      setGameStats(JSON.parse(saved));
    }
  }, []);

  const saveStats = (newStats) => {
    setGameStats(newStats);
    localStorage.setItem('portfolioMiniGames', JSON.stringify(newStats));
  };

  const games = [
    {
      id: 'reaction',
      name: 'Test de Réaction',
      description: 'Cliquez dès que le cercle devient vert !',
      icon: Zap,
      color: 'from-yellow-400 to-orange-500',
      difficulty: 'Facile',
      xpReward: 15
    },
    {
      id: 'memory',
      name: 'Mémoire Séquentielle',
      description: 'Mémorisez et répétez la séquence !',
      icon: Brain,
      color: 'from-purple-400 to-pink-500',
      difficulty: 'Moyen',
      xpReward: 25
    },
    {
      id: 'target',
      name: 'Précision Ultime',
      description: 'Visez et cliquez sur les cibles !',
      icon: Target,
      color: 'from-blue-400 to-cyan-500',
      difficulty: 'Difficile',
      xpReward: 35
    },
    {
      id: 'puzzle',
      name: 'Puzzle Logique',
      description: 'Résolvez le puzzle en un minimum de mouvements !',
      icon: Sparkles,
      color: 'from-green-400 to-emerald-500',
      difficulty: 'Expert',
      xpReward: 50
    }
  ];

  const GameSelection = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="p-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Gamepad2 className="text-blue-400" />
          Mini-Jeux RPG
        </h2>
        <p className="text-gray-300">Gagnez de l'XP en jouant !</p>
        
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{gameStats.totalScore}</div>
            <div className="text-gray-400">Score Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{gameStats.gamesPlayed}</div>
            <div className="text-gray-400">Parties Jouées</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {games.map((game) => {
          const Icon = game.icon;
          const highScore = gameStats.highScores[game.id] || 0;
          
          return (
            <motion.button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-6 rounded-xl bg-gradient-to-br ${game.color} 
                text-white overflow-hidden group cursor-pointer
                border border-white/20 backdrop-blur-sm
              `}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <Icon size={32} className="drop-shadow-lg" />
                  <div className="text-right">
                    <div className="text-sm opacity-80">{game.difficulty}</div>
                    <div className="text-xs">+{game.xpReward} XP</div>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{game.name}</h3>
                <p className="text-sm opacity-90 mb-3">{game.description}</p>
                {highScore > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy size={16} />
                    <span>Record: {highScore}</span>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );

  const ReactionGame = () => {
    const [gameState, setGameState] = useState('waiting'); // waiting, ready, go, finished
    const [startTime, setStartTime] = useState(0);
    const [reactionTime, setReactionTime] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);

    const startGame = () => {
      setGameState('ready');
      const delay = Math.random() * 3000 + 2000; // 2-5 seconds
      const id = setTimeout(() => {
        setGameState('go');
        setStartTime(Date.now());
      }, delay);
      setTimeoutId(id);
    };

    const handleClick = () => {
      if (gameState === 'ready') {
        // Too early
        clearTimeout(timeoutId);
        setGameState('waiting');
        return;
      }
      
      if (gameState === 'go') {
        const time = Date.now() - startTime;
        setReactionTime(time);
        setGameState('finished');
        
        // Calculate score and XP
        let score = Math.max(1000 - time, 100);
        let xp = Math.floor(score / 50);
        
        const newStats = {
          ...gameStats,
          totalScore: gameStats.totalScore + score,
          gamesPlayed: gameStats.gamesPlayed + 1,
          highScores: {
            ...gameStats.highScores,
            reaction: Math.max(gameStats.highScores.reaction || 0, score)
          }
        };
        saveStats(newStats);
        onXPGain(xp);
      }
    };

    const reset = () => {
      setGameState('waiting');
      setReactionTime(0);
      if (timeoutId) clearTimeout(timeoutId);
    };

    return (
      <div className="text-center p-6">
        <h3 className="text-2xl font-bold mb-4 text-white">Test de Réaction</h3>
        
        <div className="mb-8">
          <motion.div
            className={`
              w-32 h-32 mx-auto rounded-full flex items-center justify-center text-4xl font-bold cursor-pointer
              ${gameState === 'waiting' ? 'bg-gray-600 text-gray-400' : ''}
              ${gameState === 'ready' ? 'bg-red-500 text-white' : ''}
              ${gameState === 'go' ? 'bg-green-500 text-white' : ''}
              ${gameState === 'finished' ? 'bg-blue-500 text-white' : ''}
            `}
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {gameState === 'waiting' && 'START'}
            {gameState === 'ready' && 'WAIT...'}
            {gameState === 'go' && 'CLICK!'}
            {gameState === 'finished' && reactionTime + 'ms'}
          </motion.div>
        </div>

        <div className="text-white space-y-3">
          {gameState === 'waiting' && (
            <div>
              <p className="mb-4">Cliquez sur le cercle dès qu'il devient vert !</p>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium"
              >
                Commencer
              </button>
            </div>
          )}
          
          {gameState === 'ready' && (
            <p className="text-red-400">Attendez le vert... (Ne cliquez pas maintenant !)</p>
          )}
          
          {gameState === 'finished' && (
            <div>
              <p className="text-green-400 mb-2">
                Temps de réaction: {reactionTime}ms
              </p>
              <p className="text-yellow-400 mb-4">
                Score: {Math.max(1000 - reactionTime, 100)} points
              </p>
              <button
                onClick={reset}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium"
              >
                Rejouer
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const MemoryGame = () => {
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShowingSequence, setIsShowingSequence] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [level, setLevel] = useState(1);
    const [gameOver, setGameOver] = useState(false);

    const colors = [
      { id: 0, color: 'bg-red-500', sound: 'C' },
      { id: 1, color: 'bg-blue-500', sound: 'D' },
      { id: 2, color: 'bg-green-500', sound: 'E' },
      { id: 3, color: 'bg-yellow-500', sound: 'F' }
    ];

    const startGame = () => {
      setSequence([Math.floor(Math.random() * 4)]);
      setUserSequence([]);
      setLevel(1);
      setGameOver(false);
      setIsPlaying(true);
      showSequence([Math.floor(Math.random() * 4)]);
    };

    const showSequence = async (seq) => {
      setIsShowingSequence(true);
      for (let i = 0; i < seq.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setActiveButton(seq[i]);
        await new Promise(resolve => setTimeout(resolve, 400));
        setActiveButton(null);
      }
      setIsShowingSequence(false);
    };

    const handleButtonClick = (colorId) => {
      if (isShowingSequence) return;
      
      const newUserSequence = [...userSequence, colorId];
      setUserSequence(newUserSequence);

      if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
        // Wrong!
        setGameOver(true);
        setIsPlaying(false);
        
        const score = (level - 1) * 100;
        const xp = Math.floor(score / 30);
        
        const newStats = {
          ...gameStats,
          totalScore: gameStats.totalScore + score,
          gamesPlayed: gameStats.gamesPlayed + 1,
          highScores: {
            ...gameStats.highScores,
            memory: Math.max(gameStats.highScores.memory || 0, score)
          }
        };
        saveStats(newStats);
        if (xp > 0) onXPGain(xp);
        return;
      }

      if (newUserSequence.length === sequence.length) {
        // Correct sequence completed!
        setLevel(level + 1);
        setUserSequence([]);
        const newSequence = [...sequence, Math.floor(Math.random() * 4)];
        setSequence(newSequence);
        setTimeout(() => showSequence(newSequence), 1000);
      }
    };

    return (
      <div className="text-center p-6">
        <h3 className="text-2xl font-bold mb-4 text-white">Mémoire Séquentielle</h3>
        
        <div className="mb-6">
          <div className="text-white mb-4">
            {!isPlaying && !gameOver && <p>Mémorisez la séquence et répétez-la !</p>}
            {isPlaying && <p>Niveau: {level}</p>}
            {gameOver && (
              <div>
                <p className="text-red-400 mb-2">Game Over!</p>
                <p className="text-yellow-400">Score final: {(level - 1) * 100} points</p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            {colors.map((color) => (
              <motion.button
                key={color.id}
                onClick={() => handleButtonClick(color.id)}
                disabled={isShowingSequence}
                className={`
                  w-20 h-20 rounded-lg ${color.color}
                  ${activeButton === color.id ? 'brightness-150 scale-110' : 'brightness-75'}
                  ${isShowingSequence ? 'cursor-not-allowed' : 'cursor-pointer'}
                  transition-all duration-200
                `}
                whileHover={!isShowingSequence ? { scale: 1.05 } : {}}
                whileTap={!isShowingSequence ? { scale: 0.95 } : {}}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {!isPlaying && (
            <button
              onClick={startGame}
              className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium text-white"
            >
              {gameOver ? 'Rejouer' : 'Commencer'}
            </button>
          )}
        </div>
      </div>
    );
  };

  const TargetGame = () => {
    const [targets, setTargets] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPlaying, setIsPlaying] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
      let interval;
      if (isPlaying && timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              endGame();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [isPlaying, timeLeft]);

    useEffect(() => {
      let interval;
      if (isPlaying) {
        interval = setInterval(() => {
          addTarget();
        }, 1500);
      }
      return () => clearInterval(interval);
    }, [isPlaying]);

    const addTarget = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      const newTarget = {
        id: Date.now(),
        x: Math.random() * (rect.width - 60) + 30,
        y: Math.random() * (rect.height - 60) + 30,
        size: Math.random() * 30 + 20,
        life: 3000 + Math.random() * 2000
      };
      
      setTargets(prev => [...prev, newTarget]);
      
      setTimeout(() => {
        setTargets(prev => prev.filter(t => t.id !== newTarget.id));
      }, newTarget.life);
    };

    const hitTarget = (targetId) => {
      setTargets(prev => prev.filter(t => t.id !== targetId));
      setScore(prev => prev + 10);
    };

    const startGame = () => {
      setScore(0);
      setTimeLeft(30);
      setTargets([]);
      setIsPlaying(true);
    };

    const endGame = () => {
      setIsPlaying(false);
      setTargets([]);
      
      const xp = Math.floor(score / 20);
      
      const newStats = {
        ...gameStats,
        totalScore: gameStats.totalScore + score,
        gamesPlayed: gameStats.gamesPlayed + 1,
        highScores: {
          ...gameStats.highScores,
          target: Math.max(gameStats.highScores.target || 0, score)
        }
      };
      saveStats(newStats);
      if (xp > 0) onXPGain(xp);
    };

    return (
      <div className="text-center p-6">
        <h3 className="text-2xl font-bold mb-4 text-white">Précision Ultime</h3>
        
        <div className="mb-4 flex justify-between items-center text-white">
          <div>Score: {score}</div>
          <div>Temps: {timeLeft}s</div>
        </div>

        <div
          ref={containerRef}
          className="relative w-full h-80 bg-gray-900 rounded-lg border-2 border-gray-600 overflow-hidden"
          style={{ minHeight: '320px' }}
        >
          {targets.map(target => (
            <motion.button
              key={target.id}
              onClick={() => hitTarget(target.id)}
              className="absolute bg-red-500 rounded-full flex items-center justify-center text-white font-bold"
              style={{
                left: target.x,
                top: target.y,
                width: target.size,
                height: target.size
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Target size={target.size * 0.4} />
            </motion.button>
          ))}
          
          {!isPlaying && timeLeft === 30 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={startGame}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium text-white"
              >
                Commencer
              </button>
            </div>
          )}
          
          {!isPlaying && timeLeft === 0 && (
            <div className="absolute inset-0 flex items-center justify-center flex-col bg-black/50">
              <p className="text-white text-xl mb-2">Fini !</p>
              <p className="text-yellow-400 mb-4">Score final: {score}</p>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium text-white"
              >
                Rejouer
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderActiveGame = () => {
    switch (activeGame) {
      case 'reaction':
        return <ReactionGame />;
      case 'memory':
        return <MemoryGame />;
      case 'target':
        return <TargetGame />;
      default:
        return <GameSelection />;
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/20 
                   backdrop-blur-md shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {activeGame && (
              <button
                onClick={() => setActiveGame(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <RotateCcw className="text-white" size={20} />
              </button>
            )}
            <h2 className="text-xl font-bold text-white">
              {activeGame ? games.find(g => g.id === activeGame)?.name : 'Mini-Jeux'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="text-white" size={20} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {renderActiveGame()}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default MiniGameContainer;