import React, { useState } from 'react';
import { 
  Phone, Mail, Award, Users, BookOpen, ShieldCheck, Key, Camera, 
  Lock, LogIn, LogOut, CheckCircle2, AlertCircle, Edit3, X, Save 
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { useSchool } from '../context/SchoolContext';
import { StaffMember } from '../types';

interface StaffDirectoryProps {
  onOpenAdminSuite?: () => void;
}

export const StaffDirectory: React.FC<StaffDirectoryProps> = ({ onOpenAdminSuite }) => {
  const { 
    teachers, 
    isAdminAuthenticated, 
    currentAuthenticatedStaff, 
    loginStaff, 
    logoutStaff, 
    updateTeacherPhoto, 
    updateTeacherBio,
    t 
  } = useSchool();

  // Staff Login Modal state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string>(teachers[1]?.id || 'staff-02');
  const [staffPasscode, setStaffPasscode] = useState('');
  const [staffLoginError, setStaffLoginError] = useState<string | null>(null);

  // Bio Editing Modal state
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [editBioText, setEditBioText] = useState('');
  const [editPhoneText, setEditPhoneText] = useState('');

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffLoginError(null);
    const result = loginStaff(selectedStaffId, staffPasscode);
    if (result.success) {
      setShowLoginModal(false);
      setStaffPasscode('');
    } else {
      setStaffLoginError(result.message);
    }
  };

  const handleStartEditBio = (staff: StaffMember) => {
    setEditingStaff(staff);
    setEditBioText(staff.bio);
    setEditPhoneText(staff.phone || '0788249507');
  };

  const handleSaveBio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff) return;
    updateTeacherBio(editingStaff.id, editBioText, editPhoneText);
    setEditingStaff(null);
  };

  const handlePhotoFileChange = (teacherId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updateTeacherPhoto(teacherId, dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="staff" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Auth Status Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Teaching Faculty & Administration</span>
              <span aria-hidden="true">·</span>
              <span>18 Active Streams</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
              Academic Leadership & Educators
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
              Meet our qualified, government-appointed and mission-driven educators delivering the Rwandan Competency-Based Curriculum with strong moral values.
            </p>
          </div>

          {/* Teacher / Staff Authentication Controls */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            {currentAuthenticatedStaff ? (
              <div className="flex items-center gap-2 bg-emerald-100/80 border border-emerald-300 px-3 py-1.5 rounded-xl shadow-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-xs text-emerald-950 font-semibold">
                  Teacher: <strong>{currentAuthenticatedStaff.name}</strong>
                </span>
                <button
                  onClick={logoutStaff}
                  className="ml-2 text-xs text-rose-700 hover:text-rose-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  title="Sign out of staff profile editing"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl shadow-xs transition-colors cursor-pointer"
                title="Only teachers with credentials can upload profile photos and edit bios"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-800" />
                <span>Teacher & Staff Login</span>
              </button>
            )}

            {onOpenAdminSuite && (
              <button
                onClick={onOpenAdminSuite}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Key className="w-3.5 h-3.5 text-slate-900" />
                <span>{isAdminAuthenticated ? 'Headteacher Suite' : 'Headteacher Admin'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Staff Authentication Notification Banner when active */}
        {currentAuthenticatedStaff && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950 text-emerald-200 border border-emerald-700/60 flex items-center justify-between gap-4 text-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Authenticated as <strong>{currentAuthenticatedStaff.name}</strong> ({currentAuthenticatedStaff.role}). You have permission to update your profile picture and biography.
              </span>
            </div>
            <button
              onClick={() => handleStartEditBio(currentAuthenticatedStaff)}
              className="px-3 py-1 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit My Bio & Details</span>
            </button>
          </div>
        )}

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {teachers.map((staff) => {
            // Permission check: only admin or the specific authenticated teacher can upload photo or edit bio
            const canEdit = isAdminAuthenticated || currentAuthenticatedStaff?.id === staff.id;

            return (
              <div
                key={staff.id}
                className={`bg-white rounded-2xl border p-6 shadow-sm transition-all flex flex-col justify-between relative ${
                  canEdit ? 'border-emerald-400 ring-2 ring-emerald-400/20' : 'border-slate-200 hover:shadow-md hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    {/* Teacher Avatar / Photo */}
                    <div className="relative group/avatar shrink-0">
                      {staff.photoUrl ? (
                        <img
                          src={staff.photoUrl}
                          alt={staff.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-emerald-600 shadow-sm"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-emerald-800 text-white font-bold text-lg flex items-center justify-center border-2 border-emerald-600 shadow-sm">
                          {staff.avatarInitials}
                        </div>
                      )}
                      
                      {/* Add/Update Profile Picture Button - ONLY visible to authenticated staff member or Admin */}
                      {canEdit && (
                        <>
                          <label
                            htmlFor={`teacher-photo-${staff.id}`}
                            className="absolute -bottom-1 -right-1 p-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-full border border-slate-700 shadow-md cursor-pointer transition-transform hover:scale-110"
                            title="Upload teacher profile picture from computer"
                          >
                            <Camera className="w-3.5 h-3.5" />
                          </label>
                          <input
                            id={`teacher-photo-${staff.id}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handlePhotoFileChange(staff.id, e)}
                          />
                        </>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-base font-bold text-slate-900 truncate">
                          {staff.name}
                        </h3>
                        {canEdit && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                            Verified You
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-emerald-800 line-clamp-1">
                        {staff.role}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {staff.department}
                      </p>
                    </div>
                  </div>

                  {/* Assigned Class Stream Badge */}
                  <div className="mb-3 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-emerald-900 uppercase">Class Stream:</span>
                      <span className="font-mono font-bold text-emerald-950">{staff.classAssigned}</span>
                    </div>
                  </div>

                  {/* Subjects Taught List */}
                  <div className="mb-4 text-xs">
                    <span className="text-slate-500 font-semibold block mb-1">Teaching Subjects:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {staff.subjectsTaught.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-xs">
                    <span className="font-semibold text-slate-700 block mb-0.5">Qualifications:</span>
                    <span className="text-slate-600 font-normal">{staff.qualification}</span>
                  </div>

                  <div className="relative">
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4 italic">
                      "{staff.bio}"
                    </p>

                    {/* Quick Edit Bio button for logged-in teacher */}
                    {canEdit && (
                      <button
                        onClick={() => handleStartEditBio(staff)}
                        className="mb-3 text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                      >
                        <Edit3 className="w-3 h-3 text-emerald-700" />
                        <span>Edit My Bio & Philosophy</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <a
                    href={`tel:${staff.phone || SCHOOL_INFO.phonePrimary}`}
                    className="flex items-center gap-1.5 font-mono text-emerald-800 hover:text-emerald-950 font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{staff.phone || SCHOOL_INFO.phonePrimary}</span>
                  </a>
                  
                  {isAdminAuthenticated && onOpenAdminSuite ? (
                    <button
                      onClick={onOpenAdminSuite}
                      className="px-2.5 py-1 text-[11px] text-slate-900 bg-amber-400 hover:bg-amber-300 font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                      title="Edit this staff member in Headteacher Admin"
                    >
                      <span>Admin Edit</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400">GS Mugina Staff</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Institutional Coordination Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900">
              Parent-Teacher & Administration Inquiries
            </h4>
            <p className="text-xs text-slate-600 font-normal max-w-xl leading-relaxed">
              To speak with Headteacher <strong>Habiyaremye Charles</strong> or Bursar <strong>Letitia</strong> regarding admissions, student transfers, school feeding, or PTA contributions, reach out to the school administration office directly.
            </p>
          </div>
          <a
            href={`tel:${SCHOOL_INFO.phonePrimary}`}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-colors cursor-pointer shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>Call Office: {SCHOOL_INFO.phonePrimary}</span>
          </a>
        </div>
      </div>

      {/* ================= TEACHER / STAFF LOGIN MODAL ================= */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl text-slate-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-700/50">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Teacher & Staff Authentication</h3>
                  <p className="text-xs text-slate-400">Log in to update your profile photo and biography</p>
                </div>
              </div>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStaffLogin} className="py-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Select Your Faculty Profile:
                </label>
                <select
                  value={selectedStaffId}
                  onChange={(e) => setSelectedStaffId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                >
                  {teachers.map((tr) => (
                    <option key={tr.id} value={tr.id}>
                      {tr.name} — {tr.role} ({tr.classAssigned})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Admin-Given Staff Credential Passcode:
                </label>
                <input
                  type="password"
                  value={staffPasscode}
                  onChange={(e) => setStaffPasscode(e.target.value)}
                  placeholder="Enter credential passcode (e.g. BURSAR-MUG-2026)..."
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
                  autoFocus
                />
              </div>

              {staffLoginError && (
                <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <span>{staffLoginError}</span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <span className="font-bold text-slate-300 block">Staff Credential Access:</span>
                <p>• Only teachers with official credentials from Headteacher <strong>Habiyaremye Charles</strong> can change photos and bios.</p>
                <p>• Public website visitors cannot modify any staff data.</p>
                <p>• Demo credentials: <code>HEAD-MUG-2026</code>, <code>BURSAR-MUG-2026</code>, <code>DOS-MUG-2026</code>, <code>PRIM-MUG-2026</code>.</p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Authenticate & Unlock</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT TEACHER BIO MODAL ================= */}
      {editingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl text-slate-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Edit Your Biography & Details</h3>
                <p className="text-xs text-slate-400">{editingStaff.name} · {editingStaff.role}</p>
              </div>
              <button 
                onClick={() => setEditingStaff(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBio} className="py-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Your Biography & Teaching Philosophy:
                </label>
                <textarea
                  rows={4}
                  value={editBioText}
                  onChange={(e) => setEditBioText(e.target.value)}
                  placeholder="Describe your teaching dedication, subjects, and student mentorship..."
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Office Phone Number:
                </label>
                <input
                  type="text"
                  value={editPhoneText}
                  onChange={(e) => setEditPhoneText(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingStaff(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile Updates</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
