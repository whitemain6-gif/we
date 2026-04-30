'use client';

import { useState } from 'react';
import { StatusBadge } from './status-badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Action {
  name: string;
  company: string;
  user: string;
  duration: string;
  createdAt: string;
  completedAt: string;
  status: 'success' | 'failed' | 'running' | 'pending';
}

const mockActions: Action[] = [
  {
    name: 'Environment Firewall Update',
    company: 'Test company 123',
    user: 'Penith Fonseka',
    duration: '6s',
    createdAt: '2025-12-04 11:43:28',
    completedAt: '2025-12-04 11:43:34',
    status: 'success'
  }
];

interface ActionsTabProps {
  environmentId: string;
}

export function ActionsTab({ environmentId }: ActionsTabProps) {
  const [actions, setActions] = useState<Action[]>(mockActions);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredActions = actions.filter(action =>
    action.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold text-foreground">Actions</h2>
        <p className="text-xs text-muted-foreground mt-0.5">View environment action history</p>
      </div>

      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search actions..."
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Completed At</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredActions.map((action, idx) => (
                <tr key={idx} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4">
                    <a href="#" className="text-primary hover:underline text-sm font-medium">
                      {action.name}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{action.company}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{action.user}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{action.duration}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{action.createdAt}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{action.completedAt}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={action.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-border bg-background/50">
          <p className="text-xs text-muted-foreground">
            Showing 1 of {actions.length} actions
          </p>
        </div>
      </div>
    </div>
  );
}
