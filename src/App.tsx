import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
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
import { Footer } from './components/Footer';
import { HeadteacherAdminSuite } from './components/HeadteacherAdminSuite';
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

      {/* 1. Official Government & Contact Top Notice Bar (Tel: 0788249507) */}
      <TopBar onOpenPortal={handleOpenPortal} onOpenApply={handleOpenApply} />

      {/* 2. Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPortal={handleOpenPortal}
        onOpenApply={handleOpenApply}
      />

      {/* 3. Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section (No background photo on Home, clean academic backdrop) */}
        <HeroSection
          onExploreStreams={() => scrollToSection('streams')}
          onOpenApply={handleOpenApply}
          onOpenLibrary={() => scrollToSection('elearning')}
        />

        {/* Quantified Proof Metrics (18 streams, 1,280+ students, 35 staff) */}
        <StatsCounter />

        {/* About & Institutional Identity (Sous-Convention Catholique & National Library Partnership) */}
        <AboutSection />

        {/* 18 Classroom Streams Matrix (Nursery Baby-Top, P1-P6 A/B/C, S1-S3 A/B/C) */}
        <ClassStreamsMatrix onSelectGradeForApply={handleSelectGradeForApply} />

        {/* Digital Library & E-Learning Hub (PLE, S3 & National Library Decodable Storybooks) */}
        <ELearningHub />

        {/* Interactive Student Term Results Checker (Real campus background + Headteacher Admin login) */}
        <StudentResultChecker
          onOpenAdminSuite={handleOpenAdminSuite}
        />

        {/* Day School Fees & School Feeding Calculator (Gahunda yo kugaburira abana) */}
        <FeeStructureCalculator />

        {/* School Leadership & Staff Directory (Teachers with class streams and subjects) */}
        <StaffDirectory
          onOpenAdminSuite={handleOpenAdminSuite}
        />

        {/* Online Admission Application Form */}
        <AdmissionSection
          preselectedGrade={selectedGradeForApply}
          onClearPreselected={() => setSelectedGradeForApply('')}
        />

        {/* Campus Facilities & Learning Environment (features real campus photo) */}
        <CampusFacilities />

        {/* Latest School News, Published Bulletins & Academic Calendar */}
        <NewsAndEvents
          onOpenAdminSuite={handleOpenAdminSuite}
        />

        {/* Official Administration Contacts & Directions (Tel: 0788249507) */}
        <ContactSection />
      </main>

      {/* 4. Footer */}
      <Footer
        onNavClick={scrollToSection}
        onOpenPortal={handleOpenPortal}
        onOpenApply={handleOpenApply}
      />

      {/* 5. Headteacher Admin Suite Modal (Code: 280508200528) */}
      {isAdminSuiteOpen && (
        <HeadteacherAdminSuite onClose={() => setIsAdminSuiteOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <SchoolProvider>
      <SchoolAppContent />
    </SchoolProvider>
  );
}
