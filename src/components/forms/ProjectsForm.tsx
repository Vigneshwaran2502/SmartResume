import React from 'react';
import { useResumeStore } from '@/store';
import { Input, Textarea, Button } from '@/components/ui';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2 } from 'lucide-react';
import { AISuggestionButton } from './PersonalInfoForm';

export function ProjectsForm() {
  const { data, addProject, updateProject, removeProject } = useResumeStore();
  const projects = data.projects;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <p className="text-sm text-slate-500">Showcase your best work.</p>
        </div>
        <Button onClick={addProject} size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 relative group"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="danger" size="icon" onClick={() => removeProject(proj.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                <Input 
                  label="Project Name" 
                  placeholder="E-commerce Platform" 
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                />
                <Input 
                  label="Link (Optional)" 
                  placeholder="https://github.com/..." 
                  value={proj.link}
                  onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">Description</label>
                  <AISuggestionButton 
                    type="bullet_point" 
                    content={proj.description} 
                    context={`Project: ${proj.name}`}
                    onApply={(text) => updateProject(proj.id, { description: text })} 
                  />
                </div>
                <Textarea 
                  placeholder="â€¢ Built a full-stack e-commerce platform..." 
                  className="min-h-[100px] font-mono text-sm"
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {projects.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl text-slate-500">
            No projects added yet.
          </div>
        )}
      </div>
    </motion.div>
  );
}
