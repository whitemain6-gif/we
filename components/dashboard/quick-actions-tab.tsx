'use client';

import { Button } from '@/components/ui/button';
import { Rocket, Globe, Database, Server, HardDrive, Search, Terminal, Zap, Play } from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  onClick: () => void;
}

interface QuickActionsTabProps {
  environmentId: string;
}

export function QuickActionsTab({ environmentId }: QuickActionsTabProps) {
  const actions: QuickAction[] = [
    {
      title: 'Restart Web Pods',
      description: 'Restart all web server pods',
      icon: Globe,
      iconColor: 'text-primary',
      onClick: () => console.log('Restart Web Pods')
    },
    {
      title: 'Restart Database Pods',
      description: 'Restart database containers',
      icon: Database,
      iconColor: 'text-emerald-500',
      onClick: () => console.log('Restart Database Pods')
    },
    {
      title: 'Restart Redis Pods',
      description: 'Restart Redis cache instances',
      icon: Server,
      iconColor: 'text-red-500',
      onClick: () => console.log('Restart Redis Pods')
    },
    {
      title: 'Restart RabbitMQ Pods',
      description: 'Restart message queue services',
      icon: HardDrive,
      iconColor: 'text-amber-500',
      onClick: () => console.log('Restart RabbitMQ Pods')
    },
    {
      title: 'Restart Elastic Search Pods',
      description: 'Restart search engine nodes',
      icon: Search,
      iconColor: 'text-secondary',
      onClick: () => console.log('Restart Elastic Search Pods')
    },
    {
      title: 'Restart CLI',
      description: 'Restart command line processes',
      icon: Terminal,
      iconColor: 'text-muted-foreground',
      onClick: () => console.log('Restart Cli')
    },
    {
      title: 'Restart Varnish',
      description: 'Restart HTTP accelerator cache',
      icon: Zap,
      iconColor: 'text-cyan-500',
      onClick: () => console.log('Restart Varnish')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Rocket className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Common operations for your environment.</p>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <div 
              key={idx} 
              className="group p-5 flex flex-col gap-4 rounded-lg border border-border bg-card hover:bg-muted/30 hover:border-border transition-all"
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${action.iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="text-sm font-medium text-foreground">{action.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{action.description}</p>
              </div>
              <Button
                size="sm"
                onClick={action.onClick}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-2"
              >
                <Play className="h-3.5 w-3.5" />
                Run Action
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
