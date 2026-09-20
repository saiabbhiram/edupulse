import React, { useState } from 'react';

// Responsive SVG Area / Line Chart
export const AreaChart = ({
  data = [],
  dataKey = 'value',
  labelKey = 'label',
  height = 220,
  strokeColor = '#6366f1',
  fillColor = '#818cf8',
  unit = ''
}) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!data || data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-slate-400 text-xs">No chart data available</div>;
  }

  const values = data.map(d => Number(d[dataKey]) || 0);
  const minVal = 0;
  const maxVal = Math.max(...values, 100);
  const paddingX = 35;
  const paddingY = 25;
  const width = 500;
  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingY * 2;

  const points = data.map((d, i) => {
    const x = paddingX + (i / Math.max(data.length - 1, 1)) * innerWidth;
    const y = height - paddingY - ((Number(d[dataKey]) - minVal) / (maxVal - minVal)) * innerHeight;
    return { x, y, label: d[labelKey], value: d[dataKey] };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, '');

  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x},${height - paddingY} L ${points[0].x},${height - paddingY} Z`
    : '';

  return (
    <div className="w-full relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColor} stopOpacity="0.35" />
            <stop offset="100%" stopColor={fillColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = height - paddingY - ratio * innerHeight;
          const labelVal = Math.round(minVal + ratio * (maxVal - minVal));
          return (
            <g key={i}>
              <line
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeDasharray="4 4"
              />
              <text
                x={paddingX - 8}
                y={y + 3}
                textAnchor="end"
                className="text-[10px] fill-slate-400 font-mono"
              >
                {labelVal}{unit}
              </text>
            </g>
          );
        })}

        {/* Area & Line */}
        <path d={areaD} fill="url(#areaGradient)" />
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points & Interactive Tooltip triggers */}
        {points.map((pt, i) => (
          <g key={i} className="cursor-pointer" onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r={hoverIndex === i ? 5 : 3.5}
              className="fill-white stroke-indigo-600 dark:fill-slate-900 transition-all duration-150"
              strokeWidth="2.5"
            />
            {/* X-axis label */}
            <text
              x={pt.x}
              y={height - 5}
              textAnchor="middle"
              className="text-[10px] fill-slate-400 font-medium"
            >
              {pt.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Floating active point indicator */}
      {hoverIndex !== null && (
        <div
          className="absolute pointer-events-none bg-slate-900 text-white text-[11px] py-1 px-2.5 rounded-lg shadow-lg -translate-x-1/2 -translate-y-8 flex items-center gap-1 z-10 transition-all"
          style={{
            left: `${(points[hoverIndex].x / width) * 100}%`,
            top: `${(points[hoverIndex].y / height) * 100}%`
          }}
        >
          <span className="font-semibold">{points[hoverIndex].label}:</span>
          <span>{points[hoverIndex].value}{unit}</span>
        </div>
      )}
    </div>
  );
};

// Responsive SVG Bar Chart
export const BarChart = ({
  data = [],
  dataKey = 'value',
  labelKey = 'label',
  height = 220,
  barColor = '#6366f1'
}) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!data || data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-slate-400 text-xs">No chart data available</div>;
  }

  const values = data.map(d => Number(d[dataKey]) || 0);
  const maxVal = Math.max(...values, 100);
  const paddingX = 30;
  const paddingY = 25;
  const width = 500;
  const innerWidth = width - paddingX * 2;
  const innerHeight = height - paddingY * 2;

  const barWidth = Math.min(innerWidth / data.length - 12, 36);

  return (
    <div className="w-full relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {/* Horizontal gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = height - paddingY - ratio * innerHeight;
          const labelVal = Math.round(ratio * maxVal);
          return (
            <g key={i}>
              <line
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeDasharray="4 4"
              />
              <text
                x={paddingX - 8}
                y={y + 3}
                textAnchor="end"
                className="text-[10px] fill-slate-400 font-mono"
              >
                {labelVal}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const barHeight = ((Number(d[dataKey]) || 0) / maxVal) * innerHeight;
          const x = paddingX + (i + 0.5) * (innerWidth / data.length) - barWidth / 2;
          const y = height - paddingY - barHeight;
          const isHovered = hoverIndex === i;

          return (
            <g
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="5"
                fill={d.color || barColor}
                opacity={isHovered ? 1 : 0.85}
                className="transition-all duration-200"
              />
              <text
                x={x + barWidth / 2}
                y={height - 6}
                textAnchor="middle"
                className="text-[10px] fill-slate-400 font-medium"
              >
                {d[labelKey]}
              </text>
            </g>
          );
        })}
      </svg>

      {hoverIndex !== null && (
        <div
          className="absolute pointer-events-none bg-slate-900 text-white text-[11px] py-1 px-2.5 rounded-lg shadow-lg -translate-x-1/2 -translate-y-9 z-10"
          style={{
            left: `${((paddingX + (hoverIndex + 0.5) * (innerWidth / data.length)) / width) * 100}%`,
            top: `${((height - paddingY - ((Number(data[hoverIndex][dataKey]) || 0) / maxVal) * innerHeight) / height) * 100}%`
          }}
        >
          <div className="font-semibold">{data[hoverIndex][labelKey]}</div>
          <div>{data[hoverIndex][dataKey]}%</div>
        </div>
      )}
    </div>
  );
};

// Responsive SVG Donut / Ring Chart
export const DonutChart = ({
  data = [],
  size = 180,
  strokeWidth = 22,
  title = 'Total',
  centerValue
}) => {
  const total = data.reduce((sum, item) => sum + (Number(item.value) || 0), 0) || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedAngle = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            className="stroke-slate-100 dark:stroke-slate-800"
            strokeWidth={strokeWidth}
          />
          {data.map((item, i) => {
            const itemPercent = (Number(item.value) || 0) / total;
            const strokeDasharray = `${itemPercent * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedAngle * circumference;
            accumulatedAngle += itemPercent;

            return (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={item.color || '#6366f1'}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{title}</span>
          <span className="text-xl font-bold text-slate-800 dark:text-white">
            {centerValue !== undefined ? centerValue : total}
          </span>
        </div>
      </div>

      {/* Legend list */}
      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 text-xs">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color || '#6366f1' }}
            />
            <span className="text-slate-600 dark:text-slate-300 font-medium">{item.label}</span>
            <span className="text-slate-400 font-semibold ml-auto">{item.value} ({Math.round(((item.value || 0) / total) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};
