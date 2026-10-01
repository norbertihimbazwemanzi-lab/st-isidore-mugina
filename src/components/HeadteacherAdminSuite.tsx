import React, { useState } from 'react';
import { 
  Users, Calendar, Bell, GraduationCap, Plus, Trash2, Edit2, 
  Save, X, CheckCircle2, AlertCircle, BookOpen, Clock, MapPin, 
  Tag, Phone, Mail, Award, Lock, LogOut, Send, UserCheck, ShieldCheck, Key, FileText,
  TrendingUp, BarChart3, Image as ImageIcon, Upload, Camera, RefreshCw
} from 'lucide-react';
import { useSchool, HEADTEACHER_ADMIN_CODE } from '../context/SchoolContext';
import { StudentResult, StaffMember } from '../types';
import { PerformanceAnalyticsDashboard } from './PerformanceAnalyticsDashboard';

interface HeadteacherAdminSuiteProps {
  onClose: () => void;
}

export const HeadteacherAdminSuite: React.FC<HeadteacherAdminSuiteProps> = ({ onClose }) => {
  const { 
    isAdminAuthenticated, 
    loginAdmin, 
    logoutAdmin, 
    adminCodeError,
    teachers, 
    addTeacher, 
    editTeacher, 
    deleteTeacher,
    updateTeacherPhoto,
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
    schoolLogo,
    updateSchoolLogo,
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'analytics' | 'teachers' | 'calendar' | 'news' | 'marks' | 'library' | 'branding'>('analytics');
  const [codeInput, setCodeInput] = useState('');

  // 1. Teacher Edit and Add state
  const [editingTeacher, setEditingTeacher] = useState<StaffMember | null>(null);
  const [editTeacherForm, setEditTeacherForm] = useState({
    name: '',
    role: 'Class Teacher',
    department: 'Primary Section (P1 - P6)',
    classAssigned: 'Primary 1 (Stream A)',
    subjectsInput: 'Mathematics, Kinyarwanda Reading',
    qualification: 'Diploma in Primary Education (CBC Certified)',
    phone: '0788249507',
    email: '',
    bio: 'Dedicated teacher fostering reading, numeracy, and discipline.',
  });

  const [teacherForm, setTeacherForm] = useState({
    name: '',
    role: 'Class Teacher',
    department: 'Primary Section (P1 - P6)',
    classAssigned: 'Primary 1 (Stream A)',
    subjectsInput: 'Mathematics, Kinyarwanda Reading',
    qualification: 'Diploma in Primary Education (CBC Certified)',
    phone: '0788249507',
    email: '',
    bio: 'Dedicated teacher fostering reading, numeracy, and discipline.',
  });

  // Admin Library Document Insert State
  const [adminDocForm, setAdminDocForm] = useState({
    title: '',
    subject: 'Mathematics',
    level: 'Primary 6 (PLE)',
    category: 'past_papers' as 'past_papers' | 'literacy' | 'notes' | 'curriculum',
    description: '',
    pageHeading: 'SECTION A: EXAMINATION QUESTIONS',
    pageText: '',
  });

  // 2. New Calendar Event Form state
  const [eventForm, setEventForm] = useState({
    title: '',
    date: 'Wednesday, May 13, 2026',
    time: '08:00 AM - 04:00 PM',
    location: 'Main School Hall & Classrooms',
    category: 'Academic',
    description: '',
  });

  // 3. New News Article Form state
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Literacy & Reading',
    summary: '',
    content: '',
    author: 'Habiyaremye Charles (Headteacher)',
  });

  // 4. Student Marks edit state
  const [editingStudent, setEditingStudent] = useState<StudentResult | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [adminStreamFilter, setAdminStreamFilter] = useState('all');

  const [newStudentForm, setNewStudentForm] = useState<StudentResult>({
    regNumber: `MUG-2026-${Math.floor(100 + Math.random() * 900)}`,
    studentName: '',
    program: 'Primary Education (Amashuri Abanza)',
    level: 'Primary 5',
    stream: 'Stream A (P5: A)',
    academicYear: '2025 - 2026',
    term: 'Term 2',
    overallPercentage: 80,
    rank: '12th / 52 Students',
    conduct: 'Very Good (18/20)',
    attendanceRate: 96,
    classTeacher: 'M. Ndayisaba Jean',
    subjects: [
      { name: 'Mathematics', code: 'PMTH', maxScore: 100, score: 82, grade: 'B+', remarks: 'Good work' },
      { name: 'Science & SET', code: 'PSET', maxScore: 100, score: 85, grade: 'A', remarks: 'Active in science experiments' },
      { name: 'English Language', code: 'PENG', maxScore: 100, score: 80, grade: 'B+', remarks: 'Growing reading fluency' },
      { name: 'Kinyarwanda', code: 'PKIN', maxScore: 100, score: 88, grade: 'A', remarks: 'Imyandikire myiza' },
      { name: 'Social Studies', code: 'PSST', maxScore: 100, score: 81, grade: 'B+', remarks: 'Consistent participation' },
    ],
    generalComments: 'Dedicated learner showing consistent effort in class and reading club.'
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(codeInput);
  };

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherForm.name.trim()) return;

    const subjectsArray = teacherForm.subjectsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    addTeacher({
      name: teacherForm.name.trim(),
      role: teacherForm.role,
      department: teacherForm.department,
      classAssigned: teacherForm.classAssigned,
      subjectsTaught: subjectsArray.length > 0 ? subjectsArray : ['General CBC Curriculum'],
      qualification: teacherForm.qualification,
      phone: teacherForm.phone,
      email: teacherForm.email || `${teacherForm.name.toLowerCase().replace(/\s+/g, '.')}@gssidoremugina.rw`,
      bio: teacherForm.bio,
    });

    // Reset form
    setTeacherForm({
      name: '',
      role: 'Class Teacher',
      department: 'Primary Section (P1 - P6)',
      classAssigned: 'Primary 1 (Stream A)',
      subjectsInput: 'Mathematics, Kinyarwanda Reading',
      qualification: 'Diploma in Primary Education',
      phone: '0788249507',
      email: '',
      bio: 'Dedicated teacher fostering reading and discipline.',
    });
  };

  const handleStartEditTeacher = (tr: StaffMember) => {
    setEditingTeacher(tr);
    setEditTeacherForm({
      name: tr.name,
      role: tr.role,
      department: tr.department,
      classAssigned: tr.classAssigned,
      subjectsInput: tr.subjectsTaught.join(', '),
      qualification: tr.qualification,
      phone: tr.phone || '0788249507',
      email: tr.email || '',
      bio: tr.bio,
    });
  };

  const handleSaveEditTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher || !editTeacherForm.name.trim()) return;

    const subjectsArray = editTeacherForm.subjectsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    editTeacher(editingTeacher.id, {
      name: editTeacherForm.name.trim(),
      role: editTeacherForm.role.trim(),
      department: editTeacherForm.department.trim(),
      classAssigned: editTeacherForm.classAssigned,
      subjectsTaught: subjectsArray.length > 0 ? subjectsArray : ['General CBC Curriculum'],
      qualification: editTeacherForm.qualification.trim(),
      phone: editTeacherForm.phone.trim(),
      email: editTeacherForm.email.trim(),
      bio: editTeacherForm.bio.trim(),
    });

    setEditingTeacher(null);
  };

  const handleCancelEditTeacher = () => {
    setEditingTeacher(null);
  };

  const handleInsertAdminDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminDocForm.title.trim()) return;

    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const dateFormatted = new Date().toLocaleDateString('en-US', options);
    const code = `${adminDocForm.level.slice(0, 2).toUpperCase()}-${adminDocForm.subject.slice(0, 3).toUpperCase()}-26`;

    addLibraryDocument({
      title: adminDocForm.title.trim(),
      code,
      level: adminDocForm.level,
      category: adminDocForm.category,
      subject: adminDocForm.subject,
      fileSize: '3.1 MB',
      year: '2026',
      description: adminDocForm.description.trim() || `Official school resource for ${adminDocForm.level}`,
      uploadedBy: 'Habiyaremye Charles (Headteacher)',
      uploadDate: dateFormatted,
      pages: [
        {
          pageNumber: 1,
          heading: adminDocForm.pageHeading || 'SECTION A: EXERCISES & SOLUTIONS',
          text: adminDocForm.pageText || adminDocForm.description || 'Instructional material for learners.',
        }
      ],
    });

    setAdminDocForm({
      title: '',
      subject: 'Mathematics',
      level: 'Primary 6 (PLE)',
      category: 'past_papers',
      description: '',
      pageHeading: 'SECTION A: EXAMINATION QUESTIONS',
      pageText: '',
    });
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title.trim()) return;

    addEvent({
      title: eventForm.title.trim(),
      date: eventForm.date,
      time: eventForm.time,
      location: eventForm.location,
      category: eventForm.category,
      description: eventForm.description.trim(),
    });

    setEventForm({
      title: '',
      date: 'Wednesday, May 13, 2026',
      time: '08:00 AM - 04:00 PM',
      location: 'Main School Hall & Classrooms',
      category: 'Academic',
      description: '',
    });
  };

  const handlePublishNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title.trim() || !newsForm.summary.trim()) return;

    publishNews({
      title: newsForm.title.trim(),
      category: newsForm.category,
      summary: newsForm.summary.trim(),
      content: newsForm.content.trim() || newsForm.summary.trim(),
      author: newsForm.author || 'Habiyaremye Charles (Headteacher)',
    });

    setNewsForm({
      title: '',
      category: 'Literacy & Reading',
      summary: '',
      content: '',
      author: 'Habiyaremye Charles (Headteacher)',
    });
  };

  const allStudents = Object.values(students);
  const filteredStudents = allStudents.filter((s) => {
    if (adminStreamFilter === 'all') return true;
    return s.stream.toLowerCase().includes(adminStreamFilter.toLowerCase()) ||
           s.level.toLowerCase().includes(adminStreamFilter.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-amber-500/50 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-200">
        
        {/* ================= HEADER ================= */}
        <div className="p-5 sm:p-6 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-lg">
              HC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Headteacher Administrative Suite
                </h3>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-bold">
                  CODE: {HEADTEACHER_ADMIN_CODE}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Logged in: <strong>Habiyaremye Charles (Headteacher)</strong> · GS St Isidore Mugina
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <>
                {/* Direct File Input to upload custom school website logo */}
                <label
                  htmlFor="quick-admin-logo-upload"
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-200 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/50 rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors shadow-xs"
                  title="Upload school website logo from your computer"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Upload School Logo</span>
                </label>
                <input
                  id="quick-admin-logo-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const dataUrl = ev.target?.result as string;
                        if (dataUrl) updateSchoolLogo(dataUrl);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />

                <button
                  onClick={logoutAdmin}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                  title="Log out from Headteacher session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= BODY ================= */}
        {!isAdminAuthenticated ? (
          /* LOGIN PROMPT */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-5">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30 shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Enter Headteacher Security Code</h4>
              <p className="text-xs text-slate-400 mt-1">
                Authorized access for Headteacher <strong>Habiyaremye Charles</strong> to manage teachers, classes, calendar, news, and student marks.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <input
                type="password"
                autoFocus
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Enter confidential security code..."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-center text-sm font-mono text-white tracking-widest focus:outline-none focus:border-amber-400"
              />

              {adminCodeError && (
                <div className="p-3 bg-rose-950/80 border border-rose-800 rounded-lg text-xs text-rose-300 flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{adminCodeError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Key className="w-4 h-4" />
                <span>Verify & Unlock Headteacher Suite</span>
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED TABS & PANELS */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navigation Tabs */}
            <div className="bg-slate-950/60 border-b border-slate-800 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-3.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Performance Analytics</span>
              </button>

              <button
                onClick={() => setActiveTab('teachers')}
                className={`py-3.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'teachers'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Teachers & Allocations ({teachers.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className={`py-3.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'calendar'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Calendar & Events ({events.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('news')}
                className={`py-3.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'news'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Publish News ({news.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('marks')}
                className={`py-3.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'marks'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student Marks & Streams ({allStudents.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('library')}
                className={`py-3.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'library'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Digital Library PDFs ({libraryDocuments.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('branding')}
                className={`py-3.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'branding'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>School Logo & Branding</span>
              </button>
            </div>

            {/* TAB CONTENT AREA */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

              {/* ----------------- TAB: PERFORMANCE ANALYTICS DASHBOARD ----------------- */}
              {activeTab === 'analytics' && (
                <PerformanceAnalyticsDashboard />
              )}

              {/* ----------------- TAB 1: TEACHERS & CLASS ALLOCATIONS ----------------- */}
              {activeTab === 'teachers' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* EDIT TEACHER FORM (Shown when editing a staff member) */}
                  {editingTeacher ? (
                    <div className="p-5 sm:p-6 rounded-2xl bg-amber-950/40 border-2 border-amber-500/70 shadow-xl">
                      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-amber-500/30">
                        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                          <Edit2 className="w-4 h-4 text-amber-400" />
                          <span>Edit & Update Staff Member: <strong className="text-white">{editingTeacher.name}</strong></span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCancelEditTeacher}
                          className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                        >
                          Cancel Edit
                        </button>
                      </div>

                      <form onSubmit={handleSaveEditTeacher} className="space-y-4 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-slate-300 mb-1 font-semibold">Teacher Full Name *</label>
                            <input
                              type="text"
                              required
                              value={editTeacherForm.name}
                              onChange={(e) => setEditTeacherForm({ ...editTeacherForm, name: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-900 border border-amber-500/50 rounded-lg text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-300 mb-1 font-semibold">Allocated Class Stream *</label>
                            <select
                              value={editTeacherForm.classAssigned}
                              onChange={(e) => setEditTeacherForm({ ...editTeacherForm, classAssigned: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-900 border border-amber-500/50 rounded-lg text-white"
                            >
                              <optgroup label="General Administration & Governance">
                                <option value="General School Oversight & Leadership">General School Oversight & Leadership (Headteacher)</option>
                                <option value="Administration & School Bursary">Administration & School Bursary (Comptable)</option>
                                <option value="General School Academics">General School Academics (DOS)</option>
                              </optgroup>
                              <optgroup label="Pre-Primary / Nursery (Amashuri y'Inshuke)">
                                <option value="Nursery - Baby Class">Nursery: Baby Class</option>
                                <option value="Nursery - Middle Class">Nursery: Middle Class</option>
                                <option value="Nursery - Top Class">Nursery: Top Class</option>
                              </optgroup>
                              <optgroup label="Primary Education (Amashuri Abanza P1 - P6)">
                                <option value="Primary 1 (Stream A)">Primary 1 (Stream A)</option>
                                <option value="Primary 1 (Stream B)">Primary 1 (Stream B)</option>
                                <option value="Primary 1 (Stream C)">Primary 1 (Stream C)</option>
                                <option value="Primary 2 (Stream A)">Primary 2 (Stream A)</option>
                                <option value="Primary 2 (Stream B)">Primary 2 (Stream B)</option>
                                <option value="Primary 3 (Stream A)">Primary 3 (Stream A)</option>
                                <option value="Primary 3 (Stream B)">Primary 3 (Stream B)</option>
                                <option value="Primary 4 (Stream A)">Primary 4 (Stream A)</option>
                                <option value="Primary 4 (Stream B)">Primary 4 (Stream B)</option>
                                <option value="Primary 4 (Stream C)">Primary 4 (Stream C)</option>
                                <option value="Primary 5 (Stream A)">Primary 5 (Stream A)</option>
                                <option value="Primary 5 (Stream B)">Primary 5 (Stream B)</option>
                                <option value="Primary 6 (Stream A - PLE)">Primary 6 (Stream A - PLE)</option>
                                <option value="Primary 6 (Stream B - PLE)">Primary 6 (Stream B - PLE)</option>
                              </optgroup>
                              <optgroup label="Secondary Ordinary Level (S1 - S3)">
                                <option value="Senior 1 (Stream A)">Senior 1 (Stream A)</option>
                                <option value="Senior 1 (Stream B)">Senior 1 (Stream B)</option>
                                <option value="Senior 1 (Stream C)">Senior 1 (Stream C)</option>
                                <option value="Senior 2 (Stream A)">Senior 2 (Stream A)</option>
                                <option value="Senior 2 (Stream B)">Senior 2 (Stream B)</option>
                                <option value="Senior 2 (Stream C)">Senior 2 (Stream C)</option>
                                <option value="Senior 3 (Stream A - NESA)">Senior 3 (Stream A - NESA)</option>
                                <option value="Senior 3 (Stream B - NESA)">Senior 3 (Stream B - NESA)</option>
                              </optgroup>
                            </select>
                          </div>

                          <div>
                            <label className="block text-slate-300 mb-1 font-semibold">Role / Position *</label>
                            <input
                              type="text"
                              required
                              value={editTeacherForm.role}
                              onChange={(e) => setEditTeacherForm({ ...editTeacherForm, role: e.target.value })}
                              placeholder="e.g. Lead Teacher / Bursar / Headteacher"
                              className="w-full px-3 py-2 bg-slate-900 border border-amber-500/50 rounded-lg text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-slate-300 mb-1 font-semibold">
                              Subjects Taught (separate with comma) *
                            </label>
                            <input
                              type="text"
                              required
                              value={editTeacherForm.subjectsInput}
                              onChange={(e) => setEditTeacherForm({ ...editTeacherForm, subjectsInput: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-900 border border-amber-500/50 rounded-lg text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-300 mb-1 font-semibold">Contact Phone</label>
                            <input
                              type="tel"
                              value={editTeacherForm.phone}
                              onChange={(e) => setEditTeacherForm({ ...editTeacherForm, phone: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-900 border border-amber-500/50 rounded-lg text-white font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-300 mb-1">Academic Qualification</label>
                            <input
                              type="text"
                              value={editTeacherForm.qualification}
                              onChange={(e) => setEditTeacherForm({ ...editTeacherForm, qualification: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-900 border border-amber-500/50 rounded-lg text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-300 mb-1">Pedagogical Bio / Notes</label>
                            <input
                              type="text"
                              value={editTeacherForm.bio}
                              onChange={(e) => setEditTeacherForm({ ...editTeacherForm, bio: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-900 border border-amber-500/50 rounded-lg text-white"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                          <button
                            type="button"
                            onClick={handleCancelEditTeacher}
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Staff Changes</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    /* ADD NEW TEACHER CARD FORM */
                    <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-md">
                      <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold text-sm">
                        <Plus className="w-4 h-4" />
                        <span>Add New Teacher & Allocate Class Stream and Subjects</span>
                      </div>

                      <form onSubmit={handleCreateTeacher} className="space-y-4 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-slate-400 mb-1 font-semibold">Teacher Full Name *</label>
                            <input
                              type="text"
                              required
                              value={teacherForm.name}
                              onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                              placeholder="e.g. Uwizeyimana Therese"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-400 mb-1 font-semibold">Allocated Class Stream (18 Streams) *</label>
                            <select
                              value={teacherForm.classAssigned}
                              onChange={(e) => setTeacherForm({ ...teacherForm, classAssigned: e.target.value })}
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                            >
                              <optgroup label="Pre-Primary / Nursery (Amashuri y'Inshuke)">
                                <option value="Nursery - Baby Class">Nursery: Baby Class</option>
                                <option value="Nursery - Middle Class">Nursery: Middle Class</option>
                                <option value="Nursery - Top Class">Nursery: Top Class</option>
                              </optgroup>
                              <optgroup label="Primary Education (Amashuri Abanza P1 - P6)">
                                <option value="Primary 1 (Stream A)">Primary 1 (Stream A)</option>
                                <option value="Primary 1 (Stream B)">Primary 1 (Stream B)</option>
                                <option value="Primary 1 (Stream C)">Primary 1 (Stream C)</option>
                                <option value="Primary 2 (Stream A)">Primary 2 (Stream A)</option>
                                <option value="Primary 2 (Stream B)">Primary 2 (Stream B)</option>
                                <option value="Primary 3 (Stream A)">Primary 3 (Stream A)</option>
                                <option value="Primary 3 (Stream B)">Primary 3 (Stream B)</option>
                                <option value="Primary 4 (Stream A)">Primary 4 (Stream A)</option>
                                <option value="Primary 4 (Stream B)">Primary 4 (Stream B)</option>
                                <option value="Primary 4 (Stream C)">Primary 4 (Stream C)</option>
                                <option value="Primary 5 (Stream A)">Primary 5 (Stream A)</option>
                                <option value="Primary 5 (Stream B)">Primary 5 (Stream B)</option>
                                <option value="Primary 6 (Stream A - PLE)">Primary 6 (Stream A - PLE)</option>
                                <option value="Primary 6 (Stream B - PLE)">Primary 6 (Stream B - PLE)</option>
                              </optgroup>
                              <optgroup label="Secondary Ordinary Level (S1 - S3)">
                                <option value="Senior 1 (Stream A)">Senior 1 (Stream A)</option>
                                <option value="Senior 1 (Stream B)">Senior 1 (Stream B)</option>
                                <option value="Senior 1 (Stream C)">Senior 1 (Stream C)</option>
                                <option value="Senior 2 (Stream A)">Senior 2 (Stream A)</option>
                                <option value="Senior 2 (Stream B)">Senior 2 (Stream B)</option>
                                <option value="Senior 2 (Stream C)">Senior 2 (Stream C)</option>
                                <option value="Senior 3 (Stream A - NESA)">Senior 3 (Stream A - NESA)</option>
                                <option value="Senior 3 (Stream B - NESA)">Senior 3 (Stream B - NESA)</option>
                              </optgroup>
                            </select>
                          </div>

                          <div>
                            <label className="block text-slate-400 mb-1 font-semibold">Role / Title *</label>
                            <input
                              type="text"
                              required
                              value={teacherForm.role}
                              onChange={(e) => setTeacherForm({ ...teacherForm, role: e.target.value })}
                              placeholder="e.g. Lead Teacher / Subject Specialist"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-slate-400 mb-1 font-semibold">
                              Subject(s) Taught (separate with comma) *
                            </label>
                            <input
                              type="text"
                              required
                              value={teacherForm.subjectsInput}
                              onChange={(e) => setTeacherForm({ ...teacherForm, subjectsInput: e.target.value })}
                              placeholder="e.g. Mathematics, Science & SET, Kinyarwanda Reading"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-400 mb-1 font-semibold">Teacher Phone Number</label>
                            <input
                              type="tel"
                              value={teacherForm.phone}
                              onChange={(e) => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                              placeholder="0788249507"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-400 mb-1">Academic Qualification</label>
                            <input
                              type="text"
                              value={teacherForm.qualification}
                              onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                              placeholder="e.g. A2 Certificate / Diploma / B.Ed."
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">Teacher Brief Note</label>
                            <input
                              type="text"
                              value={teacherForm.bio}
                              onChange={(e) => setTeacherForm({ ...teacherForm, bio: e.target.value })}
                              placeholder="Focus on early reading and student care..."
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            type="submit"
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Assign Teacher to Class</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Active Teachers List with Edit and Delete options */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Current Teaching & Administrative Staff ({teachers.length} Members)
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {teachers.map((tr) => (
                        <div
                          key={tr.id}
                          className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-start justify-between gap-3 hover:border-slate-600 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative group shrink-0">
                              {tr.photoUrl ? (
                                <img
                                  src={tr.photoUrl}
                                  alt={tr.name}
                                  className="w-10 h-10 rounded-lg object-cover border border-emerald-500/50"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-emerald-950 text-emerald-300 font-bold flex items-center justify-center border border-emerald-700/50">
                                  {tr.avatarInitials}
                                </div>
                              )}
                              <label
                                htmlFor={`admin-tr-photo-${tr.id}`}
                                className="absolute -bottom-1 -right-1 p-0.5 bg-slate-900 hover:bg-slate-700 text-amber-400 rounded-full border border-slate-700 cursor-pointer shadow-xs"
                                title="Upload teacher profile picture"
                              >
                                <Camera className="w-3 h-3" />
                              </label>
                              <input
                                id={`admin-tr-photo-${tr.id}`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      const dataUrl = ev.target?.result as string;
                                      if (dataUrl) updateTeacherPhoto(tr.id, dataUrl);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </div>
                            <div>
                              <h5 className="text-sm font-bold text-white">{tr.name}</h5>
                              <p className="text-xs text-amber-400 font-semibold">{tr.role}</p>
                              
                              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                                <span className="text-[11px] font-mono bg-slate-900 px-2 py-0.5 rounded text-emerald-300 border border-slate-700">
                                  {tr.classAssigned}
                                </span>
                              </div>

                              <div className="mt-2 text-xs text-slate-300">
                                <span className="text-slate-400 font-semibold">Subjects: </span>
                                <span>{tr.subjectsTaught.join(', ')}</span>
                              </div>

                              <div className="mt-1 text-[11px] text-slate-400">
                                Tel: {tr.phone || '0788249507'}
                              </div>

                              <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50 w-fit">
                                <Key className="w-3 h-3 text-amber-400 shrink-0" />
                                <span>Credential: <strong>{tr.accessPasscode || 'TEACH-2026'}</strong></span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Edit Teacher Button */}
                            <button
                              onClick={() => handleStartEditTeacher(tr)}
                              className="px-2.5 py-1 text-xs text-amber-300 hover:text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 rounded-lg transition-colors flex items-center gap-1 cursor-pointer font-medium"
                              title="Edit teacher and class allocation"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            {tr.id !== 'staff-01' && (
                              <button
                                onClick={() => deleteTeacher(tr.id)}
                                className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-700/50 transition-colors"
                                title="Delete record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- TAB 2: SCHOOL CALENDAR & TERM EVENTS ----------------- */}
              {activeTab === 'calendar' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Add Event Form */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-md">
                    <div className="flex items-center gap-2 mb-4 text-amber-400 font-bold text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Add New Calendar Date / School Event</span>
                    </div>

                    <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">Event Title *</label>
                          <input
                            type="text"
                            required
                            value={eventForm.title}
                            onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                            placeholder="e.g. National Literacy & Reading Exhibition"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">Event Category *</label>
                          <select
                            value={eventForm.category}
                            onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          >
                            <option value="Academic">Academic (Exams & Assessments)</option>
                            <option value="Literacy">Literacy (National Library Reading)</option>
                            <option value="Community">Community (PTA Assembly & Parents)</option>
                            <option value="Sports">Sports & Cultural Itorero</option>
                            <option value="Holiday">School Term Holiday / Mid-term</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">Date *</label>
                          <input
                            type="text"
                            required
                            value={eventForm.date}
                            onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                            placeholder="e.g. Wednesday, May 13, 2026"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">Time & Location</label>
                          <input
                            type="text"
                            value={eventForm.time}
                            onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                            placeholder="08:30 AM - 04:00 PM"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1 font-semibold">Event Description</label>
                        <textarea
                          rows={2}
                          value={eventForm.description}
                          onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                          placeholder="Brief description for teachers, parents, and students..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Publish to School Calendar</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Active Calendar Events Roster */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Live School Calendar Items ({events.length})
                    </h4>

                    {events.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 border border-slate-700 flex items-center justify-center shrink-0">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{evt.title}</span>
                              <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                                {evt.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 mt-1">{evt.description}</p>
                            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-2 font-mono">
                              <span>📅 {evt.date}</span>
                              <span>⏰ {evt.time}</span>
                              <span>📍 {evt.location}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteEvent(evt.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                          title="Remove event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ----------------- TAB 3: PUBLISH SCHOOL NEWS & BULLETINS ----------------- */}
              {activeTab === 'news' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Create News Article */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-md">
                    <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold text-sm">
                      <Send className="w-4 h-4" />
                      <span>Publish Official Announcement to School Website</span>
                    </div>

                    <form onSubmit={handlePublishNewsSubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-slate-400 mb-1 font-semibold">Article Headline / Title *</label>
                          <input
                            type="text"
                            required
                            value={newsForm.title}
                            onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                            placeholder="e.g. Distribution of New Decodable Books to Primary 1–6"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">Category *</label>
                          <select
                            value={newsForm.category}
                            onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          >
                            <option value="Literacy & Reading">Literacy & Reading</option>
                            <option value="Admissions">Admissions & Enrolment</option>
                            <option value="Academic Excellence">Academic Excellence & Exams</option>
                            <option value="PTA & Community">PTA & Community</option>
                            <option value="School Feeding">School Feeding Program</option>
                            <option value="Administration Notice">Administration Notice</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1 font-semibold">Short Summary / Highlights *</label>
                        <input
                          type="text"
                          required
                          value={newsForm.summary}
                          onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                          placeholder="Brief 1-2 sentence lead-in shown on homepage..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1 font-semibold">Full Statement / Article Content *</label>
                        <textarea
                          rows={4}
                          required
                          value={newsForm.content}
                          onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                          placeholder="Detailed official statement from the school leadership..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white leading-relaxed"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">Author Sign-off</label>
                          <input
                            type="text"
                            value={newsForm.author}
                            onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>
                        <div className="flex items-end justify-end">
                          <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            <span>Publish Bulletin Live</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Published News Roster */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Published Bulletins ({news.length})
                    </h4>

                    {news.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 text-xs text-emerald-400 mb-1">
                            <span className="font-semibold">{item.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{item.date}</span>
                          </div>
                          <h5 className="text-sm font-bold text-white">{item.title}</h5>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.summary}</p>
                          <div className="text-[11px] text-slate-500 mt-2">
                            Signed: <strong>{item.author}</strong>
                          </div>
                        </div>

                        <button
                          onClick={() => deleteNews(item.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                          title="Remove bulletin"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ----------------- TAB 4: STUDENT MARKS & STREAMS ----------------- */}
              {activeTab === 'marks' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Controls Bar */}
                  <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-300">Filter by Stream:</span>
                      <select
                        value={adminStreamFilter}
                        onChange={(e) => setAdminStreamFilter(e.target.value)}
                        className="px-3 py-1.5 bg-slate-900 text-white border border-slate-700 rounded-lg focus:outline-none"
                      >
                        <option value="all">All 18 Streams ({allStudents.length} Records)</option>
                        <option value="Primary 6">Primary 6 (Streams A, B - PLE)</option>
                        <option value="Senior 3">Senior 3 (Streams A, B - NESA)</option>
                        <option value="Senior 1">Senior 1 (Streams A, B, C)</option>
                        <option value="Primary 4">Primary 4 (Streams A, B, C)</option>
                        <option value="Nursery">Nursery (Baby, Middle, Top)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('analytics')}
                        className="px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                        title="Jump to Student Performance Analytics Dashboard"
                      >
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>Performance Analytics</span>
                      </button>

                      <button
                        onClick={() => setIsAddingStudent(true)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Enroll New Pupil</span>
                      </button>
                    </div>
                  </div>

                  {/* Students Table */}
                  <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-700">
                          <tr>
                            <th className="py-3 px-4">Reg No</th>
                            <th className="py-3 px-4">Student Name</th>
                            <th className="py-3 px-4">Class Stream</th>
                            <th className="py-3 px-4 text-center">Score %</th>
                            <th className="py-3 px-4">Standing</th>
                            <th className="py-3 px-4">Conduct</th>
                            <th className="py-3 px-4">Class Mentor</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                          {filteredStudents.map((st) => (
                            <tr key={st.regNumber} className="hover:bg-slate-700/50">
                              <td className="py-3 px-4 font-mono font-bold text-amber-400">
                                {st.regNumber}
                              </td>
                              <td className="py-3 px-4 font-bold text-white">
                                {st.studentName}
                              </td>
                              <td className="py-3 px-4 font-mono text-slate-300">
                                {st.stream}
                              </td>
                              <td className="py-3 px-4 text-center font-mono font-bold text-emerald-400">
                                {st.overallPercentage}%
                              </td>
                              <td className="py-3 px-4 text-slate-300">
                                {st.rank}
                              </td>
                              <td className="py-3 px-4 text-slate-300">
                                {st.conduct}
                              </td>
                              <td className="py-3 px-4 text-slate-400">
                                {st.classTeacher}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => setEditingStudent({ ...st })}
                                  className="px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold inline-flex items-center gap-1"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                  <span>Edit Marks</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- TAB 5: DIGITAL LIBRARY & PDF DOCUMENTS ----------------- */}
              {activeTab === 'library' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Insert PDF Document Form */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-md">
                    <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold text-sm">
                      <Plus className="w-4 h-4" />
                      <span>Insert PDF Document or Exam Paper to Digital Library</span>
                    </div>

                    <form onSubmit={handleInsertAdminDoc} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1 font-semibold">Document Title *</label>
                        <input
                          type="text"
                          required
                          value={adminDocForm.title}
                          onChange={(e) => setAdminDocForm({ ...adminDocForm, title: e.target.value })}
                          placeholder="e.g. S3 Physics Laboratory Examination Practice 2026"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">Subject *</label>
                          <input
                            type="text"
                            required
                            value={adminDocForm.subject}
                            onChange={(e) => setAdminDocForm({ ...adminDocForm, subject: e.target.value })}
                            placeholder="e.g. Physics"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">Educational Level *</label>
                          <select
                            value={adminDocForm.level}
                            onChange={(e) => setAdminDocForm({ ...adminDocForm, level: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          >
                            <option value="Primary 6 (PLE)">Primary 6 (PLE)</option>
                            <option value="Senior 3 (NESA)">Senior 3 (NESA)</option>
                            <option value="Primary 5">Primary 5</option>
                            <option value="Primary 4">Primary 4</option>
                            <option value="Primary 1 - 3">Primary 1 - 3</option>
                            <option value="Senior 1 - 2">Senior 1 - 2</option>
                            <option value="Nursery">Nursery (Baby to Top)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1 font-semibold">Category *</label>
                          <select
                            value={adminDocForm.category}
                            onChange={(e) => setAdminDocForm({ ...adminDocForm, category: e.target.value as any })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          >
                            <option value="past_papers">PLE & S3 National Exams</option>
                            <option value="literacy">National Library Decodable Stories</option>
                            <option value="notes">CBC Revision Handouts</option>
                            <option value="curriculum">Syllabus & Worksheets</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Document Description</label>
                        <input
                          type="text"
                          value={adminDocForm.description}
                          onChange={(e) => setAdminDocForm({ ...adminDocForm, description: e.target.value })}
                          placeholder="Comprehensive examination revision material with step-by-step marking rubrics..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Document Reading Content (Questions / Notes)</label>
                        <textarea
                          rows={3}
                          value={adminDocForm.pageText}
                          onChange={(e) => setAdminDocForm({ ...adminDocForm, pageText: e.target.value })}
                          placeholder="Type or paste sample examination questions, solutions, or reading notes here..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs"
                        />
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Publish Document to Digital Library</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Active Library Documents List */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Current Digital Library Holdings ({libraryDocuments.length} Documents)
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {libraryDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start justify-between gap-3 hover:border-slate-600 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center shrink-0 border border-emerald-700/50">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono mb-0.5">
                                <span>{doc.code}</span>
                                <span>·</span>
                                <span>{doc.level}</span>
                              </div>
                              <h5 className="text-xs font-bold text-white line-clamp-1">{doc.title}</h5>
                              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{doc.description}</p>
                              <div className="mt-2 text-[10px] text-slate-500">
                                Subject: <span className="text-slate-300 font-medium">{doc.subject}</span> · Size: {doc.fileSize}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => deleteLibraryDocument(doc.id)}
                            className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-700/50 transition-colors shrink-0"
                            title="Remove document from library"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- TAB: SCHOOL LOGO & BRANDING ----------------- */}
              {activeTab === 'branding' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-md space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                        <ImageIcon className="w-4 h-4" />
                        <span>Website Custom Branding</span>
                      </div>
                      <h4 className="text-xl font-bold text-white">
                        Upload School Website Logo from Computer
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                        Upload your official GS Saint Isidore Mugina emblem or badge from your local files. Once uploaded, this logo immediately replaces the default placeholder crest in the top navigation bar, student report cards, and footer.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                      {/* Current Logo Preview Card */}
                      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700/80 flex flex-col items-center justify-center text-center space-y-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Current Active Logo
                        </span>
                        
                        <div className="w-28 h-28 rounded-2xl bg-slate-800 border-2 border-emerald-500/50 flex items-center justify-center overflow-hidden p-2 shadow-inner">
                          {schoolLogo ? (
                            <img
                              src={schoolLogo}
                              alt="Current School Logo"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="flex flex-col items-center text-emerald-300">
                              <GraduationCap className="w-12 h-12 text-emerald-400 mb-1" />
                              <span className="text-[10px] font-bold">Default Crest</span>
                            </div>
                          )}
                        </div>

                        <div className="text-center">
                          <p className="text-xs font-bold text-white">
                            {schoolLogo ? 'Custom School Logo Active' : 'Default Academic Crest'}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {schoolLogo 
                              ? 'Stored locally and visible across all website components.'
                              : 'Upload an image file below to replace with your school emblem.'}
                          </p>
                        </div>
                      </div>

                      {/* Upload Controls & Actions */}
                      <div className="flex flex-col justify-between p-6 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-4">
                        <div className="space-y-3">
                          <label className="block text-xs font-bold text-slate-200">
                            Select School Logo File:
                          </label>
                          <input
                            type="file"
                            id="admin-school-logo-input"
                            accept="image/png,image/jpeg,image/webp,image/svg+xml"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              if (!file.type.startsWith('image/')) {
                                alert('Please select a valid image file (PNG, JPG, SVG, WebP).');
                                return;
                              }

                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const dataUrl = ev.target?.result as string;
                                if (dataUrl) {
                                  updateSchoolLogo(dataUrl);
                                }
                              };
                              reader.readAsDataURL(file);
                            }}
                          />

                          <label
                            htmlFor="admin-school-logo-input"
                            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md hover:scale-[1.01]"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Choose Logo Image File from Computer...</span>
                          </label>

                          {schoolLogo && (
                            <button
                              type="button"
                              onClick={() => updateSchoolLogo(null)}
                              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-800/40 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                            >
                              <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
                              <span>Reset to Default School Crest</span>
                            </button>
                          )}
                        </div>

                        <div className="text-[11px] text-slate-400 space-y-1.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                          <span className="font-bold text-slate-300 block">Recommended Specifications:</span>
                          <p>• Transparent PNG, SVG, or crisp JPG.</p>
                          <p>• Square or circular layout (recommended 256×256 or 512×512).</p>
                          <p>• File is stored directly in browser local storage and persists across reloads.</p>
                        </div>
                      </div>
                    </div>

                    {/* Live Preview Bar */}
                    <div className="pt-4 border-t border-slate-700">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                        Live Preview: How It Appears on the Website Navbar
                      </span>
                      <div className="p-4 rounded-xl bg-white text-slate-900 border border-slate-200 flex items-center gap-3.5">
                        {schoolLogo ? (
                          <img
                            src={schoolLogo}
                            alt="Logo preview"
                            className="w-11 h-11 rounded-xl object-contain bg-slate-50 p-1 border border-emerald-600/30 shadow-xs"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white flex items-center justify-center shadow-xs">
                            <GraduationCap className="w-6 h-6 text-emerald-100" />
                          </div>
                        )}
                        <div>
                          <div className="text-base font-bold text-slate-900">GS St Isidore Mugina</div>
                          <div className="text-[11px] text-slate-500 font-medium uppercase">Mugina Sector · Kamonyi District</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Student Marks Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-amber-500/60 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl text-slate-200">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-700">
              <div>
                <span className="text-xs font-mono text-amber-400 block">
                  Editing Student Marks · {editingStudent.regNumber}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {editingStudent.studentName} ({editingStudent.stream})
                </h3>
              </div>
              <button onClick={() => setEditingStudent(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Overall Percentage (%):</label>
                  <input
                    type="number"
                    value={editingStudent.overallPercentage}
                    onChange={(e) => setEditingStudent({ ...editingStudent, overallPercentage: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Conduct / Uburere:</label>
                  <input
                    type="text"
                    value={editingStudent.conduct}
                    onChange={(e) => setEditingStudent({ ...editingStudent, conduct: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Attendance Rate (%):</label>
                  <input
                    type="number"
                    value={editingStudent.attendanceRate}
                    onChange={(e) => setEditingStudent({ ...editingStudent, attendanceRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-2 font-semibold">Subject Marks Breakdown:</label>
                <div className="space-y-2">
                  {editingStudent.subjects.map((sub, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-slate-800/80 rounded-lg border border-slate-700">
                      <span className="w-36 truncate font-medium text-white">{sub.name}</span>
                      <span className="font-mono text-slate-400 text-[11px]">{sub.code}</span>
                      <input
                        type="number"
                        value={sub.score}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          const updatedSubjects = [...editingStudent.subjects];
                          updatedSubjects[idx] = {
                            ...sub,
                            score: val,
                            grade: val >= 85 ? 'A' : val >= 75 ? 'B+' : val >= 65 ? 'B' : val >= 50 ? 'C' : 'D'
                          };
                          setEditingStudent({ ...editingStudent, subjects: updatedSubjects });
                        }}
                        className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right font-mono font-bold text-emerald-400"
                      />
                      <span className="text-slate-400 text-xs">/ {sub.maxScore}</span>
                      <input
                        type="text"
                        value={sub.remarks}
                        onChange={(e) => {
                          const updatedSubjects = [...editingStudent.subjects];
                          updatedSubjects[idx] = { ...sub, remarks: e.target.value };
                          setEditingStudent({ ...editingStudent, subjects: updatedSubjects });
                        }}
                        placeholder="Remarks..."
                        className="flex-1 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Headteacher & Mentor Appraisal Remarks:</label>
                <textarea
                  rows={3}
                  value={editingStudent.generalComments}
                  onChange={(e) => setEditingStudent({ ...editingStudent, generalComments: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700 flex items-center justify-end gap-3">
              <button onClick={() => setEditingStudent(null)} className="px-4 py-2 text-xs text-slate-400">
                Cancel
              </button>
              <button
                onClick={() => {
                  updateStudentMarks(editingStudent.regNumber, editingStudent);
                  setEditingStudent(null);
                }}
                className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Official Updates</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Student Modal */}
      {isAddingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-emerald-500/60 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl text-slate-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-700 mb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 block">Registry Enrollment</span>
                <h3 className="text-lg font-bold text-white">Enroll New Student into Stream</h3>
              </div>
              <button onClick={() => setIsAddingStudent(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Registration Number:</label>
                <input
                  type="text"
                  value={newStudentForm.regNumber}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, regNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Student Full Name *:</label>
                <input
                  type="text"
                  required
                  value={newStudentForm.studentName}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, studentName: e.target.value })}
                  placeholder="e.g. Mukandayisenga Solange"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Classroom Stream (18 Streams):</label>
                <select
                  value={newStudentForm.stream}
                  onChange={(e) => {
                    const st = e.target.value;
                    setNewStudentForm({
                      ...newStudentForm,
                      stream: st,
                      level: st.includes('P6') ? 'Primary 6' : st.includes('S3') ? 'Senior 3' : st.includes('S1') ? 'Senior 1' : 'Primary 4'
                    });
                  }}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                >
                  <option value="Stream A (P6: A)">Stream A (P6: A - PLE Candidate)</option>
                  <option value="Stream B (P6: B)">Stream B (P6: B - PLE Candidate)</option>
                  <option value="Stream A (S3: A)">Stream A (S3: A - NESA Candidate)</option>
                  <option value="Stream B (S3: B)">Stream B (S3: B - NESA Candidate)</option>
                  <option value="Stream A (S1: A)">Stream A (S1: A)</option>
                  <option value="Stream B (S1: B)">Stream B (S1: B)</option>
                  <option value="Stream C (S1: C)">Stream C (S1: C)</option>
                  <option value="Stream A (P1: A)">Stream A (P1: A)</option>
                  <option value="Stream B (P1: B)">Stream B (P1: B)</option>
                  <option value="Stream C (P1: C)">Stream C (P1: C)</option>
                  <option value="Top Class (Nursery)">Top Class (Nursery Inshuke)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Overall Score (%):</label>
                  <input
                    type="number"
                    value={newStudentForm.overallPercentage}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, overallPercentage: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Conduct Score:</label>
                  <input
                    type="text"
                    value={newStudentForm.conduct}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, conduct: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700 flex justify-end gap-3 mt-4">
              <button onClick={() => setIsAddingStudent(false)} className="px-4 py-2 text-xs text-slate-400">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newStudentForm.studentName.trim()) return;
                  addStudent(newStudentForm);
                  setIsAddingStudent(false);
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg"
              >
                Enroll & Save Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
