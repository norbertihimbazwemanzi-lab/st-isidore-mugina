import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Phone, Library, Sparkles, ShieldCheck, GraduationCap } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface HeroSectionProps {
  onExploreStreams: () => void;
  onOpenApply: () => void;
  onOpenLibrary: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreStreams,
  onOpenApply,
  onOpenLibrary,
}) => {
  return (
    <section id="home" className="relative bg-slate-950 text-white overflow-hidden py-16 sm:py-24 lg:py-28 border-b border-slate-800">
      {/* Clean Academic Geometric Background (No background photo on Home) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal-600/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Unboxed Metadata Trust Marker (Strict Zero-Pill) */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-emerald-400 mb-4 tracking-wide">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Government-Aided Day School
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Catholic Diocese of Kabgayi</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Kamonyi District, Rwanda</span>
          </div>

          {/* Main Display Headline with text-wrap: balance */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6" style={{ textWrap: 'balance' }}>
            Nurturing Young Minds from Nursery & Primary to Ordinary Level.
          </h1>

          {/* Subtitle / School Mission Statement */}
          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl font-normal">
            Welcome to <span className="font-semibold text-white">GS St Isidore Mugina</span>. Providing inclusive, quality day-school education across 18 classroom streams: <strong>Nursery (Baby to Top)</strong>, <strong>Primary (P1 to P6)</strong>, and <strong>Secondary (S1 to S3)</strong> in strong partnership with the Catholic Church and MINEDUC.
          </p>

          {/* Core Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
            <button
              onClick={onOpenApply}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Enroll for 2026/2027</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreStreams}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-100 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg backdrop-blur-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Explore 18 Class Streams</span>
            </button>
            <button
              onClick={onOpenLibrary}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-300 hover:text-white bg-transparent hover:bg-white/5 border border-slate-700 rounded-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <Library className="w-4 h-4 text-amber-400" />
              <span>Digital Library & PLE Papers</span>
            </button>
          </div>

          {/* Highlights Adjacency */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>P1 to P6 & S1 to S3 Streams</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>National Library Literacy Partnership</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Nutritious School Feeding Program</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notice Ribbon */}
      <div className="mt-12 pt-4 border-t border-slate-800/80 bg-slate-900/60 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px] bg-amber-400/20 px-2 py-0.5 rounded">
              Administration
            </span>
            <span className="truncate">
              Direct Contact: Headteacher <strong>Habiyaremye Charles</strong> & Bursar <strong>Letitia</strong> at <span className="font-mono text-emerald-400 font-bold">{SCHOOL_INFO.phonePrimary}</span>
            </span>
          </div>
          <button
            onClick={onOpenApply}
            className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 shrink-0 cursor-pointer text-[11px]"
          >
            Apply for Nursery, P1-P6 & S1-S3 →
          </button>
        </div>
      </div>
    </section>
  );
};
