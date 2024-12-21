import { Card } from '@/components/ui/card';
import { GameButton } from '@/components/ui/game-button';
import { Resource } from '@/types/game';

interface ResourcesProps {
  resources: Resource[];
  gold: number;
  onPurchase: (resourceId: string) => void;
}

export function Resources({ resources, gold, onPurchase }: ResourcesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resources.map((resource) => (
        <Card key={resource.id} className="p-4">
          <h3 className="text-lg font-semibold mb-2">{resource.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Quantité: {resource.amount}
          </p>
          <GameButton
            onClick={() => onPurchase(resource.id)}
            disabled={gold < resource.basePrice}
            variant="outline"
            className="w-full"
          >
            Acheter ({resource.basePrice} or)
          </GameButton>
        </Card>
      ))}
    </div>
  );
}