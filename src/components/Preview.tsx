import React from 'react';
import { useResumeStore } from '@/store';
import { format, parseISO } from 'date-fns';
import { Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';

export function ResumePreview() {
  const { data } = useResumeStore();
  const { personalInfo, experience, education, skills, projects, certifications, achievements, theme } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return format(parseISO(dateString), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  const renderDescription = (text: string, colorClass: string = 'text-[#334155]') => {
    if (!text) return null;
    return (
      <ul className={`list-disc list-inside space-y-1 mt-2 text-sm ${colorClass}`}>
        {text.split('\n').filter(line => line.trim()).map((line, i) => (
          <li key={i} className="leading-relaxed">
            {line.replace(/^[•\-\*]\s*/, '')}
          </li>
        ))}
      </ul>
    );
  };

  const renderModern = () => (
    <div 
      id="resume-preview" 
      className="bg-[#ffffff] w-[210mm] min-h-[297mm] mx-auto p-10 font-sans"
      style={{ '--theme-color': theme.color } as React.CSSProperties}
    >
      <header className="border-b-2 pb-6 mb-6" style={{ borderColor: theme.color }}>
        <h1 className="text-4xl font-bold text-[#0f172a] tracking-tight" style={{ color: theme.color }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl text-[#475569] mt-1 font-medium">{personalInfo.jobTitle || 'Job Title'}</p>
        
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-[#475569]">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4" style={{ color: theme.color }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" style={{ color: theme.color }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" style={{ color: theme.color }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <LinkIcon className="w-4 h-4" style={{ color: theme.color }} />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-sm text-[#334155] leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-4" style={{ color: theme.color }}>
            Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-[#0f172a]">{exp.position}</h3>
                  <span className="text-sm font-medium text-[#64748b]">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#334155] mb-1">{exp.company}</p>
                {renderDescription(exp.description)}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-4" style={{ color: theme.color }}>
            Projects
          </h2>
          <div className="space-y-5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-[#0f172a]">
                    {proj.name}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="ml-2 text-sm font-normal text-[#2563eb] hover:underline">
                        Link
                      </a>
                    )}
                  </h3>
                </div>
                {renderDescription(proj.description)}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-4" style={{ color: theme.color }}>
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-[#0f172a]">{edu.institution}</h3>
                  <span className="text-sm font-medium text-[#64748b]">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                <p className="text-sm text-[#334155]">
                  {edu.degree} in {edu.field}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {(certifications?.length > 0 || achievements?.length > 0) && (
        <div className="grid grid-cols-2 gap-6 mb-6">
          {certifications?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider mb-4" style={{ color: theme.color }}>
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-semibold text-[#0f172a] text-sm">{cert.name}</h3>
                    <div className="flex justify-between items-center mt-0.5">
                      <span className="text-sm text-[#334155]">{cert.issuer}</span>
                      <span className="text-xs text-[#64748b]">{formatDate(cert.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {achievements?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider mb-4" style={{ color: theme.color }}>
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((ach) => (
                  <div key={ach.id}>
                    <h3 className="font-semibold text-[#0f172a] text-sm">{ach.title}</h3>
                    <div className="flex justify-between items-start mt-0.5">
                      <span className="text-sm text-[#334155]">{ach.description}</span>
                      <span className="text-xs text-[#64748b] ml-2 whitespace-nowrap">{formatDate(ach.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider mb-4" style={{ color: theme.color }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {skills.map((skill) => (
              <span key={skill} className="text-sm text-[#334155] font-medium">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderMinimal = () => (
    <div 
      id="resume-preview" 
      className="bg-[#ffffff] w-[210mm] min-h-[297mm] mx-auto p-12 font-serif text-[#0f172a]"
    >
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-lg text-[#334155] mb-4">{personalInfo.jobTitle || 'Job Title'}</p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-[#475569]">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.location && personalInfo.website && <span>•</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-8">
          <p className="text-sm leading-relaxed text-[#334155]">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-[#cbd5e1] pb-2">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[#0f172a]">{exp.position} <span className="font-normal text-[#475569]">at {exp.company}</span></h3>
                  <span className="text-sm text-[#64748b]">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                {renderDescription(exp.description)}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-[#cbd5e1] pb-2">
            Projects
          </h2>
          <div className="space-y-6">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[#0f172a]">
                    {proj.name}
                    {proj.link && <span className="font-normal text-[#64748b] ml-2">({proj.link})</span>}
                  </h3>
                </div>
                {renderDescription(proj.description)}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-[#cbd5e1] pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-[#0f172a]">{edu.institution}</h3>
                  <p className="text-sm text-[#334155]">{edu.degree} in {edu.field}</p>
                </div>
                <span className="text-sm text-[#64748b]">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-[#cbd5e1] pb-2">
            Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-[#0f172a] text-sm">{cert.name}</h3>
                  <p className="text-sm text-[#334155]">{cert.issuer}</p>
                </div>
                <span className="text-sm text-[#64748b]">{formatDate(cert.date)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {achievements?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-[#cbd5e1] pb-2">
            Achievements
          </h2>
          <div className="space-y-3">
            {achievements.map((ach) => (
              <div key={ach.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-[#0f172a] text-sm">{ach.title}</h3>
                  <p className="text-sm text-[#334155]">{ach.description}</p>
                </div>
                <span className="text-sm text-[#64748b]">{formatDate(ach.date)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-[#cbd5e1] pb-2">
            Skills
          </h2>
          <p className="text-sm text-[#334155] leading-relaxed">
            {skills.join(', ')}
          </p>
        </section>
      )}
    </div>
  );

  const renderCreative = () => (
    <div 
      id="resume-preview" 
      className="bg-[#ffffff] w-[210mm] min-h-[297mm] mx-auto flex font-sans"
    >
      {/* Left Sidebar */}
      <div className="w-[35%] p-8 text-[#ffffff]" style={{ backgroundColor: theme.color }}>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-lg opacity-90 mb-8 font-medium">{personalInfo.jobTitle || 'Job Title'}</p>

        <div className="space-y-4 text-sm opacity-90 mb-10">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              <span className="break-all">{personalInfo.website}</span>
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-[#ffffff]/30 pb-2">Skills</h2>
            <div className="flex flex-col gap-2 text-sm opacity-90">
              {skills.map(s => <span key={s}>{s}</span>)}
            </div>
          </div>
        )}

        {certifications?.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b border-[#ffffff]/30 pb-2">Certifications</h2>
            <div className="space-y-4 text-sm opacity-90">
              {certifications.map(cert => (
                <div key={cert.id}>
                  <div className="font-bold">{cert.name}</div>
                  <div className="opacity-80">{cert.issuer}</div>
                  <div className="text-xs opacity-70 mt-1">{formatDate(cert.date)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-[65%] p-8 bg-[#ffffff]">
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-3 text-[#0f172a]">Profile</h2>
            <p className="text-sm text-[#475569] leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-[#0f172a]">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="font-bold text-[#0f172a] text-lg">{exp.position}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold" style={{ color: theme.color }}>{exp.company}</span>
                    <span className="text-xs font-medium text-[#64748b] bg-[#f1f5f9] px-2 py-1 rounded">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {renderDescription(exp.description, 'text-[#475569]')}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-[#0f172a]">Projects</h2>
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-[#0f172a] text-lg">{proj.name}</h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs font-medium bg-[#f1f5f9] px-2 py-1 rounded hover:bg-[#e2e8f0]" style={{ color: theme.color }}>
                        View Project
                      </a>
                    )}
                  </div>
                  {renderDescription(proj.description, 'text-[#475569]')}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-[#0f172a]">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-[#0f172a] text-lg">{edu.degree} in {edu.field}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm font-medium text-[#475569]">{edu.institution}</span>
                    <span className="text-xs font-medium text-[#64748b]">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {achievements?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-[#0f172a]">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((ach) => (
                <div key={ach.id}>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-[#0f172a] text-md">{ach.title}</h3>
                    <span className="text-xs font-medium text-[#64748b]">
                      {formatDate(ach.date)}
                    </span>
                  </div>
                  <p className="text-sm text-[#475569] leading-relaxed">{ach.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  const renderProfessional = () => (
    <div 
      id="resume-preview" 
      className="bg-[#ffffff] w-[210mm] min-h-[297mm] mx-auto p-12 font-sans text-[#1e293b]"
    >
      <header className="border-b-[3px] pb-4 mb-6" style={{ borderColor: theme.color }}>
        <h1 className="text-4xl font-extrabold text-[#0f172a] uppercase tracking-wide mb-1">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-[#334155] font-semibold uppercase tracking-wider" style={{ color: theme.color }}>
          {personalInfo.jobTitle || 'Job Title'}
        </p>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm font-medium text-[#475569]">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-sm text-[#334155] leading-relaxed font-medium">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-[#e2e8f0] pb-1" style={{ color: theme.color }}>
            Professional Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[#0f172a] text-base">{exp.position}</h3>
                  <span className="text-sm font-bold text-[#475569]">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#334155] italic mb-1">{exp.company}</p>
                {renderDescription(exp.description)}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-[#e2e8f0] pb-1" style={{ color: theme.color }}>
            Key Projects
          </h2>
          <div className="space-y-5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[#0f172a] text-base">
                    {proj.name}
                    {proj.link && <span className="font-normal text-sm ml-2 text-[#64748b]">({proj.link})</span>}
                  </h3>
                </div>
                {renderDescription(proj.description)}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8 mb-6">
        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-[#e2e8f0] pb-1" style={{ color: theme.color }}>
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-[#0f172a] text-sm">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm font-semibold text-[#334155]">{edu.institution}</p>
                  <span className="text-xs font-medium text-[#64748b]">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-[#e2e8f0] pb-1" style={{ color: theme.color }}>
              Core Competencies
            </h2>
            <ul className="list-disc list-inside text-sm text-[#334155] space-y-1 font-medium">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {(certifications?.length > 0 || achievements?.length > 0) && (
        <div className="grid grid-cols-2 gap-8">
          {certifications?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-[#e2e8f0] pb-1" style={{ color: theme.color }}>
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-bold text-[#0f172a] text-sm">{cert.name}</h3>
                    <p className="text-sm text-[#334155]">{cert.issuer} <span className="text-[#64748b] ml-1">({formatDate(cert.date)})</span></p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {achievements?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-wider mb-3 border-b border-[#e2e8f0] pb-1" style={{ color: theme.color }}>
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((ach) => (
                  <div key={ach.id}>
                    <h3 className="font-bold text-[#0f172a] text-sm">{ach.title}</h3>
                    <p className="text-sm text-[#334155]">{ach.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );

  const renderExecutive = () => (
    <div 
      id="resume-preview" 
      className="bg-[#ffffff] w-[210mm] min-h-[297mm] mx-auto font-sans"
    >
      <header className="p-10 text-white" style={{ backgroundColor: theme.color }}>
        <h1 className="text-5xl font-light tracking-tight mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl font-medium opacity-90">{personalInfo.jobTitle || 'Job Title'}</p>
        
        <div className="flex flex-wrap gap-6 mt-6 text-sm opacity-80">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      <div className="p-10">
        {personalInfo.summary && (
          <section className="mb-8">
            <p className="text-base text-[#334155] leading-relaxed font-medium">{personalInfo.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2 space-y-8">
            {experience.length > 0 && (
              <section>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-5 text-[#0f172a]">
                  Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <h3 className="font-bold text-[#0f172a] text-lg">{exp.position}</h3>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-base font-semibold" style={{ color: theme.color }}>{exp.company}</span>
                        <span className="text-sm font-medium text-[#64748b]">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                      {renderDescription(exp.description)}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-5 text-[#0f172a]">
                  Projects
                </h2>
                <div className="space-y-6">
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <h3 className="font-bold text-[#0f172a] text-lg">{proj.name}</h3>
                      {renderDescription(proj.description)}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="col-span-1 space-y-8">
            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-5 text-[#0f172a]">
                  Expertise
                </h2>
                <div className="flex flex-col gap-2">
                  {skills.map((skill) => (
                    <div key={skill} className="text-sm font-medium text-[#334155] bg-[#f8fafc] p-2 rounded border border-[#e2e8f0]">
                      {skill}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-5 text-[#0f172a]">
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-[#0f172a] text-sm">{edu.degree}</h3>
                      <p className="text-sm text-[#475569] mb-1">{edu.field}</p>
                      <p className="text-sm font-medium" style={{ color: theme.color }}>{edu.institution}</p>
                      <span className="text-xs text-[#64748b]">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-5 text-[#0f172a]">
                  Certifications
                </h2>
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <h3 className="font-bold text-[#0f172a] text-sm">{cert.name}</h3>
                      <p className="text-sm font-medium" style={{ color: theme.color }}>{cert.issuer}</p>
                      <span className="text-xs text-[#64748b]">{formatDate(cert.date)}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {achievements?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold uppercase tracking-wider mb-5 text-[#0f172a]">
                  Awards
                </h2>
                <div className="space-y-4">
                  {achievements.map((ach) => (
                    <div key={ach.id}>
                      <h3 className="font-bold text-[#0f172a] text-sm">{ach.title}</h3>
                      <span className="text-xs text-[#64748b] block mb-1">{formatDate(ach.date)}</span>
                      <p className="text-sm text-[#475569]">{ach.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  switch (theme.template) {
    case 'minimal':
      return renderMinimal();
    case 'creative':
      return renderCreative();
    case 'professional':
      return renderProfessional();
    case 'executive':
      return renderExecutive();
    case 'modern':
    default:
      return renderModern();
  }
}
