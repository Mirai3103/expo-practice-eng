// types/index.ts

export interface QuestionChoice {
    id: number;
    question_id: number;
    choice_text: string | null;
    is_correct: boolean;
    index: number;
  }
  
  export interface Question {
    id: number;
    part_id: number;
    content_text: string | null;
    content_image_url: string | null;
    content_audio_url: string | null;
    explanation: string | null;
    question_choices: QuestionChoice[];
  }
  
  export interface Answer {
    questionId: number;
    answerId?: number;
    isDone: boolean;
    correctAnswer?: number;
  }