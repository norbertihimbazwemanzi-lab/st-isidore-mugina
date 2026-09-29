import React, { useState } from 'react';
import { BookOpen, Users, Sparkles, Check, ChevronRight, GraduationCap, Calendar, Award } from 'lucide-react';
import { CLASS_STREAMS_DATA, SCHOOL_INFO } from '../data/schoolData';
import { ClassStreamInfo } from '../types';

interface ClassStreamsMatrixProps {
  onSelectGradeForApply: (gradeName: string) => void;
}

export const ClassStreamsMatrix: React.FC<ClassStreamsMatrixProps> = ({ onSelectGradeForApply }) => {
  const [activeCycle, setActiveCycle] = useState<'all' | 'nursery' | 'primary' | 'secondary'>('all');
  const [selectedStreamDetail, setSelectedStreamDetail] = useState<ClassStreamInfo>(CLASS_STREAMS_DATA[0]);

  const filteredStreams = CLASS_STREAMS_DATA.filter((item) => {
    if (activeCycle === 'all') return true;
    return item.cycle === activeCycle;
  });

  return (
    <section id="streams" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              <span>Class Organization & Streams</span>
              <span aria-hidden="true">·</span>
              <span>18 Active Classrooms · Inclusive Day School</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
              Full Educational Cycle: Nursery, Primary & Ordinary Level
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
              Structured across 18 specialized streams with dedicated class mentors, balanced teacher-to-student ratios, and focused literacy programs.
            </p>
          </div>

          {/* Cycle Filter Buttons (Segmented interactive tabs) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveCycle('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCycle === 'all'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Grades (10)
            </button>
            <button
              onClick={() => setActiveCycle('nursery')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCycle === 'nursery'
                  ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nursery (Baby to Top)
            </button>
            <button
              onClick={() => setActiveCycle('primary')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCycle === 'primary'
                  ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Primary (P1 – P6)
            </button>
            <button
              onClick={() => setActiveCycle('secondary')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCycle === 'secondary'
                  ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Secondary (S1 – S3)
            </button>
          </div>
        </div>

        {/* Highlighted Stream Banner Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Streams List (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {filteredStreams.map((item, idx) => {
              const isSelected = selectedStreamDetail.grade === item.grade;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedStreamDetail(item)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-600 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <span className="font-semibold uppercase tracking-wider text-emerald-800">
                        {item.cycle === 'nursery' ? 'Amashuri y\'Inshuke' : item.cycle === 'primary' ? 'Amashuri Abanza' : 'Amashuri Yisumbuye'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Age: {item.ageGroup}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      {item.grade}
                    </h3>

                    {/* The exact streams badges */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {item.streams.map((str, sIdx) => (
                        <span
                          key={sIdx}
                          className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md border ${
                            isSelected
                              ? 'bg-emerald-800 text-white border-emerald-800'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {str}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span className="text-xs font-mono font-bold text-slate-900 block tabular-nums">
                      ~{item.totalStudents} Learners
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Lead: {item.leadTeacher.split(' ')[1] || item.leadTeacher}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Stream Deep Dive Inspector (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                  Stream Overview & Pedagogy
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {selectedStreamDetail.grade}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-md">
                {selectedStreamDetail.streams.length} Classroom Streams
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              <p>
                {selectedStreamDetail.description}
              </p>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Official Class Mentor:</span>
                  <strong className="text-slate-900">{selectedStreamDetail.leadTeacher}</strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Classroom Streams:</span>
                  <strong className="text-emerald-900 font-mono">
                    {selectedStreamDetail.streams.join(' · ')}
                  </strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Target Age Bracket:</span>
                  <strong className="text-slate-900">{selectedStreamDetail.ageGroup}</strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Core Subject Modules:</span>
                  <strong className="text-slate-900">{selectedStreamDetail.subjectsCount} Subjects</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-100/60 border border-emerald-200 text-xs text-emerald-950">
                <span className="font-bold block mb-1">Gahunda yo kugaburira abana ku ishuri:</span>
                All day students in this stream partake in the daily nutritious hot school lunch and afternoon literacy reading sessions.
              </div>

              <button
                onClick={() => onSelectGradeForApply(selectedStreamDetail.grade)}
                className="w-full mt-4 py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Apply for Enrollment in {selectedStreamDetail.grade}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Visual Classroom Stream Quick Roster for reference */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Full 18 Classrooms Distribution at GS St Isidore Mugina
              </h4>
              <p className="text-xs text-slate-400">
                Inclusive Day School · Catholic Diocese of Kabgayi & MINEDUC Partnership
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-400">
              Admin Contact: {SCHOOL_INFO.phonePrimary}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Nursery */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="font-bold text-emerald-400 block border-b border-slate-700 pb-1">
                Pre-Primary (Nursery):
              </span>
              <div className="text-slate-300 font-mono">
                • Baby Class<br />
                • Middle Class<br />
                • Top Class (Graduation to P1)
              </div>
            </div>

            {/* Primary P1-P6 */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="font-bold text-emerald-400 block border-b border-slate-700 pb-1">
                Primary (Amashuri Abanza):
              </span>
              <div className="text-slate-300 font-mono">
                • P1: Stream A, Stream B, Stream C<br />
                • P2: Stream A, Stream B<br />
                • P3: Stream A, Stream B<br />
                • P4: Stream A, Stream B, Stream C<br />
                • P5: Stream A, Stream B<br />
                • P6: Stream A, Stream B (PLE Candidate Class)
              </div>
            </div>

            {/* Secondary S1-S3 */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="font-bold text-emerald-400 block border-b border-slate-700 pb-1">
                Secondary (Ordinary Level):
              </span>
              <div className="text-slate-300 font-mono">
                • S1: Stream A, Stream B, Stream C<br />
                • S2: Stream A, Stream B, Stream C<br />
                • S3: Stream A, Stream B (NESA Candidate Class)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
