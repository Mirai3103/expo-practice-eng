// store/quizStore.ts
import _ from 'lodash';

import { create } from 'zustand';
import { supabase } from '~/utils/supabase';
import { Answer, Question } from '~/types/question';
import { Image } from 'expo-image';
import { FullQuestionView, QuestionChoice } from '~/types';
const transformFullViewToQuestions = (rows: FullQuestionView[]): Question[] => {
  // Nhóm theo question_id (cha)
  const groupedByQuestion = _.groupBy(rows, 'question_id');

  const result: any[] = Object.values(groupedByQuestion).map((group) => {
    const first = group[0];

    // Lấy toàn bộ choices duy nhất
    const question_choices = _.uniqBy(
      group
        .filter((r) => r.choice_id !== null)
        .map((r) => ({
          id: r.choice_id!,
          choice_text: r.choice_text!,
          index: r.choice_index,
          is_correct: r.is_correct,
          question_id: r.question_id,
        })),
      'id'
    ) as any;
    // Lấy toàn bộ child questions duy nhất
    const child_quests: Question[] = _(group)
      .filter((r) => r.child_id !== null)
      .uniqBy('child_id')
      .map((r) => ({
        id: r.child_id,
        content_text: r.child_content_text,
        content_image_url: r.child_content_image_url,
        content_audio_url: r.child_content_audio_url,
        difficulty: r.child_difficulty,
        explanation: r.child_explanation,
        is_parent: r.child_is_parent,
        parent_id: r.child_parent_id,
        part_id: r.child_part_id,
        source_id: r.child_source_id,
        tags: r.child_tags || [],
        question_choices: [], // bạn có thể join thêm choices cho child nếu cần
        child_quests: null, // nếu muốn support nhiều tầng
      }))
      .value() as any;

    // Trả về object dạng Question
    return {
      id: first.question_id,
      content_text: first.question_content_text,
      content_image_url: first.question_content_image_url,
      content_audio_url: first.question_content_audio_url,
      difficulty: first.question_difficulty,
      explanation: first.question_explanation,
      is_parent: first.question_is_parent,
      parent_id: first.question_parent_id,
      part_id: first.question_part_id,
      source_id: first.question_source_id,
      tags: first.question_tags || [],
      question_choices,
      child_quests: child_quests.length > 0 ? child_quests : null,
    };
  });

  return result;
};

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
  selectAnswer: (answerId: number) => void;
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
        .limit(Number(questionCount));
      console.log(data?.[0]);
      if (error || !data) {
        throw new Error(error?.message || 'Failed to fetch questions');
      }

      // Prefetch images
      Image.prefetch(data.map((q) => q.content_image_url!).filter(Boolean));

      set({
        questions: data as Question[],
        answerSheet: data.map((q) => ({ questionId: q.id!, isDone: false })),
        isLoading: false,
        startAt: new Date(),
      });
    } catch (error) {
      console.error(error);
      set({ isError: true, isLoading: false });
    }
  },

  // Handle selecting an answer for the current question
  selectAnswer: (answerId) => {
    set((state) => {
      const newAnswerSheet = [...state.answerSheet];
      if (state.currentQuestionIndex < newAnswerSheet.length) {
        newAnswerSheet[state.currentQuestionIndex].answerId = answerId;
      }
      return { answerSheet: newAnswerSheet };
    });
  },

  // Mark the current question as "checked" and show the answer
  markQuestionAsDone: () => {
    set((state) => {
      const newAnswerSheet = [...state.answerSheet];
      if (state.currentQuestionIndex < newAnswerSheet.length) {
        newAnswerSheet[state.currentQuestionIndex].isDone = true;
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
