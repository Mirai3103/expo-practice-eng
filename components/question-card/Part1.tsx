import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import {
  CheckCircle,
  Circle,
} from 'lucide-react-native';
import { cn } from '~/utils/tailwind';
import { Image as ImageExpo } from 'expo-image';
import AudioPlayer from './AudioPlayer';
import { Answer } from '~/types/question';
import { Question } from '~/types';





export interface IPart1Question {
  id: number;
  index: number;
  onAnswer: (questionId: number, answerId: number) => void;
  question: Question;
  isPractice: boolean;
  isShowAnswer?: boolean;
  isAutoPlay?: boolean;
  answerSheet: Answer[]
}

export default function Part1Card({
  id,
  index,
  onAnswer,
  isPractice,
  isShowAnswer=false,
  isAutoPlay=true,
  answerSheet,
  question

}: IPart1Question) {

  const handleAnswerSelect = (answerKey: number) => {
    onAnswer(question.id, answerKey);
  };
  console.log(answerSheet);

  const getAnswerKey = (index: number): string => {
    return ['A', 'B', 'C', 'D'][index];
  };

  return (
    <View className="flex-1 pb-10  bg-slate-50">
      {/* Audio Controls */}
      <AudioPlayer 
        audio={question.content_audio_url!} 
        isPractice={isPractice} 
        isAutoPlay={isAutoPlay} 
      />
      
      <View className="rounded-2xl bg-white">
        <View className="overflow-hidden py-4">
          <View className="mr-3 items-center ">
            <Text className="text-sm font-bold ">Question {index}</Text>
          </View>
        </View>

        <View className="mb-4 overflow-hidden ">
          <View className="aspect-video w-full overflow-hidden">
            <ImageExpo
              source={{ uri: question.content_image_url! }}
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
        <View className="p-4">
          {question.question_choices.map((option, index) => {
            const answerKey = getAnswerKey(index);
            const isSelected = answerSheet.find(a => a.questionId === question.id)?.answerId === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleAnswerSelect(option.id)}
                className={cn (
                  'flex-row items-center rounded-xl border-2 p-4',
                  index > 0 ? 'mt-3' : '',
                  isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50',
                  isShowAnswer && option.is_correct ? 'border-green-500 bg-green-50' : '',
                  isShowAnswer && !option.is_correct && isSelected ? 'border-red-500 bg-red-50' : ''
                )}>
                     {isSelected ? (
                  <CheckCircle size={20} color={isShowAnswer && option.is_correct ? '#10b981' : isShowAnswer && !option.is_correct && isSelected ? '#ef4444' : '#3b82f6'} />
                ) : (
                  <Circle size={20} color="#94a3b8" />
                )}
                <View className="mx-4 flex-row items-center">
                  <View
                    className={cn(
                      'mr-3 h-8 w-8 items-center justify-center rounded-full',
                      isSelected ? 'bg-blue-500' : 'bg-slate-200',
                      isShowAnswer && option.is_correct ? 'bg-green-500' : '',
                      isShowAnswer && !option.is_correct && isSelected ? 'bg-red-500' : ''
                    )}>
                    <Text
                      className={`text-sm font-bold ${
                        isSelected ? 'text-white' : 'text-slate-600'
                      }`}>
                      {answerKey}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Multiple Choice Options */}
   
    </View>
  );
}
