'use client';

import { Trash2, Lock, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommentItemProps {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  isInternal?: boolean;
  isStaff?: boolean;
  canDelete?: boolean;
  onDelete?: (id: string) => void;
}

export function CommentItem({
  id,
  author,
  avatar,
  content,
  timestamp,
  isInternal = false,
  isStaff = false,
  canDelete = false,
  onDelete,
}: CommentItemProps) {
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
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={cn(
        'group relative flex gap-3.5 rounded-lg transition-colors',
        isInternal
          ? 'bg-amber-500/[0.04] border border-amber-500/15 p-4'
          : 'py-1'
      )}
    >
      {/* Avatar */}
      <img
        src={avatar}
        alt={author}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5 ring-2 ring-background"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header row */}
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="text-sm font-semibold text-foreground">{author}</span>
          {isStaff && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/15 uppercase tracking-wide">
              Staff
            </span>
          )}

          {/* Visibility indicator */}
          {isInternal ? (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/15">
              <Lock size={9} />
              Internal
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15">
              <Globe size={9} />
              Public
            </span>
          )}

          <span className="text-[11px] text-muted-foreground/70 ml-auto">{formatTime(timestamp)}</span>
        </div>

        {/* Comment body */}
        <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </p>

        {/* Delete action */}
        {canDelete && (
          <button
            onClick={() => onDelete?.(id)}
            className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={11} />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
