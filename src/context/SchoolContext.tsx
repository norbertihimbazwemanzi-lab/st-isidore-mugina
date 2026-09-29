import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  StaffMember, NewsItem, EventItem, StudentResult, EResource 
} from '../types';
import { 
  LEADERSHIP_STAFF, NEWS_ANNOUNCEMENTS, UPCOMING_EVENTS, MOCK_STUDENTS, E_RESOURCES 
} from '../data/schoolData';

interface SchoolContextType {
  // Authentication
  isAdminAuthenticated: boolean;
  loginAdmin: (code: string) => boolean;
  logoutAdmin: () => void;
  adminCodeError: string | null;

  // Teachers / Staff (Add, Edit, Delete)
  teachers: StaffMember[];
  addTeacher: (teacher: Omit<StaffMember, 'id' | 'avatarInitials'>) => void;
  editTeacher: (id: string, updated: Partial<StaffMember>) => void;
  deleteTeacher: (id: string) => void;

  // News Announcements (Publish, Delete)
  news: NewsItem[];
  publishNews: (newsItem: Omit<NewsItem, 'id' | 'date'>) => void;
  deleteNews: (id: string) => void;

  // Calendar Events (Add, Delete)
  events: EventItem[];
  addEvent: (eventItem: Omit<EventItem, 'id'>) => void;
  deleteEvent: (id: string) => void;

  // Students & Marks (Add, Edit)
  students: Record<string, StudentResult>;
  updateStudentMarks: (regNumber: string, updated: StudentResult) => void;
  addStudent: (student: StudentResult) => void;

  // Digital Library / E-Learning Documents (Read, Insert/Upload, Delete)
  libraryDocuments: EResource[];
  addLibraryDocument: (doc: Omit<EResource, 'id' | 'downloads'>) => void;
  deleteLibraryDocument: (id: string) => void;

  // Global Toast
  notificationToast: string | null;
  setNotificationToast: (msg: string | null) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const HEADTEACHER_ADMIN_CODE = '280508200528';

const loadStorage = <T,>(key: string, fallback: T): T => {
  try {
    const item = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

export const SchoolProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminCodeError, setAdminCodeError] = useState<string | null>(null);

  const [teachers, setTeachers] = useState<StaffMember[]>(() => loadStorage('gs_mugina_teachers', LEADERSHIP_STAFF));
  const [news, setNews] = useState<NewsItem[]>(() => loadStorage('gs_mugina_news', NEWS_ANNOUNCEMENTS));
  const [events, setEvents] = useState<EventItem[]>(() => loadStorage('gs_mugina_events', UPCOMING_EVENTS));
  const [students, setStudents] = useState<Record<string, StudentResult>>(() => loadStorage('gs_mugina_students', MOCK_STUDENTS));
  const [libraryDocuments, setLibraryDocuments] = useState<EResource[]>(() => loadStorage('gs_mugina_library', E_RESOURCES));

  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  React.useEffect(() => {
    try {
      localStorage.setItem('gs_mugina_teachers', JSON.stringify(teachers));
    } catch {}
  }, [teachers]);

  React.useEffect(() => {
    try {
      localStorage.setItem('gs_mugina_library', JSON.stringify(libraryDocuments));
    } catch {}
  }, [libraryDocuments]);

  React.useEffect(() => {
    try {
      localStorage.setItem('gs_mugina_news', JSON.stringify(news));
    } catch {}
  }, [news]);

  React.useEffect(() => {
    try {
      localStorage.setItem('gs_mugina_events', JSON.stringify(events));
    } catch {}
  }, [events]);

  React.useEffect(() => {
    try {
      localStorage.setItem('gs_mugina_students', JSON.stringify(students));
    } catch {}
  }, [students]);

  const showToast = (message: string) => {
    setNotificationToast(message);
    setTimeout(() => {
      setNotificationToast(null);
    }, 4500);
  };

  const loginAdmin = (code: string): boolean => {
    setAdminCodeError(null);
    if (code.trim() === HEADTEACHER_ADMIN_CODE) {
      setIsAdminAuthenticated(true);
      showToast('Authenticated as Headteacher Habiyaremye Charles (Administrator)');
      return true;
    } else {
      setAdminCodeError('Invalid Headteacher code. Please enter: 280508200528');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    showToast('Signed out of Headteacher Administrator mode');
  };

  const addTeacher = (teacherData: Omit<StaffMember, 'id' | 'avatarInitials'>) => {
    const initials = teacherData.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');

    const newTeacher: StaffMember = {
      ...teacherData,
      id: `staff-${Date.now()}`,
      avatarInitials: initials || 'TR',
    };

    setTeachers((prev) => [newTeacher, ...prev]);
    showToast(`Added ${newTeacher.name} to teaching staff for ${newTeacher.classAssigned}!`);
  };

  const editTeacher = (id: string, updated: Partial<StaffMember>) => {
    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newName = updated.name ?? t.name;
          const initials = newName
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0].toUpperCase())
            .join('');
          return {
            ...t,
            ...updated,
            avatarInitials: initials || t.avatarInitials,
          };
        }
        return t;
      })
    );
    showToast(`Updated staff credentials for ${updated.name || 'teacher'}`);
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    showToast('Teacher record removed.');
  };

  const publishNews = (newsData: Omit<NewsItem, 'id' | 'date'>) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const todayFormatted = new Date().toLocaleDateString('en-US', options);

    const newArticle: NewsItem = {
      ...newsData,
      id: `news-${Date.now()}`,
      date: todayFormatted,
    };

    setNews((prev) => [newArticle, ...prev]);
    showToast(`Published bulletin: "${newArticle.title}" to school website!`);
  };

  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
    showToast('News announcement removed.');
  };

  const addEvent = (eventData: Omit<EventItem, 'id'>) => {
    const newEvent: EventItem = {
      ...eventData,
      id: `evt-${Date.now()}`,
    };

    setEvents((prev) => [...prev, newEvent]);
    showToast(`Added "${newEvent.title}" to school calendar!`);
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('Event removed from calendar.');
  };

  const updateStudentMarks = (regNumber: string, updated: StudentResult) => {
    setStudents((prev) => ({
      ...prev,
      [regNumber]: updated,
    }));
    showToast(`Updated official report card for ${updated.studentName} (${regNumber})!`);
  };

  const addStudent = (newStudent: StudentResult) => {
    const reg = newStudent.regNumber.toUpperCase();
    setStudents((prev) => ({
      ...prev,
      [reg]: newStudent,
    }));
    showToast(`Enrolled ${newStudent.studentName} into ${newStudent.stream}!`);
  };

  const addLibraryDocument = (docData: Omit<EResource, 'id' | 'downloads'>) => {
    const newDoc: EResource = {
      ...docData,
      id: `doc-${Date.now()}`,
      downloads: 1,
    };
    setLibraryDocuments((prev) => [newDoc, ...prev]);
    showToast(`Added PDF document "${newDoc.title}" to student library!`);
  };

  const deleteLibraryDocument = (id: string) => {
    setLibraryDocuments((prev) => prev.filter((d) => d.id !== id));
    showToast('Document removed from digital library.');
  };

  return (
    <SchoolContext.Provider
      value={{
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        adminCodeError,
        teachers,
        addTeacher,
        editTeacher,
        deleteTeacher,
        news,
        publishNews,
        deleteNews,
        events,
        addEvent,
        deleteEvent,
        students,
        updateStudentMarks,
        addStudent,
        libraryDocuments,
        addLibraryDocument,
        deleteLibraryDocument,
        notificationToast,
        setNotificationToast,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
