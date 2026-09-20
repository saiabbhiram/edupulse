import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, ShieldCheck, GraduationCap, User, Users, ArrowRight, Lock, Mail } from 'lucide-react';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import Button from '../components/common/Button';

const Login = () => {
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@school.edu');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState('admin');

  const handleCustomLogin = (e) => {
    e.preventDefault();
    login(selectedRole);
    navigate('/dashboard');
  };

  const handleQuickLogin = (roleKey) => {
    login(roleKey);
    navigate('/dashboard');
  };

  const demoRoles = [
    {
      key: 'admin',
      label: 'Admin Portal',
      name: 'Dr. Evelyn Brooks',
      desc: 'Full system management, CRUD, finance & reports',
      icon: ShieldCheck,
      color: 'from-indigo-600 to-indigo-700',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900/50'
    },
    {
      key: 'teacher',
      label: 'Teacher Portal',
      name: 'Sarah Jenkins',
      desc: 'Mark attendance, enter grades, homework & timetable',
      icon: GraduationCap,
      color: 'from-emerald-600 to-emerald-700',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50'
    },
    {
      key: 'student',
      label: 'Student Portal',
      name: 'Alexander Hayes',
      desc: 'View timetable, report card, assignments, library',
      icon: User,
      color: 'from-cyan-600 to-cyan-700',
      textColor: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-100 dark:border-cyan-900/50'
    },
    {
      key: 'parent',
      label: 'Parent Portal',
      name: 'Thomas Hayes',
      desc: 'Child attendance, fee payments & teacher messages',
      icon: Users,
      color: 'from-amber-600 to-amber-700',
      textColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/50'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative transition-colors">
      {/* Theme Toggle Top Right */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-600/30 mb-4">
          <School className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          EduPulse System
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Modern Education Management & Student Information Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        {/* Quick Demo Role Cards */}
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-10 shadow-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-center">
              Select Demo Persona to Sign In Instantly
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1">
              Click any role below to test tailored permissions and dashboards
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {demoRoles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.key}
                  type="button"
                  onClick={() => handleQuickLogin(role.key)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${role.bgColor} group`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${role.textColor}`} />
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {role.label}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {role.name}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {role.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Standard Form separator */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-semibold">
                Or Sign In with Credentials
              </span>
            </div>
          </div>

          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="admin">Administrator</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
              </select>
            </div>

            <Button type="submit" className="w-full py-3 text-sm font-bold shadow-md shadow-indigo-600/20">
              Sign In to Dashboard
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
