import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Droplets, Hand, Pause, Play } from 'lucide-react';

const steps = [
  { title: 'Palma com palma', text: 'Esfregue uma palma contra a outra, cobrindo toda a superfície.', cue: 'Movimento de ida e volta entre as palmas.', pose: 'palms' },
  { title: 'Dorso das mãos', text: 'Esfregue a palma direita no dorso da mão esquerda, entrelaçando os dedos; depois troque.', cue: 'Alterne as mãos e alcance os espaços entre os dedos.', pose: 'backs' },
  { title: 'Entre os dedos', text: 'Esfregue as palmas com os dedos entrelaçados.', cue: 'Mantenha os dedos entrelaçados durante a fricção.', pose: 'fingers' },
  { title: 'Dorso dos dedos', text: 'Esfregue o dorso dos dedos contra a palma oposta, com os dedos unidos.', cue: 'Faça o movimento nos dois lados.', pose: 'knuckles' },
  { title: 'Polegares', text: 'Envolva cada polegar com a mão oposta e faça movimentos circulares.', cue: 'Não esqueça a base do polegar; repita do outro lado.', pose: 'thumbs' },
  { title: 'Pontas dos dedos e unhas', text: 'Esfregue as pontas dos dedos e a região das unhas na palma oposta, em movimentos circulares.', cue: 'Repita com as duas mãos.', pose: 'tips' },
  { title: 'Finalize corretamente', text: 'Com água e sabonete, enxágue bem e seque com papel descartável. Se usar preparação alcoólica, friccione até secar.', cue: 'Na lavagem com água e sabonete, evite tocar novamente na torneira limpa.', pose: 'finish' }
];

export const HandHygienePractice: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const step = steps[index];

  return (
    <section aria-labelledby="hand-hygiene-title" className="bg-white rounded-3xl p-6 border border-teal-200 shadow-sm space-y-4">
      <style>{`
        @keyframes previras-rub-left { 0%,100% { transform: translateX(-9px) rotate(-7deg); } 50% { transform: translateX(9px) rotate(7deg); } }
        @keyframes previras-rub-right { 0%,100% { transform: translateX(9px) rotate(7deg) scaleX(-1); } 50% { transform: translateX(-9px) rotate(-7deg) scaleX(-1); } }
        @keyframes previras-circle { 0%,100% { transform: translate(0,0) rotate(-8deg); } 50% { transform: translate(4px,-4px) rotate(8deg); } }
        .previras-hand { width: 5.25rem; height: 5.25rem; color: #0f766e; }
        .previras-left { animation: previras-rub-left 1.15s ease-in-out infinite; }
        .previras-right { animation: previras-rub-right 1.15s ease-in-out infinite; }
        .previras-circular { animation: previras-circle 1.15s ease-in-out infinite; }
        .previras-paused * { animation-play-state: paused !important; }
        @media (prefers-reduced-motion: reduce) { .previras-left,.previras-right,.previras-circular { animation: none !important; } }
      `}</style>
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-teal-50 text-teal-700"><Droplets className="w-6 h-6" /></div>
        <div>
          <p className="text-xs font-bold text-teal-700 uppercase tracking-wide">Treino interativo</p>
          <h3 id="hand-hygiene-title" className="text-lg font-bold text-slate-900">Aprenda os movimentos da higiene das mãos</h3>
        </div>
      </div>
      <p className="text-sm text-slate-600">Use as etapas e as instruções para aprender a sequência. A animação abaixo é um protótipo ilustrativo de movimento, não um modelo anatômico 3D nem uma demonstração clínica validada.</p>
      <div className={`rounded-2xl bg-gradient-to-br from-teal-50 to-slate-50 border border-teal-100 p-5 min-h-44 flex flex-col items-center justify-center text-center gap-3 ${playing ? '' : 'previras-paused'}`}>
        <div className="flex items-center justify-center gap-1 sm:gap-4" aria-label="Ilustração animada de duas mãos">
          <Hand className={`previras-hand ${index === 4 || index === 5 ? 'previras-circular' : 'previras-left'}`} strokeWidth={1.6} aria-hidden="true" />
          <Hand className={`previras-hand ${index === 4 || index === 5 ? 'previras-circular' : 'previras-right'}`} strokeWidth={1.6} aria-hidden="true" />
        </div>
        <p className="text-xs font-bold uppercase tracking-wide text-teal-700">Etapa {index + 1} de {steps.length}</p>
        <h4 className="text-xl font-bold text-slate-900">{step.title}</h4>
        <p className="text-sm text-slate-700 max-w-xl">{step.text}</p>
        <button type="button" onClick={() => setPlaying(v => !v)} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-teal-200 bg-white text-teal-800 font-semibold text-sm hover:bg-teal-50" aria-pressed={!playing}>
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />} {playing ? 'Pausar movimento' : 'Retomar movimento'}
        </button>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden" aria-label={`Progresso: ${index + 1} de ${steps.length}`}>
        <div className="h-full bg-teal-600 rounded-full transition-all" style={{ width: `${((index + 1) / steps.length) * 100}%` }} />
      </div>
      <p className="text-sm text-slate-600"><strong>Dica:</strong> {step.cue}</p>
      <div className="flex flex-wrap gap-2 justify-between pt-1">
        <button type="button" onClick={() => setIndex(i => Math.max(0, i - 1))} disabled={index === 0} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-slate-200 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50">
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>
        <button type="button" onClick={() => { setIndex(0); setPlaying(true); }} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-slate-200 font-semibold text-sm hover:bg-slate-50">
          <RotateCcw className="w-4 h-4" /> Reiniciar
        </button>
        <button type="button" onClick={() => setIndex(i => Math.min(steps.length - 1, i + 1))} disabled={index === steps.length - 1} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-teal-700 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-800">
          Próxima <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-slate-500">Referências para revisão técnica: OMS — técnica de higiene das mãos; Anvisa — Segurança do Paciente e Higienização das Mãos. Validar a sequência com a docente antes de usar como material educativo oficial.</p>
    </section>
  );
};
