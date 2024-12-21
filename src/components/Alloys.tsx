import { Card } from '@/components/Card';
import { GameButton } from '@/components/ui/game-button';
import { Alloy, Resource } from '@/types/game';
import { Progress } from '@/components/ui/progress';

interface AlloysProps {
  alloys: Alloy[];
  resources: Resource[];
  playerLevel: number;
  onCraft: (alloyId: string) => void;
}

export function Alloys({ alloys, resources, playerLevel, onCraft }: AlloysProps) {
  const canCraft = (alloy: Alloy) => {
    if (alloy.levelRequired > playerLevel) return false;
    
    return alloy.recipe.every((req) => {
      const resource = resources.find((r) => r.id === req.resourceId);
      return resource && resource.amount >= req.amount;
    });
  };

  return (
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
                  <li key={req.resourceId} className={
                    resource && resource.amount >= req.amount 
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }>
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
            onClick={() => onCraft(alloy.id)}
            disabled={!canCraft(alloy)}
            variant="outline"
            className="w-full"
          >
            Forger l'alliage
          </GameButton>
        </Card>
      ))}
    </div>
  );
}