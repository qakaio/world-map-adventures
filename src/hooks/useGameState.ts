import { useState, useCallback } from 'react';
import { GameState, GameItem, GameMessage, GameLevel } from '@/types/game';
import { initialGameData } from '@/data/gameData';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('pointClickGameState');
    return saved ? JSON.parse(saved) : initialGameData;
  });

  const [messages, setMessages] = useState<GameMessage[]>([]);

  const saveGame = useCallback(() => {
    localStorage.setItem('pointClickGameState', JSON.stringify(gameState));
  }, [gameState]);

  const addToInventory = useCallback((item: GameItem) => {
    setGameState(prev => {
      const newState = {
        ...prev,
        inventory: [...prev.inventory, item]
      };
      localStorage.setItem('pointClickGameState', JSON.stringify(newState));
      return newState;
    });
  }, []);

  const removeFromInventory = useCallback((itemId: string) => {
    setGameState(prev => {
      const newState = {
        ...prev,
        inventory: prev.inventory.filter(item => item.id !== itemId)
      };
      localStorage.setItem('pointClickGameState', JSON.stringify(newState));
      return newState;
    });
  }, []);

  const hasItem = useCallback((itemId: string) => {
    return gameState.inventory.some(item => item.id === itemId);
  }, [gameState.inventory]);

  const setCurrentLevel = useCallback((levelId: number | null) => {
    setGameState(prev => {
      const newState = { ...prev, currentLevel: levelId };
      localStorage.setItem('pointClickGameState', JSON.stringify(newState));
      return newState;
    });
  }, []);

  const completeLevel = useCallback((levelId: number) => {
    setGameState(prev => {
      const newState = {
        ...prev,
        levels: prev.levels.map(level => 
          level.id === levelId ? { ...level, completed: true } : level
        )
      };
      localStorage.setItem('pointClickGameState', JSON.stringify(newState));
      return newState;
    });
  }, []);

  const unlockLevel = useCallback((levelId: number) => {
    setGameState(prev => {
      const newState = {
        ...prev,
        levels: prev.levels.map(level => 
          level.id === levelId ? { ...level, unlocked: true } : level
        )
      };
      localStorage.setItem('pointClickGameState', JSON.stringify(newState));
      return newState;
    });
  }, []);

  const addMessage = useCallback((text: string, type: GameMessage['type'] = 'info') => {
    const message: GameMessage = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, message]);
    
    // Auto remove message after 3 seconds
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== message.id));
    }, 3000);
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStarted: true }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialGameData);
    setMessages([]);
    localStorage.removeItem('pointClickGameState');
  }, []);

  return {
    gameState,
    messages,
    addToInventory,
    removeFromInventory,
    hasItem,
    setCurrentLevel,
    completeLevel,
    unlockLevel,
    addMessage,
    startGame,
    resetGame,
    saveGame
  };
};