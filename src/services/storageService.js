import {
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_PARENTS,
  INITIAL_ATTENDANCE,
  INITIAL_TIMETABLE,
  INITIAL_EXAMS,
  INITIAL_RESULTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_FEES,
  INITIAL_LIBRARY,
  INITIAL_NOTICES,
  INITIAL_EVENTS,
  INITIAL_MESSAGES,
  INITIAL_SETTINGS
} from './initialData';

const STORAGE_KEYS = {
  CLASSES: 'edupulse_classes',
  SUBJECTS: 'edupulse_subjects',
  STUDENTS: 'edupulse_students',
  TEACHERS: 'edupulse_teachers',
  PARENTS: 'edupulse_parents',
  ATTENDANCE: 'edupulse_attendance',
  TIMETABLE: 'edupulse_timetable',
  EXAMS: 'edupulse_exams',
  RESULTS: 'edupulse_results',
  ASSIGNMENTS: 'edupulse_assignments',
  FEES: 'edupulse_fees',
  LIBRARY: 'edupulse_library',
  NOTICES: 'edupulse_notices',
  EVENTS: 'edupulse_events',
  MESSAGES: 'edupulse_messages',
  SETTINGS: 'edupulse_settings'
};

const DEFAULT_MAP = {
  [STORAGE_KEYS.CLASSES]: INITIAL_CLASSES,
  [STORAGE_KEYS.SUBJECTS]: INITIAL_SUBJECTS,
  [STORAGE_KEYS.STUDENTS]: INITIAL_STUDENTS,
  [STORAGE_KEYS.TEACHERS]: INITIAL_TEACHERS,
  [STORAGE_KEYS.PARENTS]: INITIAL_PARENTS,
  [STORAGE_KEYS.ATTENDANCE]: INITIAL_ATTENDANCE,
  [STORAGE_KEYS.TIMETABLE]: INITIAL_TIMETABLE,
  [STORAGE_KEYS.EXAMS]: INITIAL_EXAMS,
  [STORAGE_KEYS.RESULTS]: INITIAL_RESULTS,
  [STORAGE_KEYS.ASSIGNMENTS]: INITIAL_ASSIGNMENTS,
  [STORAGE_KEYS.FEES]: INITIAL_FEES,
  [STORAGE_KEYS.LIBRARY]: INITIAL_LIBRARY,
  [STORAGE_KEYS.NOTICES]: INITIAL_NOTICES,
  [STORAGE_KEYS.EVENTS]: INITIAL_EVENTS,
  [STORAGE_KEYS.MESSAGES]: INITIAL_MESSAGES,
  [STORAGE_KEYS.SETTINGS]: INITIAL_SETTINGS
};

// Generic storage accessors
export const getStorageData = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      const fallback = DEFAULT_MAP[key];
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error reading storage key ${key}:`, error);
    return DEFAULT_MAP[key] || [];
  }
};

export const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing storage key ${key}:`, error);
  }
};

export const resetStorage = () => {
  Object.keys(DEFAULT_MAP).forEach((key) => {
    localStorage.setItem(key, JSON.stringify(DEFAULT_MAP[key]));
  });
};

// Generic Collection CRUD
export const getItems = (collectionKey) => {
  return getStorageData(collectionKey);
};

export const getItemById = (collectionKey, id) => {
  const items = getStorageData(collectionKey);
  return items.find(item => item.id === id);
};

export const saveItem = (collectionKey, item) => {
  const items = getStorageData(collectionKey);
  const index = items.findIndex(i => i.id === item.id);
  let updated;
  if (index >= 0) {
    updated = [...items];
    updated[index] = { ...updated[index], ...item };
  } else {
    const newItem = {
      ...item,
      id: item.id || `ID-${Date.now()}`
    };
    updated = [newItem, ...items];
  }
  setStorageData(collectionKey, updated);
  return updated;
};

export const deleteItem = (collectionKey, id) => {
  const items = getStorageData(collectionKey);
  const updated = items.filter(i => i.id !== id);
  setStorageData(collectionKey, updated);
  return updated;
};

// Specific convenience services
export const studentService = {
  getAll: () => getItems(STORAGE_KEYS.STUDENTS),
  getById: (id) => getItemById(STORAGE_KEYS.STUDENTS, id),
  save: (student) => saveItem(STORAGE_KEYS.STUDENTS, student),
  delete: (id) => deleteItem(STORAGE_KEYS.STUDENTS, id)
};

export const teacherService = {
  getAll: () => getItems(STORAGE_KEYS.TEACHERS),
  getById: (id) => getItemById(STORAGE_KEYS.TEACHERS, id),
  save: (teacher) => saveItem(STORAGE_KEYS.TEACHERS, teacher),
  delete: (id) => deleteItem(STORAGE_KEYS.TEACHERS, id)
};

export const parentService = {
  getAll: () => getItems(STORAGE_KEYS.PARENTS),
  getById: (id) => getItemById(STORAGE_KEYS.PARENTS, id),
  save: (parent) => saveItem(STORAGE_KEYS.PARENTS, parent),
  delete: (id) => deleteItem(STORAGE_KEYS.PARENTS, id)
};

export const classService = {
  getAll: () => getItems(STORAGE_KEYS.CLASSES),
  getById: (id) => getItemById(STORAGE_KEYS.CLASSES, id),
  save: (cls) => saveItem(STORAGE_KEYS.CLASSES, cls),
  delete: (id) => deleteItem(STORAGE_KEYS.CLASSES, id)
};

export const subjectService = {
  getAll: () => getItems(STORAGE_KEYS.SUBJECTS),
  getById: (id) => getItemById(STORAGE_KEYS.SUBJECTS, id),
  save: (subject) => saveItem(STORAGE_KEYS.SUBJECTS, subject),
  delete: (id) => deleteItem(STORAGE_KEYS.SUBJECTS, id)
};

export const attendanceService = {
  getAll: () => getItems(STORAGE_KEYS.ATTENDANCE),
  getByDateAndClass: (date, classId) => {
    const list = getItems(STORAGE_KEYS.ATTENDANCE);
    return list.find(a => a.date === date && a.classId === classId);
  },
  saveAttendanceSheet: (date, classId, className, records) => {
    const list = getItems(STORAGE_KEYS.ATTENDANCE);
    const existingIndex = list.findIndex(a => a.date === date && a.classId === classId);
    let updated;
    const entry = { date, classId, className, records, updatedAt: new Date().toISOString() };
    if (existingIndex >= 0) {
      updated = [...list];
      updated[existingIndex] = entry;
    } else {
      updated = [entry, ...list];
    }
    setStorageData(STORAGE_KEYS.ATTENDANCE, updated);
    return updated;
  }
};

export const timetableService = {
  getAll: () => getItems(STORAGE_KEYS.TIMETABLE),
  getByClassId: (classId) => {
    const list = getItems(STORAGE_KEYS.TIMETABLE);
    return list.find(t => t.classId === classId);
  },
  saveTimetable: (classId, className, schedule) => {
    const list = getItems(STORAGE_KEYS.TIMETABLE);
    const index = list.findIndex(t => t.classId === classId);
    let updated;
    const entry = { classId, className, schedule };
    if (index >= 0) {
      updated = [...list];
      updated[index] = entry;
    } else {
      updated = [...list, entry];
    }
    setStorageData(STORAGE_KEYS.TIMETABLE, updated);
    return updated;
  }
};

export const examService = {
  getAll: () => getItems(STORAGE_KEYS.EXAMS),
  save: (exam) => saveItem(STORAGE_KEYS.EXAMS, exam),
  delete: (id) => deleteItem(STORAGE_KEYS.EXAMS, id)
};

export const resultService = {
  getAll: () => getItems(STORAGE_KEYS.RESULTS),
  getByStudentId: (studentId) => {
    const list = getItems(STORAGE_KEYS.RESULTS);
    return list.filter(r => r.studentId === studentId);
  },
  save: (result) => saveItem(STORAGE_KEYS.RESULTS, result),
  delete: (id) => deleteItem(STORAGE_KEYS.RESULTS, id)
};

export const assignmentService = {
  getAll: () => getItems(STORAGE_KEYS.ASSIGNMENTS),
  save: (assignment) => saveItem(STORAGE_KEYS.ASSIGNMENTS, assignment),
  delete: (id) => deleteItem(STORAGE_KEYS.ASSIGNMENTS, id)
};

export const feeService = {
  getAll: () => getItems(STORAGE_KEYS.FEES),
  save: (fee) => saveItem(STORAGE_KEYS.FEES, fee),
  delete: (id) => deleteItem(STORAGE_KEYS.FEES, id),
  collectPayment: (id, amountPaid, paymentMethod = 'Cash') => {
    const list = getItems(STORAGE_KEYS.FEES);
    const updated = list.map(item => {
      if (item.id === id) {
        const totalPaid = (item.paidAmount || 0) + Number(amountPaid);
        const status = totalPaid >= item.amount ? 'Paid' : 'Pending';
        return {
          ...item,
          paidAmount: totalPaid,
          status,
          paymentDate: new Date().toISOString().split('T')[0],
          paymentMethod
        };
      }
      return item;
    });
    setStorageData(STORAGE_KEYS.FEES, updated);
    return updated;
  }
};

export const libraryService = {
  getAll: () => getItems(STORAGE_KEYS.LIBRARY),
  save: (book) => saveItem(STORAGE_KEYS.LIBRARY, book),
  delete: (id) => deleteItem(STORAGE_KEYS.LIBRARY, id),
  issueBook: (bookId, studentId, studentName, returnDays = 14) => {
    const list = getItems(STORAGE_KEYS.LIBRARY);
    const updated = list.map(b => {
      if (b.id === bookId) {
        if (b.availableCopies <= 0) return b;
        const now = new Date();
        const dueDate = new Date();
        dueDate.setDate(now.getDate() + returnDays);
        const newIssue = {
          studentId,
          studentName,
          issueDate: now.toISOString().split('T')[0],
          dueDate: dueDate.toISOString().split('T')[0]
        };
        return {
          ...b,
          availableCopies: b.availableCopies - 1,
          issuedTo: [...(b.issuedTo || []), newIssue]
        };
      }
      return b;
    });
    setStorageData(STORAGE_KEYS.LIBRARY, updated);
    return updated;
  },
  returnBook: (bookId, studentId) => {
    const list = getItems(STORAGE_KEYS.LIBRARY);
    const updated = list.map(b => {
      if (b.id === bookId) {
        const remainingIssued = (b.issuedTo || []).filter(i => i.studentId !== studentId);
        return {
          ...b,
          availableCopies: Math.min(b.totalCopies, b.availableCopies + 1),
          issuedTo: remainingIssued
        };
      }
      return b;
    });
    setStorageData(STORAGE_KEYS.LIBRARY, updated);
    return updated;
  }
};

export const noticeService = {
  getAll: () => getItems(STORAGE_KEYS.NOTICES),
  save: (notice) => saveItem(STORAGE_KEYS.NOTICES, notice),
  delete: (id) => deleteItem(STORAGE_KEYS.NOTICES, id)
};

export const eventService = {
  getAll: () => getItems(STORAGE_KEYS.EVENTS),
  save: (event) => saveItem(STORAGE_KEYS.EVENTS, event),
  delete: (id) => deleteItem(STORAGE_KEYS.EVENTS, id)
};

export const messageService = {
  getAll: () => getItems(STORAGE_KEYS.MESSAGES),
  save: (thread) => saveItem(STORAGE_KEYS.MESSAGES, thread),
  reply: (threadId, senderName, text) => {
    const list = getItems(STORAGE_KEYS.MESSAGES);
    const updated = list.map(t => {
      if (t.id === threadId) {
        const newMessage = {
          id: `msg-${Date.now()}`,
          sender: senderName,
          time: 'Just now',
          text
        };
        return {
          ...t,
          preview: text,
          thread: [...t.thread, newMessage],
          unread: false
        };
      }
      return t;
    });
    setStorageData(STORAGE_KEYS.MESSAGES, updated);
    return updated;
  }
};

export const settingService = {
  get: () => getStorageData(STORAGE_KEYS.SETTINGS),
  save: (settings) => {
    setStorageData(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  }
};

export { STORAGE_KEYS };
