export type ResumeData = {
  id: string;
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  theme: {
    color: string;
    template: 'minimal' | 'modern' | 'creative' | 'professional' | 'executive';
  };
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  link: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
};
