'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TicketSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TicketSearch({ value, onChange }: TicketSearchProps) {
  return (
    <div className="relative w-full md:w-80">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search tickets by ID or subject..."
        className="pl-10 pr-10 bg-card/50 border-border/50 focus:border-primary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
