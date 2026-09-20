import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendDirection = 'up',
  color = 'indigo'
}) => {
  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/50',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-100 dark:border-amber-900/50',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 border-purple-100 dark:border-purple-900/50',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border-rose-100 dark:border-rose-900/50',
    cyan: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400 border-cyan-100 dark:border-cyan-900/50'
  };

  return (
    <div className="rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-xl border ${colorMap[color] || colorMap.indigo}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-semibold ${
            trendDirection === 'up'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-rose-600 dark:text-rose-400'
          }`}>
            {trendDirection === 'up' ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {trend}
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default StatCard;
