import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Plus
} from 'lucide-react';
import Button from './Button';

const DataTable = ({
  columns = [],
  data = [],
  searchPlaceholder = 'Search records...',
  filterOptions = [], // [{ key, label, options: [{ value, label }] }]
  onAdd,
  addLabel = 'Add New',
  exportFilename = 'export.csv',
  itemsPerPageOptions = [5, 10, 20, 50],
  defaultPageSize = 10,
  emptyMessage = 'No records found'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Filter handlers
  const handleFilterChange = (key, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1);
  };

  // Sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filtered & Sorted data pipeline
  const processedData = useMemo(() => {
    let result = [...data];

    // Search filter across text columns
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(row => {
        return Object.values(row).some(val => {
          if (val === null || val === undefined) return false;
          if (typeof val === 'object') {
            return JSON.stringify(val).toLowerCase().includes(lower);
          }
          return String(val).toLowerCase().includes(lower);
        });
      });
    }

    // Dropdown filters
    Object.entries(activeFilters).forEach(([key, filterVal]) => {
      if (filterVal && filterVal !== 'all') {
        result = result.filter(row => String(row[key]) === String(filterVal));
      }
    });

    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
        }

        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        if (strA < strB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (strA > strB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, activeFilters, sortConfig]);

  // Pagination calculation
  const totalItems = processedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const start = (validCurrentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, validCurrentPage, pageSize]);

  // CSV Export
  const exportToCSV = () => {
    if (!processedData.length) return;
    const exportableCols = columns.filter(c => c.accessor && !c.hideFromExport);
    const headers = exportableCols.map(c => `"${c.header}"`).join(',');
    const rows = processedData.map(row => {
      return exportableCols.map(c => {
        const val = typeof c.accessor === 'function' ? c.accessor(row) : row[c.accessor];
        const safeVal = val === null || val === undefined ? '' : String(val).replace(/"/g, '""');
        return `"${safeVal}"`;
      }).join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', exportFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-colors">
      {/* Top Action Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Dynamic Filter Dropdowns */}
          {filterOptions.map((filter) => (
            <div key={filter.key} className="flex items-center gap-1.5">
              <select
                value={activeFilters[filter.key] || 'all'}
                onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                className="py-2 px-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="all">All {filter.label}</option>
                {filter.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Buttons: Export & Add */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={exportToCSV}
            icon={Download}
            title="Export filtered records to CSV"
          >
            Export CSV
          </Button>

          {onAdd && (
            <Button
              variant="primary"
              size="sm"
              onClick={onAdd}
              icon={Plus}
            >
              {addLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50">
              {columns.map((col, idx) => {
                const isSortable = col.sortable !== false && col.accessor;
                const isSorted = sortConfig.key === col.accessor;
                return (
                  <th
                    key={idx}
                    onClick={() => isSortable && handleSort(col.accessor)}
                    className={`px-4 py-3.5 text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider select-none ${
                      isSortable ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors' : ''
                    } ${col.className || ''}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {isSortable && (
                        <span className="text-slate-400">
                          {isSorted ? (
                            sortConfig.direction === 'asc' ? (
                              <ChevronUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            )
                          ) : (
                            <ChevronsUpDown className="w-3.5 h-3.5 opacity-40 hover:opacity-100" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr
                  key={row.id || rowIdx}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`px-4 py-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 ${col.cellClassName || ''}`}
                    >
                      {col.render
                        ? col.render(row)
                        : typeof col.accessor === 'function'
                        ? col.accessor(row)
                        : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                  <div className="flex flex-col items-center justify-center">
                    <Filter className="w-8 h-8 stroke-1 text-slate-300 dark:text-slate-600 mb-2" />
                    <p className="text-sm font-medium">{emptyMessage}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Try clearing filters or search terms</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {itemsPerPageOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span className="hidden sm:inline">|</span>
          <span>
            Showing {totalItems > 0 ? (validCurrentPage - 1) * pageSize + 1 : 0} to{' '}
            {Math.min(validCurrentPage * pageSize, totalItems)} of {totalItems} entries
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            disabled={validCurrentPage <= 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="p-1 px-2.5"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="px-2 py-1 font-semibold text-slate-700 dark:text-slate-200">
            Page {validCurrentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={validCurrentPage >= totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="p-1 px-2.5"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
