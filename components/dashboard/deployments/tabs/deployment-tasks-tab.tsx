'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle, Loader2, ChevronDown, ChevronUp, Rocket, List, Settings, Cloud, Package, RefreshCw, Terminal, CheckCircle2, Circle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from '../../status-badge';

interface DeploymentTasksTabProps {
  deploymentId: string;
}

interface TaskLog {
  text: string;
  timestamp: string;
  type: 'success' | 'error' | 'info' | 'command';
}

interface Task {
  id: string;
  name: string;
  status: 'completed' | 'running' | 'pending' | 'failed';
  duration: string;
  timestamp: string;
  logs: TaskLog[];
}

// Mock task data
const mockTasks: Task[] = [
  {
    id: 'task-1',
    name: 'Transferring changed files',
    status: 'running',
    duration: '1m 15s',
    timestamp: '2024-03-17 16:09:16',
    logs: [
      { text: 'Uploading app/design/frontend/Adam/Luma_Child/web/scss/styles.scss', timestamp: '', type: 'info' },
      { text: 'Uploading app/design/frontend/Adam/Luma_Child/yarn.lock', timestamp: '', type: 'info' },
      { text: 'Uploading app/etc/config.php', timestamp: '', type: 'info' },
      { text: 'Uploading composer.json', timestamp: '', type: 'info' },
      { text: 'Uploading composer.lock', timestamp: '', type: 'info' },
    ],
  },
  {
    id: 'task-2',
    name: 'Preparing release directory',
    status: 'completed',
    duration: '32s',
    timestamp: '2024-03-17 16:08:44',
    logs: [
      { text: 'Copying previous release into app/releases/20220802063511', timestamp: '', type: 'info' },
    ],
  },
  {
    id: 'task-3',
    name: 'Linking files from shared path to release',
    status: 'completed',
    duration: '28s',
    timestamp: '2024-03-17 16:10:31',
    logs: [
      { text: 'Symlinking var/report to app/releases/20220802063511/var/report', timestamp: '', type: 'info' },
      { text: 'Symlinking app/etc/env.php to app/releases/20220802063511/app/etc/env.php', timestamp: '', type: 'info' },
      { text: 'Symlinking .bashrc to app/releases/20220802063511/.bashrc', timestamp: '', type: 'info' },
      { text: 'Symlinking .cache to app/releases/20220802063511/.cache', timestamp: '', type: 'info' },
      { text: 'Symlinking .config to app/releases/20220802063511/.config', timestamp: '', type: 'info' },
    ],
  },
  {
    id: 'task-4',
    name: 'Running SSH command Setup Upgrade --Keep',
    status: 'completed',
    duration: '42s',
    timestamp: '2024-03-17 16:10:59',
    logs: [
      { text: 'Executing Setup Upgrade --Keep [cd app/current php bin/magento setup:upgrade --keep-generated]', timestamp: '', type: 'info' },
      { text: 'Cache types config flushed successfully', timestamp: '', type: 'success' },
      { text: 'Cache cleared successfully', timestamp: '', type: 'success' },
      { text: 'Updating modules:', timestamp: '', type: 'info' },
      { text: 'Could not validate a connection to Elasticsearch. No alive nodes found in your cluster', timestamp: '', type: 'error' },
    ],
  },
];

export function DeploymentTasksTab({ deploymentId }: DeploymentTasksTabProps) {
  const [expandedTasks, setExpandedTasks] = useState<string[]>(['task-1']);
  const [autoScroll, setAutoScroll] = useState(true);

  const toggleTask = (taskId: string) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const getTaskIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="text-emerald-500" size={20} />;
      case 'running':
        return (
          <div className="relative">
            <Circle className="text-primary" size={20} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        );
      case 'failed':
        return <XCircle className="text-destructive" size={20} />;
      case 'pending':
        return <Circle className="text-muted-foreground/40" size={20} strokeDasharray="4 2" />;
      default:
        return null;
    }
  };

  const stages = [
    { id: 'preparing', label: 'Preparing', icon: List, status: 'completed' },
    { id: 'building', label: 'Building', icon: Settings, status: 'completed' },
    { id: 'transferring', label: 'Transferring', icon: Cloud, status: 'running' },
    { id: 'finishing', label: 'Finishing', icon: Package, status: 'pending' },
  ];

  return (
    <div className="space-y-8">
      {/* Deployment Info Header */}
      <div className="bg-card/50 dark:bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 w-full min-w-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4 w-full min-w-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full min-w-0">
            <StatusBadge status="success" label="SUCCEEDED" />
            <div className="min-w-0 w-full">
              <h3 className="font-semibold text-foreground text-sm sm:text-base break-words">
                Merge branch &apos;release/v2.22.0&apos;
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono truncate w-full">892dfb73cf960eb488840ee44ad935f8f51e292d</p>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 shrink-0">
            <span className="text-sm text-muted-foreground font-medium">13m 36s</span>
            <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg border-border/60 hover:bg-muted/50">
              <RefreshCw className="mr-2 h-4 w-4 shrink-0" />
              Retry
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 sm:pt-5 border-t border-border/30 w-full min-w-0">
          <div className="space-y-1.5 min-w-0">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</div>
            <div className="text-sm font-semibold text-foreground truncate">Sensory Direct</div>
          </div>
          <div className="space-y-1.5 min-w-0">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Environment</div>
            <div className="text-sm font-semibold text-foreground">
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs shrink-0">Production</span>
            </div>
          </div>
          <div className="space-y-1.5 min-w-0">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pipeline</div>
            <div className="text-sm font-semibold text-foreground truncate">Magento 2</div>
          </div>
          <div className="space-y-1.5 min-w-0">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Artifact</div>
            <div className="text-sm font-mono text-muted-foreground truncate" title="33b1752d-2052-4e83-a77f-e4eb0e76c94b.gz">
              33b175...
            </div>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Stepper */}
      <div className="relative py-6 sm:py-10 px-2 sm:px-8 bg-card/30 dark:bg-card/20 rounded-xl border border-border/30 overflow-x-auto w-full min-w-0">
        <div className="min-w-[280px] sm:min-w-0">
          {/* Progress line background */}
          <div className="absolute left-[10%] sm:left-24 right-[10%] sm:right-24 h-1 bg-border/50 z-0 rounded-full top-[2.75rem] sm:top-[4.5rem]" />
          {/* Progress line filled */}
          <div className="absolute left-[10%] sm:left-24 h-1 bg-gradient-to-r from-emerald-500 via-emerald-500 to-primary z-0 rounded-full top-[2.75rem] sm:top-[4.5rem]" style={{ width: '55%' }} />

          <div className="relative z-10 flex items-start justify-between w-full">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isCompleted = stage.status === 'completed';
              const isRunning = stage.status === 'running';
              const isPending = stage.status === 'pending';
              
              return (
                <div key={stage.id} className="flex flex-col items-center gap-2 sm:gap-3 px-1 sm:px-0">
                  <div
                    className={cn(
                      "w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg shrink-0",
                      isCompleted && "bg-emerald-500 text-white",
                      isRunning && "bg-primary text-white ring-4 ring-primary/30 scale-110",
                      isPending && "bg-muted/80 dark:bg-muted/40 text-muted-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <div className="text-center mt-1 sm:mt-0">
                    <span className={cn(
                      "text-[10px] sm:text-sm font-semibold transition-colors block text-center break-words max-w-[60px] sm:max-w-none leading-tight sm:leading-normal",
                      isCompleted && "text-emerald-500",
                    isRunning && "text-primary",
                    isPending && "text-muted-foreground"
                  )}>
                    {stage.label}
                  </span>
                  {isRunning && (
                    <span className="block text-[9px] sm:text-xs text-primary/80 mt-0.5 animate-pulse">In Progress</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 sm:gap-8 w-full min-w-0">
        {/* Left Sidebar - Task Summary */}
        <div className="col-span-1 hidden lg:block min-w-0">
          <div className="sticky top-4 space-y-3">
            <div className="flex items-center gap-2 px-3 pb-3 border-b border-border/30">
              <Terminal size={16} className="text-primary" />
              <span className="text-sm font-semibold text-foreground">Tasks</span>
              <span className="ml-auto text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                {mockTasks.length}
              </span>
            </div>
            <div className="space-y-1">
              {mockTasks.map((task) => (
                <button
                  key={`summary-${task.id}`}
                  onClick={() => {
                    if (!expandedTasks.includes(task.id)) {
                      setExpandedTasks([...expandedTasks, task.id]);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg cursor-pointer transition-all duration-200 group text-left",
                    expandedTasks.includes(task.id) 
                      ? "bg-primary/10 dark:bg-primary/5" 
                      : "hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0">
                      {getTaskIcon(task.status)}
                    </div>
                    <span className={cn(
                      "truncate font-medium text-[13px] transition-colors",
                      task.status === 'running' && "text-primary",
                      task.status === 'completed' && "text-foreground",
                      task.status === 'pending' && "text-muted-foreground",
                      task.status === 'failed' && "text-destructive"
                    )}>
                      {task.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0 font-mono">{task.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Detailed Tasks */}
        <div className="col-span-1 lg:col-span-1 space-y-4 w-full min-w-0">
          <div className="flex items-center justify-between px-1 w-full min-w-0">
            <h3 className="text-sm font-semibold text-foreground truncate">Task Execution Log</h3>
            <label className="flex items-center gap-2 cursor-pointer shrink-0">
              <input 
                type="checkbox" 
                id="auto-scroll" 
                checked={autoScroll}
                onChange={(e) => setAutoScroll(e.target.checked)}
                className="rounded border-border accent-primary w-3 h-3 sm:w-4 sm:h-4"
              />
              <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline-block">Auto-scroll</span>
            </label>
          </div>

          <div className="space-y-3">
            {mockTasks.map((task) => {
              const isExpanded = expandedTasks.includes(task.id);

              return (
                <div
                  key={task.id}
                  className={cn(
                    "border rounded-xl overflow-hidden transition-all duration-200 bg-card/50 dark:bg-card/30",
                    task.status === 'completed' && "border-emerald-500/30",
                    task.status === 'pending' && "border-border/30",
                    task.status === 'running' && "border-primary/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]",
                    task.status === 'failed' && "border-destructive/30"
                  )}
                >
                  {/* Task Header */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={cn(
                      "w-full px-5 py-4 flex items-center justify-between transition-colors text-left",
                      isExpanded ? "bg-muted/20" : "hover:bg-muted/10"
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full min-w-0 flex-1">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 w-full sm:w-auto">
                        <div className="shrink-0">{getTaskIcon(task.status)}</div>
                        <div className="min-w-0 flex-1">
                          <p className={cn(
                            "text-sm font-semibold truncate",
                            task.status === 'running' && "text-primary",
                            task.status === 'completed' && "text-foreground",
                            task.status === 'pending' && "text-muted-foreground",
                            task.status === 'failed' && "text-destructive"
                          )}>
                            {task.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{task.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto shrink-0 border-t sm:border-0 border-border/30 pt-2 sm:pt-0">
                        <span className="text-xs text-muted-foreground font-mono">{task.duration}</span>
                        <span className={cn(
                          "text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full",
                          task.status === 'completed' && "bg-emerald-500/10 text-emerald-500",
                          task.status === 'running' && "bg-primary/10 text-primary",
                          task.status === 'failed' && "bg-destructive/10 text-destructive",
                          task.status === 'pending' && "bg-muted/50 text-muted-foreground"
                        )}>
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                        <ChevronDown 
                          size={18} 
                          className={cn(
                            "text-muted-foreground transition-transform duration-200 shrink-0",
                            isExpanded && "rotate-180"
                          )} 
                        />
                      </div>
                    </div>
                  </button>

                  {/* Task Logs - Expanded View */}
                  {isExpanded && (
                    <div className="border-t border-border/30 bg-[#0d1117] dark:bg-[#0d1117]">
                      {/* Progress bar for running tasks */}
                      {task.status === 'running' && (
                        <div className="px-4 border-b border-white/5 py-3">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 w-full min-w-0">
                            <div className="h-2 w-full flex-grow bg-white/10 rounded-full overflow-hidden shrink-0">
                              <div className="h-full bg-gradient-to-r from-emerald-500 to-primary w-[80%] rounded-full animate-pulse" />
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer shrink-0">
                              <input type="checkbox" className="rounded border-white/20 bg-transparent w-4 h-4 accent-primary shrink-0" />
                              <span className="text-xs text-slate-400 whitespace-nowrap">Show file destinations</span>
                            </label>
                          </div>
                        </div>
                      )}

                      <div className="px-4 py-4 space-y-1.5 font-mono text-[10px] sm:text-[13px] overflow-x-auto w-full min-w-0 w-max-[90vw] sm:w-max-none scrollbar-hide">
                        {task.logs.map((log, idx) => (
                          <div 
                            key={idx} 
                            className={cn(
                              "flex py-0.5 rounded transition-colors",
                              log.type === 'error' && "bg-red-500/10 -mx-2 px-2"
                            )}
                          >
                            <span className="text-slate-500 mr-4 select-none w-6 text-right flex-shrink-0">{idx + 1}</span>
                            <span
                              className={cn(
                                'flex-1 break-all',
                                log.type === 'success' && 'text-emerald-400',
                                log.type === 'error' && 'text-red-400',
                                log.type === 'info' && 'text-slate-300',
                                log.type === 'command' && 'text-slate-400 italic',
                              )}
                            >
                              {log.type === 'success' && <span className="text-emerald-500 mr-2">+</span>}
                              {log.type === 'error' && <span className="text-red-500 mr-2">!</span>}
                              {log.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
