import { Card } from '@/components/ui/card';
import { GameButton } from '@/components/ui/game-button';
import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';

interface StatsProps {
  gold: number;
  clickPower: number;
  autoClickersCount: number;
  onPurchaseAutoClicker: () => void;
}

export function Stats({
  gold,
  clickPower,
  autoClickersCount,
  onPurchaseAutoClicker,
}: StatsProps) {
  const AUTOCLICKER_COST = 100;

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Coins className="w-8 h-8 text-yellow-500" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold">{gold} Or</h2>
          <p className="text-sm text-muted-foreground">
            Puissance de clic: {clickPower}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm">Auto-cliqueurs: {autoClickersCount}</p>
        <GameButton
          onClick={onPurchaseAutoClicker}
          disabled={gold < AUTOCLICKER_COST}
          variant="outline"
          className="w-full"
        >
          Acheter Auto-cliqueur ({AUTOCLICKER_COST} or)
        </GameButton>
      </div>
    </Card>
  );
}