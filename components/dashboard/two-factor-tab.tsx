'use client';

import { Button } from '@/components/ui/button';
import { Shield, Smartphone, MessageSquare, Check, X } from 'lucide-react';

export function TwoFactorTab() {
  const authMethods = [
    {
      id: 'google',
      name: 'Authenticator App',
      description: 'Use Google Authenticator or similar apps to generate time-based codes.',
      icon: Smartphone,
      enabled: false,
      recommended: true,
    },
    {
      id: 'sms',
      name: 'SMS Authentication',
      description: 'Receive verification codes via text message to your phone.',
      icon: MessageSquare,
      enabled: true,
      recommended: false,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-foreground">Two-Factor Authentication</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security to your account.</p>
      </div>

      {/* Status Banner */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
          <Check className="h-4 w-4 text-emerald-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">2FA is enabled</p>
          <p className="text-xs text-muted-foreground">Your account is protected with SMS authentication.</p>
        </div>
      </div>

      {/* Auth Methods */}
      <div className="space-y-3">
        <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Authentication Methods</h3>

        <div className="space-y-3">
          {authMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border border-border/60 bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className={`flex shrink-0 h-9 w-9 items-center justify-center rounded-lg ${method.enabled ? 'bg-primary/10' : 'bg-muted'}`}>
                    <Icon className={`h-4 w-4 ${method.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-foreground">{method.name}</span>
                      {method.recommended && (
                        <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide rounded-full bg-primary/10 text-primary">
                          Recommended
                        </span>
                      )}
                      {method.enabled && (
                        <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide rounded-full bg-emerald-500/10 text-emerald-500">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </div>
                </div>
                <Button
                  variant={method.enabled ? 'outline' : 'default'}
                  size="sm"
                  className={`h-7 text-xs px-2.5 shrink-0 ${method.enabled
                    ? 'border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30'
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  }`}
                >
                  {method.enabled ? 'Disable' : 'Setup'}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Note */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-muted/30 border border-border/60">
        <Shield className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="text-xs font-medium text-foreground">Security Recommendation</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            We recommend using an authenticator app for the most secure two-factor authentication.
            SMS-based 2FA, while convenient, can be vulnerable to SIM-swapping attacks.
          </p>
        </div>
      </div>
    </div>
  );
}

