import { Card } from '@/components/Card';
import { Progress } from '@/components/ui/progress';
import { PlayerLevel } from '@/types/game';

interface PlayerInfoProps {
  playerLevel: PlayerLevel;
}

export function PlayerInfo({ playerLevel }: PlayerInfoProps) {
  const expPercentage = (playerLevel.currentExp / playerLevel.expToNextLevel) * 100;

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-bold mb-2">{playerLevel.title}</h2>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Niveau {playerLevel.level}
        </p>
        <div className="space-y-1">
          <Progress value={expPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground text-right">
            {playerLevel.currentExp} / {playerLevel.expToNextLevel} EXP
          </p>
        </div>
      </div>
    </Card>
  );
}