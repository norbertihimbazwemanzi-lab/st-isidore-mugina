import React from 'react';
import { BookOpen, ShieldCheck, HeartHandshake, Compass, Quote, Library, Phone } from 'lucide-react';
import { SCHOOL_INFO, LEADERSHIP_STAFF } from '../data/schoolData';

export const AboutSection: React.FC = () => {
  const headteacher = LEADERSHIP_STAFF[0];
  const bursar = LEADERSHIP_STAFF[1];

  const pillars = [
    {
      title: '01. Foundational Reading & Local Literacy',
      description: 'Strengthening early grade reading in Kinyarwanda and English through our partnership with the National Library Services (Rwanda Cultural Heritage Academy), fostering independent readers across P1 to P6.',
      icon: Library,
    },
    {
      title: '02. Ordinary Level Academic Rigor (S1 to S3)',
      description: 'Solid preparation under the Competence-Based Curriculum (CBC) in Mathematics, Physical Sciences, Biology, and ICT, achieving outstanding pass rates in NESA National Examinations.',
      icon: BookOpen,
    },
    {
      title: '03. Inclusive Pre-Primary / Nursery Care',
      description: 'Child-centered early childhood development from Baby Class to Top Class, building emotional safety, cognitive curiosity, nutrition habits, and motor skills.',
      icon: ShieldCheck,
    },
    {
      title: '04. Rwandan Cultural Heritage & Character (Itorero)',
      description: 'Instilling national values of Ubupfura (integrity), Ubutwari, and solidarity through Itorero ry\'Ishuri, community activities, and daily communal lunch (Gahunda yo kugaburira abana ku ishuri).',
      icon: Compass,
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <span>Our Identity & Mission</span>
            <span aria-hidden="true">·</span>
            <span>Government-Aided Day School</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            A Trusted Center of Learning, Literacy & Moral Formation in Mugina
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            Groupe Scolaire Saint Isidore Mugina operates as a government-aided day school in formal partnership between the Government of Rwanda (MINEDUC / REB) and the Catholic Church (Diocese of Kabgayi). We serve children from early childhood (Nursery: Baby, Middle, Top) through Primary (P1 to P6) and Secondary Ordinary Level (S1 to S3).
          </p>
        </div>

        {/* Headteacher's Address and National Library Partnership Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Headteacher Address Card */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-2xl border border-slate-200 shadow-sm relative">
            <Quote className="w-10 h-10 text-emerald-100 absolute top-6 right-6" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-lg shrink-0 border-2 border-emerald-600">
                HC
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {headteacher.name}
                </h3>
                <p className="text-xs font-semibold text-emerald-800">
                  {headteacher.role} · {SCHOOL_INFO.name}
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  Tel: {headteacher.phone}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-normal">
              <p>
                "Dear parents, guardians, and members of the Mugina and Kamonyi community: Welcome to GS St Isidore Mugina. As an inclusive government-aided day school, our duty is to ensure that no child in our sector is left behind in learning."
              </p>
              <p>
                "We take great pride in our structured 18 classroom streams—from the tender beginnings in Nursery Baby Class, through the vital literacy years of Primary 1 to 6, up to our rigorous Ordinary Level Secondary classes (Senior 1, 2, and 3). In collaboration with our bursar, <strong>Letitia</strong>, and our entire teaching staff, we ensure strict accountability, caring school feeding, and disciplined classroom guidance."
              </p>
              <p>
                "Our administrative focus on literacy recently led us to formalize cooperation with the <strong>National Library Services under the Rwanda Cultural Heritage Academy</strong>, bringing authentic decodable storybooks and reading programs straight into the hands of our young learners. We invite all parents to partner with us in educating their children."
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">Ubumenyi, Uburere Ntimatima n'Umuco</span>
              <span>Sous-Convention Catholique · Diocese of Kabgayi</span>
            </div>
          </div>

          {/* National Library Partnership & Science Spotlight */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
              <div className="relative aspect-[4/3]">
                <img
                  src="/src/assets/images/mugina_science_lab_1790690782848.jpg"
                  alt="Students engaged in science and literacy discovery at GS St Isidore Mugina"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-semibold text-emerald-300">National Library Services Initiative</div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    Promoting Reading Culture & Scientific Inquiry
                  </h4>
                </div>
              </div>
              <div className="p-5 text-xs text-slate-600 leading-relaxed space-y-2">
                <p>
                  <strong>Rwanda Cultural Heritage Academy Collaboration:</strong> Leadership study visits and resource sharing with the National Library have enriched our reading corners with Kinyarwanda children's storybooks, decodable phonics, and science exploration kits.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Daily Reading Hours</span>
                  <span className="font-semibold text-emerald-800">P1 to P6 & S1 to S3</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
