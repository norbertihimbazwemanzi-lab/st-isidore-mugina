export type SchoolCycleCategory = 'all' | 'nursery' | 'primary' | 'secondary';

export interface ClassStreamInfo {
  grade: string;
  cycle: 'nursery' | 'primary' | 'secondary';
  streams: string[];
  ageGroup: string;
  leadTeacher: string;
  subjectsCount: number;
  totalStudents: number;
  description: string;
}

export interface AcademicLevel {
  id: string;
  name: string;
  kinyarwandaName: string;
  code: string;
  category: 'nursery' | 'primary' | 'secondary';
  grades: string;
  streamsSummary: string;
  description: string;
  admissionRequirements: string;
  keySubjects: string[];
  literacyFocus: string;
  certification: string;
  curriculumBoard: 'REB' | 'NESA' | 'MINEDUC';
  icon: string;
}

export interface PDFDocumentPage {
  pageNumber: number;
  heading?: string;
  text: string;
}

export interface EResource {
  id: string;
  title: string;
  code: string;
  level: string;
  category: 'past_papers' | 'notes' | 'curriculum' | 'literacy';
  subject: string;
  fileSize: string;
  year: string;
  downloads: number;
  description: string;
  uploadedBy?: string;
  uploadDate?: string;
  pages?: PDFDocumentPage[];
  pdfDataUrl?: string; // base64 Data URL or blob URL for uploaded PDF
}

export interface StudentTermHistory {
  term: string; // e.g. "Term 1", "Term 2", "Term 3"
  academicYear: string;
  percentage: number;
  classAverage: number;
  rank: string;
  attendanceRate: number;
  subjectsSummary?: {
    subject: string;
    score: number;
    maxScore: number;
    grade: string;
  }[];
}

export interface StudentResult {
  regNumber: string;
  studentName: string;
  program: string;
  level: string;
  stream: string;
  academicYear: string;
  term: string;
  overallPercentage: number;
  rank: string;
  conduct: string;
  attendanceRate: number;
  classTeacher: string;
  accessPin?: string; // Admin-assigned student credential
  termHistory?: StudentTermHistory[];
  subjects: {
    name: string;
    code: string;
    maxScore: number;
    score: number;
    grade: string;
    remarks: string;
  }[];
  generalComments: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  image?: string;
  author: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
}

export type Language = 'en' | 'rw' | 'fr';

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  classAssigned: string; // e.g. "Primary 6 - Stream A" or "Executive Administration"
  subjectsTaught: string[]; // e.g. ["Mathematics", "Science & SET"]
  qualification: string;
  phone?: string;
  email?: string;
  bio: string;
  avatarInitials: string;
  photoUrl?: string; // base64 Data URL or remote image URL
  accessPasscode?: string; // Admin-granted credential for teacher to edit their own profile & photo
}

export type AdminActionCategory =
  | 'enroll_student'
  | 'update_marks'
  | 'delete_student'
  | 'update_credentials'
  | 'add_teacher'
  | 'edit_teacher'
  | 'delete_teacher'
  | 'publish_news'
  | 'delete_news'
  | 'add_event'
  | 'delete_event'
  | 'upload_media'
  | 'system_sync'
  | 'library_doc';

export interface AdminLogEntry {
  id: string;
  timestamp: string; // Formatted date string e.g. "Oct 3, 2026, 09:20 AM"
  isoDate: string; // ISO 8601 string for accurate sorting
  adminName: string; // e.g. "Habiyaremye Charles (Headteacher)"
  category: AdminActionCategory;
  title: string;
  description: string;
  targetId?: string; // e.g. student regNumber or teacher ID
  ipOrDevice?: string;
}

