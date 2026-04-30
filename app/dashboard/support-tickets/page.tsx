'use client';

import { useState } from 'react';
import { Plus, Search, ChevronDown, X, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SupportTicketsTable, type SupportTicket } from '@/components/dashboard/support-tickets-table';

// Data from the Corefinity ticket system (left image)
const allTickets: SupportTicket[] = [
  {
    id: '4538',
    subject: 'Testing on staging',
    company: 'Test company',
    agency: null,
    assignee: 'Nikoo Esharatabadi',
    createdAt: '2025-10-02 10:11:25',
    department: 'Sales',
    integration: null,
    priority: 'emergency',
    status: 'pending',
  },
  {
    id: '4537',
    subject: 'testing emergency tickets on staging',
    company: 'Test company',
    agency: null,
    assignee: null,
    createdAt: '2025-10-02 09:13:31',
    department: 'Billing',
    integration: null,
    priority: 'emergency',
    status: 'pending',
  },
  {
    id: '3939',
    subject: 'TEST TICKET FOR SUBSCRIPTIONS',
    company: 'Test company',
    agency: null,
    assignee: null,
    createdAt: '2025-05-14 09:30:00',
    department: 'Support',
    integration: null,
    priority: 'medium',
    status: 'closed',
  },
  {
    id: '3937',
    subject: 'Declan Test',
    company: 'Test company',
    agency: null,
    assignee: null,
    createdAt: '2025-05-13 18:25:07',
    department: 'Support',
    integration: null,
    priority: 'emergency',
    status: 'closed',
  },
  {
    id: '3580',
    subject: 'Jade test ticket',
    company: 'Test company',
    agency: null,
    assignee: null,
    createdAt: '2025-03-17 16:25:20',
    department: 'Support',
    integration: null,
    priority: 'medium',
    status: 'closed',
  },
  {
    id: '3541',
    subject: 'testing outlook emails',
    company: 'Test company',
    agency: null,
    assignee: null,
    createdAt: '2025-03-12 11:56:15',
    department: 'Support',
    integration: null,
    priority: 'medium',
    status: 'closed',
  },
];

type FilterKey = 'priority' | 'department' | 'status' | 'company' | 'agency' | 'requester' | 'tags';

interface ActiveFilter {
  key: FilterKey;
  value: string;
  label: string;
}

export default function SupportTicketsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([
    { key: 'status', value: 'pending', label: 'Pending' },
    { key: 'status', value: 'waitingOnCustomer', label: 'WaitingOnCustomer' },
    { key: 'status', value: 'resolved', label: 'Resolved' },
    { key: 'status', value: 'closed', label: 'Closed' },
    { key: 'company', value: 'test-company', label: 'Test company' },
  ]);
  const [filtersVisible, setFiltersVisible] = useState(true);

  const removeFilter = (filterToRemove: ActiveFilter) => {
    setActiveFilters(prev =>
      prev.filter(f => !(f.key === filterToRemove.key && f.value === filterToRemove.value))
    );
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  // Filter tickets by search query
  const filteredTickets = allTickets.filter((ticket) => {
    const query = searchQuery.toLowerCase();
    return (
      ticket.id.toLowerCase().includes(query) ||
      ticket.subject.toLowerCase().includes(query)
    );
  });

  const filterOptions: { key: FilterKey; label: string }[] = [
    { key: 'priority', label: 'Priority' },
    { key: 'department', label: 'Department' },
    { key: 'status', label: 'Status' },
    { key: 'company', label: 'Company' },
    { key: 'agency', label: 'Agency' },
    { key: 'requester', label: 'Requester' },
    { key: 'tags', label: 'Tags' },
  ];

  const getFiltersForKey = (key: FilterKey) =>
    activeFilters.filter(f => f.key === key);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Tickets</h1>
          <p className="text-base text-muted-foreground">
            Manage and track support requests
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all hover:bg-primary/90 shrink-0">
          <Plus size={18} />
          Create Ticket
        </button>
      </div>

      {/* Inline Filter Bar */}
      <div className="rounded-lg border border-border bg-card">
        {/* Filter toggle header */}
        <button
          onClick={() => setFiltersVisible(!filtersVisible)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/20 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Filter size={15} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters</span>
            {activeFilters.length > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {activeFilters.length} active
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {activeFilters.length > 0 && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => { e.stopPropagation(); clearAllFilters(); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); clearAllFilters(); } }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <X size={12} /> Clear all
              </span>
            )}
            <ChevronDown
              size={14}
              className={cn(
                'text-muted-foreground transition-transform duration-200',
                filtersVisible && 'rotate-180'
              )}
            />
          </div>
        </button>

        {/* Filter content */}
        {filtersVisible && (
          <div className="border-t border-border px-4 py-4">
            <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
              {filterOptions.map((filter) => {
                const activeForKey = getFiltersForKey(filter.key);
                return (
                  <div key={filter.key} className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {filter.label}
                    </span>
                    {activeForKey.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {activeForKey.map((af) => (
                          <span
                            key={af.value}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                          >
                            {af.label}
                            <button
                              onClick={() => removeFilter(af)}
                              className="ml-0.5 hover:text-primary/70 transition-colors"
                            >
                              <X size={11} />
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border text-xs text-muted-foreground hover:border-primary/40 transition-colors">
                        Select option
                        <ChevronDown size={11} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search tickets by ID or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(
            'w-full pl-9 pr-4 py-2 rounded-lg bg-card border border-border text-sm',
            'text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all'
          )}
        />
      </div>

      {/* Tickets Table */}
      <SupportTicketsTable tickets={filteredTickets} />
    </div>
  );
}
