import React, { useState } from 'react';
import { FIVE_MOMENTS, CLINICAL_SCENARIOS } from '../../data/officialContent';
import { FiveMoment, ClinicalScenario } from '../../types/previras';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Info, Sparkles, Check, HelpCircle } from 'lucide-react';

interface FiveMomentsGameProps {
  onComplete?: () => void;
  isCompleted?: boolean;
}

export const FiveMomentsGame: React.FC<FiveMomentsGameProps> = ({ onComplete, isCompleted }) => {
  const [activeTab, setActiveTab] = useState<'cards' | 'game'>('cards');
  const [selectedMoment, setSelectedMoment] = useState<FiveMoment>(FIVE_MOMENTS[0]);

  // Game state
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answeredScenarios, setAnsweredScenarios] = useState<number[]>([]);
  const [gameFinished, setGameFinished] = useState(false);

  const scenario: ClinicalScenario = CLINICAL_SCENARIOS[currentScenarioIndex];

  const handleAnswer = (answer: boolean) => {
    if (submitted) return;
    setUserAnswer(answer);
    setSubmitted(true);
    if (!answeredScenarios.includes(scenario.id)) {
      setAnsweredScenarios(prev => [...prev, scenario.id]);
    }
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < CLINICAL_SCENARIOS.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setUserAnswer(null);
      setSubmitted(false);
    } else {
      setGameFinished(true);
      if (onComplete) onComplete();
    }
  };

  const handleRestartGame = () => {
    setCurrentScenarioIndex(0);
    setUserAnswer(null);
    setSubmitted(false);
    setGameFinished(false);
    setAnsweredScenarios([]);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
              Missão 2 · Organização Mundial da Saúde & Anvisa
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Os 5 Momentos para a Higiene das Mãos
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Compreenda as duas zonas conceituais (Zona do Paciente vs Área de Assistência) e pratique no jogo de situações clínicas reais.
            </p>
          </div>

          {/* Sub-navigation tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto border border-slate-200/60">
            <button
              type="button"
              onClick={() => setActiveTab('cards')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'cards'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cards dos 5 Momentos
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('game')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'game'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Jogo de Situações ({answeredScenarios.length}/{CLINICAL_SCENARIOS.length})
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE CARDS */}
      {activeTab === 'cards' && (
        <div className="space-y-6">
          {/* Quick Concept Pill/Banner */}
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-start gap-3">
            <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-teal-900 leading-relaxed">
              <strong>Conceito Fundamental da OMS:</strong> O ambiente de cuidados se divide na <em>Zona do Paciente</em> (o paciente e seus pertences/equipamentos imediatos) e a <em>Área de Assistência</em> (o restante do hospital). A higiene das mãos protege ambas as zonas de contaminação cruzada.
            </div>
          </div>

          {/* Moments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {FIVE_MOMENTS.map((moment) => {
              const isSelected = selectedMoment.id === moment.id;
              return (
                <button
                  key={moment.id}
                  type="button"
                  onClick={() => setSelectedMoment(moment)}
                  className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-teal-600 text-white border-teal-600 shadow-md transform -translate-y-0.5'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-teal-300 hover:bg-teal-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        isSelected ? 'bg-white text-teal-700' : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      {moment.number}
                    </span>
                    <span className={`text-[11px] font-medium ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                      Momento {moment.id}
                    </span>
                  </div>
                  <div className="font-semibold text-sm leading-snug">
                    {moment.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Moment Detailed Focus Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-2xl bg-teal-600 text-white font-bold text-lg flex items-center justify-center shadow-sm">
                {selectedMoment.number}
              </span>
              <div>
                <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  Momento Selecionado
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {selectedMoment.title}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Quando Realizar?
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedMoment.when}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200/70">
                <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider mb-2">
                  Por Que Realizar? (Finalidade)
                </h4>
                <p className="text-sm text-teal-900 leading-relaxed">
                  {selectedMoment.why}
                </p>
              </div>
            </div>

            <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Exemplos Práticos no Dia a Dia:
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                {selectedMoment.examples.map((example, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTab('game')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold transition-all cursor-pointer shadow-sm"
              >
                Testar no Jogo de Situações
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: CLINICAL SITUATIONS GAME */}
      {activeTab === 'game' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto">
          {!gameFinished ? (
            <div>
              {/* Progress counter */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                <span>Situação {currentScenarioIndex + 1} de {CLINICAL_SCENARIOS.length}</span>
                <span className="font-semibold text-teal-700">{scenario.context}</span>
              </div>

              {/* Scenario Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Cenário Clínico
                </span>
                <p className="text-base sm:text-lg font-medium text-slate-900 leading-snug">
                  "{scenario.scenario}"
                </p>
              </div>

              {/* Question */}
              <div className="text-center mb-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  É necessário realizar a higiene das mãos neste momento?
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Selecione sua resposta para receber a justificativa técnica oficial.
                </p>
              </div>

              {/* Choices Buttons */}
              {!submitted ? (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleAnswer(true)}
                    className="p-5 rounded-2xl bg-teal-50 hover:bg-teal-600 text-teal-900 hover:text-white border-2 border-teal-200 hover:border-teal-600 font-bold text-base transition-all duration-200 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm group"
                  >
                    <Check className="w-6 h-6 text-teal-600 group-hover:text-white" />
                    SIM, É NECESSÁRIO
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAnswer(false)}
                    className="p-5 rounded-2xl bg-slate-100 hover:bg-slate-800 text-slate-800 hover:text-white border-2 border-slate-200 hover:border-slate-800 font-bold text-base transition-all duration-200 flex flex-col items-center justify-center gap-2 cursor-pointer shadow-sm group"
                  >
                    <XCircle className="w-6 h-6 text-slate-600 group-hover:text-white" />
                    NÃO É NECESSÁRIO
                  </button>
                </div>
              ) : (
                /* Feedback Card */
                <div className="space-y-4">
                  <div
                    className={`p-5 rounded-2xl border ${
                      userAnswer === scenario.requiresHygiene
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                        : 'bg-amber-50 border-amber-200 text-amber-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-base mb-2">
                      {userAnswer === scenario.requiresHygiene ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>Resposta Correta!</span>
                        </>
                      ) : (
                        <>
                          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
                          <span>Atenção ao Critério:</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed">{scenario.explanation}</p>
                    <div className="mt-3 text-xs font-semibold text-slate-600">
                      Referência: {scenario.officialRef}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextScenario}
                    className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    {currentScenarioIndex < CLINICAL_SCENARIOS.length - 1 ? (
                      <>
                        Próxima Situação Clínica <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Finalizar Missão dos 5 Momentos <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Game Completion */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Missão dos 5 Momentos Concluída!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Você analisou todas as situações clínicas e fixou os conceitos fundamentais para proteger tanto o paciente quanto os profissionais de saúde.
              </p>
              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleRestartGame}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Jogar Novamente
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('cards')}
                  className="px-4 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-500 transition-all cursor-pointer shadow-sm"
                >
                  Rever Cards dos Momentos
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
