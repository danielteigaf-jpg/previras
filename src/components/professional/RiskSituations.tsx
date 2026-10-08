import React, { useState } from 'react';
import { RISK_SITUATIONS } from '../../data/officialContent';
import { RiskSituation } from '../../types/previras';
import { CheckCircle2, ArrowRight, RotateCcw, ShieldAlert, Check, HelpCircle } from 'lucide-react';

interface RiskSituationsProps {
  onComplete?: () => void;
  isCompleted?: boolean;
}

export const RiskSituations: React.FC<RiskSituationsProps> = ({ onComplete, isCompleted }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);

  const situation: RiskSituation = RISK_SITUATIONS[currentIndex];
  const selectedOption = situation.options.find(opt => opt.id === selectedOptionId);

  const handleSelectOption = (id: string) => {
    if (submitted) return;
    setSelectedOptionId(id);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < RISK_SITUATIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setSubmitted(false);
    } else {
      setFinished(true);
      if (onComplete) onComplete();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setSubmitted(false);
    setFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
              Missão 5 · Casos Práticos do Cotidiano Assistencial
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Situações de Risco em Serviços de Saúde
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Analise situações corriqueiras de plantão (jalecos fora do hospital, celular, adornos e fômites) e determine a atitude profissional preconizada pelas normas de biossegurança.
            </p>
          </div>
          <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
            Caso {currentIndex + 1} de {RISK_SITUATIONS.length}
          </div>
        </div>
      </div>

      {/* Case Study Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto">
        {!finished ? (
          <div>
            {/* Setting Tag */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-2 border-b border-slate-100">
              <span className="font-semibold text-teal-700 uppercase tracking-wide">
                Ambiente: {situation.setting}
              </span>
              <span className="text-slate-400">Caso #{situation.id}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
              {situation.title}
            </h3>

            {/* Description Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm sm:text-base text-slate-800 leading-relaxed mb-6">
              {situation.description}
            </div>

            {/* Prompt */}
            <div className="mb-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Qual é a avaliação técnica e a atitude adequada?
              </span>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {situation.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(option.id)}
                    disabled={submitted}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      !submitted
                        ? 'bg-white hover:bg-teal-50/50 hover:border-teal-300 border-slate-200'
                        : isSelected
                        ? option.isCorrect
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-400/20'
                          : 'bg-rose-50 border-rose-300 text-rose-950 ring-2 ring-rose-300/20'
                        : option.isCorrect
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        !submitted
                          ? 'bg-slate-100 text-slate-700'
                          : option.isCorrect
                          ? 'bg-emerald-600 text-white'
                          : isSelected
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {option.id.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium leading-snug">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Feedback when answered */}
            {submitted && selectedOption && (
              <div className="space-y-4">
                <div
                  className={`p-5 rounded-2xl border ${
                    selectedOption.isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                    {selectedOption.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Excelente Análise!</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Compreenda a Racionalidade Técnica:</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed">{selectedOption.feedback}</p>
                  <div className="mt-3 text-xs font-semibold text-slate-600">
                    Base Normativa: {situation.regulatoryContext}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  {currentIndex < RISK_SITUATIONS.length - 1 ? (
                    <>
                      Próxima Situação de Risco <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Concluir Missão 5 <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Completion Box */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Missão de Situações de Risco Concluída!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              A biossegurança não é burocracia: cada regra de controle de adornos, fômites e uniformes existe para proteger vidas contra infecções cruzadas hospitalares.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Rever Casos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
