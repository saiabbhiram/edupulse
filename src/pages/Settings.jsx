import React, { useState } from 'react';
import Button from '../components/common/Button';
import FormField from '../components/common/FormField';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import { settingService, resetStorage } from '../services/storageService';
import { Settings as SettingsIcon, School, Calendar, Bell, Moon, Sun, RotateCcw, Save } from 'lucide-react';

const Settings = () => {
  const toast = useToast();
  const { isDark, toggleTheme } = useTheme();
  const [settings, setSettings] = useState(() => settingService.get());
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('profile');

  const [schoolProfile, setSchoolProfile] = useState(settings.schoolProfile || {});
  const [academicSession, setAcademicSession] = useState(settings.academicSession || {});
  const [notifications, setNotifications] = useState(settings.notifications || {});

  const handleSaveAll = (e) => {
    e.preventDefault();
    const updated = {
      ...settings,
      schoolProfile,
      academicSession,
      notifications
    };
    settingService.save(updated);
    setSettings(updated);
    toast.success('System configurations and institution details saved!', 'Settings Saved');
  };

  const handleResetData = () => {
    resetStorage();
    setIsResetConfirmOpen(false);
    toast.info('All modules have been restored to initial sample records. Reloading...', 'Data Reset');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            System & School Settings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Configure institutional profiles, academic sessions, notifications, and data state
          </p>
        </div>
        <Button onClick={handleSaveAll} icon={Save}>
          Save Changes
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <School className="w-4 h-4" />
          School Profile
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('academic')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'academic'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Academic Session
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('appearance')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'appearance'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sun className="w-4 h-4" />
          Appearance & Alerts
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('backup')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'backup'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          Data Management
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            Institutional Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="School Name"
              name="schoolName"
              value={schoolProfile.schoolName || ''}
              onChange={(e) => setSchoolProfile({ ...schoolProfile, schoolName: e.target.value })}
            />
            <FormField
              label="Tagline / Motto"
              name="tagline"
              value={schoolProfile.tagline || ''}
              onChange={(e) => setSchoolProfile({ ...schoolProfile, tagline: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              label="Affiliation Code"
              name="affiliationCode"
              value={schoolProfile.affiliationCode || ''}
              onChange={(e) => setSchoolProfile({ ...schoolProfile, affiliationCode: e.target.value })}
            />
            <FormField
              label="Principal / Head of School"
              name="principalName"
              value={schoolProfile.principalName || ''}
              onChange={(e) => setSchoolProfile({ ...schoolProfile, principalName: e.target.value })}
            />
            <FormField
              label="Official Currency Symbol"
              name="currency"
              value={schoolProfile.currency || '$'}
              onChange={(e) => setSchoolProfile({ ...schoolProfile, currency: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Official Email"
              name="email"
              type="email"
              value={schoolProfile.email || ''}
              onChange={(e) => setSchoolProfile({ ...schoolProfile, email: e.target.value })}
            />
            <FormField
              label="Phone Contact"
              name="phone"
              value={schoolProfile.phone || ''}
              onChange={(e) => setSchoolProfile({ ...schoolProfile, phone: e.target.value })}
            />
          </div>

          <FormField
            label="Campus Address"
            name="address"
            type="textarea"
            rows={2}
            value={schoolProfile.address || ''}
            onChange={(e) => setSchoolProfile({ ...schoolProfile, address: e.target.value })}
          />
        </div>
      )}

      {/* Academic Tab */}
      {activeTab === 'academic' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            Academic Term Configuration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Current Academic Session"
              name="currentYear"
              value={academicSession.currentYear || ''}
              onChange={(e) => setAcademicSession({ ...academicSession, currentYear: e.target.value })}
              placeholder="e.g. 2025 - 2026"
            />
            <FormField
              label="Active Term"
              name="currentTerm"
              type="select"
              value={academicSession.currentTerm || 'Fall Semester'}
              onChange={(e) => setAcademicSession({ ...academicSession, currentTerm: e.target.value })}
              options={['Fall Semester', 'Spring Semester', 'Summer Term', 'Annual Session']}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Term Start Date"
              name="termStartDate"
              type="date"
              value={academicSession.termStartDate || ''}
              onChange={(e) => setAcademicSession({ ...academicSession, termStartDate: e.target.value })}
            />
            <FormField
              label="Term End Date"
              name="termEndDate"
              type="date"
              value={academicSession.termEndDate || ''}
              onChange={(e) => setAcademicSession({ ...academicSession, termEndDate: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Appearance & Alerts Tab */}
      {activeTab === 'appearance' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Visual Theme Mode
            </h3>
            <p className="text-xs text-slate-500 mb-4">Choose light or dark visual aesthetic</p>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => !isDark || toggleTheme()}
                className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                  !isDark ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Sun className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-bold">Light Mode</span>
              </button>

              <button
                type="button"
                onClick={() => isDark || toggleTheme()}
                className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                  isDark ? 'border-indigo-500 bg-indigo-950/40 text-indigo-300' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Moon className="w-5 h-5 text-indigo-400" />
                <span className="text-xs font-bold">Dark Mode</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Notification Preferences
            </h3>
            <div className="space-y-3 mt-3">
              {[
                { key: 'emailAlerts', label: 'Broadcast notices via Email' },
                { key: 'examReminders', label: 'Upcoming Examination reminders' },
                { key: 'feeDueAlerts', label: 'Automated invoice overdue notifications' },
                { key: 'attendanceAlerts', label: 'Daily absentee alerts to parents' },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-3 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={!!notifications[item.key]}
                    onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Data Management Tab */}
      {activeTab === 'backup' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Reset System Data
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 max-w-xl">
              Restore all mock records (Students, Teachers, Classes, Attendance, Fees, Library, Timetables, and Notices) back to their clean default state.
            </p>

            <Button
              variant="danger"
              size="sm"
              onClick={() => setIsResetConfirmOpen(true)}
              icon={RotateCcw}
            >
              Reset All Data to Factory Default
            </Button>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleResetData}
        title="Reset All School Data"
        message="This will reset all local changes across all modules back to initial mock records. Are you sure you want to proceed?"
        confirmText="Yes, Reset Everything"
      />
    </div>
  );
};

export default Settings;
