'use client';

import { BarChart, Activity, Cpu, HardDrive, Zap, AlertTriangle } from 'lucide-react';
import { StatusCard } from '@/components/dashboard/status-card';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { DataTable } from '@/components/dashboard/data-table';
import { DeploymentProgressView } from '@/components/dashboard/deployments/deployment-progress-view';

export default function DashboardPage() {
  // Sample data for deployments
  const deployments = [
    {
      id: '1',
      name: 'Frontend App v2.3.1',
      status: 'success' as const,
      region: 'us-east-1',
      deployed: '2 hours ago',
      uptime: '99.9%'
    },
    {
      id: '2',
      name: 'API Gateway v1.8.0',
      status: 'running' as const,
      region: 'eu-west-1',
      deployed: '5 hours ago',
      uptime: '99.99%'
    },
    {
      id: '3',
      name: 'Worker Service v0.5.2',
      status: 'failed' as const,
      region: 'ap-south-1',
      deployed: '1 day ago',
      uptime: '87.3%'
    },
    {
      id: '4',
      name: 'Database Replica v3.2.1',
      status: 'running' as const,
      region: 'us-west-2',
      deployed: '3 days ago',
      uptime: '100%'
    },
    {
      id: '5',
      name: 'Cache Server v1.1.0',
      status: 'running' as const,
      region: 'us-east-1',
      deployed: '12 hours ago',
      uptime: '99.8%'
    }
  ];

  const deploymentColumns = [
    { header: 'Deployment', accessor: 'name' as const, sortable: true },
    { 
      header: 'Status', 
      accessor: 'status' as const,
      cell: (status: any) => <StatusBadge status={status} size="sm" />
    },
    { header: 'Region', accessor: 'region' as const, sortable: true },
    { header: 'Deployed', accessor: 'deployed' as const },
    { header: 'Uptime', accessor: 'uptime' as const, sortable: true }
  ];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-base text-muted-foreground">Welcome back! Here&apos;s an overview of your infrastructure.</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          icon={Activity}
          title="Active Deployments"
          value={24}
          change={{ value: 12, isPositive: true }}
        />
        <StatusCard
          icon={Cpu}
          title="Average CPU"
          value={42}
          unit="%"
          change={{ value: 8, isPositive: false }}
        />
        <StatusCard
          icon={HardDrive}
          title="Storage Used"
          value={847}
          unit="GB"
          change={{ value: 5, isPositive: true }}
        />
        <StatusCard
          icon={AlertTriangle}
          title="Active Alerts"
          value={3}
          change={{ value: 2, isPositive: false }}
        />
      </div>

      {/* System health section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health overview */}
        <div className="lg:col-span-1 rounded-lg bg-card border border-border p-6 shadow-card">
          <h2 className="text-xl font-semibold text-foreground mb-6">System Health</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">API Servers</span>
                <span className="text-sm font-semibold text-status-success">Healthy</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-full bg-status-success" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Database</span>
                <span className="text-sm font-semibold text-status-success">Healthy</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-full bg-status-success" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Cache Layer</span>
                <span className="text-sm font-semibold text-status-pending">Degraded</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-status-pending" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Load Balancer</span>
                <span className="text-sm font-semibold text-status-failed">Failed</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-3/5 bg-status-failed" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="lg:col-span-2 rounded-lg bg-card border border-border p-6 shadow-card">
          <h2 className="text-xl font-semibold text-foreground mb-6">Infrastructure Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-xs text-muted-foreground mb-1">Total Servers</p>
              <p className="text-2xl font-bold text-foreground">48</p>
              <p className="text-xs text-status-success mt-1">All running</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-xs text-muted-foreground mb-1">Network Traffic</p>
              <p className="text-2xl font-bold text-foreground">2.4 Gbps</p>
              <p className="text-xs text-muted-foreground mt-1">Current peak</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-xs text-muted-foreground mb-1">Data Processed</p>
              <p className="text-2xl font-bold text-foreground">847 TB</p>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <p className="text-xs text-muted-foreground mb-1">Avg Response</p>
              <p className="text-2xl font-bold text-foreground">45ms</p>
              <p className="text-xs text-status-success mt-1">Good performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent deployments */}
      <div className="rounded-lg border border-border overflow-hidden shadow-card">
        <div className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Recent Deployments</h2>
              <p className="text-base text-muted-foreground mt-2">Your latest deployments and their status</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:shadow-card">
              View All
            </button>
          </div>
        </div>
        <DataTable columns={deploymentColumns} data={deployments} />
      </div>

      {/* Activity timeline */}
      <div className="rounded-lg bg-card border border-border p-6 shadow-card">
        <h2 className="text-xl font-semibold text-foreground mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { time: '2 minutes ago', action: 'Deployment completed', detail: 'Frontend App v2.3.1 deployed to 3 servers' },
            { time: '1 hour ago', action: 'Alert resolved', detail: 'High CPU usage alert resolved on server-12' },
            { time: '3 hours ago', action: 'Scaling triggered', detail: 'Auto-scaling increased instances from 8 to 12' },
            { time: '5 hours ago', action: 'Database backup', detail: 'Automated backup completed successfully' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-primary mt-1.5" />
                {i < 3 && <div className="w-0.5 h-12 bg-border mt-2" />}
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-sm font-semibold text-foreground">{item.action}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
                <p className="text-xs text-muted-foreground/60 mt-2">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
