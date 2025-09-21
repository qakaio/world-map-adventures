import { useGameState } from '@/hooks/useGameState';

export const GameMessages = () => {
  const { messages } = useGameState();

  if (messages.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`
            game-panel p-4 animate-fade-in border-l-4
            ${message.type === 'success' ? 'border-game-success bg-game-success/10' : ''}
            ${message.type === 'warning' ? 'border-game-warning bg-game-warning/10' : ''}
            ${message.type === 'error' ? 'border-game-danger bg-game-danger/10' : ''}
            ${message.type === 'info' ? 'border-game-secondary bg-game-secondary/10' : ''}
          `}
        >
          <div className="flex items-start gap-3">
            <div className="text-xl flex-shrink-0">
              {message.type === 'success' && '✅'}
              {message.type === 'warning' && '⚠️'}
              {message.type === 'error' && '❌'}
              {message.type === 'info' && 'ℹ️'}
            </div>
            <p className="font-pixel text-sm text-game-text leading-relaxed">
              {message.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};