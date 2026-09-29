import React from 'react';
import { Phone, Mail, MapPin, GraduationCap, ShieldCheck, BookOpen } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface TopBarProps {
  onOpenPortal: () => void;
  onOpenApply: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenPortal, onOpenApply }) => {
  return (
    <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Government-Aided & Church Partnership Notice */}
          <div className="flex items-center gap-2.5 text-slate-400 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Republic of Rwanda · Government-Aided School (Sous-Convention Catholique)
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              Mugina Sector, Kamonyi District
            </span>
          </div>

          {/* Contact Details & Direct Telephone 0788249507 */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a 
              href={`tel:${SCHOOL_INFO.phonePrimary}`} 
              className="flex items-center gap-1 text-emerald-300 hover:text-white font-mono font-semibold transition-colors"
              title="Official Administration Phone"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{SCHOOL_INFO.phonePrimary}</span>
            </a>
            <span className="text-slate-700">|</span>
            <span className="hidden lg:inline text-slate-400">
              Nursery · Primary (P1–P6) · Secondary (S1–S3)
            </span>
            <span className="hidden lg:inline text-slate-700">|</span>
            <button
              onClick={onOpenPortal}
              className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer flex items-center gap-1"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Results Portal</span>
            </button>
            <button
              onClick={onOpenApply}
              className="font-medium text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
            >
              Admission 2026/27
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
