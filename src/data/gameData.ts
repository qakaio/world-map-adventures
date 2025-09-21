import { GameState, GameLevel, GameItem, GameEvent } from '@/types/game';

// Game items database
export const gameItems: Record<string, GameItem> = {
  // Basic items
  'key-rusty': {
    id: 'key-rusty',
    name: 'Rusty Key',
    description: 'An old and rusty key. Looks like it opens something important.',
    sprite: '🗝️'
  },
  'gem-blue': {
    id: 'gem-blue',
    name: 'Blue Gem',
    description: 'A brilliant blue gem that pulses with magical energy.',
    sprite: '💎'
  },
  'scroll-ancient': {
    id: 'scroll-ancient',
    name: 'Ancient Scroll',
    description: 'A scroll with mysterious runes.',
    sprite: '📜'
  },
  'potion-healing': {
    id: 'potion-healing',
    name: 'Healing Potion',
    description: 'A potion that restores vital energy.',
    sprite: '🧪'
  },
  'crystal-power': {
    id: 'crystal-power',
    name: 'Power Crystal',
    description: 'A crystal that emanates magical power.',
    sprite: '🔮'
  },
  'map-treasure': {
    id: 'map-treasure',
    name: 'Treasure Map',
    description: 'A map showing the location of hidden treasure.',
    sprite: '🗺️'
  },
  'coin-golden': {
    id: 'coin-golden',
    name: 'Golden Coin',
    description: 'An ancient gold coin with mysterious symbols.',
    sprite: '🪙'
  },
  'book-spells': {
    id: 'book-spells',
    name: 'Spell Book',
    description: 'A grimoire containing powerful spells.',
    sprite: '📚'
  },
  'sword-magic': {
    id: 'sword-magic',
    name: 'Magic Sword',
    description: 'An enchanted sword that glows with its own light.',
    sprite: '⚔️'
  },
  'crown-ancient': {
    id: 'crown-ancient',
    name: 'Ancient Crown',
    description: 'The lost crown of the ancient kings.',
    sprite: '👑'
  }
};

// Game levels with progressive storytelling
export const gameLevels: GameLevel[] = [
  {
    id: 1,
    name: 'Enchanted Forest',
    description: 'A magical forest where your journey begins.',
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
        message: 'You found a Healing Potion! Might be useful later.',
        itemGiven: 'potion-healing'
      }
    ]
  },
  {
    id: 2,
    name: 'Abandoned Village',
    description: 'A mysterious village with empty houses.',
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
        message: 'A treasure map! This could lead to riches.',
        itemGiven: 'map-treasure'
      }
    ]
  },
  {
    id: 3,
    name: 'Dark Cave',
    description: 'A dark cave full of mysteries.',
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
        message: 'You used the potion and feel invigorated! The secret passage opened.',
        itemRequired: 'potion-healing'
      }
    ]
  },
  {
    id: 4,
    name: 'Treasure Chamber',
    description: 'An ancient chamber with a locked chest.',
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
        message: 'The chest opened! Inside is a brilliant blue gem.',
        itemRequired: 'key-rusty',
        itemGiven: 'gem-blue'
      }
    ]
  },
  {
    id: 5,
    name: 'Sage\'s Tower',
    description: 'The tower of an ancient sage.',
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
        message: 'You found an ancient scroll with mysterious runes.',
        itemGiven: 'scroll-ancient'
      }
    ]
  },
  {
    id: 6,
    name: 'Magic Library',
    description: 'A library full of arcane knowledge.',
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
        message: 'The scroll was translated! You learned about a power crystal.',
        itemRequired: 'scroll-ancient',
        itemGiven: 'book-spells'
      }
    ]
  },
  {
    id: 7,
    name: 'Crystal Lake',
    description: 'A magical lake with crystal clear waters.',
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
        message: 'You found a rusty key at the bottom of the lake!',
        itemGiven: 'key-rusty'
      }
    ]
  },
  {
    id: 8,
    name: 'Lost Temple',
    description: 'An ancient temple with magical energy.',
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
        message: 'The gem activated the altar! A power crystal emerges.',
        itemRequired: 'gem-blue',
        itemGiven: 'crystal-power'
      }
    ]
  },
  {
    id: 9,
    name: 'Enchanted Garden',
    description: 'A magical garden with glowing plants.',
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
        message: 'A golden coin was hidden among the flowers!',
        itemGiven: 'coin-golden'
      }
    ]
  },
  {
    id: 10,
    name: 'Ancient Forge',
    description: 'An ancient forge where magical weapons were created.',
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
        message: 'You forged a magic sword using the power crystal!',
        itemRequired: 'crystal-power',
        itemGiven: 'sword-magic'
      }
    ]
  },
  {
    id: 11,
    name: 'Broken Bridge',
    description: 'An ancient bridge that needs to be repaired.',
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
        message: 'You used magic to repair the bridge! New areas have opened.',
        itemRequired: 'book-spells'
      }
    ]
  },
  {
    id: 12,
    name: 'Sacred Mountain',
    description: 'A mountain where the ancient gods dwelled.',
    background: '⛰️',
    unlocked: false,
    completed: false,
    items: [],
    events: []
  },
  {
    id: 13,
    name: 'Mystic Desert',
    description: 'A desert with magical mirages.',
    background: '🏜️',
    unlocked: false,
    completed: false,
    items: [],
    events: []
  },
  {
    id: 14,
    name: 'Hidden Oasis',
    description: 'A secret oasis in the middle of the desert.',
    background: '🏝️',
    unlocked: false,
    completed: false,
    items: [],
    events: []
  },
  {
    id: 15,
    name: 'Floating Castle',
    description: 'A castle that floats in the clouds.',
    background: '🏰',
    unlocked: false,
    completed: false,
    items: [],
    events: []
  },
  {
    id: 16,
    name: 'Alchemical Laboratory',
    description: 'A laboratory full of magical experiments.',
    background: '⚗️',
    unlocked: false,
    completed: false,
    items: [],
    events: []
  },
  {
    id: 17,
    name: 'Shadow Prison',
    description: 'A prison where darkness was imprisoned.',
    background: '⛓️',
    unlocked: false,
    completed: false,
    items: [],
    events: []
  },
  {
    id: 18,
    name: 'Dimensional Portal',
    description: 'A portal that leads to other dimensions.',
    background: '🌀',
    unlocked: false,
    completed: false,
    items: [],
    events: []
  },
  {
    id: 19,
    name: 'King\'s Hall',
    description: 'The great hall where the lost king ruled.',
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
        message: 'You proved yourself worthy! The ancient crown is yours.',
        itemRequired: 'sword-magic',
        itemGiven: 'crown-ancient'
      }
    ]
  },
  {
    id: 20,
    name: 'Final Sanctuary',
    description: 'The final sanctuary where your journey is completed.',
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
        message: 'Congratulations! You have completed your epic journey!',
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