import React, { useState } from 'react';
import { RISK_HOTSPOTS } from '../../data/officialContent';
import { RiskHotspot } from '../../types/previras';
import { AlertCircle, CheckCircle2, RotateCcw, ShieldCheck, Eye, Sparkles } from 'lucide-react';

interface FindTheRiskSceneProps {
  onComplete?: () => void;
  isCompleted?: boolean;
}

export const FindTheRiskScene: React.FC<FindTheRiskSceneProps> = ({ onComplete, isCompleted }) => {
  const [foundHotspotIds, setFoundHotspotIds] = useState<Set<string>>(new Set());
  const [activeHotspot, setActiveHotspot] = useState<RiskHotspot | null>(null);

  const handleHotspotClick = (hotspot: RiskHotspot) => {
    setActiveHotspot(hotspot);
    setFoundHotspotIds(prev => {
      const next = new Set(prev);
      next.add(hotspot.id);
      if (next.size === RISK_HOTSPOTS.length && onComplete) {
        onComplete();
      }
      return next;
    });
  };

  const handleReset = () => {
    setFoundHotspotIds(new Set());
    setActiveHotspot(null);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase mb-1">
              Módulo Especial · Observação Ativa de Biossegurança
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Encontre o Risco: Cenário Clínico
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Existem 6 comportamentos ou elementos de risco ocultos neste quarto hospitalar. Toque nos pontos pulsantes no cenário para identificar cada não conformidade e sua correção técnica.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="px-3.5 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold">
              Encontrados: {foundHotspotIds.size} de {RISK_HOTSPOTS.length}
            </div>
            {foundHotspotIds.size > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Reiniciar busca"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Room Scene + Risk Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Scene Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-lg relative overflow-hidden select-none">
          {/* Header Scene Label */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
            <span className="font-semibold text-teal-400 flex items-center gap-1.5">
              <Eye className="w-4 h-4" /> Enfermaria de Cuidados
            </span>
            <span className="text-[11px] text-slate-400">Clique nos marcadores pulsantes</span>
          </div>

          {/* SVG Hospital Bedside Illustration */}
          <div className="relative w-full aspect-[16/10] bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800">
            <svg
              viewBox="0 0 800 500"
              className="w-full h-full object-cover"
              role="img"
              aria-label="Cenário de quarto hospitalar com riscos de transmissão"
            >
              {/* Wall & Floor Background */}
              <rect x="0" y="0" width="800" height="340" fill="#0f172a" />
              <rect x="0" y="340" width="800" height="160" fill="#1e293b" />
              <line x1="0" y1="340" x2="800" y2="340" stroke="#334155" strokeWidth="3" />

              {/* Wall Hospital Headboard / Medical Gas Panel */}
              <rect x="180" y="100" width="440" height="40" rx="6" fill="#334155" />
              <circle cx="230" cy="120" r="8" fill="#10b981" /> {/* Oxygen */}
              <circle cx="270" cy="120" r="8" fill="#eab308" /> {/* Air */}
              <circle cx="310" cy="120" r="8" fill="#64748b" /> {/* Vacuum */}

              {/* Hospital Bed */}
              <rect x="360" y="240" width="300" height="120" rx="14" fill="#1e293b" stroke="#475569" strokeWidth="3" />
              {/* Mattress */}
              <rect x="380" y="220" width="260" height="40" rx="8" fill="#38bdf8" fillOpacity="0.4" stroke="#0284c7" strokeWidth="2" />
              {/* Pillow */}
              <ellipse cx="610" cy="235" rx="25" ry="15" fill="#f8fafc" />
              {/* Bed Rail (Grade do leito) */}
              <line x1="400" y1="210" x2="570" y2="210" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
              <line x1="420" y1="210" x2="420" y2="240" stroke="#94a3b8" strokeWidth="3" />
              <line x1="480" y1="210" x2="480" y2="240" stroke="#94a3b8" strokeWidth="3" />
              <line x1="550" y1="210" x2="550" y2="240" stroke="#94a3b8" strokeWidth="3" />

              {/* IV Pole & Infusion Line (Suporte de Soro) */}
              <line x1="144" y1="80" x2="144" y2="400" stroke="#64748b" strokeWidth="5" />
              <line x1="110" y1="90" x2="178" y2="90" stroke="#64748b" strokeWidth="4" />
              <path d="M 110 90 Q 110 110 120 110" fill="none" stroke="#64748b" strokeWidth="3" />
              <path d="M 178 90 Q 178 110 168 110" fill="none" stroke="#64748b" strokeWidth="3" />
              {/* IV Bag */}
              <rect x="156" y="105" width="24" height="42" rx="4" fill="#e2e8f0" fillOpacity="0.7" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Lab Coat hanging incorrectly on IV pole! (Hazard 1) */}
              <path
                d="M 125 140 C 130 130, 160 130, 165 140 L 175 220 C 160 230, 130 230, 115 220 Z"
                fill="#f1f5f9"
                stroke="#cbd5e1"
                strokeWidth="2"
              />

              {/* Bedside Table / Mesa de cabeceira */}
              <rect x="550" y="270" width="160" height="110" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2.5" />
              {/* Soiled gloves left on table! (Hazard 2) */}
              <path
                d="M 570 270 Q 585 255 595 270 Q 600 280 580 285 Z"
                fill="#3b82f6"
                fillOpacity="0.7"
                stroke="#60a5fa"
                strokeWidth="2"
              />
              <path
                d="M 590 272 Q 605 258 615 272 Q 620 282 600 287 Z"
                fill="#3b82f6"
                fillOpacity="0.7"
                stroke="#60a5fa"
                strokeWidth="2"
              />

              {/* Medication Prep Tray on Mayo Table */}
              <rect x="220" y="300" width="100" height="40" rx="4" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
              {/* Phone lying directly on medication tray! (Hazard 3) */}
              <rect x="250" y="308" width="36" height="22" rx="3" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />

              {/* Healthcare Professional Avatar (Stylized) */}
              {/* Body */}
              <path d="M 320 210 Q 340 180 360 210 L 375 330 L 305 330 Z" fill="#0d9488" stroke="#14b8a6" strokeWidth="2" />
              {/* Head */}
              <circle cx="340" cy="150" r="24" fill="#fdba74" />
              {/* Hair/Cap */}
              <path d="M 318 145 C 318 125, 362 125, 362 145 Z" fill="#0f766e" />
              {/* Stethoscope around neck without cleaning (Hazard 4) */}
              <path d="M 330 168 Q 340 195 350 168" fill="none" stroke="#f59e0b" strokeWidth="4" />
              {/* Arm with wrist watch and rings (Hazard 5) */}
              <line x1="320" y1="210" x2="280" y2="250" stroke="#fdba74" strokeWidth="12" strokeLinecap="round" />
              <circle cx="280" cy="250" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="2" /> {/* Ring/Watch */}

              {/* Wall Alcohol Dispenser (Hazard 6: Blocked or empty) */}
              <rect x="700" y="150" width="40" height="70" rx="6" fill="#334155" stroke="#64748b" strokeWidth="2" />
              <rect x="712" y="200" width="16" height="10" rx="2" fill="#ef4444" /> {/* Empty red tag */}
              <line x1="680" y1="230" x2="740" y2="180" stroke="#ef4444" strokeWidth="3" /> {/* Blocked cross */}
            </svg>

            {/* Hotspot Markers placed precisely over hazards */}
            {RISK_HOTSPOTS.map((hotspot) => {
              const isFound = foundHotspotIds.has(hotspot.id);
              const isSelected = activeHotspot?.id === hotspot.id;

              return (
                <button
                  key={hotspot.id}
                  type="button"
                  onClick={() => handleHotspotClick(hotspot)}
                  style={{
                    left: `${hotspot.xPercent}%`,
                    top: `${hotspot.yPercent}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 ${
                    isFound
                      ? 'bg-emerald-500/90 text-white shadow-lg ring-2 ring-emerald-300'
                      : 'bg-rose-500/90 text-white animate-pulse shadow-xl ring-4 ring-rose-400/40'
                  } ${isSelected ? 'scale-125 ring-teal-400' : 'hover:scale-115'}`}
                  aria-label={`Risco: ${hotspot.title}`}
                >
                  {isFound ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-white" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              Marcador Vermelho = Ponto de Risco Ativo
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Marcador Verde = Risco Identificado e Corrigido
            </span>
          </div>
        </div>

        {/* Hotspot Inspection Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm min-h-[380px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Inspeção de Biossegurança
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {foundHotspotIds.size} de {RISK_HOTSPOTS.length} localizados
              </span>
            </div>

            {activeHotspot ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {activeHotspot.title}
                  </h3>
                  <div className="mt-1 text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 inline-block">
                    Risco de Contaminação
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="block text-slate-900 mb-1">Por que é perigoso?</strong>
                  {activeHotspot.hazardDescription}
                </div>

                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs sm:text-sm text-teal-950 leading-relaxed">
                  <strong className="block text-teal-900 mb-1">Atitude de Correção:</strong>
                  {activeHotspot.correctionAction}
                </div>

                <div className="text-[11px] text-slate-500 font-semibold pt-1">
                  Base Legal/Técnica: {activeHotspot.normReference}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 space-y-3">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm">
                  Toque em qualquer marcador pulsante no quarto hospitalar ao lado para inspecionar o risco de transmissão.
                </p>
              </div>
            )}
          </div>

          {/* All Found Banner */}
          {foundHotspotIds.size === RISK_HOTSPOTS.length && (
            <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-950">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs sm:text-sm font-semibold">
                Excelente visão clínica! Você identificou e desarmou todos os 6 riscos ambientais de transmissão.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
