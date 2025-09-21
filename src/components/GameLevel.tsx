import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { GameItem, GameEvent } from '@/types/game';
import { Inventory } from './Inventory';

interface GameLevelProps {
  levelId: number;
  onBackToMap: () => void;
}

export const GameLevel = ({ levelId, onBackToMap }: GameLevelProps) => {
  const { gameState, addToInventory, removeFromInventory, hasItem, addMessage, completeLevel, unlockLevel } = useGameState();
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<string | null>(null);

  const level = gameState.levels.find(l => l.id === levelId);
  
  if (!level) {
    return (
      <div className="min-h-screen bg-gradient-map flex items-center justify-center">
        <div className="game-panel text-center">
          <h2 className="text-2xl font-pixel text-game-danger mb-4">Level not found!</h2>
          <button onClick={onBackToMap} className="game-button">
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  const handleItemClick = (item: GameItem) => {
    if (selectedInventoryItem) {
      // Try to use inventory item with level item
      handleUseItem(selectedInventoryItem, item.id);
      setSelectedInventoryItem(null);
    } else {
      // Pick up the item
      handlePickupItem(item);
    }
  };

  const handlePickupItem = (item: GameItem) => {
    const pickupEvent = level.events.find(
      event => event.type === 'pickup' && event.trigger === item.id
    );

    if (pickupEvent) {
      addToInventory(item);
      addMessage(pickupEvent.message, 'success');
      
      // Remove item from level (in a real game, you'd update the level state)
      // For now, we'll just hide picked up items
    }
  };

  const handleUseItem = (inventoryItemId: string, targetId: string) => {
    const useEvent = level.events.find(
      event => 
        event.type === 'use' && 
        event.trigger === targetId &&
        event.itemRequired === inventoryItemId
    );

    if (useEvent) {
      // Check if player has required item
      if (useEvent.itemRequired && !hasItem(useEvent.itemRequired)) {
        addMessage('You don\'t have the required item.', 'warning');
        return;
      }

      // Execute the event
      if (useEvent.itemRequired) {
        removeFromInventory(useEvent.itemRequired);
      }

      if (useEvent.itemGiven) {
        const newItem = Object.values(require('@/data/gameData').gameItems).find(
          (item: any) => item.id === useEvent.itemGiven
        );
        if (newItem) {
          addToInventory(newItem as GameItem);
        }
      }

      addMessage(useEvent.message, 'success');

      // Unlock next levels or complete current level
      if (useEvent.action === 'unlock-area') {
        // Unlock next few levels
        for (let i = levelId + 1; i <= Math.min(levelId + 3, 20); i++) {
          unlockLevel(i);
        }
      }

      if (useEvent.action === 'complete-game') {
        completeLevel(levelId);
        addMessage('🎉 You completed the game! Congratulations, adventurer!', 'success');
      }

    } else {
      addMessage('That doesn\'t work here.', 'warning');
    }
  };

  const handleInteractableClick = (eventId: string) => {
    const event = level.events.find(e => e.id === eventId);
    if (!event) return;

    if (selectedInventoryItem && event.type === 'use') {
      handleUseItem(selectedInventoryItem, event.trigger);
      setSelectedInventoryItem(null);
    } else if (event.type === 'examine') {
      addMessage(event.message, 'info');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-map">
      {/* Header */}
      <div className="p-4 bg-game-surface-elevated border-b-2 border-game-border">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button 
            onClick={onBackToMap}
            className="game-button text-sm"
          >
            ← Back to Map
          </button>
          <div className="text-center">
            <h1 className="text-xl font-pixel text-game-primary">
              {level.background} {level.name}
            </h1>
            <p className="text-sm text-game-text-muted">{level.description}</p>
          </div>
          <div className="w-24"> {/* Spacer */} </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Main Game Area */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Level Background */}
            <div className="game-panel min-h-96 relative">
              <div className="text-center text-8xl mb-8 animate-fade-in">
                {level.background}
              </div>
              
              <div className="text-center mb-8">
                <h2 className="text-2xl font-pixel text-game-text mb-2">{level.name}</h2>
                <p className="text-game-text-muted">{level.description}</p>
              </div>

              {/* Interactive Items */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {level.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="game-item group text-center p-4 hover:scale-105"
                    title={item.description}
                  >
                    <div className="text-3xl mb-2">{item.sprite}</div>
                    <p className="text-xs font-pixel text-game-text-muted group-hover:text-game-text">
                      {item.name}
                    </p>
                  </button>
                ))}
              </div>

              {/* Interactable Objects */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {level.events
                  .filter(event => event.type === 'use' || event.type === 'examine')
                  .map((event) => (
                    <button
                      key={event.id}
                      onClick={() => handleInteractableClick(event.id)}
                    className="game-item text-center p-4 hover:scale-105"
                    title="Click to interact"
                  >
                    <div className="text-2xl mb-2">
                      {event.trigger === 'treasure-chest' && '📦'}
                      {event.trigger === 'healing-spot' && '💊'}
                        {event.trigger === 'magic-pedestal' && '🔮'}
                        {event.trigger === 'altar' && '⛪'}
                        {event.trigger === 'forge' && '🔨'}
                        {event.trigger === 'bridge' && '🌉'}
                        {event.trigger === 'throne' && '👑'}
                        {event.trigger === 'final-altar' && '✨'}
                        {!['treasure-chest', 'healing-spot', 'magic-pedestal', 'altar', 'forge', 'bridge', 'throne', 'final-altar'].includes(event.trigger) && '❓'}
                      </div>
                      <p className="text-xs font-pixel text-game-text-muted">
                        {event.trigger.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                    </button>
                  ))}
              </div>

              {selectedInventoryItem && (
                <div className="absolute top-4 right-4 game-panel p-2">
                  <p className="text-xs font-pixel text-game-primary">
                    Using: {gameState.inventory.find(i => i.id === selectedInventoryItem)?.name}
                  </p>
                  <button 
                    onClick={() => setSelectedInventoryItem(null)}
                    className="text-xs text-game-danger hover:text-game-text"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Inventory Sidebar */}
        <div className="w-80 bg-game-surface-elevated border-l-2 border-game-border p-4">
          <Inventory 
            selectedItem={selectedInventoryItem}
            onItemSelect={setSelectedInventoryItem}
          />
        </div>
      </div>
    </div>
  );
};