'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Server, GitBranch, Radio, HardDrive, Boxes, Shield, Mail, Zap, Rocket, BarChart3, Activity, MoreHorizontal } from 'lucide-react';
import { DeploymentsTab } from './deployments-tab';
import { PipelinesTab } from './pipelines-tab';
import { NodesTab } from './nodes-tab';
import { PodsTab } from './pods-tab';
import { FirewallTab } from './firewall-tab';
import { GeneralTab } from './general-tab';
import { EmailsTab } from './emails-tab';
import { CacheWarmerTab } from './cache-warmer-tab';
import { ActionsTab } from './actions-tab';
import { DiagnosticsTab } from './diagnostics-tab';
import { AutoscalerTab } from './autoscaler-tab';
import { MonitorsTab } from './monitors-tab';
import { QuickActionsTab } from './quick-actions-tab';

interface EnvironmentTabsProps {
  environmentId: string;
  environmentName: string;
}

const tabs = [
  { value: 'general', label: 'General', icon: Server },
  { value: 'pods', label: 'Pods', icon: Boxes },
  { value: 'nodes', label: 'Nodes', icon: HardDrive },
  { value: 'deployments', label: 'Deploys', icon: GitBranch },
  { value: 'pipelines', label: 'Pipelines', icon: Radio },
  { value: 'emails', label: 'Emails', icon: Mail },
  { value: 'cache-warmer', label: 'Cache', icon: Zap },
  { value: 'actions', label: 'Actions', icon: MoreHorizontal },
  { value: 'diagnostics', label: 'Diagnostics', icon: BarChart3 },
  { value: 'autoscaler', label: 'Autoscaler', icon: Activity },
  { value: 'monitors', label: 'Monitors', icon: BarChart3 },
  { value: 'quick-actions', label: 'Quick Acts', icon: Rocket },
  { value: 'firewall', label: 'Firewall', icon: Shield },
] as const;

export function EnvironmentTabs({ environmentId, environmentName }: EnvironmentTabsProps) {
  const [activeTab, setActiveTab] = useState('general');

  const triggerClass =
    'flex items-center gap-1.5 text-xs font-medium py-1.5 px-3 whitespace-nowrap rounded-md transition-all ' +
    'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ' +
    'data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:bg-muted/50';

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative">
      {/* Scrollable tab bar */}
      <div className="relative w-full overflow-hidden mb-6">
        <div className="overflow-x-auto scrollbar-hide pb-2 -mb-2">
          <TabsList className="inline-flex w-max min-w-full sm:min-w-0 bg-card border border-border rounded-lg p-1 gap-1 h-auto shrink-0">
            {tabs.map(({ value, label, icon: Icon }) => (
              <TabsTrigger key={value} value={value} className={triggerClass}>
                <Icon size={14} className="shrink-0" />
                <span className="hidden sm:inline-block">{label}</span>
                <span className="sm:hidden text-[10px]">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>

      {/* Tab content — min-height prevents page-level layout shift */}
      <div className="mt-5 min-h-[400px] w-full min-w-0">
        {([
          ['general', <GeneralTab key="general" environmentId={environmentId} />],
          ['pods', <PodsTab key="pods" environmentId={environmentId} />],
          ['nodes', <NodesTab key="nodes" environmentId={environmentId} />],
          ['deployments', <DeploymentsTab key="deploys" environmentId={environmentId} />],
          ['pipelines', <PipelinesTab key="pipelines" environmentId={environmentId} />],
          ['emails', <EmailsTab key="emails" environmentId={environmentId} />],
          ['cache-warmer', <CacheWarmerTab key="cache" environmentId={environmentId} />],
          ['actions', <ActionsTab key="actions" environmentId={environmentId} />],
          ['diagnostics', <DiagnosticsTab key="diagnostics" environmentId={environmentId} />],
          ['autoscaler', <AutoscalerTab key="autoscaler" environmentId={environmentId} />],
          ['monitors', <MonitorsTab key="monitors" environmentId={environmentId} />],
          ['quick-actions', <QuickActionsTab key="quick" environmentId={environmentId} />],
          ['firewall', <FirewallTab key="firewall" environmentId={environmentId} />],
        ] as [string, React.ReactNode][]).map(([value, content]) => (
          <TabsContent key={value} value={value} className="mt-0 animate-tab-in">
            {content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
