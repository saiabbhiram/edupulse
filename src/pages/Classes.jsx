import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import FormField from '../components/common/FormField';
import { useToast } from '../context/ToastContext';
import { classService, teacherService } from '../services/storageService';
import { Edit2, Trash2, Users, Building, GraduationCap } from 'lucide-react';

const Classes = () => {
  const toast = useToast();
  const [classes, setClasses] = useState(() => classService.getAll());
  const teachers = teacherService.getAll();

  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const initialForm = {
    name: 'Grade 10',
    section: 'A',
    classTeacher: teachers[0]?.name || 'Sarah Jenkins',
    room: 'Room 201',
    capacity: 35,
    studentCount: 28
  };
  const [formData, setFormData] = useState(initialForm);

  const refresh = () => setClasses(classService.getAll());

  const handleOpenAdd = () => {
    setSelectedClass(null);
    setFormData(initialForm);
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (cls) => {
    setSelectedClass(cls);
    setFormData(cls);
    setIsAddEditOpen(true);
  };

  const handleOpenDelete = (cls) => {
    setSelectedClass(cls);
    setIsDeleteOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      capacity: Number(formData.capacity) || 30,
      studentCount: Number(formData.studentCount) || 0,
      id: selectedClass ? selectedClass.id : `CLS-${Date.now()}`
    };

    classService.save(payload);
    refresh();
    setIsAddEditOpen(false);
    toast.success(selectedClass ? 'Class updated' : 'Class created successfully');
  };

  const handleConfirmDelete = () => {
    if (selectedClass) {
      classService.delete(selectedClass.id);
      refresh();
      setIsDeleteOpen(false);
      toast.success(`${selectedClass.name}-${selectedClass.section} deleted.`);
    }
  };

  const columns = [
    {
      header: 'Class / Section',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
            {row.section}
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white block">
              {row.name} - Section {row.section}
            </span>
            <span className="text-[11px] text-slate-400">
              ID: {row.id}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Class Teacher',
      accessor: 'classTeacher',
      render: (row) => (
        <span className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-indigo-500" />
          {row.classTeacher}
        </span>
      )
    },
    {
      header: 'Room',
      accessor: 'room',
      render: (row) => (
        <span className="text-slate-600 dark:text-slate-300 font-mono text-xs">
          {row.room}
        </span>
      )
    },
    {
      header: 'Enrolled / Capacity',
      accessor: 'studentCount',
      render: (row) => {
        const percent = Math.round(((row.studentCount || 0) / (row.capacity || 1)) * 100);
        return (
          <div className="space-y-1 max-w-[140px]">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-800 dark:text-slate-200">{row.studentCount} students</span>
              <span className="text-slate-400">/ {row.capacity}</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${percent > 90 ? 'bg-rose-500' : 'bg-indigo-600'}`}
                style={{ width: `${Math.min(100, percent)}%` }}
              />
            </div>
          </div>
        );
      }
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
            Classes & Sections
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage academic grade divisions, assigned faculty advisors, and seating capacities
          </p>
        </div>
        <Button onClick={handleOpenAdd} size="sm">
          + Create Class
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={classes}
        searchPlaceholder="Search classes by grade, section or teacher..."
        onAdd={handleOpenAdd}
        addLabel="Create Class"
        exportFilename="classes-list.csv"
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={selectedClass ? 'Edit Class' : 'Create New Class'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Grade / Class Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Grade 10"
              required
            />
            <FormField
              label="Section"
              name="section"
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              placeholder="e.g. A, B, or Science"
              required
            />
          </div>

          <FormField
            label="Class Teacher / Advisor"
            name="classTeacher"
            type="select"
            value={formData.classTeacher}
            onChange={(e) => setFormData({ ...formData, classTeacher: e.target.value })}
            options={teachers.map(t => t.name)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              label="Room / Hall"
              name="room"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              placeholder="Room 201"
            />
            <FormField
              label="Seating Capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            />
            <FormField
              label="Enrolled Students"
              name="studentCount"
              type="number"
              value={formData.studentCount}
              onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>Cancel</Button>
            <Button type="submit">{selectedClass ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Class"
        message={`Are you sure you want to delete ${selectedClass?.name}-${selectedClass?.section}?`}
      />
    </div>
  );
};

export default Classes;
