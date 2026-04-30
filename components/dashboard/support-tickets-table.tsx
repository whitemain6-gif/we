'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, Eye, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface SupportTicket {
  id: string;
  subject: string;
  company: string;
  agency: string | null;
  assignee: string | null;
  createdAt: string;
  department: string;
  integration: string | null;
  priority: 'emergency' | 'high' | 'medium' | 'low';
  status: 'pending' | 'closed' | 'open' | 'waitingOnCustomer' | 'resolved';
}

interface SupportTicketsTableProps {
  tickets: SupportTicket[];
}

type SortField = 'id' | 'subject' | 'createdAt' | 'department' | 'priority' | 'status';
type SortDirection = 'asc' | 'desc';

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  open: 'bg-primary/10 text-primary border-primary/20',
  closed: 'bg-muted text-muted-foreground border-border',
  waitingOnCustomer: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  resolved: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  open: 'Open',
  closed: 'Closed',
  waitingOnCustomer: 'Waiting',
  resolved: 'Resolved',
};

const priorityStyles: Record<string, string> = {
  emergency: 'text-destructive font-semibold',
  high: 'text-orange-500 font-semibold',
  medium: 'text-muted-foreground',
  low: 'text-muted-foreground/70',
};

const priorityLabels: Record<string, string> = {
  emergency: 'Emergency',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const departmentStyles: Record<string, string> = {
  Sales: 'text-primary',
  Billing: 'text-amber-500',
  Support: 'text-foreground',
};

const ITEMS_PER_PAGE = 10;

export function SupportTicketsTable({ tickets }: SupportTicketsTableProps) {
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Sort tickets
  const sortedTickets = [...tickets].sort((a, b) => {
    let aVal: string = String(a[sortField] ?? '');
    let bVal: string = String(b[sortField] ?? '');
    aVal = aVal.toLowerCase();
    bVal = bVal.toLowerCase();
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sortedTickets.length / ITEMS_PER_PAGE));
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTickets = sortedTickets.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedTickets.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedTickets.map(t => t.id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <span className="opacity-0 group-hover:opacity-40 transition-opacity">
          <ChevronUp className="h-3.5 w-3.5" />
        </span>
      );
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-3.5 w-3.5 text-primary" />
    ) : (
      <ChevronDown className="h-3.5 w-3.5 text-primary" />
    );
  };

  const thClass = "px-4 py-3 text-left whitespace-nowrap";
  const thBtnClass = "group flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider";
  const tdClass = "px-4 py-3.5 whitespace-nowrap";

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Scrollable table area */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {/* Checkbox */}
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedIds.size === paginatedTickets.length && paginatedTickets.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-border accent-primary h-3.5 w-3.5 cursor-pointer"
                />
              </th>
              <th className={thClass}>
                <button onClick={() => handleSort('subject')} className={thBtnClass}>
                  Subject <SortIcon field="subject" />
                </button>
              </th>
              <th className={thClass}>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</span>
              </th>
              <th className={cn(thClass, 'hidden xl:table-cell')}>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Agency</span>
              </th>
              <th className={cn(thClass, 'hidden lg:table-cell')}>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Assignee</span>
              </th>
              <th className={thClass}>
                <button onClick={() => handleSort('createdAt')} className={thBtnClass}>
                  Created At <SortIcon field="createdAt" />
                </button>
              </th>
              <th className={thClass}>
                <button onClick={() => handleSort('department')} className={thBtnClass}>
                  Department <SortIcon field="department" />
                </button>
              </th>
              <th className={cn(thClass, 'hidden xl:table-cell')}>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Integration</span>
              </th>
              <th className={thClass}>
                <button onClick={() => handleSort('priority')} className={thBtnClass}>
                  Priority <SortIcon field="priority" />
                </button>
              </th>
              <th className={thClass}>
                <button onClick={() => handleSort('status')} className={thBtnClass}>
                  Status <SortIcon field="status" />
                </button>
              </th>
              <th className="w-20 px-4 py-3 text-center">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTickets.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-4 py-16 text-center">
                  <p className="text-sm text-muted-foreground">No tickets found</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Try adjusting your filters or search terms</p>
                </td>
              </tr>
            ) : (
              paginatedTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className={cn(
                    'border-b border-border/50 transition-colors hover:bg-muted/20',
                    selectedIds.has(ticket.id) && 'bg-primary/5'
                  )}
                >
                  {/* Checkbox */}
                  <td className="w-10 px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(ticket.id)}
                      onChange={() => toggleSelect(ticket.id)}
                      className="rounded border-border accent-primary h-3.5 w-3.5 cursor-pointer"
                    />
                  </td>
                  {/* Subject */}
                  <td className={tdClass}>
                    <Link
                      href={`/dashboard/support-tickets/${ticket.id}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {ticket.id} - {ticket.subject}
                    </Link>
                  </td>
                  {/* Company */}
                  <td className={tdClass}>
                    <span className="text-foreground">{ticket.company}</span>
                  </td>
                  {/* Agency */}
                  <td className={cn(tdClass, 'hidden xl:table-cell')}>
                    <span className="text-muted-foreground">{ticket.agency ?? '—'}</span>
                  </td>
                  {/* Assignee */}
                  <td className={cn(tdClass, 'hidden lg:table-cell')}>
                    <span className="text-foreground">{ticket.assignee ?? '—'}</span>
                  </td>
                  {/* Created At */}
                  <td className={tdClass}>
                    <span className="text-muted-foreground tabular-nums">{ticket.createdAt}</span>
                  </td>
                  {/* Department */}
                  <td className={tdClass}>
                    <span className={cn('font-semibold', departmentStyles[ticket.department] || 'text-foreground')}>
                      {ticket.department}
                    </span>
                  </td>
                  {/* Integration */}
                  <td className={cn(tdClass, 'hidden xl:table-cell')}>
                    <span className="text-muted-foreground">{ticket.integration ?? '—'}</span>
                  </td>
                  {/* Priority */}
                  <td className={tdClass}>
                    <span className={priorityStyles[ticket.priority]}>
                      {priorityLabels[ticket.priority]}
                    </span>
                  </td>
                  {/* Status */}
                  <td className={tdClass}>
                    <span className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border',
                      statusStyles[ticket.status]
                    )}>
                      {statusLabels[ticket.status]}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="w-20 px-4 py-3.5">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        href={`/dashboard/support-tickets/${ticket.id}`}
                        className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                        title="View"
                      >
                        <Eye size={15} />
                      </Link>
                      <Link
                        href={`/dashboard/support-tickets/${ticket.id}?tab=comments`}
                        className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="border-t border-border bg-muted/20 px-4 py-2.5 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="text-xs font-medium text-primary hover:text-primary/80 disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <span className="text-xs text-muted-foreground tabular-nums">
          {startIdx + 1}-{Math.min(startIdx + ITEMS_PER_PAGE, sortedTickets.length)} of {sortedTickets.length}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="text-xs font-medium text-primary hover:text-primary/80 disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
