import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USERS = {
  admin: {
    id: 'ADM-1',
    name: 'Dr. Evelyn Brooks',
    role: 'admin',
    roleLabel: 'School Administrator',
    email: 'admin@school.edu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Principal & Super Admin'
  },
  teacher: {
    id: 'TCH-101',
    name: 'Sarah Jenkins',
    role: 'teacher',
    roleLabel: 'Senior Faculty Teacher',
    email: 'teacher@school.edu',
    avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
    department: 'Mathematics & STEM',
    assignedClass: 'Grade 10-A'
  },
  student: {
    id: 'STU-1001',
    name: 'Alexander Hayes',
    role: 'student',
    roleLabel: 'Enrolled Student',
    email: 'student@school.edu',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    rollNo: '1001',
    className: 'Grade 10-A'
  },
  parent: {
    id: 'PAR-1',
    name: 'Thomas Hayes',
    role: 'parent',
    roleLabel: 'Guardian / Parent',
    email: 'parent@school.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    childId: 'STU-1001',
    childName: 'Alexander Hayes',
    childClass: 'Grade 10-A'
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('edupulse_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_USERS.admin;
      }
    }
    return DEMO_USERS.admin;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('edupulse_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('edupulse_auth_user');
    }
  }, [currentUser]);

  const login = (role = 'admin') => {
    const user = DEMO_USERS[role] || DEMO_USERS.admin;
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role) => {
    if (DEMO_USERS[role]) {
      setCurrentUser(DEMO_USERS[role]);
    }
  };

  // Check access permissions based on role
  const canAccess = (feature) => {
    if (!currentUser) return false;
    const role = currentUser.role;
    if (role === 'admin') return true;

    const teacherFeatures = [
      'dashboard', 'classes', 'subjects', 'attendance', 'timetable',
      'exams', 'results', 'assignments', 'students', 'notices', 'events', 'messages'
    ];
    const studentFeatures = [
      'dashboard', 'timetable', 'attendance', 'exams', 'results',
      'assignments', 'fees', 'library', 'notices', 'events', 'messages'
    ];
    const parentFeatures = [
      'dashboard', 'attendance', 'timetable', 'results', 'assignments',
      'fees', 'notices', 'events', 'messages'
    ];

    if (role === 'teacher') return teacherFeatures.includes(feature);
    if (role === 'student') return studentFeatures.includes(feature);
    if (role === 'parent') return parentFeatures.includes(feature);

    return true;
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      role: currentUser?.role || 'guest',
      login,
      logout,
      switchRole,
      canAccess,
      isAuthenticated: !!currentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
