import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Moon,
  Sun,
  Bell,
  Search,
  ChevronDown,
  User,
  LogOut,
  ShieldCheck,
  GraduationCap,
  Users,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { noticeService } from '../../services/storageService';
import { useNavigate } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const { currentUser, role, switchRole, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const profileRef = useRef(null);
  const roleRef = useRef(null);
  const notifRef = useRef(null);

  const notices = noticeService.getAll().slice(0, 3);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setIsRoleMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rolesList = [
    { key: 'admin', label: 'Admin', icon: ShieldCheck, color: 'text-indigo-600' },
    { key: 'teacher', label: 'Teacher', icon: GraduationCap, color: 'text-emerald-600' },
    { key: 'student', label: 'Student', icon: User, color: 'text-cyan-600' },
    { key: 'parent', label: 'Parent', icon: Users, color: 'text-amber-600' },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile Toggle & Breadcrumb / Search */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Quick Search */}
        <div className="hidden md:flex items-center relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search students, classes, records..."
            className="w-64 lg:w-80 pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Role Switcher Dropdown */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
            title="Switch User Role for instant testing"
          >
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400 font-normal">Role:</span>
            <span className="capitalize font-bold">{role}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {isRoleMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800">
                Switch Active Role
              </div>
              {rolesList.map(r => {
                const Icon = r.icon;
                const isSelected = role === r.key;
                return (
                  <button
                    key={r.key}
                    onClick={() => {
                      switchRole(r.key);
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${r.color}`} />
                      <span>{r.label}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Recent Notices</span>
                <button
                  onClick={() => {
                    setIsNotifOpen(false);
                    navigate('/notices');
                  }}
                  className="text-[11px] text-indigo-600 hover:underline"
                >
                  View all
                </button>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-64 overflow-y-auto">
                {notices.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setIsNotifOpen(false);
                      navigate('/notices');
                    }}
                    className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{n.category}</span>
                      <span>{n.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{n.title}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{n.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 pl-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <span className="hidden md:inline text-xs font-semibold text-slate-800 dark:text-slate-200">
              {currentUser?.name?.split(' ')[0]}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {currentUser?.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {currentUser?.email}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 capitalize">
                  {currentUser?.roleLabel || role}
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate('/settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Profile & Settings</span>
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
