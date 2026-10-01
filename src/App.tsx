import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsCounter } from './components/StatsCounter';
import { AboutSection } from './components/AboutSection';
import { ClassStreamsMatrix } from './components/ClassStreamsMatrix';
import { ELearningHub } from './components/ELearningHub';
import { StudentResultChecker } from './components/StudentResultChecker';
import { FeeStructureCalculator } from './components/FeeStructureCalculator';
import { StaffDirectory } from './components/StaffDirectory';
import { AdmissionSection } from './components/AdmissionSection';
import { CampusFacilities } from './components/CampusFacilities';
import { NewsAndEvents } from './components/NewsAndEvents';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { LiveChatWidget } from './components/LiveChatWidget';
import { Footer } from './components/Footer';
import { HeadteacherAdminSuite } from './components/HeadteacherAdminSuite';
import { ScrollReveal } from './components/ScrollReveal';
import { SchoolProvider, useSchool } from './context/SchoolContext';

function SchoolAppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedGradeForApply, setSelectedGradeForApply] = useState<string>('');
  const [isAdminSuiteOpen, setIsAdminSuiteOpen] = useState(false);

  const { notificationToast, setNotificationToast, isAdminAuthenticated } = useSchool();

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenPortal = () => {
    scrollToSection('portal');
  };

  const handleOpenApply = () => {
    scrollToSection('admissions');
  };

  const handleSelectGradeForApply = (gradeName: string) => {
    setSelectedGradeForApply(gradeName);
    scrollToSection('admissions');
  };

  const handleOpenAdminSuite = () => {
    setIsAdminSuiteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 relative">
      {/* Global Toast Message */}
      {notificationToast && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-slate-900 border border-emerald-500/50 text-emerald-200 text-xs shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-200 max-w-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="flex-1 font-medium">{notificationToast}</span>
          <button
            onClick={() => setNotificationToast(null)}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPortal={handleOpenPortal}
        onOpenApply={handleOpenApply}
      />

      {/* Main Content Flow with Framer Motion Scroll-Triggered Fade-In Transitions */}
      <main className="flex-1">
        {/* 1. Hero Section with Animated Rotating Words & Photo Carousel */}
        <ScrollReveal direction="none" duration={0.8}>
          <HeroSection
            onExploreStreams={() => scrollToSection('streams')}
            onOpenApply={handleOpenApply}
            onOpenLibrary={() => scrollToSection('elearning')}
            onOpenPortal={handleOpenPortal}
          />
        </ScrollReveal>

        {/* 2. Quantified Proof Metrics (18 streams, 1,280+ students, 35 staff) */}
        <ScrollReveal delay={0.1} distance={24}>
          <StatsCounter />
        </ScrollReveal>

        {/* 3. About & Institutional Identity (Sous-Convention Catholique & National Library Partnership) */}
        <ScrollReveal delay={0.15}>
          <AboutSection />
        </ScrollReveal>

        {/* 4. 18 Classroom Streams Matrix (Nursery Baby-Top, P1-P6 A/B/C, S1-S3 A/B/C) */}
        <ScrollReveal delay={0.15}>
          <ClassStreamsMatrix onSelectGradeForApply={handleSelectGradeForApply} />
        </ScrollReveal>

        {/* 5. Digital Library & E-Learning Hub (PLE, S3 & National Library Decodable Storybooks) */}
        <ScrollReveal delay={0.15}>
          <ELearningHub />
        </ScrollReveal>

        {/* 6. Interactive Student Term Results Checker (Real campus background + Headteacher Admin login) */}
        <ScrollReveal delay={0.15}>
          <StudentResultChecker
            onOpenAdminSuite={handleOpenAdminSuite}
          />
        </ScrollReveal>

        {/* 7. Day School Fees & School Feeding Calculator (Gahunda yo kugaburira abana) */}
        <ScrollReveal delay={0.15}>
          <FeeStructureCalculator />
        </ScrollReveal>

        {/* 8. School Leadership & Staff Directory (Secured with credentials: only logged-in staff can edit photo & bio) */}
        <ScrollReveal delay={0.15}>
          <StaffDirectory
            onOpenAdminSuite={handleOpenAdminSuite}
          />
        </ScrollReveal>

        {/* 9. Online Admission Application Form */}
        <ScrollReveal delay={0.15}>
          <AdmissionSection
            preselectedGrade={selectedGradeForApply}
            onClearPreselected={() => setSelectedGradeForApply('')}
          />
        </ScrollReveal>

        {/* 10. Campus Facilities & Learning Environment (features real campus photo) */}
        <ScrollReveal delay={0.15}>
          <CampusFacilities />
        </ScrollReveal>

        {/* 11. Latest School News, Published Bulletins & Academic Calendar */}
        <ScrollReveal delay={0.15}>
          <NewsAndEvents
            onOpenAdminSuite={handleOpenAdminSuite}
          />
        </ScrollReveal>

        {/* 12. Frequently Asked Questions (Term dates, school supply lists, uniform, lunch program) */}
        <ScrollReveal delay={0.15}>
          <FAQSection />
        </ScrollReveal>

        {/* 13. Official Administration Contacts & Directions (Tel: 0788249507) */}
        <ScrollReveal delay={0.15}>
          <ContactSection />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <Footer
        onNavClick={scrollToSection}
        onOpenPortal={handleOpenPortal}
        onOpenApply={handleOpenApply}
      />

      {/* Headteacher Admin Suite Modal */}
      {isAdminSuiteOpen && (
        <HeadteacherAdminSuite onClose={() => setIsAdminSuiteOpen(false)} />
      )}

      {/* Interactive Floating Chatbot Widget (School FAQ & Assistance) */}
      <LiveChatWidget onOpenApply={handleOpenApply} />
    </div>
  );
}

export function App() {
  return (
    <SchoolProvider>
      <SchoolAppContent />
    </SchoolProvider>
  );
}

export default App;
