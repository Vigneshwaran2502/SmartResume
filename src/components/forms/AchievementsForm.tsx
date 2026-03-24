import React from 'react';
import { useResumeStore } from '@/store';
import { Button, Input, Textarea } from '@/components/ui';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Trophy } from 'lucide-react';

export function AchievementsForm() {
  const { data, addAchievement, updateAchievement, removeAchievement } = useResumeStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Achievements & Awards</h2>
        <p className="text-sm text-slate-500">Highlight your notable accomplishments and awards.</p>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {data.achievements?.map((ach, index) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 relative group"
            >
              <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                  onClick={() => removeAchievement(ach.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    label="Title / Award Name"
                    placeholder="e.g. Employee of the Year"
                    value={ach.title}
                    onChange={(e) => updateAchievement(ach.id, { title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    label="Date"
                    type="month"
                    value={ach.date}
                    onChange={(e) => updateAchievement(ach.id, { date: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Textarea
                    label="Description"
                    placeholder="Briefly describe the achievement..."
                    value={ach.description}
                    onChange={(e) => updateAchievement(ach.id, { description: e.target.value })}
                    className="h-24"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          variant="outline"
          className="w-full border-dashed border-2 hover:border-blue-500 hover:bg-blue-50 transition-colors"
          onClick={addAchievement}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Achievement
        </Button>
      </div>
    </motion.div>
  );
}
