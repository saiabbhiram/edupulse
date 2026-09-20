import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import FormField from '../components/common/FormField';
import { useToast } from '../context/ToastContext';
import { examService } from '../services/storageService';
import { Edit2, Trash2, Calendar, FileText } from 'lucide-react';

const Exams = () => {
  const toast = useToast();
  const [exams, setExams] = useState(() => examService.getAll());
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const initialForm = {
    title: '',
    term: 'Fall Term',
    startDate: '2026-10-15',
    endDate: '2026-10-24',
    classesStr: 'Grade 10-A, Grade 10-B',
    status: 'Upcoming',
    description: ''
  };
  const [formData, setFormData] = useState(initialForm);

  const refresh = () => setExams(examService.getAll());

  const handleOpenAdd = () => {
    setSelectedExam(null);
    setFormData(initialForm);
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (exam) => {
    setSelectedExam(exam);
    setFormData({
      ...exam,
      classesStr: Array.isArray(exam.classes) ? exam.classes.join(', ') : exam.classes
    });
    setIsAddEditOpen(true);
  };

  const handleOpenDelete = (exam) => {
    setSelectedExam(exam);
    setIsDeleteOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      classes: formData.classesStr.split(',').map(c => c.trim()).filter(Boolean),
      id: selectedExam ? selectedExam.id : `EXM-${Date.now()}`
    };

    examService.save(payload);
    refresh();
    setIsAddEditOpen(false);
    toast.success(selectedExam ? 'Exam updated' : 'Exam schedule created');
  };

  const handleConfirmDelete = () => {
    if (selectedExam) {
      examService.delete(selectedExam.id);
      refresh();
      setIsDeleteOpen(false);
      toast.success(`${selectedExam.title} deleted.`);
    }
  };

  const columns = [
    {
      header: 'Exam Title & Details',
      accessor: 'title',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white block">
              {row.title}
            </span>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
              {row.term}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Date Window',
      accessor: 'startDate',
      render: (row) => (
        <div className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{row.startDate} &rarr; {row.endDate}</span>
        </div>
      )
    },
    {
      header: 'Participating Classes',
      accessor: 'classes',
      sortable: false,
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-[220px]">
          {(row.classes || []).map((c, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {c}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <Badge variant={row.status}>{row.status}</Badge>
    },
    {
      header: 'Actions',
      accessor: 'id',
      sortable: false,
      hideFromExport: true,
      className: 'text-right',
      cellClassName: 'text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenDelete(row)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Examinations & Assessments
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Organize academic term schedules, test sessions, and evaluation milestones
          </p>
        </div>
        <Button onClick={handleOpenAdd} size="sm">
          + Schedule Exam
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={exams}
        searchPlaceholder="Search exams by title, term or status..."
        onAdd={handleOpenAdd}
        addLabel="Schedule Exam"
        exportFilename="exam-schedules.csv"
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={selectedExam ? 'Edit Exam Schedule' : 'Schedule New Examination'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField
            label="Exam Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Midterm Examinations 2026"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Academic Term"
              name="term"
              type="select"
              value={formData.term}
              onChange={(e) => setFormData({ ...formData, term: e.target.value })}
              options={['Fall Term', 'Spring Term', 'Summer Term', 'Annual Finals']}
            />
            <FormField
              label="Status"
              name="status"
              type="select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={['Upcoming', 'Ongoing', 'Completed', 'Draft']}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
            <FormField
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>

          <FormField
            label="Participating Classes (comma separated)"
            name="classesStr"
            value={formData.classesStr}
            onChange={(e) => setFormData({ ...formData, classesStr: e.target.value })}
            placeholder="Grade 10-A, Grade 10-B, Grade 11-Science"
          />

          <FormField
            label="Description & Instructions"
            name="description"
            type="textarea"
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Key exam regulations and coverage notes"
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>Cancel</Button>
            <Button type="submit">{selectedExam ? 'Update' : 'Schedule'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Cancel Exam Schedule"
        message={`Are you sure you want to delete ${selectedExam?.title}?`}
      />
    </div>
  );
};

export default Exams;
