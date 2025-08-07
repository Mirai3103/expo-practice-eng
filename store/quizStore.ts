// store/quizStore.ts
import _ from 'lodash';

import { create } from 'zustand';
import { supabase } from '~/utils/supabase';
import { Answer, Question } from '~/types/question';
import { Image } from 'expo-image';
import { QuestionChoice } from '~/types';

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
      const { data: questions, error: err1 } = await supabase.rpc('get_random_parent_questions', {
        part: Number(partId),
        limit_count: Number(questionCount),
      });
      console.log({ partId, questionCount });
      const questionIds = (questions || []).map((q) => q.id);
      const { data: choices, error: err2 } = await supabase
        .from('question_choices')
        .select('*')
        .in('question_id', questionIds);
      const { data: childQuestions, error: err3 } = await supabase
        .from('questions')
        .select('*')
        .in('parent_id', questionIds);
      const childIds = (childQuestions || []).map((cq) => cq.id);

      const { data: childChoices, error: err4 } = childIds.length
        ? await supabase.from('question_choices').select('*').in('question_id', childIds)
        : { data: [], error: null };
      const choicesByQuestion = _.groupBy(choices, 'question_id');
      const childChoicesByQuestion = _.groupBy(childChoices, 'question_id');
      if (err1 || err2 || err3 || err4) {
        throw new Error(err1?.message || err2?.message || err3?.message || err4?.message || 'Failed to fetch questions');
      }
      // 🧩 2. Gộp choices vào từng child question
      const childQuestionsWithChoices = childQuestions!.map((cq) => ({
        ...cq,
        question_choices: childChoicesByQuestion[cq.id] || [],
      }));

      // 🧩 3. Group child_questions theo parent_id
      const childByParent = _.groupBy(childQuestionsWithChoices, 'parent_id');

      // 🧩 4. Gộp hết vào parent questions
      const finalQuestions = questions!.map((q) => ({
        ...q,
        question_choices: choicesByQuestion[q.id] || [],
        child_quests: childByParent[q.id] || [],
      }));
    
      // Prefetch images
      Image.prefetch(finalQuestions.map((q) => q.content_image_url!).filter(Boolean));
      let flatQuestions = _.flatMap(finalQuestions, (q) => q.child_quests);
      finalQuestions.forEach((q) => {
        flatQuestions.push(q as any);
      });

      const flatQuestionsWithAnswers = flatQuestions.map((q) => ({
        questionId: q.id!,
        isDone: false,
        correctAnswer: q.question_choices.find((c) => c.is_correct)?.id,
      }));
      console.log({ flatQuestionsWithAnswers });
      set({
        questions: finalQuestions as Question[],
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
      const currentQuestion = newAnswerSheet.find(
        (q) => q.questionId === state.questions[state.currentQuestionIndex].id
      );
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
    const { answerSheet } = get();
    console.log({ answerSheet });
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
