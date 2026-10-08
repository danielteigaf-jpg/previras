import React, { useState } from 'react';
import { SIMULATION_OBJECTS } from '../../data/officialContent';
import { SimulationObject } from '../../types/previras';
import {
  User,
  Bed,
  Smartphone,
  Monitor,
  PenTool,
  FileText,
  Activity,
  DoorClosed,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  RotateCcw,
  HandMetal,
  CheckCircle2,
  Flame
} from 'lucide-react';

interface CrossContaminationSimProps {
  onComplete?: () => void;
  isCompleted?: boolean;
}

export const CrossContaminationSim: React.FC<CrossContaminationSimProps> = ({ onComplete, isCompleted }) => {
  // Track contamination state for each object
  const [contaminationMap, setContaminationMap] = useState<Record<string, boolean>>({
    paciente: true, // Patient naturally carries microbiota
    grade_leito: true,
    celular: false,
    computador: false,
    caneta: false,
    prontuario: false,
    bomba_infusao: false,
    macaneta: false,
    dispensador: false, // Clean sanitizer
  });

  const [handsContaminated, setHandsContaminated] = useState(false);
  const [activeItem, setActiveItem] = useState<SimulationObject | null>(null);
  const [historyEvents, setHistoryEvents] = useState<string[]>([
    'Início da simulação: Flora microbiana presente no paciente e grade do leito.'
  ]);
  const [actionsCount, setActionsCount] = useState(0);

  // Helper to get icon component
  const getIcon = (id: string, isContaminated: boolean) => {
    const className = `w-6 h-6 transition-transform ${
      isContaminated ? 'text-amber-500 animate-pulse' : 'text-teal-600'
    }`;

    switch (id) {
      case 'paciente': return <User className={className} />;
      case 'grade_leito': return <Bed className={className} />;
      case 'celular': return <Smartphone className={className} />;
      case 'computador': return <Monitor className={className} />;
      case 'caneta': return <PenTool className={className} />;
      case 'prontuario': return <FileText className={className} />;
      case 'bomba_infusao': return <Activity className={className} />;
      case 'macaneta': return <DoorClosed className={className} />;
      case 'dispensador': return <Sparkles className="w-6 h-6 text-emerald-500 animate-bounce" />;
      default: return <User className={className} />;
    }
  };

  const handleTouchObject = (item: SimulationObject) => {
    setActiveItem(item);
    setActionsCount(prev => prev + 1);

    if (item.id === 'dispensador') {
      // Clean hands immediately
      setHandsContaminated(false);
      setHistoryEvents(prev => [
        `Higienização realizada no dispensador com álcool a 70%! As mãos estão limpas e a cadeia de transmissão foi interrompida.`,
        ...prev.slice(0, 5)
      ]);
      if (actionsCount >= 4 && onComplete) {
        onComplete();
      }
      return;
    }

    const itemIsContaminated = contaminationMap[item.id];

    if (itemIsContaminated && !handsContaminated) {
      // Hands become contaminated
      setHandsContaminated(true);
      setHistoryEvents(prev => [
        `Você tocou no(a) ${item.name}. Microrganismos foram transferidos para as suas mãos!`,
        ...prev.slice(0, 5)
      ]);
    } else if (handsContaminated && !itemIsContaminated) {
      // Contaminate the clean item
      setContaminationMap(prev => ({ ...prev, [item.id]: true }));
      setHistoryEvents(prev => [
        `ALERTA DE CONTAMINAÇÃO CRUZADA: Suas mãos contaminadas tocaram no(a) ${item.name}, transferindo bactérias para esta superfície!`,
        ...prev.slice(0, 5)
      ]);
    } else if (itemIsContaminated && handsContaminated) {
      setHistoryEvents(prev => [
        `Suas mãos já estão colonizadas e entraram em contato com ${item.name}.`,
        ...prev.slice(0, 5)
      ]);
    } else {
      setHistoryEvents(prev => [
        `Suas mãos limpas tocaram ${item.name}. Nenhuma transmissão ocorreu porque suas mãos estavam higienizadas!`,
        ...prev.slice(0, 5)
      ]);
    }
  };

  const handleCleanSpecificObject = (itemId: string) => {
    if (itemId === 'paciente') {
      setHistoryEvents(prev => [
        'A flora do paciente é residente. A conduta é higienizar as mãos antes e após tocá-lo!',
        ...prev.slice(0, 5)
      ]);
      return;
    }

    setContaminationMap(prev => ({ ...prev, [itemId]: false }));
    const obj = SIMULATION_OBJECTS.find(o => o.id === itemId);
    setHistoryEvents(prev => [
      `Atitude de Interrupção: Desinfecção realizada com sucesso em "${obj?.name}"! Superfície descontaminada.`,
      ...prev.slice(0, 5)
    ]);
  };

  const handleReset = () => {
    setContaminationMap({
      paciente: true,
      grade_leito: true,
      celular: false,
      computador: false,
      caneta: false,
      prontuario: false,
      bomba_infusao: false,
      macaneta: false,
      dispensador: false,
    });
    setHandsContaminated(false);
    setActiveItem(null);
    setHistoryEvents(['Simulação reiniciada com sucesso.']);
    setActionsCount(0);
  };

  const totalContaminated = Object.entries(contaminationMap).filter(([id, val]) => val && id !== 'dispensador').length;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
              Missão 4 · Simulador Interativo de Fômites & Superfícies
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Simulação de Contaminação Cruzada
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Clique nos objetos para simular o toque do profissional. Veja as partículas microbianas se propagarem entre o leito, o celular, as maçanetas e os equipamentos. Em seguida, use as atitudes de interrupção para neutralizar o risco!
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold self-start sm:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar Ambiente
          </button>
        </div>

        {/* Live Status Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500">Status das Mãos:</span>
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                handsContaminated
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}
            >
              {handsContaminated ? (
                <>
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  MÃOS CONTAMINADAS (Vetor Ativo!)
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  MÃOS HIGIENIZADAS (Seguras)
                </>
              )}
            </div>
          </div>

          <div className="text-xs font-medium text-slate-600">
            Fômites/Superfícies colonizados no quarto: <strong className="text-slate-900">{totalContaminated} de 8</strong>
          </div>
        </div>
      </div>

      {/* Interactive Environment Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Environment Grid (80%) */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-2 border-b border-slate-800">
            <span className="font-semibold text-teal-400">Planta Interativa do Quarto & Posto de Saúde</span>
            <span className="text-slate-400">Toque em um item para interagir</span>
          </div>

          {/* Room Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {SIMULATION_OBJECTS.map((item) => {
              const isContaminated = contaminationMap[item.id];
              const isSelected = activeItem?.id === item.id;
              const isSanitizer = item.id === 'dispensador';

              return (
                <div
                  key={item.id}
                  onClick={() => handleTouchObject(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between min-h-[120px] ${
                    isSanitizer
                      ? 'bg-emerald-950/40 border-emerald-600/80 hover:bg-emerald-900/50 hover:border-emerald-400'
                      : isContaminated
                      ? 'bg-slate-800/90 border-amber-500/70 hover:border-amber-400 shadow-lg shadow-amber-950/30'
                      : 'bg-slate-800/40 border-slate-700 hover:border-teal-500/60 hover:bg-slate-800/70'
                  } ${isSelected ? 'ring-2 ring-teal-400' : ''}`}
                >
                  {/* Microbe particles overlay when contaminated */}
                  {isContaminated && !isSanitizer && (
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-700/60">
                        Colonizado
                      </span>
                    </div>
                  )}

                  {isSanitizer && (
                    <div className="absolute top-2 right-2">
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-700/80">
                        Interromper
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isSanitizer ? 'bg-emerald-900/40' : isContaminated ? 'bg-amber-950/40' : 'bg-slate-700/50'}`}>
                      {getIcon(item.id, isContaminated)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-snug">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {item.category === 'patient' ? 'Zona do Paciente' : item.category === 'sanitizer' ? 'Dispensador' : 'Fômite / Superfície'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-slate-300 line-clamp-2">
                    {item.description}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Help Hint */}
          <div className="mt-4 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2 text-xs text-slate-300">
            <HandMetal className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              <strong>Dica:</strong> Toque no <strong>Dispensador de Álcool 70%</strong> sempre que suas mãos ficarem contaminadas para desarmar a transmissão!
            </span>
          </div>
        </div>

        {/* Action Panel & Live Event Feed (40%) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Selected Item Detail & Intervention Box */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Ação de Interrupção
            </h3>

            {activeItem ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
                    {getIcon(activeItem.id, contaminationMap[activeItem.id])}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{activeItem.name}</h4>
                    <span className="text-xs text-slate-500">
                      {contaminationMap[activeItem.id] ? 'Superfície com risco microbiano' : 'Superfície limpa'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                  <strong className="block text-slate-900 mb-1">{activeItem.cleanActionName}</strong>
                  {activeItem.cleanActionDesc}
                </div>

                {contaminationMap[activeItem.id] && activeItem.id !== 'paciente' && activeItem.id !== 'dispensador' && (
                  <button
                    type="button"
                    onClick={() => handleCleanSpecificObject(activeItem.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Realizar Desinfecção com Álcool 70%
                  </button>
                )}

                {activeItem.id === 'dispensador' && (
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-semibold">
                    Dispensador acionado! Mãos friccionadas com álcool a 70% por 20 a 30 segundos.
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-500">
                Toque em qualquer objeto na planta ao lado para ver sua via de transmissão e a atitude capaz de desinfetá-lo.
              </div>
            )}
          </div>

          {/* Feed of Transmission Events */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Histórico de Propagação
            </h3>
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 text-xs">
              {historyEvents.map((event, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border leading-relaxed ${
                    event.includes('ALERTA')
                      ? 'bg-rose-50 border-rose-200 text-rose-950 font-medium'
                      : event.includes('interrompida') || event.includes('sucesso')
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-slate-50 border-slate-200/70 text-slate-700'
                  }`}
                >
                  {event}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
