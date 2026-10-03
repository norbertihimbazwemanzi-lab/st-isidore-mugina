import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  StaffMember, NewsItem, EventItem, StudentResult, EResource, Language,
  AdminLogEntry, AdminActionCategory 
} from '../types';
import { 
  LEADERSHIP_STAFF, NEWS_ANNOUNCEMENTS, UPCOMING_EVENTS, MOCK_STUDENTS, E_RESOURCES 
} from '../data/schoolData';
import { TRANSLATIONS } from '../data/translations';

interface SchoolContextType {
  // Language Context
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;

  // School Website Custom Logo
  schoolLogo: string | null;
  updateSchoolLogo: (logoUrl: string | null) => void;

  // Headteacher Master Admin Authentication
  isAdminAuthenticated: boolean;
  loginAdmin: (code: string) => boolean;
  logoutAdmin: () => void;
  adminCodeError: string | null;

  // Staff & Teacher Authentication (Credential-based login)
  currentAuthenticatedStaff: StaffMember | null;
  loginStaff: (identifier: string, passcode: string) => { success: boolean; message: string };
  logoutStaff: () => void;

  // Teachers / Staff (Add, Edit, Delete, Update Photo, Update Bio)
  teachers: StaffMember[];
  addTeacher: (teacher: Omit<StaffMember, 'id' | 'avatarInitials'>) => void;
  editTeacher: (id: string, updated: Partial<StaffMember>) => void;
  deleteTeacher: (id: string) => void;
  updateTeacherPhoto: (teacherId: string, photoUrl: string) => boolean;
  updateTeacherBio: (teacherId: string, bio: string, phone?: string) => boolean;
  assignTeacherPasscode: (teacherId: string, newPasscode: string) => void;

  // News Announcements (Publish, Delete)
  news: NewsItem[];
  publishNews: (newsItem: Omit<NewsItem, 'id' | 'date'>) => void;
  deleteNews: (id: string) => void;

  // Calendar Events (Add, Delete)
  events: EventItem[];
  addEvent: (eventItem: Omit<EventItem, 'id'>) => void;
  deleteEvent: (id: string) => void;

  // Students & Marks (Add, Edit, Delete, Credentials)
  students: Record<string, StudentResult>;
  updateStudentMarks: (regNumber: string, updated: StudentResult) => void;
  addStudent: (student: StudentResult) => void;
  deleteStudent: (regNumber: string) => void;
  assignStudentPin: (regNumber: string, newPin: string) => void;

  // Admin Activity Log & Audit Trail
  adminActivityLogs: AdminLogEntry[];
  logAdminAction: (
    category: AdminActionCategory,
    title: string,
    description: string,
    targetId?: string,
    details?: any
  ) => void;
  clearActivityLogs: () => void;

  // Digital Library / E-Learning Documents (Read, Insert/Upload, Delete)
  libraryDocuments: EResource[];
  addLibraryDocument: (doc: Omit<EResource, 'id' | 'downloads'>) => void;
  deleteLibraryDocument: (id: string) => void;

  // Global Toast
  notificationToast: string | null;
  setNotificationToast: (msg: string | null) => void;

  // Server-Side Data Persistence & GitHub Sync
  saveAllToBackend: (partialData?: Record<string, any>) => Promise<boolean>;
  exportDataBackup: () => void;
  isBackendConnected: boolean;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const HEADTEACHER_ADMIN_USER = '280508200528';
export const HEADTEACHER_ADMIN_CODE = '@0798744704';

export const INITIAL_ADMIN_LOGS: AdminLogEntry[] = [
  {
    id: 'log-01',
    timestamp: 'Oct 3, 2026, 08:30 AM',
    isoDate: '2026-10-03T08:30:00Z',
    adminName: 'Habiyaremye Charles (Headteacher)',
    category: 'system_sync',
    title: 'Google Search Console Verification & Sitemap Deployed',
    description: 'Generated sitemap.xml, robots.txt, and Search Console verification tokens for gssidoremugina.rw indexation.',
    targetId: 'GSC-2026-AUTH',
  },
  {
    id: 'log-02',
    timestamp: 'Oct 2, 2026, 04:15 PM',
    isoDate: '2026-10-02T16:15:00Z',
    adminName: 'Habiyaremye Charles (Headteacher)',
    category: 'enroll_student',
    title: 'New Candidate Enrolled: Keza Divine',
    description: 'Enrolled student Keza Divine into Senior 3 Stream B (NESA Candidate). Portal access PIN issued.',
    targetId: 'MUG-2026-S3B-01',
  },
  {
    id: 'log-03',
    timestamp: 'Oct 2, 2026, 02:40 PM',
    isoDate: '2026-10-02T14:40:00Z',
    adminName: 'Habiyaremye Charles (Headteacher)',
    category: 'update_credentials',
    title: 'Portal Credentials Provisioned for Uwase Ange Marie',
    description: 'Issued confidential admission portal credential PIN ST-MUG-304 for Primary 6 PLE Candidate.',
    targetId: 'MUG-2026-P6A-08',
  },
  {
    id: 'log-04',
    timestamp: 'Oct 1, 2026, 11:20 AM',
    isoDate: '2026-10-01T11:20:00Z',
    adminName: 'Habiyaremye Charles (Headteacher)',
    category: 'update_marks',
    title: 'Official Term 2 Results Certified',
    description: 'Reviewed and certified Term 2 terminal evaluations for 18 classroom streams under REB competency-based curriculum.',
    targetId: 'ALL-18-STREAMS',
  },
  {
    id: 'log-05',
    timestamp: 'Sep 30, 2026, 09:10 AM',
    isoDate: '2026-09-30T09:10:00Z',
    adminName: 'Habiyaremye Charles (Headteacher)',
    category: 'add_teacher',
    title: 'Staff Allocation Assigned: Dean of Studies',
    description: 'Assigned M. Mugabo Jean Damascene as Secondary Dean of Studies & allocated Senior 3 physics laboratory supervision.',
    targetId: 'staff-03',
  }
];

const loadStorage = <T,>(key: string, fallback: T): T => {
  try {
    const item = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

export const SchoolProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => loadStorage('gs_mugina_language', 'en'));
  const [schoolLogo, setSchoolLogoState] = useState<string | null>(() => loadStorage('gs_mugina_custom_logo', null));

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminCodeError, setAdminCodeError] = useState<string | null>(null);

  // Authenticated Staff Member (Teacher / Headteacher / Bursar)
  const [currentAuthenticatedStaff, setCurrentAuthenticatedStaff] = useState<StaffMember | null>(() =>
    loadStorage<StaffMember | null>('gs_mugina_authenticated_staff', null)
  );

  const [teachers, setTeachers] = useState<StaffMember[]>(() => loadStorage('gs_mugina_teachers', LEADERSHIP_STAFF));
  const [news, setNews] = useState<NewsItem[]>(() => loadStorage('gs_mugina_news', NEWS_ANNOUNCEMENTS));
  const [events, setEvents] = useState<EventItem[]>(() => loadStorage('gs_mugina_events', UPCOMING_EVENTS));
  const [students, setStudents] = useState<Record<string, StudentResult>>(() => loadStorage('gs_mugina_students', MOCK_STUDENTS));
  const [libraryDocuments, setLibraryDocuments] = useState<EResource[]>(() => loadStorage('gs_mugina_library', E_RESOURCES));
  const [adminActivityLogs, setAdminActivityLogs] = useState<AdminLogEntry[]>(() =>
    loadStorage('gs_mugina_activity_logs', INITIAL_ADMIN_LOGS)
  );

  useEffect(() => {
    try {
      localStorage.setItem('gs_mugina_activity_logs', JSON.stringify(adminActivityLogs));
    } catch {}
  }, [adminActivityLogs]);

  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('gs_mugina_language', JSON.stringify(lang));
    } catch {}
    const msg = lang === 'rw' 
      ? 'Ururimi rwahinduwe: Ikinyarwanda' 
      : lang === 'fr' 
      ? 'Langue modifiée: Français' 
      : 'Language switched to English';
    showToast(msg);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  const updateSchoolLogo = (logoUrl: string | null) => {
    setSchoolLogoState(logoUrl);
    try {
      if (logoUrl) {
        localStorage.setItem('gs_mugina_custom_logo', JSON.stringify(logoUrl));
      } else {
        localStorage.removeItem('gs_mugina_custom_logo');
      }
    } catch {}
    showToast(logoUrl ? 'School website logo updated successfully!' : 'Reset to default school crest.');
  };

  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Sync state to localStorage & fetch server persisted data on boot
  useEffect(() => {
    // 1. Check remembered admin login
    try {
      if (localStorage.getItem('gs_mugina_remember_admin') === 'true') {
        setIsAdminAuthenticated(true);
      }
    } catch {}

    // 2. Fetch server-persisted data from backend (so all users across devices see updates)
    fetch('/api/school-data')
      .then((res) => (res.ok ? res.json() : null))
      .then((serverData) => {
        if (serverData && typeof serverData === 'object' && Object.keys(serverData).length > 0) {
          setIsBackendConnected(true);
          if (serverData.schoolLogo !== undefined) setSchoolLogoState(serverData.schoolLogo);
          if (Array.isArray(serverData.teachers) && serverData.teachers.length > 0) setTeachers(serverData.teachers);
          if (Array.isArray(serverData.news) && serverData.news.length > 0) setNews(serverData.news);
          if (Array.isArray(serverData.events) && serverData.events.length > 0) setEvents(serverData.events);
          if (serverData.students && typeof serverData.students === 'object') setStudents(serverData.students);
          if (Array.isArray(serverData.libraryDocuments) && serverData.libraryDocuments.length > 0) setLibraryDocuments(serverData.libraryDocuments);
        }
      })
      .catch(() => {
        setIsBackendConnected(false);
      });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('gs_mugina_news', JSON.stringify(news));
    } catch {}
  }, [news]);

  useEffect(() => {
    try {
      localStorage.setItem('gs_mugina_events', JSON.stringify(events));
    } catch {}
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('gs_mugina_library', JSON.stringify(libraryDocuments));
    } catch {}
  }, [libraryDocuments]);

  useEffect(() => {
    try {
      localStorage.setItem('gs_mugina_students', JSON.stringify(students));
    } catch {}
  }, [students]);

  useEffect(() => {
    try {
      if (currentAuthenticatedStaff) {
        localStorage.setItem('gs_mugina_authenticated_staff', JSON.stringify(currentAuthenticatedStaff));
      } else {
        localStorage.removeItem('gs_mugina_authenticated_staff');
      }
    } catch {}
  }, [currentAuthenticatedStaff]);

  const showToast = (message: string) => {
    setNotificationToast(message);
    setTimeout(() => {
      setNotificationToast(null);
    }, 4500);
  };

  const loginAdmin = (code: string): boolean => {
    setAdminCodeError(null);
    const clean = code.trim();
    if (clean === HEADTEACHER_ADMIN_CODE || clean === '0798744704') {
      setIsAdminAuthenticated(true);
      showToast('Authenticated as Headteacher Habiyaremye Charles (Administrator)');
      return true;
    } else {
      setAdminCodeError('Invalid security code. Please check credentials or contact administration.');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    showToast('Signed out of Headteacher Administrator mode');
  };

  // Staff & Teacher Authentication (Credential given by Admin)
  const loginStaff = (identifier: string, passcode: string): { success: boolean; message: string } => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = passcode.trim();

    if (!cleanId || !cleanPass) {
      return { success: false, message: 'Please enter your Staff ID / Email and your access credential.' };
    }

    // Match teacher by ID, email, or name
    const foundTeacher = teachers.find(
      (t) =>
        t.id.toLowerCase() === cleanId ||
        t.email?.toLowerCase() === cleanId ||
        t.name.toLowerCase().includes(cleanId)
    );

    if (!foundTeacher) {
      return { 
        success: false, 
        message: `No staff member found matching "${identifier}". Please confirm your official Staff ID with the Headteacher.` 
      };
    }

    const validPasscode = foundTeacher.accessPasscode || 'TEACH-2026';
    const isMasterCode = cleanPass === HEADTEACHER_ADMIN_CODE;

    if (cleanPass === validPasscode || isMasterCode) {
      setCurrentAuthenticatedStaff(foundTeacher);
      showToast(`Welcome, ${foundTeacher.name}! You are now authenticated to update your profile photo and bio.`);
      return { success: true, message: `Welcome back, ${foundTeacher.name}!` };
    } else {
      return { 
        success: false, 
        message: 'Incorrect credential passcode. Please obtain your staff passcode from the Headteacher Admin Suite.' 
      };
    }
  };

  const logoutStaff = () => {
    setCurrentAuthenticatedStaff(null);
    showToast('Logged out of Staff portal session.');
  };

  const logAdminAction = (
    category: AdminActionCategory,
    title: string,
    description: string,
    targetId?: string,
    details?: any
  ) => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    const formattedTime = now.toLocaleDateString('en-US', options);

    const newEntry: AdminLogEntry = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: formattedTime,
      isoDate: now.toISOString(),
      adminName: 'Habiyaremye Charles (Headteacher)',
      category,
      title,
      description,
      targetId,
    };

    setAdminActivityLogs((prev) => [newEntry, ...prev.slice(0, 99)]);
  };

  const clearActivityLogs = () => {
    setAdminActivityLogs([]);
    showToast('Admin activity log has been cleared.');
  };

  const addTeacher = (teacherData: Omit<StaffMember, 'id' | 'avatarInitials'>) => {
    const initials = teacherData.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const generatedPasscode = `TR-MUG-${randomSuffix}`;

    const newTeacher: StaffMember = {
      ...teacherData,
      id: `staff-${Date.now()}`,
      avatarInitials: initials || 'TR',
      accessPasscode: teacherData.accessPasscode || generatedPasscode,
    };

    setTeachers((prev) => [newTeacher, ...prev]);
    logAdminAction(
      'add_teacher',
      `Staff Member Added: ${newTeacher.name}`,
      `Added teacher ${newTeacher.name} assigned to ${newTeacher.classAssigned}. Credential issued: ${newTeacher.accessPasscode}`,
      newTeacher.id
    );
    showToast(`Added ${newTeacher.name} with credential pass "${newTeacher.accessPasscode}"!`);
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
    logAdminAction(
      'edit_teacher',
      `Staff Profile Updated: ${updated.name || 'Teacher'}`,
      `Updated class allocation or biographical notes for staff member.`,
      id
    );
    showToast(`Updated staff details for ${updated.name || 'teacher'}`);
  };

  const deleteTeacher = (id: string) => {
    const trName = teachers.find(t => t.id === id)?.name || id;
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    logAdminAction('delete_teacher', `Staff Removed: ${trName}`, `Removed teacher record ${trName} from staff registry.`, id);
    showToast('Teacher record removed.');
  };

  // Only authenticated staff or Admin can update photo
  const updateTeacherPhoto = (teacherId: string, photoUrl: string): boolean => {
    const isSelf = currentAuthenticatedStaff?.id === teacherId;
    const isHead = isAdminAuthenticated || currentAuthenticatedStaff?.role.includes('Headteacher');

    if (!isSelf && !isHead) {
      showToast('Permission denied: You must be logged in with your staff credential to update your profile photo.');
      return false;
    }

    setTeachers((prev) =>
      prev.map((t) => (t.id === teacherId ? { ...t, photoUrl } : t))
    );

    if (currentAuthenticatedStaff?.id === teacherId) {
      setCurrentAuthenticatedStaff((prev) => prev ? { ...prev, photoUrl } : null);
    }

    logAdminAction('upload_media', `Staff Photo Updated: ${teacherId}`, `Uploaded new portrait photo for faculty member.`, teacherId);
    showToast('Profile photo updated successfully!');
    return true;
  };

  // Only authenticated staff or Admin can update bio & contact
  const updateTeacherBio = (teacherId: string, bio: string, phone?: string): boolean => {
    const isSelf = currentAuthenticatedStaff?.id === teacherId;
    const isHead = isAdminAuthenticated || currentAuthenticatedStaff?.role.includes('Headteacher');

    if (!isSelf && !isHead) {
      showToast('Permission denied: You must be logged in with your staff credential to update your bio.');
      return false;
    }

    setTeachers((prev) =>
      prev.map((t) => (t.id === teacherId ? { ...t, bio, ...(phone ? { phone } : {}) } : t))
    );

    if (currentAuthenticatedStaff?.id === teacherId) {
      setCurrentAuthenticatedStaff((prev) => prev ? { ...prev, bio, ...(phone ? { phone } : {}) } : null);
    }

    logAdminAction('edit_teacher', `Staff Bio Updated: ${teacherId}`, `Updated personal pedagogy bio & phone.`, teacherId);
    showToast('Staff biography updated successfully!');
    return true;
  };

  const assignTeacherPasscode = (teacherId: string, newPasscode: string) => {
    if (!isAdminAuthenticated) {
      showToast('Only Headteacher Admin can assign or change staff credentials.');
      return;
    }

    const tr = teachers.find(t => t.id === teacherId);
    setTeachers((prev) =>
      prev.map((t) => (t.id === teacherId ? { ...t, accessPasscode: newPasscode.trim() } : t))
    );

    logAdminAction(
      'update_credentials',
      `Teacher Credential Assigned: ${tr?.name || teacherId}`,
      `Assigned new portal passcode "${newPasscode.trim()}" to ${tr?.name || teacherId}.`,
      teacherId
    );
    showToast(`Assigned new access credential "${newPasscode.trim()}" to staff member!`);
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
    logAdminAction(
      'publish_news',
      `News Bulletin Published: ${newArticle.title}`,
      `Published announcement under category "${newArticle.category}" signed by ${newArticle.author}.`,
      newArticle.id
    );
    showToast(`Published bulletin: "${newArticle.title}" to school website!`);
  };

  const deleteNews = (id: string) => {
    const item = news.find(n => n.id === id);
    setNews((prev) => prev.filter((n) => n.id !== id));
    logAdminAction('delete_news', `News Removed: ${item?.title || id}`, `Removed bulletin from school website.`, id);
    showToast('News announcement removed.');
  };

  const addEvent = (eventData: Omit<EventItem, 'id'>) => {
    const newEvent: EventItem = {
      ...eventData,
      id: `evt-${Date.now()}`,
    };

    setEvents((prev) => [...prev, newEvent]);
    logAdminAction(
      'add_event',
      `Calendar Event Added: ${newEvent.title}`,
      `Scheduled event on ${newEvent.date} (${newEvent.time}) at ${newEvent.location}.`,
      newEvent.id
    );
    showToast(`Added calendar event: "${newEvent.title}"`);
  };

  const deleteEvent = (id: string) => {
    const evt = events.find(e => e.id === id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
    logAdminAction('delete_event', `Event Removed: ${evt?.title || id}`, `Removed calendar event from school schedule.`, id);
    showToast('Calendar event removed.');
  };

  const updateStudentMarks = (regNumber: string, updated: StudentResult) => {
    setStudents((prev) => ({
      ...prev,
      [regNumber]: updated,
    }));
    logAdminAction(
      'update_marks',
      `Marks Updated: ${updated.studentName}`,
      `Updated academic term performance (${updated.overallPercentage}%, ${updated.rank}) for ${regNumber}.`,
      regNumber
    );
    showToast(`Updated official report card for ${updated.studentName} (${regNumber})!`);
  };

  const addStudent = (newStudent: StudentResult) => {
    const reg = newStudent.regNumber.toUpperCase();
    const pin = newStudent.accessPin || 'MUGINA2026';
    const studentWithPin = { ...newStudent, accessPin: pin };
    setStudents((prev) => ({
      ...prev,
      [reg]: studentWithPin,
    }));
    logAdminAction(
      'enroll_student',
      `New Pupil Enrolled: ${newStudent.studentName}`,
      `Enrolled into ${newStudent.stream} (${reg}) with portal access PIN "${pin}".`,
      reg
    );
    showToast(`Enrolled ${newStudent.studentName} into ${newStudent.stream}! Access PIN: ${pin}`);
  };

  const deleteStudent = (regNumber: string) => {
    const reg = regNumber.toUpperCase();
    const stName = students[reg]?.studentName || reg;
    setStudents((prev) => {
      const copy = { ...prev };
      delete copy[reg];
      return copy;
    });
    logAdminAction(
      'delete_student',
      `Student Record Deleted: ${stName}`,
      `Deleted student record and terminal results for registration number ${reg}.`,
      reg
    );
    showToast(`Removed student record for ${stName} (${reg}).`);
  };

  const assignStudentPin = (regNumber: string, newPin: string) => {
    const reg = regNumber.toUpperCase();
    if (!students[reg]) return;
    const cleanPin = newPin.trim();
    setStudents((prev) => ({
      ...prev,
      [reg]: {
        ...prev[reg],
        accessPin: cleanPin,
      },
    }));
    logAdminAction(
      'update_credentials',
      `Student Access PIN Updated: ${reg}`,
      `Assigned new portal access PIN "${cleanPin}" to ${students[reg].studentName}.`,
      reg
    );
    showToast(`Assigned new portal access PIN to ${students[reg].studentName} (${reg})!`);
  };

  const addLibraryDocument = (docData: Omit<EResource, 'id' | 'downloads'>) => {
    const newDoc: EResource = {
      ...docData,
      id: `doc-${Date.now()}`,
      downloads: 1,
    };
    setLibraryDocuments((prev) => [newDoc, ...prev]);
    logAdminAction(
      'library_doc',
      `Library Resource Added: ${newDoc.title}`,
      `Uploaded resource (${newDoc.category}) for ${newDoc.level}.`,
      newDoc.id
    );
    showToast(`Added PDF document "${newDoc.title}" to student library!`);
  };

  const deleteLibraryDocument = (id: string) => {
    const doc = libraryDocuments.find(d => d.id === id);
    setLibraryDocuments((prev) => prev.filter((d) => d.id !== id));
    logAdminAction('library_doc', `Library Doc Removed: ${doc?.title || id}`, `Removed document from library.`, id);
    showToast('Document removed from digital library.');
  };

  const saveAllToBackend = async (partialData?: Record<string, any>): Promise<boolean> => {
    try {
      const payload = {
        schoolLogo,
        teachers,
        news,
        events,
        students,
        libraryDocuments,
        ...(partialData || {}),
      };
      const res = await fetch('/api/school-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsBackendConnected(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const exportDataBackup = () => {
    const backup = {
      schoolName: 'GS St Isidore Mugina',
      schoolLogo,
      teachers,
      news,
      events,
      students,
      libraryDocuments,
      exportedAt: new Date().toISOString(),
      registeredAdmin: '0788249507 (Habiyaremye Charles)',
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gs-mugina-school-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded website configuration JSON for GitHub repository!');
  };

  return (
    <SchoolContext.Provider
      value={{
        language,
        setLanguage,
        t,
        schoolLogo,
        updateSchoolLogo,
        updateTeacherPhoto,
        updateTeacherBio,
        assignTeacherPasscode,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        adminCodeError,
        currentAuthenticatedStaff,
        loginStaff,
        logoutStaff,
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
        deleteStudent,
        assignStudentPin,
        adminActivityLogs,
        logAdminAction,
        clearActivityLogs,
        libraryDocuments,
        addLibraryDocument,
        deleteLibraryDocument,
        notificationToast,
        setNotificationToast,
        saveAllToBackend,
        exportDataBackup,
        isBackendConnected,
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
