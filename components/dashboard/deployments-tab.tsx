'use client';

import { useState } from 'react';
import { DataTable } from './data-table';
import { StatusBadge } from './status-badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, ChevronDown, MoreHorizontal, AlertCircle, Repeat2, Trash2, Search, Check, GitBranch, Folder, Settings2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Deployment {
  id: string;
  name: string;
  pipeline: string;
  tasks: number;
  status: 'success' | 'failed' | 'running' | 'pending' | 'offline';
  creator: string;
  createdAt: string;
  duration: string;
}

interface DeploymentsTabProps {
  environmentId: string;
}

const mockDeployments: Deployment[] = [
  {
    id: '1',
    name: 'add page titles and favicon (b2d10fde8f..)',
    pipeline: 'Laravel Deployment Pipeline',
    tasks: 26,
    status: 'success',
    creator: 'Jimmy Fallon',
    createdAt: '2025-05-30 12:10:35',
    duration: '1 minute, 20 seconds'
  },
  {
    id: '2',
    name: 'add recaptcha to form submissions (2360703ea1..)',
    pipeline: 'Laravel Deployment Pipeline',
    tasks: 26,
    status: 'success',
    creator: 'Admin User',
    createdAt: '2025-05-30 12:08:54',
    duration: '1 minute, 15 seconds'
  },
  {
    id: '3',
    name: 'update authentication logic (5854c30dae4a..)',
    pipeline: 'Laravel Deployment Pipeline',
    tasks: 26,
    status: 'failed',
    creator: 'Developer',
    createdAt: '2025-05-29 18:31:05',
    duration: '8 minutes'
  },
  {
    id: '4',
    name: 'fix database migration issue (3d86165276c..)',
    pipeline: 'Laravel Deployment Pipeline',
    tasks: 27,
    status: 'success',
    creator: 'Jimmy Fallon',
    createdAt: '2025-05-28 15:47:32',
    duration: '2m 30s, 15 seconds'
  }
];

const repositories = ['api-server', 'web-frontend', 'worker-service'];
const branches: Record<string, string[]> = {
  'api-server': ['main', 'develop', 'feature/auth'],
  'web-frontend': ['main', 'develop', 'feature/dashboard'],
  'worker-service': ['main', 'develop', 'feature/queue']
};
const pipelines: Record<string, string[]> = {
  main: ['build', 'test', 'deploy-staging', 'deploy-production'],
  develop: ['build', 'test', 'deploy-dev'],
  'feature/auth': ['build', 'test']
};
const commits: Record<string, string[]> = {
  build: ['abc1234', 'def5678', 'ghi9012'],
  test: ['abc1234', 'def5678'],
  'deploy-staging': ['abc1234'],
  'deploy-production': ['abc1234']
};

export function DeploymentsTab({ environmentId }: DeploymentsTabProps) {
  const [pipelineEnabled, setPipelineEnabled] = useState(true);
  const [sharedStorageEnabled, setSharedStorageEnabled] = useState(false);
  const [sharedVarFolderEnabled, setSharedVarFolderEnabled] = useState(false);
  const [usingSharedEnvEnabled, setUsingSharedEnvEnabled] = useState(false);
  const [deployments, setDeployments] = useState<Deployment[]>(mockDeployments);
  const [showForm, setShowForm] = useState(false);
  const [hasAccountConnected, setHasAccountConnected] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [selectedRepo, setSelectedRepo] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedPipeline, setSelectedPipeline] = useState<string>('');
  const [selectedCommit, setSelectedCommit] = useState<string>('');

  const getAvailableBranches = () => selectedRepo ? branches[selectedRepo] || [] : [];
  const getAvailablePipelines = () => selectedBranch ? pipelines[selectedBranch] || [] : [];
  const getAvailableCommits = () => selectedPipeline ? commits[selectedPipeline] || [] : [];

  const handleDeploy = () => {
    if (selectedRepo && selectedBranch && selectedPipeline && selectedProvider) {
      const newDeployment: Deployment = {
        id: String(deployments.length + 1),
        name: `${selectedRepo}-${selectedCommit.substring(0, 7) || 'head'}`,
        pipeline: selectedPipeline || 'Deploy',
        tasks: 26,
        status: 'pending',
        creator: 'Current User',
        createdAt: 'just now',
        duration: 'running'
      };
      setDeployments([newDeployment, ...deployments]);
      setSelectedRepo('');
      setSelectedBranch('');
      setSelectedPipeline('');
      setSelectedProvider('');
      setSelectedCommit('');
      setShowForm(false);
    }
  };

  const handleRetryDeployment = (id: string) => {
    setDeployments(deployments.map(d => 
      d.id === id ? { ...d, status: 'pending' as const } : d
    ));
  };

  const handleDeleteDeployment = (id: string) => {
    setDeployments(deployments.filter(d => d.id !== id));
  };

  const columns = [
    {
      header: 'Deployment Name',
      accessor: 'name' as const,
      sortable: true
    },
    {
      header: 'Deployment Pipeline',
      accessor: 'pipeline' as const,
      sortable: true
    },
    {
      header: 'Tasks',
      accessor: 'tasks' as const,
      sortable: true
    },
    {
      header: 'Status',
      accessor: 'status' as const,
      cell: (value: string) => <StatusBadge status={value as any} />
    },
    {
      header: 'Created',
      accessor: 'createdAt' as const,
      sortable: true
    },
    {
      header: 'Duration',
      accessor: 'duration' as const
    }
  ];

  // Custom select component for premium look
  const PremiumSelect = ({ 
    children, 
    className,
    ...props 
  }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) => (
    <div className={cn("relative min-w-0", className?.includes('w-full') ? 'w-full' : '')}>
      <select 
        className={cn(
          "w-full px-4 py-2.5 text-sm font-medium rounded-lg appearance-none cursor-pointer transition-all duration-200",
          "bg-card dark:bg-card/80 border border-border/60 text-foreground",
          "hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none min-w-0",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={16} />
    </div>
  );

  // Config row component for consistent spacing
  const ConfigRow = ({ 
    label, 
    children, 
    labelBold = false 
  }: { 
    label: string; 
    children: React.ReactNode; 
    labelBold?: boolean;
  }) => (
    <div className="flex flex-col sm:grid sm:grid-cols-[280px_1fr] md:grid-cols-[280px_1fr] gap-2 sm:gap-6 sm:items-center py-3 border-b border-border/30 last:border-b-0">
      <span className={cn(
        "text-sm text-muted-foreground",
        labelBold && "font-semibold text-foreground"
      )}>
        {label}
      </span>
      <div className="w-full max-w-4xl">{children}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Environment Configuration Section */}
      <div className="bg-card/50 dark:bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 space-y-1 overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Settings2 size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Pipeline Configuration</h3>
            <p className="text-xs text-muted-foreground">Manage deployment settings for this environment</p>
          </div>
        </div>

        <ConfigRow label="Deployment Pipeline Status" labelBold>
          <div className="flex items-center gap-4">
            <Switch 
              checked={pipelineEnabled} 
              onCheckedChange={setPipelineEnabled} 
              className="data-[state=checked]:bg-emerald-500"
            />
            <span className={cn(
              "text-sm font-semibold px-3 py-1 rounded-full",
              pipelineEnabled 
                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" 
                : "text-muted-foreground bg-muted/50"
            )}>
              {pipelineEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </ConfigRow>

        <ConfigRow label="Deployment Source">
          <PremiumSelect defaultValue="GIT">
            <option value="GIT">GIT</option>
          </PremiumSelect>
        </ConfigRow>

        <ConfigRow label="Repositories">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase px-2 py-1 bg-amber-500/10 rounded w-fit shrink-0">ROOT</span>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 w-full min-w-0">
              <PremiumSelect defaultValue="Laravel" className="w-full sm:w-auto min-w-0">
                <option value="Laravel">Laravel</option>
              </PremiumSelect>

              <PremiumSelect className="w-full sm:w-auto min-w-0">
                <option>Github (Samy) - (mohd.samy...)</option>
              </PremiumSelect>

              <PremiumSelect className="w-full sm:w-auto min-w-0">
                <option>samy-test-repo/frontend</option>
              </PremiumSelect>

              <div className="relative w-full sm:w-32 min-w-0">
                <GitBranch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <select className="w-full pl-9 pr-4 py-2.5 text-sm font-medium rounded-lg appearance-none cursor-pointer transition-all duration-200 bg-card dark:bg-card/80 border border-border/60 text-foreground hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
                  <option>main</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={14} />
              </div>

              <div className="relative w-full sm:w-24 min-w-0">
                <Folder size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  defaultValue="/" 
                  className="w-full pl-9 pr-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 bg-card dark:bg-card/80 border border-border/60 text-foreground hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none min-w-0" 
                />
              </div>

              <button className="flex items-center justify-center w-full sm:w-10 h-10 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 shrink-0 mt-1 sm:mt-0">
                <Trash2 size={16} className="sm:mr-0 mr-2" />
                <span className="sm:hidden text-sm font-medium">Delete Repository</span>
              </button>
            </div>
          </div>
        </ConfigRow>

        <ConfigRow label="Git Deployment Type">
          <PremiumSelect defaultValue="Automatic">
            <option>Automatic</option>
          </PremiumSelect>
        </ConfigRow>

        <ConfigRow label="Deployment Pipeline Version">
          <PremiumSelect defaultValue="Version 1">
            <option>Version 1</option>
          </PremiumSelect>
        </ConfigRow>

        <ConfigRow label="Pipeline Shared Storage">
          <div className="flex items-center gap-4">
            <Switch 
              checked={sharedStorageEnabled} 
              onCheckedChange={setSharedStorageEnabled} 
              className="data-[state=checked]:bg-emerald-500"
            />
            <span className={cn(
              "text-sm font-semibold px-3 py-1 rounded-full",
              sharedStorageEnabled 
                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" 
                : "text-muted-foreground bg-muted/50"
            )}>
              {sharedStorageEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </ConfigRow>

        <ConfigRow label="Shared Var Folder">
          <div className="flex items-center gap-4">
            <Switch 
              checked={sharedVarFolderEnabled} 
              onCheckedChange={setSharedVarFolderEnabled} 
              className="data-[state=checked]:bg-emerald-500"
            />
            <span className={cn(
              "text-sm font-semibold px-3 py-1 rounded-full",
              sharedVarFolderEnabled 
                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" 
                : "text-muted-foreground bg-muted/50"
            )}>
              {sharedVarFolderEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </ConfigRow>

        <ConfigRow label="Using Shared Env">
          <div className="flex items-center gap-4">
            <Switch 
              checked={usingSharedEnvEnabled} 
              onCheckedChange={setUsingSharedEnvEnabled} 
              className="data-[state=checked]:bg-emerald-500"
            />
            <span className={cn(
              "text-sm font-semibold px-3 py-1 rounded-full",
              usingSharedEnvEnabled 
                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" 
                : "text-muted-foreground bg-muted/50"
            )}>
              {usingSharedEnvEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </ConfigRow>

        <ConfigRow label="Slack Channel">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
            <PremiumSelect defaultValue="No_deployment" className="w-full sm:w-80 max-w-full">
              <option>No_deployment</option>
            </PremiumSelect>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0">
              <div className="w-5 h-5 flex items-center justify-center rounded bg-amber-500">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
              Use Default
            </label>
          </div>
        </ConfigRow>

        <ConfigRow label="Build Server IP">
          <span className="text-sm text-foreground/80">Auto detected from cluster</span>
        </ConfigRow>

        <ConfigRow label="Deployments Method Configuration">
          <span className="text-sm text-foreground/80">From Global Config (Global configuration is using Docker)</span>
        </ConfigRow>

        <ConfigRow label="Set keep tags from Global">
          <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-emerald-500 text-emerald-500">
            <Check size={14} strokeWidth={3} />
          </div>
        </ConfigRow>

        <ConfigRow label="Step Component Configuration">
          <span className="text-sm text-foreground/80">From Global Config (Global configuration is using Legacy)</span>
        </ConfigRow>

        <ConfigRow label="Base Image Repository Path Configuration">
          <div className="text-foreground/80 font-mono text-[10px] sm:text-xs bg-muted/50 px-2 sm:px-3 py-1.5 rounded-md break-all">
            europe-west2-docker.pkg.dev/on-billy/base
          </div>
        </ConfigRow>
      </div>

      {/* Deployments Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-semibold text-foreground">Deployments</h2>
            <p className="text-xs text-muted-foreground mt-0.5">View and manage deployment history</p>
          </div>
        </div>

        {!hasAccountConnected && (
          <div className="flex items-center gap-4 bg-destructive/5 border border-destructive/20 rounded-xl p-5">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <AlertCircle size={20} className="text-destructive" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Repository Account Not Connected</p>
              <p className="text-sm text-muted-foreground mt-1">Please connect your repository account before creating deployments</p>
            </div>
          </div>
        )}

        {showForm && hasAccountConnected && (
          <div className="bg-card/50 dark:bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Create Deployment Pipeline</h3>
              <p className="text-sm text-muted-foreground mt-1">Select repository details below. Each dropdown enables once the previous one is populated.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Pipeline</label>
                <PremiumSelect
                  value={selectedPipeline}
                  onChange={(e) => setSelectedPipeline(e.target.value)}
                >
                  <option value="">Select pipeline</option>
                  <option value="Laravel Deployment Pipeline">Laravel Deployment</option>
                  <option value="React Deployment Pipeline">React Deployment</option>
                </PremiumSelect>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Provider</label>
                <PremiumSelect 
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  disabled={!selectedPipeline}
                  className={cn(!selectedPipeline && 'opacity-50 cursor-not-allowed')}
                >
                  <option value="">Select provider</option>
                  <option value="github">GitHub</option>
                  <option value="gitlab">GitLab</option>
                  <option value="bitbucket">Bitbucket</option>
                </PremiumSelect>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Repository</label>
                <PremiumSelect
                  value={selectedRepo}
                  onChange={(e) => {
                    setSelectedRepo(e.target.value);
                    setSelectedBranch('');
                  }}
                  disabled={!selectedProvider}
                  className={cn(!selectedProvider && 'opacity-50 cursor-not-allowed')}
                >
                  <option value="">Select repository</option>
                  {repositories.map((repo) => (
                    <option key={repo} value={repo}>{repo}</option>
                  ))}
                </PremiumSelect>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Branch</label>
                <PremiumSelect
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  disabled={!selectedRepo}
                  className={cn(!selectedRepo && 'opacity-50 cursor-not-allowed')}
                >
                  <option value="">Select a branch</option>
                  {getAvailableBranches().map((branch) => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </PremiumSelect>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Path</label>
                <input
                  type="text"
                  placeholder="/"
                  value={selectedCommit}
                  onChange={(e) => setSelectedCommit(e.target.value)}
                  disabled={!selectedBranch}
                  className={cn(
                    "w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 bg-card dark:bg-card/80 border border-border/60 text-foreground hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
                    !selectedBranch && 'opacity-50 cursor-not-allowed text-muted-foreground placeholder:text-muted-foreground/50'
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setSelectedRepo('');
                  setSelectedBranch('');
                  setSelectedPipeline('');
                  setSelectedProvider('');
                  setSelectedCommit('');
                }}
                className="px-5"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeploy}
                disabled={!(selectedPipeline && selectedProvider && selectedRepo && selectedBranch)}
                className={cn(
                  'flex items-center gap-2 px-5 bg-primary hover:bg-primary/90',
                  !(selectedPipeline && selectedProvider && selectedRepo && selectedBranch) && 'opacity-50 cursor-not-allowed'
                )}
              >
                Deploy Now
              </Button>
            </div>
          </div>
        )}

        {/* Action Toolbar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search deployments..." 
              className="w-full pl-11 py-3 md:py-5 bg-card dark:bg-card/50 border-border/60 rounded-xl text-sm focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center justify-center gap-2 px-4 rounded-lg h-auto min-h-[44px]"
                >
                  <Check size={16} />
                  Select Action
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] p-1.5">
                <DropdownMenuLabel className="text-foreground font-semibold px-3 py-2 text-sm">Deployment</DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer text-sm px-3 py-2 rounded-md">Deploy Commit</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => setShowForm(!showForm)}
              disabled={!hasAccountConnected}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm px-5 rounded-lg font-medium flex items-center justify-center h-auto min-h-[44px]"
            >
              <Plus size={18} className="mr-2 shrink-0" />
              Create Deployment
            </Button>
          </div>
        </div>

        {/* Deployments Table */}
        <div className="bg-card dark:bg-card/50 border border-border/50 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 dark:bg-muted/10 border-b border-border/50">
                <tr>
                  <th className="px-5 py-4 text-left w-12">
                    <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" />
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.header}
                      className="px-5 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {col.header}
                    </th>
                  ))}
                  <th className="px-5 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {deployments.map((deployment) => (
                  <tr key={deployment.id} className="hover:bg-muted/20 dark:hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4">
                      <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" />
                    </td>
                    <td className="px-5 py-4">
                      <a href="#" className="text-primary hover:text-primary/80 hover:underline font-medium text-sm transition-colors">
                        {deployment.name}
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-foreground">{deployment.pipeline}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-foreground font-medium">{deployment.tasks}</span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={deployment.status} />
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted-foreground">{deployment.createdAt}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted-foreground">{deployment.duration}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {deployment.status === 'failed' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-8 px-3 rounded-md border-border/60"
                            onClick={() => handleRetryDeployment(deployment.id)}
                          >
                            <Repeat2 size={14} className="mr-1.5" />
                            Retry
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted/50">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 p-1.5">
                            <DropdownMenuItem className="cursor-pointer rounded-md">View Details</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-md">View Logs</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-md">Rollback</DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteDeployment(deployment.id)}
                              className="text-destructive focus:text-destructive cursor-pointer rounded-md"
                            >
                              <Trash2 size={14} className="mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 border-t border-border/30 bg-muted/10">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{deployments.length}</span> of <span className="font-medium text-foreground">{deployments.length}</span> deployments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
