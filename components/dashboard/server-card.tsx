'use client';

import { MoreVertical, MapPin, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { StatusBadge } from './status-badge';
import { cn } from '@/lib/utils';

interface ServerCardProps {
  name: string;
  ip: string;
  region: string;
  status: 'success' | 'failed' | 'running' | 'pending' | 'offline';
  cpu: number;
  memory: number;
  uptime: number;
}

export function ServerCard({
  name,
  ip,
  region,
  status,
  cpu,
  memory,
  uptime
}: ServerCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="rounded-lg bg-card border border-border p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">{ip}</span>
            <span className="text-muted-foreground/30">•</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin size={14} />
              {region}
            </div>
          </div>
        </div>

        {/* Menu button */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-background rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <MoreVertical size={18} />
          </button>

          {/* Dropdown menu */}
          {isMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <nav className="p-2 space-y-1">
                <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-background rounded-md transition-colors">
                  View Details
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-background rounded-md transition-colors">
                  Restart
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-background rounded-md transition-colors">
                  Configure
                </button>
                <hr className="my-1 border-border" />
                <button className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                  Delete
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Status badge */}
      <div className="mb-4">
        <StatusBadge status={status} size="md" />
      </div>

      {/* Metrics */}
      <div className="space-y-3 mb-4">
        {/* CPU */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">CPU Usage</span>
            <span className="text-sm font-semibold text-foreground">{cpu}%</span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div
              className={cn(
                'h-2 rounded-full transition-all',
                cpu < 50
                  ? 'bg-status-success'
                  : cpu < 80
                  ? 'bg-status-pending'
                  : 'bg-status-failed'
              )}
              style={{ width: `${cpu}%` }}
            />
          </div>
        </div>

        {/* Memory */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">Memory</span>
            <span className="text-sm font-semibold text-foreground">{memory}%</span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div
              className={cn(
                'h-2 rounded-full transition-all',
                memory < 50
                  ? 'bg-status-success'
                  : memory < 80
                  ? 'bg-status-pending'
                  : 'bg-status-failed'
              )}
              style={{ width: `${memory}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">
          Uptime: <span className="text-foreground font-semibold">{uptime} days</span>
        </span>
        {memory > 85 && (
          <div className="flex items-center gap-1 text-xs text-status-pending">
            <AlertCircle size={14} />
            High memory
          </div>
        )}
      </div>
    </div>
  );
}
