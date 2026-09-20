import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCheck,
  Building2,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  FileSpreadsheet,
  Award,
  BookMarked,
  CreditCard,
  Library,
  Bell,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  X,
  School
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { path: '/students', label: 'Students', icon: Users, id: 'students' },
  { path: '/teachers', label: 'Teachers', icon: GraduationCap, id: 'teachers' },
  { path: '/parents', label: 'Parents', icon: UserCheck, id: 'parents' },
  { path: '/classes', label: 'Classes', icon: Building2, id: 'classes' },
  { path: '/subjects', label: 'Subjects', icon: BookOpen, id: 'subjects' },
  { path: '/attendance', label: 'Attendance', icon: CalendarCheck, id: 'attendance' },
  { path: '/timetable', label: 'Timetable', icon: CalendarDays, id: 'timetable' },
  { path: '/exams', label: 'Exams', icon: FileSpreadsheet, id: 'exams' },
  { path: '/results', label: 'Results', icon: Award, id: 'results' },
  { path: '/assignments', label: 'Assignments', icon: BookMarked, id: 'assignments' },
  { path: '/fees', label: 'Fees & Invoices', icon: CreditCard, id: 'fees' },
  { path: '/library', label: 'Library', icon: Library, id: 'library' },
  { path: '/notices', label: 'Notices', icon: Bell, id: 'notices' },
  { path: '/events', label: 'Events', icon: Calendar, id: 'events' },
  { path: '/messages', label: 'Messages', icon: MessageSquare, id: 'messages' },
  { path: '/reports', label: 'Reports', icon: BarChart3, id: 'reports' },
  { path: '/settings', label: 'Settings', icon: Settings, id: 'settings' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { currentUser, role, canAccess, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const visibleNavItems = NAV_ITEMS.filter(item => canAccess(item.id));

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                EduPulse
              </h1>
              <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Management System
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Role Badge in Sidebar */}
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/30"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {currentUser?.name}
              </p>
              <p className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider capitalize">
                {currentUser?.roleLabel || role}
              </p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Navigation Menu
          </div>
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Sidebar Footer with Logout */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
