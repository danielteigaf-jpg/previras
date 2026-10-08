import React, { useState } from 'react';
import { TRANSMISSION_CHAIN_LINKS } from '../../data/officialContent';
import { TransmissionChainLink } from '../../types/previras';
import {
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Scissors,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface TransmissionChainProps {
  onComplete?: () => void;
  isCompleted?: boolean;
}

export const TransmissionChain: React.FC<TransmissionChainProps> = ({ onComplete, isCompleted }) => {
  const [selectedLinkIndex, setSelectedLinkIndex] = useState(3); // Default to Link 4: Via de Transmissão (Golden link)
  const [brokenLinkIds, setBrokenLinkIds] = useState<Set<string>>(new Set(['via_transmissao']));

  const activeLink: TransmissionChainLink = TRANSMISSION_CHAIN_LINKS[selectedLinkIndex];
  const isLinkBroken = brokenLinkIds.has(activeLink.id);

  const toggleBreakLink = (id: string) => {
    setBrokenLinkIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      if (next.size >= 2 && onComplete) {
        onComplete();
      }
      return next;
    });
  };

  const handleReset = () => {
    setBrokenLinkIds(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
              Conceito Epidemiológico Fundamental
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              A Cadeia de Transmissão de Microrganismos
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              "<strong>Uma atitude pode interromper uma cadeia de transmissão.</strong>" A infecção só ocorre quando todos os 6 elos estão conectados. Descubra como a intervenção de enfermagem quebra cada elo!
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restaurar Cadeia
            </button>
          </div>
        </div>

        {/* Chain Status summary */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Estado da Cadeia:</span>
            {brokenLinkIds.size > 0 ? (
              <span className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                TRANSMISSÃO BLOQUEADA ({brokenLinkIds.size} elo(s) rompido(s))
              </span>
            ) : (
              <span className="bg-rose-100 text-rose-900 font-bold px-2.5 py-1 rounded-full border border-rose-300 flex items-center gap-1.5 animate-pulse">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                CADEIA ATIVA (Risco Iminente de Infecção!)
              </span>
            )}
          </div>

          <span className="text-slate-500 hidden sm:inline">
            Clique em qualquer elo para ver os detalhes
          </span>
        </div>
      </div>

      {/* Visual Animated Chain Track */}
      <div className="bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-md">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative">
          {TRANSMISSION_CHAIN_LINKS.map((link, idx) => {
            const isBroken = brokenLinkIds.has(link.id);
            const isSelected = selectedLinkIndex === idx;

            return (
              <div key={link.id} className="relative flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setSelectedLinkIndex(idx)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[140px] relative ${
                    isBroken
                      ? 'bg-slate-800/80 border-emerald-500 text-white shadow-lg shadow-emerald-950/20'
                      : 'bg-slate-800/40 border-slate-700 text-slate-200 hover:border-teal-500/80 hover:bg-slate-800/60'
                  } ${isSelected ? 'ring-2 ring-teal-400' : ''}`}
                >
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-[11px] font-bold text-teal-400">
                      Elo {link.order}
                    </span>
                    {isBroken ? (
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </div>

                  {/* Title */}
                  <div className="font-bold text-xs sm:text-sm text-white leading-tight">
                    {link.name.replace(/^\d+\.\s*/, '')}
                  </div>

                  {/* Broken tag */}
                  <div className="mt-3 text-[10px]">
                    {isBroken ? (
                      <span className="text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                        Bloqueado
                      </span>
                    ) : (
                      <span className="text-rose-400 font-medium">
                        Ativo
                      </span>
                    )}
                  </div>
                </button>

                {/* Arrow connector to next link (on desktop) */}
                {idx < TRANSMISSION_CHAIN_LINKS.length - 1 && (
                  <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Link Detail & Interruption Attitude */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Análise Epidemiológica do Elo {activeLink.order} de 6
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              {activeLink.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => toggleBreakLink(activeLink.id)}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
              isLinkBroken
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-teal-600 hover:bg-teal-500 text-white'
            }`}
          >
            <Scissors className="w-4 h-4" />
            {isLinkBroken ? 'Reconectar Elo' : 'Interromper Este Elo'}
          </button>
        </div>

        <div className="space-y-4 mt-5">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Definição do Elo
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {activeLink.definition}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Exemplos Clínicos no Hospital:
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {activeLink.clinicalExamples.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`p-5 rounded-2xl border transition-all ${
              isLinkBroken
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-teal-50 border-teal-200 text-teal-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{activeLink.interruptionAction}</span>
            </div>
            <p className="text-sm leading-relaxed">
              {activeLink.nursingPractice}
            </p>
            {isLinkBroken && (
              <div className="mt-3 pt-3 border-t border-emerald-200/60 text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Intervenção aplicada: a cadeia foi rompida com sucesso neste ponto!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
