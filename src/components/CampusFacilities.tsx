import React from 'react';
import { BookOpen, FlaskConical, Trophy, Utensils, Sparkles, Heart } from 'lucide-react';

export const CampusFacilities: React.FC = () => {
  const facilities = [
    {
      title: 'School Library & National Literacy Corner',
      description: 'Stocked with hundreds of decodable children\'s storybooks, Kinyarwanda readers from the Rwanda Cultural Heritage Academy, and textbooks supporting daily literacy hours across Nursery, Primary (P1-P6), and Secondary (S1-S3).',
      icon: BookOpen,
      image: '/src/assets/images/mugina_sports_culture_1790690806533.jpg',
      tag: 'National Library Services Partner · Daily Reading',
    },
    {
      title: 'Science & Discovery Laboratory',
      description: 'Modern physical sciences, biology, and chemistry facility where S1 to S3 learners conduct practical experiments and P4 to P6 learners explore Science and Elementary Technology (SET).',
      icon: FlaskConical,
      image: '/src/assets/images/mugina_science_lab_1790690782848.jpg',
      tag: 'CBC Practicals & NESA Standard',
    },
    {
      title: 'GS St Isidore Mugina Main Classroom Blocks',
      description: 'Single-story stone masonry classroom blocks with spacious windows, landscaped grass terraces, and safe pathways connecting Nursery, Primary (P1-P6), and Secondary (S1-S3) learning halls.',
      icon: Trophy,
      image: '/src/assets/images/real_mugina_campus_1790692410622.jpg',
      tag: 'Main Campus Grounds · Mugina Sector',
    },
  ];

  return (
    <section id="campus" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <span>Life at Mugina</span>
            <span aria-hidden="true">·</span>
            <span>Campus & Environment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            A Safe, Inspiring Environment for Every Child
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
            Located next to Mugina Catholic Parish in Kamonyi District, our inclusive day school offers modern classrooms, a well-curated library, secure playgrounds for nursery children, and clean dining facilities.
          </p>
        </div>

        {/* 3 Marquee Visual Facility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {facilities.map((fac, idx) => {
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={fac.image}
                      alt={fac.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] font-semibold text-emerald-300 block">
                        {fac.tag}
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">
                        {fac.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {fac.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Amenities Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">School Lunch Kitchen</span>
              <span className="text-slate-500">Daily hot, balanced meals for all day students</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Nursery Safe Play Yard</span>
              <span className="text-slate-500">Dedicated sandpit and play equipment for Baby-Top</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Digital Smart Classroom</span>
              <span className="text-slate-500">Basic computer literacy for S1-S3 & P4-P6</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Health & First-Aid Post</span>
              <span className="text-slate-500">Coordination with Mugina Health Center</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
