'use client';

import { useState } from 'react';
import { Send, Lock, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommentInputProps {
  onSubmit: (content: string, isInternal: boolean) => void;
  isLoading?: boolean;
}

type CommentMode = 'reply' | 'internal';

export function CommentInput({ onSubmit, isLoading = false }: CommentInputProps) {
  const [content, setContent] = useState('');
  const [mode, setMode] = useState<CommentMode>('reply');
  const maxLength = 2000;

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content, mode === 'internal');
      setContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  const isReply = mode === 'reply';

  return (
    <div
      className={cn(
        'rounded-lg border overflow-hidden transition-colors duration-200',
        isReply
          ? 'border-blue-500/25 bg-blue-500/[0.03]'
          : 'border-amber-500/25 bg-amber-500/[0.03]'
      )}
    >
      {/* Mode toggle tabs */}
      <div className="flex border-b border-border/60">
        <button
          onClick={() => setMode('reply')}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold transition-all relative',
            isReply
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Eye size={13} />
          Reply to Customer
          {isReply && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setMode('internal')}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold transition-all relative',
            !isReply
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Lock size={12} />
          Internal Note
          {!isReply && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-t-full" />
          )}
        </button>
      </div>

      {/* Mode indicator banner */}
      <div
        className={cn(
          'px-4 py-1.5 text-[11px] font-medium flex items-center gap-1.5 border-b',
          isReply
            ? 'bg-blue-500/5 text-blue-600 dark:text-blue-400 border-blue-500/10'
            : 'bg-amber-500/5 text-amber-600 dark:text-amber-400 border-amber-500/10'
        )}
      >
        {isReply ? (
          <>
            <Eye size={11} />
            This reply will be <strong>visible to the customer</strong>
          </>
        ) : (
          <>
            <Lock size={11} />
            This note is <strong>only visible to staff</strong>
          </>
        )}
      </div>

      {/* Textarea */}
      <div className="p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, maxLength))}
          onKeyDown={handleKeyDown}
          placeholder={
            isReply
              ? 'Type your reply to the customer…'
              : 'Add an internal note for staff only…'
          }
          className={cn(
            'w-full h-28 bg-background border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 resize-none transition-colors',
            isReply
              ? 'border-border focus:ring-primary/30'
              : 'border-amber-500/20 focus:ring-amber-500/30'
          )}
        />
      </div>

      {/* Footer */}
      <div className="px-4 pb-3 flex items-center justify-between gap-3">
        {/* Character count */}
        <span
          className={cn(
            'text-[11px] tabular-nums',
            content.length > maxLength * 0.9
              ? 'text-amber-500'
              : 'text-muted-foreground/60'
          )}
        >
          {content.length}/{maxLength}
        </span>

        {/* Submit button */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground hidden sm:inline">
            Ctrl+Enter to send
          </span>
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || isLoading}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              isReply
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
                : 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm'
            )}
          >
            {isReply ? (
              <>
                <Send size={13} />
                Send Reply
              </>
            ) : (
              <>
                <Lock size={13} />
                Add Note
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
