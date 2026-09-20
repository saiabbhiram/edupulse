import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import FormField from '../components/common/FormField';
import { useToast } from '../context/ToastContext';
import { teacherService } from '../services/storageService';
import { Edit2, Trash2, Mail, Phone, BookOpen, GraduationCap } from 'lucide-react';

const Teachers = () => {
  const toast = useToast();
  const [teachers, setTeachers] = useState(() => teacherService.getAll());
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const initialForm = {
    name: '',
    empId: '',
    email: '',
    phone: '',
    department: 'Mathematics',
    qualification: '',
    experience: '',
    subjectsStr: '',
    classesStr: '',
    status: 'Active'
  };
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const refresh = () => setTeachers(teacherService.getAll());

  const handleOpenAdd = () => {
    setSelectedTeacher(null);
    setFormData(initialForm);
    setErrors({});
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (tch) => {
    setSelectedTeacher(tch);
    setFormData({
      ...tch,
      subjectsStr: Array.isArray(tch.subjects) ? tch.subjects.join(', ') : '',
      classesStr: Array.isArray(tch.classes) ? tch.classes.join(', ') : ''
    });
    setErrors({});
    setIsAddEditOpen(true);
  };

  const handleOpenDelete = (tch) => {
    setSelectedTeacher(tch);
    setIsDeleteOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name?.trim()) errs.name = 'Teacher name is required';
    if (!formData.empId?.trim()) errs.empId = 'Employee ID is required';
    if (!formData.email?.trim()) errs.email = 'Email is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const payload = {
      ...formData,
      id: selectedTeacher ? selectedTeacher.id : `TCH-${Date.now()}`,
      subjects: formData.subjectsStr.split(',').map(s => s.trim()).filter(Boolean),
      classes: formData.classesStr.split(',').map(c => c.trim()).filter(Boolean),
      avatar: formData.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    };

    teacherService.save(payload);
    refresh();
    setIsAddEditOpen(false);
    toast.success(selectedTeacher ? 'Teacher updated' : 'Teacher registered', 'Success');
  };

  const handleConfirmDelete = () => {
    if (selectedTeacher) {
      teacherService.delete(selectedTeacher.id);
      refresh();
      setIsDeleteOpen(false);
      toast.success(`${selectedTeacher.name} removed`, 'Teacher Deleted');
    }
  };

  const columns = [
    {
      header: 'Faculty Member',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
            alt={row.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
          />
          <div>
            <span className="font-bold text-slate-900 dark:text-white block">
              {row.name}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              ID: {row.empId}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Department',
      accessor: 'department',
      render: (row) => (
        <span className="font-medium text-slate-700 dark:text-slate-300">
          {row.department}
        </span>
      )
    },
    {
      header: 'Qualification & Exp.',
      accessor: 'qualification',
      render: (row) => (
        <div>
          <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
            {row.qualification}
          </span>
          <span className="text-[11px] text-slate-400">
            Exp: {row.experience || '5+ Years'}
          </span>
        </div>
      )
    },
    {
      header: 'Assigned Subjects',
      accessor: 'subjects',
      sortable: false,
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {(row.subjects || []).map((sub, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
              {sub}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Contact',
      accessor: 'email',
      render: (row) => (
        <div className="text-xs space-y-0.5">
          <div className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-slate-400" /> {row.email}
          </div>
          <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
            <Phone className="w-3 h-3" /> {row.phone}
          </div>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <Badge variant={row.status} dot>{row.status}</Badge>
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
            title="Edit Teacher"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenDelete(row)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Delete Teacher"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const filterOptions = [
    {
      key: 'department',
      label: 'Department',
      options: [
        { value: 'Mathematics', label: 'Mathematics' },
        { value: 'Sciences', label: 'Sciences' },
        { value: 'Humanities', label: 'Humanities' },
        { value: 'Technology', label: 'Technology' },
        { value: 'Social Studies & Commerce', label: 'Commerce' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'On Leave', label: 'On Leave' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Teachers & Faculty
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage instructors, credentials, assigned subjects, and contact information
          </p>
        </div>
        <Button onClick={handleOpenAdd} size="sm">
          + Add New Teacher
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={teachers}
        searchPlaceholder="Search teachers by name, ID, or subject..."
        filterOptions={filterOptions}
        onAdd={handleOpenAdd}
        addLabel="Add Teacher"
        exportFilename="teachers-directory.csv"
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={selectedTeacher ? 'Edit Teacher' : 'Register New Teacher'}
        subtitle="Specify credentials, department, and teaching assignments"
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Dr. Robert Chen"
              required
              error={errors.name}
            />
            <FormField
              label="Employee ID"
              name="empId"
              value={formData.empId}
              onChange={(e) => setFormData({ ...formData, empId: e.target.value })}
              placeholder="EMP-106"
              required
              error={errors.empId}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="faculty@school.edu"
              required
              error={errors.email}
            />
            <FormField
              label="Contact Phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 555-0308"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Department"
              name="department"
              type="select"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              options={['Mathematics', 'Sciences', 'Humanities', 'Technology', 'Social Studies & Commerce', 'Physical Education', 'Arts']}
            />
            <FormField
              label="Status"
              name="status"
              type="select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={['Active', 'On Leave', 'Inactive']}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              placeholder="e.g. M.Sc Mathematics, B.Ed"
            />
            <FormField
              label="Experience"
              name="experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="e.g. 7 Years"
            />
          </div>

          <FormField
            label="Subjects (comma separated)"
            name="subjectsStr"
            value={formData.subjectsStr}
            onChange={(e) => setFormData({ ...formData, subjectsStr: e.target.value })}
            placeholder="Mathematics, Calculus, Statistics"
            helpText="Enter multiple subjects separated by comma"
          />

          <FormField
            label="Assigned Classes (comma separated)"
            name="classesStr"
            value={formData.classesStr}
            onChange={(e) => setFormData({ ...formData, classesStr: e.target.value })}
            placeholder="Grade 10-A, Grade 12-Science"
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>Cancel</Button>
            <Button type="submit">{selectedTeacher ? 'Update Teacher' : 'Save Teacher'}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Teacher"
        message={`Are you sure you want to remove ${selectedTeacher?.name}? This will unassign their active classes.`}
      />
    </div>
  );
};

export default Teachers;
