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
}
