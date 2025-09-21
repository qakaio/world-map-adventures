import { useState, useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { StartScreen } from '@/components/StartScreen';
import { GameMap } from '@/components/GameMap';
import { GameLevel } from '@/components/GameLevel';
import { GameMessages } from '@/components/GameMessages';

export const Game = () => {
  const { gameState, setCurrentLevel } = useGameState();
  const [view, setView] = useState<'start' | 'map' | 'level'>(() => {
    // Auto-start if game was already started
    return gameState.gameStarted ? 'map' : 'start';
  });

  const handleStartGame = () => {
    setView('map');
  };

  const handleLevelSelect = (levelId: number) => {
    setCurrentLevel(levelId);
    setView('level');
  };

  const handleBackToMap = () => {
    setCurrentLevel(null);
    setView('map');
  };

  return (
    <div className="min-h-screen bg-game-bg">
      <GameMessages />
      
      {view === 'start' && (
        <StartScreen onStartGame={handleStartGame} />
      )}
      
      {view === 'map' && (
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