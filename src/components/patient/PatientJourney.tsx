import React, { useState } from 'react';
import { HandHygienePractice } from './HandHygienePractice';
import { PATIENT_CHALLENGES } from '../../data/officialContent';
import { PatientChallenge } from '../../types/previras';
import {
  Heart,
  Droplets,
  HelpCircle,
  AlertTriangle,
  Wind,
  Bell,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ArrowLeft
} from 'lucide-react';

interface PatientJourneyProps {
  onBackToHome: () => void;
  onSwitchToProfessional: () => void;
}

export const PatientJourney: React.FC<PatientJourneyProps> = ({
  onBackToHome,
  onSwitchToProfessional
}) => {
  const [activeTab, setActiveTab] = useState<'guia' | 'desafios' | 'bolso'>('guia');

  // Challenge game state
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [allFinished, setAllFinished] = useState(false);

  const challenge: PatientChallenge = PATIENT_CHALLENGES[currentChallengeIndex];
  const selectedOption = challenge.options.find(opt => opt.id === selectedOptionId);

  const handleSelectOption = (id: string) => {
    if (submitted) return;
    setSelectedOptionId(id);
    setSubmitted(true);
    if (!completedChallenges.includes(challenge.id)) {
      setCompletedChallenges(prev => [...prev, challenge.id]);
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < PATIENT_CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setSubmitted(false);
    } else {
      setAllFinished(true);
    }
  };

  const handleRestartChallenges = () => {
    setCurrentChallengeIndex(0);
    setSelectedOptionId(null);
    setSubmitted(false);
    setAllFinished(false);
    setCompletedChallenges([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Bar Contract for Patient Experience */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-semibold cursor-pointer"
            aria-label="Voltar para a tela inicial"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Início</span>
          </button>

          <div className="text-center">
            <span className="text-base sm:text-lg font-bold text-teal-800 tracking-tight">
              PREVIRAS
            </span>
            <span className="hidden sm:inline text-xs text-slate-500 ml-2">
              · Espaço do Paciente e Acompanhante
            </span>
          </div>

          <button
            type="button"
            onClick={onSwitchToProfessional}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 underline underline-offset-4 cursor-pointer"
          >
            Sou Profissional
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Warm Welcome Banner */}
        <div className="bg-gradient-to-br from-teal-700 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-600/60 border border-teal-400/30 text-teal-100 text-xs font-bold tracking-wide">
              <Heart className="w-3.5 h-3.5 text-teal-200 fill-teal-200" />
              Prevenir também é cuidar
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Você faz parte da equipe de segurança!
            </h1>

            <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
              Sabia que pacientes e familiares informados ajudam a evitar infecções no hospital? Este guia foi preparado com carinho por estudantes do Técnico de Enfermagem para apoiar você durante a internação ou consulta.
            </p>
          </div>
        </div>

        {/* Navigation Selector */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-200/70 rounded-2xl border border-slate-300/60">
          <button
            type="button"
            onClick={() => setActiveTab('guia')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
              activeTab === 'guia'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Guia de Cuidados
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('desafios')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
              activeTab === 'desafios'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Desafio Interativo ({completedChallenges.length}/4)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bolso')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
              activeTab === 'bolso'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cartão de Bolso
          </button>
        </div>

        {/* TAB 1: GUIA DE CUIDADOS ACOLHEDOR */}
        {activeTab === 'guia' && (
          <div className="space-y-4">
            {/* 1. Mãos */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-50 text-teal-700">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">
                    Passo 1
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    A Higiene das Mãos Protege Quem Você Ama
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                As mãos são o principal veículo de transmissão de micróbios no hospital. Lave as mãos com água e sabão ou friccione o álcool em gel:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium pt-1">
                <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Ao entrar e sair do quarto</span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Antes e depois das refeições</span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Após usar o banheiro</span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Após tocar na cama ou mobília</span>
                </li>
              </ul>
            </div>

            <HandHygienePractice />

            {/* 2. Perguntar com Carinho */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-700">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                    Passo 2
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Você Pode (e Deve) Perguntar com Carinho!
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Não tenha vergonha ou receio: a Organização Mundial da Saúde e os conselhos de saúde incentivam que pacientes e familiares participem ativamente da segurança.
              </p>
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-blue-950 font-medium">
                💬 <strong>Exemplo de como perguntar com gentileza:</strong><br />
                <em>"Olá, com licença! Você já conseguiu higienizar as mãos antes de mexer no meu soro/curativo?"</em>
                <p className="mt-1 text-xs text-blue-800">
                  Os profissionais responsáveis entendem e agradecem esse cuidado compartilhado!
                </p>
              </div>
            </div>

            {/* 3. Dispositivos e Equipamentos */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-50 text-amber-700">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                    Passo 3
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Nunca Mexa em Aparelhos, Soros ou Cateteres
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Bombas de infusão, suportes de soro, sondas de urina e curativos exigem técnica profissional estéril:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>Se a máquina apitar, não aperte botões: acione a campainha da enfermagem.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>Não dobre ou puxe mangueiras de soro.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>Mantenha a bolsa de urina sempre abaixo do nível da cintura do paciente para não retornar urina para a bexiga.</span>
                </li>
              </ul>
            </div>

            {/* 4. Etiqueta Respiratória */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-50 text-teal-700">
                  <Wind className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">
                    Passo 4
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Etiqueta ao Tossir ou Espirrar
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Nunca tussa ou espirre diretamente nas palmas das mãos desprotegidas! Cubra a boca e o nariz com a dobra do cotovelo ou use um lenço de papel descartável e jogue no lixo, higienizando as mãos em seguida.
              </p>
            </div>

            {/* 5. Comunicação de Sintomas */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-50 text-rose-700">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">
                    Passo 5
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Comunique Imediatamente Qualquer Alteração
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Chame a equipe de enfermagem se notar:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-800 font-medium">
                <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100">
                  ⚠️ Curativo molhado, frouxo ou descolado
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100">
                  ⚠️ Dor, inchaço ou vermelhidão no cateter
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100">
                  ⚠️ Sensação de febre, calafrios ou náuseas
                </div>
              </div>
            </div>

            {/* CTA to Interactive Challenges */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setActiveTab('desafios')}
                className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                Praticar nos Desafios Interativos
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: DESAFIOS INTERATIVOS DO PACIENTE & ACOMPANHANTE */}
        {activeTab === 'desafios' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto">
            {!allFinished ? (
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-2 border-b border-slate-100">
                  <span className="font-semibold text-teal-700">Desafio {currentChallengeIndex + 1} de {PATIENT_CHALLENGES.length}</span>
                  <span>Respondidos: {completedChallenges.length}</span>
                </div>

                <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200/80 mb-5">
                  <span className="text-xs font-bold text-teal-800 uppercase tracking-wide block mb-1">
                    Situação do Dia a Dia
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-teal-950 leading-relaxed">
                    "{challenge.situation}"
                  </p>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
                  {challenge.question}
                </h3>

                <div className="space-y-3 mb-6">
                  {challenge.options.map((option) => {
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

                {submitted && selectedOption && (
                  <div className="space-y-4">
                    <div
                      className={`p-4 rounded-2xl border ${
                        selectedOption.isCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : 'bg-amber-50 border-amber-200 text-amber-950'
                      }`}
                    >
                      <div className="font-bold text-sm mb-1 flex items-center gap-1.5">
                        {selectedOption.isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Parabéns! Atitude correta e segura.</span>
                          </>
                        ) : (
                          <>
                            <HelpCircle className="w-4 h-4 text-amber-600" />
                            <span>Oriente-se sempre pela segurança:</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed">
                        {selectedOption.explanation}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextChallenge}
                      className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      {currentChallengeIndex < PATIENT_CHALLENGES.length - 1 ? (
                        <>
                          Próxima Situação <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Concluir Desafio do Paciente <CheckCircle2 className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Parabéns, Paciente / Acompanhante Consciente!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Você completou todos os desafios! Sua atenção e suas atitudes são fundamentais para garantir uma assistência segura e livre de infecções.
                </p>
                <div className="flex items-center justify-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handleRestartChallenges}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /> Refazer
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('bolso')}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-500 transition-all cursor-pointer shadow-sm"
                  >
                    Ver Cartão de Bolso
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CARTÃO DE BOLSO PARA O CELULAR */}
        {activeTab === 'bolso' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-700 shadow-md max-w-md mx-auto space-y-4">
            <div className="text-center border-b border-slate-200 pb-3">
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block">
                Guia Rápido de Bolso · PREVIRAS
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                As 5 Regras de Ouro no Hospital
              </h3>
            </div>

            <ol className="space-y-3 text-xs sm:text-sm text-slate-800">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <span><strong>Limpe as mãos sempre:</strong> Ao entrar no quarto, antes de comer e após usar o banheiro.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <span><strong>Pergunte com carinho:</strong> É seu direito lembrar gentilmente o profissional de higienizar as mãos.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <span><strong>Não mexa em aparelhos:</strong> Deixe botões, soros e tubos sob cuidado exclusivo da enfermagem.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">4</span>
                <span><strong>Cubra tosse e espirro:</strong> Use o antebraço ou lenço, nunca as palmas das mãos abertas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">5</span>
                <span><strong>Avise qualquer mudança:</strong> Curativo solto, febre ou dor devem ser comunicados imediatamente.</span>
              </li>
            </ol>

            <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
              <em>"Prevenir também é cuidar."</em>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
