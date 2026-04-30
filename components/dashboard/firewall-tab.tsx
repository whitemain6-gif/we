'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FirewallRule {
  id: string;
  ip: string;
  description: string;
  status: 'active' | 'disabled';
}

interface FirewallTabProps {
  environmentId: string;
}

const mockRules: FirewallRule[] = [
  {
    id: '1',
    ip: '203.0.113.42',
    description: 'Office Network',
    status: 'active'
  },
  {
    id: '2',
    ip: '198.51.100.89',
    description: 'VPN Gateway',
    status: 'active'
  },
  {
    id: '3',
    ip: '192.0.2.150',
    description: 'CI/CD Pipeline',
    status: 'active'
  },
  {
    id: '4',
    ip: '198.18.0.0/15',
    description: 'Backup Server',
    status: 'disabled'
  }
];

export function FirewallTab({ environmentId }: FirewallTabProps) {
  const [rules, setRules] = useState<FirewallRule[]>(mockRules);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newIp, setNewIp] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [editIp, setEditIp] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const isValidIP = (ip: string) => {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const cidrRegex = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;
    return ipv4Regex.test(ip) || cidrRegex.test(ip);
  };

  const handleAddRule = () => {
    if (newIp.trim() && isValidIP(newIp) && newDesc.trim()) {
      const rule: FirewallRule = {
        id: String(rules.length + 1),
        ip: newIp,
        description: newDesc,
        status: 'active'
      };
      setRules([...rules, rule]);
      setNewIp('');
      setNewDesc('');
      setShowAddForm(false);
    }
  };

  const handleEditRule = (id: string) => {
    const rule = rules.find(r => r.id === id);
    if (rule) {
      setEditingId(id);
      setEditIp(rule.ip);
      setEditDesc(rule.description);
    }
  };

  const handleSaveEdit = (id: string) => {
    if (editIp.trim() && isValidIP(editIp) && editDesc.trim()) {
      setRules(rules.map(r => 
        r.id === id ? { ...r, ip: editIp, description: editDesc } : r
      ));
      setEditingId(null);
      setEditIp('');
      setEditDesc('');
    }
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setRules(rules.map(r =>
      r.id === id ? { ...r, status: r.status === 'active' ? 'disabled' : 'active' } : r
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold text-foreground">Firewall</h2>
          <p className="text-xs text-muted-foreground mt-2">Manage IP whitelist and access control</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Rule
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-card/50 border border-border rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Add Firewall Rule</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                IP Address or CIDR
              </label>
              <input
                type="text"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                placeholder="e.g., 192.168.1.1 or 10.0.0.0/8"
                className={cn(
                  'w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                  'placeholder-muted-foreground'
                )}
              />
              {newIp && !isValidIP(newIp) && (
                <p className="text-xs text-status-failed mt-1">Invalid IP address format</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="e.g., Office Network"
                className={cn(
                  'w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                  'placeholder-muted-foreground'
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setShowAddForm(false);
                setNewIp('');
                setNewDesc('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddRule}
              disabled={!newIp.trim() || !isValidIP(newIp) || !newDesc.trim()}
              className={cn(
                !newIp.trim() || !isValidIP(newIp) || !newDesc.trim() && 'opacity-50 cursor-not-allowed'
              )}
            >
              Add Rule
            </Button>
          </div>
        </div>
      )}

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-card/30 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">IP Address</span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Description</span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Status</span>
                </th>
                <th className="px-6 py-3 text-right">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-card/20 transition-colors">
                  {editingId === rule.id ? (
                    <>
                      <td className="px-6 py-3">
                        <input
                          type="text"
                          value={editIp}
                          onChange={(e) => setEditIp(e.target.value)}
                          className={cn(
                            'w-full px-3 py-2 bg-card border border-border rounded text-sm text-foreground',
                            'focus:outline-none focus:ring-2 focus:ring-primary/50'
                          )}
                        />
                      </td>
                      <td className="px-6 py-3">
                        <input
                          type="text"
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          className={cn(
                            'w-full px-3 py-2 bg-card border border-border rounded text-sm text-foreground',
                            'focus:outline-none focus:ring-2 focus:ring-primary/50'
                          )}
                        />
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => handleToggleStatus(rule.id)}
                          className={cn(
                            'text-xs font-semibold px-3 py-1 rounded-full cursor-pointer',
                            rule.status === 'active'
                              ? 'bg-status-success/10 text-status-success border border-status-success/30'
                              : 'bg-muted text-muted-foreground border border-border'
                          )}
                        >
                          {rule.status === 'active' ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleSaveEdit(rule.id)}
                            className="p-2 hover:bg-status-success/10 text-status-success rounded transition-colors"
                            title="Save"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-2 hover:bg-muted text-muted-foreground rounded transition-colors"
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-3 text-sm font-mono text-foreground">{rule.ip}</td>
                      <td className="px-6 py-3 text-sm text-foreground">{rule.description}</td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => handleToggleStatus(rule.id)}
                          className={cn(
                            'text-xs font-semibold px-3 py-1 rounded-full cursor-pointer',
                            rule.status === 'active'
                              ? 'bg-status-success/10 text-status-success border border-status-success/30'
                              : 'bg-muted text-muted-foreground border border-border'
                          )}
                        >
                          {rule.status === 'active' ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditRule(rule.id)}
                            className="p-2 hover:bg-primary/10 text-primary rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteRule(rule.id)}
                            className="p-2 hover:bg-destructive/10 text-destructive rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rules.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">No firewall rules configured</p>
          </div>
        )}
      </div>
    </div>
  );
}
