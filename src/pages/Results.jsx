import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import FormField from '../components/common/FormField';
import { useToast } from '../context/ToastContext';
import { resultService, examService, studentService, settingService } from '../services/storageService';
import { Award, Printer, Edit2, Trash2, Eye, School } from 'lucide-react';

const Results = () => {
  const toast = useToast();
  const [results, setResults] = useState(() => resultService.getAll());
  const exams = examService.getAll();
  const students = studentService.getAll();
  const settings = settingService.get();

  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const initialForm = {
    examId: exams[0]?.id || 'EXM-101',
    examTitle: exams[0]?.title || 'Midterm Examinations',
    studentId: students[0]?.id || 'STU-1001',
    math: 90,
    physics: 85,
    english: 92,
    history: 88,
    cs: 95,
    remarks: 'Consistent analytical prowess and excellent class participation.'
  };
  const [formData, setFormData] = useState(initialForm);

  const refresh = () => setResults(resultService.getAll());

  const handleOpenAdd = () => {
    setSelectedResult(null);
    setFormData(initialForm);
    setIsAddEditOpen(true);
  };

  const handleOpenReportCard = (res) => {
    setSelectedResult(res);
    setIsReportCardOpen(true);
  };

  const handleOpenDelete = (res) => {
    setSelectedResult(res);
    setIsDeleteOpen(true);
  };

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', gpa: '4.0', status: 'Pass' };
    if (percentage >= 80) return { grade: 'A', gpa: '3.7', status: 'Pass' };
    if (percentage >= 75) return { grade: 'B+', gpa: '3.3', status: 'Pass' };
    if (percentage >= 70) return { grade: 'B', gpa: '3.0', status: 'Pass' };
    if (percentage >= 60) return { grade: 'C', gpa: '2.0', status: 'Pass' };
    if (percentage >= 50) return { grade: 'D', gpa: '1.0', status: 'Pass' };
    return { grade: 'F', gpa: '0.0', status: 'Fail' };
  };

  const handleSave = (e) => {
    e.preventDefault();
    const selStudent = students.find(s => s.id === formData.studentId);
    const selExam = exams.find(ex => ex.id === formData.examId);

    const mMath = Number(formData.math) || 0;
    const mPhys = Number(formData.physics) || 0;
    const mEng = Number(formData.english) || 0;
    const mHist = Number(formData.history) || 0;
    const mCs = Number(formData.cs) || 0;

    const totalMarks = mMath + mPhys + mEng + mHist + mCs;
    const maxMarks = 500;
    const percentage = Number(((totalMarks / maxMarks) * 100).toFixed(1));
    const { grade, gpa, status } = calculateGrade(percentage);

    const payload = {
      id: selectedResult ? selectedResult.id : `RES-${Date.now()}`,
      examId: formData.examId,
      examTitle: selExam ? selExam.title : formData.examTitle,
      studentId: formData.studentId,
      studentName: selStudent ? selStudent.name : 'Alexander Hayes',
      rollNo: selStudent ? selStudent.rollNo : '1001',
      className: selStudent ? selStudent.className : 'Grade 10-A',
      marks: {
        'Mathematics': mMath,
        'Physics & Chemistry': mPhys,
        'English Literature': mEng,
        'World History': mHist,
        'Computer Science': mCs
      },
      totalMarks,
      maxMarks,
      percentage,
      gpa,
      grade,
      status,
      remarks: formData.remarks
    };

    resultService.save(payload);
    refresh();
    setIsAddEditOpen(false);
    toast.success('Student result calculated & stored', 'Grades Recorded');
  };

  const handleConfirmDelete = () => {
    if (selectedResult) {
      resultService.delete(selectedResult.id);
      refresh();
      setIsDeleteOpen(false);
      toast.success('Result entry removed');
    }
  };

  const columns = [
    {
      header: 'Student',
      accessor: 'studentName',
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">
            {row.studentName}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Roll: {row.rollNo} • {row.className}
          </span>
        </div>
      )
    },
    {
      header: 'Examination',
      accessor: 'examTitle',
      render: (row) => (
        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          {row.examTitle}
        </span>
      )
    },
    {
      header: 'Score & %',
      accessor: 'percentage',
      render: (row) => (
        <div>
          <span className="text-xs font-extrabold text-slate-900 dark:text-white block">
            {row.totalMarks} / {row.maxMarks}
          </span>
          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
            {row.percentage}%
          </span>
        </div>
      )
    },
    {
      header: 'Grade / GPA',
      accessor: 'grade',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Badge variant={row.grade === 'A+' || row.grade === 'A' ? 'Present' : 'warning'}>
            {row.grade}
          </Badge>
          <span className="text-xs text-slate-500 font-mono">GPA: {row.gpa}</span>
        </div>
      )
    },
    {
      header: 'Result',
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
            onClick={() => handleOpenReportCard(row)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
            title="View & Print Report Card"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenDelete(row)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Delete Result"
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
            Grades & Exam Results
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Record subject evaluations, compute GPAs, and generate official academic report cards
          </p>
        </div>
        <Button onClick={handleOpenAdd} size="sm" icon={Award}>
          + Enter Marks
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={results}
        searchPlaceholder="Search student, roll number, or exam..."
        onAdd={handleOpenAdd}
        addLabel="Enter Marks"
        exportFilename="student-grades.csv"
      />

      {/* Enter Marks Modal */}
      <Modal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        title="Enter Student Marks"
        subtitle="Input subject marks to automatically determine total, percentage, and GPA"
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField
            label="Examination"
            name="examId"
            type="select"
            value={formData.examId}
            onChange={(e) => setFormData({ ...formData, examId: e.target.value })}
            options={exams.map(e => ({ value: e.id, label: `${e.title} (${e.term})` }))}
            required
          />

          <FormField
            label="Student"
            name="studentId"
            type="select"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            options={students.map(s => ({ value: s.id, label: `${s.name} (Roll #${s.rollNo} - ${s.className})` }))}
            required
          />

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Marks Obtained (Out of 100 per subject)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <FormField
                label="Mathematics"
                name="math"
                type="number"
                value={formData.math}
                onChange={(e) => setFormData({ ...formData, math: e.target.value })}
              />
              <FormField
                label="Physics & Chem"
                name="physics"
                type="number"
                value={formData.physics}
                onChange={(e) => setFormData({ ...formData, physics: e.target.value })}
              />
              <FormField
                label="English Lit"
                name="english"
                type="number"
                value={formData.english}
                onChange={(e) => setFormData({ ...formData, english: e.target.value })}
              />
              <FormField
                label="World History"
                name="history"
                type="number"
                value={formData.history}
                onChange={(e) => setFormData({ ...formData, history: e.target.value })}
              />
              <FormField
                label="Computer Science"
                name="cs"
                type="number"
                value={formData.cs}
                onChange={(e) => setFormData({ ...formData, cs: e.target.value })}
              />
            </div>
          </div>

          <FormField
            label="Teacher Remarks & Feedback"
            name="remarks"
            type="textarea"
            rows={2}
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            placeholder="Academic progress notes"
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>Cancel</Button>
            <Button type="submit">Compute & Save Grade</Button>
          </div>
        </form>
      </Modal>

      {/* Printable Report Card Modal */}
      <Modal
        isOpen={isReportCardOpen}
        onClose={() => setIsReportCardOpen(false)}
        title="Student Academic Report Card"
        size="lg"
      >
        {selectedResult && (
          <div className="space-y-6">
            <div id="printable-report" className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-slate-800 dark:text-slate-100">
              {/* Institution Header */}
              <div className="text-center border-b pb-4 mb-5 border-slate-200 dark:border-slate-800">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white shadow-md mb-2">
                  <School className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  {settings?.schoolProfile?.schoolName || 'EduPulse Academy of Excellence'}
                </h3>
                <p className="text-xs text-slate-500">
                  {settings?.schoolProfile?.address || '1000 Academic Parkway, Silicon Valley'} • Phone: {settings?.schoolProfile?.phone || '+1 555-438-7857'}
                </p>
                <div className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Official Grade Transcript • {selectedResult.examTitle}
                </div>
              </div>

              {/* Student Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-6 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Student Name</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedResult.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Roll Number</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white text-sm">{selectedResult.rollNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Class & Section</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedResult.className}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Academic Session</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">2025-2026</span>
                </div>
              </div>

              {/* Subject Marks Table */}
              <table className="w-full text-left border-collapse mb-6 text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/75 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <th className="p-3 font-semibold">Subject Title</th>
                    <th className="p-3 font-semibold text-center">Max Marks</th>
                    <th className="p-3 font-semibold text-center">Obtained</th>
                    <th className="p-3 font-semibold text-center">Percentage</th>
                    <th className="p-3 font-semibold text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {Object.entries(selectedResult.marks || {}).map(([subject, mark]) => {
                    const gradeInfo = calculateGrade(mark);
                    return (
                      <tr key={subject}>
                        <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{subject}</td>
                        <td className="p-3 text-center text-slate-500">100</td>
                        <td className="p-3 text-center font-bold text-slate-900 dark:text-white">{mark}</td>
                        <td className="p-3 text-center font-semibold text-indigo-600 dark:text-indigo-400">{mark}%</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {gradeInfo.grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 mb-6 text-center">
                <div>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium block">Total Marks</span>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">{selectedResult.totalMarks} / {selectedResult.maxMarks}</span>
                </div>
                <div>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium block">Overall Percentage</span>
                  <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">{selectedResult.percentage}%</span>
                </div>
                <div>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium block">Cumulative GPA</span>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">{selectedResult.gpa}</span>
                </div>
                <div>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium block">Final Outcome</span>
                  <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 uppercase">{selectedResult.status}</span>
                </div>
              </div>

              {/* Remarks */}
              <div className="text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 mb-8">
                <span className="font-bold block text-slate-800 dark:text-slate-200 mb-1">Faculty Remarks:</span>
                <p className="italic leading-relaxed">"{selectedResult.remarks}"</p>
              </div>

              {/* Signatures */}
              <div className="flex justify-between items-end pt-8 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div className="text-center">
                  <div className="w-36 border-b border-slate-400 mb-1" />
                  <span className="text-slate-500 font-medium">Class Teacher</span>
                </div>
                <div className="text-center">
                  <div className="w-36 border-b border-slate-400 mb-1" />
                  <span className="text-slate-500 font-medium">Principal Dr. Evelyn Brooks</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsReportCardOpen(false)}>
                Close
              </Button>
              <Button onClick={() => window.print()} icon={Printer}>
                Print Report Card
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Result Record"
        message={`Are you sure you want to delete the result entry for ${selectedResult?.studentName}?`}
      />
    </div>
  );
};

export default Results;
