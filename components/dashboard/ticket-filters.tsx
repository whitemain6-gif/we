'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type TicketStatus = 'open' | 'closed' | 'pending' | null;
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical' | null;

interface TicketFiltersProps {
  selectedStatus: TicketStatus;
  selectedPriority: TicketPriority;
  onStatusChange: (status: TicketStatus) => void;
  onPriorityChange: (priority: TicketPriority) => void;
  ticketCounts?: {
    open: number;
    closed: number;
    pending: number;
  };
}

const statuses = [
  { id: 'open', label: 'Open', color: 'bg-blue-500/20 text-blue-300 border-blue-500/50' },
  { id: 'pending', label: 'Pending', color: 'bg-amber-500/20 text-amber-300 border-amber-500/50' },
  { id: 'closed', label: 'Closed', color: 'bg-green-500/20 text-green-300 border-green-500/50' },
] as const;

const priorities = [
  { id: 'low', label: 'Low', color: 'bg-blue-500/20 text-blue-300 border-blue-500/50' },
  { id: 'medium', label: 'Medium', color: 'bg-amber-500/20 text-amber-300 border-amber-500/50' },
  { id: 'high', label: 'High', color: 'bg-orange-500/20 text-orange-300 border-orange-500/50' },
  { id: 'critical', label: 'Critical', color: 'bg-red-500/20 text-red-300 border-red-500/50' },
] as const;

export function TicketFilters({
  selectedStatus,
  selectedPriority,
  onStatusChange,
  onPriorityChange,
  ticketCounts = { open: 24, closed: 156, pending: 8 },
}: TicketFiltersProps) {
  const hasActiveFilters = selectedStatus || selectedPriority;

  return (
    <div className="flex flex-col gap-4">
      {/* Status Filter */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status.id}
              onClick={() => onStatusChange(selectedStatus === status.id ? null : (status.id as TicketStatus))}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-medium transition-all ${
                selectedStatus === status.id
                  ? status.color
                  : 'bg-card/50 text-muted-foreground border-border/50 hover:border-border hover:bg-card'
              }`}
            >
              {status.label}
              {status.id === 'open' && <span className="text-xs ml-1">({ticketCounts.open})</span>}
              {status.id === 'closed' && <span className="text-xs ml-1">({ticketCounts.closed})</span>}
              {status.id === 'pending' && <span className="text-xs ml-1">({ticketCounts.pending})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
        <div className="flex flex-wrap gap-2">
          {priorities.map((priority) => (
            <button
              key={priority.id}
              onClick={() => onPriorityChange(selectedPriority === priority.id ? null : (priority.id as TicketPriority))}
              className={`px-3 py-1 rounded-md border text-xs font-medium transition-all ${
                selectedPriority === priority.id
                  ? priority.color
                  : 'bg-card/50 text-muted-foreground border-border/50 hover:border-border hover:bg-card'
              }`}
            >
              {priority.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onStatusChange(null);
            onPriorityChange(null);
          }}
          className="w-full text-xs"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
