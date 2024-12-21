import { GameState } from '@/types/game';
import { ITEMS } from './constants/items';
import { RESOURCES } from './constants/resources';
import { ALLOYS } from './constants/alloys';
import { calculateExpToNextLevel } from './experience';

export const initialGameState: GameState = {
  gold: 0,
  clickPower: 1,
  autoClickersCount: 0,
  craftingSpeedMultiplier: 1,
  maxCraftingSlots: 1,
  playerLevel: {
    level: 5,
    currentExp: 0,
    expToNextLevel: calculateExpToNextLevel(1),
    title: "Jeune Forgeron"
  },
  craftingSlots: [{ itemId: null, progress: 0, total: 0 }],
  resources: RESOURCES.map(r => ({ ...r, amount: 0 })),
  alloys: ALLOYS.map(a => ({ ...a, amount: 0 })),
  items: ITEMS,
  upgrades: [
    {
      id: 'better-hammer',
      name: 'Meilleur Marteau',
      description: 'Double la puissance de vos clics',
      cost: 50,
      multiplier: 2,
      purchased: false,
    },
    {
      id: 'master-forge',
      name: 'Forge du Maître',
      description: 'Double la vitesse de fabrication',
      cost: 500,
      multiplier: 2,
      purchased: false,
    },
    {
      id: 'dual-crafting',
      name: 'Double Forge',
      description: 'Permet de fabriquer deux objets simultanément',
      cost: 1500,
      multiplier: 2,
      purchased: false,
    },
  ],
};