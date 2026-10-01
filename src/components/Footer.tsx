import React from 'react';
import { GraduationCap, MapPin, Phone, Mail, BookOpen, Library } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { useSchool } from '../context/SchoolContext';

interface FooterProps {
  onNavClick: (id: string) => void;
  onOpenPortal: () => void;
  onOpenApply: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenPortal, onOpenApply }) => {
  const { schoolLogo } = useSchool();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Rwandan National Flag subtle aesthetic ribbon */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/2 bg-[#00A3E0]" title="Sky Blue (Peace & Happiness)" />
        <div className="h-full w-1/4 bg-[#FAD201]" title="Yellow (Economic Development)" />
        <div className="h-full w-1/4 bg-[#20603D]" title="Green (Natural Prosperity)" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1 & 2: School Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {schoolLogo ? (
                <img
                  src={schoolLogo}
                  alt={SCHOOL_INFO.name}
                  className="w-10 h-10 rounded-xl object-contain bg-white p-1 shadow-sm border border-emerald-600/30"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5 text-emerald-200" />
                </div>
              )}
              <div>
                <span className="text-base font-bold text-white tracking-tight block">
                  {SCHOOL_INFO.name}
                </span>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                  {SCHOOL_INFO.fullName}
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed font-normal max-w-sm">
              An inclusive Government-Aided Day School running in partnership between the Government of Rwanda (MINEDUC / REB) and the Catholic Church (Diocese of Kabgayi). Offering Pre-Primary, Primary (P1–P6), and Secondary (S1–S3).
            </p>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{SCHOOL_INFO.sector} Sector, {SCHOOL_INFO.district} District, Rwanda</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="font-mono text-white font-semibold">Registered Admin: {SCHOOL_INFO.phonePrimary}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Library className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>National Library Services (Inteko y'Umuco) Literacy Partner</span>
              </div>
            </div>
          </div>

          {/* Col 3: Academic Cycles & 18 Streams */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              18 Classroom Streams
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavClick('streams')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Nursery (Baby, Middle, Top)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('streams')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Primary 1 (Streams A, B, C)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('streams')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Primary 2 & 3 (Streams A, B)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('streams')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Primary 4 (Streams A, B, C)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('streams')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  P5 & P6 PLE (Streams A, B)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('streams')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  S1 & S2 (Streams A, B, C)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('streams')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  S3 NESA Candidates (A, B)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: E-Learning, Portal & Fees */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Academic Hub & Portal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenPortal}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors text-left cursor-pointer flex items-center gap-1"
                >
                  <span>Term Results Checker</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('faq')}
                  className="text-amber-300 hover:text-amber-200 font-medium transition-colors text-left cursor-pointer flex items-center gap-1"
                >
                  <span>FAQ & Supply Lists</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('elearning')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  PLE National Exam Papers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('elearning')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  S3 NESA Exam Papers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('elearning')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Decodable Readers & Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('fees')}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Fees & Daily School Lunch
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenApply}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors text-left cursor-pointer"
                >
                  Online Admission 2026/27
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Leadership & Values */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Leadership & Values
            </h4>
            <div className="space-y-2 text-slate-400 text-[11px] leading-relaxed">
              <p>
                <strong className="text-slate-200">Headteacher:</strong><br />
                Habiyaremye Charles
              </p>
              <p>
                <strong className="text-slate-200">Chief Bursar (Comptable):</strong><br />
                Letitia
              </p>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-300 font-medium block">Motto:</span>
                <span className="italic text-slate-500">"{SCHOOL_INFO.mottoEnglish}"</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Legal Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {SCHOOL_INFO.fullName}. Government-Aided Day School, Kamonyi District.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400">Pre-Primary · Primary · Ordinary Level</span>
            <span>·</span>
            <span className="hover:text-slate-400">Tel: {SCHOOL_INFO.phonePrimary}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
