'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface DiagnosticTask {
  id: string;
  task: string;
  lastFetched: string;
  result: string;
  resultType: 'error' | 'success' | 'warning';
}

const mockDiagnostics: DiagnosticTask[] = [
  {
    id: '1',
    task: 'Nginx Logs',
    lastFetched: '4 years ago',
    result: 'ERROR: No logs found',
    resultType: 'error'
  },
  {
    id: '2',
    task: 'Access Server Attached',
    lastFetched: '8 hours ago',
    result: 'ERROR: Access server is missing',
    resultType: 'error'
  },
  {
    id: '3',
    task: 'Load Balancer Logs',
    lastFetched: '4 years ago',
    result: 'ERROR: Load balancer is not attached',
    resultType: 'error'
  },
  {
    id: '4',
    task: 'Cloudflare Activated',
    lastFetched: '28 minutes ago',
    result: 'ERROR: Missing cloudflare headers',
    resultType: 'error'
  },
  {
    id: '5',
    task: 'Load Balancer Attached',
    lastFetched: '8 hours ago',
    result: 'ERROR: Load balancer is not attached',
    resultType: 'error'
  }
];

interface DiagnosticsTabProps {
  environmentId: string;
}

export function DiagnosticsTab({ environmentId }: DiagnosticsTabProps) {
  const [diagnostics, setDiagnostics] = useState<DiagnosticTask[]>(mockDiagnostics);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiagnostics = diagnostics.filter(diag =>
    diag.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getResultBgColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-destructive/10 text-destructive';
      case 'warning':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-300';
      default:
        return 'bg-status-success/10 text-status-success';
    }
  };

  const handleRecheck = (id: string) => {
    // Simulate rechecking
    console.log('Rechecking diagnostic:', id);
  };

  return (
    <div className="space-y-5">
      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search diagnostics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 h-8 text-sm bg-card border-border"
        />
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                  <input type="checkbox" className="w-4 h-4 rounded border-border" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Last Fetched</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Result</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredDiagnostics.map((diag) => (
                <tr key={diag.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="text-primary hover:underline text-sm font-medium">
                      {diag.task}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{diag.lastFetched}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded ${getResultBgColor(diag.resultType)}`}>
                      {diag.result}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleRecheck(diag.id)}
                      className="text-xs"
                    >
                      Recheck
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-border bg-background/50">
          <p className="text-xs text-muted-foreground">
            Showing 1-5 of {diagnostics.length} diagnostics
          </p>
        </div>
      </div>
    </div>
  );
}
