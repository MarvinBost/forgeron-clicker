import { RANKS } from './constants/ranks';
import { PlayerLevel } from '@/types/game';

export function calculateExpToNextLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function addPlayerExp(currentExp: number, currentLevel: number, expToAdd: number): PlayerLevel {
  let totalExp = currentExp + expToAdd;
  let level = currentLevel;
  let expToNextLevel = calculateExpToNextLevel(level);

  while (totalExp >= expToNextLevel) {
    totalExp -= expToNextLevel;
    level++;
    expToNextLevel = calculateExpToNextLevel(level);
  }

  const rank = RANKS.findLast(r => level >= r.level) || RANKS[0];

  return {
    level,
    currentExp: totalExp,
    expToNextLevel,
    title: rank.title,
  };
}