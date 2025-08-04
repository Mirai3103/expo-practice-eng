import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { LinearGradient } from 'expo-linear-gradient';
import {  useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Clock,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Trophy,
  RotateCcw,
} from 'lucide-react-native';

import Part1Card from '~/components/question-card/Part1';
import { useQuizStore } from '~/store/quizStore';
import { Question } from '~/types';
import { Part2Card } from '~/components/question-card';
import Part3Card from '~/components/question-card/Part3';
import { Part4Card } from '~/components/question-card/Past4';

export default function PracticeScreen() {
  const {
    type,
    id,
    questionCount = '5',
  } = useLocalSearchParams<{ type: string; id: string; questionCount?: string }>();
const router = useRouter()
  // Get all state and actions from the Zustand store
  const {
    questions,
    answerSheet,
    currentQuestionIndex,
    showResults,
    isLoading,
    fetchQuestions,
    selectAnswer,
    markQuestionAsDone,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    resetQuiz,
  } = useQuizStore();

  // Fetch questions when the component mounts or params change
  useEffect(() => {
    if (id && questionCount) {
      fetchQuestions(id, questionCount);
    }
    // Reset the quiz state when the component unmounts
    return () => {
      resetQuiz();
    };
  }, [id, questionCount, fetchQuestions, resetQuiz]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer =React.useMemo(()=> answerSheet.find((a) => a.questionId == currentQuestion.id),[answerSheet,currentQuestion])
  // Memoize derived data to avoid unnecessary recalculations
  const progress = React.useMemo(()=>{
    const answeredCount = answerSheet.filter((a) => a.correctAnswer != undefined && a.answerId != undefined).length   
    const totalCount = answerSheet.filter((a) => a.correctAnswer != undefined).length    
    return answeredCount /totalCount * 100
  },[answerSheet])
  const { score, answeredCount,totalCount } = useMemo(() => {
    const answeredCount = answerSheet.filter((a) => a.answerId != undefined && a.correctAnswer != undefined).length;
    const totalCount = answerSheet.length;
    const correctCount = answerSheet.filter((a) => a.correctAnswer == a.answerId && a.correctAnswer != undefined).length;
    return {
      answeredCount,
      totalCount,
      score: {
        correct: correctCount,
        total: answeredCount,
        percentage: answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0,
      }
    };
  }, [answerSheet]);

 

  const handleSubmitConfirmation = () => {
    submitQuiz()
  };
  console.log(showResults);

  // --- RENDER LOGIC ---

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (showResults) {
    return (
      <View className="flex-1 bg-slate-50">
        <View className="overflow-hidden rounded-b-3xl shadow-lg">
          <LinearGradient
            colors={type === 'listening' ? ['#3b82f6', '#8b5cf6'] : ['#34d399', '#10b981']}
            className="pb-8 pt-12">
            <View className="items-center px-6">
              <View className="mb-4 h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white">
                <Trophy size={40} color="#3b82f6" />
              </View>
              <Text className="text-2xl font-bold text-white">Kết quả bài kiểm tra</Text>
              <Text className="mt-1 text-base text-white/80">Chúc mừng bạn đã hoàn thành!</Text>
            </View>
          </LinearGradient>
        </View>

        <ScrollView className="flex-1 p-6">
          <View className="mb-6 overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-lg">
            <View className="mb-6 items-center">
              <Text className="mb-2 text-4xl font-bold text-slate-800">{score.percentage}%</Text>
              <Text className="text-lg text-slate-600">
                {score.correct}/{score.total} câu đúng
              </Text>
            </View>
            <View className="mb-4 h-4 overflow-hidden rounded-full bg-slate-100">
              <LinearGradient
                colors={
                  score.percentage >= 80
                    ? ['#10b981', '#059669']
                    : score.percentage >= 60
                      ? ['#f59e0b', '#d97706']
                      : ['#ef4444', '#dc2626']
                }
                style={{ width: `${score.percentage}%`, height: '100%' }}
              />
            </View>
            <View className="flex-row justify-around rounded-2xl bg-slate-50 p-4">
              <View className="items-center">
                <Text className="text-2xl font-bold text-green-600">{score.correct}</Text>
                <Text className="text-sm text-slate-600">Đúng</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-red-600">
                  {score.total - score.correct}
                </Text>
                <Text className="text-sm text-slate-600">Sai</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => router.back()} className="rounded-2xl shadow-lg">
            <LinearGradient
              colors={['#3b82f6', '#1d4ed8']}
              style={{ borderRadius: 16 }}
              className="flex-row items-center justify-center rounded-2xl py-4">
              <RotateCcw size={24} color="#ffffff" />
              <Text className="ml-3 text-lg font-bold text-white">
                Quay lại
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  if (!currentQuestion) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <Text>Không tìm thấy câu hỏi.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" backgroundColor="#3b82f6" />
      <View className="border-b border-slate-100 bg-white px-4 pb-1 pt-5">
        <View className="mb-3 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="rounded-full bg-slate-100 p-2">
            <ArrowLeft size={20} color="#64748b" />
          </TouchableOpacity>
          <View className="flex-row items-center justify-between mx-10">
            <View className="mr-3 flex-1">
              <View className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                <LinearGradient
                  colors={type === 'listening' ? ['#3b82f6', '#8b5cf6'] : ['#34d399', '#10b981']}
                  style={{ width: `${progress}%`, height: '100%' }}
                />
              </View>
            </View>
            <Text className="text-xs font-medium text-slate-400">
              {answeredCount}/{totalCount}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 p-6">
        {id == '1' && (
          <Part1Card
            id={currentQuestion.id}
            index={currentQuestionIndex + 1}
            onAnswer={selectAnswer}
            question={currentQuestion as Question}
            answerSheet={answerSheet}
            isPractice={true}
            isShowAnswer={currentAnswer?.isDone}
          />
        )}
        {id == '2' && (
          <Part2Card
            id={currentQuestion.id}
            index={currentQuestionIndex + 1}
            onAnswer={selectAnswer}
            question={currentQuestion as Question}
            answerSheet={answerSheet}
            isPractice={true}
            isShowAnswer={currentAnswer?.isDone}
            isAutoPlay={true}
          />
        )}
        {id == '3' && (
          <Part3Card
            id={currentQuestion.id}
            index={currentQuestionIndex + 1}
            onAnswer={selectAnswer}
            question={currentQuestion as Question}
            answerSheet={answerSheet}
            isPractice={true}
            isShowAnswer={currentAnswer?.isDone}
            isAutoPlay={true}
          />
        )}
        {id == '4' && (
          <Part4Card
            id={currentQuestion.id}
            index={currentQuestionIndex + 1}
            onAnswer={selectAnswer}
            question={currentQuestion as Question}
            answerSheet={answerSheet}
            isPractice={true}
            isShowAnswer={currentAnswer?.isDone}
            isAutoPlay={true}
          />
        )}
        {currentAnswer?.isDone && (
          <View className="mb-8 mt-2 rounded-xl bg-white p-4 shadow-lg">
            <Markdown>{currentQuestion.explanation!}</Markdown>
          </View>
        )}
      </ScrollView>

      <View className="border-t border-slate-100 bg-white p-6">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`flex-row items-center rounded-xl px-6 py-3 ${currentQuestionIndex === 0 ? 'bg-slate-100' : 'bg-slate-800'}`}>
            <ChevronLeft size={20} color={currentQuestionIndex === 0 ? '#94a3b8' : '#ffffff'} />
            <Text
              className={`ml-2 font-semibold ${currentQuestionIndex === 0 ? 'text-slate-400' : 'text-white'}`}>
              Trước
            </Text>
          </TouchableOpacity>

          {!currentAnswer?.isDone ? (
            <TouchableOpacity onPress={markQuestionAsDone} className="rounded-xl shadow-lg">
              <LinearGradient
                colors={['#3b82f6', '#1d4ed8']}
                style={{ borderRadius: 16 }}
                className="flex-row items-center rounded-xl px-6 py-3">
                <Text className="mr-2 font-semibold text-white">Kiểm tra</Text>
                <CheckCircle size={20} color="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>
          ) : currentQuestionIndex < questions.length - 1 ? (
            <TouchableOpacity onPress={nextQuestion} className="rounded-xl shadow-lg">
              <LinearGradient
                colors={['#3b82f6', '#1d4ed8']}
                style={{ borderRadius: 16 }}
                className="flex-row items-center rounded-xl px-6 py-3">
                <Text className="mr-2 font-semibold text-white">Tiếp</Text>
                <ChevronRight size={20} color="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSubmitConfirmation} className="rounded-xl shadow-lg">
              <LinearGradient
                colors={['#10b981', '#059669']}
                style={{ borderRadius: 16 }}
                className="flex-row items-center rounded-xl px-8 py-3">
                <Trophy size={20} color="#ffffff" />
                <Text className="ml-2 font-bold text-white">
                  Kết thúc
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
