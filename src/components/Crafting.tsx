import { Card } from '@/components/Card';
import { GameButton } from '@/components/ui/game-button';
import { Progress } from '@/components/ui/progress';
import { Item, Resource, CraftingSlot, PlayerLevel, Alloy } from '@/types/game';
import { CraftingProgress } from './CraftingProgress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CraftingProps {
  items: Item[];
  resources: Resource[];
  alloys: Alloy[];
  craftingSlots: CraftingSlot[];
  playerLevel: PlayerLevel;
  onCraft: (itemId: string) => void;
  onAlloyForge: (alloyId: string) => void;
}

export function Crafting({
  items,
  resources,
  alloys,
  craftingSlots,
  playerLevel,
  onCraft,
  onAlloyForge,
}: CraftingProps) {
  const canCraft = (item: Item | Alloy) => {
    if (!playerLevel || item.levelRequired > playerLevel.level) return false;
    if (!craftingSlots.some(slot => slot.itemId === null)) return false;
    
    const requirements = 'resourcesRequired' in item ? item.resourcesRequired : item.recipe;
    return requirements.every((req) => {
      const resource = resources.find((r) => r.id === req.resourceId);
      return resource && resource.amount >= req.amount;
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Niveau de Forge: {playerLevel?.level || 1}</h3>
          <p className="text-sm text-muted-foreground">
            EXP: {playerLevel?.currentExp || 0} / {playerLevel?.expToNextLevel || 100}
          </p>
        </div>
        <Progress
          value={((playerLevel?.currentExp || 0) / (playerLevel?.expToNextLevel || 100)) * 100}
          className="h-2 mt-2"
        />
      </div>

      <CraftingProgress slots={craftingSlots} items={[...items, ...alloys]} />
      
      <Tabs defaultValue="items">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="items">Objets</TabsTrigger>
          <TabsTrigger value="alloys">Alliages</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <Card key={item.id} className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {item.description}
                </p>
                <div className="text-sm mb-4">
                  <p className="font-medium">Ressources nécessaires:</p>
                  <ul className="list-disc list-inside">
                    {item.resourcesRequired.map((req) => {
                      const resource = resources.find((r) => r.id === req.resourceId);
                      return (
                        <li
                          key={req.resourceId}
                          className={
                            resource && resource.amount >= req.amount
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }
                        >
                          {resource?.name}: {req.amount}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-2 space-y-1 text-muted-foreground">
                    <p>Temps: {item.craftingTime / 1000}s</p>
                    <p>Niveau requis: {item.levelRequired}</p>
                    <p>EXP: +{item.expReward}</p>
                  </div>
                </div>
                <GameButton
                  onClick={() => onCraft(item.id)}
                  disabled={!canCraft(item)}
                  variant="outline"
                  className="w-full"
                >
                  Fabriquer (+{item.basePrice} or)
                </GameButton>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alloys" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alloys.map((alloy) => (
              <Card key={alloy.id} className="p-4">
                <h3 className="text-lg font-semibold mb-2">{alloy.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Quantité: {alloy.amount}
                </p>
                <div className="text-sm mb-4">
                  <p className="font-medium">Recette:</p>
                  <ul className="list-disc list-inside">
                    {alloy.recipe.map((req) => {
                      const resource = resources.find((r) => r.id === req.resourceId);
                      return (
                        <li
                          key={req.resourceId}
                          className={
                            resource && resource.amount >= req.amount
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }
                        >
                          {resource?.name}: {req.amount}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-2 space-y-1 text-muted-foreground">
                    <p>Temps: {alloy.craftingTime / 1000}s</p>
                    <p>Niveau requis: {alloy.levelRequired}</p>
                    <p>EXP: +{alloy.expReward}</p>
                  </div>
                </div>
                <GameButton
                  onClick={() => onAlloyForge(alloy.id)}
                  disabled={!canCraft(alloy)}
                  variant="outline"
                  className="w-full"
                >
                  Forger l'alliage
                </GameButton>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}