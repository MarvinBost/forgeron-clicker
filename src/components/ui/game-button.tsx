import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function GameButton({
  variant = 'default',
  onClick,
  disabled,
  children,
  className,
  ...props
}: GameButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      <Button
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        className={cn('font-semibold', className)}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}