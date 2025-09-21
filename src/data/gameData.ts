import { GameState, GameLevel, GameItem, GameEvent } from '@/types/game';

// Game items database
export const gameItems: Record<string, GameItem> = {
  // Basic items
  'key-rusty': {
    id: 'key-rusty',
    name: 'Chave Enferrujada',
    description: 'Uma chave antiga e enferrujada. Parece abrir algo importante.',
    sprite: '🗝️'
  },
  'gem-blue': {
    id: 'gem-blue',
    name: 'Gema Azul',
    description: 'Uma gema azul brilhante que pulsa com energia mágica.',
    sprite: '💎'
  },
  'scroll-ancient': {
    id: 'scroll-ancient',
    name: 'Pergaminho Antigo',
    description: 'Um pergaminho com runas misteriosas.',
    sprite: '📜'
  },
  'potion-healing': {
    id: 'potion-healing',
    name: 'Poção de Cura',
    description: 'Uma poção que restaura energia vital.',
    sprite: '🧪'
  },
  'crystal-power': {
    id: 'crystal-power',
    name: 'Cristal de Poder',
    description: 'Um cristal que emana poder mágico.',
    sprite: '🔮'
  },
  'map-treasure': {
    id: 'map-treasure',
    name: 'Mapa do Tesouro',
    description: 'Um mapa que mostra a localização de um tesouro escondido.',
    sprite: '🗺️'
  },
  'coin-golden': {
    id: 'coin-golden',
    name: 'Moeda Dourada',
    description: 'Uma moeda de ouro antiga com símbolos misteriosos.',
    sprite: '🪙'
  },
  'book-spells': {
    id: 'book-spells',
    name: 'Livro de Magias',
    description: 'Um grimório contendo magias poderosas.',
    sprite: '📚'
  },
  'sword-magic': {
    id: 'sword-magic',
    name: 'Espada Mágica',
    description: 'Uma espada encantada que brilha com luz própria.',
    sprite: '⚔️'
  },
  'crown-ancient': {
    id: 'crown-ancient',
    name: 'Coroa Ancestral',
    description: 'A coroa perdida dos reis antigos.',
    sprite: '👑'
  }
};

// Game levels with progressive storytelling
export const gameLevels: GameLevel[] = [
  {
    id: 1,
    name: 'Floresta Inicial',
    description: 'Uma floresta mágica onde sua jornada começa.',
    background: '🌲',
    unlocked: true,
    completed: false,
    items: [gameItems['potion-healing']],
    events: [
      {
        id: 'pickup-potion',
        type: 'pickup',
        trigger: 'potion-healing',
        action: 'add-to-inventory',
        message: 'Você encontrou uma Poção de Cura! Pode ser útil mais tarde.',
        itemGiven: 'potion-healing'
      }
    ]
  },
  {
    id: 2,
    name: 'Vila Abandonada',
    description: 'Uma vila misteriosa com casas vazias.',
    background: '🏘️',
    unlocked: true,
    completed: false,
    items: [gameItems['map-treasure']],
    events: [
      {
        id: 'pickup-map',
        type: 'pickup',
        trigger: 'map-treasure',
        action: 'add-to-inventory',
        message: 'Um mapa do tesouro! Isso pode levar a riquezas.',
        itemGiven: 'map-treasure'
      }
    ]
  },
  {
    id: 3,
    name: 'Caverna Sombria',
    description: 'Uma caverna escura cheia de mistérios.',
    background: '🕳️',
    unlocked: true,
    completed: false,
    items: [],
    events: [
      {
        id: 'use-potion-cave',
        type: 'use',
        trigger: 'healing-spot',
        condition: 'has-potion-healing',
        action: 'remove-from-inventory',
        message: 'Você usou a poção e se sente revigorado! A passagem secreta se abriu.',
        itemRequired: 'potion-healing'
      }
    ]
  },
  {
    id: 4,
    name: 'Câmara do Tesouro',
    description: 'Uma câmara antiga com um baú trancado.',
    background: '💰',
    unlocked: false,
    completed: false,
    items: [],
    events: [
      {
        id: 'unlock-treasure-chest',
        type: 'use',
        trigger: 'treasure-chest',
        condition: 'has-key-rusty',
        action: 'give-item',
        message: 'O baú se abriu! Dentro há uma gema azul brilhante.',
        itemRequired: 'key-rusty',
        itemGiven: 'gem-blue'
      }
    ]
  },
  {
    id: 5,
    name: 'Torre do Sábio',
    description: 'A torre de um antigo sábio.',
    background: '🗼',
    unlocked: false,
    completed: false,
    items: [gameItems['scroll-ancient']],
    events: [
      {
        id: 'pickup-scroll',
        type: 'pickup',
        trigger: 'scroll-ancient',
        action: 'add-to-inventory',
        message: 'Você encontrou um pergaminho antigo com runas misteriosas.',
        itemGiven: 'scroll-ancient'
      }
    ]
  },
  {
    id: 6,
    name: 'Biblioteca Mágica',
    description: 'Uma biblioteca cheia de conhecimento arcano.',
    background: '📚',
    unlocked: false,
    completed: false,
    items: [],
    events: [
      {
        id: 'translate-scroll',
        type: 'use',
        trigger: 'magic-pedestal',
        condition: 'has-scroll-ancient',
        action: 'give-item',
        message: 'O pergaminho foi traduzido! Você aprendeu sobre um cristal de poder.',
        itemRequired: 'scroll-ancient',
        itemGiven: 'book-spells'
      }
    ]
  },
  {
    id: 7,
    name: 'Lago Cristalino',
    description: 'Um lago mágico com águas cristalinas.',
    background: '🏞️',
    unlocked: false,
    completed: false,
    items: [gameItems['key-rusty']],
    events: [
      {
        id: 'pickup-key',
        type: 'pickup',
        trigger: 'key-rusty',
        action: 'add-to-inventory',
        message: 'Você encontrou uma chave enferrujada no fundo do lago!',
        itemGiven: 'key-rusty'
      }
    ]
  },
  {
    id: 8,
    name: 'Templo Perdido',
    description: 'Um templo antigo com energia mágica.',
    background: '🏛️',
    unlocked: false,
    completed: false,
    items: [],
    events: [
      {
        id: 'activate-temple',
        type: 'use',
        trigger: 'altar',
        condition: 'has-gem-blue',
        action: 'give-item',
        message: 'A gema ativou o altar! Um cristal de poder emerge.',
        itemRequired: 'gem-blue',
        itemGiven: 'crystal-power'
      }
    ]
  },
  {
    id: 9,
    name: 'Jardim Encantado',
    description: 'Um jardim mágico com plantas luminosas.',
    background: '🌺',
    unlocked: false,
    completed: false,
    items: [gameItems['coin-golden']],
    events: [
      {
        id: 'pickup-coin',
        type: 'pickup',
        trigger: 'coin-golden',
        action: 'add-to-inventory',
        message: 'Uma moeda dourada estava escondida entre as flores!',
        itemGiven: 'coin-golden'
      }
    ]
  },
  {
    id: 10,
    name: 'Forja Ancestral',
    description: 'Uma forja antiga onde armas mágicas eram criadas.',
    background: '🔥',
    unlocked: false,
    completed: false,
    items: [],
    events: [
      {
        id: 'forge-sword',
        type: 'use',
        trigger: 'forge',
        condition: 'has-crystal-power',
        action: 'give-item',
        message: 'Você forjou uma espada mágica usando o cristal de poder!',
        itemRequired: 'crystal-power',
        itemGiven: 'sword-magic'
      }
    ]
  },
  {
    id: 11,
    name: 'Ponte Quebrada',
    description: 'Uma ponte antiga que precisa ser reparada.',
    background: '🌉',
    unlocked: false,
    completed: false,
    items: [],
    events: [
      {
        id: 'repair-bridge',
        type: 'use',
        trigger: 'bridge',
        condition: 'has-book-spells',
        action: 'unlock-area',
        message: 'Você usou magia para reparar a ponte! Novas áreas se abriram.',
        itemRequired: 'book-spells'
      }
    ]
  },
  {
    id: 12,
    name: 'Montanha Sagrada',
    description: 'Uma montanha onde os deuses antigos habitavam.',
    background: '⛰️',
    unlocked: false,
    completed: false,
    items: [],
    events: []
  },
  {
    id: 13,
    name: 'Deserto Místico',
    description: 'Um deserto com miragens mágicas.',
    background: '🏜️',
    unlocked: false,
    completed: false,
    items: [],
    events: []
  },
  {
    id: 14,
    name: 'Oásis Escondido',
    description: 'Um oásis secreto no meio do deserto.',
    background: '🏝️',
    unlocked: false,
    completed: false,
    items: [],
    events: []
  },
  {
    id: 15,
    name: 'Castelo Flutuante',
    description: 'Um castelo que flutua nas nuvens.',
    background: '🏰',
    unlocked: false,
    completed: false,
    items: [],
    events: []
  },
  {
    id: 16,
    name: 'Laboratório Alquímico',
    description: 'Um laboratório cheio de experimentos mágicos.',
    background: '⚗️',
    unlocked: false,
    completed: false,
    items: [],
    events: []
  },
  {
    id: 17,
    name: 'Prisão das Sombras',
    description: 'Uma prisão onde as trevas foram aprisionadas.',
    background: '⛓️',
    unlocked: false,
    completed: false,
    items: [],
    events: []
  },
  {
    id: 18,
    name: 'Portal Dimensional',
    description: 'Um portal que leva a outras dimensões.',
    background: '🌀',
    unlocked: false,
    completed: false,
    items: [],
    events: []
  },
  {
    id: 19,
    name: 'Salão do Rei',
    description: 'O grande salão onde o rei perdido governava.',
    background: '👑',
    unlocked: false,
    completed: false,
    items: [],
    events: [
      {
        id: 'claim-crown',
        type: 'use',
        trigger: 'throne',
        condition: 'has-sword-magic',
        action: 'give-item',
        message: 'Você provou ser digno! A coroa ancestral é sua.',
        itemRequired: 'sword-magic',
        itemGiven: 'crown-ancient'
      }
    ]
  },
  {
    id: 20,
    name: 'Santuário Final',
    description: 'O santuário final onde sua jornada se completa.',
    background: '✨',
    unlocked: false,
    completed: false,
    items: [],
    events: [
      {
        id: 'complete-game',
        type: 'use',
        trigger: 'final-altar',
        condition: 'has-crown-ancient',
        action: 'complete-game',
        message: 'Parabéns! Você completou sua jornada épica!',
        itemRequired: 'crown-ancient'
      }
    ]
  }
];

export const initialGameData: GameState = {
  currentLevel: null,
  inventory: [],
  levels: gameLevels,
  gameStarted: false
};