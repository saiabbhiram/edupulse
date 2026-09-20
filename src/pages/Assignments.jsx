import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import FormField from '../components/common/FormField';
import { useToast } from '../context/ToastContext';
import { assignmentService, subjectService, classService, teacherService } from '../services/storageService';
import { Edit2, Trash2, Calendar, BookMarked, CheckCircle2, Clock } from 'lucide-react';

const Assignments = () => {
  const toast = useToast();
  const [assignments, setAssignments] = useState(() => assignmentService.getAll());
  const subjects = subjectService.getAll();
  const classes = classService.getAll();
  const teachers = teacherService.getAll();

  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const initialForm = {
    title: '',
    subject: subjects[0]?.name || 'Mathematics',
    className: classes[0] ? `${classes[0].name}-${classes[0].section}` : 'Grade 10-A',
    teacherName: teachers[0]?.name || 'Sarah Jenkins',
    dueDate: '2026-09-30',
    maxMarks: 50,
    status: 'Active',
    description: '',
    submittedCount: 0,
    totalStudents: 30
  };
  const [formData, setFormData] = useState(initialForm);

  const refresh = () => setAssignments(assignmentService.getAll());

  const handleOpenAdd = () => {
    setSelectedAssignment(null);
    setFormData(initialForm);
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (asn) => {
    setSelectedAssignment(asn);
    setFormData(asn);
    setIsAddEditOpen(true);
  };

  const handleOpenDelete = (asn) => {
    setSelectedAssignment(asn);
    setIsDeleteOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      maxMarks: Number(formData.maxMarks) || 50,
      submittedCount: Number(formData.submittedCount) || 0,
      totalStudents: Number(formData.totalStudents) || 30,
      id: selectedAssignment ? selectedAssignment.id : `ASN-${Date.now()}`
    };

    assignmentService.save(payload);
    refresh();
    setIsAddEditOpen(false);
    toast.success(selectedAssignment ? 'Assignment updated' : 'Assignment posted');
  };

  const handleConfirmDelete = () => {
    if (selectedAssignment) {
      assignmentService.delete(selectedAssignment.id);
      refresh();
      setIsDeleteOpen(false);
      toast.success(`${selectedAssignment.title} deleted.`);
    }
  };

  const columns = [
    {
      header: 'Assignment Title',
      accessor: 'title',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <BookMarked className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white block">
              {row.title}
            </span>
            <span className="text-[11px] text-slate-400">
              {row.subject} • {row.className}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Assigned By',
      accessor: 'teacherName',
      render: (row) => <span className="text-xs text-slate-700 dark:text-slate-300">{row.teacherName}</span>
    },
    {
      header: 'Due Date',
      accessor: 'dueDate',
      render: (row) => (
        <div className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>{row.dueDate}</span>
        </div>
      )
    },
    {
      header: 'Submissions',
      accessor: 'submittedCount',
      render: (row) => {
        const percent = Math.round(((row.submittedCount || 0) / (row.totalStudents || 1)) * 100);
        return (
          <div className="space-y-1 max-w-[120px]">
            <div className="flex justify-between text-xs font-semibold">
              <span>{row.submittedCount}/{row.totalStudents}</span>
              <span className="text-slate-400">{percent}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      }
    },
    {
      header: 'Max Score',
      accessor: 'maxMarks',
      render: (row) => <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">{row.maxMarks} Pts</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <Badge variant={row.status === 'Active' ? 'Present' : 'default'} dot>{row.status}</Badge>
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
            Assignments & Coursework
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Assign homework tasks, track submission rates, and grade student projects
          </p>
        </div>
        <Button onClick={handleOpenAdd} size="sm">
          + Create Assignment
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={assignments}
        searchPlaceholder="Search assignments by title or subject..."
        onAdd={handleOpenAdd}
        addLabel="Create Assignment"
        exportFilename="assignments-list.csv"
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={selectedAssignment ? 'Edit Assignment' : 'Create New Assignment'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField
            label="Assignment Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Thermodynamics Lab Report"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Subject"
              name="subject"
              type="select"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              options={subjects.map(s => s.name)}
              required
            />
            <FormField
              label="Class"
              name="className"
              type="select"
              value={formData.className}
              onChange={(e) => setFormData({ ...formData, className: e.target.value })}
              options={classes.map(c => `${c.name}-${c.section}`)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              label="Due Date"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
            <FormField
              label="Max Marks"
              name="maxMarks"
              type="number"
              value={formData.maxMarks}
              onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
            />
            <FormField
              label="Status"
              name="status"
              type="select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={['Active', 'Closed', 'Graded']}
            />
          </div>

          <FormField
            label="Description & Instructions"
            name="description"
            type="textarea"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Detailed instructions for the coursework task..."
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>Cancel</Button>
            <Button type="submit">{selectedAssignment ? 'Update' : 'Post Assignment'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Assignment"
        message={`Are you sure you want to delete ${selectedAssignment?.title}?`}
      />
    </div>
  );
};

export default Assignments;
