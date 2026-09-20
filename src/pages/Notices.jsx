import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import FormField from '../components/common/FormField';
import { useToast } from '../context/ToastContext';
import { noticeService } from '../services/storageService';
import { Bell, Pin, Edit2, Trash2, Calendar, User } from 'lucide-react';

const Notices = () => {
  const toast = useToast();
  const [notices, setNotices] = useState(() => noticeService.getAll());
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const initialForm = {
    title: '',
    content: '',
    target: 'All',
    category: 'Academic',
    date: new Date().toISOString().split('T')[0],
    pinned: false,
    author: 'Principal Dr. Evelyn Brooks'
  };
  const [formData, setFormData] = useState(initialForm);

  const refresh = () => setNotices(noticeService.getAll());

  const handleOpenAdd = () => {
    setSelectedNotice(null);
    setFormData(initialForm);
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (n) => {
    setSelectedNotice(n);
    setFormData(n);
    setIsAddEditOpen(true);
  };

  const handleOpenDelete = (n) => {
    setSelectedNotice(n);
    setIsDeleteOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      id: selectedNotice ? selectedNotice.id : `NOT-${Date.now()}`
    };

    noticeService.save(payload);
    refresh();
    setIsAddEditOpen(false);
    toast.success(selectedNotice ? 'Notice updated' : 'Notice broadcasted successfully');
  };

  const handleConfirmDelete = () => {
    if (selectedNotice) {
      noticeService.delete(selectedNotice.id);
      refresh();
      setIsDeleteOpen(false);
      toast.success(`${selectedNotice.title} removed.`);
    }
  };

  const columns = [
    {
      header: 'Announcement',
      accessor: 'title',
      render: (row) => (
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mt-0.5">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition-colors">
                {row.title}
              </span>
              {row.pinned && (
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md">
                  <Pin className="w-2.5 h-2.5" /> Pinned
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
              {row.content}
            </p>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row) => <Badge variant={row.category}>{row.category}</Badge>
    },
    {
      header: 'Target Audience',
      accessor: 'target',
      render: (row) => (
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {row.target}
        </span>
      )
    },
    {
      header: 'Date & Author',
      accessor: 'date',
      render: (row) => (
        <div className="text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
          <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
            <Calendar className="w-3 h-3 text-slate-400" /> {row.date}
          </div>
          <div className="text-[11px] text-slate-400 truncate max-w-[150px]">
            By: {row.author}
          </div>
        </div>
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

  const filterOptions = [
    {
      key: 'category',
      label: 'Category',
      options: [
        { value: 'Academic', label: 'Academic' },
        { value: 'Event', label: 'Event' },
        { value: 'Urgent', label: 'Urgent' },
        { value: 'Holiday', label: 'Holiday' }
      ]
    },
    {
      key: 'target',
      label: 'Audience',
      options: [
        { value: 'All', label: 'All' },
        { value: 'Teachers', label: 'Teachers' },
        { value: 'Students', label: 'Students' },
        { value: 'Parents', label: 'Parents' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            School Notices & Bulletin Board
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Broadcast institutional circulars, academic notices, and holiday bulletins
          </p>
        </div>
        <Button onClick={handleOpenAdd} size="sm">
          + Create Notice
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={notices}
        searchPlaceholder="Search notices by title, content, or author..."
        filterOptions={filterOptions}
        onAdd={handleOpenAdd}
        addLabel="Create Notice"
        exportFilename="school-notices.csv"
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={selectedNotice ? 'Edit Notice' : 'Broadcast New Notice'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField
            label="Notice Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Science Fair Registration Open"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Target Audience"
              name="target"
              type="select"
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              options={['All', 'Teachers', 'Students', 'Parents']}
            />
            <FormField
              label="Category"
              name="category"
              type="select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={['Academic', 'Event', 'Urgent', 'Holiday', 'Administrative']}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Publish Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
            <FormField
              label="Author / Authority"
              name="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Principal Dr. Evelyn Brooks"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="pinned"
              checked={formData.pinned}
              onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <label htmlFor="pinned" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              Pin to Top of Dashboard Bulletin
            </label>
          </div>

          <FormField
            label="Notice Content"
            name="content"
            type="textarea"
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Enter full notice announcement details..."
            required
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>Cancel</Button>
            <Button type="submit">{selectedNotice ? 'Update' : 'Broadcast'}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Notice"
        message={`Are you sure you want to delete "${selectedNotice?.title}"?`}
      />
    </div>
  );
};

export default Notices;
