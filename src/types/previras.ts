/**
 * Types and interfaces for PREVIRAS educational application.
 */

export type UserRole = 'initial' | 'professional' | 'patient';

export type ProfessionalTab =
  | 'overview'
  | 'missao1-higiene'
  | 'missao2-momentos'
  | 'missao3-luvas'
  | 'missao4-contaminacao'
  | 'missao5-risco'
  | 'missao6-desafio'
  | 'extra-encontre-risco'
  | 'extra-cadeia'
  | 'certificado';

export interface HandHygieneStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  recommendation: string;
  durationAlcohol: string;
  durationSoap: string;
  highlightZone: 'palms' | 'dorsum' | 'interdigital' | 'backs_fingers' | 'thumbs' | 'fingertips' | 'wrists';
  officialReference: string;
}

export interface FiveMoment {
  id: number;
  number: string;
  title: string;
  when: string;
  why: string;
  examples: string[];
  zoneType: 'before_patient' | 'aseptic' | 'after_fluids' | 'after_patient' | 'after_surroundings';
}

export interface ClinicalScenario {
  id: number;
  scenario: string;
  context: string;
  requiresHygiene: boolean;
  correctMomentId?: number;
  explanation: string;
  officialRef: string;
}

export interface GloveStatement {
  id: number;
  statement: string;
  isTrue: boolean;
  explanation: string;
  technicalRule: string;
  officialSource: string;
}

export interface SimulationObject {
  id: string;
  name: string;
  category: 'patient' | 'surface' | 'device' | 'personal' | 'sanitizer';
  icon: string;
  description: string;
  cleanActionName: string;
  cleanActionDesc: string;
}

export interface RiskSituation {
  id: number;
  title: string;
  setting: string;
  description: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  regulatoryContext: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  context?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  keyTakeaway: string;
  officialSource: string;
}

export interface RiskHotspot {
  id: string;
  title: string;
  xPercent: number;
  yPercent: number;
  hazardDescription: string;
  correctionAction: string;
  normReference: string;
}

export interface TransmissionChainLink {
  id: string;
  order: number;
  name: string;
  definition: string;
  clinicalExamples: string[];
  interruptionAction: string;
  nursingPractice: string;
}

export interface PatientChallenge {
  id: number;
  situation: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}
