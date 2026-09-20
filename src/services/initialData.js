// Comprehensive initial seed data for Education Management System

export const INITIAL_CLASSES = [
  { id: 'CLS-1', name: 'Grade 10', section: 'A', classTeacher: 'Sarah Jenkins', room: 'Room 201', capacity: 35, studentCount: 30 },
  { id: 'CLS-2', name: 'Grade 10', section: 'B', classTeacher: 'David Miller', room: 'Room 202', capacity: 35, studentCount: 28 },
  { id: 'CLS-3', name: 'Grade 11', section: 'Science', classTeacher: 'Dr. Robert Chen', room: 'Lab 1', capacity: 30, studentCount: 26 },
  { id: 'CLS-4', name: 'Grade 11', section: 'Commerce', classTeacher: 'Elena Rostova', room: 'Room 303', capacity: 35, studentCount: 24 },
  { id: 'CLS-5', name: 'Grade 12', section: 'Science', classTeacher: 'Marcus Vance', room: 'Lab 2', capacity: 30, studentCount: 25 },
  { id: 'CLS-6', name: 'Grade 9', section: 'A', classTeacher: 'Rachel Adams', room: 'Room 101', capacity: 35, studentCount: 32 }
];

export const INITIAL_SUBJECTS = [
  { id: 'SUB-1', code: 'MTH-101', name: 'Mathematics', classId: 'CLS-1', className: 'Grade 10-A', teacherName: 'Sarah Jenkins', credits: 4, type: 'Core' },
  { id: 'SUB-2', code: 'SCI-101', name: 'Physics & Chemistry', classId: 'CLS-1', className: 'Grade 10-A', teacherName: 'Dr. Robert Chen', credits: 4, type: 'Core' },
  { id: 'SUB-3', code: 'ENG-101', name: 'English Literature', classId: 'CLS-1', className: 'Grade 10-A', teacherName: 'Rachel Adams', credits: 3, type: 'Core' },
  { id: 'SUB-4', code: 'HIS-101', name: 'World History', classId: 'CLS-1', className: 'Grade 10-A', teacherName: 'Elena Rostova', credits: 3, type: 'Core' },
  { id: 'SUB-5', code: 'BIO-201', name: 'Advanced Biology', classId: 'CLS-3', className: 'Grade 11-Science', teacherName: 'Dr. Robert Chen', credits: 4, type: 'Core' },
  { id: 'SUB-6', code: 'CMP-201', name: 'Computer Science', classId: 'CLS-3', className: 'Grade 11-Science', teacherName: 'Marcus Vance', credits: 4, type: 'Elective' },
  { id: 'SUB-7', code: 'ACC-201', name: 'Accounting Principles', classId: 'CLS-4', className: 'Grade 11-Commerce', teacherName: 'Elena Rostova', credits: 4, type: 'Core' },
  { id: 'SUB-8', code: 'ART-101', name: 'Fine Arts & Design', classId: 'CLS-1', className: 'Grade 10-A', teacherName: 'Lisa Wong', credits: 2, type: 'Elective' }
];

export const INITIAL_STUDENTS = [
  {
    id: 'STU-1001',
    rollNo: '1001',
    name: 'Alexander Hayes',
    email: 'alex.hayes@school.edu',
    classId: 'CLS-1',
    className: 'Grade 10-A',
    gender: 'Male',
    dob: '2010-04-15',
    phone: '+1 555-0192',
    parentName: 'Thomas Hayes',
    parentPhone: '+1 555-0190',
    parentId: 'PAR-1',
    address: '742 Evergreen Terrace, Springfield',
    status: 'Active',
    admissionDate: '2022-09-01',
    bloodGroup: 'O+',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'STU-1002',
    rollNo: '1002',
    name: 'Sophia Montgomery',
    email: 'sophia.m@school.edu',
    classId: 'CLS-1',
    className: 'Grade 10-A',
    gender: 'Female',
    dob: '2010-08-22',
    phone: '+1 555-0193',
    parentName: 'Victoria Montgomery',
    parentPhone: '+1 555-0191',
    parentId: 'PAR-2',
    address: '124 Conch Street, Pacific Grove',
    status: 'Active',
    admissionDate: '2022-09-01',
    bloodGroup: 'A+',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'STU-1003',
    rollNo: '1003',
    name: 'Liam Zhang',
    email: 'liam.zhang@school.edu',
    classId: 'CLS-1',
    className: 'Grade 10-A',
    gender: 'Male',
    dob: '2010-01-10',
    phone: '+1 555-0194',
    parentName: 'Wei Zhang',
    parentPhone: '+1 555-0195',
    parentId: 'PAR-3',
    address: '88 Lotus Garden Way, Metroville',
    status: 'Active',
    admissionDate: '2023-01-15',
    bloodGroup: 'B+',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'STU-1004',
    rollNo: '1004',
    name: 'Emma Watson-Smith',
    email: 'emma.ws@school.edu',
    classId: 'CLS-1',
    className: 'Grade 10-A',
    gender: 'Female',
    dob: '2010-11-05',
    phone: '+1 555-0196',
    parentName: 'George Smith',
    parentPhone: '+1 555-0197',
    parentId: 'PAR-4',
    address: '42 Wallaby Way, Sydney Park',
    status: 'Active',
    admissionDate: '2022-09-01',
    bloodGroup: 'AB+',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'STU-1005',
    rollNo: '1005',
    name: 'Lucas Morales',
    email: 'lucas.m@school.edu',
    classId: 'CLS-1',
    className: 'Grade 10-A',
    gender: 'Male',
    dob: '2010-06-18',
    phone: '+1 555-0198',
    parentName: 'Carlos Morales',
    parentPhone: '+1 555-0199',
    parentId: 'PAR-5',
    address: '300 Ocean Drive, Bay City',
    status: 'Active',
    admissionDate: '2022-09-01',
    bloodGroup: 'O-',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'STU-1006',
    rollNo: '1006',
    name: 'Chloe Bennett',
    email: 'chloe.b@school.edu',
    classId: 'CLS-2',
    className: 'Grade 10-B',
    gender: 'Female',
    dob: '2010-03-30',
    phone: '+1 555-0201',
    parentName: 'Mark Bennett',
    parentPhone: '+1 555-0202',
    parentId: 'PAR-6',
    address: '15 Maple Court, Pinehill',
    status: 'Active',
    admissionDate: '2023-09-01',
    bloodGroup: 'A-',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'STU-1007',
    rollNo: '1007',
    name: 'Noah Al-Mansoor',
    email: 'noah.am@school.edu',
    classId: 'CLS-3',
    className: 'Grade 11-Science',
    gender: 'Male',
    dob: '2009-07-12',
    phone: '+1 555-0203',
    parentName: 'Tariq Al-Mansoor',
    parentPhone: '+1 555-0204',
    parentId: 'PAR-7',
    address: '500 Skyline Blvd, Highland',
    status: 'Active',
    admissionDate: '2021-09-01',
    bloodGroup: 'B-',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'STU-1008',
    rollNo: '1008',
    name: 'Isabella Rossi',
    email: 'isabella.r@school.edu',
    classId: 'CLS-4',
    className: 'Grade 11-Commerce',
    gender: 'Female',
    dob: '2009-12-04',
    phone: '+1 555-0205',
    parentName: 'Antonio Rossi',
    parentPhone: '+1 555-0206',
    parentId: 'PAR-8',
    address: '17 Villa Rosa Way, Sunnyvale',
    status: 'Active',
    admissionDate: '2021-09-01',
    bloodGroup: 'O+',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_TEACHERS = [
  {
    id: 'TCH-101',
    empId: 'EMP-101',
    name: 'Sarah Jenkins',
    email: 's.jenkins@school.edu',
    phone: '+1 555-0301',
    department: 'Mathematics',
    qualification: 'M.Sc Mathematics, B.Ed',
    experience: '8 Years',
    subjects: ['Mathematics', 'Advanced Calculus'],
    classes: ['Grade 10-A', 'Grade 12-Science'],
    joinDate: '2018-08-15',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'TCH-102',
    empId: 'EMP-102',
    name: 'Dr. Robert Chen',
    email: 'r.chen@school.edu',
    phone: '+1 555-0302',
    department: 'Sciences',
    qualification: 'Ph.D in Applied Physics',
    experience: '12 Years',
    subjects: ['Physics & Chemistry', 'Advanced Biology'],
    classes: ['Grade 10-A', 'Grade 11-Science'],
    joinDate: '2015-01-10',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'TCH-103',
    empId: 'EMP-103',
    name: 'Rachel Adams',
    email: 'r.adams@school.edu',
    phone: '+1 555-0303',
    department: 'Humanities',
    qualification: 'M.A English Literature',
    experience: '6 Years',
    subjects: ['English Literature', 'Creative Writing'],
    classes: ['Grade 9-A', 'Grade 10-A'],
    joinDate: '2020-09-01',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'TCH-104',
    empId: 'EMP-104',
    name: 'Marcus Vance',
    email: 'm.vance@school.edu',
    phone: '+1 555-0304',
    department: 'Technology',
    qualification: 'M.S Computer Engineering',
    experience: '9 Years',
    subjects: ['Computer Science', 'Robotics'],
    classes: ['Grade 11-Science', 'Grade 12-Science'],
    joinDate: '2019-02-01',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'TCH-105',
    empId: 'EMP-105',
    name: 'Elena Rostova',
    email: 'e.rostova@school.edu',
    phone: '+1 555-0305',
    department: 'Social Studies & Commerce',
    qualification: 'M.Com, M.A History',
    experience: '11 Years',
    subjects: ['World History', 'Accounting Principles'],
    classes: ['Grade 10-A', 'Grade 11-Commerce'],
    joinDate: '2016-07-20',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_PARENTS = [
  {
    id: 'PAR-1',
    name: 'Thomas Hayes',
    email: 't.hayes@parent.com',
    phone: '+1 555-0190',
    relationship: 'Father',
    occupation: 'Senior Software Architect',
    address: '742 Evergreen Terrace, Springfield',
    childrenIds: ['STU-1001'],
    childrenNames: ['Alexander Hayes'],
    status: 'Active'
  },
  {
    id: 'PAR-2',
    name: 'Victoria Montgomery',
    email: 'v.montgomery@parent.com',
    phone: '+1 555-0191',
    relationship: 'Mother',
    occupation: 'Cardiologist',
    address: '124 Conch Street, Pacific Grove',
    childrenIds: ['STU-1002'],
    childrenNames: ['Sophia Montgomery'],
    status: 'Active'
  },
  {
    id: 'PAR-3',
    name: 'Wei Zhang',
    email: 'w.zhang@parent.com',
    phone: '+1 555-0195',
    relationship: 'Father',
    occupation: 'Civil Engineer',
    address: '88 Lotus Garden Way, Metroville',
    childrenIds: ['STU-1003'],
    childrenNames: ['Liam Zhang'],
    status: 'Active'
  },
  {
    id: 'PAR-4',
    name: 'George Smith',
    email: 'g.smith@parent.com',
    phone: '+1 555-0197',
    relationship: 'Father',
    occupation: 'Financial Analyst',
    address: '42 Wallaby Way, Sydney Park',
    childrenIds: ['STU-1004'],
    childrenNames: ['Emma Watson-Smith'],
    status: 'Active'
  }
];

export const INITIAL_ATTENDANCE = [
  {
    date: '2026-09-18',
    classId: 'CLS-1',
    className: 'Grade 10-A',
    records: [
      { studentId: 'STU-1001', status: 'Present', remarks: 'On time' },
      { studentId: 'STU-1002', status: 'Present', remarks: 'On time' },
      { studentId: 'STU-1003', status: 'Late', remarks: '15m bus delay' },
      { studentId: 'STU-1004', status: 'Present', remarks: 'On time' },
      { studentId: 'STU-1005', status: 'Absent', remarks: 'Medical leave' }
    ]
  },
  {
    date: '2026-09-19',
    classId: 'CLS-1',
    className: 'Grade 10-A',
    records: [
      { studentId: 'STU-1001', status: 'Present', remarks: 'On time' },
      { studentId: 'STU-1002', status: 'Present', remarks: 'On time' },
      { studentId: 'STU-1003', status: 'Present', remarks: 'On time' },
      { studentId: 'STU-1004', status: 'Present', remarks: 'On time' },
      { studentId: 'STU-1005', status: 'Present', remarks: 'Returned' }
    ]
  },
  {
    date: '2026-09-20',
    classId: 'CLS-1',
    className: 'Grade 10-A',
    records: [
      { studentId: 'STU-1001', status: 'Present', remarks: 'On time' },
      { studentId: 'STU-1002', status: 'Present', remarks: 'On time' },
      { studentId: 'STU-1003', status: 'Present', remarks: 'On time' },
      { studentId: 'STU-1004', status: 'Late', remarks: 'Traffic' },
      { studentId: 'STU-1005', status: 'Present', remarks: 'On time' }
    ]
  }
];

export const INITIAL_TIMETABLE = [
  {
    classId: 'CLS-1',
    className: 'Grade 10-A',
    schedule: {
      Monday: [
        { period: 1, time: '08:30 - 09:15', subject: 'Mathematics', teacher: 'Sarah Jenkins', room: 'Room 201' },
        { period: 2, time: '09:20 - 10:05', subject: 'Physics & Chemistry', teacher: 'Dr. Robert Chen', room: 'Lab 1' },
        { period: 3, time: '10:20 - 11:05', subject: 'English Literature', teacher: 'Rachel Adams', room: 'Room 201' },
        { period: 4, time: '11:10 - 11:55', subject: 'World History', teacher: 'Elena Rostova', room: 'Room 201' },
        { period: 5, time: '12:45 - 13:30', subject: 'Fine Arts & Design', teacher: 'Lisa Wong', room: 'Art Studio' },
        { period: 6, time: '13:35 - 14:20', subject: 'Physical Education', teacher: 'Coach Davis', room: 'Gymnasium' }
      ],
      Tuesday: [
        { period: 1, time: '08:30 - 09:15', subject: 'English Literature', teacher: 'Rachel Adams', room: 'Room 201' },
        { period: 2, time: '09:20 - 10:05', subject: 'Mathematics', teacher: 'Sarah Jenkins', room: 'Room 201' },
        { period: 3, time: '10:20 - 11:05', subject: 'Computer Science', teacher: 'Marcus Vance', room: 'Comp Lab' },
        { period: 4, time: '11:10 - 11:55', subject: 'Physics & Chemistry', teacher: 'Dr. Robert Chen', room: 'Lab 1' },
        { period: 5, time: '12:45 - 13:30', subject: 'World History', teacher: 'Elena Rostova', room: 'Room 201' },
        { period: 6, time: '13:35 - 14:20', subject: 'Library Period', teacher: 'Mr. Bookman', room: 'Library' }
      ],
      Wednesday: [
        { period: 1, time: '08:30 - 09:15', subject: 'Physics & Chemistry', teacher: 'Dr. Robert Chen', room: 'Lab 1' },
        { period: 2, time: '09:20 - 10:05', subject: 'Mathematics', teacher: 'Sarah Jenkins', room: 'Room 201' },
        { period: 3, time: '10:20 - 11:05', subject: 'World History', teacher: 'Elena Rostova', room: 'Room 201' },
        { period: 4, time: '11:10 - 11:55', subject: 'English Literature', teacher: 'Rachel Adams', room: 'Room 201' },
        { period: 5, time: '12:45 - 13:30', subject: 'Fine Arts & Design', teacher: 'Lisa Wong', room: 'Art Studio' },
        { period: 6, time: '13:35 - 14:20', subject: 'Study Hall', teacher: 'Sarah Jenkins', room: 'Room 201' }
      ],
      Thursday: [
        { period: 1, time: '08:30 - 09:15', subject: 'Mathematics', teacher: 'Sarah Jenkins', room: 'Room 201' },
        { period: 2, time: '09:20 - 10:05', subject: 'Computer Science', teacher: 'Marcus Vance', room: 'Comp Lab' },
        { period: 3, time: '10:20 - 11:05', subject: 'English Literature', teacher: 'Rachel Adams', room: 'Room 201' },
        { period: 4, time: '11:10 - 11:55', subject: 'Physics & Chemistry', teacher: 'Dr. Robert Chen', room: 'Lab 1' },
        { period: 5, time: '12:45 - 13:30', subject: 'World History', teacher: 'Elena Rostova', room: 'Room 201' },
        { period: 6, time: '13:35 - 14:20', subject: 'Physical Education', teacher: 'Coach Davis', room: 'Field' }
      ],
      Friday: [
        { period: 1, time: '08:30 - 09:15', subject: 'World History', teacher: 'Elena Rostova', room: 'Room 201' },
        { period: 2, time: '09:20 - 10:05', subject: 'English Literature', teacher: 'Rachel Adams', room: 'Room 201' },
        { period: 3, time: '10:20 - 11:05', subject: 'Mathematics', teacher: 'Sarah Jenkins', room: 'Room 201' },
        { period: 4, time: '11:10 - 11:55', subject: 'Physics & Chemistry', teacher: 'Dr. Robert Chen', room: 'Lab 1' },
        { period: 5, time: '12:45 - 13:30', subject: 'Clubs & Societies', teacher: 'All Staff', room: 'Campus' },
        { period: 6, time: '13:35 - 14:20', subject: 'Assembly & Mentorship', teacher: 'Sarah Jenkins', room: 'Auditorium' }
      ]
    }
  }
];

export const INITIAL_EXAMS = [
  {
    id: 'EXM-101',
    title: 'Midterm Examinations 2026',
    term: 'Fall Term',
    startDate: '2026-10-15',
    endDate: '2026-10-24',
    classes: ['Grade 10-A', 'Grade 10-B', 'Grade 11-Science'],
    status: 'Upcoming',
    description: 'Comprehensive mid-semester assessment covering units 1 through 4.'
  },
  {
    id: 'EXM-102',
    title: 'Monthly Unit Assessment #1',
    term: 'Fall Term',
    startDate: '2026-09-10',
    endDate: '2026-09-14',
    classes: ['Grade 10-A', 'Grade 10-B', 'Grade 11-Commerce'],
    status: 'Completed',
    description: 'First continuous assessment cycle test.'
  },
  {
    id: 'EXM-103',
    title: 'Annual Final Examinations',
    term: 'Spring Term',
    startDate: '2026-12-05',
    endDate: '2026-12-18',
    classes: ['All Classes'],
    status: 'Upcoming',
    description: 'End of academic session cumulative examinations.'
  }
];

export const INITIAL_RESULTS = [
  {
    id: 'RES-101',
    examId: 'EXM-102',
    examTitle: 'Monthly Unit Assessment #1',
    studentId: 'STU-1001',
    studentName: 'Alexander Hayes',
    rollNo: '1001',
    className: 'Grade 10-A',
    marks: {
      'Mathematics': 94,
      'Physics & Chemistry': 88,
      'English Literature': 92,
      'World History': 85,
      'Computer Science': 96
    },
    totalMarks: 455,
    maxMarks: 500,
    percentage: 91.0,
    gpa: '3.9',
    grade: 'A+',
    status: 'Pass',
    remarks: 'Outstanding academic demonstration with strong analytical problem solving.'
  },
  {
    id: 'RES-102',
    examId: 'EXM-102',
    examTitle: 'Monthly Unit Assessment #1',
    studentId: 'STU-1002',
    studentName: 'Sophia Montgomery',
    rollNo: '1002',
    className: 'Grade 10-A',
    marks: {
      'Mathematics': 98,
      'Physics & Chemistry': 95,
      'English Literature': 94,
      'World History': 90,
      'Computer Science': 97
    },
    totalMarks: 474,
    maxMarks: 500,
    percentage: 94.8,
    gpa: '4.0',
    grade: 'A+',
    status: 'Pass',
    remarks: 'Exemplary performance across all subjects. Ranked 1st in class.'
  },
  {
    id: 'RES-103',
    examId: 'EXM-102',
    examTitle: 'Monthly Unit Assessment #1',
    studentId: 'STU-1003',
    studentName: 'Liam Zhang',
    rollNo: '1003',
    className: 'Grade 10-A',
    marks: {
      'Mathematics': 82,
      'Physics & Chemistry': 78,
      'English Literature': 80,
      'World History': 74,
      'Computer Science': 86
    },
    totalMarks: 400,
    maxMarks: 500,
    percentage: 80.0,
    gpa: '3.3',
    grade: 'B+',
    status: 'Pass',
    remarks: 'Good progress. Recommend additional practice in Physics concepts.'
  },
  {
    id: 'RES-104',
    examId: 'EXM-102',
    examTitle: 'Monthly Unit Assessment #1',
    studentId: 'STU-1004',
    studentName: 'Emma Watson-Smith',
    rollNo: '1004',
    className: 'Grade 10-A',
    marks: {
      'Mathematics': 89,
      'Physics & Chemistry': 91,
      'English Literature': 96,
      'World History': 92,
      'Computer Science': 88
    },
    totalMarks: 456,
    maxMarks: 500,
    percentage: 91.2,
    gpa: '3.9',
    grade: 'A+',
    status: 'Pass',
    remarks: 'Exceptional literary depth and strong overall mastery.'
  },
  {
    id: 'RES-105',
    examId: 'EXM-102',
    examTitle: 'Monthly Unit Assessment #1',
    studentId: 'STU-1005',
    studentName: 'Lucas Morales',
    rollNo: '1005',
    className: 'Grade 10-A',
    marks: {
      'Mathematics': 70,
      'Physics & Chemistry': 72,
      'English Literature': 75,
      'World History': 68,
      'Computer Science': 80
    },
    totalMarks: 365,
    maxMarks: 500,
    percentage: 73.0,
    gpa: '2.9',
    grade: 'B',
    status: 'Pass',
    remarks: 'Steady work. Can achieve higher scores with consistent revision.'
  }
];

export const INITIAL_ASSIGNMENTS = [
  {
    id: 'ASN-101',
    title: 'Quadratic Equations & Parabolic Modeling',
    subject: 'Mathematics',
    className: 'Grade 10-A',
    teacherName: 'Sarah Jenkins',
    dueDate: '2026-09-25',
    maxMarks: 50,
    submittedCount: 26,
    totalStudents: 30,
    status: 'Active',
    description: 'Solve problem set exercises 4.1 to 4.5 and draft a 1-page real-world parabolic trajectory analysis.'
  },
  {
    id: 'ASN-102',
    title: 'Thermodynamics & Heat Transfer Lab Report',
    subject: 'Physics & Chemistry',
    className: 'Grade 10-A',
    teacherName: 'Dr. Robert Chen',
    dueDate: '2026-09-28',
    maxMarks: 100,
    submittedCount: 22,
    totalStudents: 30,
    status: 'Active',
    description: 'Document laboratory observations from calorimeter experiments with complete error analysis.'
  },
  {
    id: 'ASN-103',
    title: 'Literary Critique: To Kill a Mockingbird',
    subject: 'English Literature',
    className: 'Grade 10-A',
    teacherName: 'Rachel Adams',
    dueDate: '2026-09-22',
    maxMarks: 40,
    submittedCount: 29,
    totalStudents: 30,
    status: 'Active',
    description: 'Write a 1200-word critical essay exploring the theme of moral courage in Chapters 9-11.'
  },
  {
    id: 'ASN-104',
    title: 'Industrial Revolution Socioeconomic Impact',
    subject: 'World History',
    className: 'Grade 10-A',
    teacherName: 'Elena Rostova',
    dueDate: '2026-09-15',
    maxMarks: 50,
    submittedCount: 30,
    totalStudents: 30,
    status: 'Closed',
    description: 'Compare urbanization patterns in 19th-century Britain and continental Europe.'
  }
];

export const INITIAL_FEES = [
  {
    id: 'FEE-201',
    invoiceNo: 'INV-2026-001',
    studentId: 'STU-1001',
    studentName: 'Alexander Hayes',
    className: 'Grade 10-A',
    feeType: 'Tuition Fee (Term 1)',
    amount: 1200,
    paidAmount: 1200,
    dueDate: '2026-09-10',
    status: 'Paid',
    paymentDate: '2026-09-05',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'FEE-202',
    invoiceNo: 'INV-2026-002',
    studentId: 'STU-1002',
    studentName: 'Sophia Montgomery',
    className: 'Grade 10-A',
    feeType: 'Tuition Fee (Term 1)',
    amount: 1200,
    paidAmount: 1200,
    dueDate: '2026-09-10',
    status: 'Paid',
    paymentDate: '2026-09-02',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'FEE-203',
    invoiceNo: 'INV-2026-003',
    studentId: 'STU-1003',
    studentName: 'Liam Zhang',
    className: 'Grade 10-A',
    feeType: 'Tuition Fee (Term 1)',
    amount: 1200,
    paidAmount: 600,
    dueDate: '2026-09-10',
    status: 'Pending',
    paymentDate: null,
    paymentMethod: 'Partial'
  },
  {
    id: 'FEE-204',
    invoiceNo: 'INV-2026-004',
    studentId: 'STU-1004',
    studentName: 'Emma Watson-Smith',
    className: 'Grade 10-A',
    feeType: 'Science Lab & Tech Fee',
    amount: 350,
    paidAmount: 350,
    dueDate: '2026-09-15',
    status: 'Paid',
    paymentDate: '2026-09-11',
    paymentMethod: 'Debit Card'
  },
  {
    id: 'FEE-205',
    invoiceNo: 'INV-2026-005',
    studentId: 'STU-1005',
    studentName: 'Lucas Morales',
    className: 'Grade 10-A',
    feeType: 'Tuition Fee (Term 1)',
    amount: 1200,
    paidAmount: 0,
    dueDate: '2026-09-01',
    status: 'Overdue',
    paymentDate: null,
    paymentMethod: null
  },
  {
    id: 'FEE-206',
    invoiceNo: 'INV-2026-006',
    studentId: 'STU-1001',
    studentName: 'Alexander Hayes',
    className: 'Grade 10-A',
    feeType: 'Athletics & Sports Club',
    amount: 150,
    paidAmount: 150,
    dueDate: '2026-09-20',
    status: 'Paid',
    paymentDate: '2026-09-18',
    paymentMethod: 'Cash'
  }
];

export const INITIAL_LIBRARY = [
  {
    id: 'LIB-101',
    isbn: '978-0141439518',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: 'Literature & Fiction',
    totalCopies: 8,
    availableCopies: 6,
    rackNo: 'A-12',
    issuedTo: [
      { studentId: 'STU-1002', studentName: 'Sophia Montgomery', issueDate: '2026-09-12', dueDate: '2026-09-26' },
      { studentId: 'STU-1004', studentName: 'Emma Watson-Smith', issueDate: '2026-09-14', dueDate: '2026-09-28' }
    ]
  },
  {
    id: 'LIB-102',
    isbn: '978-0321751041',
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    category: 'Mathematics',
    totalCopies: 12,
    availableCopies: 10,
    rackNo: 'M-04',
    issuedTo: [
      { studentId: 'STU-1001', studentName: 'Alexander Hayes', issueDate: '2026-09-10', dueDate: '2026-09-24' }
    ]
  },
  {
    id: 'LIB-103',
    isbn: '978-0134093413',
    title: 'Campbell Biology (11th Edition)',
    author: 'Jane B. Reece',
    category: 'Natural Science',
    totalCopies: 10,
    availableCopies: 8,
    rackNo: 'S-07',
    issuedTo: []
  },
  {
    id: 'LIB-104',
    isbn: '978-0262033848',
    title: 'Introduction to Algorithms (CLRS)',
    author: 'Thomas H. Cormen',
    category: 'Computer Science',
    totalCopies: 6,
    availableCopies: 4,
    rackNo: 'CS-01',
    issuedTo: [
      { studentId: 'STU-1003', studentName: 'Liam Zhang', issueDate: '2026-09-15', dueDate: '2026-09-29' }
    ]
  },
  {
    id: 'LIB-105',
    isbn: '978-0061120084',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Literature & Fiction',
    totalCopies: 15,
    availableCopies: 11,
    rackNo: 'A-14',
    issuedTo: []
  },
  {
    id: 'LIB-106',
    isbn: '978-0199535569',
    title: 'The Republic',
    author: 'Plato',
    category: 'Philosophy & Politics',
    totalCopies: 5,
    availableCopies: 5,
    rackNo: 'P-02',
    issuedTo: []
  }
];

export const INITIAL_NOTICES = [
  {
    id: 'NOT-1',
    title: 'Annual Science & Tech Fair 2026 - Project Submissions Open',
    content: 'All high school students interested in participating in the regional Science Fair must submit project outlines to Dr. Chen by October 5th. Team registrations are available in Lab 1.',
    target: 'All',
    category: 'Academic',
    date: '2026-09-18',
    pinned: true,
    author: 'Principal Dr. Evelyn Brooks'
  },
  {
    id: 'NOT-2',
    title: 'Parent-Teacher Conference Scheduling (Fall Term)',
    content: 'Individual conference appointment bookings will open this Friday via the parent portal. Conferences will take place on Saturday, October 10th from 9:00 AM to 3:00 PM.',
    target: 'Parents',
    category: 'Event',
    date: '2026-09-17',
    pinned: true,
    author: 'Administration Office'
  },
  {
    id: 'NOT-3',
    title: 'Staff Faculty Meeting - Curriculum Review',
    content: 'Mandatory faculty review meeting on Thursday at 3:30 PM in Conference Room B. Please bring updated syllabus plans and preliminary term assessments.',
    target: 'Teachers',
    category: 'Urgent',
    date: '2026-09-16',
    pinned: false,
    author: 'Academic Dean'
  },
  {
    id: 'NOT-4',
    title: 'Autumn Break Holiday Announcement',
    content: 'School will observe Autumn Break from October 28 to November 2. Classes will resume punctually on Monday, November 3.',
    target: 'All',
    category: 'Holiday',
    date: '2026-09-15',
    pinned: false,
    author: 'Administration Office'
  }
];

export const INITIAL_EVENTS = [
  {
    id: 'EVT-101',
    title: 'Fall Inter-School Athletics Championship',
    description: 'Track and field events, relay races, football finals and cheer tournaments.',
    category: 'Sports',
    date: '2026-10-02',
    time: '08:00 AM - 04:00 PM',
    location: 'Main Sports Complex',
    organizer: 'Athletics Department'
  },
  {
    id: 'EVT-102',
    title: 'Annual Science & Robotics Exhibition',
    description: 'Showcasing STEM projects, automated drones, AI models, and green energy prototypes.',
    category: 'Academic',
    date: '2026-10-18',
    time: '10:00 AM - 03:00 PM',
    location: 'Science Auditorium & Quad',
    organizer: 'STEM Club & Dr. Chen'
  },
  {
    id: 'EVT-103',
    title: 'Parent-Teacher Partnership Conference',
    description: 'Detailed one-on-one reviews of student academic progress, attendance, and development.',
    category: 'Meeting',
    date: '2026-10-10',
    time: '09:00 AM - 03:00 PM',
    location: 'Central Academic Block',
    organizer: 'School Administration'
  },
  {
    id: 'EVT-104',
    title: 'Autumn Symphony & Music Gala',
    description: 'An evening of classical orchestra, jazz ensembles, and choral performances.',
    category: 'Cultural',
    date: '2026-10-25',
    time: '06:00 PM - 08:30 PM',
    location: 'Performing Arts Theater',
    organizer: 'Music & Arts Department'
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'MSG-1',
    senderId: 'TCH-101',
    senderName: 'Sarah Jenkins',
    senderRole: 'Teacher',
    recipientId: 'STU-1001',
    recipientName: 'Alexander Hayes',
    subject: 'Math Olympiad Practice Schedule',
    preview: 'Hi Alex, the preparation sessions will begin this Wednesday...',
    thread: [
      { id: 'm1', sender: 'Sarah Jenkins', time: 'Sep 18, 09:30 AM', text: 'Hi Alex, the preparation sessions for the regional Math Olympiad will begin this Wednesday after school at 3:45 PM in Room 201.' },
      { id: 'm2', sender: 'Alexander Hayes', time: 'Sep 18, 10:15 AM', text: 'Thank you Ms. Jenkins! Should I bring any specific problem books or graphing calculators?' },
      { id: 'm3', sender: 'Sarah Jenkins', time: 'Sep 18, 11:00 AM', text: 'Just your notebook and standard calculator; I have prepared the problem packets for you.' }
    ],
    unread: false
  },
  {
    id: 'MSG-2',
    senderId: 'PAR-1',
    senderName: 'Thomas Hayes',
    senderRole: 'Parent',
    recipientId: 'TCH-101',
    recipientName: 'Sarah Jenkins',
    subject: 'Follow-up regarding Alex’s Olympiad Preparation',
    preview: 'Hello Ms. Jenkins, I wanted to thank you for encouraging Alex...',
    thread: [
      { id: 'm4', sender: 'Thomas Hayes', time: 'Sep 19, 08:15 AM', text: 'Hello Ms. Jenkins, I wanted to thank you for encouraging Alex to join the Olympiad team. We are very proud and will ensure he attends all sessions.' },
      { id: 'm5', sender: 'Sarah Jenkins', time: 'Sep 19, 09:00 AM', text: 'You are most welcome Mr. Hayes. Alex exhibits phenomenal problem-solving intuition and I am very confident in his potential.' }
    ],
    unread: true
  },
  {
    id: 'MSG-3',
    senderId: 'ADM-1',
    senderName: 'School Administration',
    senderRole: 'Admin',
    recipientId: 'ALL',
    recipientName: 'School Community',
    subject: 'Safety Guidelines & Campus Parking Update',
    preview: 'Please note the revised morning drop-off guidelines effective next week...',
    thread: [
      { id: 'm6', sender: 'School Administration', time: 'Sep 17, 02:00 PM', text: 'Please review the updated morning drop-off zones on North Gate to ease campus congestion.' }
    ],
    unread: false
  }
];

export const INITIAL_SETTINGS = {
  schoolProfile: {
    schoolName: 'EduPulse Academy of Excellence',
    tagline: 'Inspiring Minds, Shaping the Future',
    affiliationCode: 'EPA-2026-GLOBAL',
    principalName: 'Dr. Evelyn Brooks, Ed.D',
    email: 'info@edupulse.edu',
    phone: '+1 (555) 438-7857',
    website: 'https://edupulse.edu',
    address: '1000 Academic Parkway, Silicon Valley, CA 94025',
    currency: '$',
    foundedYear: '2004'
  },
  academicSession: {
    currentYear: '2025 - 2026',
    currentTerm: 'Fall Semester',
    termStartDate: '2026-08-25',
    termEndDate: '2026-12-20'
  },
  gradingSystem: [
    { grade: 'A+', minScore: 90, maxScore: 100, gpa: 4.0, description: 'Outstanding' },
    { grade: 'A',  minScore: 80, maxScore: 89,  gpa: 3.7, description: 'Excellent' },
    { grade: 'B+', minScore: 75, maxScore: 79,  gpa: 3.3, description: 'Very Good' },
    { grade: 'B',  minScore: 70, maxScore: 74,  gpa: 3.0, description: 'Good' },
    { grade: 'C+', minScore: 65, maxScore: 69,  gpa: 2.5, description: 'Satisfactory' },
    { grade: 'C',  minScore: 60, maxScore: 64,  gpa: 2.0, description: 'Acceptable' },
    { grade: 'D',  minScore: 50, maxScore: 59,  gpa: 1.0, description: 'Marginal Pass' },
    { grade: 'F',  minScore: 0,  maxScore: 49,  gpa: 0.0, description: 'Fail' }
  ],
  notifications: {
    emailAlerts: true,
    smsAlerts: false,
    examReminders: true,
    feeDueAlerts: true,
    attendanceAlerts: true
  }
};
