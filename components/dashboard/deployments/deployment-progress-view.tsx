'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, GitBranch, User } from 'lucide-react';
import { DeploymentPipeline } from './deployment-pipeline';

interface DeploymentProgressViewProps {
  isVisible?: boolean;
}

export function DeploymentProgressView({ isVisible = true }: DeploymentProgressViewProps) {
  if (!isVisible) return null;

  const deploymentInfo = {
    name: 'Merge branch release/v2.22.0',
    commitHash: '892dfb73cf960eb488840ee44ad9',
    status: 'running' as const,
    startedAt: '2024-01-15 14:35:22',
    initiatedBy: 'Adam Jackson',
    queuedAt: 'Queued today at 6:35',
    environment: 'Production'
  };

  return (
    <div className="space-y-6">
      {/* Deployment Card */}
      <Card className="shadow-card border border-border overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                {deploymentInfo.name}
              </h2>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Commit</span>
                <code className="font-mono text-xs bg-muted/50 px-2 py-1 rounded text-foreground">
                  {deploymentInfo.commitHash.slice(0, 7)}
                </code>
              </div>
            </div>
            <div className="text-right space-y-1">
              <Badge className="bg-status-running/10 border border-status-running/30 text-status-running">
                Deploying to {deploymentInfo.environment}
              </Badge>
              <p className="text-xs text-muted-foreground">{deploymentInfo.queuedAt}</p>
              <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                <User size={12} />
                Initiated by {deploymentInfo.initiatedBy}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Pipeline Visualization */}
          <DeploymentPipeline currentStage="transferring" />
        </div>
      </Card>
    </div>
  );
}
