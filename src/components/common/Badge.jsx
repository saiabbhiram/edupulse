import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  dot = false
}) => {
  const getVariantStyles = (type) => {
    const lower = String(type).toLowerCase();
    switch (lower) {
      case 'active':
      case 'present':
      case 'paid':
      case 'completed':
      case 'pass':
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50';
      case 'absent':
      case 'overdue':
      case 'fail':
      case 'danger':
      case 'urgent':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/50';
      case 'pending':
      case 'late':
      case 'warning':
      case 'draft':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50';
      case 'upcoming':
      case 'info':
      case 'core':
      case 'academic':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/50';
      case 'excused':
      case 'holiday':
      case 'elective':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/50';
      case 'sports':
      case 'meeting':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/50';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  const sizes = {
    xs: 'text-[10px] px-1.5 py-0.5 font-medium',
    sm: 'text-xs px-2.5 py-0.5 font-medium',
    md: 'text-sm px-3 py-1 font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${getVariantStyles(variant)} ${sizes[size] || sizes.sm} ${className}`}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75 animate-pulse" />
      )}
      {children}
    </span>
  );
};

export default Badge;
