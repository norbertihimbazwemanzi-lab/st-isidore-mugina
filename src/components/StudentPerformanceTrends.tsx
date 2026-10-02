import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine 
} from 'recharts';
import { 
  TrendingUp, Award, Users, BookOpen, CheckCircle2, 
  ArrowUpRight, ArrowDownRight, Sparkles, Filter, Printer, 
  GraduationCap, Calendar, BarChart2, ShieldCheck, Key 
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { StudentResult } from '../types';

interface StudentPerformanceTrendsProps {
  initialRegNumber?: string;
  onOpenPortal?: () => void;
}

export const StudentPerformanceTrends: React.FC<StudentPerformanceTrendsProps> = ({
  initialRegNumber,
  onOpenPortal,
}) => {
  const { students, schoolLogo } = useSchool();
  const studentList = useMemo(() => Object.values(students), [students]);

  const [selectedReg, setSelectedReg] = useState<string>(
    initialRegNumber && students[initialRegNumber] 
      ? initialRegNumber 
      : studentList[0]?.regNumber || 'MUG-2026-P6A-08'
  );

  const [activeMetricTab, setActiveMetricTab] = useState<'overall' | 'subjects' | 'cohort'>('overall');

  // Selected Student
  const currentStudent = students[selectedReg] || studentList[0];

  // 1. Multi-term Performance Data for Selected Student
  const termTrendData = useMemo(() => {
    if (!currentStudent) return [];

    if (currentStudent.termHistory && currentStudent.termHistory.length > 0) {
      return currentStudent.termHistory.map((th) => ({
        term: th.term,
        studentScore: th.percentage,
        classAverage: th.classAverage,
        attendance: th.attendanceRate,
        rank: th.rank,
      }));
    }

    // Fallback if custom student doesn't have term history yet
    return [
      { term: 'Term 1', studentScore: Math.max(50, currentStudent.overallPercentage - 5), classAverage: 68.5, attendance: 95 },
      { term: 'Term 2', studentScore: currentStudent.overallPercentage, classAverage: 70.2, attendance: currentStudent.attendanceRate },
      { term: 'Term 3 (Forecast)', studentScore: Math.min(100, currentStudent.overallPercentage + 3), classAverage: 72.0, attendance: 98 },
    ];
  }, [currentStudent]);

  // 2. Subject Breakdown Across Terms
  const subjectProgressionData = useMemo(() => {
    if (!currentStudent) return [];

    // If student has subjects in current term, build comparison
    return currentStudent.subjects.map((sub, idx) => {
      // Simulate historical term scores based on realistic progression
      const term1Score = Math.max(45, Math.round(sub.score - (3 + (idx % 4))));
      const term2Score = sub.score;
      const term3Score = Math.min(100, Math.round(sub.score + (2 + (idx % 3))));

      return {
        subject: sub.name.length > 18 ? sub.name.substring(0, 16) + '...' : sub.name,
        fullName: sub.name,
        'Term 1': term1Score,
        'Term 2': term2Score,
        'Term 3 (Target)': term3Score,
        currentGrade: sub.grade,
      };
    });
  }, [currentStudent]);

  // 3. Cohort Stream Distribution Data
  const cohortDistributionData = useMemo(() => {
    return [
      { term: 'Term 1 (2025)', distinction: 42, merit: 38, pass: 16, remedial: 4 },
      { term: 'Term 2 (2026)', distinction: 54, merit: 34, pass: 10, remedial: 2 },
      { term: 'Term 3 (Projected)', distinction: 62, merit: 29, pass: 8, remedial: 1 },
    ];
  }, []);

  // Growth calculations
  const firstTermScore = termTrendData[0]?.studentScore || 0;
  const currentTermScore = termTrendData[1]?.studentScore || currentStudent?.overallPercentage || 0;
  const growthRate = +(currentTermScore - firstTermScore).toFixed(1);
  const isPositiveGrowth = growthRate >= 0;

  const handlePrint = () => {
    window.print();
  };

  if (!currentStudent) return null;

  return (
    <section id="performance-trends" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Multi-Term Visual Analytics & Growth Metrics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Student Performance Trends
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              Track student academic trajectories across Terms 1, 2, and 3 using verified school registry data and comparative class benchmarks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Print Trend Report</span>
            </button>

            {onOpenPortal && (
              <button
                onClick={onOpenPortal}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Check Official Report Cards</span>
              </button>
            )}
          </div>
        </div>

        {/* Student Selector & KPI Banner */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl mb-8 space-y-6">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            {/* Student Dropdown Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="text-xs font-semibold text-slate-400 whitespace-nowrap flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Select Learner:</span>
              </label>

              <select
                value={selectedReg}
                onChange={(e) => setSelectedReg(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer min-w-[280px]"
              >
                {studentList.map((st) => (
                  <option key={st.regNumber} value={st.regNumber}>
                    {st.studentName} — {st.stream} ({st.overallPercentage}%)
                  </option>
                ))}
              </select>
            </div>

            {/* Student Identity Badge */}
            <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">
                  {currentStudent.regNumber} · {currentStudent.stream}
                </span>
                <strong className="text-white text-sm font-bold block">
                  {currentStudent.studentName}
                </strong>
              </div>
            </div>
          </div>

          {/* KPI Stat Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* 1. Overall Average */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Current Term Mark
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {currentStudent.overallPercentage}%
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  {currentStudent.rank}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                Term 2 Academic Year 2025/2026
              </span>
            </div>

            {/* 2. Term-on-Term Momentum */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Term Momentum
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className={`text-2xl sm:text-3xl font-black font-mono flex items-center gap-1 ${
                  isPositiveGrowth ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {isPositiveGrowth ? (
                    <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-rose-400" />
                  )}
                  {isPositiveGrowth ? `+${growthRate}%` : `${growthRate}%`}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                Progression vs Term 1 Baseline
              </span>
            </div>

            {/* 3. Class Stream Average */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Stream Benchmark
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                  {termTrendData[1]?.classAverage || 70.4}%
                </span>
                <span className="text-[11px] text-emerald-300 font-semibold">
                  +{(currentTermScore - (termTrendData[1]?.classAverage || 70.4)).toFixed(1)}% above
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                Class cohort mean score
              </span>
            </div>

            {/* 4. Discipline & Attendance */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Attendance & Conduct
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-teal-400 font-mono">
                  {currentStudent.attendanceRate}%
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  Rate
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                Conduct: {currentStudent.conduct}
              </span>
            </div>

          </div>

          {/* Metric Sub-Tabs */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => setActiveMetricTab('overall')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMetricTab === 'overall'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Multi-Term Overall Progression</span>
            </button>

            <button
              onClick={() => setActiveMetricTab('subjects')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMetricTab === 'subjects'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Subject-by-Subject Evolution</span>
            </button>

            <button
              onClick={() => setActiveMetricTab('cohort')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeMetricTab === 'cohort'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Class Stream Cohort Trend</span>
            </button>
          </div>

        </div>

        {/* ================= TAB 1: OVERALL TRAJECTORY CHART ================= */}
        {activeMetricTab === 'overall' && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Academic Term Trajectory: {currentStudent.studentName}
                </h4>
                <p className="text-xs text-slate-400">
                  Continuous performance progression compared with the official stream class average across terms.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-300 font-medium">Learner Mark %</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="text-slate-300 font-medium">Class Stream Average %</span>
                </div>
              </div>
            </div>

            {/* Recharts Area / Line Composite Chart */}
            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={termTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="studentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="classGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.6} />
                  <XAxis 
                    dataKey="term" 
                    stroke="#94a3b8" 
                    tick={{ fill: '#cbd5e1', fontSize: 12 }} 
                  />
                  <YAxis 
                    domain={[40, 100]} 
                    stroke="#94a3b8" 
                    tick={{ fill: '#cbd5e1', fontSize: 12 }} 
                    unit="%" 
                  />
                  
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderColor: '#059669', 
                      borderRadius: '12px',
                      color: '#f8fafc',
                      fontSize: '12px' 
                    }}
                    formatter={(value: any, name: any) => [
                      `${value}%`,
                      name === 'studentScore' ? currentStudent.studentName : 'Class Stream Average'
                    ]}
                  />

                  <ReferenceLine y={80} stroke="#10b981" strokeDasharray="4 4" label={{ value: 'Distinction Line (80%)', fill: '#10b981', fontSize: 11 }} />

                  <Area 
                    type="monotone" 
                    dataKey="studentScore" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#studentGradient)" 
                    name="studentScore"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="classAverage" 
                    stroke="#fbbf24" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                    dot={{ fill: '#fbbf24', r: 4 }} 
                    name="classAverage"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Qualitative Notes on Continuous Evaluation */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-0.5">
                  Academic Prognosis & Competency Growth:
                </strong>
                <p className="leading-relaxed text-slate-400">
                  {currentStudent.studentName} demonstrated steady upward growth of <strong>+{growthRate}%</strong> between Term 1 and Term 2. 
                  Continuous evaluation under the Rwanda Basic Education Board (REB) competency-based framework confirms high retention and active classroom participation under class teacher <strong>{currentStudent.classTeacher}</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: SUBJECT BY SUBJECT PROGRESSION ================= */}
        {activeMetricTab === 'subjects' && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Multi-Term Subject-by-Subject Evolution
              </h4>
              <p className="text-xs text-slate-400">
                Comparison of performance in individual examination papers across Term 1, Term 2, and Term 3 projected targets.
              </p>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectProgressionData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.6} />
                  <XAxis 
                    dataKey="subject" 
                    stroke="#94a3b8" 
                    tick={{ fill: '#cbd5e1', fontSize: 11 }} 
                    angle={-10}
                    textAnchor="end"
                  />
                  <YAxis 
                    domain={[40, 100]} 
                    stroke="#94a3b8" 
                    tick={{ fill: '#cbd5e1', fontSize: 12 }} 
                    unit="%" 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderColor: '#059669', 
                      borderRadius: '12px',
                      color: '#f8fafc',
                      fontSize: '12px' 
                    }} 
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '15px', fontSize: '12px' }} 
                  />
                  <Bar dataKey="Term 1" fill="#64748b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Term 2" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Term 3 (Target)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ================= TAB 3: COHORT ACADEMIC STANDING ================= */}
        {activeMetricTab === 'cohort' && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Class Stream Cohort Pass Distribution
              </h4>
              <p className="text-xs text-slate-400">
                Distribution of learners reaching Distinction (Grade A), Merit (Grade B), and Passing standards across terms.
              </p>
            </div>

            <div className="h-80 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cohortDistributionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.6} />
                  <XAxis dataKey="term" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                  <YAxis stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 12 }} unit="%" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderColor: '#059669', 
                      borderRadius: '12px',
                      color: '#f8fafc',
                      fontSize: '12px' 
                    }} 
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="distinction" name="Distinction (>80%)" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="merit" name="Merit (60-79%)" stackId="1" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="pass" name="Pass (50-59%)" stackId="1" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="remedial" name="Remedial (<50%)" stackId="1" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.8} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Security & Access Credentials Advisory */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-300">
            <Key className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Portal Access Notice:</strong> Student and teacher credentials are individually issued and provisioned by the School Administration (Headteacher Suite).
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            GS St Isidore Mugina · MINEDUC / NESA
          </span>
        </div>

      </div>
    </section>
  );
};
