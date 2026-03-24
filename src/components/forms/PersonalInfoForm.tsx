import React, { useState } from 'react';
import { useResumeStore } from '@/store';
import { Input, Textarea, Button } from '@/components/ui';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Wand2, Loader2, GripVertical } from 'lucide-react';
import { toast } from 'sonner';

export function PersonalInfoForm() {
  const { data, updatePersonalInfo } = useResumeStore();
  const info = data.personalInfo;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Personal Information</h2>
        <p className="text-sm text-slate-500">Start with the basics. This is how employers will contact you.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Full Name" 
          placeholder="John Doe" 
          value={info.fullName}
          onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
        />
        <Input 
          label="Job Title" 
          placeholder="Software Engineer" 
          value={info.jobTitle}
          onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
        />
        <Input 
          label="Email" 
          type="email" 
          placeholder="john@example.com" 
          value={info.email}
          onChange={(e) => updatePersonalInfo({ email: e.target.value })}
        />
        <Input 
          label="Phone" 
          placeholder="+1 (555) 123-4567" 
          value={info.phone}
          onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
        />
        <Input 
          label="Location" 
          placeholder="San Francisco, CA" 
          value={info.location}
          onChange={(e) => updatePersonalInfo({ location: e.target.value })}
        />
        <Input 
          label="Website / LinkedIn" 
          placeholder="linkedin.com/in/johndoe" 
          value={info.website}
          onChange={(e) => updatePersonalInfo({ website: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-700">Professional Summary</label>
          <AISuggestionButton type="summary" content={JSON.stringify(info)} onApply={(text) => updatePersonalInfo({ summary: text })} />
        </div>
        <Textarea 
          placeholder="A passionate software engineer with 5+ years of experience..." 
          className="min-h-[120px]"
          value={info.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
        />
      </div>
    </motion.div>
  );
}

// Helper component for AI suggestions
export function AISuggestionButton({ type, content, context, onApply }: { type: string, content: string, context?: string, onApply: (text: string) => void }) {
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    if (!content || content.length < 5) return; // Don't suggest if empty
    setLoading(true);
    try {
      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, content, context }),
      });
      const data = await res.json();
      if (data.suggestion) {
        onApply(data.suggestion);
        toast.success('AI suggestion applied!');
      } else {
        toast.error('Failed to generate suggestion.');
      }
    } catch (error) {
      console.error('Failed to get suggestion', error);
      toast.error('An error occurred while fetching the suggestion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="h-7 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
      onClick={handleSuggest}
      disabled={loading || !content}
    >
      {loading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Wand2 className="w-3 h-3 mr-1" />}
      AI Improve
    </Button>
  );
}
