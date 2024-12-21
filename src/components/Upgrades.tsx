import { Card } from '@/components/ui/card';
import { GameButton } from '@/components/ui/game-button';
import { Upgrade } from '@/types/game';

interface UpgradesProps {
  upgrades: Upgrade[];
  gold: number;
  onPurchase: (upgradeId: string) => void;
}

export function Upgrades({ upgrades, gold, onPurchase }: UpgradesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {upgrades.map((upgrade) => (
        <Card key={upgrade.id} className="p-4">
          <h3 className="text-lg font-semibold mb-2">{upgrade.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {upgrade.description}
          </p>
          <GameButton
            onClick={() => onPurchase(upgrade.id)}
            disabled={upgrade.purchased || gold < upgrade.cost}
            variant={upgrade.purchased ? 'secondary' : 'default'}
            className="w-full"
          >
            {upgrade.purchased
              ? 'Acheté'
              : `Acheter (${upgrade.cost} or)`}
          </GameButton>
        </Card>
      ))}
    </div>
  );
}