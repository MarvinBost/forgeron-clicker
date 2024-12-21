import { Card as BaseCard } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardProps extends React.ComponentProps<typeof BaseCard> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <BaseCard className={cn('medieval-card', className)} {...props}>
      {children}
    </BaseCard>
  );
}