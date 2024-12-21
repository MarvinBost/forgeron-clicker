import { GameState } from '@/types/game';
import { addPlayerExp } from './experience';

export function handleCrafting(state: GameState, itemId: string): GameState {
  const item = state.items.find((i) => i.id === itemId);
  if (!item) return state;

  if (item.levelRequired > state.playerLevel.level) return state;

  const availableSlotIndex = state.craftingSlots.findIndex(
    (slot) => slot.itemId === null
  );
  if (availableSlotIndex === -1) return state;

  const canCraft = item.resourcesRequired.every((req) => {
    const resource = [...state.resources, ...state.alloys].find((r) => r.id === req.resourceId);
    return resource && resource.amount >= req.amount;
  });

  if (!canCraft) return state;

  const newResources = state.resources.map((r) => {
    const requirement = item.resourcesRequired.find(
      (req) => req.resourceId === r.id
    );
    return requirement
      ? { ...r, amount: r.amount - requirement.amount }
      : r;
  });

  const newAlloys = state.alloys.map((a) => {
    const requirement = item.resourcesRequired.find(
      (req) => req.resourceId === a.id
    );
    return requirement
      ? { ...a, amount: a.amount - requirement.amount }
      : a;
  });

  const newSlots = [...state.craftingSlots];
  newSlots[availableSlotIndex] = {
    itemId: item.id,
    progress: 0,
    total: item.craftingTime,
  };

  return {
    ...state,
    resources: newResources,
    alloys: newAlloys,
    craftingSlots: newSlots,
  };
}

export function handleAlloyCrafting(state: GameState, alloyId: string): GameState {
  const alloy = state.alloys.find((a) => a.id === alloyId);
  if (!alloy) return state;

  if (alloy.levelRequired > state.playerLevel.level) return state;

  const availableSlotIndex = state.craftingSlots.findIndex(
    (slot) => slot.itemId === null
  );
  if (availableSlotIndex === -1) return state;

  const canCraft = alloy.recipe.every((req) => {
    const resource = [...state.resources, ...state.alloys].find((r) => r.id === req.resourceId);
    return resource && resource.amount >= req.amount;
  });

  if (!canCraft) return state;

  const newResources = state.resources.map((r) => {
    const requirement = alloy.recipe.find(
      (req) => req.resourceId === r.id
    );
    return requirement
      ? { ...r, amount: r.amount - requirement.amount }
      : r;
  });

  const newAlloys = state.alloys.map((a) => {
    if (a.id === alloy.id) {
      return { ...a, amount: a.amount + 1 };
    }
    const requirement = alloy.recipe.find(
      (req) => req.resourceId === a.id
    );
    return requirement
      ? { ...a, amount: a.amount - requirement.amount }
      : a;
  });

  const newSlots = [...state.craftingSlots];
  newSlots[availableSlotIndex] = {
    itemId: alloy.id,
    progress: 0,
    total: alloy.craftingTime,
  };

  return {
    ...state,
    resources: newResources,
    alloys: newAlloys,
    craftingSlots: newSlots,
  };
}