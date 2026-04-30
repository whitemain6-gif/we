'use client';

import { Box, Zap, Upload, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeploymentPipelineProps {
  currentStage: 'preparing' | 'building' | 'transferring' | 'finishing';
}

export function DeploymentPipeline({ currentStage }: DeploymentPipelineProps) {
  const stages = [
    { id: 'preparing', label: 'Preparing', icon: Box },
    { id: 'building', label: 'Building', icon: Zap },
    { id: 'transferring', label: 'Transferring', icon: Upload },
    { id: 'finishing', label: 'Finishing', icon: Package }
  ];

  const getStageStatus = (stageId: string) => {
    const stageOrder = ['preparing', 'building', 'transferring', 'finishing'];
    const currentIndex = stageOrder.indexOf(currentStage);
    const stageIndex = stageOrder.indexOf(stageId);

    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'pending';
  };

  // Calculate progress percentage for the line
  const getProgressWidth = () => {
    const stageOrder = ['preparing', 'building', 'transferring', 'finishing'];
    const currentIndex = stageOrder.indexOf(currentStage);
    return `${(currentIndex / (stageOrder.length - 1)) * 100}%`;
  };

  return (
    <div className="py-8 px-8 bg-card/30 dark:bg-card/20 rounded-xl border border-border/30">
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="absolute top-8 left-8 right-8 h-1 bg-border/50 rounded-full z-0" />
        
        {/* Progress line */}
        <div 
          className="absolute top-8 left-8 h-1 bg-gradient-to-r from-emerald-500 to-primary rounded-full z-0 transition-all duration-500"
          style={{ width: getProgressWidth() }}
        />

        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const status = getStageStatus(stage.id);
          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';
          const isPending = status === 'pending';
          
          return (
            <div key={stage.id} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  'w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg',
                  isCompleted && 'bg-emerald-500 text-white',
                  isCurrent && 'bg-primary text-white ring-4 ring-primary/30 scale-110',
                  isPending && 'bg-muted/80 dark:bg-muted/40 text-muted-foreground'
                )}
              >
                <Icon size={28} />
              </div>
              <div className="text-center mt-3">
                <p
                  className={cn(
                    'text-sm font-semibold transition-colors',
                    isCompleted && 'text-emerald-500',
                    isCurrent && 'text-primary',
                    isPending && 'text-muted-foreground'
                  )}
                >
                  {stage.label}
                </p>
                {isCurrent && (
                  <span className="block text-xs text-primary/80 mt-0.5 animate-pulse">In Progress</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
