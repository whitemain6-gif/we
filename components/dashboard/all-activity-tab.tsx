'use client';

import { useState } from 'react';
import {
  CheckCircle,
  AlertCircle,
  User,
  MessageSquare,
  Clock,
  ArrowRight,
  Lock,
  Globe,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CommentInput } from './comment-input';

/* ─── Unified activity entry ─── */
interface ActivityEntry {
  id: string;
  kind: 'comment' | 'event';
  timestamp: string;
  // comment fields
  author?: string;
  avatar?: string;
  content?: string;
  isInternal?: boolean;
  isStaff?: boolean;
  canDelete?: boolean;
  // event fields
  eventType?: 'status_change' | 'priority_change' | 'assignment' | 'comment' | 'created';
  actor?: string;
  action?: string;
  description?: string;
  metadata?: Record<string, string>;
}

interface AllActivityTabProps {
  onAddComment?: (content: string, isInternal: boolean) => void;
  showInput?: boolean;
}

/* ─── Mock data: comments + history merged ─── */
const defaultEntries: ActivityEntry[] = [
  {
    id: 'e1',
    kind: 'event',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    eventType: 'created',
    actor: 'Jimmy Fallon',
    action: 'created this ticket',
    metadata: { subject: 'Database Connection Error' },
  },
  {
    id: 'c1',
    kind: 'comment',
    timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
    author: 'Jimmy Fallon',
    avatar: '/images/profile-jimmy.jpg',
    content: 'Hi, I\'m experiencing issues with my database connection. The error message says "Connection refused on port 5432". I\'ve checked that PostgreSQL is running on the server.',
    isInternal: false,
    isStaff: false,
    canDelete: true,
  },
  {
    id: 'e2',
    kind: 'event',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    eventType: 'priority_change',
    actor: 'Alex Johnson',
    action: 'changed priority',
    metadata: { from: 'Low', to: 'High' },
  },
  {
    id: 'e3',
    kind: 'event',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    eventType: 'assignment',
    actor: 'System',
    action: 'assigned ticket to',
    metadata: { assignee: 'Alex Johnson' },
  },
  {
    id: 'c2',
    kind: 'comment',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    author: 'Alex Johnson',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ab67616100005174c5310795fab6ea21e1c1f27e-GPO0kOzHwg9eH8gFX2w6a7MmoeQcbY.jpg',
    content: 'Thanks for reaching out! I\'ve checked your server logs and found that the PostgreSQL service crashed due to insufficient memory. We need to either increase the allocated RAM or optimize your database queries.\n\nLet\'s increase your allocated memory to 8GB and see if that resolves the issue. I\'ll make this change now.',
    isInternal: false,
    isStaff: true,
  },
  {
    id: 'e4',
    kind: 'event',
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    eventType: 'status_change',
    actor: 'System',
    action: 'changed status',
    metadata: { from: 'Open', to: 'In Progress' },
  },
  {
    id: 'c3',
    kind: 'comment',
    timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    author: 'Alex Johnson',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ab67616100005174c5310795fab6ea21e1c1f27e-GPO0kOzHwg9eH8gFX2w6a7MmoeQcbY.jpg',
    content: 'Customer is running 150+ concurrent database connections, need to review connection pool settings and potentially recommend connection pooling with pgBouncer.',
    isInternal: true,
    isStaff: true,
  },
  {
    id: 'c4',
    kind: 'comment',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    author: 'Jimmy Fallon',
    avatar: '/images/profile-jimmy.jpg',
    content: 'That worked! The memory upgrade fixed the immediate issue. Thanks for the quick resolution. Should I be concerned about the connection pooling you mentioned?',
    isInternal: false,
    isStaff: false,
    canDelete: true,
  },
  {
    id: 'e5',
    kind: 'event',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    eventType: 'status_change',
    actor: 'Alex Johnson',
    action: 'changed status',
    metadata: { from: 'In Progress', to: 'Pending' },
  },
];

/* ─── Helpers ─── */
const eventIcons: Record<string, React.ReactNode> = {
  status_change: <AlertCircle className="w-3 h-3 text-blue-500" />,
  priority_change: <AlertCircle className="w-3 h-3 text-orange-500" />,
  assignment: <User className="w-3 h-3 text-violet-500" />,
  comment: <MessageSquare className="w-3 h-3 text-emerald-500" />,
  created: <CheckCircle className="w-3 h-3 text-emerald-500" />,
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
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

/* ─── Component ─── */
export function AllActivityTab({ onAddComment, showInput = true }: AllActivityTabProps) {
  const [entries, setEntries] = useState<ActivityEntry[]>(defaultEntries);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = async (content: string, isInternal: boolean) => {
    setIsSubmitting(true);
    if (onAddComment) await onAddComment(content, isInternal);

    const newEntry: ActivityEntry = {
      id: Date.now().toString(),
      kind: 'comment',
      timestamp: new Date().toISOString(),
      author: 'Jimmy Fallon',
      avatar: '/images/profile-jimmy.jpg',
      content,
      isInternal,
      isStaff: false,
      canDelete: true,
    };
    setEntries([...entries, newEntry]);
    setIsSubmitting(false);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[15px] top-4 bottom-0 w-px bg-border" />

        <div className="space-y-0">
          {entries.map((entry) =>
            entry.kind === 'event' ? (
              /* ── Inline event row ── */
              <div key={entry.id} className="relative flex items-start gap-3 pl-9 py-2">
                <div className="absolute left-[9px] top-[12px] w-[13px] h-[13px] rounded-full bg-card border-2 border-border flex items-center justify-center z-10">
                  {eventIcons[entry.eventType || ''] || <Clock className="w-3 h-3 text-muted-foreground" />}
                </div>
                <div className="flex-1 flex items-baseline gap-1.5 flex-wrap text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground/80">{entry.actor}</span>
                  <span>{entry.action}</span>
                  {entry.metadata?.from && entry.metadata?.to && (
                    <>
                      <span className="px-1 py-0.5 rounded bg-muted line-through">{entry.metadata.from}</span>
                      <ArrowRight size={10} className="text-muted-foreground/40" />
                      <span className="px-1 py-0.5 rounded bg-primary/10 text-primary font-medium">{entry.metadata.to}</span>
                    </>
                  )}
                  {entry.metadata?.assignee && !entry.metadata.from && (
                    <span className="font-medium text-foreground/80">{entry.metadata.assignee}</span>
                  )}
                  {entry.metadata?.subject && (
                    <span className="text-muted-foreground/60">— {entry.metadata.subject}</span>
                  )}
                  <span className="ml-auto text-[10px] text-muted-foreground/50">{formatTime(entry.timestamp)}</span>
                </div>
              </div>
            ) : (
              /* ── Comment row ── */
              <div
                key={entry.id}
                className={cn(
                  'relative pl-9 py-3 group',
                  entry.isInternal && 'bg-amber-500/[0.03] rounded-lg border border-amber-500/10 ml-9 pl-4 my-1'
                )}
              >
                {!entry.isInternal && (
                  <div className="absolute left-[9px] top-[20px] w-[13px] h-[13px] rounded-full bg-card border-2 border-border flex items-center justify-center z-10">
                    <MessageSquare className="w-3 h-3 text-emerald-500" />
                  </div>
                )}

                <div className="flex gap-3">
                  <img
                    src={entry.avatar}
                    alt={entry.author}
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5 ring-2 ring-background"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-semibold text-foreground">{entry.author}</span>
                      {entry.isStaff && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/15 uppercase tracking-wide">
                          Staff
                        </span>
                      )}
                      {entry.isInternal ? (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/15">
                          <Lock size={8} /> Internal
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15">
                          <Globe size={8} /> Public
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground/50 ml-auto">{formatTime(entry.timestamp)}</span>
                    </div>
                    <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap break-words">{entry.content}</p>
                    {entry.canDelete && (
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={10} /> Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Comment input */}
      {showInput && (
        <CommentInput onSubmit={handleAddComment} isLoading={isSubmitting} />
      )}
    </div>
  );
}
