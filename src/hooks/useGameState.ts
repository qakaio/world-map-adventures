import { useState, useCallback, useEffect } from 'react';
import { GameState, GameItem, GameMessage } from '@/types/game';
import { initialGameData } from '@/data/gameData';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem('pointClickGameState');
      return saved ? JSON.parse(saved) : initialGameData;
    } catch {
      return initialGameData;
    }
  });

  const [messages, setMessages] = useState<GameMessage[]>([]);

  // Sempre salva no localStorage quando gameState muda
  useEffect(() => {
    localStorage.setItem('pointClickGameState', JSON.stringify(gameState));
  }, [gameState]);

  const addToInventory = useCallback((item: GameItem) => {
    setGameState(prev => ({
      ...prev,
      inventory: [...prev.inventory, item],
      pickedUpItems: [...prev.pickedUpItems, item.id],
    }));
  }, []);

  const removeFromInventory = useCallback((itemId: string) => {
    setGameState(prev => ({
      ...prev,
      inventory: prev.inventory.filter(item => item.id !== itemId),
    }));
  }, []);

  const hasItem = useCallback(
    (itemId: string) => gameState.inventory.some(item => item.id === itemId),
    [gameState.inventory]
  );

  const isItemPickedUp = useCallback(
    (itemId: string) => gameState.pickedUpItems.includes(itemId),
    [gameState.pickedUpItems]
  );

  const setCurrentLevel = useCallback((levelId: number | null) => {
    setGameState(prev => ({
      ...prev,
      currentLevel: levelId,
    }));
  }, []);

  const completeLevel = useCallback((levelId: number) => {
    setGameState(prev => ({
      ...prev,
      levels: prev.levels.map(level =>
        level.id === levelId ? { ...level, completed: true } : level
      ),
    }));
  }, []);

  const unlockLevel = useCallback((levelId: number) => {
    setGameState(prev => ({
      ...prev,
      levels: prev.levels.map(level =>
        level.id === levelId ? { ...level, unlocked: true } : level
      ),
    }));
  }, []);

  const addMessage = useCallback((text: string, type: GameMessage['type'] = 'info') => {
    const message: GameMessage = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, message]);

    // Auto remove message depois de 3s
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== message.id));
    }, 3000);
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialGameData);
    setMessages([]);
    localStorage.removeItem('pointClickGameState');
  }, []);

  const saveGame = useCallback(() => {
    localStorage.setItem('pointClickGameState', JSON.stringify(gameState));
  }, [gameState]);

  return {
    gameState,
    messages,
    addToInventory,
    removeFromInventory,
    hasItem,
    isItemPickedUp,
    setCurrentLevel,
    completeLevel,
    unlockLevel,
    addMessage,
    startGame,
    resetGame,
    saveGame,
  };
};
