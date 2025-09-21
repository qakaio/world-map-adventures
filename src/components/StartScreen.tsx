import { useGameState } from '@/hooks/useGameState';

interface StartScreenProps {
  onStartGame: () => void;
}

export const StartScreen = ({ onStartGame }: StartScreenProps) => {
  const { startGame, gameState, resetGame } = useGameState();

  return (
    <div className="min-h-screen bg-gradient-map flex items-center justify-center p-4">
      <div className="text-center animate-fade-in">
        <div className="mb-8">
          <div className="text-8xl mb-4 animate-bounce-custom">🗺️</div>
          <h1 className="text-4xl md:text-6xl font-pixel text-game-primary mb-4 animate-glow">
            Adventure Quest
          </h1>
          <p className="text-lg font-pixel text-game-text-muted mb-2">
            An Epic Point &amp; Click Adventure
          </p>
          <p className="text-sm text-game-text-dim max-w-md mx-auto leading-relaxed">
            Explore 20 mystical levels, collect magical items and solve interconnected puzzles 
            in this epic journey full of mysteries and adventures!
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => {
              startGame();
              onStartGame();
            }}
            className="game-button text-lg px-8 py-3 inline-block"
          >
            {gameState.inventory.length > 0 ? '🎮 Continue Game' : '🚀 Start Adventure'}
          </button>
          
          {gameState.inventory.length > 0 && (
            <div>
              <button 
                onClick={resetGame}
                className="text-sm text-game-text-muted hover:text-game-text transition-colors"
              >
                🔄 New Game
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <div className="game-panel">
            <h2 className="text-lg font-pixel text-game-accent mb-4">🎯 How to Play</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-game-text-muted">
              <div>
                <h3 className="font-pixel text-game-text mb-2">🗺️ Navigation</h3>
                <ul className="space-y-1 text-xs">
                  <li>• Click on map levels to explore them</li>
                  <li>• Use "Back to Map" to navigate</li>
                  <li>• Levels unlock progressively</li>
                </ul>
              </div>
              <div>
                <h3 className="font-pixel text-game-text mb-2">🎒 Inventory</h3>
                <ul className="space-y-1 text-xs">
                  <li>• Collect items by clicking them</li>
                  <li>• Select items to use them</li>
                  <li>• Combine items with level objects</li>
                </ul>
              </div>
              <div>
                <h3 className="font-pixel text-game-text mb-2">🧩 Puzzles</h3>
                <ul className="space-y-1 text-xs">
                  <li>• Items from one level can be used in others</li>
                  <li>• Explore everything carefully</li>
                  <li>• Return to previous levels with new items</li>
                </ul>
              </div>
              <div>
                <h3 className="font-pixel text-game-text mb-2">🏆 Progression</h3>
                <ul className="space-y-1 text-xs">
                  <li>• Complete puzzles to unlock areas</li>
                  <li>• Collect all special items</li>
                  <li>• Reach the Final Sanctuary</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs text-game-text-dim">
            Developed with ❤️ for brave adventurers
          </p>
        </div>
      </div>
    </div>
  );
};