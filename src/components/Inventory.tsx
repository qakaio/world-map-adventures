import { useGameState } from '@/hooks/useGameState';

interface InventoryProps {
  selectedItem: string | null;
  onItemSelect: (itemId: string | null) => void;
}

export const Inventory = ({ selectedItem, onItemSelect }: InventoryProps) => {
  const { gameState } = useGameState();

  const handleItemClick = (itemId: string) => {
    if (selectedItem === itemId) {
      onItemSelect(null); // Deselect if already selected
    } else {
      onItemSelect(itemId); // Select the item
    }
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h2 className="text-xl font-pixel text-game-primary mb-2 flex items-center gap-2">
          🎒 Inventário
        </h2>
        <p className="text-xs text-game-text-muted">
          Clique nos itens para usá-los
        </p>
      </div>

      {gameState.inventory.length === 0 ? (
        <div className="game-panel text-center py-8">
          <div className="text-4xl mb-4 opacity-50">📦</div>
          <p className="text-sm font-pixel text-game-text-muted">
            Inventário vazio
          </p>
          <p className="text-xs text-game-text-dim mt-2">
            Explore as fases para encontrar itens!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {gameState.inventory.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`
                w-full text-left game-item p-3 transition-all duration-200
                ${selectedItem === item.id 
                  ? 'border-game-border-bright bg-game-surface-elevated shadow-glow' 
                  : 'hover:border-game-border-bright'
                }
              `}
              title={item.description}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">
                  {item.sprite}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-pixel text-sm text-game-text mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-game-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
              
              {selectedItem === item.id && (
                <div className="mt-2 pt-2 border-t border-game-border">
                  <p className="text-xs font-pixel text-game-primary animate-pulse-custom">
                    ✨ Item selecionado
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Inventory Stats */}
      <div className="mt-6 game-panel p-3">
        <div className="text-center">
          <p className="text-sm font-pixel text-game-text-muted">
            {gameState.inventory.length} / 20 itens
          </p>
          <div className="w-full bg-game-border rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-game-primary to-game-primary-glow h-2 rounded-full transition-all duration-300"
              style={{ width: `${(gameState.inventory.length / 20) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-6 game-panel p-3">
        <h3 className="text-sm font-pixel text-game-accent mb-2">💡 Dicas</h3>
        <ul className="text-xs text-game-text-muted space-y-1">
          <li>• Combine itens com objetos nas fases</li>
          <li>• Alguns itens abrem novas áreas</li>
          <li>• Examine tudo cuidadosamente</li>
          <li>• Volte a fases anteriores com novos itens</li>
        </ul>
      </div>
    </div>
  );
};