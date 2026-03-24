import React from 'react';
import { useResumeStore } from '@/store';
import { Button, Input } from '@/components/ui';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Award } from 'lucide-react';

export function CertificationsForm() {
  const { data, addCertification, updateCertification, removeCertification } = useResumeStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Certifications</h2>
        <p className="text-sm text-slate-500">Add any relevant certifications or licenses.</p>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {data.certifications?.map((cert, index) => (
            <motion.div
              key={cert.id}
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
                  onClick={() => removeCertification(cert.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    label="Certification Name"
                    placeholder="e.g. AWS Certified Solutions Architect"
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    label="Issuing Organization"
                    placeholder="e.g. Amazon Web Services"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    label="Date Issued"
                    type="month"
                    value={cert.date}
                    onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    label="Credential URL (Optional)"
                    placeholder="https://..."
                    value={cert.link}
                    onChange={(e) => updateCertification(cert.id, { link: e.target.value })}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          variant="outline"
          className="w-full border-dashed border-2 hover:border-blue-500 hover:bg-blue-50 transition-colors"
          onClick={addCertification}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Certification
        </Button>
      </div>
    </motion.div>
  );
}
