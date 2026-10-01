import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, ChevronDown, ChevronUp, Search, Calendar, 
  BookOpen, Utensils, Award, Phone, CheckCircle2, FileText, 
  Printer, Sparkles, Clock, Shirt, Backpack 
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface FAQItem {
  id: string;
  category: 'calendar' | 'supplies' | 'fees' | 'admissions' | 'general';
  question: string;
  answer: string | React.ReactNode;
  tags: string[];
}

export const FAQSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('term-dates');

  const faqs: FAQItem[] = useMemo(() => [
    {
      id: 'term-dates',
      category: 'calendar',
      question: 'What are the official school term dates and academic calendar for 2025/2026?',
      tags: ['dates', 'calendar', 'holidays', 'terms', 'vacation'],
      answer: (
        <div className="space-y-3 text-slate-600 text-sm">
          <p>
            GS Saint Isidore Mugina strictly adheres to the official Republic of Rwanda Ministry of Education (MINEDUC) academic schedule for the 2025/2026 school year:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">Term 1 (15 Weeks)</span>
              <p className="font-semibold text-slate-800 text-xs">Sep 8, 2025 – Dec 19, 2025</p>
              <p className="text-[11px] text-slate-500 mt-1">First term examinations & Christmas vacation.</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-emerald-900 uppercase">Term 2 (Current)</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.5 rounded">Active</span>
              </div>
              <p className="font-semibold text-emerald-950 text-xs">Jan 5, 2026 – Apr 3, 2026</p>
              <p className="text-[11px] text-emerald-800 mt-1">Mid-term assessments & Easter holidays.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">Term 3 (12 Weeks)</span>
              <p className="font-semibold text-slate-800 text-xs">Apr 20, 2026 – Jul 10, 2026</p>
              <p className="text-[11px] text-slate-500 mt-1">National PLE (P6) & NESA (S3) Examinations.</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">
            *Public holidays and national commemoration periods (Kwibuka) are observed according to Government of Rwanda directives.
          </p>
        </div>
      ),
    },
    {
      id: 'supplies-list',
      category: 'supplies',
      question: 'What is the required school supply and stationery list by grade level?',
      tags: ['stationery', 'books', 'pens', 'supplies', 'materials', 'calculator', 'math set'],
      answer: (
        <div className="space-y-4 text-slate-600 text-sm">
          <p>
            Pupils are expected to report with standardized supplies on the first day of each term to ensure continuous participation in CBC (Competency-Based Curriculum) lessons:
          </p>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                  Pre-Primary / Nursery (Baby, Middle, Top)
                </h5>
              </div>
              <ul className="list-disc list-inside text-xs space-y-1 text-slate-600 pl-1">
                <li>1 A4 Drawing and coloring sketchbook</li>
                <li>1 Pack of non-toxic jumbo wax crayons or colored pencils</li>
                <li>1 Container of non-toxic modeling clay (plastiline)</li>
                <li>2 HB pencils with ergonomic grip, 1 large vinyl eraser, and 1 safety sharpener</li>
                <li>1 Durable waterproof school backpack and 1 leak-proof water bottle labeled with pupil's name</li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                  Lower Primary (P1, P2, P3)
                </h5>
              </div>
              <ul className="list-disc list-inside text-xs space-y-1 text-slate-600 pl-1">
                <li>6 Exercise books (96 pages): squared grid for Mathematics, 4-line ruled for English and Kinyarwanda writing</li>
                <li>3 HB graphite pencils, 1 vinyl eraser, and 1 30cm shatterproof plastic ruler</li>
                <li>Blue and black ballpoint pens (introduced in Primary 3)</li>
                <li>Protective plastic covers and name labels for all exercise books</li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                  Upper Primary (P4, P5, and P6 Candidates)
                </h5>
              </div>
              <ul className="list-disc list-inside text-xs space-y-1 text-slate-600 pl-1">
                <li>10 Ruled exercise books (120 or 192 pages) for core subjects</li>
                <li>Complete Oxford or Helix Mathematical Set (compass, divider, 180° protractor, 45°/60° set squares)</li>
                <li>Blue, black, and red ballpoint pens (no gel pens for official exams)</li>
                <li>Compact English-Kinyarwanda dictionary for literacy sessions</li>
                <li>A4 graph exercise book for Mathematics and Science data plotting</li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                  Secondary Ordinary Level (Senior 1, Senior 2, Senior 3)
                </h5>
              </div>
              <ul className="list-disc list-inside text-xs space-y-1 text-slate-600 pl-1">
                <li>12 Hard-cover counter books (192 pages) for STEM & Humanities subjects (Physics, Chemistry, Biology, Math, History, Geography, ICT, etc.)</li>
                <li>NESA-approved Scientific Calculator (Casio fx-82MS or equivalent model)</li>
                <li>Full geometry instruments set and 30cm metallic or rigid plastic ruler</li>
                <li>Laboratory practical notebook (ruled with alternate blank graph pages for science experiments)</li>
                <li>Graph book and drawing pencil (HB / 2B) for technical drawing and cartography</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'uniform-specifications',
      category: 'supplies',
      question: 'What are the school uniform requirements and where can parents obtain them?',
      tags: ['uniform', 'clothing', 'shoes', 'dress code', 'sweater', 'colors'],
      answer: (
        <div className="space-y-3 text-slate-600 text-sm">
          <p>
            GS Saint Isidore Mugina takes pride in dignified, modest pupil attire. Uniforms help maintain equal dignity and academic focus across our 18 streams:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <strong className="text-slate-900 block font-semibold">Boys' Standard Uniform:</strong>
              <p>• Crisp white short-sleeved collared shirt with school crest</p>
              <p>• Khaki tailored trousers (Primary) or charcoal trousers (Secondary S1–S3)</p>
              <p>• Official dark emerald-green knit sweater with V-neck and embroidered school badge</p>
              <p>• Polished black closed leather shoes with black or navy socks</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <strong className="text-slate-900 block font-semibold">Girls' Standard Uniform:</strong>
              <p>• White collared blouse with school crest</p>
              <p>• Pleated knee-length skirt in official regulation khaki (Primary) or charcoal (Secondary)</p>
              <p>• Official dark emerald-green knit sweater with V-neck and embroidered school badge</p>
              <p>• Clean black closed flat shoes with white ankle socks</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            <strong>Where to purchase:</strong> Approved uniform fabrics, pre-sewn uniforms, and embroidered crest badges are available at certified cooperative tailors in <strong>Mugina Commercial Centre</strong> (near Saint Isidore Catholic Parish) or directly through the school bursar's office.
          </div>
        </div>
      ),
    },
    {
      id: 'school-lunch',
      category: 'fees',
      question: 'How does the School Feeding Program (Gahunda yo kugaburira abana) work?',
      tags: ['lunch', 'feeding', 'food', 'meals', 'nutrition', '18000', 'canteen'],
      answer: (
        <div className="space-y-3 text-slate-600 text-sm">
          <p>
            In accordance with the Government of Rwanda national school feeding policy, GS Saint Isidore Mugina operates an on-campus modern kitchen providing hot, fresh, balanced meals every school day to all students.
          </p>
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span>Parental Feeding Contribution:</span>
              <span className="font-mono text-emerald-800 text-sm font-extrabold">18,000 RWF / Term</span>
            </div>
            <p className="text-slate-600">
              The Government of Rwanda subsidizes the remainder of the food budget. This program has reduced absenteeism to under 3% and ensures all pupils remain nourished and attentive throughout afternoon classes.
            </p>
            <div className="pt-2 border-t border-emerald-200 text-[11px] text-slate-700">
              <strong>Daily Menu Highlights:</strong> Whole beans, maize posho/ugali, rice, fortified sweet potatoes, seasonal green vegetables, and purified drinking water from the campus rainwater harvesting tanks.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'tuition-fees',
      category: 'fees',
      question: 'Is tuition free at GS Saint Isidore Mugina? What fees are required?',
      tags: ['fees', 'tuition', 'free', 'cost', 'pta', 'comptable', 'letitia'],
      answer: (
        <div className="space-y-3 text-slate-600 text-sm">
          <p>
            <strong>Yes.</strong> As an official Government-Aided school (Sous-Convention Catholique), basic tuition is fully covered under Rwanda's Free Basic Education policy. Parents do not pay tuition fees for teaching services.
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <h5 className="font-bold text-slate-900 uppercase tracking-wide">Approved Parent Association (PTA) Contributions:</h5>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li><strong>School Feeding (Lunch):</strong> 18,000 RWF per term</li>
              <li><strong>General PTA Support & Sanitation Contribution:</strong> 2,000 RWF per term</li>
              <li><strong>Candidate Mock Exam Contribution (P6 & S3 only):</strong> 3,500 RWF per year for printing past papers and district trials</li>
            </ul>
            <p className="text-slate-500 pt-1 text-[11px]">
              All fee payments are receipted by Chief Bursar <strong>Letitia (Comptable)</strong> via authorized school bank accounts or Bank of Kigali / MoMo Pay merchant codes.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'admissions-process',
      category: 'admissions',
      question: 'What documents are required to enroll a new student for the 2026/2027 year?',
      tags: ['admission', 'enrollment', 'register', 'requirements', 'transfer', 'birth certificate'],
      answer: (
        <div className="space-y-3 text-slate-600 text-sm">
          <p>
            Admissions for 2026/2027 are open for Nursery (Baby, Middle, Top), Primary (P1 to P6), and Ordinary Level (S1 to S3). Parents must submit:
          </p>
          <ol className="list-decimal list-inside text-xs space-y-1.5 text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <li><strong>Official Birth Certificate:</strong> <em>Icyemezo cy'amavuko</em> issued by Irembo / Sector Civil Registry.</li>
            <li><strong>Previous School Report Card:</strong> <em>Bulletin Scolaire</em> with stamped marks from the previous academic year (for P2–P6 and S2–S3).</li>
            <li><strong>Official Transfer Letter:</strong> <em>Urwandiko rumwimura</em> from the sending school Headteacher if transferring.</li>
            <li><strong>Two (2) Recent Passport Photos:</strong> For pupil record file and student registry.</li>
            <li><strong>Copy of Parent/Guardian National ID:</strong> <em>Kopi y'indangamuntu y'umubyeyi</em> and working contact phone number.</li>
          </ol>
          <p className="text-xs text-emerald-800 font-semibold">
            Applications can be submitted directly via the online admission portal on this website or in person at the Headteacher's office on weekdays.
          </p>
        </div>
      ),
    },
    {
      id: 'daily-timetable',
      category: 'general',
      question: 'What are the daily school operating hours and arrival times?',
      tags: ['hours', 'timetable', 'arrival', 'assembly', 'departure', 'schedule'],
      answer: (
        <div className="space-y-3 text-slate-600 text-sm">
          <p>
            Punctuality is a core virtue at GS Saint Isidore Mugina. The gates and classrooms operate on the following schedule:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                Morning Schedule:
              </span>
              <p>• <strong>6:45 AM:</strong> School gates open & morning inspection</p>
              <p>• <strong>7:30 AM:</strong> General Morning Assembly & Prayer</p>
              <p>• <strong>8:00 AM – 10:40 AM:</strong> Morning Class Periods 1 to 4</p>
              <p>• <strong>10:40 AM – 11:00 AM:</strong> Morning Break</p>
              <p>• <strong>11:00 AM – 12:20 PM:</strong> Class Periods 5 & 6</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-emerald-700" />
                Afternoon Schedule:
              </span>
              <p>• <strong>12:20 PM – 1:30 PM:</strong> Hot School Lunch & Rest</p>
              <p>• <strong>1:30 PM – 4:30 PM:</strong> Afternoon Lessons, Science Labs & ICT</p>
              <p>• <strong>4:30 PM – 5:30 PM:</strong> Remedial sessions, Scouts, Itorero & Sports</p>
              <p>• <strong>5:30 PM:</strong> Campus dismissal</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'national-exams',
      category: 'admissions',
      question: 'How does GS Saint Isidore Mugina prepare Primary 6 and Senior 3 candidates for National Examinations?',
      tags: ['exams', 'ple', 'nesa', 'p6', 's3', 'mock', 'candidate', 'success'],
      answer: (
        <div className="space-y-3 text-slate-600 text-sm">
          <p>
            Candidate preparation is led directly by Dean of Studies <strong>Mugabo Jean Damascene</strong> and senior subject specialists:
          </p>
          <ul className="list-disc list-inside text-xs space-y-1.5 text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <li><strong>Saturday Candidate Masterclasses:</strong> Intensive revision in Mathematics, Science (SET), Physics, Chemistry, English, and Kinyarwanda.</li>
            <li><strong>Monthly District & Inter-School Mock Trials:</strong> Simulated examination conditions using previous NESA and PLE papers.</li>
            <li><strong>Free Past Exam Papers Repository:</strong> Access to 10+ years of past PLE and S3 exam papers and answer keys in the school digital library.</li>
            <li><strong>One-on-One Remedial Mentorship:</strong> Dedicated guidance for pupils needing extra support to achieve Division 1 ranking.</li>
          </ul>
        </div>
      ),
    },
  ], []);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch = 
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handlePrintSupplies = () => {
    window.print();
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Parent & Student Information Centre</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Find immediate answers on MINEDUC term dates, grade-by-grade school supply lists, school feeding contributions, uniforms, and candidate exam guidelines at GS Saint Isidore Mugina.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 mb-8 space-y-4 shadow-sm">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g., term dates, supplies, lunch fee, uniform, P6 PLE)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white text-sm text-slate-900 placeholder-slate-400 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All Questions' },
                { id: 'calendar', label: 'Term Dates & Calendar' },
                { id: 'supplies', label: 'Supplies & Uniforms' },
                { id: 'fees', label: 'Fees & School Meals' },
                { id: 'admissions', label: 'Admissions & PLE/S3' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Print Checklist Button */}
            <button
              onClick={handlePrintSupplies}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
              title="Print supplies & term guidelines"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Guide</span>
            </button>
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-800">No matching questions found</h4>
              <p className="text-xs text-slate-500 mt-1">
                Try searching with different terms or call school administration directly at {SCHOOL_INFO.phonePrimary}.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded 
                      ? 'border-emerald-600 bg-white shadow-md' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full py-4 px-5 sm:px-6 flex items-start justify-between gap-4 text-left transition-colors cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        isExpanded ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        ?
                      </div>
                      <div>
                        <h3 className={`text-sm sm:text-base font-bold transition-colors ${
                          isExpanded ? 'text-emerald-950' : 'text-slate-900'
                        }`}>
                          {faq.question}
                        </h3>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          {faq.tags.slice(0, 3).map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={`p-1.5 rounded-full shrink-0 transition-transform ${
                      isExpanded ? 'bg-emerald-50 text-emerald-800 rotate-180' : 'text-slate-400'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Direct Contact Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Have a Specific Question?</span>
            </div>
            <h4 className="text-lg font-bold text-white">
              Speak directly with Headteacher Habiyaremye Charles or Bursar Letitia
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our administration office is located on campus in Mugina Sector, Kamonyi District. We are ready to assist parents with registration questions, supply confirmations, and student transfers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`tel:${SCHOOL_INFO.phonePrimary}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {SCHOOL_INFO.phonePrimary}</span>
            </a>
            <a
              href={`mailto:${SCHOOL_INFO.email}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Email Administration</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
