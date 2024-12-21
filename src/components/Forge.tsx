import { motion } from 'framer-motion';
import { Hammer } from 'lucide-react';
import { GameButton } from '@/components/ui/game-button';

interface ForgeProps {
  onForgeClick: () => void;
  clickPower: number;
}

export function Forge({ onForgeClick, clickPower }: ForgeProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer"
        onClick={onForgeClick}
      >
        <Hammer className="w-24 h-24 text-primary" />
      </motion.div>
      <GameButton
        onClick={onForgeClick}
        className="text-lg px-8 py-4"
      >
        Forger! (+{clickPower})
      </GameButton>
    </div>
  );
}