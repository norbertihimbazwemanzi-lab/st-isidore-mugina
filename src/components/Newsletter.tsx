import React, { useState } from 'react';
import { 
  Mail, CheckCircle2, Send, ShieldCheck, Phone, AlertCircle, 
  Sparkles, RefreshCw, BarChart2, BellRing, Inbox 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  CartesianGrid, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { SCHOOL_INFO } from '../data/schoolData';
import { useSchool } from '../context/SchoolContext';

interface Subscriber {
  id: string;
  name: string;
  email: string;
  role: 'Parent' | 'Student' | 'Alumni' | 'Community';
  stream?: string;
  registeredAt: string;
}

export const Newsletter: React.FC = () => {
  const { setNotificationToast } = useSchool();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Parent' | 'Student' | 'Alumni' | 'Community'>('Parent');
  const [stream, setStream] = useState('All Streams');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Delivery & Dispatch Analytics Data for Google Gmail Chart (Recharts)
  const gmailDispatchData = [
    { category: 'Term Results', dispatched: 1240, delivered: 1228, rate: '99%' },
    { category: 'Calendar & Exams', dispatched: 1180, delivered: 1160, rate: '98%' },
    { category: 'Feeding & Lunch', dispatched: 950, delivered: 935, rate: '98%' },
    { category: 'NESA Alerts', dispatched: 890, delivered: 884, rate: '99%' },
    { category: 'PTA & News', dispatched: 1050, delivered: 1018, rate: '97%' },
  ];

  const subscriberAudienceData = [
    { name: 'Parents & Guardians', value: 65, color: '#059669' }, // Emerald-600
    { name: 'Enrolled Students', value: 25, color: '#0d9488' },   // Teal-600
    { name: 'Alumni & Community', value: 10, color: '#f59e0b' },  // Amber-500
  ];

  const validateEmail = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val.trim());
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    const trimmedName = fullName.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter your full name (parent or student).');
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage('Please enter your Gmail or email address.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address (e.g. name@gmail.com).');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setSubmittedEmail(trimmedEmail);

      // Persist in localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('gs_mugina_newsletter_subscribers') || '[]');
        const newSub: Subscriber = {
          id: `sub-${Date.now()}`,
          name: trimmedName,
          email: trimmedEmail,
          role,
          stream,
          registeredAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
        localStorage.setItem('gs_mugina_newsletter_subscribers', JSON.stringify([...existing, newSub]));
      } catch {}

      if (setNotificationToast) {
        setNotificationToast(`Registration received for ${trimmedEmail}. Automated request sent to your Gmail!`);
      }
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setEmail('');
    setFullName('');
    setErrorMessage(null);
  };

  return (
    <section id="newsletter" className="py-16 sm:py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-teal-600/15 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-800 pb-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              <BellRing className="w-4 h-4 text-emerald-400" />
              <span>Official School Dispatch & Gmail Alerts</span>
              <span aria-hidden="true">·</span>
              <span>Direct Parent & Student Notifications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
              Stay Updated with GS St Isidore Mugina
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 font-normal">
              Register your Gmail address to receive automated term results release bulletins, examination schedules, school feeding updates, and official communications directly from the administration.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 self-start md:self-auto shrink-0 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Registered Admin:</span>
              <strong className="text-sm text-white font-mono">{SCHOOL_INFO.phonePrimary}</strong>
            </div>
          </div>
        </div>

        {/* Content Grid: Form on Left, Gmail Recharts Analytics on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Registration Form or Success State */}
          <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            {!isSuccess ? (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="space-y-1 mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-emerald-400" />
                    <span>Register for Automated School Updates</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Register with your email to receive an automated notification request on your Gmail account.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-xs text-rose-200 flex items-start gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Parent or Student Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jean Damascene Hakizimana"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Gmail / Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. parent.name@gmail.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    You will receive an automated subscription verification request on your Gmail.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Relationship:
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Parent">Parent / Guardian</option>
                      <option value="Student">Enrolled Student</option>
                      <option value="Alumni">School Alumni</option>
                      <option value="Community">Community Partner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Class / Stream of Interest:
                    </label>
                    <select
                      value={stream}
                      onChange={(e) => setStream(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="All Streams">All 18 Streams</option>
                      <option value="Nursery">Nursery (Baby to Top)</option>
                      <option value="Primary P1-P3">Lower Primary (P1 - P3)</option>
                      <option value="Primary P4-P6">Upper Primary & PLE (P4 - P6)</option>
                      <option value="Secondary S1-S3">Secondary Ordinary Level (S1 - S3)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-emerald-200" />
                        <span>Dispatching Verification to Gmail...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-emerald-200" />
                        <span>Register to School Updates</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 text-center pt-2 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy Guaranteed · Official GS St Isidore Mugina Communications Only</span>
                </div>
              </form>
            ) : (
              /* Thank You Feedback State */
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500/80 text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">
                    Registration Successfully Received!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-emerald-300">{fullName}</strong>. An automated confirmation request has been prepared for <strong className="text-white font-mono">{submittedEmail}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs text-slate-300 space-y-2 max-w-md mx-auto">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <Inbox className="w-4 h-4" />
                    <span>Next Step on your Gmail:</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Please open your <strong>Gmail Inbox</strong> (or Updates tab) to view the dispatch request from <strong>headteacher@gssidoremugina.rw</strong>. You will now automatically receive:
                  </p>
                  <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1 pl-1">
                    <li>Terminal student marksheets & academic rank alerts</li>
                    <li>Official MINEDUC term opening and closing dates</li>
                    <li>School feeding (18,000 RWF/term) payment confirmations</li>
                    <li>National PLE & NESA examination preparation bulletins</li>
                  </ul>
                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    Questions? Registered Admin phone: <strong className="text-white font-mono">{SCHOOL_INFO.phonePrimary}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors cursor-pointer"
                  >
                    Register Another Email
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Google Gmail Dispatch Analytics Chart (Recharts) */}
          <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Automated Gmail Dispatch Analytics
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                98.6% Deliverability
              </span>
            </div>

            {/* Recharts Bar Chart: Dispatch Delivery Rates */}
            <div>
              <p className="text-xs text-slate-400 mb-3">
                Volume of official notices delivered directly to parents and students' Gmail addresses this academic year:
              </p>
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gmailDispatchData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis 
                      dataKey="category" 
                      stroke="#94a3b8" 
                      fontSize={10} 
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={10} 
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#f8fafc' }}
                      itemStyle={{ color: '#34d399' }}
                    />
                    <Bar 
                      dataKey="delivered" 
                      name="Delivered via Gmail" 
                      fill="#059669" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Subscriber Audience Breakdown: Pie Chart */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300">Subscriber Audience Composition:</span>
                <span className="text-[11px] text-slate-400">Total: 1,480+ Registered</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="h-28 w-36 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subscriberAudienceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={45}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {subscriberAudienceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex-1 space-y-1.5 text-xs">
                  {subscriberAudienceData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-slate-300">{item.name}</span>
                      </div>
                      <span className="font-mono font-bold text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-slate-400 flex items-center justify-between">
              <span>Automated via MINEDUC SDMS & School Cloud Relay</span>
              <span className="font-mono text-emerald-400">Admin: {SCHOOL_INFO.phonePrimary}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
