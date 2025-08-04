// store/quizStore.ts
import _ from 'lodash';

import { create } from 'zustand';
import { supabase } from '~/utils/supabase';
import { Answer, Question } from '~/types/question';
import { Image } from 'expo-image';
import {  QuestionChoice } from '~/types';


interface QuizState {
  questions: Question[];
  answerSheet: Answer[];
  currentQuestionIndex: number;
  showResults: boolean;
  isLoading: boolean;
  isError: boolean;
  startAt: Date;

  // Actions
  fetchQuestions: (partId: string, questionCount: string) => Promise<void>;
  selectAnswer: (questionId: number, answerId: number) => void;
  markQuestionAsDone: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  // Initial State
  questions: [],
  answerSheet: [],
  currentQuestionIndex: 0,
  startAt: new Date(),
  showResults: false,
  isLoading: true,
  isError: false,

  // --- ACTIONS ---

  // Fetch data from Supabase and initialize the quiz
  fetchQuestions: async (partId, questionCount) => {
    try {
      set({ isLoading: true, isError: false });
      const { data, error } = await supabase
        .from('random_questions_view')
        .select('*,question_choices(*), child_quests:questions(*,question_choices(*))')
        .eq('part_id', Number(partId))
        .limit(Number(questionCount));
      if (error || !data) {
        throw new Error(error?.message || 'Failed to fetch questions');
      }

      // Prefetch images
      Image.prefetch(data.map((q) => q.content_image_url!).filter(Boolean));
     let flatQuestions = _.flatMap(data, (q) => q.child_quests);
     data.forEach((q) => {
      flatQuestions.push(q as any);
     });

     const flatQuestionsWithAnswers = flatQuestions.map((q) => ({ questionId: q.id!, isDone: false, correctAnswer: q.question_choices.find((c) => c.is_correct)?.id }));
     console.log({flatQuestionsWithAnswers})
      set({
        questions: data as Question[],
        answerSheet: flatQuestionsWithAnswers,
        isLoading: false,
        startAt: new Date(),
      });
    } catch (error) {
      console.error(error);
      set({ isError: true, isLoading: false });
    }
  },

  // Handle selecting an answer for the current question
  selectAnswer: (questionId, answerId) => {
    set((state) => {
      const newAnswerSheet = [...state.answerSheet];
      const currentQuestion = newAnswerSheet.find((q) => q.questionId === questionId);
      if (currentQuestion) {
        currentQuestion.answerId = answerId;
      }
      return { answerSheet: newAnswerSheet };
    });
  },

  // Mark the current question as "checked" and show the answer
  markQuestionAsDone: () => {
    set((state) => {
      const newAnswerSheet = [...state.answerSheet];
      const currentQuestion = newAnswerSheet.find((q) => q.questionId === state.questions[state.currentQuestionIndex].id);
      if (currentQuestion) {
        currentQuestion.isDone = true;
      }
      return { answerSheet: newAnswerSheet };
    });
  },

  // Navigate to the next question
  nextQuestion: () => {
    set((state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        return { currentQuestionIndex: state.currentQuestionIndex + 1 };
      }
      return {};
    });
  },

  // Navigate to the previous question
  previousQuestion: () => {
    set((state) => {
      if (state.currentQuestionIndex > 0) {
        return { currentQuestionIndex: state.currentQuestionIndex - 1 };
      }
      return {};
    });
  },

  // Stop the timer and show the results screen
  submitQuiz: () => {
    set({ showResults: true });
  },

  // Reset the state for a new quiz attempt
  resetQuiz: () => {
    set({
      questions: [],
      answerSheet: [],
      currentQuestionIndex: 0,
      showResults: false,
      isLoading: true,
      isError: false,
    });
  },
}));
