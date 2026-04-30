import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  unit?: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  accentColor?: 'blue' | 'orange';
  className?: string;
}

export function StatusCard({
  icon: Icon,
  title,
  value,
  unit,
  change,
  accentColor = 'blue',
  className
}: StatusCardProps) {
  const isOrange = accentColor === 'orange';
  const accentClass = isOrange ? 'bg-accent-orange' : 'bg-primary';
  const accentBgClass = isOrange ? 'bg-accent-orange/10' : 'bg-primary/10';
  const borderHoverClass = isOrange ? 'hover:border-accent-orange/50' : 'hover:border-primary/50';
  
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-card border border-border p-6',
        `transition-all duration-300 ${borderHoverClass} hover:shadow-lg`,
        'group shadow-card',
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
        style={{
          background: isOrange 
            ? 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)'
            : 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)'
        }}
      />

      <div className="relative z-10">
        {/* Icon and title */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${accentBgClass}`}>
            <Icon className={`text-${isOrange ? 'accent-orange' : 'primary'}`} size={24} />
          </div>
          {change && (
            <div
              className={cn(
                'text-xs font-semibold px-2 py-1 rounded-full',
                change.isPositive
                  ? 'bg-status-success/10 text-status-success'
                  : 'bg-status-failed/10 text-status-failed'
              )}
            >
              {change.isPositive ? '+' : '-'}{change.value}%
            </div>
          )}
        </div>

        {/* Title */}
        <p className="text-sm font-medium text-muted-foreground mb-1">
          {title}
        </p>

        {/* Value */}
        <div className="flex items-baseline gap-1">
          <p className="text-3xl font-bold text-foreground">
            {value}
          </p>
          {unit && (
            <span className="text-sm text-muted-foreground">
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
