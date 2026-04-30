'use client';

import { DeploymentsListTable } from '@/components/dashboard/deployments/deployments-list-table';

export default function DeploymentsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Deployments</h1>
        <p className="text-base text-muted-foreground">View and manage your application deployments</p>
      </div>

      {/* Deployments Listing */}
      <DeploymentsListTable />
    </div>
  );
}
