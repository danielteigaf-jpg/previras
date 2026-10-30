import React, { useState } from 'react';
import { PATIENT_CHALLENGES } from '../../data/officialContent';
import { PatientChallenge } from '../../types/previras';
import {
  Heart, Droplets, HelpCircle, AlertTriangle, Wind, Bell, CheckCircle2,
  ArrowRight, RotateCcw, MessageCircle, ArrowLeft, Users,
  UserCheck, Pill, Footprints, BedDouble, Printer, Info, ClipboardList
} from 'lucide-react';

interface PatientJourneyProps {
  onBackToHome: () => void;
  onSwitchToProfessional: () => void;
}

const Card: React.FC<{ icon: React.ReactNode; step: string; title: string; children: React.ReactNode }> = ({
  icon, step, title, children
}) => (
  <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 break-inside-avoid">
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-2xl bg-teal-50 text-teal-700">{icon}</div>
      <div>
        <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">{step}</span>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
    </div>
    {children}
  </section>
);

export const PatientJourney: React.FC<PatientJourneyProps> = ({ onBackToHome, onSwitchToProfessional }) => {
  const [activeTab, setActiveTab] = useState<'guia' | 'desafios' | 'bolso'>('guia');
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 print:bg-white print:pb-0">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button type="button" onClick={onBackToHome} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-semibold" aria-label="Voltar para a tela inicial">
            <ArrowLeft className="w-4 h-4" /><span>Início</span>
          </button>
          <div className="text-center">
            <span className="text-base sm:text-lg font-bold text-teal-800 tracking-tight">PREVIRAS</span>
            <span className="hidden sm:inline text-xs text-slate-500 ml-2">· Espaço do Paciente e Acompanhante</span>
          </div>
          <button type="button" onClick={onSwitchToProfessional} className="text-xs font-semibold text-teal-700 hover:text-teal-800 underline underline-offset-4">Sou Profissional</button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6 print:max-w-none print:p-0">
        <div className="bg-gradient-to-br from-teal-700 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden print:hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-600/60 border border-teal-400/30 text-teal-100 text-xs font-bold tracking-wide">
              <Heart className="w-3.5 h-3.5 fill-teal-200" /> Prevenir também é cuidar
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight uppercase">Existe alguém esperando por você em casa.</h1>
            <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
              Pergunte. Avise. Participe. Sua voz pode ajudar a prevenir riscos e tornar seu atendimento mais seguro.
            </p>
            <p className="text-sm text-teal-100 leading-relaxed">
              Se você acompanha alguém, sua atenção também faz parte desse cuidado.
            </p>
          </div>
        </div>

        <nav aria-label="Seções do guia" className="grid grid-cols-3 gap-2 p-1.5 bg-slate-200/70 rounded-2xl border border-slate-300/60 print:hidden">
          <button type="button" onClick={() => setActiveTab('guia')} aria-pressed={activeTab === 'guia'} className={'py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold text-center ' + (activeTab === 'guia' ? 'bg-white text-teal-900 shadow-sm' : 'text-slate-600 hover:text-slate-900')}>Guia de Cuidados</button>
          <button type="button" onClick={() => setActiveTab('desafios')} aria-pressed={activeTab === 'desafios'} className={'py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold text-center ' + (activeTab === 'desafios' ? 'bg-white text-teal-900 shadow-sm' : 'text-slate-600 hover:text-slate-900')}>Desafios ({completedChallenges.length}/{PATIENT_CHALLENGES.length})</button>
          <button type="button" onClick={() => setActiveTab('bolso')} aria-pressed={activeTab === 'bolso'} className={'py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold text-center ' + (activeTab === 'bolso' ? 'bg-white text-teal-900 shadow-sm' : 'text-slate-600 hover:text-slate-900')}>Cartão de Bolso</button>
        </nav>

        {activeTab === 'guia' && (
          <div className="space-y-4">
            <div className="print:hidden rounded-2xl border border-teal-200 bg-teal-50 p-4 text-sm text-teal-950">
              <div className="flex items-start gap-2"><Info className="w-5 h-5 shrink-0 mt-0.5" /><p><strong>Uma parceria, não uma cobrança:</strong> a segurança é responsabilidade do serviço e de toda a equipe. Sua participação ajuda a perceber dúvidas e mudanças. Se não puder fazer algo sozinho, peça ajuda.</p></div>
            </div>

            <Card icon={<ClipboardList className="w-6 h-6" />} step="Ao chegar ao Pronto-Socorro" title="Entenda a classificação de risco">
              <p className="text-sm text-slate-700 leading-relaxed">Ao chegar, você poderá passar pela classificação de risco. Um profissional avalia suas queixas, sintomas e sinais de saúde para identificar a prioridade do atendimento.</p>
              <div className="rounded-xl border border-teal-100 bg-teal-50 p-3 text-sm text-teal-950">
                <strong>O atendimento não é necessariamente por ordem de chegada.</strong> Pessoas em situações mais graves podem ser atendidas primeiro, mesmo que tenham chegado depois.
              </div>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>Conte com clareza o que está sentindo, quando começou e se houve piora.</li>
                <li>Informe doenças, alergias e medicamentos que usa.</li>
                <li>A classificação de risco organiza a prioridade; ela não é um diagnóstico médico.</li>
                <li>Se estiver aguardando e sentir piora ou um sintoma novo, avise imediatamente a equipe.</li>
              </ul>
              <p className="text-xs text-slate-600">A prioridade pode mudar conforme a avaliação e a evolução dos sintomas. Este guia não promete nem prevê tempo de espera: siga as orientações da equipe do serviço.</p>
            </Card>

            <Card icon={<Droplets className="w-6 h-6" />} step="Cuidado 1" title="Higienize as mãos nos momentos importantes">
              <p className="text-sm text-slate-700 leading-relaxed">As mãos podem transportar microrganismos entre pessoas e superfícies. A higiene das mãos é uma medida essencial para reduzir a transmissão de infecções.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                {['Antes de comer ou tocar alimentos','Depois de usar o banheiro','Depois de tossir, espirrar ou assoar o nariz','Quando as mãos estiverem visivelmente sujas','Ao chegar ao serviço e ao retornar ao quarto, como cuidado adicional'].map(item => <li key={item} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" /><span>{item}</span></li>)}
              </ul>
              <p className="text-sm text-slate-700"><strong>Como escolher?</strong> Água e sabonete líquido quando as mãos estiverem visivelmente sujas e após usar o banheiro. Se estiverem sem sujeira visível, use preparação alcoólica disponibilizada pelo serviço, conforme orientação local. Não substitua a higiene das mãos por luvas.</p>
              <div className="rounded-xl bg-teal-50 border border-teal-100 p-3 text-xs text-teal-950"><strong>Tempos de referência do manual Anvisa 2026:</strong> fricção com preparação alcoólica: 20–30 segundos; água e sabonete: 40–60 segundos. Siga a orientação da equipe e as instruções do produto.</div>
            </Card>

            <Card icon={<MessageCircle className="w-6 h-6" />} step="Cuidado 2" title="Pergunte com tranquilidade e respeito">
              <p className="text-sm text-slate-700 leading-relaxed">Você pode participar das decisões e fazer perguntas. Se tiver dúvida sobre a higiene das mãos antes de um cuidado, pergunte sem constrangimento:</p>
              <blockquote className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-sm text-blue-950">“Com licença, poderia higienizar as mãos antes de realizar meu cuidado? Quero ajudar a cuidar da minha segurança.”</blockquote>
              <p className="text-xs text-slate-600">A equipe deve acolher dúvidas e explicar os cuidados. A responsabilidade pela prevenção de infecções continua sendo do serviço e dos profissionais; você não precisa fiscalizar ninguém.</p>
            </Card>

            <Card icon={<AlertTriangle className="w-6 h-6" />} step="Cuidado 3" title="Não ajuste soros, cateteres ou equipamentos">
              <p className="text-sm text-slate-700 leading-relaxed">Não altere a programação de bombas, não desconecte equipos ou cateteres e não retire curativos ou sondas. Se um aparelho apitar, algo se soltar ou causar desconforto, chame a equipe.</p>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>Não puxe, dobre ou desconecte tubos e extensões.</li>
                <li>Se usar sonda vesical com bolsa coletora, mantenha-a abaixo do nível da bexiga e sem contato com o chão; não manipule o sistema.</li>
                <li>Avise a enfermagem se notar vazamento, obstrução, desconexão ou mudança na aparência da urina.</li>
              </ul>
            </Card>

            <Card icon={<Wind className="w-6 h-6" />} step="Cuidado 4" title="Cuide da higiene respiratória">
              <p className="text-sm text-slate-700 leading-relaxed">Ao tossir ou espirrar, cubra nariz e boca com lenço descartável ou com a dobra do cotovelo. Descarte o lenço no lixo e higienize as mãos em seguida. Evite tocar olhos, nariz e boca com as mãos não higienizadas.</p>
              <p className="text-sm text-slate-700">Se estiver com sintomas respiratórios, avise a equipe. Use máscara quando for orientado e siga as medidas de precaução indicadas pelo serviço.</p>
            </Card>

            <Card icon={<Bell className="w-6 h-6" />} step="Cuidado 5" title="Comunique mudanças no seu estado de saúde">
              <p className="text-sm text-slate-700">Avise a equipe de enfermagem se perceber:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                {['Febre, calafrios ou piora repentina','Dor, vermelhidão, calor ou inchaço perto de cateter','Curativo molhado, sujo, solto ou descolado','Sangramento, secreção ou mau cheiro em feridas','Dor ou desconforto novo, inclusive ao redor de sondas','Equipamento, soro ou bolsa coletora com vazamento ou alteração'].map(item => <li key={item} className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">• {item}</li>)}
              </ul>
              <p className="text-xs text-slate-600">Não retire dispositivos nem tente refazer curativos por conta própria. Peça avaliação da equipe.</p>
            </Card>

            <Card icon={<Users className="w-6 h-6" />} step="Cuidado 6" title="Visitantes e acompanhantes também protegem">
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>Higienize as mãos ao chegar, antes e depois de tocar no paciente e ao sair.</li>
                <li>Se estiver com febre, tosse, coriza, vômitos ou diarreia, avise o serviço e evite visitar até receber orientação.</li>
                <li>Respeite as orientações sobre máscara, isolamento, número de visitantes e equipamentos de proteção.</li>
                <li>Não sente na cama nem toque em curativos, cateteres ou equipamentos sem orientação.</li>
              </ul>
            </Card>

            <Card icon={<UserCheck className="w-6 h-6" />} step="Cuidado 7" title="Confira sua identificação antes dos cuidados">
              <p className="text-sm text-slate-700 leading-relaxed">Antes de medicamentos, exames, transfusões ou procedimentos, a equipe deve confirmar sua identidade usando os identificadores adotados pelo serviço. Confira se a pulseira está legível e avise se houver erro ou ausência.</p>
              <p className="text-sm text-slate-700">Esteja preparado para dizer seu nome completo e outro dado solicitado. Não confirme apenas pelo número do leito ou quarto: ele não identifica você com segurança.</p>
            </Card>

            <Card icon={<Pill className="w-6 h-6" />} step="Cuidado 8" title="Participe da segurança dos medicamentos">
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>Informe alergias, reações anteriores e todos os medicamentos que usa, inclusive vitaminas, chás e produtos sem receita.</li>
                <li>Pergunte o nome do medicamento e para que serve se tiver dúvida.</li>
                <li>Avise se o medicamento parecer diferente do habitual ou se sentir uma reação inesperada.</li>
                <li>Não tome medicamentos trazidos de casa nem altere horários ou doses sem combinar com a equipe.</li>
              </ul>
            </Card>

            <Card icon={<Footprints className="w-6 h-6" />} step="Cuidado 9" title="Evite quedas: peça ajuda para se levantar">
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>Se estiver fraco, sonolento, tonto ou inseguro, use a campainha e espere ajuda antes de levantar.</li>
                <li>Use calçado firme e antiderrapante, quando possível.</li>
                <li>Mantenha a campainha e os objetos necessários ao alcance; não tente alcançar algo se isso exigir se esticar ou subir.</li>
                <li>Avise se já caiu, sente tontura ou tem dificuldade para caminhar.</li>
              </ul>
            </Card>

            <Card icon={<BedDouble className="w-6 h-6" />} step="Cuidado 10" title="Ajude a proteger sua pele">
              <p className="text-sm text-slate-700 leading-relaxed">Ficar muito tempo na mesma posição pode favorecer lesões por pressão, especialmente quando há dificuldade para se movimentar. Converse com a equipe sobre mudanças de posição e cuidados adequados à sua condição.</p>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>Avise se sentir dor, ardor ou notar vermelhidão persistente, bolhas ou feridas.</li>
                <li>Mantenha a pele limpa e seca; peça ajuda se houver suor, urina ou fezes em contato com a pele.</li>
                <li>Não massageie áreas avermelhadas nem use cremes ou dispositivos por conta própria.</li>
              </ul>
            </Card>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
              <strong>Lembre-se:</strong> estas são orientações educativas gerais. As necessidades variam conforme cada pessoa. Em caso de dúvida, siga a orientação da equipe responsável e os protocolos do serviço.
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600">
              <strong>Referência principal para higiene das mãos:</strong> Anvisa, <em>Segurança do Paciente em Serviços de Saúde: Higiene das Mãos</em>, Volume 12 (2026). <a className="font-semibold text-teal-700 underline" href="https://www.gov.br/anvisa/pt-br/centraisdeconteudo/publicacoes/servicosdesaude/manuais/seguranadopacientecaderno12higienedasmos.pdf" target="_blank" rel="noreferrer">Consultar o manual oficial da Anvisa</a>.
            </div>

            <div className="pt-2 text-center print:hidden">
              <button type="button" onClick={() => setActiveTab('desafios')} className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md inline-flex items-center gap-2">
                Praticar nos desafios interativos <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'desafios' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto">
            {!allFinished ? (
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-2 border-b border-slate-100">
                  <span className="font-semibold text-teal-700">Situação {currentChallengeIndex + 1} de {PATIENT_CHALLENGES.length}</span>
                  <span>Respondidas: {completedChallenges.length}</span>
                </div>
                <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200/80 mb-5">
                  <span className="text-xs font-bold text-teal-800 uppercase tracking-wide block mb-1">Situação do dia a dia</span>
                  <p className="text-sm sm:text-base font-semibold text-teal-950 leading-relaxed">{challenge.situation}</p>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">{challenge.question}</h2>
                <div className="space-y-3 mb-6">
                  {challenge.options.map(option => {
                    const isSelected = selectedOptionId === option.id;
                    return (
                      <button key={option.id} type="button" onClick={() => handleSelectOption(option.id)} disabled={submitted} className={'w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 ' + (!submitted ? 'bg-white hover:bg-teal-50/50 hover:border-teal-300 border-slate-200' : isSelected ? (option.isCorrect ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950') : (option.isCorrect ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'))}>
                        <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-slate-100 text-slate-700">{option.id.toUpperCase()}</span>
                        <span className="text-sm font-medium leading-snug">{option.text}</span>
                      </button>
                    );
                  })}
                </div>
                {submitted && selectedOption && (
                  <div className="space-y-4" aria-live="polite">
                    <div className={'p-4 rounded-2xl border ' + (selectedOption.isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-amber-50 border-amber-200 text-amber-950')}>
                      <div className="font-bold text-sm mb-1 flex items-center gap-1.5">
                        {selectedOption.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <HelpCircle className="w-4 h-4 text-amber-600" />}
                        {selectedOption.isCorrect ? 'Isso mesmo! Boa escolha.' : 'Tudo bem: aprender também faz parte.'}
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed">{selectedOption.explanation}</p>
                    </div>
                    <button type="button" onClick={handleNextChallenge} className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm flex items-center justify-center gap-2">
                      {currentChallengeIndex < PATIENT_CHALLENGES.length - 1 ? <>Próxima situação <ArrowRight className="w-4 h-4" /></> : <>Concluir desafios <CheckCircle2 className="w-4 h-4" /></>}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto"><CheckCircle2 className="w-8 h-8" /></div>
                <h2 className="text-2xl font-bold text-slate-900">Você também faz parte desse cuidado!</h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto">Você concluiu as situações educativas. Continue perguntando, observando, comunicando mudanças e pedindo ajuda quando precisar. A segurança é um compromisso compartilhado.</p>
                <div className="flex items-center justify-center gap-3 pt-3 flex-wrap">
                  <button type="button" onClick={handleRestartChallenges} className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 flex items-center gap-1.5"><RotateCcw className="w-4 h-4" /> Refazer</button>
                  <button type="button" onClick={() => setActiveTab('bolso')} className="px-4 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-500">Ver cartão de bolso</button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'bolso' && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-700 shadow-md max-w-xl mx-auto space-y-4 print:shadow-none print:border-2 print:rounded-none print:max-w-none">
            <div className="text-center border-b border-slate-200 pb-3">
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block">Guia rápido · PREVIRAS</span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">Sua segurança também importa</h2>
              <p className="text-xs text-slate-600 mt-1">Perguntar, observar, comunicar e pedir ajuda também são formas de cuidar.</p>
            </div>
            <ol className="space-y-3 text-xs sm:text-sm text-slate-800">
              {[
                ['Higienize as mãos', 'Antes de comer, após usar o banheiro e quando estiverem sujas. Use preparação alcoólica quando indicada e as mãos não estiverem visivelmente sujas.'],
                ['Pergunte sem receio', 'Peça gentilmente que a equipe explique os cuidados e higienize as mãos antes do procedimento.'],
                ['Não ajuste dispositivos', 'Não mexa em soros, cateteres, sondas ou aparelhos. Se apitar ou soltar, chame a equipe.'],
                ['Confira sua identificação', 'Participe da conferência do seu nome e dos identificadores antes de medicamentos, exames e procedimentos.'],
                ['Informe alergias e medicamentos', 'Conte o que usa e comunique reações ou dúvidas antes de tomar algo.'],
                ['Peça ajuda para se levantar', 'Se estiver tonto, fraco ou sonolento, use a campainha e aguarde ajuda.'],
                ['Avise sobre mudanças', 'Comunique febre, dor, vermelhidão, secreção, curativo solto ou qualquer piora.']
              ].map((rule, index) => <li key={rule[0]} className="flex items-start gap-2.5 break-inside-avoid"><span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">{index + 1}</span><span><strong>{rule[0]}:</strong> {rule[1]}</span></li>)}
            </ol>
            <div className="rounded-xl bg-teal-50 border border-teal-100 p-3 text-xs text-teal-950"><strong>Para acompanhantes:</strong> higienize as mãos, não visite se estiver doente e siga as orientações de máscara e precauções do serviço.</div>
            <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500"><em>“Prevenir também é cuidar.”</em><br />Material educativo do projeto PREVIRAS · Não substitui a orientação da equipe de saúde.</div>
            <div className="text-center print:hidden">
              <button type="button" onClick={() => window.print()} className="px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-sm font-bold inline-flex items-center gap-2"><Printer className="w-4 h-4" /> Imprimir ou salvar em PDF</button>
              <p className="text-xs text-slate-500 mt-2">Na janela de impressão, escolha “Salvar como PDF” para guardar no celular ou computador.</p>
            </div>
          </section>
        )}

        <footer className="text-center text-xs text-slate-500 pt-2 print:hidden">
          <p>PREVIRAS · Prevenir também é cuidar.</p>
          <p className="mt-1">Em caso de dúvida ou urgência, chame a equipe do serviço de saúde.</p>
        </footer>
      </main>
    </div>
  );
};
