'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface CacheWarmerTabProps {
  environmentId: string;
}

export function CacheWarmerTab({ environmentId }: CacheWarmerTabProps) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [sitemapMode, setSitemapMode] = useState<'auto' | 'manual'>('auto');
  const [startTime, setStartTime] = useState('01:00');
  const [endTime, setEndTime] = useState('6:00');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">Status</h3>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Cache Warmer Status</p>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={isEnabled ? 'text-status-success' : 'text-destructive'}>
                  {isEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </p>
            </div>
            <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">Sitemaps</h3>
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-background/50 rounded border border-border">
            <span className="text-xs font-medium text-foreground">Auto Generated</span>
            <span className="ml-auto text-xs text-muted-foreground">Enable manual mode</span>
          </div>
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              Unable to find a suitable sitemap in robots.txt file. Please switch to manual mode and enter your sitemap URL to activate the cache warmer
            </p>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">Cache Warming Schedule</h3>
        <Card className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-foreground w-16 sm:w-auto">Between</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-foreground w-16 sm:w-auto">and</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-background border border-border rounded text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button size="sm" className="w-full sm:w-auto sm:ml-auto mt-2 sm:mt-0">
              Run now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
