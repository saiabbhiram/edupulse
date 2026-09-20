import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useToast } from '../context/ToastContext';
import { studentService, classService, attendanceService } from '../services/storageService';
import { Calendar, CheckCircle2, XCircle, Clock, AlertCircle, Save, Users } from 'lucide-react';

const Attendance = () => {
  const toast = useToast();
  const classes = classService.getAll();
  const allStudents = studentService.getAll();

  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || 'CLS-1');

  // Filter students enrolled in the selected class
  const classStudents = allStudents.filter(s => s.classId === selectedClassId);
  const selectedClassObj = classes.find(c => c.id === selectedClassId);
  const currentClassName = selectedClassObj ? `${selectedClassObj.name}-${selectedClassObj.section}` : 'Grade 10-A';

  // Attendance Records State map: { [studentId]: 'Present' | 'Absent' | 'Late' | 'Excused' }
  const [recordsMap, setRecordsMap] = useState({});

  useEffect(() => {
    // Load existing attendance sheet if saved for this date & class
    const existing = attendanceService.getByDateAndClass(selectedDate, selectedClassId);
    if (existing && existing.records) {
      const map = {};
      existing.records.forEach(r => {
        map[r.studentId] = r.status;
      });
      setRecordsMap(map);
    } else {
      // Default all to Present
      const defaultMap = {};
      classStudents.forEach(s => {
        defaultMap[s.id] = 'Present';
      });
      setRecordsMap(defaultMap);
    }
  }, [selectedDate, selectedClassId]);

  const handleStatusChange = (studentId, status) => {
    setRecordsMap(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status) => {
    const updated = {};
    classStudents.forEach(s => {
      updated[s.id] = status;
    });
    setRecordsMap(updated);
    toast.info(`Marked all students as ${status}`, 'Bulk Updated');
  };

  const handleSaveAttendance = () => {
    const recordsArray = classStudents.map(s => ({
      studentId: s.id,
      studentName: s.name,
      rollNo: s.rollNo,
      status: recordsMap[s.id] || 'Present'
    }));

    attendanceService.saveAttendanceSheet(selectedDate, selectedClassId, currentClassName, recordsArray);
    toast.success(`Attendance for ${currentClassName} on ${selectedDate} saved!`, 'Attendance Recorded');
  };

  // Metrics
  const total = classStudents.length;
  const presentCount = Object.values(recordsMap).filter(st => st === 'Present').length;
  const absentCount = Object.values(recordsMap).filter(st => st === 'Absent').length;
  const lateCount = Object.values(recordsMap).filter(st => st === 'Late').length;
  const attendanceRate = total > 0 ? Math.round(((presentCount + lateCount * 0.5) / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Attendance Tracking
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Record daily student attendance, monitor absentees, and generate reports
          </p>
        </div>
        <Button onClick={handleSaveAttendance} icon={Save}>
          Save Attendance Sheet
        </Button>
      </div>

      {/* Control Bar: Class, Date, and Quick Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Class:</span>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name} - Section {c.section}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="py-1.5 px-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Quick Bulk Marking */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">Bulk:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleMarkAll('Present')}
            className="text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800"
          >
            All Present
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleMarkAll('Absent')}
            className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-rose-200 dark:border-rose-800"
          >
            All Absent
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{total}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200/60 dark:border-emerald-900/40 shadow-sm bg-emerald-50/20">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Present</span>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{presentCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/60 dark:border-rose-900/40 shadow-sm bg-rose-50/20">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Absent</span>
          <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{absentCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200/60 dark:border-indigo-900/40 shadow-sm bg-indigo-50/20">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Attendance Rate</span>
          <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{attendanceRate}%</p>
        </div>
      </div>

      {/* Student List Sheet */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Daily Attendance Sheet: {currentClassName} ({selectedDate})
          </h3>
          <span className="text-xs text-slate-400">
            {classStudents.length} Students listed
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {classStudents.length > 0 ? (
            classStudents.map((student) => {
              const currentStatus = recordsMap[student.id] || 'Present';
              return (
                <div
                  key={student.id}
                  className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {student.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono">
                        Roll No: {student.rollNo} • {student.gender}
                      </p>
                    </div>
                  </div>

                  {/* Attendance status toggles */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'Present')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        currentStatus === 'Present'
                          ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Present
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'Absent')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        currentStatus === 'Absent'
                          ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Absent
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'Late')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        currentStatus === 'Late'
                          ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      Late
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'Excused')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        currentStatus === 'Excused'
                          ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      Excused
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-400">
              No students enrolled in this class yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
