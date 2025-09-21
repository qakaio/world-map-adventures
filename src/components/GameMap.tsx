import { useGameState } from '@/hooks/useGameState';

interface GameMapProps {
  onLevelSelect: (levelId: number) => void;
}

export const GameMap = ({ onLevelSelect }: GameMapProps) => {
  const { gameState } = useGameState();

  const mapLayout = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20]
  ];

  const getLevelStatus = (levelId: number) => {
    const level = gameState.levels.find(l => l.id === levelId);
    if (!level) return 'locked';
    if (level.completed) return 'completed';
    if (level.unlocked) return 'unlocked';
    return 'locked';
  };

  const handleLevelClick = (levelId: number) => {
    const level = gameState.levels.find(l => l.id === levelId);
    if (level?.unlocked) {
      onLevelSelect(levelId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-map p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-pixel text-game-primary mb-4">
            🗺️ Adventure Map
          </h1>
          <p className="text-game-text-muted">
            Select a level to begin your epic journey!
          </p>
        </div>

        <div className="game-panel max-w-4xl mx-auto">
          <div className="space-y-8">
            {mapLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-4 md:gap-8">
                {row.map((levelId) => {
                  const level = gameState.levels.find(l => l.id === levelId);
                  const status = getLevelStatus(levelId);
                  
                  return (
                    <div
                      key={levelId}
                      className="flex flex-col items-center gap-2"
                    >
                      <button
                        onClick={() => handleLevelClick(levelId)}
                        disabled={status === 'locked'}
                        className={`
                          game-level relative text-lg
                          ${status === 'completed' ? 'completed' : ''}
                          ${status === 'unlocked' && !level?.completed ? 'current' : ''}
                          ${status === 'locked' ? 'opacity-40 cursor-not-allowed' : ''}
                        `}
                        title={level?.name || `Level ${levelId}`}
                      >
                        <span className="text-2xl">{level?.background || '❓'}</span>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-game-surface border border-game-border flex items-center justify-center text-xs font-pixel">
                          {levelId}
                        </div>
                        {status === 'completed' && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-game-success border border-game-border-bright flex items-center justify-center">
                            <span className="text-xs">✓</span>
                          </div>
                        )}
                      </button>
                      
                      <div className="text-center">
                        <p className="text-xs font-pixel text-game-text-muted max-w-20 leading-tight">
                          {level?.name || `Level ${levelId}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="flex justify-center gap-6 text-xs font-pixel text-game-text-muted">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-game-surface border border-game-border"></div>
                <span>Locked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full game-level current"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full game-level completed"></div>
                <span>Complete</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="game-panel inline-block">
            <div className="text-sm font-pixel text-game-text-muted">
              <p>💡 Tip: Explore each level completely!</p>
              <p>Items found can be used in other levels.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};