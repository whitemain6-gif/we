'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Copy, Trash2, Eye, EyeOff, Search } from 'lucide-react';

interface APIToken {
  id: string;
  name: string;
  token: string;
  maskedToken: string;
  createdAt: string;
  lastUsed: string;
  scopes: string[];
}

export function APITokensTab() {
  const [tokens, setTokens] = useState<APIToken[]>([
    {
      id: '1',
      name: 'Production API Key',
      token: 'sk_live_51234567890abcdefghijklmnop',
      maskedToken: 'sk_live_••••••••••••••••••••••••••',
      createdAt: '2024-01-10',
      lastUsed: '2 hours ago',
      scopes: ['read:deployments', 'write:deployments', 'read:servers'],
    },
    {
      id: '2',
      name: 'Development Key',
      token: 'sk_test_98765432101abcdefghijklmno',
      maskedToken: 'sk_test_••••••••••••••••••••••••••',
      createdAt: '2024-01-05',
      lastUsed: '1 day ago',
      scopes: ['read:all', 'write:all'],
    },
  ]);

  const [visibleTokens, setVisibleTokens] = useState<Set<string>>(new Set());
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTokenVisibility = (id: string) => {
    setVisibleTokens(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const copyToken = (id: string, token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(id);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const deleteToken = (id: string) => {
    setTokens(prev => prev.filter(t => t.id !== id));
  };

  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.scopes.some(scope => scope.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">API Tokens</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage tokens for API authentication</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-sm bg-card border-border"
            />
          </div>
          <Button size="sm" className="gap-1.5 shrink-0 h-8 text-xs">
            Create Token
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTokens.length === 0 ? (
          <Card className="bg-muted/30">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                {tokens.length === 0 ? "No API tokens yet. Create one to get started." : "No API tokens match your search."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTokens.map(token => (
            <Card key={token.id} className="bg-card shadow-card hover:shadow-card transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <h4 className="font-medium text-foreground">{token.name}</h4>
                        <p className="text-xs text-muted-foreground">Created {token.createdAt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono flex-1 break-all">
                        {visibleTokens.has(token.id) ? token.token : token.maskedToken}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleTokenVisibility(token.id)}
                        className="h-8 w-8 p-0"
                      >
                        {visibleTokens.has(token.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToken(token.id, token.token)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {token.scopes.map(scope => (
                        <Badge key={scope} variant="secondary" className="text-xs">
                          {scope}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-xs text-muted-foreground">Last used: {token.lastUsed}</p>
                  </div>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteToken(token.id)}
                    className="gap-2 w-full md:w-auto"
                  >
                    <Trash2 className="h-4 w-4" />
                    Revoke
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
