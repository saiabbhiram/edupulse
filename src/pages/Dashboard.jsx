import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  Building2,
  CalendarCheck,
  CreditCard,
  Library,
  ArrowUpRight,
  PlusCircle,
  Clock,
  Bell,
  Calendar,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/common/StatCard';
import { AreaChart, BarChart, DonutChart } from '../components/common/Charts';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import {
  studentService,
  teacherService,
  classService,
  feeService,
  libraryService,
  noticeService,
  eventService
} from '../services/storageService';

const Dashboard = () => {
  const { currentUser, role } = useAuth();
  const navigate = useNavigate();

  const students = studentService.getAll();
  const teachers = teacherService.getAll();
  const classes = classService.getAll();
  const fees = feeService.getAll();
  const library = libraryService.getAll();
  const notices = noticeService.getAll().slice(0, 4);
  const events = eventService.getAll().slice(0, 4);

  // Financial calculations
  const totalFeesInvoiced = fees.reduce((acc, f) => acc + (f.amount || 0), 0);
  const totalFeesCollected = fees.reduce((acc, f) => acc + (f.paidAmount || 0), 0);
  const totalFeesPending = Math.max(0, totalFeesInvoiced - totalFeesCollected);

  // Chart data
  const attendanceTrendData = [
    { label: 'Mon', value: 92 },
    { label: 'Tue', value: 96 },
    { label: 'Wed', value: 94 },
    { label: 'Thu', value: 89 },
    { label: 'Fri', value: 95 },
    { label: 'Today', value: 93 },
  ];

  const subjectPerformanceData = [
    { label: 'Math', value: 88, color: '#6366f1' },
    { label: 'Physics', value: 84, color: '#0ea5e9' },
    { label: 'English', value: 92, color: '#10b981' },
    { label: 'History', value: 78, color: '#f59e0b' },
    { label: 'CompSci', value: 94, color: '#8b5cf6' },
  ];

  const feeStatusData = [
    { label: 'Collected', value: totalFeesCollected, color: '#10b981' },
    { label: 'Pending / Overdue', value: totalFeesPending, color: '#f43f5e' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-6 sm:p-8 text-white shadow-xl shadow-indigo-600/15">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Academic Session 2025 - 2026 • Fall Term
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {currentUser?.name}!
          </h1>
          <p className="mt-2 text-sm text-indigo-100 leading-relaxed">
            {role === 'admin' && "Here is the operational overview of students, teachers, fee receipts, and academic benchmarks."}
            {role === 'teacher' && "Review your scheduled classes, student attendance, assignment submissions, and upcoming evaluations."}
            {role === 'student' && "Keep track of your timetable, assignments due this week, upcoming midterm exams, and issued library books."}
            {role === 'parent' && "Stay updated on your child's attendance rate, latest exam report cards, and school announcements."}
          </p>
        </div>

        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
          <Building2 className="w-96 h-96 text-white" />
        </div>
      </div>

      {/* Primary KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Students"
          value={students.length}
          subtitle="Enrolled active learners"
          icon={Users}
          color="indigo"
          trend="+12% this term"
          trendDirection="up"
        />
        <StatCard
          title="Faculty Members"
          value={teachers.length}
          subtitle="Qualified instructors"
          icon={GraduationCap}
          color="emerald"
          trend="100% active"
          trendDirection="up"
        />
        <StatCard
          title="Attendance Rate"
          value="94.2%"
          subtitle="Average campus rate"
          icon={CalendarCheck}
          color="cyan"
          trend="+1.8% vs last week"
          trendDirection="up"
        />
        <StatCard
          title="Fees Collected"
          value={`$${totalFeesCollected.toLocaleString()}`}
          subtitle={`$${totalFeesPending.toLocaleString()} pending`}
          icon={CreditCard}
          color="amber"
          trend="78% collected"
          trendDirection="up"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Attendance Trend */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Attendance Trends
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Daily student attendance percentage across all grades
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-lg">
              This Week
            </span>
          </div>
          <AreaChart data={attendanceTrendData} unit="%" height={220} />
        </div>

        {/* Fee Collection Status */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Fee Collection Status
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Current term tuition and auxiliary fees
            </p>
          </div>
          <div className="py-4">
            <DonutChart
              data={feeStatusData}
              title="Collected"
              centerValue={`$${totalFeesCollected.toLocaleString()}`}
            />
          </div>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">Total Invoiced:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              ${totalFeesInvoiced.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Performance Bar Chart & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject Score Averages */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Subject Performance Averages
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mean test scores across key academic disciplines (%)
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/results')}
            >
              View Report Cards
            </Button>
          </div>
          <BarChart data={subjectPerformanceData} height={210} />
        </div>

        {/* Quick Action Shortcuts */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            Quick Actions
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Frequent operations shortcuts
          </p>

          <div className="space-y-2.5">
            <button
              onClick={() => navigate('/students')}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Manage Students</p>
                  <p className="text-[10px] text-slate-400">Add or edit enrollments</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </button>

            <button
              onClick={() => navigate('/attendance')}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Mark Attendance</p>
                  <p className="text-[10px] text-slate-400">Take daily roll call</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </button>

            <button
              onClick={() => navigate('/fees')}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Collect Fee Payment</p>
                  <p className="text-[10px] text-slate-400">Generate receipt</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
            </button>

            <button
              onClick={() => navigate('/library')}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/30 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
                  <Library className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Library Circulation</p>
                  <p className="text-[10px] text-slate-400">Issue or return books</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Notices & Events Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notice Board */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Bulletin Board
              </h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/notices')}>
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Badge variant={notice.category} size="xs">
                    {notice.category}
                  </Badge>
                  <span className="text-[11px] text-slate-400">{notice.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {notice.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {notice.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upcoming Events
              </h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/events')}>
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex flex-col items-center justify-center min-w-[50px]">
                  <span className="text-[10px] font-bold uppercase">
                    {new Date(event.date).toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="text-base font-extrabold leading-none mt-0.5">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant={event.category} size="xs">
                      {event.category}
                    </Badge>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {event.time}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {event.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    📍 {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
