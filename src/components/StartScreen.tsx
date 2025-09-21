import { useGameState } from '@/hooks/useGameState';

export const StartScreen = () => {
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
            Um jogo point &amp; click épico
          </p>
          <p className="text-sm text-game-text-dim max-w-md mx-auto leading-relaxed">
            Explore 20 fases místicas, colete itens mágicos e resolva puzzles interconectados 
            nesta jornada épica cheia de mistérios e aventuras!
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => {
              startGame();
              // Auto start the game view
              setTimeout(() => window.dispatchEvent(new CustomEvent('start-game')), 100);
            }}
            className="game-button text-lg px-8 py-3 inline-block"
          >
            {gameState.inventory.length > 0 ? '🎮 Continuar Jogo' : '🚀 Começar Aventura'}
          </button>
          
          {gameState.inventory.length > 0 && (
            <div>
              <button 
                onClick={resetGame}
                className="text-sm text-game-text-muted hover:text-game-text transition-colors"
              >
                🔄 Novo Jogo
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <div className="game-panel">
            <h2 className="text-lg font-pixel text-game-accent mb-4">🎯 Como Jogar</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-game-text-muted">
              <div>
                <h3 className="font-pixel text-game-text mb-2">🗺️ Navegação</h3>
                <ul className="space-y-1 text-xs">
                  <li>• Clique nas fases do mapa para explorá-las</li>
                  <li>• Use "Voltar ao Mapa" para navegar</li>
                  <li>• Fases são desbloqueadas progressivamente</li>
                </ul>
              </div>
              <div>
                <h3 className="font-pixel text-game-text mb-2">🎒 Inventário</h3>
                <ul className="space-y-1 text-xs">
                  <li>• Colete itens clicando neles</li>
                  <li>• Selecione itens para usá-los</li>
                  <li>• Combine itens com objetos nas fases</li>
                </ul>
              </div>
              <div>
                <h3 className="font-pixel text-game-text mb-2">🧩 Puzzles</h3>
                <ul className="space-y-1 text-xs">
                  <li>• Itens de uma fase podem ser usados em outras</li>
                  <li>• Explore tudo cuidadosamente</li>
                  <li>• Volte a fases anteriores com novos itens</li>
                </ul>
              </div>
              <div>
                <h3 className="font-pixel text-game-text mb-2">🏆 Progressão</h3>
                <ul className="space-y-1 text-xs">
                  <li>• Complete puzzles para desbloquear áreas</li>
                  <li>• Colete todos os itens especiais</li>
                  <li>• Chegue até o Santuário Final</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs text-game-text-dim">
            Desenvolvido com ❤️ para aventureiros corajosos
          </p>
        </div>
      </div>
    </div>
  );
};