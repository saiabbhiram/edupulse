import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import FormField from '../components/common/FormField';
import { useToast } from '../context/ToastContext';
import { parentService, studentService } from '../services/storageService';
import { Edit2, Trash2, Mail, Phone, UserCheck, Briefcase } from 'lucide-react';

const Parents = () => {
  const toast = useToast();
  const [parents, setParents] = useState(() => parentService.getAll());
  const students = studentService.getAll();

  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);

  const initialForm = {
    name: '',
    email: '',
    phone: '',
    relationship: 'Father',
    occupation: '',
    address: '',
    childrenNamesStr: '',
    status: 'Active'
  };
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const refresh = () => setParents(parentService.getAll());

  const handleOpenAdd = () => {
    setSelectedParent(null);
    setFormData(initialForm);
    setErrors({});
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (par) => {
    setSelectedParent(par);
    setFormData({
      ...par,
      childrenNamesStr: Array.isArray(par.childrenNames) ? par.childrenNames.join(', ') : (par.childrenNames || '')
    });
    setErrors({});
    setIsAddEditOpen(true);
  };

  const handleOpenDelete = (par) => {
    setSelectedParent(par);
    setIsDeleteOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name?.trim()) errs.name = 'Name is required';
    if (!formData.phone?.trim()) errs.phone = 'Phone number is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const payload = {
      ...formData,
      id: selectedParent ? selectedParent.id : `PAR-${Date.now()}`,
      childrenNames: formData.childrenNamesStr.split(',').map(s => s.trim()).filter(Boolean)
    };

    parentService.save(payload);
    refresh();
    setIsAddEditOpen(false);
    toast.success(selectedParent ? 'Parent record updated' : 'Parent registered successfully');
  };

  const handleConfirmDelete = () => {
    if (selectedParent) {
      parentService.delete(selectedParent.id);
      refresh();
      setIsDeleteOpen(false);
      toast.success(`${selectedParent.name} removed from directory.`);
    }
  };

  const columns = [
    {
      header: 'Parent / Guardian',
      accessor: 'name',
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">
            {row.name}
          </span>
          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
            Relationship: {row.relationship}
          </span>
        </div>
      )
    },
    {
      header: 'Linked Student(s)',
      accessor: 'childrenNames',
      sortable: false,
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {(row.childrenNames || []).map((ch, i) => (
            <span key={i} className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium">
              {ch}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Occupation',
      accessor: 'occupation',
      render: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-slate-400" />
          {row.occupation || 'N/A'}
        </span>
      )
    },
    {
      header: 'Contact Info',
      accessor: 'phone',
      render: (row) => (
        <div className="text-xs space-y-0.5">
          <div className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-slate-400" /> {row.phone}
          </div>
          <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
            <Mail className="w-3 h-3" /> {row.email}
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
            Parents & Guardians
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Directory of student guardians, relationships, and emergency contact details
          </p>
        </div>
        <Button onClick={handleOpenAdd} size="sm">
          + Add New Parent
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={parents}
        searchPlaceholder="Search parents by name, child, or contact..."
        onAdd={handleOpenAdd}
        addLabel="Add Parent"
        exportFilename="parents-directory.csv"
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={selectedParent ? 'Edit Parent Record' : 'Register Parent'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Thomas Hayes"
            required
            error={errors.name}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Relationship"
              name="relationship"
              type="select"
              value={formData.relationship}
              onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              options={['Father', 'Mother', 'Guardian', 'Other']}
            />
            <FormField
              label="Occupation"
              name="occupation"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              placeholder="e.g. Software Engineer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 555-0190"
              required
              error={errors.phone}
            />
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="parent@example.com"
            />
          </div>

          <FormField
            label="Linked Children Names (comma separated)"
            name="childrenNamesStr"
            value={formData.childrenNamesStr}
            onChange={(e) => setFormData({ ...formData, childrenNamesStr: e.target.value })}
            placeholder="e.g. Alexander Hayes, Sophia Montgomery"
          />

          <FormField
            label="Residential Address"
            name="address"
            type="textarea"
            rows={2}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Street Address, City"
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>Cancel</Button>
            <Button type="submit">{selectedParent ? 'Update' : 'Save'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Parent Record"
        message={`Are you sure you want to delete the record for ${selectedParent?.name}?`}
      />
    </div>
  );
};

export default Parents;
