import React from 'react';
import { useResumeStore } from '@/store';
import { Button } from '@/components/ui';
import { motion } from 'motion/react';
import { Download, LayoutTemplate, CheckCircle2, Palette } from 'lucide-react';

const TEMPLATES = [
  { id: 'modern', name: 'Modern', desc: 'Clean and professional with color accents.' },
  { id: 'minimal', name: 'Minimal', desc: 'Simple, elegant, and traditional.' },
  { id: 'creative', name: 'Creative', desc: 'Two-column layout for a modern edge.' },
  { id: 'professional', name: 'Professional', desc: 'Standard corporate layout with a classic feel.' },
  { id: 'executive', name: 'Executive', desc: 'Sophisticated and authoritative design.' }
] as const;

const THEME_COLORS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Slate', value: '#475569' },
];

export function FinalizeStep({ onExport, isExporting }: { onExport?: () => void, isExporting?: boolean }) {
  const { data, updateTheme } = useResumeStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Review & Download</h2>
        <p className="text-sm text-slate-500">Choose a template that fits your style and download your PDF.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-900 flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4" /> Select Template
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => updateTheme({ template: t.id as any })}
              className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left ${
                data.theme.template === t.id
                  ? 'border-blue-600 bg-blue-50/50'
                  : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-semibold text-slate-900">{t.name}</span>
                {data.theme.template === t.id && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
              </div>
              <span className="text-sm text-slate-500">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-900 flex items-center gap-2">
          <Palette className="w-4 h-4" /> Accent Color
        </h3>
        <div className="flex flex-wrap gap-3">
          {THEME_COLORS.map(color => (
            <button
              key={color.value}
              onClick={() => updateTheme({ color: color.value })}
              className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${
                data.theme.color === color.value ? 'border-slate-800 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {data.theme.color === color.value && <CheckCircle2 className="w-5 h-5 text-white" />}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <Button
          onClick={onExport}
          disabled={isExporting}
          size="lg"
          className="w-full gap-2 text-lg h-14 shadow-md"
        >
          {isExporting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          {isExporting ? 'Generating PDF...' : 'Download Resume PDF'}
        </Button>
        <p className="text-center text-xs text-slate-500 mt-3">
          Make sure to check the live preview before downloading.
        </p>
      </div>
    </motion.div>
  );
}
