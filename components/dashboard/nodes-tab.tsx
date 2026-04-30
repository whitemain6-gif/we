'use client';

import { useState } from 'react';
import { StatusBadge } from './status-badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Node {
  name: string;
  internalIp: string;
  externalIp: string;
  version: string;
  kernelVersion: string;
  cpu: string;
  memory: string;
  status: 'running' | 'success';
}

interface NodesTabProps {
  environmentId: string;
}

const mockNodes: Node[] = [
  {
    name: '1-4a631dbe-96dn',
    internalIp: '10.154.1.147',
    externalIp: '—',
    version: 'v1.33.8-gke.1026000',
    kernelVersion: '6.6.113+',
    cpu: '6687m / 16000m (42%)',
    memory: '34954Mi / 64189Mi (59%)',
    status: 'running'
  },
  {
    name: '1-a117bd32-732o',
    internalIp: '10.154.0.130',
    externalIp: '—',
    version: 'v1.33.8-gke.1026000',
    kernelVersion: '6.6.113+',
    cpu: '3364m / 16000m (21%)',
    memory: '28056Mi / 64189Mi (47%)',
    status: 'running'
  },
  {
    name: '1-4a631dbe-qd5c',
    internalIp: '10.154.0.61',
    externalIp: '—',
    version: 'v1.33.8-gke.1026000',
    kernelVersion: '6.6.113+',
    cpu: '7263m / 16000m (45%)',
    memory: '37085Mi / 64189Mi (63%)',
    status: 'running'
  },
  {
    name: '2-f5c2d627-tnhl',
    internalIp: '10.154.1.210',
    externalIp: '—',
    version: 'v1.33.5-gke.2019000',
    kernelVersion: '6.6.113+',
    cpu: '10225m / 16000m (64%)',
    memory: '117110Mi / 128573Mi (98%)',
    status: 'running'
  },
  {
    name: '2-f5c2d627-pdbm',
    internalIp: '10.154.1.231',
    externalIp: '—',
    version: 'v1.33.5-gke.2019000',
    kernelVersion: '6.6.113+',
    cpu: '6457m / 16000m (40%)',
    memory: '110771Mi / 128573Mi (93%)',
    status: 'running'
  }
];

export function NodesTab({ environmentId }: NodesTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredNodes = mockNodes.filter(node => 
    node.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    node.internalIp.includes(searchTerm)
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search nodes by name or IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-8 text-sm bg-card border-border"
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">Nodes: Last updated 30 seconds ago</p>

      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Internal IP</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">External IP</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Version</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Kernel Version</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">CPU</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Memory</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredNodes.map((node, idx) => (
                <tr key={idx} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-foreground">{node.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{node.internalIp}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{node.externalIp}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{node.version}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{node.kernelVersion}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{node.cpu}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{node.memory}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={node.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-border bg-background/50">
          <p className="text-xs text-muted-foreground">
            Showing 1-5 of 11 nodes
          </p>
        </div>
      </div>
    </div>
  );
}
