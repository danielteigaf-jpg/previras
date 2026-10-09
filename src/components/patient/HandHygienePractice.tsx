import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Droplets, Hand } from 'lucide-react';

const steps = [
  { title: 'Palma com palma', text: 'Esfregue uma palma contra a outra, cobrindo toda a superfície.', cue: 'Movimento de ida e volta entre as palmas.' },
  { title: 'Dorso das mãos', text: 'Esfregue a palma direita no dorso da mão esquerda, entrelaçando os dedos; depois troque.', cue: 'Alterne as mãos e alcance os espaços entre os dedos.' },
  { title: 'Entre os dedos', text: 'Esfregue as palmas com os dedos entrelaçados.', cue: 'Mantenha os dedos entrelaçados durante a fricção.' },
  { title: 'Dorso dos dedos', text: 'Esfregue o dorso dos dedos contra a palma oposta, com os dedos unidos.', cue: 'Faça o movimento nos dois lados.' },
  { title: 'Polegares', text: 'Envolva cada polegar com a mão oposta e faça movimentos circulares.', cue: 'Não esqueça a base do polegar; repita do outro lado.' },
  { title: 'Pontas dos dedos e unhas', text: 'Esfregue as pontas dos dedos e a região das unhas na palma oposta, em movimentos circulares.', cue: 'Repita com as duas mãos.' },
  { title: 'Finalize corretamente', text: 'Com água e sabonete, enxágue bem e seque com papel descartável. Se usar preparação alcoólica, friccione até secar.', cue: 'Na lavagem com água e sabonete, evite tocar novamente na torneira limpa.' }
];

export const HandHygienePractice: React.FC = () => {
  const [index, setIndex] = useState(0);
  const step = steps[index];

  return (
    <section aria-labelledby="hand-hygiene-title" className="bg-white rounded-3xl p-6 border border-teal-200 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-teal-50 text-teal-700"><Droplets className="w-6 h-6" /></div>
        <div>
          <p className="text-xs font-bold text-teal-700 uppercase tracking-wide">Treino interativo</p>
          <h3 id="hand-hygiene-title" className="text-lg font-bold text-slate-900">Aprenda os movimentos da higiene das mãos</h3>
        </div>
      </div>
      <p className="text-sm text-slate-600">Avance etapa por etapa. Esta versão apresenta a sequência e as instruções; a animação 3D realista das mãos será adicionada depois de validarmos o modelo e sua licença.</p>
      <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-slate-50 border border-teal-100 p-5 min-h-36 flex flex-col items-center justify-center text-center gap-2">
        <Hand className="w-12 h-12 text-teal-700" aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-wide text-teal-700">Etapa {index + 1} de {steps.length}</p>
        <h4 className="text-xl font-bold text-slate-900">{step.title}</h4>
        <p className="text-sm text-slate-700 max-w-xl">{step.text}</p>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden" aria-label={`Progresso: ${index + 1} de ${steps.length}`}>
        <div className="h-full bg-teal-600 rounded-full transition-all" style={{ width: `${((index + 1) / steps.length) * 100}%` }} />
      </div>
      <p className="text-sm text-slate-600"><strong>Dica:</strong> {step.cue}</p>
      <div className="flex flex-wrap gap-2 justify-between pt-1">
        <button type="button" onClick={() => setIndex(i => Math.max(0, i - 1))} disabled={index === 0} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-slate-200 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50">
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>
        <button type="button" onClick={() => setIndex(0)} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-slate-200 font-semibold text-sm hover:bg-slate-50">
          <RotateCcw className="w-4 h-4" /> Reiniciar
        </button>
        <button type="button" onClick={() => setIndex(i => Math.min(steps.length - 1, i + 1))} disabled={index === steps.length - 1} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 bg-teal-700 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-teal-800">
          Próxima <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-slate-500">Referências para revisão técnica: OMS — técnica de higiene das mãos; Anvisa — Segurança do Paciente e Higienização das Mãos. Validar a sequência com a docente antes de usar como material oficial.</p>
    </section>
  );
};
