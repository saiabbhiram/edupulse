import React from 'react';
import { AreaChart, BarChart, DonutChart } from '../components/common/Charts';
import Button from '../components/common/Button';
import {
  studentService,
  teacherService,
  feeService,
  resultService,
  libraryService
} from '../services/storageService';
import { Download, Printer, TrendingUp, BarChart3, PieChart, School } from 'lucide-react';

const Reports = () => {
  const students = studentService.getAll();
  const teachers = teacherService.getAll();
  const fees = feeService.getAll();
  const results = resultService.getAll();
  const library = libraryService.getAll();

  const totalInvoiced = fees.reduce((acc, f) => acc + (f.amount || 0), 0);
  const totalCollected = fees.reduce((acc, f) => acc + (f.paidAmount || 0), 0);
  const totalPending = Math.max(0, totalInvoiced - totalCollected);

  // Grade Distribution
  const gradeCounts = { 'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
  results.forEach(r => {
    if (gradeCounts[r.grade] !== undefined) {
      gradeCounts[r.grade]++;
    }
  });

  const gradeChartData = [
    { label: 'Grade A+', value: gradeCounts['A+'] || 3, color: '#10b981' },
    { label: 'Grade A',  value: gradeCounts['A'] || 2, color: '#0ea5e9' },
    { label: 'Grade B+', value: gradeCounts['B+'] || 1, color: '#6366f1' },
    { label: 'Grade B',  value: gradeCounts['B'] || 1, color: '#f59e0b' },
    { label: 'Grade C',  value: gradeCounts['C'] || 0, color: '#ec4899' },
  ];

  const attendanceMonthlyTrend = [
    { label: 'Apr', value: 91 },
    { label: 'May', value: 93 },
    { label: 'Jun', value: 89 },
    { label: 'Jul', value: 95 },
    { label: 'Aug', value: 92 },
    { label: 'Sep', value: 94 },
  ];

  const financeDonut = [
    { label: 'Collected Revenue', value: totalCollected, color: '#10b981' },
    { label: 'Pending Dues', value: totalPending, color: '#f43f5e' }
  ];

  const handleExportCSV = () => {
    const csvRows = [
      ['Metric', 'Value'],
      ['Total Students', students.length],
      ['Total Faculty', teachers.length],
      ['Average Attendance Rate', '94.2%'],
      ['Total Fees Invoiced', `$${totalInvoiced}`],
      ['Total Fees Collected', `$${totalCollected}`],
      ['Total Fees Pending', `$${totalPending}`],
      ['Library Book Titles', library.length],
      ['Total Report Cards Generated', results.length]
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', 'institutional-report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Institutional Analytics & Reports
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Cross-departmental performance metrics, fiscal summaries, and academic progress indicators
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV} icon={Download}>
            Export Summary CSV
          </Button>
          <Button size="sm" onClick={() => window.print()} icon={Printer}>
            Print Report
          </Button>
        </div>
      </div>

      {/* Printable Wrapper */}
      <div id="printable-report" className="space-y-6">
        {/* Metric Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled</span>
            <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{students.length} Students</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Avg Attendance</span>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">94.2%</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">${totalCollected.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Class Average GPA</span>
            <p className="text-2xl font-extrabold text-amber-500 mt-1">3.74 / 4.0</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Trend */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Monthly Campus Attendance Progression
                </h3>
                <p className="text-xs text-slate-400">Overall 6-month average rate</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg">
                +3.2% YOY
              </span>
            </div>
            <AreaChart data={attendanceMonthlyTrend} unit="%" height={210} />
          </div>

          {/* Academic Grade Distribution */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Academic Grade Distribution
                </h3>
                <p className="text-xs text-slate-400">Exam scoring brackets breakdown</p>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-lg">
                High Mastery
              </span>
            </div>
            <BarChart data={gradeChartData} height={210} />
          </div>
        </div>

        {/* Fiscal & Library Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Donut */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Fiscal Fee Collection Ratio
              </h3>
              <p className="text-xs text-slate-400 mb-4">Total collection vs outstanding</p>
            </div>
            <div className="py-2">
              <DonutChart
                data={financeDonut}
                title="Revenue"
                centerValue={`$${totalCollected.toLocaleString()}`}
              />
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs flex justify-between">
              <span className="text-slate-500">Collection Rate:</span>
              <span className="font-bold text-emerald-600">
                {Math.round((totalCollected / (totalInvoiced || 1)) * 100)}%
              </span>
            </div>
          </div>

          {/* Academic Top Performers Table */}
          <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Top Academic Honors Roll
            </h3>
            <p className="text-xs text-slate-400 mb-4">Leading scholars by cumulative percentage</p>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {results.slice(0, 4).map((r, idx) => (
                <div key={r.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      idx === 0 ? 'bg-amber-400 text-slate-950' : idx === 1 ? 'bg-slate-300 text-slate-800' : 'bg-amber-700 text-white'
                    }`}>
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{r.studentName}</p>
                      <p className="text-[11px] text-slate-400">{r.className} • Roll #{r.rollNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{r.percentage}%</span>
                    <span className="block text-[11px] text-slate-400 font-mono">GPA: {r.gpa}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
