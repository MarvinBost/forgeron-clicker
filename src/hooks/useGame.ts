import { useState, useCallback, useEffect } from 'react';
import { GameState } from '@/types/game';
import { initialGameState } from '@/lib/gameState';
import { handleCrafting, handleAlloyCrafting } from '@/lib/crafting';
import { handleUpgrades } from '@/lib/upgrades';
import { addPlayerExp } from '@/lib/experience';

const AUTOCLICKER_INTERVAL = 1000;
const CRAFTING_TICK = 100;
const AUTOCLICKER_COST = 100;

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const handleClick = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      gold: prev.gold + prev.clickPower,
    }));
  }, []);

  const purchaseResource = useCallback((resourceId: string) => {
    setGameState((prev) => {
      const resource = prev.resources.find((r) => r.id === resourceId);
      if (!resource || prev.gold < resource.basePrice) return prev;

      return {
        ...prev,
        gold: prev.gold - resource.basePrice,
        resources: prev.resources.map((r) =>
          r.id === resourceId ? { ...r, amount: r.amount + 1 } : r
        ),
      };
    });
  }, []);

  const purchaseAutoClicker = useCallback(() => {
    setGameState((prev) => {
      if (prev.gold < AUTOCLICKER_COST) return prev;
      return {
        ...prev,
        gold: prev.gold - AUTOCLICKER_COST,
        autoClickersCount: prev.autoClickersCount + 1,
      };
    });
  }, []);

  const startCrafting = useCallback((itemId: string) => {
    setGameState((prev) => handleCrafting(prev, itemId));
  }, []);

  const startAlloyCrafting = useCallback((alloyId: string) => {
    setGameState((prev) => handleAlloyCrafting(prev, alloyId));
  }, []);

  const purchaseUpgrade = useCallback((upgradeId: string) => {
    setGameState((prev) => handleUpgrades(prev, upgradeId));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev) => {
        const newSlots = prev.craftingSlots.map((slot) => {
          if (!slot.itemId) return slot;

          const progress = slot.progress + (CRAFTING_TICK * prev.craftingSpeedMultiplier);
          const item = [...prev.items, ...prev.alloys].find(i => i.id === slot.itemId);
          const total = item?.craftingTime || slot.total;
          
          if (progress >= total) {
            if (!item) return slot;

            return {
              itemId: null,
              progress: 0,
              total: 0,
            };
          }

          return {
            ...slot,
            progress,
          };
        });

        const completedItems = prev.craftingSlots.filter((slot, index) => {
          const item = [...prev.items, ...prev.alloys].find(i => i.id === slot.itemId);
          return slot.itemId && 
                 item &&
                 slot.progress + (CRAFTING_TICK * prev.craftingSpeedMultiplier) >= item.craftingTime &&
                 newSlots[index].itemId === null;
        }).map(slot => [...prev.items, ...prev.alloys].find(i => i.id === slot.itemId)!);

        if (completedItems.length === 0) {
          return {
            ...prev,
            craftingSlots: newSlots,
          };
        }

        const totalGold = completedItems.reduce((sum, item) => sum + item.basePrice, 0);
        const totalExp = completedItems.reduce((sum, item) => sum + item.expReward, 0);
        const newPlayerLevel = addPlayerExp(
          prev.playerLevel.currentExp,
          prev.playerLevel.level,
          totalExp
        );

        return {
          ...prev,
          craftingSlots: newSlots,
          gold: prev.gold + totalGold,
          playerLevel: newPlayerLevel,
        };
      });
    }, CRAFTING_TICK);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gameState.autoClickersCount === 0) return;

    const interval = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        gold: prev.gold + prev.clickPower * prev.autoClickersCount,
      }));
    }, AUTOCLICKER_INTERVAL);

    return () => clearInterval(interval);
  }, [gameState.autoClickersCount]);

  return {
    gameState,
    handleClick,
    purchaseUpgrade,
    purchaseResource,
    startCrafting,
    startAlloyCrafting,
    purchaseAutoClicker,
  };
};