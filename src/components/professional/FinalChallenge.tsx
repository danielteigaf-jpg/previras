import React, { useState } from 'react';
import { FINAL_CHALLENGE_QUESTIONS } from '../../data/officialContent';
import { QuizQuestion } from '../../types/previras';
import { CheckCircle2, ArrowRight, RotateCcw, Award, Lightbulb, ShieldCheck, Check } from 'lucide-react';

interface FinalChallengeProps {
  onComplete?: () => void;
  onGoToCertificate?: () => void;
  isCompleted?: boolean;
}

export const FinalChallenge: React.FC<FinalChallengeProps> = ({
  onComplete,
  onGoToCertificate,
  isCompleted
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question: QuizQuestion = FINAL_CHALLENGE_QUESTIONS[currentIndex];
  const selectedOption = question.options.find(opt => opt.id === selectedOptionId);

  const handleSelect = (optionId: string) => {
    if (submitted) return;
    setSelectedOptionId(optionId);
    setSubmitted(true);
    const opt = question.options.find(o => o.id === optionId);
    if (opt?.isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < FINAL_CHALLENGE_QUESTIONS.length - 1) {
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
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
              Missão 6 · Consolidação do Conhecimento
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Desafio Final Educativo PREVIRAS
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              8 questões de síntese clínica abrangendo higiene das mãos, 5 momentos, uso racional de luvas, contaminação cruzada e cadeia de transmissão.
            </p>
          </div>
          <div className="text-xs font-semibold text-teal-800 bg-teal-50 px-3.5 py-1.5 rounded-xl border border-teal-200 self-start sm:self-auto">
            {finished ? 'Desafio Concluído' : `Questão ${currentIndex + 1} de ${FINAL_CHALLENGE_QUESTIONS.length}`}
          </div>
        </div>
      </div>

      {/* Main Challenge Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto">
        {!finished ? (
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-2 border-b border-slate-100">
              <span className="font-semibold text-teal-700">Questão {currentIndex + 1} de 8</span>
              <span>Progresso: {Math.round(((currentIndex) / FINAL_CHALLENGE_QUESTIONS.length) * 100)}%</span>
            </div>

            {/* Question */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-5">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {question.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option.id)}
                    disabled={submitted}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      !submitted
                        ? 'bg-white hover:bg-teal-50/50 hover:border-teal-300 border-slate-200'
                        : isSelected
                        ? option.isCorrect
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-400/20'
                          : 'bg-rose-50 border-rose-300 text-rose-950 ring-2 ring-rose-300/20'
                        : option.isCorrect
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
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

            {/* Feedback & Takeaway */}
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
                        <span>Alternativa Correta!</span>
                      </>
                    ) : (
                      <>
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Explicação Educativa:</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed mb-3">{question.explanation}</p>

                  <div className="p-3 rounded-xl bg-white/70 border border-slate-200/60 text-xs font-semibold text-slate-800">
                    💡 Ponto-Chave: {question.keyTakeaway}
                  </div>

                  <div className="mt-2 text-[11px] font-semibold text-slate-500">
                    Fonte: {question.officialSource}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  {currentIndex < FINAL_CHALLENGE_QUESTIONS.length - 1 ? (
                    <>
                      Próxima Questão <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Ver Resultado Educativo <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Completion & Summary (Educational, never punitive) */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
                Atividade Educativa Concluída
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                Parabéns pela dedicação ao aprendizado!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                Você revisou os principais pilares de prevenção de IRAS: higiene correta das mãos, os 5 momentos da OMS, uso técnico de EPIs e quebra da cadeia de transmissão.
              </p>
            </div>

            {/* Score Insight */}
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 max-w-md mx-auto text-left">
              <div className="flex items-center justify-between text-xs font-bold text-teal-900 mb-1">
                <span>Conceitos Dominados:</span>
                <span>{score} de {FINAL_CHALLENGE_QUESTIONS.length} questões</span>
              </div>
              <p className="text-xs text-teal-800 leading-relaxed">
                Este resultado é estritamente pedagógico e visa reforçar as boas práticas que salvam vidas na beira do leito todos os dias.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Refazer Desafio
              </button>

              {onGoToCertificate && (
                <button
                  type="button"
                  onClick={onGoToCertificate}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  Gerar Certificado de Participação
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
