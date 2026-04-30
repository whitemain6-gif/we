'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Settings } from 'lucide-react';

interface DeploymentDetailsTabProps {
  deploymentId: string;
}

// Mock deployment data
const deploymentData = {
  id: '1',
  name: 'Merge branch release/v2.22.0',
  commitHash: '892dfb73cf960eb488840ee44ad9',
  commitShort: '892dfb7',
  commitMessage: 'Merge branch release/v2.22.0',
  commitAuthor: 'John Doe',
  pipeline: 'Magento 2 Deployment Pipeline',
  pipelineId: 'pipeline-1',
  environment: 'Production',
  environmentId: 'env-1',
  website: 'www.sensory-direct.com',
  websiteId: 'site-1',
  company: 'Sensory Direct',
  companyId: 'company-1',
  status: 'success',
  statusLabel: 'Succeeded',
  created: '2024-03-17 16:08:44',
  duration: '4m 32s',
  repository: '-',
  branch: 'release/v2.22.0',
};

export function DeploymentDetailsTab({ deploymentId }: DeploymentDetailsTabProps) {
  return (
    <div className="space-y-6">
      {/* Deployment Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">{deploymentData.name}</h2>
        <p className="text-sm text-muted-foreground">
          Commit{' '}
          <code className="font-mono text-xs bg-muted/50 px-2 py-1 rounded text-foreground">
            {deploymentData.commitShort}
          </code>{' '}
          by {deploymentData.commitAuthor}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full min-w-0">
        {/* Manage Pipelines Button */}
        <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto h-auto min-h-[40px] whitespace-normal">
          <Settings size={16} className="shrink-0" />
          Manage Pipelines
        </Button>

        {/* Action CTA Dropdown */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="gap-2 w-full sm:w-auto h-auto min-h-[40px] whitespace-normal">
                Choose Action
                <ChevronDown size={16} className="shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {deploymentData.status === 'success' && (
                <DropdownMenuItem className="cursor-pointer">
                  Rollback to this deployment
                </DropdownMenuItem>
              )}
              {(deploymentData.status === 'failed' || deploymentData.status === 'pending') && (
                <DropdownMenuItem className="cursor-pointer">
                  Retry Deployment
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="cursor-pointer">
                Pause Deployment
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Start Deployment
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-status-failed">
                Cancel Deployment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Environment */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">ENVIRONMENT</p>
          <a
            href="#"
            className="text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ color: '#D97706' }}
          >
            {deploymentData.environment}
          </a>
        </div>

        {/* Pipeline */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">DEPLOYMENT PIPELINE</p>
          <a
            href="#"
            className="text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ color: '#D97706' }}
          >
            {deploymentData.pipeline}
          </a>
        </div>

        {/* Website */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">WEBSITE</p>
          <a
            href={`https://${deploymentData.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ color: '#D97706' }}
          >
            {deploymentData.website}
          </a>
        </div>

        {/* Company */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Deployment Artifact</p>
          <a
            href="#"
            className="text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ color: '#D97706' }}
          >
            {deploymentData.commitHash}
          </a>
        </div>

        {/* Repository */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Note</p>
          <p className="text-sm font-medium text-foreground">{deploymentData.repository}</p>
        </div>
      </div>

      {/* Status and Timing */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6 border-t border-border">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">STATUS</p>
          <p className="text-sm font-semibold text-status-success">{deploymentData.statusLabel}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Completed</p>
          <p className="text-sm text-foreground">{deploymentData.created}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">DURATION</p>
          <p className="text-sm text-foreground">{deploymentData.duration}</p>
        </div>
      </div>
    </div>
  );
}
