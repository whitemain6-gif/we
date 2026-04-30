'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Column<T> {
  header: string;
  accessor: keyof T;
  cell?: (value: any) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onRowClick
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (accessor: string) => {
    if (!sortConfig || sortConfig.key !== accessor) {
      setSortConfig({ key: accessor, direction: 'asc' });
    } else {
      setSortConfig({
        key: accessor,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
      });
    }
  };

  const sortedData = sortConfig
    ? [...data].sort((a, b) => {
        const aVal = a[sortConfig.key as keyof T];
        const bVal = b[sortConfig.key as keyof T];
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        return sortConfig.direction === 'asc'
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      })
    : data;

  return (
    <div className="border border-border rounded-lg overflow-hidden shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-card/50 border-b border-border">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.accessor)}
                  className="px-6 py-4 text-left"
                >
                  <button
                    onClick={() => column.sortable && handleSort(String(column.accessor))}
                    className={cn(
                      'flex items-center gap-2 font-semibold text-sm text-foreground',
                      column.sortable && 'hover:text-primary cursor-pointer'
                    )}
                  >
                    {column.header}
                    {column.sortable && sortConfig?.key === String(column.accessor) && (
                      sortConfig.direction === 'asc' ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  'border-b border-border transition-colors hover:bg-card/50',
                  onRowClick && 'cursor-pointer'
                )}
              >
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${String(column.accessor)}`}
                    className="px-6 py-4 text-sm text-foreground"
                  >
                    {column.cell
                      ? column.cell(row[column.accessor])
                      : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-muted-foreground">No data available</p>
        </div>
      )}
    </div>
  );
}
