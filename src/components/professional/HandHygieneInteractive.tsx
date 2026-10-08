import React, { useState, useEffect } from 'react';
import { HAND_HYGIENE_STEPS } from '../../data/officialContent';
import { HandHygieneStep } from '../../types/previras';
import { Play, Pause, ChevronRight, ChevronLeft, CheckCircle2, Droplets, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface HandHygieneProps {
  onComplete?: () => void;
  isCompleted?: boolean;
}

export const HandHygieneInteractive: React.FC<HandHygieneProps> = ({ onComplete, isCompleted }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hygieneMode, setHygieneMode] = useState<'alcohol' | 'soap'>('alcohol');
  const [isPlaying, setIsPlaying] = useState(false);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));

  const currentStep: HandHygieneStep = HAND_HYGIENE_STEPS[currentStepIndex];

  // Auto-advance if playing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStepIndex < HAND_HYGIENE_STEPS.length - 1) {
          handleSelectStep(currentStepIndex + 1);
        } else {
          setIsPlaying(false);
        }
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex]);

  const handleSelectStep = (index: number) => {
    setCurrentStepIndex(index);
    setVisitedSteps(prev => {
      const next = new Set(prev);
      next.add(index);
      if (next.size === HAND_HYGIENE_STEPS.length && onComplete) {
        onComplete();
      }
      return next;
    });
  };

  const handleNext = () => {
    if (currentStepIndex < HAND_HYGIENE_STEPS.length - 1) {
      handleSelectStep(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      handleSelectStep(currentStepIndex - 1);
    }
  };

  // Determine active zone
  const activeZone = currentStep.highlightZone;

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
              Missão 1 · Técnica de Fricção Antisséptica
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Passo a Passo da Higiene das Mãos
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Navegue pelas 7 etapas padronizadas pela Anvisa e OMS. Observe o mapa anatômico das mãos iluminando a área exata sob fricção mecânica.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto border border-slate-200/60">
            <button
              type="button"
              onClick={() => setHygieneMode('alcohol')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                hygieneMode === 'alcohol'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Álcool 70% (20-30s)
            </button>
            <button
              type="button"
              onClick={() => setHygieneMode('soap')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                hygieneMode === 'soap'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              Água e Sabão (40-60s)
            </button>
          </div>
        </div>

        {/* Technical Notice */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-start gap-3 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <div>
            {hygieneMode === 'alcohol' ? (
              <span>
                <strong>Padrão de Excelência:</strong> Sem sujidade visível, a fricção com álcool a 70% é mais rápida, tem maior eficácia antimicrobiana imediata e resseca menos a pele que a lavagem repetida.
              </span>
            ) : (
              <span>
                <strong>Obrigatório:</strong> Quando as mãos estiverem visivelmente sujas, com sangue ou fluidos, e na suspeita de patógenos esporulados (ex: <em>C. difficile</em>), a lavagem com água e sabão líquido é indispensável.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage: SVG Hands + Control Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Hand Diagram (Interactive Canvas) */}
        <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-lg border border-slate-800">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Friction Indicator Tag */}
          <div className="w-full flex items-center justify-between text-xs text-slate-300 mb-4 z-10">
            <span className="font-semibold text-teal-400">
              Etapa {currentStep.id} de 7
            </span>
            <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700 font-mono text-[11px]">
              {hygieneMode === 'alcohol' ? currentStep.durationAlcohol : currentStep.durationSoap}
            </span>
          </div>

          {/* Original Vector Illustration of Two Hands with Anatomical Highlight Layers */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/3] flex items-center justify-center py-2">
            <svg
              viewBox="0 0 500 380"
              className="w-full h-full drop-shadow-md transition-all duration-300"
              role="img"
              aria-label={`Ilustração anatômica das mãos destacando: ${currentStep.title}`}
            >
              <defs>
                <linearGradient id="activeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.75" />
                </linearGradient>
                <filter id="neonPulse" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* ===== BASE HANDS (Neutral Skin Outline) ===== */}
              {/* Left Hand Outline */}
              <g className="transition-opacity duration-300">
                {/* Left Palm Base */}
                <path
                  d="M140 230 C 130 190, 140 160, 160 150 C 180 140, 200 160, 210 200 C 210 250, 180 270, 140 270 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2.5"
                />
                {/* Left Thumb */}
                <path
                  d="M135 225 C 110 215, 95 190, 105 170 C 115 155, 130 170, 142 195 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2.5"
                />
                {/* Left Index */}
                <path
                  d="M155 150 C 150 110, 155 80, 165 80 C 175 80, 178 110, 175 150 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2.5"
                />
                {/* Left Middle */}
                <path
                  d="M175 150 C 175 100, 182 65, 192 65 C 202 65, 205 100, 198 155 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2.5"
                />
                {/* Left Ring */}
                <path
                  d="M198 160 C 200 115, 208 80, 218 80 C 228 80, 226 115, 216 168 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2.5"
                />
                {/* Left Little */}
                <path
                  d="M216 175 C 225 135, 232 110, 240 110 C 248 110, 245 135, 230 190 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2.5"
                />
                {/* Left Wrist */}
                <path
                  d="M140 270 C 145 310, 150 330, 155 350 L 195 350 C 190 320, 190 290, 180 270 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2.5"
                />
              </g>

              {/* Right Hand Outline (Mirrored & Interlocking) */}
              <g className="transition-opacity duration-300">
                {/* Right Palm Base */}
                <path
                  d="M360 230 C 370 190, 360 160, 340 150 C 320 140, 300 160, 290 200 C 290 250, 320 270, 360 270 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2.5"
                />
                {/* Right Thumb */}
                <path
                  d="M365 225 C 390 215, 405 190, 395 170 C 385 155, 370 170, 358 195 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2.5"
                />
                {/* Right Index */}
                <path
                  d="M345 150 C 350 110, 345 80, 335 80 C 325 80, 322 110, 325 150 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2.5"
                />
                {/* Right Middle */}
                <path
                  d="M325 150 C 325 100, 318 65, 308 65 C 298 65, 295 100, 302 155 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2.5"
                />
                {/* Right Ring */}
                <path
                  d="M302 160 C 300 115, 292 80, 282 80 C 272 80, 274 115, 284 168 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2.5"
                />
                {/* Right Little */}
                <path
                  d="M284 175 C 275 135, 268 110, 260 110 C 252 110, 255 135, 270 190 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2.5"
                />
                {/* Right Wrist */}
                <path
                  d="M360 270 C 355 310, 350 330, 345 350 L 305 350 C 310 320, 310 290, 320 270 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2.5"
                />
              </g>

              {/* ===== DYNAMIC HIGHLIGHT LAYERS (Interactive Zones) ===== */}

              {/* 1. Palms Highlight */}
              {activeZone === 'palms' && (
                <g filter="url(#neonPulse)">
                  <circle cx="175" cy="205" r="38" fill="url(#activeGlow)" />
                  <circle cx="325" cy="205" r="38" fill="url(#activeGlow)" />
                  {/* Friction Circular Arrows */}
                  <path
                    d="M 160 190 A 25 25 0 1 1 190 220"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    className="animate-spin origin-[175px_205px]"
                  />
                  <path
                    d="M 310 190 A 25 25 0 1 1 340 220"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                    className="animate-spin origin-[325px_205px]"
                  />
                </g>
              )}

              {/* 2. Dorsum Highlight (Palm over opposite dorsum) */}
              {activeZone === 'dorsum' && (
                <g filter="url(#neonPulse)">
                  {/* Left Dorsum */}
                  <path
                    d="M 148 160 C 150 140, 200 140, 205 180 C 205 210, 150 220, 148 160 Z"
                    fill="url(#activeGlow)"
                  />
                  {/* Right Dorsum */}
                  <path
                    d="M 352 160 C 350 140, 300 140, 295 180 C 295 210, 350 220, 352 160 Z"
                    fill="url(#activeGlow)"
                  />
                  {/* Intertwining Friction Lines */}
                  <line x1="150" y1="165" x2="200" y2="185" stroke="#ffffff" strokeWidth="3" strokeDasharray="3 3" />
                  <line x1="350" y1="165" x2="300" y2="185" stroke="#ffffff" strokeWidth="3" strokeDasharray="3 3" />
                </g>
              )}

              {/* 3. Interdigital (Between Fingers) Highlight */}
              {activeZone === 'interdigital' && (
                <g filter="url(#neonPulse)">
                  {/* Left Hand Interdigital Webbing */}
                  <path d="M 168 140 L 180 90 L 188 140 Z" fill="url(#activeGlow)" />
                  <path d="M 190 145 L 202 85 L 210 150 Z" fill="url(#activeGlow)" />
                  <path d="M 212 155 L 222 105 L 228 165 Z" fill="url(#activeGlow)" />
                  {/* Right Hand Interdigital Webbing */}
                  <path d="M 332 140 L 320 90 L 312 140 Z" fill="url(#activeGlow)" />
                  <path d="M 310 145 L 298 85 L 290 150 Z" fill="url(#activeGlow)" />
                  <path d="M 288 155 L 278 105 L 272 165 Z" fill="url(#activeGlow)" />
                </g>
              )}

              {/* 4. Backs of fingers Highlight */}
              {activeZone === 'backs_fingers' && (
                <g filter="url(#neonPulse)">
                  {/* Left Knuckles */}
                  <rect x="155" y="115" width="65" height="30" rx="8" fill="url(#activeGlow)" />
                  {/* Right Knuckles */}
                  <rect x="280" y="115" width="65" height="30" rx="8" fill="url(#activeGlow)" />
                  <line x1="160" y1="130" x2="215" y2="130" stroke="#ffffff" strokeWidth="3" strokeDasharray="2 3" />
                  <line x1="285" y1="130" x2="340" y2="130" stroke="#ffffff" strokeWidth="3" strokeDasharray="2 3" />
                </g>
              )}

              {/* 5. Thumbs Highlight */}
              {activeZone === 'thumbs' && (
                <g filter="url(#neonPulse)">
                  {/* Left Thumb */}
                  <path
                    d="M135 225 C 110 215, 95 190, 105 170 C 115 155, 130 170, 142 195 Z"
                    fill="url(#activeGlow)"
                  />
                  {/* Right Thumb */}
                  <path
                    d="M365 225 C 390 215, 405 190, 395 170 C 385 155, 370 170, 358 195 Z"
                    fill="url(#activeGlow)"
                  />
                  {/* Rotational Wave Around Left Thumb */}
                  <ellipse cx="120" cy="190" rx="22" ry="14" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="4 4" />
                  {/* Rotational Wave Around Right Thumb */}
                  <ellipse cx="380" cy="190" rx="22" ry="14" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="4 4" />
                </g>
              )}

              {/* 6. Fingertips and Nails Highlight */}
              {activeZone === 'fingertips' && (
                <g filter="url(#neonPulse)">
                  {/* Left Fingertips */}
                  <ellipse cx="165" cy="85" rx="10" ry="12" fill="url(#activeGlow)" />
                  <ellipse cx="192" cy="70" rx="10" ry="13" fill="url(#activeGlow)" />
                  <ellipse cx="218" cy="85" rx="10" ry="12" fill="url(#activeGlow)" />
                  <ellipse cx="240" cy="115" rx="9" ry="11" fill="url(#activeGlow)" />
                  <ellipse cx="105" cy="170" rx="10" ry="10" fill="url(#activeGlow)" />

                  {/* Right Fingertips */}
                  <ellipse cx="335" cy="85" rx="10" ry="12" fill="url(#activeGlow)" />
                  <ellipse cx="308" cy="70" rx="10" ry="13" fill="url(#activeGlow)" />
                  <ellipse cx="282" cy="85" rx="10" ry="12" fill="url(#activeGlow)" />
                  <ellipse cx="260" cy="115" rx="9" ry="11" fill="url(#activeGlow)" />
                  <ellipse cx="395" cy="170" rx="10" ry="10" fill="url(#activeGlow)" />

                  {/* Circular Rubbing Indicator on Palm Center */}
                  <circle cx="250" cy="210" r="18" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="3 3" />
                </g>
              )}

              {/* 7. Wrists Highlight */}
              {activeZone === 'wrists' && (
                <g filter="url(#neonPulse)">
                  {/* Left Wrist */}
                  <rect x="145" y="275" width="45" height="55" rx="10" fill="url(#activeGlow)" />
                  {/* Right Wrist */}
                  <rect x="310" y="275" width="45" height="55" rx="10" fill="url(#activeGlow)" />
                  {/* Rotational arrows */}
                  <ellipse cx="168" cy="300" rx="26" ry="12" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="3 3" />
                  <ellipse cx="332" cy="300" rx="26" ry="12" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="3 3" />
                </g>
              )}
            </svg>
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-3 mt-4 z-10">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-semibold border border-teal-500/30 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> Pausar Reprodução
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> Reproduzir Passo a Passo
                </>
              )}
            </button>
          </div>
        </div>

        {/* Step Explanation & Navigation Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between min-h-[440px]">
          <div>
            {/* Step badge & Title */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Região Ativa: {currentStep.highlightZone}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{hygieneMode === 'alcohol' ? currentStep.durationAlcohol : currentStep.durationSoap}</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
              {currentStep.title}
            </h3>
            <p className="text-sm font-medium text-teal-800 mb-4">
              {currentStep.subtitle}
            </p>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">
                  Como Executar
                </h4>
                <p>{currentStep.description}</p>
              </div>

              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100">
                <h4 className="text-xs font-bold text-teal-950 uppercase tracking-wide mb-1">
                  Justificativa Clínica
                </h4>
                <p className="text-teal-950">{currentStep.recommendation}</p>
              </div>
            </div>
          </div>

          {/* Footer Controls & Progress Steps */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            {/* Step indicator buttons */}
            <div className="grid grid-cols-7 gap-1.5 mb-4">
              {HAND_HYGIENE_STEPS.map((step, idx) => {
                const isSelected = idx === currentStepIndex;
                const isVisited = visitedSteps.has(idx);
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleSelectStep(idx)}
                    title={step.title}
                    className={`h-10 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-600/30'
                        : isVisited
                        ? 'bg-teal-100 text-teal-800 hover:bg-teal-200'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {step.id}
                  </button>
                );
              })}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>

              <div className="text-xs text-slate-500 font-medium">
                Passo {currentStepIndex + 1} de {HAND_HYGIENE_STEPS.length}
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentStepIndex === HAND_HYGIENE_STEPS.length - 1}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
              >
                Próximo
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Indicator */}
      {visitedSteps.size === HAND_HYGIENE_STEPS.length && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-900">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-sm font-semibold">
            Você completou todas as 7 etapas da técnica de higiene das mãos! A fricção adequada de cada área garante a redução da carga microbiana transitória.
          </div>
        </div>
      )}
    </div>
  );
};
