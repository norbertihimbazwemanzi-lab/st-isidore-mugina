import React, { useState } from 'react';
import { 
  Search, GraduationCap, AlertCircle, Printer, BookOpen, 
  CheckCircle2, User, Key, Lock, Unlock, Plus, Edit2, 
  Trash2, Save, X, Eye, ShieldCheck, Download, FileText, ArrowRight, Check 
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { StudentResult } from '../types';
import { useSchool, HEADTEACHER_ADMIN_CODE } from '../context/SchoolContext';

interface StudentResultCheckerProps {
  initialRegNumber?: string;
  onOpenAdminSuite?: () => void;
}

export const StudentResultChecker: React.FC<StudentResultCheckerProps> = ({ 
  initialRegNumber = '',
  onOpenAdminSuite,
}) => {
  const { 
  students, 
  loginAdmin, 
  isAdminAuthenticated, 
  setNotificationToast,
  schoolLogo,
} = useSchool();

  const [regInput, setRegInput] = useState(initialRegNumber);
  const [queriedResult, setQueriedResult] = useState<StudentResult | null>(
    students['MUG-2026-P6A-08'] || Object.values(students)[0] || null
  );
  const [searchErrorMsg, setSearchErrorMsg] = useState<string | null>(null);
  const [showPrintPreviewModal, setShowPrintPreviewModal] = useState(false);

  const sampleIds = [
    { id: 'MUG-2026-P6A-08', label: 'P6: Stream A (PLE Top Candidate)' },
    { id: 'MUG-2026-S3B-01', label: 'S3: Stream B (NESA Candidate)' },
    { id: 'MUG-2026-S1A-14', label: 'S1: Stream A' },
    { id: 'MUG-2026-P4C-22', label: 'P4: Stream C' },
    { id: 'MUG-2026-NUR-05', label: 'Nursery Top Class' },
  ];

  const handleSearch = (idToSearch?: string) => {
    const term = (idToSearch || regInput).trim().toUpperCase();
    setSearchErrorMsg(null);

    // If headteacher enters their administrative user code in the search bar
    if (term === HEADTEACHER_ADMIN_CODE) {
      loginAdmin(term);
      if (onOpenAdminSuite) {
        onOpenAdminSuite();
      }
      return;
    }

    if (!term) {
      setSearchErrorMsg('Please enter a valid Student Registration Number (e.g. MUG-2026-P6A-08).');
      setQueriedResult(null);
      return;
    }

    if (students[term]) {
      setQueriedResult(students[term]);
      setRegInput(term);
    } else {
      setQueriedResult(null);
      setSearchErrorMsg(`No record found for Registration Number "${term}". Please try one of the official student IDs below.`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadOfflineCopy = (student: StudentResult) => {
    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Report Card - ${student.studentName} (${student.regNumber})</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 25px; color: #1e293b; }
          .header { text-align: center; border-bottom: 2px solid #047857; padding-bottom: 12px; margin-bottom: 20px; }
          .title { font-size: 20px; font-weight: bold; color: #064e3b; margin: 0; }
          .sub { font-size: 13px; color: #475569; margin-top: 4px; }
          .meta { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; background: #f8fafc; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 20px; font-size: 13px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 10px; text-align: left; }
          th { background: #f1f5f9; color: #0f172a; }
          .signatures { display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid #cbd5e1; font-size: 12px; }
          .badge { background: #ecfdf5; color: #065f46; font-weight: bold; padding: 2px 8px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="sub">REPUBLIC OF RWANDA · MINISTRY OF EDUCATION (MINEDUC) · DIOCESE OF KABGAYI</div>
          <div class="title">GROUPE SCOLAIRE SAINT ISIDORE MUGINA</div>
          <div class="sub">Mugina Sector, Kamonyi District · Tel: ${SCHOOL_INFO.phonePrimary} · Official Student Terminal Report</div>
        </div>
        <div class="meta">
          <div><strong>Student Name:</strong> ${student.studentName}</div>
          <div><strong>Registration No:</strong> ${student.regNumber}</div>
          <div><strong>Grade & Stream:</strong> ${student.stream}</div>
          <div><strong>Cycle:</strong> ${student.program}</div>
          <div><strong>Academic Year:</strong> ${student.academicYear} · ${student.term}</div>
          <div><strong>Class Standing / Rank:</strong> ${student.rank}</div>
          <div><strong>Overall Percentage:</strong> <span class="badge">${student.overallPercentage}%</span></div>
          <div><strong>Conduct / Uburere:</strong> ${student.conduct}</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Subject / Competency</th>
              <th>Code</th>
              <th>Max Score</th>
              <th>Marks Obtained</th>
              <th>Grade</th>
              <th>Teacher Remarks</th>
            </tr>
          </thead>
          <tbody>
            ${student.subjects.map(s => `
              <tr>
                <td><strong>${s.name}</strong></td>
                <td>${s.code}</td>
                <td>${s.maxScore}</td>
                <td><strong>${s.score}</strong></td>
                <td><span class="badge">${s.grade}</span></td>
                <td>${s.remarks}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div style="background: #f8fafc; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 13px; margin-bottom: 20px;">
          <strong>Mentor Appraisal:</strong> <em>"${student.generalComments}"</em>
        </div>
        <div class="signatures">
          <div>Class Teacher: <strong>${student.classTeacher}</strong></div>
          <div>Chief Bursar: <strong>Letitia (Comptable)</strong></div>
          <div>Headteacher: <strong>Habiyaremye Charles</strong></div>
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GS_Mugina_Marksheet_${student.regNumber}_${student.studentName.replace(/\s+/g, '_')}.html`;
    link.click();
    URL.revokeObjectURL(url);
    if (setNotificationToast) {
      setNotificationToast(`Downloaded report sheet file for ${student.studentName}`);
    }
  };

  return (
    <section id="portal" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Campus Photograph on Result Portal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/src/assets/images/real_mugina_campus_1790692410622.jpg"
          alt="GS St Isidore Mugina Campus Building"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105"
        />
        {/* Measured dark academic scrim for 4.5:1 contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-slate-950/95" />
        <div className="absolute inset-0 bg-emerald-950/40 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/15 print:hidden">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>Official Academic Performance Registry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              GS St Isidore Mugina Terminal Results & Report Cards
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Official Day School Marks Portal · Serving Nursery, Primary (P1–P6) & Secondary (S1–S3)
            </p>
          </div>

          {/* Headteacher Admin Suite Launch Button */}
          {onOpenAdminSuite && (
            <button
              onClick={onOpenAdminSuite}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-colors cursor-pointer self-start md:self-auto"
            >
              <Key className="w-3.5 h-3.5" />
              <span>
                {isAdminAuthenticated ? 'Headteacher Admin Workspace' : 'Headteacher Portal'}
              </span>
            </button>
          )}
        </div>

        {/* Search Query Card */}
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-700/80 shadow-xl backdrop-blur-md print:hidden">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={regInput}
                  onChange={(e) => setRegInput(e.target.value)}
                  placeholder="Enter Student Registration Number (e.g. MUG-2026-P6A-08)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800 text-sm text-white placeholder-slate-400 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-500 transition-all uppercase font-mono font-medium"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                Verify Marks
              </button>
            </form>

            {/* Quick Demo Student IDs */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-300">Quick Test Stream Records:</span>
              {sampleIds.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setRegInput(item.id);
                    handleSearch(item.id);
                  }}
                  className={`font-mono text-xs px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                    queriedResult?.regNumber === item.id
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500 font-bold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {item.id} ({item.label})
                </button>
              ))}
            </div>

            {searchErrorMsg && (
              <div className="mt-4 p-3.5 bg-rose-950/80 border border-rose-800 rounded-xl text-xs text-rose-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{searchErrorMsg}</span>
              </div>
            )}
          </div>

          {/* Display Official Report Card */}
          {queriedResult && (
            <div className="printable-report-sheet bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-8 print:shadow-none print:border-none print:p-0">
              
              {/* TOP ACTION BAR FOR PARENTS (PRINT RESULT BUTTON) */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 mb-5 border-b border-slate-200 gap-3 print:hidden">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    Authentic Verified Student Record Available
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  {/* Primary Print / Export to PDF Button */}
                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                    title="Export viewed student report card as a professional PDF"
                  >
                    <Printer className="w-4 h-4 text-emerald-200" />
                    <span>Export to PDF</span>
                  </button>

                  {/* Preview Detailed Marksheet Modal Button */}
                  <button
                    onClick={() => setShowPrintPreviewModal(true)}
                    className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-300"
                    title="View official stamp and seal before saving"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span>Preview Full Marksheet</span>
                  </button>

                  {/* Save/Download File */}
                  <button
                    onClick={() => handleDownloadOfflineCopy(queriedResult)}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-300"
                    title="Download offline report sheet"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span className="hidden sm:inline">Save</span>
                  </button>
                </div>
              </div>

              {/* Official School Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <div className="flex items-center gap-3.5">
                  {schoolLogo ? (
                    <img
                      src={schoolLogo}
                      alt="Official School Emblem"
                      className="w-14 h-14 rounded-xl object-contain bg-slate-50 p-1 border border-emerald-600/30 shadow-xs shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <GraduationCap className="w-6 h-6 text-emerald-200" />
                    </div>
                  )}
                  <div>
                    <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                      {SCHOOL_INFO.status} · {SCHOOL_INFO.churchPartnership}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                      {SCHOOL_INFO.fullName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Mugina Sector · Kamonyi District · Tel: {SCHOOL_INFO.phonePrimary} · Diocese of Kabgayi
                    </p>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="inline-block text-xs font-mono font-bold text-emerald-900 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-lg">
                    OFFICIAL TERMINAL REPORT
                  </span>
                  <div className="text-xs text-slate-500 mt-1 font-mono">
                    Academic Year: {queriedResult.academicYear} · {queriedResult.term}
                  </div>
                </div>
              </div>

              {/* Student Metadata Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-500 block">Student Name:</span>
                  <span className="font-bold text-slate-900 text-sm">{queriedResult.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Registration No:</span>
                  <span className="font-mono font-bold text-slate-900">{queriedResult.regNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Grade & Classroom Stream:</span>
                  <span className="font-bold text-emerald-900 font-mono">{queriedResult.stream}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Educational Cycle:</span>
                  <span className="font-semibold text-slate-900 truncate block">{queriedResult.program}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-center">
                  <span className="text-[11px] font-medium text-emerald-800 block">Overall Score</span>
                  <span className="text-xl font-black text-emerald-900 font-mono tabular-nums">
                    {queriedResult.overallPercentage}%
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-center">
                  <span className="text-[11px] font-medium text-slate-600 block">Stream Standing</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    {queriedResult.rank}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-center">
                  <span className="text-[11px] font-medium text-slate-600 block">Conduct / Uburere</span>
                  <span className="text-xs font-bold text-slate-900 mt-1 block">
                    {queriedResult.conduct}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-center">
                  <span className="text-[11px] font-medium text-slate-600 block">Attendance Rate</span>
                  <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                    {queriedResult.attendanceRate}%
                  </span>
                </div>
              </div>

              {/* Subject Marks Table */}
              <div className="overflow-x-auto mb-6 border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Subject / Competency</th>
                      <th className="py-2.5 px-3">Code</th>
                      <th className="py-2.5 px-3 text-right">Max</th>
                      <th className="py-2.5 px-3 text-right">Obtained</th>
                      <th className="py-2.5 px-3 text-center">Grade</th>
                      <th className="py-2.5 px-3">Teacher Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {queriedResult.subjects.map((sub, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-medium text-slate-900">{sub.name}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-500">{sub.code}</td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums">{sub.maxScore}</td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                          {sub.score}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                            {sub.grade}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 text-[11px]">{sub.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Appraisal & Signatures */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 text-xs">
                <div className="font-bold text-slate-900 mb-1">Class Mentor Appraisal:</div>
                <p className="text-slate-700 italic font-normal">
                  "{queriedResult.generalComments}"
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-700 text-xs pt-3 border-t border-slate-200">
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase">Class Teacher</span>
                    <strong className="text-slate-900 block mt-0.5">{queriedResult.classTeacher}</strong>
                    <span className="text-[10px] text-emerald-700 font-mono">✓ Signed Electronically</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase">Chief Bursar / Comptable</span>
                    <strong className="text-slate-900 block mt-0.5">Letitia (Comptable)</strong>
                    <span className="text-[10px] text-emerald-700 font-mono">✓ School Fees Cleared</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase">Headteacher</span>
                    <strong className="text-slate-900 block mt-0.5">Habiyaremye Charles</strong>
                    <span className="text-[10px] text-emerald-700 font-mono">✓ Approved & Sealed</span>
                  </div>
                </div>
              </div>

              {/* Print and Actions Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 print:hidden">
                <div className="text-xs text-slate-500">
                  Official bulletin authenticated for GS St Isidore Mugina (Kamonyi District).
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
                    title="Export viewed student report card to professional PDF"
                  >
                    <Printer className="w-4 h-4 text-emerald-200" />
                    <span>Export to PDF</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= FULLSCREEN OFFICIAL PDF MARKSHEET PREVIEW MODAL ================= */}
      {showPrintPreviewModal && queriedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden text-slate-200">
            
            {/* Modal Control Bar */}
            <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-700/50 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Official Marksheet PDF Preview
                  </h3>
                  <p className="text-xs text-slate-400">
                    {queriedResult.studentName} ({queriedResult.regNumber}) · {queriedResult.stream}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  onClick={() => setShowPrintPreviewModal(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Realistic Printable Paper Canvas */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-800/60">
              <div className="bg-white text-slate-950 p-6 sm:p-10 rounded-xl shadow-2xl border border-slate-300 max-w-3xl mx-auto printable-report-sheet font-sans">
                
                {/* Official Rwandan Header Banner */}
                <div className="text-center pb-5 mb-5 border-b-2 border-emerald-800">
                  <div className="text-[10px] font-bold tracking-widest text-slate-700 uppercase">
                    REPUBLIKA Y'U RWANDA · REPUBLIC OF RWANDA
                  </div>
                  <div className="text-[11px] font-semibold text-slate-800 mt-0.5">
                    MINISTRY OF EDUCATION (MINEDUC) · RWANDA BASIC EDUCATION BOARD (REB) & NESA
                  </div>
                  <div className="text-[10px] font-medium text-slate-600">
                    DIOCESE CATHOLIQUE DE KABGAYI · SOUS-CONVENTION CATHOLIQUE
                  </div>
                  
                  <div className="my-2 py-1 px-3 bg-emerald-50 border border-emerald-300 inline-block rounded">
                    <h2 className="text-lg sm:text-xl font-black text-emerald-950 tracking-tight">
                      GROUPE SCOLAIRE SAINT ISIDORE MUGINA
                    </h2>
                  </div>

                  <p className="text-[11px] text-slate-600">
                    Mugina Sector · Kamonyi District · Southern Province · Tel: {SCHOOL_INFO.phonePrimary}
                  </p>
                  <div className="mt-2 text-xs font-black tracking-wider uppercase text-slate-900 bg-slate-100 py-1 border-y border-slate-200">
                    RAPORO Y'AMANOTA Y'IGIHEHEMBWE / OFFICIAL STUDENT TERMINAL PROGRESS REPORT
                  </div>
                </div>

                {/* Student Identification Details */}
                <div className="grid grid-cols-2 gap-3 text-xs mb-5 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Student Full Name:</span>
                    <strong className="text-slate-900 text-sm">{queriedResult.studentName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Student Reg. Number:</span>
                    <strong className="text-slate-900 font-mono text-sm">{queriedResult.regNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Classroom Stream:</span>
                    <strong className="text-emerald-900">{queriedResult.stream}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Academic Term & Year:</span>
                    <strong className="text-slate-900">{queriedResult.academicYear} · {queriedResult.term}</strong>
                  </div>
                </div>

                {/* High-level performance indicators */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs mb-5">
                  <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 uppercase block">Total Average</span>
                    <strong className="text-base text-emerald-950 font-bold">{queriedResult.overallPercentage}%</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-600 uppercase block">Stream Rank</span>
                    <strong className="text-xs text-slate-900 font-bold">{queriedResult.rank}</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-600 uppercase block">Conduct</span>
                    <strong className="text-xs text-slate-900 font-bold">{queriedResult.conduct}</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-600 uppercase block">Attendance</span>
                    <strong className="text-xs text-slate-900 font-bold">{queriedResult.attendanceRate}%</strong>
                  </div>
                </div>

                {/* Marks Table */}
                <table className="w-full text-xs text-left border border-slate-300 mb-5">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                      <th className="p-2 border-r border-slate-300">Subject / Competency</th>
                      <th className="p-2 border-r border-slate-300 text-center">Code</th>
                      <th className="p-2 border-r border-slate-300 text-right">Max</th>
                      <th className="p-2 border-r border-slate-300 text-right">Obtained</th>
                      <th className="p-2 border-r border-slate-300 text-center">Grade</th>
                      <th className="p-2">Subject Teacher Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queriedResult.subjects.map((s, idx) => (
                      <tr key={idx} className="border-b border-slate-200">
                        <td className="p-2 font-medium border-r border-slate-200">{s.name}</td>
                        <td className="p-2 font-mono text-center text-slate-500 border-r border-slate-200">{s.code}</td>
                        <td className="p-2 text-right border-r border-slate-200 font-mono">{s.maxScore}</td>
                        <td className="p-2 text-right border-r border-slate-200 font-mono font-bold text-slate-900">{s.score}</td>
                        <td className="p-2 text-center border-r border-slate-200 font-bold text-emerald-800">{s.grade}</td>
                        <td className="p-2 text-slate-600 text-[11px]">{s.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mentor Comments & Official Rubber Stamp */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs mb-6">
                  <span className="font-bold text-slate-900">Class Mentor Observation & Advice: </span>
                  <span className="text-slate-700 italic">"{queriedResult.generalComments}"</span>
                </div>

                {/* Signatures & Seal Block */}
                <div className="pt-4 border-t-2 border-slate-300 grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Class Teacher:</span>
                    <strong className="text-slate-900 block mt-1">{queriedResult.classTeacher}</strong>
                    <div className="mt-3 border-b border-dashed border-slate-400 w-28" />
                    <span className="text-[10px] text-slate-400">Signature</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Chief Bursar / Comptable:</span>
                    <strong className="text-slate-900 block mt-1">Letitia (Comptable)</strong>
                    <div className="mt-3 border-b border-dashed border-slate-400 w-28" />
                    <span className="text-[10px] text-slate-400">Validation Stamp</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase">Headteacher Approval:</span>
                    <strong className="text-slate-900 block mt-1">Habiyaremye Charles</strong>
                    
                    {/* Simulated Authentic Circular Stamp */}
                    <div className="mt-2 inline-flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-emerald-800 text-emerald-800 text-[8px] font-black uppercase text-center p-1 transform -rotate-6">
                      <span>GS ST ISIDORE</span>
                      <span className="text-[7px]">★ MUGINA ★</span>
                      <span className="text-[6px]">KAMONYI</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center text-[9px] text-slate-400 border-t border-slate-100 pt-2">
                  GS St Isidore Mugina · Official Academic Registry · Document authenticated by Headteacher Habiyaremye Charles
                </div>
              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                A4 portrait formatted. Use your browser's "Save as PDF" option.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPrintPreviewModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={handlePrint}
                  className="px-5 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Marksheet (PDF)</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
