import React, { useState } from 'react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import FormField from '../components/common/FormField';
import { useToast } from '../context/ToastContext';
import { timetableService, classService, subjectService, teacherService } from '../services/storageService';
import { Calendar, Clock, Plus, Edit2, Printer, MapPin, User } from 'lucide-react';

const Timetable = () => {
  const toast = useToast();
  const classes = classService.getAll();
  const subjects = subjectService.getAll();
  const teachers = teacherService.getAll();

  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || 'CLS-1');
  const selectedClass = classes.find(c => c.id === selectedClassId);
  const currentClassName = selectedClass ? `${selectedClass.name}-${selectedClass.section}` : 'Grade 10-A';

  const timetableData = timetableService.getByClassId(selectedClassId) || {
    classId: selectedClassId,
    className: currentClassName,
    schedule: {
      Monday: [
        { period: 1, time: '08:30 - 09:15', subject: 'Mathematics', teacher: 'Sarah Jenkins', room: 'Room 201' },
        { period: 2, time: '09:20 - 10:05', subject: 'Physics & Chemistry', teacher: 'Dr. Robert Chen', room: 'Lab 1' },
        { period: 3, time: '10:20 - 11:05', subject: 'English Literature', teacher: 'Rachel Adams', room: 'Room 201' },
        { period: 4, time: '11:10 - 11:55', subject: 'World History', teacher: 'Elena Rostova', room: 'Room 201' },
        { period: 5, time: '12:45 - 13:30', subject: 'Computer Science', teacher: 'Marcus Vance', room: 'Comp Lab' },
        { period: 6, time: '13:35 - 14:20', subject: 'Physical Education', teacher: 'Coach Davis', room: 'Gymnasium' }
      ],
      Tuesday: [
        { period: 1, time: '08:30 - 09:15', subject: 'English Literature', teacher: 'Rachel Adams', room: 'Room 201' },
        { period: 2, time: '09:20 - 10:05', subject: 'Mathematics', teacher: 'Sarah Jenkins', room: 'Room 201' },
        { period: 3, time: '10:20 - 11:05', subject: 'Computer Science', teacher: 'Marcus Vance', room: 'Comp Lab' },
        { period: 4, time: '11:10 - 11:55', subject: 'Physics & Chemistry', teacher: 'Dr. Robert Chen', room: 'Lab 1' },
        { period: 5, time: '12:45 - 13:30', subject: 'World History', teacher: 'Elena Rostova', room: 'Room 201' },
        { period: 6, time: '13:35 - 14:20', subject: 'Study Hall', teacher: 'Sarah Jenkins', room: 'Room 201' }
      ],
      Wednesday: [
        { period: 1, time: '08:30 - 09:15', subject: 'Physics & Chemistry', teacher: 'Dr. Robert Chen', room: 'Lab 1' },
        { period: 2, time: '09:20 - 10:05', subject: 'Mathematics', teacher: 'Sarah Jenkins', room: 'Room 201' },
        { period: 3, time: '10:20 - 11:05', subject: 'World History', teacher: 'Elena Rostova', room: 'Room 201' },
        { period: 4, time: '11:10 - 11:55', subject: 'English Literature', teacher: 'Rachel Adams', room: 'Room 201' },
        { period: 5, time: '12:45 - 13:30', subject: 'Fine Arts', teacher: 'Lisa Wong', room: 'Art Studio' },
        { period: 6, time: '13:35 - 14:20', subject: 'Library Period', teacher: 'Mr. Bookman', room: 'Library' }
      ],
      Thursday: [
        { period: 1, time: '08:30 - 09:15', subject: 'Mathematics', teacher: 'Sarah Jenkins', room: 'Room 201' },
        { period: 2, time: '09:20 - 10:05', subject: 'Computer Science', teacher: 'Marcus Vance', room: 'Comp Lab' },
        { period: 3, time: '10:20 - 11:05', subject: 'English Literature', teacher: 'Rachel Adams', room: 'Room 201' },
        { period: 4, time: '11:10 - 11:55', subject: 'Physics & Chemistry', teacher: 'Dr. Robert Chen', room: 'Lab 1' },
        { period: 5, time: '12:45 - 13:30', subject: 'World History', teacher: 'Elena Rostova', room: 'Room 201' },
        { period: 6, time: '13:35 - 14:20', subject: 'Physical Education', teacher: 'Coach Davis', room: 'Field' }
      ],
      Friday: [
        { period: 1, time: '08:30 - 09:15', subject: 'World History', teacher: 'Elena Rostova', room: 'Room 201' },
        { period: 2, time: '09:20 - 10:05', subject: 'English Literature', teacher: 'Rachel Adams', room: 'Room 201' },
        { period: 3, time: '10:20 - 11:05', subject: 'Mathematics', teacher: 'Sarah Jenkins', room: 'Room 201' },
        { period: 4, time: '11:10 - 11:55', subject: 'Physics & Chemistry', teacher: 'Dr. Robert Chen', room: 'Lab 1' },
        { period: 5, time: '12:45 - 13:30', subject: 'Clubs & Societies', teacher: 'All Staff', room: 'Campus' },
        { period: 6, time: '13:35 - 14:20', subject: 'Mentorship', teacher: 'Sarah Jenkins', room: 'Auditorium' }
      ]
    }
  };

  const [activeDay, setActiveDay] = useState('Monday');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Slot edit modal
  const [isEditSlotOpen, setIsEditSlotOpen] = useState(false);
  const [slotForm, setSlotForm] = useState({
    day: 'Monday',
    period: 1,
    time: '08:30 - 09:15',
    subject: subjects[0]?.name || 'Mathematics',
    teacher: teachers[0]?.name || 'Sarah Jenkins',
    room: 'Room 201'
  });

  const handleEditSlot = (day, slot) => {
    setSlotForm({
      day,
      period: slot.period,
      time: slot.time,
      subject: slot.subject,
      teacher: slot.teacher,
      room: slot.room
    });
    setIsEditSlotOpen(true);
  };

  const handleSaveSlot = (e) => {
    e.preventDefault();
    const currentSchedule = { ...timetableData.schedule };
    const daySlots = [...(currentSchedule[slotForm.day] || [])];
    const index = daySlots.findIndex(s => s.period === slotForm.period);

    const newSlot = {
      period: slotForm.period,
      time: slotForm.time,
      subject: slotForm.subject,
      teacher: slotForm.teacher,
      room: slotForm.room
    };

    if (index >= 0) {
      daySlots[index] = newSlot;
    } else {
      daySlots.push(newSlot);
    }
    currentSchedule[slotForm.day] = daySlots;

    timetableService.saveTimetable(selectedClassId, currentClassName, currentSchedule);
    setIsEditSlotOpen(false);
    toast.success(`Period ${slotForm.period} on ${slotForm.day} updated!`, 'Timetable Updated');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Weekly Class Timetable
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            View and manage classroom schedules, periods, instructors, and rooms
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()} icon={Printer}>
            Print Schedule
          </Button>
        </div>
      </div>

      {/* Class Selector & Day Tabs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-500">Selected Class:</span>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="py-1.5 px-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name} - Section {c.section}</option>
            ))}
          </select>
        </div>

        {/* Day of Week Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeDay === day
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Timetable Period Cards for Active Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(timetableData.schedule?.[activeDay] || []).map((slot) => (
          <div
            key={slot.period}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                  Period {slot.period}
                </span>
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {slot.time}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                {slot.subject}
              </h4>

              <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <p className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">{slot.teacher}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{slot.room}</span>
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => handleEditSlot(activeDay, slot)}
                className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 p-1 rounded transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit Slot
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Slot Modal */}
      <Modal
        isOpen={isEditSlotOpen}
        onClose={() => setIsEditSlotOpen(false)}
        title={`Edit Period ${slotForm.period} (${slotForm.day})`}
        size="md"
      >
        <form onSubmit={handleSaveSlot} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Period #"
              name="period"
              type="number"
              value={slotForm.period}
              disabled
            />
            <FormField
              label="Time Slot"
              name="time"
              value={slotForm.time}
              onChange={(e) => setSlotForm({ ...slotForm, time: e.target.value })}
              placeholder="08:30 - 09:15"
              required
            />
          </div>

          <FormField
            label="Subject"
            name="subject"
            type="select"
            value={slotForm.subject}
            onChange={(e) => setSlotForm({ ...slotForm, subject: e.target.value })}
            options={subjects.map(s => s.name)}
            required
          />

          <FormField
            label="Assigned Teacher"
            name="teacher"
            type="select"
            value={slotForm.teacher}
            onChange={(e) => setSlotForm({ ...slotForm, teacher: e.target.value })}
            options={teachers.map(t => t.name)}
            required
          />

          <FormField
            label="Classroom / Lab"
            name="room"
            value={slotForm.room}
            onChange={(e) => setSlotForm({ ...slotForm, room: e.target.value })}
            placeholder="Room 201"
            required
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" onClick={() => setIsEditSlotOpen(false)}>Cancel</Button>
            <Button type="submit">Update Schedule</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Timetable;
