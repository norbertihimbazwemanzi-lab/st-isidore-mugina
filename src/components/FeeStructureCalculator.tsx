import React, { useState } from 'react';
import { Calculator, CheckCircle2, Shield, Info, Utensils } from 'lucide-react';
import { FEE_STRUCTURE_DATA, SCHOOL_INFO } from '../data/schoolData';

export const FeeStructureCalculator: React.FC = () => {
  const [selectedCycle, setSelectedCycle] = useState<'nursery' | 'primary' | 'secondary'>('primary');
  const [isNewStudent, setIsNewStudent] = useState<boolean>(true);

  const cycleData = FEE_STRUCTURE_DATA.cycles[selectedCycle];
  const newStudentPack = isNewStudent ? FEE_STRUCTURE_DATA.newStudentStarterPack.totalOneTime : 0;

  const totalTermCost = cycleData.totalPerTerm + newStudentPack;

  return (
    <section id="fees" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <Calculator className="w-4 h-4 text-emerald-700" />
            <span>Government-Aided Subsidies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Day School Fees & School Feeding Calculator
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-normal">
            As a Government-Aided school, academic tuition is heavily subsidized. Fees cover the daily nutritious hot school meal, learning materials, and PTA classroom maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Box */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              1. Choose Educational Level
            </h3>

            {/* Cycle Selection */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSelectedCycle('nursery')}
                className={`w-full p-3.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                  selectedCycle === 'nursery'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold">Nursery / Inshuke (Baby, Middle, Top)</div>
                <div className="text-[11px] font-normal text-slate-500 mt-0.5">Ages 3 – 5 years · Play & foundational reading</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCycle('primary')}
                className={`w-full p-3.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                  selectedCycle === 'primary'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold">Primary (P1 to P6)</div>
                <div className="text-[11px] font-normal text-slate-500 mt-0.5">Includes P1-P6 streams (A, B, C) · PLE candidate classes</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCycle('secondary')}
                className={`w-full p-3.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                  selectedCycle === 'secondary'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold">Secondary (Ordinary Level S1 to S3)</div>
                <div className="text-[11px] font-normal text-slate-500 mt-0.5">Includes S1-S3 streams (A, B, C) · NESA candidate classes</div>
              </button>
            </div>

            {/* New Student Toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNewStudent}
                  onChange={(e) => setIsNewStudent(e.target.checked)}
                  className="w-4 h-4 text-emerald-700 rounded border-slate-300 focus:ring-emerald-500"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">First-Time Enrollee Starter Pack</span>
                  <span className="text-slate-500">Includes 2 official school uniform sets, sports T-shirt, and student badge</span>
                </div>
              </label>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <span className="font-semibold text-slate-900 block mb-1">Bursary Contact:</span>
              Managed by Bursar <strong>Letitia (Comptable)</strong>. Official telephone: <strong className="font-mono text-emerald-800">{SCHOOL_INFO.phonePrimary}</strong>.
            </div>
          </div>

          {/* Results Summary Receipt */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {cycleData.name} Breakdown
                </h4>
                <p className="text-xs text-slate-500">
                  Day Scholar Model · Academic Year {FEE_STRUCTURE_DATA.academicYear} · In Rwandan Francs (RWF)
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md">
                Subsidized
              </span>
            </div>

            {/* Line items list */}
            <div className="space-y-3 text-xs mb-6 divide-y divide-slate-100">
              <div className="flex justify-between pt-2">
                <span className="text-slate-600">Basic Academic Tuition:</span>
                <span className="font-mono font-bold text-emerald-700">
                  0 RWF (100% Covered by Gov Capitation Grant)
                </span>
              </div>

              <div className="flex justify-between pt-2">
                <div className="flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-slate-700 font-medium">Daily School Feeding (Gahunda yo kugaburira abana):</span>
                </div>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {cycleData.schoolFeedingLunch.toLocaleString()} RWF / Term
                </span>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-slate-600">
                  {selectedCycle === 'secondary'
                    ? 'Science Laboratory, ICT & Examination Materials:'
                    : selectedCycle === 'primary'
                    ? 'National Library Decodable Readers & Examination Tests:'
                    : 'Early Childhood Play & Hygiene Materials:'}
                </span>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {(selectedCycle === 'secondary' 
                    ? (cycleData as any).laboratoryAndICTFund 
                    : selectedCycle === 'primary' 
                    ? (cycleData as any).examAndLiteracyFund 
                    : (cycleData as any).learningMaterialsAndPlay).toLocaleString()} RWF
                </span>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-slate-600">PTA School Development & Maintenance Contribution:</span>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {cycleData.ptaDevelopmentFund.toLocaleString()} RWF
                </span>
              </div>

              {isNewStudent && (
                <div className="flex justify-between pt-2 text-amber-800 font-medium bg-amber-50/70 p-2.5 rounded-lg">
                  <div>
                    <span>One-Time Starter Kit (Uniforms x2, Sports T-Shirt, ID Card):</span>
                    <span className="block text-[11px] text-amber-700 font-normal">Paid once upon new admission</span>
                  </div>
                  <span className="font-mono font-semibold tabular-nums">
                    {newStudentPack.toLocaleString()} RWF
                  </span>
                </div>
              )}
            </div>

            {/* Total Highlight */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wide block">Total Payable for Term 1</span>
                <span className="text-xs text-emerald-400">Includes hot lunch every school day</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black font-mono tracking-tight text-white tabular-nums">
                  {totalTermCost.toLocaleString()} RWF
                </div>
              </div>
            </div>

            {/* Bursar Payment Details */}
            <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                Bursary Office: <strong className="text-slate-800">Letitia (Comptable)</strong> · Mugina Campus
              </div>
              <div>
                Direct Admin Phone: <strong className="text-slate-800 font-mono">{SCHOOL_INFO.phonePrimary}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
