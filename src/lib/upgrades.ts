import { GameState } from '@/types/game';

export function handleUpgrades(state: GameState, upgradeId: string): GameState {
  const upgrade = state.upgrades.find((u) => u.id === upgradeId);
  if (!upgrade || upgrade.purchased || state.gold < upgrade.cost) {
    return state;
  }

  const newState = {
    ...state,
    gold: state.gold - upgrade.cost,
    upgrades: state.upgrades.map((u) =>
      u.id === upgradeId ? { ...u, purchased: true } : u
    ),
  };

  switch (upgradeId) {
    case 'better-hammer':
      newState.clickPower *= upgrade.multiplier;
      break;
    case 'master-forge':
      newState.craftingSpeedMultiplier *= upgrade.multiplier;
      break;
    case 'dual-crafting':
      newState.maxCraftingSlots = 2;
      newState.craftingSlots = [
        ...newState.craftingSlots,
        { itemId: null, progress: 0, total: 0 },
      ];
      break;
  }

  return newState;
}