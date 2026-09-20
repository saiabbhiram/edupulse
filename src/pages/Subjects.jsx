import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import FormField from '../components/common/FormField';
import { useToast } from '../context/ToastContext';
import { subjectService, classService, teacherService } from '../services/storageService';
import { Edit2, Trash2, BookOpen } from 'lucide-react';

const Subjects = () => {
  const toast = useToast();
  const [subjects, setSubjects] = useState(() => subjectService.getAll());
  const classes = classService.getAll();
  const teachers = teacherService.getAll();

  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const initialForm = {
    code: 'MTH-102',
    name: 'Advanced Mathematics',
    classId: classes[0]?.id || 'CLS-1',
    className: classes[0] ? `${classes[0].name}-${classes[0].section}` : 'Grade 10-A',
    teacherName: teachers[0]?.name || 'Sarah Jenkins',
    credits: 4,
    type: 'Core'
  };
  const [formData, setFormData] = useState(initialForm);

  const refresh = () => setSubjects(subjectService.getAll());

  const handleOpenAdd = () => {
    setSelectedSubject(null);
    setFormData(initialForm);
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (sub) => {
    setSelectedSubject(sub);
    setFormData(sub);
    setIsAddEditOpen(true);
  };

  const handleOpenDelete = (sub) => {
    setSelectedSubject(sub);
    setIsDeleteOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const selClass = classes.find(c => c.id === formData.classId);
    const className = selClass ? `${selClass.name}-${selClass.section}` : formData.className;

    const payload = {
      ...formData,
      className,
      credits: Number(formData.credits) || 3,
      id: selectedSubject ? selectedSubject.id : `SUB-${Date.now()}`
    };

    subjectService.save(payload);
    refresh();
    setIsAddEditOpen(false);
    toast.success(selectedSubject ? 'Subject updated' : 'Subject added successfully');
  };

  const handleConfirmDelete = () => {
    if (selectedSubject) {
      subjectService.delete(selectedSubject.id);
      refresh();
      setIsDeleteOpen(false);
      toast.success(`${selectedSubject.name} removed.`);
    }
  };

  const columns = [
    {
      header: 'Subject Code & Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white block">
              {row.name}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Code: {row.code}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Assigned Class',
      accessor: 'className',
      render: (row) => (
        <span className="font-medium text-slate-800 dark:text-slate-200">
          {row.className}
        </span>
      )
    },
    {
      header: 'Assigned Instructor',
      accessor: 'teacherName',
      render: (row) => (
        <span className="text-slate-700 dark:text-slate-300">
          {row.teacherName}
        </span>
      )
    },
    {
      header: 'Credits',
      accessor: 'credits',
      render: (row) => (
        <span className="font-bold text-slate-900 dark:text-white text-xs">
          {row.credits} Credits / Wk
        </span>
      )
    },
    {
      header: 'Type',
      accessor: 'type',
      render: (row) => <Badge variant={row.type}>{row.type}</Badge>
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
            Subjects & Curriculum
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage academic curriculum courses, credit hours, and instructor assignments
          </p>
        </div>
        <Button onClick={handleOpenAdd} size="sm">
          + Add New Subject
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={subjects}
        searchPlaceholder="Search subjects by name, code or instructor..."
        onAdd={handleOpenAdd}
        addLabel="Add Subject"
        exportFilename="curriculum-subjects.csv"
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={selectedSubject ? 'Edit Subject' : 'Add New Subject'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Subject Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. World History"
              required
            />
            <FormField
              label="Subject Code"
              name="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g. HIS-101"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Target Class"
              name="classId"
              type="select"
              value={formData.classId}
              onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
              options={classes.map(c => ({ value: c.id, label: `${c.name} - ${c.section}` }))}
              required
            />
            <FormField
              label="Assigned Instructor"
              name="teacherName"
              type="select"
              value={formData.teacherName}
              onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
              options={teachers.map(t => t.name)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Credit Hours / Week"
              name="credits"
              type="number"
              value={formData.credits}
              onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
            />
            <FormField
              label="Subject Type"
              name="type"
              type="select"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              options={['Core', 'Elective', 'Vocational', 'Extracurricular']}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>Cancel</Button>
            <Button type="submit">{selectedSubject ? 'Update' : 'Save'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Subject"
        message={`Are you sure you want to delete ${selectedSubject?.name}?`}
      />
    </div>
  );
};

export default Subjects;
