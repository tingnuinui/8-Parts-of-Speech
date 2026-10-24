export type PartOfSpeechId =
  | 'noun'
  | 'pronoun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'interjection';

export interface VocabItem {
  word: string;
  pron: string;
  meaning: string;
  icon: string;
}

export interface SentenceItem {
  en: string;
  clean: string;
  th: string;
}

export interface PartOfSpeech {
  id: PartOfSpeechId;
  nameEn: string;
  nameTh: string;
  shortTh: string;
  emoji: string;
  color: string;
  bgLight: string;
  borderLight: string;
  textMain: string;
  badgeBg: string;
  definition: string;
  trick: string;
  subtypes: string[];
  vocab: VocabItem[];
  sentences: SentenceItem[];
}

export interface GameWord {
  word: string;
  meaning: string;
  emoji: string;
  pos: PartOfSpeechId;
  hint: string;
}

export interface QuizQuestion {
  sentence: string;
  cleanSentence: string;
  thai: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserQuizAnswer {
  questionIndex: number;
  selected: number;
  isCorrect: boolean;
}

export type AppTab = 'learn' | 'game' | 'quiz';
