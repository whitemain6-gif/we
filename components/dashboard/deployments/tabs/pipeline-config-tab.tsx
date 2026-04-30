'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PipelineConfigTabProps {
  deploymentId: string;
}

// Mock pipeline configuration data
const pipelineConfig = {
  name: 'Magento 2 Deployment Pipeline',
  status: 'active',
  stages: [
    {
      name: 'Preparing',
      description: 'Prepare release directory and copy previous release',
      tasks: ['Create Release Directory', 'Copy Previous Release'],
    },
    {
      name: 'Building',
      description: 'Build and compile the application',
      tasks: ['Run Composer Install', 'Compile Static Files', 'Generate Cache'],
    },
    {
      name: 'Transferring',
      description: 'Transfer files and update symlinks',
      tasks: ['Upload Files', 'Link Shared Files', 'Update Symlinks'],
    },
    {
      name: 'Finishing',
      description: 'Run final commands and cleanup',
      tasks: ['Run Post-Deploy Scripts', 'Clear Cache', 'Verify Deployment'],
    },
  ],
  settings: {
    timeout: '30 minutes',
    retryAttempts: '3',
    rollbackOnFailure: true,
    notifyOnComplete: true,
    environment: 'Production',
  },
};

export function PipelineConfigTab({ deploymentId }: PipelineConfigTabProps) {
  return (
    <div className="space-y-8">
      {/* Pipeline Overview */}
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">PIPELINE NAME</p>
          <p className="text-sm font-medium text-foreground">{pipelineConfig.name}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">STATUS</p>
          <Badge className="bg-status-success/10 border border-status-success/30 text-status-success text-xs font-medium">
            {pipelineConfig.status.charAt(0).toUpperCase() + pipelineConfig.status.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-4">PIPELINE STAGES</p>
        <div className="space-y-3">
          {pipelineConfig.stages.map((stage, idx) => (
            <div
              key={idx}
              className="border border-border rounded-lg p-5 shadow-card hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                {/* Stage Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">{stage.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{stage.description}</p>
                  </div>
                  <Badge className="bg-primary/10 border border-primary/30 text-primary text-xs font-medium whitespace-nowrap">
                    Stage {idx + 1}
                  </Badge>
                </div>

                {/* Tasks List */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-3">TASKS</p>
                  <ul className="space-y-2">
                    {stage.tasks.map((task, taskIdx) => (
                      <li
                        key={taskIdx}
                        className="flex items-center gap-2 text-xs text-foreground"
                      >
                        <span className="inline-block w-1.5 h-1.5 bg-primary/60 rounded-full" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Settings */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-4">CONFIGURATION SETTINGS</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">TIMEOUT</p>
            <p className="text-sm text-foreground">{pipelineConfig.settings.timeout}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">RETRY ATTEMPTS</p>
            <p className="text-sm text-foreground">{pipelineConfig.settings.retryAttempts}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">ENVIRONMENT</p>
            <p className="text-sm text-foreground">{pipelineConfig.settings.environment}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-3">OPTIONS</p>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={pipelineConfig.settings.rollbackOnFailure}
                  disabled
                  className="rounded w-4 h-4"
                />
                <span className="text-foreground">Rollback on Failure</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={pipelineConfig.settings.notifyOnComplete}
                  disabled
                  className="rounded w-4 h-4"
                />
                <span className="text-foreground">Notify on Complete</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-xs text-foreground">
          <span className="font-semibold">Note:</span> This is a read-only view of your pipeline configuration. To modify pipeline settings, visit the Environment Configuration page.
        </p>
      </div>
    </div>
  );
}
