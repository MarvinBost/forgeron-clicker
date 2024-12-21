export interface PlayerLevel {
  level: number;
  currentExp: number;
  expToNextLevel: number;
  title: string;
}

export interface CraftingSlot {
  itemId: string | null;
  progress: number;
  total: number;
}

export interface Resource {
  id: string;
  name: string;
  amount: number;
  basePrice: number;
}

export interface Alloy extends Resource {
  levelRequired: number;
  expReward: number;
  recipe: Array<{ resourceId: string; amount: number }>;
  craftingTime: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  expReward: number;
  levelRequired: number;
  resourcesRequired: Array<{ resourceId: string; amount: number }>;
  craftingTime: number;
}

export interface GameState {
  gold: number;
  clickPower: number;
  playerLevel: PlayerLevel;
  resources: Resource[];
  alloys: Alloy[];
  items: Item[];
  upgrades: Upgrade[];
  autoClickersCount: number;
  craftingSlots: CraftingSlot[];
  craftingSpeedMultiplier: number;
  maxCraftingSlots: number;
}