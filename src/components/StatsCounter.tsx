import React from 'react';
import { Users, Award, BookOpen, GraduationCap, Utensils } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

export const StatsCounter: React.FC = () => {
  const stats = [
    {
      label: 'Classroom Streams',
      value: '18',
      detail: 'Nursery, P1–P6 & S1–S3',
      icon: BookOpen,
    },
    {
      label: 'Enrolled Day Scholars',
      value: '1,280+',
      detail: 'Nursery to Ordinary Level',
      icon: Users,
    },
    {
      label: 'PLE & S3 Pass Rate',
      value: '98.4%',
      detail: 'National Examination Results',
      icon: Award,
    },
    {
      label: 'Teaching & Admin Staff',
      value: '35',
      detail: 'Led by Habiyaremye Charles',
      icon: GraduationCap,
    },
    {
      label: 'School Lunch Feeding',
      value: '100%',
      detail: 'Nutritious Daily Meal for All',
      icon: Utensils,
    },
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col justify-between p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-emerald-200 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <Icon className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                    {stat.value}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {stat.detail}
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
