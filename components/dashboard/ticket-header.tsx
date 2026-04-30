'use client';

import { useState } from 'react';
import { ArrowLeft, Edit2, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatusBadge } from './status-badge';
import Link from 'next/link';

interface TicketHeaderProps {
  ticketId: string;
  title: string;
  status: 'open' | 'pending' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
  assignee?: string;
}

export function TicketHeader({
  ticketId,
  title,
  status,
  priority,
  createdAt,
  updatedAt,
  assignee,
}: TicketHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const statusLabels = {
    open: { label: 'Open', color: 'bg-primary/10 text-primary border-primary/20' },
    pending: { label: 'Pending', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    closed: { label: 'Closed', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  };

  const priorityColors = {
    low: 'bg-muted text-muted-foreground border-border',
    medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    critical: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb and back button */}
      <div className="flex items-center gap-2">
        <Link href="/dashboard/support-tickets">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Tickets
          </Button>
        </Link>
      </div>

      {/* Header Card */}
      <Card className="border-border bg-card overflow-hidden">
        <div className="p-6">
          {/* Title section */}
          <div className="mb-8">
            {isEditing ? (
              <div className="flex gap-2 items-start">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="flex-1 text-2xl font-bold bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="gap-1"
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditedTitle(title);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <h1 className="text-2xl font-bold text-foreground">{editedTitle}</h1>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="gap-1"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
              </div>
            )}
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-border">
            {/* Ticket ID */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ticket ID</p>
              <p className="text-sm font-mono text-foreground mt-1">{ticketId}</p>
            </div>

            {/* Status */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</p>
              <div className="mt-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusLabels[status].color}`}>
                  {statusLabels[status].label}
                </span>
              </div>
            </div>

            {/* Priority */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Priority</p>
              <div className="mt-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[priority]}`}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </span>
              </div>
            </div>

            {/* Assignee */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Assignee</p>
              <p className="text-sm text-foreground mt-1">{assignee || 'Unassigned'}</p>
            </div>
          </div>

          {/* Dates and actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Created {formatDate(createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Updated {formatDate(updatedAt)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Change Status
              </Button>
              <Button variant="outline" size="sm">
                Assign
              </Button>
              {status !== 'closed' && (
                <Button variant="destructive" size="sm" className="gap-1">
                  <X className="w-4 h-4" />
                  Close Ticket
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
