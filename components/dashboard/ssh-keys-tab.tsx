'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Trash2, Clock, Search, Edit2, Check, X } from 'lucide-react';
import { AddSSHKeyModal } from './modals/add-ssh-key-modal';

interface SSHKey {
  id: string;
  name: string;
  fingerprint: string;
  keyType: 'RSA' | 'ED25519';
  addedAt: string;
  lastUsed: string;
}

export function SSHKeysTab() {
  const [keys, setKeys] = useState<SSHKey[]>([
    {
      id: '1',
      name: 'Laptop Development',
      fingerprint: 'SHA256:7Z8X9Y0A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R',
      keyType: 'ED25519',
      addedAt: '2024-01-15',
      lastUsed: '30 minutes ago',
    },
    {
      id: '2',
      name: 'Desktop Workstation',
      fingerprint: 'SHA256:aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wX2yZ3aB4c',
      keyType: 'RSA',
      addedAt: '2024-01-10',
      lastUsed: '2 days ago',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [copiedFingerprint, setCopiedFingerprint] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editFingerprint, setEditFingerprint] = useState('');
  const [editKeyType, setEditKeyType] = useState<'RSA' | 'ED25519'>('ED25519');

  const copyFingerprint = (fingerprint: string) => {
    navigator.clipboard.writeText(fingerprint);
    setCopiedFingerprint(fingerprint);
    setTimeout(() => setCopiedFingerprint(null), 2000);
  };

  const deleteKey = (id: string) => {
    setKeys(prev => prev.filter(k => k.id !== id));
  };

  const startEditing = (key: SSHKey) => {
    setEditingId(key.id);
    setEditName(key.name);
    setEditFingerprint(key.fingerprint);
    setEditKeyType(key.keyType);
  };

  const saveEdit = (id: string) => {
    setKeys(prev => prev.map(k => k.id === id ? { ...k, name: editName, fingerprint: editFingerprint, keyType: editKeyType } : k));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleAddKey = (keyData: any) => {
    const newKey: SSHKey = {
      id: String(keys.length + 1),
      name: keyData.name,
      fingerprint: 'SHA256:' + Math.random().toString(36).substring(2, 15).toUpperCase(),
      keyType: keyData.keyType,
      addedAt: new Date().toLocaleDateString(),
      lastUsed: 'Never',
    };
    setKeys(prev => [newKey, ...prev]);
    setShowModal(false);
  };

  const filteredKeys = keys.filter(key =>
    key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    key.fingerprint.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">SSH Keys</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage SSH keys for secure authentication</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search SSH keys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-sm bg-card border-border"
            />
          </div>
          <Button size="sm" className="gap-1.5 shrink-0 h-8 text-xs" onClick={() => setShowModal(true)}>
            Add SSH Key
          </Button>
        </div>
      </div>

      {showModal && (
        <AddSSHKeyModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddKey}
        />
      )}

      <div className="space-y-3">
        {filteredKeys.length === 0 ? (
          <Card className="bg-muted/30">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                {keys.length === 0 ? "No SSH keys added yet. Add one to authenticate securely." : "No SSH keys match your search."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredKeys.map(key => (
            <Card key={key.id} className="bg-card shadow-card hover:shadow-card transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div>
                      {editingId === key.id ? (
                        <div className="flex flex-col gap-2 mb-2">
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="h-8 max-w-full sm:max-w-[400px]"
                            autoFocus
                            placeholder="Key name"
                          />
                          <div className="flex flex-wrap items-center gap-2">
                            <Select value={editKeyType} onValueChange={(val: 'RSA' | 'ED25519') => setEditKeyType(val)}>
                              <SelectTrigger className="h-8 w-[110px]">
                                <SelectValue placeholder="Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ED25519">ED25519</SelectItem>
                                <SelectItem value="RSA">RSA</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              value={editFingerprint}
                              onChange={(e) => setEditFingerprint(e.target.value)}
                              className="h-8 flex-1 min-w-[200px] font-mono text-xs"
                              placeholder="Key Fingerprint"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveEdit(key.id);
                                if (e.key === 'Escape') cancelEdit();
                              }}
                            />
                          </div>
                          <div className="flex gap-2 mt-1">
                            <Button size="sm" variant="default" className="h-8 px-4" onClick={() => saveEdit(key.id)}>
                              <Check className="h-4 w-4 mr-2" /> Save
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 px-4" onClick={cancelEdit}>
                              <X className="h-4 w-4 mr-2" /> Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">{key.name}</h4>
                        </div>
                      )}
                      {editingId !== key.id && <p className="text-xs text-muted-foreground">Added {key.addedAt}</p>}
                    </div>

                    {editingId !== key.id && (
                      <>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary">{key.keyType}</Badge>
                          <code className="text-xs bg-muted px-2 py-1 rounded font-mono break-all flex-1">
                            {key.fingerprint}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyFingerprint(key.fingerprint)}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Last used: {key.lastUsed}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto mt-4 md:mt-0">
                    {editingId !== key.id && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEditing(key)}
                        className="gap-2 w-full sm:w-auto"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteKey(key.id)}
                      className="gap-2 w-full sm:w-auto"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
