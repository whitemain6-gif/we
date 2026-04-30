'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, ChevronsUpDown, CheckCircle2, Eye, Boxes, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Pod {
  name: string;
  node: string;
  nodeType: string;
  ip: string;
  age: string;
  containers: string;
  cpu: string;
  memory: string;
  restarts: number;
  ready: boolean;
  status: string;
}

const mockPods: Pod[] = [
  {
    name: 'adminer-deployment-79cfdb74f8-f6x8z',
    node: '1-a117bd32-njch',
    nodeType: 'c4a-standard-16',
    ip: '10.120.16.17',
    age: '2w',
    containers: '1/1',
    cpu: '1m / 500m',
    memory: '8Mi / 1024Mi',
    restarts: 0,
    ready: true,
    status: 'Running'
  },
  {
    name: 'adminer-deployment-fb689bfc4-b2tjq',
    node: '2-0b5d2096-cfmn',
    nodeType: 'n2-custom-16-102400',
    ip: '10.40.46.119',
    age: '4h',
    containers: '1/1',
    cpu: '1m / 500m',
    memory: '5Mi / 1024Mi',
    restarts: 0,
    ready: true,
    status: 'Running'
  },
  {
    name: 'adminer-deployment-fb689bfc4-qw659',
    node: '1-38a39b7c-ie2w',
    nodeType: 'n2-custom-16-100352',
    ip: '10.36.16.3',
    age: '1mo',
    containers: '1/1',
    cpu: '1m / 500m',
    memory: '16Mi / 1024Mi',
    restarts: 0,
    ready: true,
    status: 'Running'
  },
  {
    name: 'alertmanager-k-prometheus-alertmanager-0',
    node: '2-49bb9ea7-hppf',
    nodeType: 'n2d-highmem-8',
    ip: '10.76.21.16',
    age: '6mos',
    containers: '2/2',
    cpu: '1m',
    memory: '49283072m',
    restarts: 0,
    ready: true,
    status: 'Running'
  },
  {
    name: 'alertmanager-kube-prometheus-stack-1701-alertmanager-0',
    node: '2-f5c2d627-80dg',
    nodeType: 'c4a-highmem-16',
    ip: '10.120.43.83',
    age: '2mos',
    containers: '2/2',
    cpu: '1m',
    memory: '49283072m',
    restarts: 0,
    ready: true,
    status: 'Running'
  },
  {
    name: 'alertmanager-kube-prometheus-stack-1701-alertmanager-0',
    node: '1-a1ec8800-cl1n',
    nodeType: 'n2-custom-20-163840',
    ip: '10.36.13.253',
    age: '4mos',
    containers: '2/2',
    cpu: '1m',
    memory: '49283072m',
    restarts: 0,
    ready: true,
    status: 'Running'
  },
  {
    name: 'alertmanager-kube-prometheus-stack-1756-alertmanager-0',
    node: '2-4545d92b-86np',
    nodeType: 'c4a-standard-16',
    ip: '10.52.2.156',
    age: '6mos',
    containers: '2/2',
    cpu: '1m',
    memory: '52428800m',
    restarts: 0,
    ready: true,
    status: 'Running'
  }
];

interface PodsTabProps {
  environmentId: string;
}

export function PodsTab({ environmentId }: PodsTabProps) {
  const [pods] = useState<Pod[]>(mockPods);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPods = pods.filter(pod =>
    pod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Pods</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage and monitor your container pods</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </Button>
      </div>

      {/* Search and Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search pods by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-8 text-sm bg-card border-border"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Last updated 30 seconds ago</span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap cursor-pointer hover:text-foreground transition-colors group">
                  <div className="flex items-center gap-1.5">
                    Name
                    <ChevronsUpDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                  </div>
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Node</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap cursor-pointer hover:text-foreground transition-colors group">
                  <div className="flex items-center gap-1.5">
                    Node Type
                    <ChevronsUpDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                  </div>
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">IP</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Age</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Containers</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">CPU</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Memory</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Restarts</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Ready</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Status</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPods.map((pod, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm font-medium text-foreground">{pod.name}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm font-medium text-foreground">{pod.node}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm text-muted-foreground font-mono">{pod.nodeType}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm text-muted-foreground font-mono">{pod.ip}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm text-muted-foreground">{pod.age}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm text-muted-foreground">{pod.containers}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm text-muted-foreground font-mono">{pod.cpu}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-sm text-muted-foreground font-mono">{pod.memory}</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className={`text-sm font-medium ${pod.restarts > 0 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                      {pod.restarts}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    {pod.ready ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <span className="text-sm text-muted-foreground">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      pod.status === 'Running' 
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      {pod.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="border-t border-border bg-muted/30 px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredPods.length}</span> of{' '}
            <span className="font-medium text-foreground">{pods.length}</span> pods
          </span>
        </div>
      </div>
    </div>
  );
}
