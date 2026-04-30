'use client';

import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface TicketData {
  id: string;
  requesterName: string;
  requesterEmail: string;
  company: string;
  agency: string;
  website: string;
  department: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'emergency';
  assignee?: string;
}

interface TicketDetailsSidebarProps {
  ticketData: TicketData;
}

export function TicketDetailsSidebar({ ticketData }: TicketDetailsSidebarProps) {
  const priorityColors = {
    low: 'bg-primary/10 text-primary border-primary/20',
    medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    emergency: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <div className="space-y-5 sticky top-20">
      {/* Requester Information */}
      <Card className="border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Requester</h3>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold shrink-0">
              {ticketData.requesterName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{ticketData.requesterName}</p>
              <p className="text-xs text-muted-foreground truncate">{ticketData.requesterEmail}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Company Information */}
      <Card className="border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Company Details</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Company</p>
            <p className="text-sm text-foreground">{ticketData.company}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Agency</p>
            <p className="text-sm text-foreground">{ticketData.agency}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Website</p>
            <Link
              href={ticketData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 text-sm"
            >
              {new URL(ticketData.website).hostname}
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </Card>

      {/* Department & Priority Combined */}
      <Card className="border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ticket Info</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Department</span>
            <span className="text-sm font-medium text-foreground">{ticketData.department}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Priority</span>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${priorityColors[ticketData.priority]}`}>
              {ticketData.priority.charAt(0).toUpperCase() + ticketData.priority.slice(1)}
            </span>
          </div>
        </div>
      </Card>

      {/* Assignee */}
      {ticketData.assignee && (
        <Card className="border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Assignee</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-sm font-semibold shrink-0">
                {ticketData.assignee.charAt(0)}
              </div>
              <p className="text-sm font-medium text-foreground">{ticketData.assignee}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Tags */}
      {ticketData.tags && ticketData.tags.length > 0 && (
        <Card className="border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/30">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tags</h3>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {ticketData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
