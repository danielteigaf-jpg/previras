import React from 'react';

interface FirstScreenProps {
  onSelectRole: (role: 'professional' | 'patient') => void;
}

export const FirstScreen: React.FC<FirstScreenProps> = ({ onSelectRole }) => {
  return (
    <main
      className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-6 sm:p-10 select-none"
      role="main"
      aria-label="Seleção de perfil de acesso"
    >
      <div className="w-full max-w-md flex flex-col gap-6 sm:gap-8">
        <button
          type="button"
          onClick={() => onSelectRole('professional')}
          className="w-full min-h-[120px] sm:min-h-[140px] px-8 py-6 rounded-2xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-bold text-xl sm:text-2xl tracking-wide shadow-2xl shadow-teal-950/60 transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer flex items-center justify-center text-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-300"
          aria-label="Entrar como Profissional de Saúde"
        >
          SOU PROFISSIONAL
        </button>

        <button
          type="button"
          onClick={() => onSelectRole('patient')}
          className="w-full min-h-[120px] sm:min-h-[140px] px-8 py-6 rounded-2xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xl sm:text-2xl tracking-wide shadow-2xl shadow-blue-950/60 transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer flex items-center justify-center text-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          aria-label="Entrar como Paciente ou Acompanhante"
        >
          SOU PACIENTE/ACOMPANHANTE
        </button>
      </div>
    </main>
  );
};
