import React, { useState } from 'react';
import { useResumeStore } from '@/store';
import { Input, Button } from '@/components/ui';
import { motion } from 'motion/react';
import { Plus, X } from 'lucide-react';
import { AISuggestionButton } from './PersonalInfoForm';

export function SkillsForm() {
  const { data, updateSkills } = useResumeStore();
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      updateSkills([...data.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateSkills(data.skills.filter(s => s !== skillToRemove));
  };

  const handleAISuggestions = (suggestedText: string) => {
    // Expecting comma separated list
    const newSkills = suggestedText.split(',').map(s => s.trim()).filter(Boolean);
    const uniqueSkills = Array.from(new Set([...data.skills, ...newSkills]));
    updateSkills(uniqueSkills);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
          <p className="text-sm text-slate-500">Add relevant skills for the job you are applying for.</p>
        </div>
        <AISuggestionButton 
          type="skills" 
          content={data.personalInfo.jobTitle || 'Software Engineer'} 
          onApply={handleAISuggestions} 
        />
      </div>

      <form onSubmit={handleAddSkill} className="flex gap-2">
        <Input 
          placeholder="e.g. React, Python, Project Management" 
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="gap-2">
          <Plus className="w-4 h-4" /> Add
        </Button>
      </form>

      <div className="flex flex-wrap gap-2 mt-4">
        {data.skills.map((skill) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
          >
            {skill}
            <button 
              onClick={() => removeSkill(skill)}
              className="p-0.5 hover:bg-blue-200 rounded-full transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
        {data.skills.length === 0 && (
          <p className="text-sm text-slate-500 italic">No skills added yet.</p>
        )}
      </div>
    </motion.div>
  );
}
