import { Progress } from '@/components/ui/progress';
import { CraftingSlot } from '@/types/game';
import { motion } from 'framer-motion';
import { Timer } from 'lucide-react';

interface CraftingProgressProps {
  slots: CraftingSlot[];
  items: Array<{ id: string; name: string }>;
}

export function CraftingProgress({ slots, items }: CraftingProgressProps) {
  return (
    <div className="space-y-4">
      {slots.map((slot, index) => {
        if (!slot.itemId) return null;

        const item = items.find((i) => i.id === slot.itemId);
        if (!item) return null;

        const percentage = (slot.progress / slot.total) * 100;

        return (
          <div key={index} className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Timer className="w-5 h-5 text-primary" />
              </motion.div>
              <p className="font-medium">Fabrication en cours: {item.name}</p>
            </div>
            <Progress value={percentage} className="h-2" />
            <p className="text-sm text-muted-foreground text-right">
              {Math.round(percentage)}%
            </p>
          </div>
        );
      })}
    </div>
  );
}