import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PersonalInfoForm } from './components/forms/PersonalInfoForm';
import { ExperienceForm } from './components/forms/ExperienceForm';
import { EducationForm } from './components/forms/EducationForm';
import { SkillsForm } from './components/forms/SkillsForm';
import { ProjectsForm } from './components/forms/ProjectsForm';
import { CertificationsForm } from './components/forms/CertificationsForm';
import { AchievementsForm } from './components/forms/AchievementsForm';
import { FinalizeStep } from './components/forms/FinalizeStep';
import { ResumePreview } from './components/Preview';
import { Button } from './components/ui';
import { FileText, Download, User, Briefcase, GraduationCap, Code, FolderGit2, ChevronRight, ChevronLeft, Palette, CheckCircle, Award, Trophy } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { useResumeStore } from './store';
import { Toaster, toast } from 'sonner';

const STEPS = [
  { id: 'personal', label: 'Personal Info', icon: User, component: PersonalInfoForm },
  { id: 'experience', label: 'Experience', icon: Briefcase, component: ExperienceForm },
  { id: 'education', label: 'Education', icon: GraduationCap, component: EducationForm },
  { id: 'skills', label: 'Skills', icon: Code, component: SkillsForm },
  { id: 'projects', label: 'Projects', icon: FolderGit2, component: ProjectsForm },
  { id: 'certifications', label: 'Certifications', icon: Award, component: CertificationsForm },
  { id: 'achievements', label: 'Achievements', icon: Trophy, component: AchievementsForm },
  { id: 'finalize', label: 'Review', icon: CheckCircle, component: FinalizeStep },
];

const THEME_COLORS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Slate', value: '#475569' },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const { data, updateTheme } = useResumeStore();

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    
    try {
      const element = previewRef.current;
      const opt = {
        margin: 0,
        filename: `${data.personalInfo.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      };
      
      await html2pdf().set(opt).from(element).save();
      toast.success('Resume exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export resume.');
    } finally {
      setIsExporting(false);
    }
  };

  const CurrentComponent = STEPS[currentStep].component;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Toaster position="top-center" />
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 hidden sm:inline-block">
              SmartResume AI
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 mr-4">
              <Palette className="w-4 h-4 text-slate-500" />
              <div className="flex gap-1">
                {THEME_COLORS.map(color => (
                  <button
                    key={color.value}
                    onClick={() => updateTheme({ color: color.value })}
                    className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${data.theme.color === color.value ? 'border-slate-800 scale-110' : 'border-transparent'}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            
            <Button onClick={handleExportPDF} disabled={isExporting} className="gap-2 shadow-sm">
              {isExporting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[calc(100vh-4rem)]">
        
        {/* Left Panel - Editor */}
        <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden lg:h-full">
          {/* Progress Steps */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 overflow-x-auto hide-scrollbar">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isPast = index < currentStep;
              
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`flex flex-col items-center gap-1.5 min-w-[70px] sm:min-w-[80px] transition-colors ${
                    isActive ? 'text-blue-600' : isPast ? 'text-slate-700' : 'text-slate-400'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isActive ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-600 ring-offset-2' : 
                    isPast ? 'bg-slate-100 text-slate-700' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">{step.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <AnimatePresence mode="wait">
              {/* @ts-ignore - Dynamic component props */}
              <CurrentComponent key={currentStep} onExport={handleExportPDF} isExporting={isExporting} />
            </AnimatePresence>
          </div>

          {/* Navigation Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            
            <div className="hidden sm:flex gap-1">
              {STEPS.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === currentStep ? 'bg-blue-600' : 'bg-slate-200'}`} />
              ))}
            </div>

            <Button 
              onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
              disabled={currentStep === STEPS.length - 1}
              className="gap-2"
            >
              {currentStep === STEPS.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className={`${currentStep === STEPS.length - 1 ? 'flex' : 'hidden'} lg:flex flex-col bg-slate-200/50 rounded-2xl border border-slate-200 overflow-hidden lg:h-full relative min-h-[600px] lg:min-h-0`}>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-slate-800/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live Preview
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start">
            <div className="scale-[0.6] sm:scale-[0.8] origin-top xl:scale-[0.9] 2xl:scale-100 transition-transform duration-300">
              <div className="shadow-2xl bg-white">
                <div ref={previewRef} className="bg-white">
                  <ResumePreview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
