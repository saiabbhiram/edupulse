import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import FormField from '../components/common/FormField';
import { useToast } from '../context/ToastContext';
import { libraryService, studentService } from '../services/storageService';
import { Library as LibraryIcon, BookOpen, Edit2, Trash2, ArrowUpRight, RotateCcw } from 'lucide-react';

const Library = () => {
  const toast = useToast();
  const [books, setBooks] = useState(() => libraryService.getAll());
  const students = studentService.getAll();

  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [issueStudentId, setIssueStudentId] = useState(students[0]?.id || 'STU-1001');

  const initialForm = {
    isbn: '978-0141439518',
    title: '',
    author: '',
    category: 'Literature & Fiction',
    totalCopies: 10,
    availableCopies: 10,
    rackNo: 'A-15'
  };
  const [formData, setFormData] = useState(initialForm);

  const refresh = () => setBooks(libraryService.getAll());

  const handleOpenAdd = () => {
    setSelectedBook(null);
    setFormData(initialForm);
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (b) => {
    setSelectedBook(b);
    setFormData(b);
    setIsAddEditOpen(true);
  };

  const handleOpenIssue = (b) => {
    setSelectedBook(b);
    setIssueStudentId(students[0]?.id || 'STU-1001');
    setIsIssueModalOpen(true);
  };

  const handleOpenDelete = (b) => {
    setSelectedBook(b);
    setIsDeleteOpen(true);
  };

  const handleSaveBook = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      totalCopies: Number(formData.totalCopies) || 1,
      availableCopies: Number(formData.availableCopies) || Number(formData.totalCopies) || 1,
      id: selectedBook ? selectedBook.id : `LIB-${Date.now()}`,
      issuedTo: selectedBook ? selectedBook.issuedTo : []
    };

    libraryService.save(payload);
    refresh();
    setIsAddEditOpen(false);
    toast.success(selectedBook ? 'Book details updated' : 'Book added to library catalog');
  };

  const handleConfirmIssue = (e) => {
    e.preventDefault();
    const student = students.find(s => s.id === issueStudentId);
    if (!student) return;

    libraryService.issueBook(selectedBook.id, student.id, student.name, 14);
    refresh();
    setIsIssueModalOpen(false);
    toast.success(`"${selectedBook.title}" issued to ${student.name}`, 'Book Issued');
  };

  const handleReturnBook = (bookId, studentId) => {
    libraryService.returnBook(bookId, studentId);
    refresh();
    toast.success('Book marked as returned & restocked to library rack.', 'Book Returned');
  };

  const handleConfirmDelete = () => {
    if (selectedBook) {
      libraryService.delete(selectedBook.id);
      refresh();
      setIsDeleteOpen(false);
      toast.success(`${selectedBook.title} removed.`);
    }
  };

  const columns = [
    {
      header: 'Book Title & Author',
      accessor: 'title',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white block">
              {row.title}
            </span>
            <span className="text-[11px] text-slate-400">
              by {row.author} • ISBN: {row.isbn}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row) => <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{row.category}</span>
    },
    {
      header: 'Shelf / Rack',
      accessor: 'rackNo',
      render: (row) => <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">{row.rackNo}</span>
    },
    {
      header: 'Copies Status',
      accessor: 'availableCopies',
      render: (row) => (
        <div>
          <span className={`text-xs font-extrabold block ${
            row.availableCopies > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'
          }`}>
            {row.availableCopies} Available
          </span>
          <span className="text-[11px] text-slate-400">
            {row.totalCopies} Total Copies
          </span>
        </div>
      )
    },
    {
      header: 'Issued To',
      accessor: 'issuedTo',
      sortable: false,
      render: (row) => (
        <div className="space-y-1">
          {(row.issuedTo || []).length > 0 ? (
            row.issuedTo.map((iss, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px]">
                <span className="text-slate-700 dark:text-slate-300 font-medium">{iss.studentName}</span>
                <span className="text-slate-400">(Due: {iss.dueDate})</span>
                <button
                  onClick={() => handleReturnBook(row.id, iss.studentId)}
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 font-semibold text-[10px] ml-1"
                  title="Return copy"
                >
                  [Return]
                </button>
              </div>
            ))
          ) : (
            <span className="text-xs text-slate-400">None</span>
          )}
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
          {row.availableCopies > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleOpenIssue(row)}
              className="text-xs px-2.5 py-1 text-indigo-600 border-indigo-200 dark:border-indigo-900/60"
            >
              Issue
            </Button>
          )}
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
            Library Catalog & Circulation
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage books inventory, issue volumes to students, and oversee return schedules
          </p>
        </div>
        <Button onClick={handleOpenAdd} size="sm">
          + Add New Book
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={books}
        searchPlaceholder="Search books by title, author, category, or ISBN..."
        onAdd={handleOpenAdd}
        addLabel="Add Book"
        exportFilename="library-inventory.csv"
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title={selectedBook ? 'Edit Book Details' : 'Add New Book to Catalog'}
        size="md"
      >
        <form onSubmit={handleSaveBook} className="space-y-4">
          <FormField
            label="Book Title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Introduction to Algorithms"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Author"
              name="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="e.g. Thomas H. Cormen"
              required
            />
            <FormField
              label="ISBN"
              name="isbn"
              value={formData.isbn}
              onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              placeholder="978-0262033848"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              label="Category"
              name="category"
              type="select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={['Literature & Fiction', 'Mathematics', 'Natural Science', 'Computer Science', 'Philosophy & Politics', 'General Reference']}
            />
            <FormField
              label="Total Copies"
              name="totalCopies"
              type="number"
              value={formData.totalCopies}
              onChange={(e) => setFormData({ ...formData, totalCopies: e.target.value })}
              required
            />
            <FormField
              label="Shelf Rack #"
              name="rackNo"
              value={formData.rackNo}
              onChange={(e) => setFormData({ ...formData, rackNo: e.target.value })}
              placeholder="CS-01"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>Cancel</Button>
            <Button type="submit">{selectedBook ? 'Update' : 'Add Book'}</Button>
          </div>
        </form>
      </Modal>

      {/* Issue Book Modal */}
      <Modal
        isOpen={isIssueModalOpen}
        onClose={() => setIsIssueModalOpen(false)}
        title="Issue Book to Student"
        subtitle={`"${selectedBook?.title}" by ${selectedBook?.author}`}
        size="md"
      >
        {selectedBook && (
          <form onSubmit={handleConfirmIssue} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs space-y-1">
              <p><span className="text-slate-400">Rack Location:</span> <span className="font-bold text-slate-800 dark:text-slate-200">{selectedBook.rackNo}</span></p>
              <p><span className="text-slate-400">Available Copies:</span> <span className="font-bold text-emerald-600">{selectedBook.availableCopies} left</span></p>
              <p><span className="text-slate-400">Loan Period:</span> <span className="font-bold text-slate-800 dark:text-slate-200">14 Days</span></p>
            </div>

            <FormField
              label="Select Student"
              name="issueStudentId"
              type="select"
              value={issueStudentId}
              onChange={(e) => setIssueStudentId(e.target.value)}
              options={students.map(s => ({ value: s.id, label: `${s.name} (Roll #${s.rollNo} - ${s.className})` }))}
              required
            />

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" onClick={() => setIsIssueModalOpen(false)}>Cancel</Button>
              <Button type="submit">Issue Book</Button>
            </div>
          </form>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Book"
        message={`Are you sure you want to remove "${selectedBook?.title}" from the library catalog?`}
      />
    </div>
  );
};

export default Library;
