import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, 
  HelpCircle, ChevronDown, ChevronUp, User 
} from 'lucide-react';
import { SCHOOL_INFO, LEADERSHIP_STAFF } from '../data/schoolData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gradeInterest: 'Primary Education (P1 - P6)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'What educational levels are offered at GS St Isidore Mugina?',
      a: 'We offer a complete educational cycle from Pre-Primary / Nursery (Baby Class, Middle Class, Top Class) to Primary (P1 to P6 across Streams A, B, C) and Secondary Ordinary Level (Senior 1, 2, and 3 across Streams A, B, C).'
    },
    {
      q: 'Does GS St Isidore Mugina offer TVET technical trades or boarding?',
      a: 'No. GS St Isidore Mugina is strictly an inclusive Government-Aided Day School focused on Pre-Primary, Primary, and Secondary Ordinary Level (O-Level). TVET vocational education and private boarding in the area are provided by alternative neighboring institutions like Collège Saint Ignace Mugina TVET School.'
    },
    {
      q: 'How does the School Feeding Program (Gahunda yo kugaburira abana) work?',
      a: 'In accordance with MINEDUC guidelines and community mobilization in Kamonyi District, all students receive a balanced, warm midday meal on campus. Parents contribute a modest subsidized fee of 22,000 RWF (Primary) or 28,000 RWF (Secondary) per term.'
    },
    {
      q: 'Who should parents contact for student registration, transfers, or receipts?',
      a: 'You can contact Headteacher Habiyaremye Charles or Bursar Letitia (Comptable) at the school administration office, or call the official school line: 0788249507.'
    },
    {
      q: 'What is the school\'s partnership with the National Library Services?',
      a: 'The school administration frequently collaborates with the National Library Services (under the Rwanda Cultural Heritage Academy / Inteko y\'Umuco) to acquire graded Kinyarwanda decodable readers, cultural folklore, and English books for our vibrant classroom reading clubs.'
    }
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <span>Administration Registry</span>
            <span aria-hidden="true">·</span>
            <span>Mugina, Kamonyi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Official Administration & Campus Contact
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
            For admissions, student transfers, school feeding confirmations, or appointments with Headteacher <strong>Habiyaremye Charles</strong> or Bursar <strong>Letitia</strong>, please use the registered contact coordinates below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Official Contacts Details Box (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5 text-xs sm:text-sm">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
                Registered Contact Information
              </h3>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Registered Admin Telephone</span>
                  <a
                    href={`tel:${SCHOOL_INFO.phonePrimary}`}
                    className="text-emerald-800 hover:text-emerald-950 font-mono font-bold text-base block mt-0.5"
                  >
                    {SCHOOL_INFO.phonePrimary}
                  </a>
                  <span className="text-[11px] text-slate-500">
                    Direct line to Headteacher & Bursary Office
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">School Directorate</span>
                  <span className="text-slate-700 block mt-0.5">
                    <strong>Habiyaremye Charles</strong>, Headteacher<br />
                    <strong>Letitia</strong>, Chief Bursar (Comptable)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Physical Location</span>
                  <span className="text-slate-600 leading-relaxed block mt-0.5">
                    Mugina Sector, Kamonyi District<br />
                    Southern Province, Rwanda<br />
                    (Next to Mugina Catholic Parish)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Email Address</span>
                  <span className="text-slate-600 block mt-0.5">
                    {SCHOOL_INFO.email}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Working Hours</span>
                  <span className="text-slate-600 block mt-0.5">
                    Monday - Friday: 07:30 AM – 05:00 PM<br />
                    Saturday: 08:30 AM – 12:30 PM (Administrative Desk)
                  </span>
                </div>
              </div>
            </div>

            {/* Note on School Classification */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-slate-900 block">School Classification Note:</span>
              <p>
                GS St Isidore Mugina is a <strong>Government-Aided Day School</strong> (Sous-Convention Catholique) offering Pre-Primary, Primary (P1–P6), and Secondary (S1–S3). For TVET or boarding schools, neighboring Collège Saint Ignace Mugina is a distinct separate institution.
              </p>
            </div>
          </div>

          {/* Interactive Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Send an Official Inquiry to School Administration
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-normal">
              Our administrative desk headed by Headteacher Habiyaremye Charles and Bursar Letitia will receive your message and respond directly.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="text-base font-bold text-emerald-950">Thank You for Contacting GS St Isidore Mugina</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Your message has been safely received. The administration will contact you at <strong>{formData.phone}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      gradeInterest: 'Primary Education (P1 - P6)',
                      message: '',
                    });
                  }}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-emerald-900 bg-white border border-emerald-300 rounded-lg shadow-xs hover:bg-emerald-100"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jean Pierre Nkurunziza"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Mobile Telephone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0788 000 000"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-sm font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Grade Level of Interest *
                    </label>
                    <select
                      value={formData.gradeInterest}
                      onChange={(e) => setFormData({ ...formData, gradeInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-sm font-medium"
                    >
                      <option value="Pre-Primary / Nursery (Baby, Middle, Top)">Pre-Primary / Nursery (Baby, Middle, Top)</option>
                      <option value="Lower Primary (P1 - P3)">Lower Primary (P1 - P3)</option>
                      <option value="Upper Primary (P4 - P6 PLE)">Upper Primary (P4 - P6 PLE)</option>
                      <option value="Secondary Ordinary Level (S1 - S3)">Secondary Ordinary Level (S1 - S3)</option>
                      <option value="School Feeding Program Inquiries">School Feeding Program (Gahunda yo kugaburira abana)</option>
                      <option value="National Library Literacy Partnership">National Library Literacy Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="parent@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Question or Request *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter your question regarding admissions, classroom stream placement, or school documents..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white text-sm font-normal"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Office</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto pt-6 border-t border-slate-200">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">
              Frequently Asked Questions (Ibibazo Bikunze Kubazwa)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Common questions answered by the GS St Isidore Mugina administrative board.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {faq.q}
                  </span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {expandedFaq === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed font-normal border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
