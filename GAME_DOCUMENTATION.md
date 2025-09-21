# 🎮 Adventure Quest - Documentação Completa

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Customização de Sprites e Backgrounds](#customização-de-sprites-e-backgrounds)
4. [Editando Eventos](#editando-eventos)
5. [Adicionando Itens](#adicionando-itens)
6. [Sistema de Interações](#sistema-de-interações)
7. [Alterando Diálogos](#alterando-diálogos)
8. [Configurando Níveis](#configurando-níveis)
9. [Sistema de Progressão](#sistema-de-progressão)
10. [Customização Visual](#customização-visual)

---

## 🌟 Visão Geral

Adventure Quest é um jogo point & click desenvolvido em React + TypeScript que permite total customização. O jogo possui:

- **20 fases interconectadas** com puzzles progressivos
- **Sistema de inventário** para coleta e uso de itens
- **Mecânica de puzzles** entre fases diferentes
- **Interface retro** com design pixel art
- **Sistema de save/load** automático
- **Feedback visual** para todas as ações

---

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes do jogo
│   ├── GameMap.tsx      # Mapa mundial com fases
│   ├── GameLevel.tsx    # Interface da fase individual
│   ├── Inventory.tsx    # Sistema de inventário
│   ├── GameMessages.tsx # Sistema de feedback
│   └── StartScreen.tsx  # Tela inicial
├── data/
│   └── gameData.ts      # 🔥 ARQUIVO PRINCIPAL - Dados do jogo
├── hooks/
│   └── useGameState.ts  # Gerenciamento de estado
├── types/
│   └── game.ts          # Tipos TypeScript
└── pages/
    ├── Game.tsx         # Componente principal
    └── Index.tsx        # Página inicial
```

**📢 IMPORTANTE:** O arquivo `src/data/gameData.ts` é onde você fará 90% das customizações!

---

## 🎨 Customização de Sprites e Backgrounds

### Alterando Sprites de Itens

No arquivo `src/data/gameData.ts`, procure o objeto `gameItems`:

```typescript
export const gameItems: Record<string, GameItem> = {
  'key-rusty': {
    id: 'key-rusty',
    name: 'Chave Enferrujada',
    description: 'Uma chave antiga e enferrujada.',
    sprite: '🗝️'  // ← ALTERE AQUI
  },
  // Adicione novos itens aqui
  'my-new-item': {
    id: 'my-new-item',
    name: 'Meu Item',
    description: 'Descrição do meu item',
    sprite: '⭐'
  }
};
```

### Alterando Backgrounds das Fases

No array `gameLevels`, cada fase tem uma propriedade `background`:

```typescript
{
  id: 1,
  name: 'Floresta Inicial',
  description: 'Uma floresta mágica...',
  background: '🌲',  // ← ALTERE AQUI
  // ...
}
```

### 💡 Dicas para Sprites

- **Emojis:** Use emojis para sprites rápidos e universais
- **Texto:** Use caracteres especiais: ⚔️🛡️🏺🔮💎🗝️
- **Imagens:** Para sprites personalizados, substitua por URLs ou importe imagens
- **Consistência:** Mantenha um estilo visual consistente

**Exemplo com imagem personalizada:**
```typescript
sprite: '/assets/my-custom-sword.png'
```

---

## ⚡ Editando Eventos

### Estrutura de um Evento

```typescript
interface GameEvent {
  id: string;           // ID único do evento
  type: 'pickup' | 'use' | 'examine' | 'talk';  // Tipo de interação
  trigger: string;      // O que dispara o evento
  condition?: string;   // Condição opcional
  action: string;       // O que acontece
  message: string;      // Feedback para o jogador
  itemGiven?: string;   // Item dado ao jogador
  itemRequired?: string; // Item necessário
  nextLevel?: number;   // Próximo nível a desbloquear
}
```

### Tipos de Eventos

#### 1. **Eventos de Coleta (pickup)**
```typescript
{
  id: 'pickup-sword',
  type: 'pickup',
  trigger: 'magic-sword',
  action: 'add-to-inventory',
  message: 'Você encontrou uma espada mágica!',
  itemGiven: 'magic-sword'
}
```

#### 2. **Eventos de Uso (use)**
```typescript
{
  id: 'unlock-door',
  type: 'use',
  trigger: 'locked-door',
  condition: 'has-key',
  action: 'unlock',
  message: 'A porta se abriu!',
  itemRequired: 'golden-key'
}
```

#### 3. **Eventos de Exame (examine)**
```typescript
{
  id: 'examine-statue',
  type: 'examine',
  trigger: 'ancient-statue',
  action: 'show-message',
  message: 'Uma estátua antiga com inscrições misteriosas.'
}
```

### Adicionando Novos Eventos

1. **Abra** `src/data/gameData.ts`
2. **Encontre** a fase desejada no array `gameLevels`
3. **Adicione** ao array `events`:

```typescript
{
  id: 7,  // Fase 7
  name: 'Lago Cristalino',
  // ... outras propriedades
  events: [
    // Eventos existentes...
    
    // SEU NOVO EVENTO AQUI
    {
      id: 'new-puzzle',
      type: 'use',
      trigger: 'crystal-altar',
      condition: 'has-crystal-shard',
      action: 'activate-portal',
      message: 'O portal se ativou! Uma nova dimensão se abriu.',
      itemRequired: 'crystal-shard',
      itemGiven: 'portal-key'
    }
  ]
}
```

---

## 🎒 Adicionando Itens nas Fases

### Passo 1: Criar o Item

No objeto `gameItems`:

```typescript
'crystal-shard': {
  id: 'crystal-shard',
  name: 'Fragmento de Cristal',
  description: 'Um fragmento brilhante de cristal mágico.',
  sprite: '💎',
  usableWith: ['crystal-altar']  // Opcional: onde pode ser usado
}
```

### Passo 2: Adicionar à Fase

No array da fase, propriedade `items`:

```typescript
{
  id: 3,
  name: 'Caverna Cristalina',
  items: [
    gameItems['crystal-shard'],  // ← Adicione aqui
    gameItems['healing-potion']
  ],
  // ...
}
```

### Passo 3: Criar Evento de Coleta

No array `events` da mesma fase:

```typescript
events: [
  {
    id: 'pickup-crystal-shard',
    type: 'pickup',
    trigger: 'crystal-shard',
    action: 'add-to-inventory',
    message: 'Você coletou um fragmento de cristal brilhante!',
    itemGiven: 'crystal-shard'
  }
]
```

---

## 🔗 Sistema de Interações

### Interações Entre Fases

O sistema permite criar puzzles que conectam diferentes fases:

```typescript
// FASE 4: Baú trancado
{
  id: 4,
  events: [
    {
      id: 'unlock-treasure-chest',
      type: 'use',
      trigger: 'treasure-chest',
      condition: 'has-key-rusty',      // Precisa da chave
      action: 'give-item',
      message: 'O baú se abriu! Dentro há uma gema azul.',
      itemRequired: 'key-rusty',       // Consome a chave
      itemGiven: 'gem-blue'            // Dá a gema
    }
  ]
}

// FASE 7: Onde encontra a chave
{
  id: 7,
  items: [gameItems['key-rusty']],
  events: [
    {
      id: 'pickup-key',
      type: 'pickup',
      trigger: 'key-rusty',
      action: 'add-to-inventory',
      message: 'Você encontrou a chave no fundo do lago!',
      itemGiven: 'key-rusty'
    }
  ]
}
```

### Objetos Interativos

Adicione objetos clicáveis nas fases:

```typescript
// No arquivo GameLevel.tsx, procure por este trecho:
{event.trigger === 'treasure-chest' && '📦'}
{event.trigger === 'magic-altar' && '⛪'}
{event.trigger === 'crystal-fountain' && '⛲'}  // ← Adicione aqui

// Depois adicione o evento correspondente:
{
  id: 'use-fountain',
  type: 'use',
  trigger: 'crystal-fountain',
  action: 'heal-player',
  message: 'A água cristalina restaurou sua energia!'
}
```

---

## 💬 Alterando Diálogos

### Mensagens de Feedback

Todas as mensagens estão na propriedade `message` dos eventos:

```typescript
{
  id: 'pickup-sword',
  type: 'pickup',
  trigger: 'legendary-sword',
  action: 'add-to-inventory',
  message: 'VOCÊ ENCONTROU A LENDÁRIA EXCALIBUR! ⚔️✨',  // ← Customize aqui
  itemGiven: 'legendary-sword'
}
```

### Tipos de Mensagem

O sistema suporta diferentes tipos de feedback:

```typescript
// No código React:
addMessage('Texto da mensagem', 'success');  // Verde ✅
addMessage('Texto da mensagem', 'warning');  // Amarelo ⚠️
addMessage('Texto da mensagem', 'error');    // Vermelho ❌
addMessage('Texto da mensagem', 'info');     // Azul ℹ️
```

### Adicionando Diálogos Complexos

Para diálogos mais elaborados, você pode criar eventos de exame:

```typescript
{
  id: 'talk-to-wizard',
  type: 'examine',
  trigger: 'wise-wizard',
  action: 'show-dialogue',
  message: '🧙‍♂️ "Aventureiro, você busca a lendária Coroa Ancestral? Primeiro deve provar seu valor coletando os três cristais elementais..."'
}
```

---

## 🗺️ Configurando Níveis

### Estrutura Completa de um Nível

```typescript
{
  id: 15,                                    // ID único (1-20)
  name: 'Castelo Flutuante',                // Nome da fase
  description: 'Um castelo que flutua nas nuvens.',  // Descrição
  background: '🏰',                          // Emoji/sprite de fundo
  unlocked: false,                           // Inicialmente bloqueada
  completed: false,                          // Não completada
  items: [                                   // Itens disponíveis
    gameItems['magical-orb'],
    gameItems['cloud-essence']
  ],
  events: [                                  // Eventos da fase
    {
      id: 'pickup-orb',
      type: 'pickup',
      trigger: 'magical-orb',
      action: 'add-to-inventory',
      message: 'Um orbe mágico flutua em suas mãos!',
      itemGiven: 'magical-orb'
    },
    {
      id: 'activate-castle-gate',
      type: 'use',
      trigger: 'castle-gate',
      condition: 'has-sky-key',
      action: 'unlock-next-area',
      message: 'O portão do castelo se abriu! Novos horizontes esperam.',
      itemRequired: 'sky-key'
    }
  ],
  connectedTo: [16, 17]                      // Fases que desbloqueia
}
```

### Desbloqueando Fases

Para desbloquear fases automaticamente:

```typescript
// No useGameState.ts, a função unlockLevel já existe
// Use nos eventos:
{
  id: 'complete-puzzle',
  type: 'use',
  trigger: 'final-switch',
  action: 'unlock-area',  // Este action desbloqueia as próximas 3 fases
  message: 'Você resolveu o puzzle! Novas áreas foram descobertas.',
  itemRequired: 'puzzle-piece'
}
```

---

## 🚀 Sistema de Progressão

### Mecânicas de Progressão

#### 1. **Progressão Linear**
```typescript
// Fase 1 → Fase 2 → Fase 3
{
  id: 'complete-level-1',
  action: 'unlock-next',
  // Desbloqueia automaticamente a próxima fase
}
```

#### 2. **Progressão por Itens**
```typescript
// Precisa coletar 3 cristais para prosseguir
{
  id: 'final-door',
  condition: 'has-crystal-red AND has-crystal-blue AND has-crystal-green',
  message: 'Os três cristais ressoam! O portal final se abriu!'
}
```

#### 3. **Progressão Não-Linear**
```typescript
// Múltiplas fases desbloqueadas simultaneamente
{
  action: 'unlock-branches',
  // Desbloqueia fases 8, 9 e 10 ao mesmo tempo
}
```

### Condições Complexas

Para puzzles avançados, você pode implementar condições customizadas no `useGameState.ts`:

```typescript
// Exemplo: verificar múltiplos itens
const hasMultipleItems = (itemIds: string[]) => {
  return itemIds.every(id => gameState.inventory.some(item => item.id === id));
};

// Usar no evento:
condition: 'has-all-gems',  // Implementar lógica customizada
```

---

## 🎨 Customização Visual

### Alterando Cores do Jogo

No arquivo `src/index.css`, seção `:root`:

```css
:root {
  /* Altere estas cores para personalizar o tema */
  --game-primary: 45 100% 65%;        /* Cor principal (dourado) */
  --game-secondary: 210 100% 60%;     /* Cor secundária (azul) */
  --game-accent: 285 100% 70%;        /* Cor de destaque (roxo) */
  --game-success: 120 60% 50%;        /* Cor de sucesso (verde) */
  --game-warning: 35 100% 60%;        /* Cor de aviso (laranja) */
  --game-danger: 0 70% 60%;           /* Cor de perigo (vermelho) */
}
```

### Alterando Fontes

```css
/* Troque as fontes no Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Orbitron:wght@400;700;900&display=swap');

/* Ou use fontes locais */
.font-pixel {
  font-family: 'Sua-Fonte-Personalizada', monospace;
}
```

### Animações Customizadas

```css
/* Adicione suas próprias animações */
@keyframes minha-animacao {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.minha-classe {
  animation: minha-animacao 2s infinite;
}
```

---

## 🛠️ Dicas Avançadas

### 1. **Debug Mode**
Adicione logs para debugar:

```typescript
// No useGameState.ts
console.log('Inventário atual:', gameState.inventory);
console.log('Fase atual:', gameState.currentLevel);
```

### 2. **Save Personalizado**
O jogo salva automaticamente no localStorage, mas você pode implementar saves nomeados:

```typescript
const saveGameWithName = (saveName: string) => {
  localStorage.setItem(`game-save-${saveName}`, JSON.stringify(gameState));
};
```

### 3. **Estatísticas do Jogador**
Adicione tracking de estatísticas:

```typescript
interface GameStats {
  itemsCollected: number;
  levelsCompleted: number;
  totalPlayTime: number;
}
```

### 4. **Sons e Efeitos**
Para adicionar áudio:

```typescript
const playSound = (soundFile: string) => {
  const audio = new Audio(`/sounds/${soundFile}.mp3`);
  audio.play();
};

// Use nos eventos:
{
  id: 'pickup-item',
  message: 'Item coletado!',
  onExecute: () => playSound('pickup')
}
```

---

## 🔧 Solução de Problemas

### Problemas Comuns

#### **1. Item não aparece na fase**
- ✅ Verifique se o item está no array `items` da fase
- ✅ Confirme se o ID do item está correto
- ✅ Verifique se o item existe em `gameItems`

#### **2. Evento não dispara**
- ✅ Confirme se o ID do evento é único
- ✅ Verifique se o `trigger` corresponde ao ID do item/objeto
- ✅ Teste se a condição está sendo atendida

#### **3. Fase não desbloqueia**
- ✅ Verifique se o evento tem `action: 'unlock-area'`
- ✅ Confirme se a função `unlockLevel` está sendo chamada
- ✅ Teste se o item necessário está no inventário

### **4. Erro de compilação**
- ✅ Verifique se todos os IDs são strings
- ✅ Confirme se não há vírgulas ou chaves faltando
- ✅ Teste se os imports estão corretos

---

## 📞 Suporte e Expansões

### Próximos Passos

Agora que você domina o básico, considere estas expansões:

1. **🎵 Sistema de Áudio:** Adicione música de fundo e efeitos sonoros
2. **💾 Múltiplos Saves:** Permita vários arquivos de save
3. **🏆 Sistema de Conquistas:** Adicione medalhas e objetivos
4. **🌍 Mais Mundos:** Crie mapas temáticos adicionais
5. **👥 Personagens:** Adicione NPCs com diálogos complexos
6. **🎮 Minigames:** Integre pequenos jogos dentro das fases
7. **📱 Mobile:** Optimize para dispositivos móveis
8. **🌐 Multiplayer:** Adicione modo cooperativo

### Recursos Úteis

- **Emojis para Sprites:** [Emojipedia](https://emojipedia.org/)
- **Paleta de Cores:** [Coolors](https://coolors.co/)
- **Fontes Pixel:** [Google Fonts](https://fonts.google.com/?category=Monospace)
- **Sons Gratuitos:** [Freesound](https://freesound.org/)

---

**🎉 Parabéns! Você agora tem um jogo point & click totalmente customizável!**

Divirta-se criando suas próprias aventuras épicas! 🚀✨