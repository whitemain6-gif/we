'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CommentsTab } from '@/components/dashboard/comments-tab';
import { HistoryTab } from '@/components/dashboard/history-tab';
import { AllActivityTab } from '@/components/dashboard/all-activity-tab';
import { CommentInput } from '@/components/dashboard/comment-input';
import {
  ArrowLeft,
  Edit2,
  Check,
  X,
  Clock,
  ExternalLink,
  MessageCircle,
  History,
  ListFilter,
  ChevronDown,
  ChevronRight,
  Building2,
  Globe,
  Briefcase,
  Tag,
  Users,
  User,
  Shield,
  CalendarDays,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Mock ticket data — in production this comes from the API based on params.id
const ticketData = {
  id: '4538',
  title: 'Testing on staging',
  status: 'pending' as const,
  priority: 'emergency' as const,
  createdAt: '2025-10-02 10:11:25',
  updatedAt: '2025-10-02 12:45:00',
  description:
    '# VCL version 5.0 is not supported so it should be 4.0 even though actually used Varnish version is 5\nvcl 4.0;\n\nimport std;\n# The minimal Varnish version is 5.0\n# For SSL offloading, pass the following header in your proxy server or load balancer: \'X-Forwarded-Proto: https\'',
  requesterName: 'Catherine Jarosz',
  requesterEmail: 'catherine.jarosz@corefinity.com',
  company: 'Example Company',
  agency: 'Hotfoot Design',
  website: 'https://test-deletion.example.com',
  department: 'Support',
  assignee: 'Catherine Jarosz',
  team: 'Test team',
  tags: ['Production', 'Staging', 'VCL'],
  subscribers: [
    'Navid Nadali',
    'Jade Louise Bridgeman',
    'Mahsa Shirazian',
  ],
};

const statusConfig: Record<string, { label: string; cls: string; dot: string }> = {
  pending: { label: 'Pending', cls: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25', dot: 'bg-amber-500' },
  open: { label: 'Open', cls: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25', dot: 'bg-blue-500' },
  closed: { label: 'Closed', cls: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25', dot: 'bg-emerald-500' },
};

const priorityConfig: Record<string, { label: string; cls: string; bar: string }> = {
  low: { label: 'Low', cls: 'text-muted-foreground', bar: 'bg-muted-foreground' },
  medium: { label: 'Medium', cls: 'text-amber-600 dark:text-amber-400', bar: 'bg-amber-500' },
  high: { label: 'High', cls: 'text-orange-600 dark:text-orange-400', bar: 'bg-orange-500' },
  emergency: { label: 'Emergency', cls: 'text-red-600 dark:text-red-400', bar: 'bg-red-500' },
};

/* ─── small reusable sidebar row ─── */
function SidebarRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5">
      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap pt-0.5">{label}</span>
      <div className="text-sm text-foreground text-right">{children}</div>
    </div>
  );
}

export default function TicketDetailsPage() {
  const [activeTab, setActiveTab] = useState('comments');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(ticketData.title);
  const [descriptionOpen, setDescriptionOpen] = useState(true);

  const handleAddComment = async (content: string, isInternal: boolean) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const status = statusConfig[ticketData.status] || statusConfig.open;
  const priority = priorityConfig[ticketData.priority] || priorityConfig.medium;

  const tabTriggerClass =
    'relative text-[13px] font-medium px-3 py-1.5 rounded-md transition-all ' +
    'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm ' +
    'data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:hover:bg-muted/60';

  return (
    <div className="space-y-0">
      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground mb-5">
        <Link href="/dashboard/support-tickets" className="hover:text-foreground transition-colors">
          Tickets
        </Link>
        <ChevronRight size={14} className="text-muted-foreground/50" />
        <span className="text-foreground font-medium">#{ticketData.id}</span>
      </div>

      {/* ── Title row ── */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="flex-1 text-xl font-semibold bg-background border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                autoFocus
              />
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => { setEditedTitle(ticketData.title); setIsEditing(false); }}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="group flex items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">{editedTitle}</h1>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 rounded text-muted-foreground/0 group-hover:text-muted-foreground hover:!text-foreground transition-colors"
              >
                <Edit2 size={14} />
              </button>
            </div>
          )}
          <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">
            Opened by{' '}
            <span className="text-foreground font-medium">{ticketData.requesterName}</span>
            <span className="mx-1.5 text-border">·</span>
            <span className="text-muted-foreground">{ticketData.requesterEmail}</span>
          </p>
        </div>

        {/* Status button (Jira-style) */}
        <button className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors shrink-0',
          status.cls
        )}>
          <span className={cn('w-1.5 h-1.5 rounded-full', status.dot)} />
          {status.label}
          <ChevronDown size={12} />
        </button>
      </div>

      {/* ── Main content grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

        {/* ═══ Left column ═══ */}
        <div className="space-y-6 min-w-0">

          {/* Description (collapsible) */}
          <div className="rounded-lg border border-border bg-card">
            <button
              onClick={() => setDescriptionOpen(!descriptionOpen)}
              className="w-full flex items-center gap-2 px-5 py-3 text-left hover:bg-muted/30 transition-colors rounded-t-lg"
            >
              {descriptionOpen ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronRight size={16} className="text-muted-foreground" />}
              <h2 className="text-sm font-semibold text-foreground">Description</h2>
              <span className="text-xs text-muted-foreground ml-auto">Ticket description</span>
            </button>
            {descriptionOpen && (
              <div className="px-5 pb-5">
                <div className="bg-muted/30 rounded-lg border border-border overflow-hidden">
                  <div className="p-4 overflow-x-auto">
                    <pre className="text-[13px] text-foreground/90 whitespace-pre-wrap font-mono leading-[1.7]">{
                      ticketData.description.split('\n').map((line, i) => (
                        <div key={i} className="flex">
                          <span className="w-7 text-right pr-3 text-muted-foreground/50 select-none text-xs leading-[1.7] shrink-0">{i + 1}</span>
                          <span>{line || '\u00A0'}</span>
                        </div>
                      ))
                    }</pre>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Activity section */}
          <div className="space-y-5">
            <h2 className="text-sm font-semibold text-foreground">Activity</h2>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="inline-flex w-auto bg-card border border-border rounded-lg p-1 gap-0.5 h-auto">
                <TabsTrigger value="all" className={tabTriggerClass}>
                  <ListFilter size={13} className="mr-1.5" />All
                </TabsTrigger>
                <TabsTrigger value="comments" className={tabTriggerClass}>
                  <MessageCircle size={13} className="mr-1.5" />Comments
                </TabsTrigger>
                <TabsTrigger value="history" className={tabTriggerClass}>
                  <History size={13} className="mr-1.5" />History
                </TabsTrigger>
              </TabsList>

              <div className="mt-5 min-h-[200px]">
                <TabsContent value="all" className="mt-0">
                  <AllActivityTab onAddComment={handleAddComment} showInput={false} />
                </TabsContent>
                <TabsContent value="comments" className="mt-0">
                  <CommentsTab onAddComment={handleAddComment} showInput={false} />
                </TabsContent>
                <TabsContent value="history" className="mt-0">
                  <HistoryTab />
                </TabsContent>
              </div>
            </Tabs>

            {/* Comment input — always visible below activity */}
            <CommentInput onSubmit={handleAddComment} />
          </div>
        </div>

        {/* ═══ Right sidebar ═══ */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">

            {/* Details panel */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border bg-muted/30">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Details</h3>
              </div>
              <div className="px-4 py-1 divide-y divide-border/60">
                {/* Priority */}
                <SidebarRow label="Priority">
                  <div className="flex items-center gap-2">
                    <span className={cn('w-1 h-4 rounded-full', priority.bar)} />
                    <span className={cn('font-medium', priority.cls)}>{priority.label}</span>
                  </div>
                </SidebarRow>

                {/* Assignee */}
                <SidebarRow label="Assignee">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-primary text-[10px] font-bold shrink-0">
                      {ticketData.assignee.charAt(0)}
                    </div>
                    <span>{ticketData.assignee}</span>
                  </div>
                </SidebarRow>

                {/* Team */}
                <SidebarRow label="Team">
                  <div className="flex items-center gap-2">
                    <Users size={13} className="text-muted-foreground shrink-0" />
                    <span>{ticketData.team}</span>
                  </div>
                </SidebarRow>

                {/* Reporter */}
                <SidebarRow label="Reporter">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary text-[10px] font-bold shrink-0">
                      {ticketData.requesterName.charAt(0)}
                    </div>
                    <span>{ticketData.requesterName}</span>
                  </div>
                </SidebarRow>

                {/* Department */}
                <SidebarRow label="Department">
                  <span className="font-medium">{ticketData.department}</span>
                </SidebarRow>

                {/* Dates */}
                <div className="py-2.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays size={11} />
                    <span>Created {ticketData.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock size={11} />
                    <span>Updated {ticketData.updatedAt}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Info panel */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border bg-muted/30">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client Info</h3>
              </div>
              <div className="px-4 py-1 divide-y divide-border/60">
                <SidebarRow label="Client Company">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-muted/50 border border-border text-xs font-medium">
                    <Building2 size={11} className="text-muted-foreground" />
                    {ticketData.company}
                  </span>
                </SidebarRow>
                <SidebarRow label="Agency">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-muted/50 border border-border text-xs font-medium">
                    <Briefcase size={11} className="text-muted-foreground" />
                    {ticketData.agency}
                  </span>
                </SidebarRow>
                <SidebarRow label="Website">
                  <Link
                    href={ticketData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-xs font-medium"
                  >
                    <Globe size={11} />
                    {new URL(ticketData.website).hostname}
                    <ExternalLink size={10} />
                  </Link>
                </SidebarRow>
              </div>
            </div>

            {/* Tags */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex items-center justify-between">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Labels</h3>
                <button className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">+ Add</button>
              </div>
              <div className="px-4 py-3">
                <div className="flex flex-wrap gap-1.5">
                  {ticketData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-primary/8 text-primary border border-primary/15"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Subscribers */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex items-center justify-between">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subscribers</h3>
                <span className="text-xs text-muted-foreground">{ticketData.subscribers.length}</span>
              </div>
              <div className="px-4 py-2 divide-y divide-border/40">
                {ticketData.subscribers.map((name) => (
                  <div key={name} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-[10px] font-bold shrink-0">
                        {name.charAt(0)}
                      </div>
                      <span className="text-xs text-foreground">{name}</span>
                    </div>
                    <button className="text-[10px] text-muted-foreground hover:text-destructive transition-colors font-medium uppercase tracking-wide">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Close ticket */}
            {ticketData.status !== 'closed' && (
              <button className="w-full px-4 py-2 text-xs font-medium bg-destructive/8 border border-destructive/15 rounded-lg text-destructive hover:bg-destructive/15 transition-colors flex items-center justify-center gap-1.5">
                <X size={13} />
                Close Ticket
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
