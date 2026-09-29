import React from 'react';
import { Phone, Mail, Award, Users, BookOpen, ShieldCheck, Plus, Key } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { useSchool } from '../context/SchoolContext';

interface StaffDirectoryProps {
  onOpenAdminSuite?: () => void;
}

export const StaffDirectory: React.FC<StaffDirectoryProps> = ({ onOpenAdminSuite }) => {
  const { teachers, isAdminAuthenticated } = useSchool();

  return (
    <section id="staff" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              <span>Teaching Faculty & Administration</span>
              <span aria-hidden="true">·</span>
              <span>18 Active Streams</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
              Teachers, Assigned Classes & Subjects
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
              Directed by Headteacher <strong>Habiyaremye Charles</strong> and Bursar <strong>Letitia (Comptable)</strong>. Every teacher is assigned to specific classroom streams and subjects to guarantee high educational discipline.
            </p>
          </div>

          {onOpenAdminSuite && (
            <button
              onClick={onOpenAdminSuite}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm transition-colors cursor-pointer self-start md:self-auto"
            >
              <Key className="w-3.5 h-3.5 text-slate-900" />
              <span>{isAdminAuthenticated ? 'Manage Teachers (Headteacher Admin)' : 'Headteacher: Assign Teachers (Code)'}</span>
            </button>
          )}
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {teachers.map((staff) => (
            <div
              key={staff.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-800 text-white font-bold text-lg flex items-center justify-center shrink-0 border-2 border-emerald-600 shadow-sm">
                    {staff.avatarInitials}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {staff.name}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-800">
                      {staff.role}
                    </p>
                    <p className="text-[11px] text-slate-500">
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

                <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                  {staff.bio}
                </p>
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
                    <span>Edit Staff</span>
                  </button>
                ) : (
                  <span className="text-[11px]">Mugina Campus</span>
                )}
              </div>
            </div>
          ))}
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
    </section>
  );
};
