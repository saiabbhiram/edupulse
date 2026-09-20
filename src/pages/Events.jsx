import React, { useState } from 'react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import FormField from '../components/common/FormField';
import { useToast } from '../context/ToastContext';
import { eventService } from '../services/storageService';
import { Calendar as CalendarIcon, Clock, MapPin, User, Edit2, Trash2, Plus } from 'lucide-react';

const Events = () => {
  const toast = useToast();
  const [events, setEvents] = useState(() => eventService.getAll());
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const initialForm = {
    title: '',
    description: '',
    category: 'Academic',
    date: '2026-10-15',
    time: '10:00 AM - 02:00 PM',
    location: 'Main Auditorium',
    organizer: 'Faculty Committee'
  };
  const [formData, setFormData] = useState(initialForm);

  const refresh = () => setEvents(eventService.getAll());

  const handleOpenAdd = () => {
    setSelectedEvent(null);
    setFormData(initialForm);
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (evt) => {
    setSelectedEvent(evt);
    setFormData(evt);
    setIsAddEditOpen(true);
  };

  const handleOpenDelete = (evt) => {
    setSelectedEvent(evt);
    setIsDeleteOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      id: selectedEvent ? selectedEvent.id : `EVT-${Date.now()}`
    };

    eventService.save(payload);
    refresh();
    setIsAddEditOpen(false);
    toast.success(selectedEvent ? 'Event updated' : 'Event scheduled');
  };

  const handleConfirmDelete = () => {
    if (selectedEvent) {
      eventService.delete(selectedEvent.id);
      refresh();
      setIsDeleteOpen(false);
      toast.success(`${selectedEvent.title} cancelled.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Campus Calendar & Events
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Schedule inter-school tournaments, academic exhibitions, ceremonies and meetings
          </p>
        </div>
        <Button onClick={handleOpenAdd} size="sm" icon={Plus}>
          Add Event
        </Button>
      </div>

      {/* Grid of Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {events.map((evt) => {
          const dateObj = new Date(evt.date);
          const monthStr = dateObj.toLocaleString('default', { month: 'short' });
          const dayNum = dateObj.getDate();

          return (
            <div
              key={evt.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex flex-col items-center justify-center flex-shrink-0 shadow-md shadow-indigo-600/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider">{monthStr}</span>
                    <span className="text-xl font-black leading-none mt-0.5">{dayNum}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <Badge variant={evt.category} size="xs">
                        {evt.category}
                      </Badge>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenEdit(evt)}
                          className="p-1 rounded text-slate-400 hover:text-emerald-600 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(evt)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {evt.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  {evt.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {evt.location}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <User className="w-3.5 h-3.5" />
                  {evt.organizer}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={selectedEvent ? 'Edit Event' : 'Schedule New Event'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField
            label="Event Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Annual Sports Day Championship"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Event Category"
              name="category"
              type="select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={['Sports', 'Cultural', 'Academic', 'Meeting', 'Holiday']}
            />
            <FormField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Time Range"
              name="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              placeholder="09:00 AM - 03:00 PM"
              required
            />
            <FormField
              label="Location / Venue"
              name="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Main Sports Complex"
              required
            />
          </div>

          <FormField
            label="Organizer / Host Committee"
            name="organizer"
            value={formData.organizer}
            onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
            placeholder="Athletics Department"
          />

          <FormField
            label="Description"
            name="description"
            type="textarea"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Key activities and participation guidelines"
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>Cancel</Button>
            <Button type="submit">{selectedEvent ? 'Update Event' : 'Schedule Event'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Cancel Event"
        message={`Are you sure you want to cancel "${selectedEvent?.title}"?`}
      />
    </div>
  );
};

export default Events;
