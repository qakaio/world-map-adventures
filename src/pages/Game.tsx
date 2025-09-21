import { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { StartScreen } from '@/components/StartScreen';
import { GameMap } from '@/components/GameMap';
import { GameLevel } from '@/components/GameLevel';
import { GameMessages } from '@/components/GameMessages';

export const Game = () => {
  const { gameState, setCurrentLevel } = useGameState();
  const [view, setView] = useState<'start' | 'map' | 'level'>('start');

  useEffect(() => {
    // Auto-redirect to map if game was already started
    if (gameState.gameStarted && view === 'start') {
      setView('map');
    }

    // Listen for start game event
    const handleStartGame = () => setView('map');
    window.addEventListener('start-game', handleStartGame);
    return () => window.removeEventListener('start-game', handleStartGame);
  }, [gameState.gameStarted, view]);

  const handleLevelSelect = (levelId: number) => {
    setCurrentLevel(levelId);
    setView('level');
  };

  const handleBackToMap = () => {
    setCurrentLevel(null);
    setView('map');
  };

  // Auto-start if game was already started
  if (!gameState.gameStarted && view !== 'start') {
    setView('start');
  }

  return (
    <div className="min-h-screen bg-game-bg">
      <GameMessages />
      
      {view === 'start' && <StartScreen />}
      
      {view === 'map' && gameState.gameStarted && (
        <GameMap onLevelSelect={handleLevelSelect} />
      )}
      
      {view === 'level' && gameState.currentLevel && (
        <GameLevel 
          levelId={gameState.currentLevel} 
          onBackToMap={handleBackToMap} 
        />
      )}
    </div>
  );
};