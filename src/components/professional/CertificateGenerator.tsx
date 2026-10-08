import React, { useState } from 'react';
import { Award, Printer, ShieldCheck, Download, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

interface CertificateGeneratorProps {
  completedMissionsCount?: number;
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  completedMissionsCount = 6
}) => {
  const [userName, setUserName] = useState('');
  const [submittedName, setSubmittedName] = useState('Participante da Área da Saúde');
  const [isGenerated, setIsGenerated] = useState(false);

  // Formatted date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const certificateCode = `PREVIRAS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setSubmittedName(userName.trim());
    } else {
      setSubmittedName('Participante da Área da Saúde');
    }
    setIsGenerated(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Intro & Optional Name Input (hidden during print) */}
      <div className="no-print bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
              Conclusão da Jornada Educativa
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Certificado de Participação Local
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Gere seu comprovante de participação na atividade educativa PREVIRAS. O nome informado é processado apenas localmente no seu navegador e não é enviado para nenhum servidor.
            </p>
          </div>
        </div>

        {/* Name input form */}
        <form onSubmit={handleGenerate} className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="participantName" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Nome para o Certificado (Opcional)
            </label>
            <input
              id="participantName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Digite seu nome (ex: Maria da Silva)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50 focus:bg-white transition-all"
            />
          </div>

          <div className="self-end w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
            >
              Atualizar Certificado
            </button>
          </div>
        </form>

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Privacidade Total: Sem cadastro, sem login e sem armazenamento em servidor.</span>
        </div>
      </div>

      {/* Print Action Button */}
      <div className="no-print flex justify-end">
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Imprimir / Salvar em PDF
        </button>
      </div>

      {/* CERTIFICATE DOCUMENT (A4 printable canvas) */}
      <div className="certificate-container bg-white rounded-3xl p-8 sm:p-12 border-4 border-teal-800/80 shadow-xl max-w-4xl mx-auto relative overflow-hidden select-none text-slate-900">
        {/* Subtle Ornamental Corner Accents */}
        <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-teal-700 pointer-events-none" />
        <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-teal-700 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-teal-700 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-teal-700 pointer-events-none" />

        {/* Certificate Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold tracking-widest uppercase">
            Projeto PREVIRAS · Enfermagem
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight font-display">
            Certificado de participação em atividade educativa
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Prevenção de Infecções Relacionadas à Assistência à Saúde (IRAS) & Segurança do Paciente
          </p>
        </div>

        {/* Recipient Details */}
        <div className="text-center space-y-4 my-8">
          <p className="text-sm text-slate-600 italic">
            Certificamos que
          </p>

          <div className="text-2xl sm:text-3xl font-bold text-teal-900 tracking-wide border-b-2 border-teal-700/30 pb-2 max-w-lg mx-auto">
            {submittedName}
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl mx-auto">
            participou com êxito da jornada educativa interativa <strong>PREVIRAS</strong>, completando os módulos técnicos sobre:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium max-w-xl mx-auto text-left py-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
              <span>Higiene das Mãos (Técnica dos 7 passos)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
              <span>Os 5 Momentos da OMS / Anvisa</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
              <span>Uso Técnico e Racional de Luvas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
              <span>Contaminação Cruzada & Superfícies</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
              <span>Cadeia de Transmissão de Microrganismos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
              <span>Situações de Risco & Política Adorno Zero</span>
            </div>
          </div>
        </div>

        {/* Central Messages */}
        <div className="my-8 p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 text-center max-w-xl mx-auto">
          <p className="text-base font-serif font-bold text-teal-950 font-display">
            "Prevenir também é cuidar."
          </p>
          <p className="text-xs font-semibold text-teal-800 mt-0.5">
            "Uma atitude pode interromper uma cadeia de transmissão."
          </p>
        </div>

        {/* Footer Signatures, Date & Mandatory Disclaimer */}
        <div className="pt-8 border-t border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
            <div className="text-center sm:text-left">
              <span className="block font-bold text-slate-900">Emissão Educativa:</span>
              <span>{formattedDate}</span>
            </div>

            <div className="text-center">
              <div className="w-40 border-b border-slate-400 mx-auto mb-1" />
              <span className="font-semibold text-slate-800 block">Projeto PREVIRAS</span>
              <span className="text-[11px] text-slate-500">Estudantes do Técnico de Enfermagem</span>
            </div>

            <div className="text-center sm:text-right font-mono text-[11px] text-slate-500">
              <span className="block font-bold text-slate-700">Autenticação Local:</span>
              <span>{certificateCode}</span>
            </div>
          </div>

          {/* MANDATORY LEGAL DISCLAIMER */}
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-center">
            <p className="text-xs font-bold text-slate-800 tracking-tight">
              Este certificado não substitui capacitação institucional obrigatória ou certificação profissional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
