import React, { useState } from 'react';
import { ProfessionalTab } from '../../types/previras';
import { HandHygieneInteractive } from './HandHygieneInteractive';
import { FiveMomentsGame } from './FiveMomentsGame';
import { GlovesQuiz } from './GlovesQuiz';
import { CrossContaminationSim } from './CrossContaminationSim';
import { RiskSituations } from './RiskSituations';
import { FinalChallenge } from './FinalChallenge';
import { FindTheRiskScene } from './FindTheRiskScene';
import { TransmissionChain } from './TransmissionChain';
import { CertificateGenerator } from './CertificateGenerator';
import { ReferencesModal } from '../common/ReferencesModal';
import {
  Sparkles,
  HandMetal,
  Clock,
  ShieldCheck,
  Flame,
  AlertTriangle,
  Award,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Eye,
  Scissors,
  Grid
} from 'lucide-react';

interface ProfessionalJourneyProps {
  onBackToHome: () => void;
  onSwitchToPatient: () => void;
}

export const ProfessionalJourney: React.FC<ProfessionalJourneyProps> = ({
  onBackToHome,
  onSwitchToPatient
}) => {
  const [activeTab, setActiveTab] = useState<ProfessionalTab>('overview');
  const [completedMissions, setCompletedMissions] = useState<Set<string>>(new Set());
  const [isRefModalOpen, setIsRefModalOpen] = useState(false);

  const markMissionComplete = (missionKey: string) => {
    setCompletedMissions(prev => {
      const next = new Set(prev);
      next.add(missionKey);
      return next;
    });
  };

  const missionsList = [
    {
      id: 'missao1-higiene' as ProfessionalTab,
      number: '01',
      title: 'Higiene das Mãos',
      subtitle: 'Passo a passo com mapa anatômico',
      icon: <HandMetal className="w-5 h-5 text-teal-600" />,
      tag: 'Técnica dos 7 Passos'
    },
    {
      id: 'missao2-momentos' as ProfessionalTab,
      number: '02',
      title: 'Cinco Momentos da OMS',
      subtitle: 'Cards e jogo de situações clínicas',
      icon: <Clock className="w-5 h-5 text-teal-600" />,
      tag: 'OMS / Anvisa'
    },
    {
      id: 'missao3-luvas' as ProfessionalTab,
      number: '03',
      title: 'Uso Correto de Luvas',
      subtitle: 'Desafio interativo Verdadeiro ou Falso',
      icon: <ShieldCheck className="w-5 h-5 text-teal-600" />,
      tag: 'Biossegurança'
    },
    {
      id: 'missao4-contaminacao' as ProfessionalTab,
      number: '04',
      title: 'Contaminação Cruzada',
      subtitle: 'Simulador visual de fômites e superfícies',
      icon: <Flame className="w-5 h-5 text-teal-600" />,
      tag: 'Simulação'
    },
    {
      id: 'missao5-risco' as ProfessionalTab,
      number: '05',
      title: 'Situações de Risco',
      subtitle: 'Casos cotidianos: jaleco, celular e adornos',
      icon: <AlertTriangle className="w-5 h-5 text-teal-600" />,
      tag: 'NR-32 / Ética'
    },
    {
      id: 'missao6-desafio' as ProfessionalTab,
      number: '06',
      title: 'Desafio Final',
      subtitle: '8 questões de síntese com resultado educativo',
      icon: <Award className="w-5 h-5 text-teal-600" />,
      tag: 'Consolidação'
    },
  ];

  const extraModules = [
    {
      id: 'extra-encontre-risco' as ProfessionalTab,
      title: 'Encontre o Risco',
      subtitle: 'Cena visual interativa do quarto hospitalar',
      icon: <Eye className="w-5 h-5 text-teal-600" />,
      badge: 'Cenário Prático'
    },
    {
      id: 'extra-cadeia' as ProfessionalTab,
      title: 'Cadeia de Transmissão',
      subtitle: 'Os 6 elos e como quebrar a transmissão',
      icon: <Scissors className="w-5 h-5 text-teal-600" />,
      badge: 'Epidemiologia'
    },
    {
      id: 'certificado' as ProfessionalTab,
      title: 'Certificado de Participação',
      subtitle: 'Emissão local para impressão ou PDF',
      icon: <Award className="w-5 h-5 text-teal-600" />,
      badge: 'Conclusão'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 pb-20">
      {/* Top Bar Contract (Strict 3 zones) */}
      <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand title & return home */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              title="Voltar para a tela de escolha de perfil"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Início</span>
            </button>
            <div className="h-4 w-[1px] bg-slate-300 hidden sm:block" />
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="text-base sm:text-lg font-bold text-teal-800 tracking-tight hover:text-teal-900 cursor-pointer"
            >
              PREVIRAS
            </button>
          </div>

          {/* Zone 2: Navigation Links / Segmented shortcuts */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-600 overflow-x-auto py-1">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-teal-50 text-teal-800'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Painel
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('missao1-higiene')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'missao1-higiene'
                  ? 'bg-teal-50 text-teal-800'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              1. Higiene
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('missao2-momentos')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'missao2-momentos'
                  ? 'bg-teal-50 text-teal-800'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              2. 5 Momentos
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('missao3-luvas')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'missao3-luvas'
                  ? 'bg-teal-50 text-teal-800'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              3. Luvas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('missao4-contaminacao')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'missao4-contaminacao'
                  ? 'bg-teal-50 text-teal-800'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              4. Contaminação
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('missao5-risco')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'missao5-risco'
                  ? 'bg-teal-50 text-teal-800'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              5. Riscos
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('missao6-desafio')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'missao6-desafio'
                  ? 'bg-teal-50 text-teal-800'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              6. Desafio
            </button>
          </nav>

          {/* Zone 3: Actions (References modal + Patient Switcher) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsRefModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
              title="Ver referências oficiais Anvisa, OMS, MS, NR-32 e Cofen"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Referências</span>
            </button>

            <button
              type="button"
              onClick={onSwitchToPatient}
              className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 hover:bg-teal-100 text-xs font-semibold cursor-pointer"
            >
              Sou Paciente
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* OVERVIEW / DASHBOARD VIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Hero Banner */}
            <div className="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-700/60 border border-teal-500/30 text-teal-200 text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  Jornada do Profissional de Saúde
                </div>

                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
                  Prevenir também é cuidar.
                </h1>

                <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
                  Bem-vindo à experiência educativa <strong>PREVIRAS</strong>, criada por estudantes do Técnico de Enfermagem para fortalecer as práticas de prevenção de Infecções Relacionadas à Assistência à Saúde (IRAS).
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs font-medium text-teal-200">
                  <span>Motto: <em>"Uma atitude pode interromper uma cadeia de transmissão."</em></span>
                </div>
              </div>
            </div>

            {/* Quick Status / Progress Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center">
                  {completedMissions.size}/6
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Progresso das Missões Principais
                  </h3>
                  <p className="text-xs text-slate-500">
                    Conclua as 6 missões para liberar o selo completo do certificado.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('missao1-higiene')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Iniciar Missão 1
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 6 Core Missions Grid */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Missões Educativas Principais
                </h3>
                <span className="text-xs text-slate-400">Clique para abrir</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {missionsList.map((mission) => {
                  const isDone = completedMissions.has(mission.id);
                  return (
                    <button
                      key={mission.id}
                      type="button"
                      onClick={() => setActiveTab(mission.id)}
                      className="p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-teal-400 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[160px] group cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="p-2.5 rounded-2xl bg-teal-50 group-hover:bg-teal-100 transition-colors">
                          {mission.icon}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                            {mission.tag}
                          </span>
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <span className="font-mono text-xs font-bold text-slate-400">
                              #{mission.number}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                          {mission.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          {mission.subtitle}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
                        <span>Acessar Missão</span>
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Extra Modules & Tools Grid */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Módulos Especiais & Ferramentas
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {extraModules.map((extra) => (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => setActiveTab(extra.id)}
                    className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all text-left flex flex-col justify-between min-h-[140px] group cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="p-2.5 rounded-2xl bg-teal-50 group-hover:bg-teal-100 transition-colors">
                        {extra.icon}
                      </div>
                      <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                        {extra.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                        {extra.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {extra.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 text-xs font-semibold text-teal-700 flex items-center gap-1">
                      <span>Explorar</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MISSION 1: HIGIENE DAS MÃOS */}
        {activeTab === 'missao1-higiene' && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel Geral
            </button>
            <HandHygieneInteractive
              onComplete={() => markMissionComplete('missao1-higiene')}
              isCompleted={completedMissions.has('missao1-higiene')}
            />
          </div>
        )}

        {/* MISSION 2: CINCO MOMENTOS */}
        {activeTab === 'missao2-momentos' && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel Geral
            </button>
            <FiveMomentsGame
              onComplete={() => markMissionComplete('missao2-momentos')}
              isCompleted={completedMissions.has('missao2-momentos')}
            />
          </div>
        )}

        {/* MISSION 3: USO DE LUVAS */}
        {activeTab === 'missao3-luvas' && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel Geral
            </button>
            <GlovesQuiz
              onComplete={() => markMissionComplete('missao3-luvas')}
              isCompleted={completedMissions.has('missao3-luvas')}
            />
          </div>
        )}

        {/* MISSION 4: CONTAMINAÇÃO CRUZADA */}
        {activeTab === 'missao4-contaminacao' && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel Geral
            </button>
            <CrossContaminationSim
              onComplete={() => markMissionComplete('missao4-contaminacao')}
              isCompleted={completedMissions.has('missao4-contaminacao')}
            />
          </div>
        )}

        {/* MISSION 5: SITUAÇÕES DE RISCO */}
        {activeTab === 'missao5-risco' && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel Geral
            </button>
            <RiskSituations
              onComplete={() => markMissionComplete('missao5-risco')}
              isCompleted={completedMissions.has('missao5-risco')}
            />
          </div>
        )}

        {/* MISSION 6: DESAFIO FINAL */}
        {activeTab === 'missao6-desafio' && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel Geral
            </button>
            <FinalChallenge
              onComplete={() => markMissionComplete('missao6-desafio')}
              onGoToCertificate={() => setActiveTab('certificado')}
              isCompleted={completedMissions.has('missao6-desafio')}
            />
          </div>
        )}

        {/* EXTRA: ENCONTRE O RISCO */}
        {activeTab === 'extra-encontre-risco' && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel Geral
            </button>
            <FindTheRiskScene
              onComplete={() => markMissionComplete('extra-encontre-risco')}
              isCompleted={completedMissions.has('extra-encontre-risco')}
            />
          </div>
        )}

        {/* EXTRA: CADEIA DE TRANSMISSÃO */}
        {activeTab === 'extra-cadeia' && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel Geral
            </button>
            <TransmissionChain
              onComplete={() => markMissionComplete('extra-cadeia')}
              isCompleted={completedMissions.has('extra-cadeia')}
            />
          </div>
        )}

        {/* CERTIFICADO */}
        {activeTab === 'certificado' && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="no-print text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Painel Geral
            </button>
            <CertificateGenerator
              completedMissionsCount={completedMissions.size}
            />
          </div>
        )}
      </main>

      {/* References Modal */}
      <ReferencesModal
        isOpen={isRefModalOpen}
        onClose={() => setIsRefModalOpen(false)}
      />
    </div>
  );
};
