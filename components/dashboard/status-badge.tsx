import { Check, AlertCircle, Play, Clock, Power } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'success' | 'failed' | 'running' | 'pending' | 'offline';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ 
  status, 
  label = status.charAt(0).toUpperCase() + status.slice(1),
  size = 'md'
}: StatusBadgeProps) {
  const statusConfig = {
    success: {
      icon: Check,
      bg: 'bg-status-success/10',
      border: 'border-status-success/30',
      text: 'text-status-success',
      dot: 'bg-status-success'
    },
    failed: {
      icon: AlertCircle,
      bg: 'bg-status-failed/10',
      border: 'border-status-failed/30',
      text: 'text-status-failed',
      dot: 'bg-status-failed'
    },
    running: {
      icon: Play,
      bg: 'bg-status-running/10',
      border: 'border-status-running/30',
      text: 'text-status-running',
      dot: 'bg-status-running'
    },
    pending: {
      icon: Clock,
      bg: 'bg-status-pending/10',
      border: 'border-status-pending/30',
      text: 'text-status-pending',
      dot: 'bg-status-pending'
    },
    offline: {
      icon: Power,
      bg: 'bg-status-offline/10',
      border: 'border-status-offline/30',
      text: 'text-status-offline',
      dot: 'bg-status-offline'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'gap-1.5 px-2 py-1',
    md: 'gap-2 px-3 py-1.5',
    lg: 'gap-2 px-4 py-2'
  };

  const iconSize = {
    sm: 14,
    md: 16,
    lg: 18
  };

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors',
        'border',
        config.bg,
        config.border,
        config.text,
        sizeClasses[size]
      )}
    >
      <span className={cn('rounded-full inline-block', config.dot)} style={{ width: '6px', height: '6px' }} />
      <Icon size={iconSize[size]} />
      <span className={textSize[size]}>{label}</span>
    </div>
  );
}
