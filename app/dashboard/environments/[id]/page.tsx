'use client';

import { EnvironmentTabs } from '@/components/dashboard/environment-tabs';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Mock environment data
const environmentsData: Record<string, { name: string; status: string }> = {
  'prod-env-001': {
    name: 'Production Environment',
    status: 'healthy'
  },
  'staging-env-001': {
    name: 'Staging Environment',
    status: 'healthy'
  },
  'dev-env-001': {
    name: 'Development Environment',
    status: 'healthy'
  }
};

export default function EnvironmentDetailsPage() {
  const params = useParams();
  const environmentId = params.id as string;
  const environment = environmentsData[environmentId] || {
    name: 'Unknown Environment',
    status: 'unknown'
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/dashboard/environments"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Environments
        </Link>
      </div>

      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{environment.name}</h1>
        <p className="text-sm text-muted-foreground">
          Manage and monitor your environment configuration, deployments, and infrastructure
        </p>
      </div>

      {/* Tabs Component */}
      <EnvironmentTabs
        environmentId={environmentId}
        environmentName={environment.name}
      />
    </div>
  );
}
