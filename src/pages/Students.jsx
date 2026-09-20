import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import FormField from '../components/common/FormField';
import { useToast } from '../context/ToastContext';
import { studentService, classService } from '../services/storageService';
import { Eye, Edit2, Trash2, Mail, Phone, MapPin, Calendar, UserCheck } from 'lucide-react';

const Students = () => {
  const toast = useToast();
  const [students, setStudents] = useState(() => studentService.getAll());
  const classes = classService.getAll();

  // Modals state
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    rollNo: '',
    email: '',
    classId: classes[0]?.id || 'CLS-1',
    className: classes[0] ? `${classes[0].name}-${classes[0].section}` : 'Grade 10-A',
    gender: 'Male',
    dob: '2010-01-01',
    phone: '',
    parentName: '',
    parentPhone: '',
    address: '',
    status: 'Active',
    bloodGroup: 'O+'
  };
  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});

  const refreshList = () => {
    setStudents(studentService.getAll());
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setSelectedStudent(null);
    setFormData(initialForm);
    setFormErrors({});
    setIsAddEditOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (student) => {
    setSelectedStudent(student);
    setFormData(student);
    setFormErrors({});
    setIsAddEditOpen(true);
  };

  // Open View Modal
  const handleOpenView = (student) => {
    setSelectedStudent(student);
    setIsViewOpen(true);
  };

  // Open Delete Dialog
  const handleOpenDelete = (student) => {
    setSelectedStudent(student);
    setIsDeleteOpen(true);
  };

  // Form Validation & Save
  const handleSaveStudent = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name?.trim()) errors.name = 'Full name is required';
    if (!formData.rollNo?.trim()) errors.rollNo = 'Roll number is required';
    if (!formData.email?.trim()) errors.email = 'Email address is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Find class name from selected classId
    const selectedClass = classes.find(c => c.id === formData.classId);
    const className = selectedClass ? `${selectedClass.name}-${selectedClass.section}` : formData.className;

    const studentPayload = {
      ...formData,
      className,
      id: selectedStudent ? selectedStudent.id : `STU-${Date.now()}`,
      avatar: formData.avatar || `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80`
    };

    studentService.save(studentPayload);
    refreshList();
    setIsAddEditOpen(false);
    toast.success(
      selectedStudent ? 'Student updated successfully' : 'New student registered successfully',
      'Student Saved'
    );
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (selectedStudent) {
      studentService.delete(selectedStudent.id);
      refreshList();
      setIsDeleteOpen(false);
      toast.success(`${selectedStudent.name} has been removed from records.`, 'Student Deleted');
    }
  };

  // Columns definition
  const columns = [
    {
      header: 'Student',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={row.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
          />
          <div>
            <span className="font-bold text-slate-900 dark:text-white block hover:text-indigo-600 transition-colors">
              {row.name}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Roll No: {row.rollNo}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Class / Grade',
      accessor: 'className',
      render: (row) => (
        <span className="font-medium text-slate-700 dark:text-slate-200">
          {row.className}
        </span>
      )
    },
    {
      header: 'Gender',
      accessor: 'gender',
    },
    {
      header: 'Parent / Contact',
      accessor: 'parentName',
      render: (row) => (
        <div>
          <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
            {row.parentName || 'N/A'}
          </span>
          <span className="text-[11px] text-slate-400">
            {row.parentPhone || row.phone}
          </span>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <Badge variant={row.status} dot>
          {row.status}
        </Badge>
      )
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
            onClick={() => handleOpenView(row)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
            title="View Profile"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenEdit(row)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
            title="Edit Student"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenDelete(row)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Delete Student"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  // Filter options
  const filterOptions = [
    {
      key: 'className',
      label: 'Classes',
      options: classes.map(c => ({ value: `${c.name}-${c.section}`, label: `${c.name}-${c.section}` }))
    },
    {
      key: 'gender',
      label: 'Gender',
      options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'Suspended', label: 'Suspended' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Student Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage student registrations, enrollments, profiles and records
          </p>
        </div>
        <Button onClick={handleOpenAdd} size="sm">
          + Add New Student
        </Button>
      </div>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={students}
        searchPlaceholder="Search by name, roll no, parent or email..."
        filterOptions={filterOptions}
        onAdd={handleOpenAdd}
        addLabel="Add Student"
        exportFilename="students-directory.csv"
        emptyMessage="No students match the selected filter criteria"
      />

      {/* Add / Edit Student Modal */}
      <Modal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={selectedStudent ? 'Edit Student Information' : 'Register New Student'}
        subtitle="Fill in student academic and personal contact credentials"
        size="lg"
      >
        <form onSubmit={handleSaveStudent} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Liam Zhang"
              required
              error={formErrors.name}
            />
            <FormField
              label="Roll Number"
              name="rollNo"
              value={formData.rollNo}
              onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
              placeholder="e.g. 1009"
              required
              error={formErrors.rollNo}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="student@school.edu"
              required
              error={formErrors.email}
            />
            <FormField
              label="Assigned Class"
              name="classId"
              type="select"
              value={formData.classId}
              onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
              options={classes.map(c => ({ value: c.id, label: `${c.name} - ${c.section}` }))}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              label="Gender"
              name="gender"
              type="select"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              options={['Male', 'Female', 'Other']}
            />
            <FormField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
            <FormField
              label="Blood Group"
              name="bloodGroup"
              type="select"
              value={formData.bloodGroup}
              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Parent / Guardian Name"
              name="parentName"
              value={formData.parentName}
              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
              placeholder="e.g. Wei Zhang"
            />
            <FormField
              label="Parent Contact Phone"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
              placeholder="+1 555-0195"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Student Phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 555-0194"
            />
            <FormField
              label="Enrollment Status"
              name="status"
              type="select"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={['Active', 'Inactive', 'Suspended']}
            />
          </div>

          <FormField
            label="Residential Address"
            name="address"
            type="textarea"
            rows={2}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Street address, City, Postal Code"
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              onClick={() => setIsAddEditOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {selectedStudent ? 'Update Student' : 'Save Student'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Student Profile Modal */}
      <Modal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Student Profile"
        subtitle="Detailed enrollment and emergency information"
        size="md"
      >
        {selectedStudent && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-white dark:ring-slate-700 shadow-md"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedStudent.name}
                  </h3>
                  <Badge variant={selectedStudent.status} dot>
                    {selectedStudent.status}
                  </Badge>
                </div>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                  {selectedStudent.className} • Roll #{selectedStudent.rollNo}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Enrolled since: {selectedStudent.admissionDate || '2022-09-01'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30">
                <span className="text-slate-400 font-medium block">Gender</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedStudent.gender}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30">
                <span className="text-slate-400 font-medium block">Date of Birth</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedStudent.dob}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30">
                <span className="text-slate-400 font-medium block">Blood Group</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedStudent.bloodGroup || 'O+'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30">
                <span className="text-slate-400 font-medium block">Class Room</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Room 201</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Contact & Parent Information
              </h4>
              <div className="space-y-1.5 text-xs">
                <p className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {selectedStudent.email}
                </p>
                <p className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {selectedStudent.phone || selectedStudent.parentPhone}
                </p>
                <p className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" /> Guardian: {selectedStudent.parentName} ({selectedStudent.parentPhone})
                </p>
                <p className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {selectedStudent.address}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsViewOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Student Record"
        message={`Are you sure you want to remove ${selectedStudent?.name} (Roll #${selectedStudent?.rollNo})? This action cannot be reversed.`}
        confirmText="Yes, Delete"
      />
    </div>
  );
};

export default Students;
