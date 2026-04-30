'use client';

import {
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HistoryEvent {
  id: string;
  type: 'status_change' | 'priority_change' | 'assignment' | 'comment' | 'created';
  actor: string;
  action: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

interface HistoryTabProps {
  events?: HistoryEvent[];
}

const defaultEvents: HistoryEvent[] = [
  {
    id: '1',
    type: 'created',
    actor: 'Jimmy Fallon',
    action: 'created this ticket',
    description: 'Ticket TKT-1024 was created',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    metadata: { subject: 'Database Connection Error' },
  },
  {
    id: '2',
    type: 'priority_change',
    actor: 'Alex Johnson',
    action: 'changed priority',
    description: 'Priority changed from Low to High',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    metadata: { from: 'Low', to: 'High' },
  },
  {
    id: '3',
    type: 'assignment',
    actor: 'System',
    action: 'assigned ticket',
    description: 'Ticket assigned to Alex Johnson',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    metadata: { assignee: 'Alex Johnson' },
  },
  {
    id: '4',
    type: 'comment',
    actor: 'Alex Johnson',
    action: 'added a comment',
    description: 'Support team replied to the ticket',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    type: 'status_change',
    actor: 'System',
    action: 'changed status',
    description: 'Status changed from Open to In Progress',
    timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    metadata: { from: 'Open', to: 'In Progress' },
  },
  {
    id: '6',
    type: 'comment',
    actor: 'Jimmy Fallon',
    action: 'added a comment',
    description: 'Customer replied with additional information',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: '7',
    type: 'status_change',
    actor: 'Alex Johnson',
    action: 'changed status',
    description: 'Status changed from In Progress to Pending',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    metadata: { from: 'In Progress', to: 'Pending' },
  },
];

const eventConfig: Record<string, { icon: React.ReactNode; dotColor: string }> = {
  status_change: {
    icon: <AlertCircle className="w-3.5 h-3.5 text-blue-500" />,
    dotColor: 'bg-blue-500',
  },
  priority_change: {
    icon: <AlertCircle className="w-3.5 h-3.5 text-orange-500" />,
    dotColor: 'bg-orange-500',
  },
  assignment: {
    icon: <User className="w-3.5 h-3.5 text-violet-500" />,
    dotColor: 'bg-violet-500',
  },
  comment: {
    icon: <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />,
    dotColor: 'bg-emerald-500',
  },
  created: {
    icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />,
    dotColor: 'bg-emerald-500',
  },
};

const formatTime = (date: string) => {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function HistoryTab({ events = defaultEvents }: HistoryTabProps) {
  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-[11px] top-6 bottom-4 w-px bg-border" />

      <div className="space-y-0">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No history yet.</p>
          </div>
        ) : (
          events.map((event) => {
            const config = eventConfig[event.type] || {
              icon: <Clock className="w-3.5 h-3.5 text-muted-foreground" />,
              dotColor: 'bg-muted-foreground',
            };

            return (
              <div key={event.id} className="relative flex gap-4 pl-8 py-3 group">
                {/* Timeline dot */}
                <div className="absolute left-0 top-[18px] w-[22px] h-[22px] rounded-full bg-card border-2 border-border flex items-center justify-center z-10">
                  {config.icon}
                </div>

                {/* Event content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-sm font-semibold text-foreground">{event.actor}</span>
                    <span className="text-sm text-muted-foreground">{event.action}</span>
                    <span className="text-[11px] text-muted-foreground/60 ml-auto shrink-0">
                      {formatTime(event.timestamp)}
                    </span>
                  </div>

                  {/* Metadata: from → to */}
                  {event.metadata && event.metadata.from && event.metadata.to && (
                    <div className="mt-1.5 inline-flex items-center gap-1.5 text-xs">
                      <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground line-through">
                        {event.metadata.from}
                      </span>
                      <ArrowRight size={11} className="text-muted-foreground/50" />
                      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
                        {event.metadata.to}
                      </span>
                    </div>
                  )}

                  {/* Metadata: assignee */}
                  {event.metadata?.assignee && !event.metadata.from && (
                    <div className="mt-1.5 inline-flex items-center gap-1.5 text-xs">
                      <div className="w-4 h-4 rounded-full bg-violet-500/15 flex items-center justify-center text-violet-500 text-[8px] font-bold">
                        {event.metadata.assignee.charAt(0)}
                      </div>
                      <span className="text-foreground/80">{event.metadata.assignee}</span>
                    </div>
                  )}

                  {/* Metadata: subject */}
                  {event.metadata?.subject && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {event.metadata.subject}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
