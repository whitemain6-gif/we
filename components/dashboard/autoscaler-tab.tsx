'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface AutoscalerTabProps {
  environmentId: string;
}

export function AutoscalerTab({ environmentId }: AutoscalerTabProps) {
  const [view, setView] = useState<'status' | 'graphs'>('status');
  const [timeRange, setTimeRange] = useState<'hour' | 'day' | 'week' | 'month'>('day');

  const mockData = [
    { time: '00:00', pods: 2, cpu: 20 },
    { time: '04:00', pods: 2, cpu: 30 },
    { time: '08:00', pods: 4, cpu: 65 },
    { time: '12:00', pods: 8, cpu: 85 },
    { time: '16:00', pods: 6, cpu: 75 },
    { time: '20:00', pods: 3, cpu: 45 },
    { time: '24:00', pods: 2, cpu: 25 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="space-x-2">
          <Button
            variant={view === 'status' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('status')}
          >
            Status
          </Button>
          <Button
            variant={view === 'graphs' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('graphs')}
          >
            Graphs
          </Button>
        </div>
      </div>

      {view === 'status' && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm font-medium text-foreground">Autoscaler Status</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-status-success/10 text-status-success">
                Enabled
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm font-medium text-foreground">Current Pods</span>
              <span className="text-sm font-medium text-foreground">5</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm font-medium text-foreground">Min Pods</span>
              <span className="text-sm font-medium text-foreground">2</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm font-medium text-foreground">Max Pods</span>
              <span className="text-sm font-medium text-foreground">10</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm font-medium text-foreground">CPU Threshold</span>
              <span className="text-sm font-medium text-foreground">70%</span>
            </div>
          </div>
        </Card>
      )}

      {view === 'graphs' && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-foreground">Hour</span>
            <Button
              variant={timeRange === 'hour' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('hour')}
              className="text-xs"
            >
              Hour
            </Button>
            <Button
              variant={timeRange === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('day')}
              className="text-xs"
            >
              Day
            </Button>
            <Button
              variant={timeRange === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('week')}
              className="text-xs"
            >
              Week
            </Button>
            <Button
              variant={timeRange === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('month')}
              className="text-xs"
            >
              Month
            </Button>
          </div>

          <Card className="p-8 bg-background/50">
            <h3 className="text-sm font-medium mb-4 text-foreground">Pods & CPU Usage</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPods" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--status-pending)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--status-pending)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: 'var(--radius)' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Area type="monotone" dataKey="pods" name="Pods" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPods)" strokeWidth={2} />
                  <Area type="monotone" dataKey="cpu" name="CPU %" stroke="var(--status-pending)" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
