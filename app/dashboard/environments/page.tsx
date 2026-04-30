'use client';

import Link from 'next/link';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { ChevronRight } from 'lucide-react';

interface Environment {
  id: string;
  name: string;
  status: 'success' | 'failed' | 'running' | 'pending' | 'offline';
  region: string;
  deployments: number;
  lastUpdated: string;
}

const environments: Environment[] = [
  {
    id: 'prod-env-001',
    name: 'Production Environment',
    status: 'success',
    region: 'us-east-1',
    deployments: 12,
    lastUpdated: '2 hours ago'
  },
  {
    id: 'staging-env-001',
    name: 'Staging Environment',
    status: 'success',
    region: 'us-east-1',
    deployments: 8,
    lastUpdated: '30 minutes ago'
  },
  {
    id: 'dev-env-001',
    name: 'Development Environment',
    status: 'running',
    region: 'us-west-2',
    deployments: 23,
    lastUpdated: 'Just now'
  }
];

export default function EnvironmentsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Environments</h1>
        <p className="text-base text-muted-foreground">
          Manage all your cloud hosting environments
        </p>
      </div>

      {/* Environments Grid */}
      <div className="grid grid-cols-1 gap-6">
        {environments.map((env) => (
          <Link
            key={env.id}
            href={`/dashboard/environments/${env.id}`}
            className="block"
          >
            <div className="bg-card border border-border rounded-lg p-6 shadow-card cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg hover:scale-[1.01]">
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-foreground">{env.name}</h2>
                    <StatusBadge status={env.status} size="sm" />
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Region</p>
                      <p className="text-sm font-medium text-foreground">{env.region}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Deployments</p>
                      <p className="text-sm font-medium text-foreground">{env.deployments}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Last Updated</p>
                      <p className="text-sm font-medium text-foreground">{env.lastUpdated}</p>
                    </div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
