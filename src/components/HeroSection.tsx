import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, BookOpen, CheckCircle2, Phone, Library, Sparkles, 
  ShieldCheck, GraduationCap, ChevronLeft, ChevronRight, Image as ImageIcon 
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { useSchool } from '../context/SchoolContext';

interface HeroSectionProps {
  onExploreStreams: () => void;
  onOpenApply: () => void;
  onOpenLibrary: () => void;
  onOpenPortal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreStreams,
  onOpenApply,
  onOpenLibrary,
  onOpenPortal,
}) => {
  const { schoolLogo } = useSchool();

  // 1. Animated Rotating Words
  const animatedWords = [
    'Academic Excellence',
    'Christian Moral Values',
    'Active STEM Science Labs',
    '18 Classroom Streams',
    'National PLE & NESA Distinction',
    'Holistic Child Care',
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordFade, setWordFade] = useState(true);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordFade(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
        setWordFade(true);
      }, 250);
    }, 2800);

    return () => clearInterval(wordInterval);
  }, [animatedWords.length]);

  // 2. Animated School Showcase Photos
  const schoolPhotos = [
    {
      url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
      title: 'GS St Isidore Mugina Main Campus',
      tag: 'Mugina Sector · Kamonyi District',
      description: 'Modern academic blocks supporting Nursery, Primary, and Secondary classrooms.',
    },
    {
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
      title: 'Active Competency-Based Learning',
      tag: 'Nursery & Primary 1 to 6',
      description: 'Pupils engaged in collaborative literacy, mathematics, and science projects.',
    },
    {
      url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
      title: 'Science & Physics/Chemistry Laboratory',
      tag: 'Secondary Ordinary Level (S1 - S3)',
      description: 'Practical STEM experiments and geometry preparation for NESA exams.',
    },
    {
      url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
      title: 'Digital Library & Decodable Readers',
      tag: 'National Library Services Partner',
      description: 'Equipped with decodable Kinyarwanda & English storybooks and PLE past papers.',
    },
    {
      url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
      title: 'Sports, Choir & Traditional Itorero Troupe',
      tag: 'Extracurricular & Moral Formation',
      description: 'Fostering cultural pride, athletic stamina, and teamwork after classes.',
    },
  ];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const photoInterval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % schoolPhotos.length);
    }, 4000);

    return () => clearInterval(photoInterval);
  }, [isPaused, schoolPhotos.length]);

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % schoolPhotos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + schoolPhotos.length) % schoolPhotos.length);
  };

  return (
    <section id="home" className="relative bg-slate-950 text-white overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-slate-800">
      {/* Dynamic Background Geometry */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal-600/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Headings, Animated Words & Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Marker Ribbon */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400 tracking-wide">
              <span className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Government-Aided Day School
              </span>
              <span className="text-slate-500 hidden sm:inline">·</span>
              <span className="text-slate-300 hidden sm:inline">Diocese of Kabgayi</span>
              <span className="text-slate-500 hidden sm:inline">·</span>
              <span className="text-slate-400 hidden sm:inline">Kamonyi, Rwanda</span>
            </div>

            {/* Display Headline with Animated Rotating Words */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-tight min-h-[96px] sm:min-h-[120px]">
              <span>Nurturing Young Minds through </span>
              <span className="block mt-1 sm:mt-2">
                <span
                  className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-200 transition-all duration-300 transform ${
                    wordFade ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
                  }`}
                >
                  {animatedWords[currentWordIndex]}.
                </span>
              </span>
            </h1>

            {/* Subtitle / School Mission Statement */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
              Welcome to <strong className="text-white font-bold">GS St Isidore Mugina</strong>. Delivering comprehensive, disciplined day-school education across 18 classroom streams: <strong>Nursery (Baby to Top)</strong>, <strong>Primary (P1 to P6)</strong>, and <strong>Secondary Ordinary Level (S1 to S3)</strong> in proud partnership with the Catholic Church and MINEDUC.
            </p>

            {/* Core Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenApply}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl shadow-lg hover:shadow-emerald-900/40 transition-all cursor-pointer whitespace-nowrap hover:scale-[1.02]"
              >
                <span>Enroll for 2026/2027</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onExploreStreams}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-slate-100 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Explore 18 Streams</span>
              </button>

              <button
                onClick={onOpenLibrary}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-transparent hover:bg-white/5 border border-slate-700 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <Library className="w-4 h-4 text-amber-400" />
                <span>Digital Library</span>
              </button>

              {onOpenPortal && (
                <button
                  onClick={onOpenPortal}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-emerald-300 hover:text-white bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/50 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <span>Results Portal</span>
                </button>
              )}
            </div>

            {/* Quick Proof Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] sm:text-xs">18 Class Streams</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] sm:text-xs">National Library Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] sm:text-xs">Lunch 18k RWF/Term</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Animated Photo Slideshow with Custom Logo Overlay */}
          <div className="lg:col-span-5">
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/80 bg-slate-900 group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Photo Image Frame with Smooth Transitions */}
              <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                {schoolPhotos.map((photo, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === currentPhotoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  </div>
                ))}

                {/* Overlaid School Website Logo (top-left of photo showcase) */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/20 shadow-lg">
                  {schoolLogo ? (
                    <img
                      src={schoolLogo}
                      alt="GS St Isidore Mugina Logo"
                      className="w-9 h-9 rounded-lg object-contain bg-white p-0.5"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold">
                      <GraduationCap className="w-5 h-5 text-emerald-200" />
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-bold text-white block leading-tight">GS St Isidore Mugina</span>
                    <span className="text-[10px] text-emerald-300 block">Kamonyi District, Rwanda</span>
                  </div>
                </div>

                {/* Overlaid Slide Navigation Arrows */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white/80 hover:text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white/80 hover:text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Active Photo Caption & Metadata */}
                <div className="absolute bottom-3 left-3 right-3 z-20 space-y-1">
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
                    {schoolPhotos[currentPhotoIndex].tag}
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {schoolPhotos[currentPhotoIndex].title}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1">
                    {schoolPhotos[currentPhotoIndex].description}
                  </p>

                  {/* Dot Indicators */}
                  <div className="flex items-center gap-1.5 pt-2">
                    {schoolPhotos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPhotoIndex(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          idx === currentPhotoIndex 
                            ? 'w-6 bg-emerald-400' 
                            : 'w-1.5 bg-white/40 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
