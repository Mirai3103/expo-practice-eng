import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { CheckCircle, Circle } from 'lucide-react-native';
import { cn } from '~/utils/tailwind';
import { Image as ImageExpo } from 'expo-image';
import AudioPlayer from './AudioPlayer';
import { Answer } from '~/types/question';
import { Question } from '~/types';

export interface IPart3Question {
  question: Question;
  answerSheet: Answer[];
  id: number;
  index: number;
  onAnswer: (questionId: number, answer: number) => void;
  isPractice: boolean;
  isShowAnswer?: boolean;
  isAutoPlay?: boolean;
}

export default function Part3Card({ 
  question, 
  answerSheet, 
  id, 
  index, 
  onAnswer, 
  isPractice, 
  isShowAnswer = false, 
  isAutoPlay = true 
}: IPart3Question) {
  const audio = question.content_audio_url!; // always has audio
  const image = question.content_image_url; // sometimes question has image, sometimes not
  const childQuestions = question.child_quests!; // part 3 is listen audio and answer 3 to 4 questions each question has 4 choices
  console.log(question.content_text)
  const handleAnswerSelect = (questionId: number, choiceId: number) => {
    onAnswer(questionId, choiceId);
  };

  const getAnswerKey = (index: number): string => {
    return ['A', 'B', 'C', 'D'][index];
  };

  return (
    <View className="flex-1 pb-10 bg-slate-50">
      {/* Audio Controls */}
      <AudioPlayer 
        audio={audio} 
        isPractice={isPractice} 
        isAutoPlay={isAutoPlay} 
      />
      
      <View className="rounded-2xl bg-white">
        <View className="overflow-hidden py-4">
          <View className="mr-3 items-center">
            <Text className="text-sm font-bold">Questions {index}</Text>
          </View>
        </View>

        {/* Image if available */}
        {image && (
          <View className="mb-4 overflow-hidden">
            <View className="aspect-video w-full overflow-hidden">
              <ImageExpo
                source={{ uri: image }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                contentFit="contain"
                onError={() => Alert.alert('Lỗi', 'Không thể tải hình ảnh')}
                cachePolicy={'memory-disk'}
              />
            </View>
          </View>
        )}

        {/* Child Questions */}
        <View className="p-4">
          {childQuestions.map((childQuestion, questionIndex) => (
            <View key={childQuestion.id} className={questionIndex > 0 ? 'mt-6' : ''}>
              {/* Question Text */}
              {childQuestion.content_text && (
                <Text className="text-base font-medium mb-3 text-slate-800">
                  {questionIndex + 1}. {childQuestion.content_text}
                </Text>
              )}
              
              {/* Answer Choices */}
              {childQuestion.question_choices.map((choice, choiceIndex) => {
                const answerKey = getAnswerKey(choiceIndex);
                const isSelected = answerSheet.find(a => a.questionId === childQuestion.id)?.answerId === choice.id;
                
                return (
                  <TouchableOpacity
                    key={choice.id}
                    onPress={() => handleAnswerSelect(childQuestion.id, choice.id)}
                    className={cn(
                      'flex-row items-center rounded-xl border-2 p-2',
                      choiceIndex > 0 ? 'mt-2' : '',
                      isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50',
                      isShowAnswer && choice.is_correct ? 'border-green-500 bg-green-50' : '',
                      isShowAnswer && !choice.is_correct && isSelected ? 'border-red-500 bg-red-50' : ''
                    )}>
                    {isSelected ? (
                      <CheckCircle 
                        size={20} 
                        color={
                          isShowAnswer && choice.is_correct 
                            ? '#10b981' 
                            : isShowAnswer && !choice.is_correct && isSelected 
                              ? '#ef4444' 
                              : '#3b82f6'
                        } 
                      />
                    ) : (
                      <Circle size={20} color="#94a3b8" />
                    )}
                    <View className="mx-4 flex-row items-center flex-1">
                      {/* <View
                        className={cn(
                          'mr-3 h-8 w-8 items-center justify-center rounded-full',
                          isSelected ? 'bg-blue-500' : 'bg-slate-200',
                          isShowAnswer && choice.is_correct ? 'bg-green-500' : '',
                          isShowAnswer && !choice.is_correct && isSelected ? 'bg-red-500' : ''
                        )}>
                        <Text
                          className={`text-sm font-bold ${
                            isSelected ? 'text-white' : 'text-slate-600'
                          }`}>
                          {answerKey}
                        </Text>
                      </View> */}
                      <Text 
                        className={cn(
                          'flex-1 text-sm',
                          isSelected ? 'text-slate-800' : 'text-slate-700'
                        )}>
                        {choice.choice_text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
