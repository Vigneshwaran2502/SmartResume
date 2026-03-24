import React from 'react';
import { useResumeStore } from '@/store';
import { Input, Button } from '@/components/ui';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2 } from 'lucide-react';

export function EducationForm() {
  const { data, addEducation, updateEducation, removeEducation } = useResumeStore();
  const education = data.education;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Education</h2>
          <p className="text-sm text-slate-500">List your academic background.</p>
        </div>
        <Button onClick={addEducation} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Education
        </Button>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 relative group"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="danger" size="icon" onClick={() => removeEducation(edu.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                <Input 
                  label="Institution" 
                  placeholder="Stanford University" 
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                />
                <Input 
                  label="Degree" 
                  placeholder="Bachelor of Science" 
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                />
                <Input 
                  label="Field of Study" 
                  placeholder="Computer Science" 
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input 
                    label="Start Date" 
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                  <Input 
                    label="End Date" 
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {education.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl text-slate-500">
            No education added yet.
          </div>
        )}
      </div>
    </motion.div>
  );
}
