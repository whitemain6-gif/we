'use client';

import Link from 'next/link';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

interface Deployment {
  id: string;
  name: string;
  commitHash: string;
  pipeline: string;
  tasksCount: number;
  status: 'success' | 'failed' | 'running' | 'pending' | 'offline';
  statusLabel: string;
  created: string;
  duration: string;
  environment: string;
}

const mockDeployments: Deployment[] = [
  {
    id: '1',
    name: 'Merge branch release/v2.22.0',
    commitHash: '892dfb73cf960eb488840ee44ad9',
    pipeline: 'Magento 2 Deployment Pipeline',
    tasksCount: 18,
    status: 'success',
    statusLabel: 'Succeeded (Current)',
    created: '2024-03-17 16:08:44',
    duration: '4m 32s',
    environment: 'Production'
  },
  {
    id: '2',
    name: 'Merge branch release/v2.21.5',
    commitHash: 'c4ee7606a1b294f8e2c3d5f9b1a2c3d4',
    pipeline: 'Magento 2 Deployment Pipeline',
    tasksCount: 18,
    status: 'success',
    statusLabel: 'Succeeded',
    created: '2024-03-16 14:22:15',
    duration: '3m 58s',
    environment: 'Production'
  },
  {
    id: '3',
    name: 'Merge branch feature/new-checkout',
    commitHash: 'a5f8e2b1c9d7e6f4a3b2c1d8e9f0a1b2',
    pipeline: 'Staging Pipeline',
    tasksCount: 18,
    status: 'failed',
    statusLabel: 'Failed',
    created: '2024-03-15 11:45:30',
    duration: '2m 15s',
    environment: 'Staging'
  },
  {
    id: '4',
    name: 'Merge branch develop',
    commitHash: 'f9e8d7c6b5a4e3d2c1b0a9f8e7d6c5b4',
    pipeline: 'Magento 2 Deployment Pipeline',
    tasksCount: 18,
    status: 'success',
    statusLabel: 'Succeeded',
    created: '2024-03-14 09:12:44',
    duration: '4m 5s',
    environment: 'Production'
  },
  {
    id: '5',
    name: 'Merge branch hotfix/payment-gateway',
    commitHash: '3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a',
    pipeline: 'Hotfix Pipeline',
    tasksCount: 12,
    status: 'success',
    statusLabel: 'Succeeded',
    created: '2024-03-13 15:33:21',
    duration: '3m 42s',
    environment: 'Production'
  },
];

export function DeploymentsListTable() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {mockDeployments.map((deployment) => (
        <Link
          key={deployment.id}
          href={`/dashboard/deployments/${deployment.id}`}
          className="block"
        >
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-card cursor-pointer transition-all hover:border-primary/50 hover:shadow-card hover:scale-[1.01] w-full min-w-0">
            <div className="flex items-start sm:items-center justify-between gap-2 w-full min-w-0">
              <div className="flex-1 space-y-4 w-full min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:mr-6 gap-3 sm:gap-0 w-full min-w-0">
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-semibold text-foreground break-all sm:break-normal">{deployment.name}</h2>
                    <p className="text-xs text-muted-foreground font-mono mt-1 truncate">{deployment.commitHash}</p>
                  </div>
                  <div className="shrink-0 self-start sm:self-auto">
                    <StatusBadge status={deployment.status} label={deployment.statusLabel} size="sm" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 min-w-0">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Pipeline</p>
                    <p className="text-sm font-medium truncate" style={{ color: '#D97706' }}>{deployment.pipeline}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Tasks</p>
                    <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 truncate">
                      {deployment.tasksCount} tasks
                    </Badge>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Created</p>
                    <p className="text-sm font-medium text-foreground truncate">{deployment.created}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Duration</p>
                    <p className="text-sm font-medium text-foreground truncate">{deployment.duration}</p>
                  </div>
                </div>
              </div>
              <div className="shrink-0 self-center hidden sm:block">
                <ChevronRight size={20} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
