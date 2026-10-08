import React, { useState } from 'react';
import { GLOVES_STATEMENTS } from '../../data/officialContent';
import { GloveStatement } from '../../types/previras';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle, ShieldAlert, Sparkles, Check } from 'lucide-react';

interface GlovesQuizProps {
  onComplete?: () => void;
  isCompleted?: boolean;
}

export const GlovesQuiz: React.FC<GlovesQuizProps> = ({ onComplete, isCompleted }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentStatement: GloveStatement = GLOVES_STATEMENTS[currentIndex];

  const handleSelect = (answer: boolean) => {
    if (submitted) return;
    setSelectedAnswer(answer);
    setSubmitted(true);
    if (answer === currentStatement.isTrue) {
      setUserScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < GLOVES_STATEMENTS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setSubmitted(false);
    } else {
      setFinished(true);
      if (onComplete) onComplete();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setSubmitted(false);
    setUserScore(0);
    setFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
              Missão 3 · Biossegurança & Uso de EPI
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Mito ou Verdade: O Uso Correto de Luvas
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Regra de ouro: O uso de luvas <strong>NUNCA</strong> substitui a higienização das mãos. Teste seus conhecimentos práticos em situações reais de plantão.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold shrink-0">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Desafio Verdadeiro / Falso</span>
          </div>
        </div>
      </div>

      {/* Main Quiz Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto">
        {!finished ? (
          <div>
            {/* Header progress */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
              <span className="font-semibold text-teal-700">Afirmação {currentIndex + 1} de {GLOVES_STATEMENTS.length}</span>
              <span>Acertos: {userScore}</span>
            </div>

            {/* Statement Box */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Afirmação Clínica
              </span>
              <p className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                "{currentStatement.statement}"
              </p>
            </div>

            {/* True / False Buttons */}
            {!submitted ? (
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleSelect(true)}
                  className="p-5 rounded-2xl bg-emerald-50 hover:bg-emerald-600 text-emerald-900 hover:text-white border-2 border-emerald-300 hover:border-emerald-600 font-bold text-base transition-all duration-200 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm group"
                >
                  <Check className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                  VERDADEIRO
                </button>

                <button
                  type="button"
                  onClick={() => handleSelect(false)}
                  className="p-5 rounded-2xl bg-rose-50 hover:bg-rose-600 text-rose-900 hover:text-white border-2 border-rose-300 hover:border-rose-600 font-bold text-base transition-all duration-200 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm group"
                >
                  <XCircle className="w-6 h-6 text-rose-600 group-hover:text-white" />
                  FALSO
                </button>
              </div>
            ) : (
              /* Educational Feedback Box */
              <div className="space-y-4">
                <div
                  className={`p-5 rounded-2xl border ${
                    selectedAnswer === currentStatement.isTrue
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-base mb-2">
                    {selectedAnswer === currentStatement.isTrue ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Muito Bem! Você acertou.</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>Atenção: A afirmação é {currentStatement.isTrue ? 'VERDADEIRA' : 'FALSA'}.</span>
                      </>
                    )}
                  </div>

                  <p className="text-sm leading-relaxed mb-3">
                    {currentStatement.explanation}
                  </p>

                  <div className="p-3 rounded-xl bg-white/70 border border-slate-200/60 text-xs font-medium text-slate-800">
                    <strong>Regra Técnica:</strong> {currentStatement.technicalRule}
                  </div>

                  <div className="mt-3 text-[11px] font-semibold text-slate-500">
                    Fonte: {currentStatement.officialSource}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  {currentIndex < GLOVES_STATEMENTS.length - 1 ? (
                    <>
                      Próxima Afirmação <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Ver Conclusão da Missão <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Completion Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Missão de Luvas Concluída!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Lembre-se sempre: <strong>Luvas protegem o profissional e o paciente somente quando usadas estritamente no momento do procedimento e descartadas imediatamente</strong>. Nunca toque maçanetas, canetas ou celulares com luvas!
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Refazer Missão
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
