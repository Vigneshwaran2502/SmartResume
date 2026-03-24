import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { ResumeData, Experience, Education, Project, Certification, Achievement } from './types';

interface ResumeStore {
  data: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  
  addExperience: () => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  
  addEducation: () => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  
  updateSkills: (skills: string[]) => void;
  
  addProject: () => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  removeProject: (id: string) => void;

  addCertification: () => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  addAchievement: () => void;
  updateAchievement: (id: string, ach: Partial<Achievement>) => void;
  removeAchievement: (id: string) => void;
  
  updateTheme: (theme: Partial<ResumeData['theme']>) => void;
  loadData: (data: ResumeData) => void;
}

const initialData: ResumeData = {
  id: uuidv4(),
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  theme: {
    color: '#3b82f6', // blue-500
    template: 'modern',
  },
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: initialData,
      
      updatePersonalInfo: (info) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: { ...state.data.personalInfo, ...info },
          },
        })),
        
      addExperience: () =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [
              ...state.data.experience,
              { id: uuidv4(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' },
            ],
          },
        })),
        
      updateExperience: (id, exp) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((e) => (e.id === id ? { ...e, ...exp } : e)),
          },
        })),
        
      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((e) => e.id !== id),
          },
        })),
        
      addEducation: () =>
        set((state) => ({
          data: {
            ...state.data,
            education: [
              ...state.data.education,
              { id: uuidv4(), institution: '', degree: '', field: '', startDate: '', endDate: '' },
            ],
          },
        })),
        
      updateEducation: (id, edu) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((e) => (e.id === id ? { ...e, ...edu } : e)),
          },
        })),
        
      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((e) => e.id !== id),
          },
        })),
        
      updateSkills: (skills) =>
        set((state) => ({
          data: {
            ...state.data,
            skills,
          },
        })),
        
      addProject: () =>
        set((state) => ({
          data: {
            ...state.data,
            projects: [
              ...state.data.projects,
              { id: uuidv4(), name: '', description: '', link: '' },
            ],
          },
        })),
        
      updateProject: (id, proj) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((p) => (p.id === id ? { ...p, ...proj } : p)),
          },
        })),
        
      removeProject: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((p) => p.id !== id),
          },
        })),

      addCertification: () =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: [
              ...(state.data.certifications || []),
              { id: uuidv4(), name: '', issuer: '', date: '', link: '' },
            ],
          },
        })),
        
      updateCertification: (id, cert) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: (state.data.certifications || []).map((c) => (c.id === id ? { ...c, ...cert } : c)),
          },
        })),
        
      removeCertification: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: (state.data.certifications || []).filter((c) => c.id !== id),
          },
        })),

      addAchievement: () =>
        set((state) => ({
          data: {
            ...state.data,
            achievements: [
              ...(state.data.achievements || []),
              { id: uuidv4(), title: '', description: '', date: '' },
            ],
          },
        })),
        
      updateAchievement: (id, ach) =>
        set((state) => ({
          data: {
            ...state.data,
            achievements: (state.data.achievements || []).map((a) => (a.id === id ? { ...a, ...ach } : a)),
          },
        })),
        
      removeAchievement: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            achievements: (state.data.achievements || []).filter((a) => a.id !== id),
          },
        })),
        
      updateTheme: (theme) =>
        set((state) => ({
          data: {
            ...state.data,
            theme: { ...state.data.theme, ...theme },
          },
        })),
        
      loadData: (data) => set({ data }),
    }),
    {
      name: 'smartresume-storage',
    }
  )
);
