'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, CheckCircle } from 'lucide-react';

interface FirewallIP {
  id: string;
  ip: string;
  description: string;
  status: 'active' | 'blocked';
  addedAt: string;
  lastUsed: string;
}

export function FirewallIPsTab() {
  const [ips, setIps] = useState<FirewallIP[]>([
    {
      id: '1',
      ip: '203.0.113.45',
      description: 'Office Network',
      status: 'active',
      addedAt: '2024-01-20',
      lastUsed: '1 hour ago',
    },
    {
      id: '2',
      ip: '198.51.100.20',
      description: 'Home Network',
      status: 'active',
      addedAt: '2024-01-18',
      lastUsed: '3 days ago',
    },
  ]);

  const [newIP, setNewIP] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  const validateIP = (ip: string) => {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipRegex.test(ip);
  };

  const addIP = () => {
    if (!newIP.trim() || !validateIP(newIP)) {
      alert('Please enter a valid IP address');
      return;
    }

    if (!newDescription.trim()) {
      alert('Please enter a description');
      return;
    }

    const ip: FirewallIP = {
      id: String(ips.length + 1),
      ip: newIP,
      description: newDescription,
      status: 'active',
      addedAt: new Date().toLocaleDateString(),
      lastUsed: 'Never',
    };

    setIps(prev => [ip, ...prev]);
    setNewIP('');
    setNewDescription('');
    setShowForm(false);
  };

  const deleteIP = (id: string) => {
    setIps(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold text-foreground">Whitelist IPs</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Control which IP addresses can access your account</p>
        </div>
        {!showForm && (
          <Button size="sm" onClick={() => setShowForm(true)} className="gap-1.5 h-8 text-xs shrink-0">
            <Plus className="h-3.5 w-3.5" />
            Add IP
          </Button>
        )}
      </div>

      {/* Add IP Form */}
      {showForm && (
        <div className="border border-border rounded-lg p-5 bg-muted/20 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">IP Address</label>
              <Input
                placeholder="e.g., 203.0.113.45"
                value={newIP}
                onChange={(e) => setNewIP(e.target.value)}
                className="font-mono h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Description</label>
              <Input
                placeholder="e.g., Office Network"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2 justify-end">
            <Button size="sm" variant="outline" className="h-8 px-4 text-xs" onClick={() => {
              setShowForm(false);
              setNewIP('');
              setNewDescription('');
            }}>
              Cancel
            </Button>
            <Button size="sm" onClick={addIP} className="gap-1.5 h-8 px-4 text-xs">
              <CheckCircle className="h-3.5 w-3.5" />
              Add IP
            </Button>
          </div>
        </div>
      )}

      {/* IPs List */}
      <div className="space-y-3">
        {ips.length === 0 ? (
          <Card className="bg-muted/30">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No IP addresses whitelisted yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="space-y-2 min-w-[700px]">
                {/* Header */}
                <div className="grid grid-cols-12 gap-3 px-4 py-1.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wide bg-muted/30 rounded-t-md">
                  <div className="col-span-3">IP Address</div>
                  <div className="col-span-4">Description</div>
                  <div className="col-span-3">Last Used</div>
                  <div className="col-span-2 text-right">Action</div>
                </div>

                {/* Rows */}
                {ips.map(ip => (
                  <Card key={ip.id} className="bg-card shadow-card hover:shadow-card transition-shadow border-muted/50 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-12 gap-3 py-3 px-4 items-center">
                        <div className="col-span-3 min-w-0">
                          <code className="text-[13px] font-mono bg-muted/50 px-2 py-1 rounded truncate block w-fit max-w-full">
                            {ip.ip}
                          </code>
                        </div>
                        <div className="col-span-4 min-w-0">
                          <p className="text-sm text-foreground font-medium truncate">{ip.description}</p>
                          <p className="text-[13px] text-muted-foreground truncate mt-0.5">Added {ip.addedAt}</p>
                        </div>
                        <div className="col-span-3 min-w-0">
                          <p className="text-[13px] text-muted-foreground truncate">{ip.lastUsed}</p>
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteIP(ip.id)}
                            className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
