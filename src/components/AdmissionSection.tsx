import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, ArrowRight, ArrowLeft, Printer, 
  School, Phone, User, Calendar 
} from 'lucide-react';
import { SCHOOL_INFO, CLASS_STREAMS_DATA } from '../data/schoolData';

interface AdmissionSectionProps {
  preselectedGrade?: string;
  onClearPreselected?: () => void;
}

export const AdmissionSection: React.FC<AdmissionSectionProps> = ({
  preselectedGrade = '',
  onClearPreselected,
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Student
    fullName: '',
    gender: 'Male',
    dob: '2015-04-12',
    previousSchool: '',
    previousGrade: 'Nursery Top Class',
    // Step 2: Target Grade & Stream
    chosenGrade: preselectedGrade || 'Primary 1 (P1)',
    chosenStreamPreference: 'Stream A',
    feedingProgramAccepted: true,
    specialNeeds: 'None',
    // Step 3: Guardian
    guardianName: '',
    guardianPhone: '+250 78',
    guardianEmail: '',
    relationship: 'Father',
    residenceDistrict: 'Kamonyi',
    residenceSector: 'Mugina',
  });

  useEffect(() => {
    if (preselectedGrade) {
      setFormData((prev) => ({
        ...prev,
        chosenGrade: preselectedGrade,
      }));
    }
  }, [preselectedGrade]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const generatedRef = `GS-MUG-2026-${randomCode}`;
      setReferenceId(generatedRef);
      setIsSubmitted(true);
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <section id="admissions" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <School className="w-4 h-4 text-emerald-700" />
            <span>Inclusive Day School Enrollment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Nursery, Primary & Secondary Admission Form
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-normal">
            Registration for academic year 2026/2027. Government-aided subsidies apply for all Day Scholars across our 18 classroom streams.
          </p>
        </div>

        {!isSubmitted ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
            {/* Step Progress Indicators */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  1
                </span>
                <span className={`text-xs font-medium ${step >= 1 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                  Pupil / Student Info
                </span>
              </div>
              <div className="h-0.5 w-12 sm:w-24 bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  2
                </span>
                <span className={`text-xs font-medium ${step >= 2 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                  Class & Stream Choice
                </span>
              </div>
              <div className="h-0.5 w-12 sm:w-24 bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  3
                </span>
                <span className={`text-xs font-medium ${step >= 3 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                  Parent & Submit
                </span>
              </div>
            </div>

            <form onSubmit={handleNextStep}>
              {/* Step 1: Student Demographics */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="text-base font-bold text-slate-900 mb-4">
                    1. Child's Personal & Prior Schooling Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Child's Full Name (amazina y'umwana) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="e.g. Mugisha Jean de Dieu"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Gender (Igitsina) *
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                      >
                        <option value="Male">Male (Gabo)</option>
                        <option value="Female">Female (Gore)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.dob}
                        onChange={(e) => handleInputChange('dob', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Previous School / Nursery Attended *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.previousSchool}
                        onChange={(e) => handleInputChange('previousSchool', e.target.value)}
                        placeholder="e.g. Mugina Catholic Nursery / EP Runda"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Previous Grade Completed (or PLE / Inshuke Completion)
                      </label>
                      <input
                        type="text"
                        value={formData.previousGrade}
                        onChange={(e) => handleInputChange('previousGrade', e.target.value)}
                        placeholder="e.g. Completed Nursery Top Class, or PLE Aggregate 14"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Class & Stream Selection */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="text-base font-bold text-slate-900 mb-4">
                    2. Desired Grade Level & Classroom Stream (18 Streams)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Grade Level Applying For *
                      </label>
                      <select
                        value={formData.chosenGrade}
                        onChange={(e) => handleInputChange('chosenGrade', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-medium"
                      >
                        <optgroup label="Pre-Primary / Nursery (Amashuri y'Inshuke)">
                          <option value="Nursery - Baby Class">Nursery: Baby Class (Age 3)</option>
                          <option value="Nursery - Middle Class">Nursery: Middle Class (Age 4)</option>
                          <option value="Nursery - Top Class">Nursery: Top Class (Age 5 - P1 Prep)</option>
                        </optgroup>
                        <optgroup label="Primary Education (Amashuri Abanza P1 - P6)">
                          <option value="Primary 1 (P1)">Primary 1 (Streams A, B, C)</option>
                          <option value="Primary 2 (P2)">Primary 2 (Streams A, B)</option>
                          <option value="Primary 3 (P3)">Primary 3 (Streams A, B)</option>
                          <option value="Primary 4 (P4)">Primary 4 (Streams A, B, C)</option>
                          <option value="Primary 5 (P5)">Primary 5 (Streams A, B)</option>
                          <option value="Primary 6 (P6)">Primary 6 (Streams A, B - PLE Candidates)</option>
                        </optgroup>
                        <optgroup label="Secondary Ordinary Level (Amashuri Yisumbuye S1 - S3)">
                          <option value="Senior 1 (S1)">Senior 1 (Streams A, B, C)</option>
                          <option value="Senior 2 (S2)">Senior 2 (Streams A, B, C)</option>
                          <option value="Senior 3 (S3)">Senior 3 (Streams A, B - NESA Exam Candidates)</option>
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Stream Assignment Preference
                      </label>
                      <select
                        value={formData.chosenStreamPreference}
                        onChange={(e) => handleInputChange('chosenStreamPreference', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                      >
                        <option value="Stream A">Stream A</option>
                        <option value="Stream B">Stream B</option>
                        <option value="Stream C (where applicable)">Stream C (P1, P4, S1, S2)</option>
                        <option value="Administration Discretion">Assigned by Head of Studies (Recommended)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Attendance Model
                      </label>
                      <input
                        type="text"
                        disabled
                        value="Inclusive Day Scholar (With Daily School Lunch)"
                        className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-sm text-slate-700 cursor-not-allowed font-medium"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 mt-4">
                    <span className="font-bold">Gahunda yo kugaburira abana ku ishuri:</span> As an inclusive day school in Kamonyi District, all students benefit from the daily hot meal program prepared on campus with strict hygiene and nutrition standards.
                  </div>
                </div>
              )}

              {/* Step 3: Guardian Contact Details */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h3 className="text-base font-bold text-slate-900 mb-4">
                    3. Parent / Guardian Contact Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Parent / Guardian Full Name (Umubyeyi / Umurezi) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.guardianName}
                        onChange={(e) => handleInputChange('guardianName', e.target.value)}
                        placeholder="e.g. Celestin Twagirayezu"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Relationship to Child *
                      </label>
                      <select
                        value={formData.relationship}
                        onChange={(e) => handleInputChange('relationship', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                      >
                        <option value="Father">Father (Data)</option>
                        <option value="Mother">Mother (Mama)</option>
                        <option value="Legal Guardian">Legal Guardian (Umurezi)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Primary Mobile Telephone (for School SMS Alerts) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.guardianPhone}
                        onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                        placeholder="0788 000 000"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-mono font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Home Sector / Cell in Kamonyi *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.residenceSector}
                        onChange={(e) => handleInputChange('residenceSector', e.target.value)}
                        placeholder="e.g. Mugina, Runda, Nyamiyaga"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-slate-500">
                    Application details are processed under the supervision of Headteacher <strong>Habiyaremye Charles</strong> and Bursar <strong>Letitia</strong> at the Mugina school office.
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-200">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <span />
                )}

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <span>{step === 3 ? 'Submit Application' : 'Continue to Next Step'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Slip */
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-lg text-slate-800 print:shadow-none print:border-none">
            <div className="text-center pb-6 border-b border-slate-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Application Received Successfully!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Your admission request has been logged in the GS St Isidore Mugina day school registry.
              </p>
              <div className="mt-3 inline-block bg-slate-100 border border-slate-300 px-4 py-1.5 rounded-lg">
                <span className="text-xs text-slate-600 block">Tracking Reference Code:</span>
                <span className="text-lg font-mono font-black text-emerald-900">{referenceId}</span>
              </div>
            </div>

            <div className="py-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-slate-500 block">Child's Name:</span>
                  <strong className="text-slate-900">{formData.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Applied Grade:</span>
                  <strong className="text-slate-900">{formData.chosenGrade}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Attendance:</span>
                  <strong className="text-slate-900">Day Scholar (With School Lunch)</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Parent / Guardian:</span>
                  <strong className="text-slate-900">{formData.guardianName} ({formData.guardianPhone})</strong>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-emerald-50/50">
                <h4 className="font-bold text-slate-900 mb-2">Next Steps for Enrollment:</h4>
                <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                  <li>Keep your reference code <strong className="font-mono">{referenceId}</strong> safe.</li>
                  <li>Bursar <strong>Letitia</strong> will contact your phone number <strong>{formData.guardianPhone}</strong> to schedule school uniform fitting and lunch registration.</li>
                  <li>For any urgent verification, you may call the school administration directly at <strong className="font-mono">{SCHOOL_INFO.phonePrimary}</strong>.</li>
                </ol>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                  if (onClearPreselected) onClearPreselected();
                }}
                className="text-xs text-slate-600 hover:text-slate-900"
              >
                Submit another application
              </button>

              <button
                onClick={handlePrintSlip}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Print Application Slip</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
