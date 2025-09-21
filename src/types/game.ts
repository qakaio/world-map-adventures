export interface GameItem {
  id: string;
  name: string;
  description: string;
  sprite: string;
  usableWith?: string[];
}

export interface GameEvent {
  id: string;
  type: 'pickup' | 'use' | 'examine' | 'talk';
  trigger: string;
  condition?: string;
  action: string;
  message: string;
  itemGiven?: string;
  itemRequired?: string;
  nextLevel?: number;
}

export interface GameLevel {
  id: number;
  name: string;
  description: string;
  background: string;
  items: GameItem[];
  events: GameEvent[];
  unlocked: boolean;
  completed: boolean;
  connectedTo?: number[];
}

export interface GameState {
  currentLevel: number | null;
  inventory: GameItem[];
  levels: GameLevel[];
  gameStarted: boolean;
}

export interface GameMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: number;
}