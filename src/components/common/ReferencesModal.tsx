import React from 'react';
import { OFFICIAL_REFERENCES } from '../../data/officialContent';
import { X, BookOpen, ShieldCheck, ExternalLink } from 'lucide-react';

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferencesModal: React.FC<ReferencesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="refModalTitle"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 id="refModalTitle" className="text-lg font-bold text-slate-900">
                  Fontes Oficiais & Base Técnico-Científica
                </h3>
                <span className="text-xs text-slate-500">
                  Referências vigentes aplicadas no projeto PREVIRAS
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Fechar modal de referências"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* References List */}
          <div className="space-y-3.5 overflow-y-auto max-h-[55vh] pr-1">
            {OFFICIAL_REFERENCES.map((ref, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-left">
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wide block mb-1">
                  {ref.institution}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                  {ref.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {ref.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-teal-800">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Conteúdo fundamentado em normas sanitárias e éticas vigentes.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
