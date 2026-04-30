'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Eye, AlertCircle, MessageSquare } from 'lucide-react';

interface Monitor {
  url: string;
  frequency: string;
  status: 'up' | 'down';
}

interface MonitorsTabProps {
  environmentId: string;
}

const mockMonitors: Monitor[] = [
  { url: 'https://www.example.co.uk/checkout/cart/', frequency: '60s', status: 'up' },
  { url: 'https://www.example.co.uk/blizzard-hw60-white-fridge', frequency: '60s', status: 'up' },
  { url: 'https://www.example.co.uk/#3647/embeddedm=andq=fridge', frequency: '60s', status: 'up' },
  { url: 'https://www.example.co.uk/ice-cream-displays-storage', frequency: '60s', status: 'up' },
  { url: 'https://www.example.co.uk/catering-fridges', frequency: '60s', status: 'up' },
  { url: 'https://www.example.co.uk/display-fridges', frequency: '60s', status: 'up' },
  { url: 'https://www.example.co.uk/?type=text&timestamp=', frequency: '60s', status: 'up' }
];

export function MonitorsTab({ environmentId }: MonitorsTabProps) {
  const [monitors, setMonitors] = useState<Monitor[]>(mockMonitors);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMonitors = monitors.filter(monitor =>
    monitor.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold text-foreground">Monitors</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Monitor endpoint health and availability</p>
      </div>

      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search monitors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 h-8 text-sm bg-card border-border"
        />
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-card/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">URL</span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Frequency</span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Status</span>
                </th>
                <th className="px-6 py-3 text-center">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredMonitors.map((monitor, idx) => (
                <tr key={idx} className="hover:bg-card/30 transition-colors">
                  <td className="px-6 py-4">
                    <a href="#" className="text-sm text-primary hover:underline font-mono break-all">
                      {monitor.url}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{monitor.frequency}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-status-success"></div>
                      <span className="text-sm text-foreground capitalize">{monitor.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        className="p-2 hover:bg-primary/10 text-primary rounded transition-colors"
                        title="Notification"
                      >
                        <AlertCircle size={18} />
                      </button>
                      <button
                        className="p-2 hover:bg-primary/10 text-primary rounded transition-colors"
                        title="Message"
                      >
                        <MessageSquare size={18} />
                      </button>
                      <button
                        className="p-2 hover:bg-primary/10 text-primary rounded transition-colors"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMonitors.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">No monitors found</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>
          Showing {filteredMonitors.length} of {monitors.length} monitors
        </p>
      </div>
    </div>
  );
}
