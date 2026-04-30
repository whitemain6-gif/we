'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSection } from '@/components/dashboard/profile-section';
import { SecuritySettings } from '@/components/dashboard/security-settings';
import { APITokensTab } from '@/components/dashboard/api-tokens-tab';
import { SSHKeysTab } from '@/components/dashboard/ssh-keys-tab';
import { FirewallIPsTab } from '@/components/dashboard/firewall-ips-tab';
import { TwoFactorTab } from '@/components/dashboard/two-factor-tab';
import { NotificationsTab } from '@/components/dashboard/notifications-tab';
import { Key, Lock, ShieldAlert, Smartphone, Bell } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function AccountSettingsContent() {
  const searchParams = useSearchParams();
  const initTab = searchParams.get('tab') || 'api-tokens';
  const [activeTab, setActiveTab] = useState(initTab);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Account & Security</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile, authentication methods, and security settings
        </p>
      </div>

      {/* Profile & Security Section - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile & Security Settings */}
        <div className="lg:col-span-1 space-y-6">
          <ProfileSection />
          <SecuritySettings />
        </div>

        {/* Right Column - Security Tabs */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-1.5 p-1.5 bg-card shadow-card rounded-lg border border-border h-auto">
              <TabsTrigger
                value="api-tokens"
                className="gap-1.5 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground"
              >
                <Key className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">API Tokens</span>
              </TabsTrigger>
              <TabsTrigger
                value="ssh-keys"
                className="gap-1.5 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground"
              >
                <Lock className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">SSH Keys</span>
              </TabsTrigger>
              <TabsTrigger
                value="firewall"
                className="gap-1.5 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground"
              >
                <ShieldAlert className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Firewall</span>
              </TabsTrigger>
              <TabsTrigger
                value="2fa"
                className="gap-1.5 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">2FA</span>
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="gap-1.5 text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground"
              >
                <Bell className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Alerts</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <div className="mt-5">
              <TabsContent value="api-tokens" className="space-y-6">
                <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                  <APITokensTab />
                </div>
              </TabsContent>

              <TabsContent value="ssh-keys" className="space-y-6">
                <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                  <SSHKeysTab />
                </div>
              </TabsContent>

              <TabsContent value="firewall" className="space-y-6">
                <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                  <FirewallIPsTab />
                </div>
              </TabsContent>

              <TabsContent value="2fa" className="space-y-6">
                <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                  <TwoFactorTab />
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <div className="bg-card rounded-lg p-6 shadow-card border border-border">
                  <NotificationsTab environmentId="" />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div>Loading account settings...</div>}>
      <AccountSettingsContent />
    </Suspense>
  );
}
