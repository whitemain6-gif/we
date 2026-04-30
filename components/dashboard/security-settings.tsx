'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Chrome, Github, Mail } from 'lucide-react';

export function SecuritySettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [ssoMethods, setSsoMethods] = useState({
    google: true,
    github: false,
    microsoft: false,
  });

  const toggleSSO = (method: keyof typeof ssoMethods) => {
    setSsoMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }));
  };

  return (
    <Card className="bg-card shadow-card">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-base">Security Settings</CardTitle>
        <CardDescription className="text-xs">Manage your password and authentication methods</CardDescription>
      </CardHeader>
      <CardContent className="pt-5 space-y-5">
        {/* Password Change */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Password</label>
            <p className="text-[11px] text-muted-foreground mt-0.5">Last changed 45 days ago</p>
          </div>
          
          {isChangingPassword ? (
            <div className="space-y-3 border border-border rounded-lg p-3.5 bg-muted/15 overflow-hidden">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Current Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter current password"
                    className="pr-9 h-8 text-sm"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">New Password</label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Confirm New Password</label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  className="h-8 text-sm"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <Button 
                  size="sm"
                  onClick={() => setIsChangingPassword(false)}
                  className="flex-1 h-8 text-xs"
                >
                  Confirm Change
                </Button>
                <Button 
                  size="sm"
                  variant="secondary" 
                  onClick={() => setIsChangingPassword(false)}
                  className="flex-1 h-8 text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <div className="relative flex-1 min-w-0">
                <Input
                  type="password"
                  defaultValue="••••••••••••"
                  disabled
                  className="pr-9 bg-muted/20 font-mono text-sm tracking-wider h-8"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
              <Button size="sm" variant="default" className="shrink-0 h-8 text-xs" onClick={() => setIsChangingPassword(true)}>
                Change
              </Button>
            </div>
          )}
        </div>

        {/* SSO Methods */}
        <div className="space-y-3 pt-4 border-t border-border/60">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Single Sign-On</label>
            <p className="text-[11px] text-muted-foreground mt-0.5">Connect external authentication providers</p>
          </div>

          <div className="space-y-2">
            {/* Google */}
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/60 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-xs">Google</p>
                  <p className="text-[11px] text-muted-foreground">Sign in with Google</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {ssoMethods.google && (
                  <Badge variant="default" className="bg-emerald-500/15 text-emerald-500 border-emerald-500/25 text-[10px] px-1.5 py-0">
                    Connected
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant={ssoMethods.google ? 'secondary' : 'default'}
                  onClick={() => toggleSSO('google')}
                  className="h-7 text-xs px-2.5"
                >
                  {ssoMethods.google ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>

            {/* GitHub */}
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/60 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-slate-500/10 flex items-center justify-center">
                  <Github className="h-4 w-4 text-slate-400" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-xs">GitHub</p>
                  <p className="text-[11px] text-muted-foreground">Sign in with GitHub</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {ssoMethods.github && (
                  <Badge variant="default" className="bg-emerald-500/15 text-emerald-500 border-emerald-500/25 text-[10px] px-1.5 py-0">
                    Connected
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant={ssoMethods.github ? 'secondary' : 'default'}
                  onClick={() => toggleSSO('github')}
                  className="h-7 text-xs px-2.5"
                >
                  {ssoMethods.github ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>

            {/* Microsoft */}
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-border/60 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-blue-600/10 flex items-center justify-center">
                  <Chrome className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-xs">Microsoft</p>
                  <p className="text-[11px] text-muted-foreground">Sign in with Microsoft</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {ssoMethods.microsoft && (
                  <Badge variant="default" className="bg-emerald-500/15 text-emerald-500 border-emerald-500/25 text-[10px] px-1.5 py-0">
                    Connected
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant={ssoMethods.microsoft ? 'secondary' : 'default'}
                  onClick={() => toggleSSO('microsoft')}
                  className="h-7 text-xs px-2.5"
                >
                  {ssoMethods.microsoft ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
