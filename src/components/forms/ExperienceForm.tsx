import React from 'react';
import { useResumeStore } from '@/store';
import { Input, Textarea, Button } from '@/components/ui';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { AISuggestionButton } from './PersonalInfoForm';

export function ExperienceForm() {
  const { data, addExperience, updateExperience, removeExperience } = useResumeStore();
  const experiences = data.experience;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Work Experience</h2>
          <p className="text-sm text-slate-500">Highlight your most relevant professional experience.</p>
        </div>
        <Button onClick={addExperience} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 relative group"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="danger" size="icon" onClick={() => removeExperience(exp.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                <Input 
                  label="Company" 
                  placeholder="Google" 
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                />
                <Input 
                  label="Position" 
                  placeholder="Senior Software Engineer" 
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                />
                <Input 
                  label="Start Date" 
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                />
                <Input 
                  label="End Date" 
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                  disabled={exp.current}
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? '' : exp.endDate })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`current-${exp.id}`} className="text-sm text-slate-700">I currently work here</label>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">Description</label>
                  <AISuggestionButton 
                    type="bullet_point" 
                    content={exp.description} 
                    context={`${exp.position} at ${exp.company}`}
                    onApply={(text) => updateExperience(exp.id, { description: text })} 
                  />
                </div>
                <Textarea 
                  placeholder="â€¢ Developed scalable web applications using React and Node.js..." 
                  className="min-h-[120px] font-mono text-sm"
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                />
                <p className="text-xs text-slate-500">Use bullet points (â€¢) to separate achievements.</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {experiences.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl text-slate-500">
            No experience added yet. Click the button above to add your first role.
          </div>
        )}
      </div>
    </motion.div>
  );
}
