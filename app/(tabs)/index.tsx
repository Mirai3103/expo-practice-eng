import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  History,
  Trophy,
  Settings,
  Flame,
  Headphones,
  Book,
  Sparkles,
  Timer,
  RotateCcw,
  User,
  X,
  Target,
  Calendar,
  TrendingUp,
  Award,
  Zap,
  ChevronRight,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Enhanced Progress Circle with Gradient
const ProgressCircle = ({
  progress,
  size = 120,
  strokeWidth = 8,
  gradientColors = ['#3B82F6', '#1D4ED8'],
  children,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  gradientColors?: string[];
  children?: React.ReactNode;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View className="items-center justify-center" style={{ width: size, height: size }}>
      <Svg width={size} height={size} className="absolute">
        <Defs>
          <SvgLinearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={gradientColors[0]} />
            <Stop offset="100%" stopColor={gradientColors[1]} />
          </SvgLinearGradient>
        </Defs>
        <Circle
          stroke="#F1F5F9"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="url(#progressGradient)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View className="absolute items-center justify-center">{children}</View>
    </View>
  );
};

// Enhanced Practice Modal
const PracticeModal = ({
  visible,
  onClose,
  onSelectListening,
  onSelectReading,
}: {
  visible: boolean;
  onClose: () => void;
  onSelectListening: () => void;
  onSelectReading: () => void;
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View
        className="flex-1 items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <View className="w-full rounded-3xl bg-white p-6 shadow-2xl" style={{ maxWidth: 400 }}>
          <View className="mb-8 flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-slate-800">Chọn phần luyện tập</Text>
              <Text className="mt-1 text-slate-500">Tập trung vào kỹ năng của bạn</Text>
            </View>
            <TouchableOpacity onPress={onClose} className="rounded-full bg-gray-100 p-2">
              <X size={24} color="#64748b" />
            </TouchableOpacity>
          </View>

          <View className="gap-4">
            <TouchableOpacity
              className="rounded-2xl shadow-sm"
              onPress={onSelectListening}
              style={{
                shadowColor: '#0ea5e9',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
              }}>
              <LinearGradient
                colors={['#f0f9ff', '#eff6ff']} // from-sky-50 to-blue-50
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 16,
                }}
                className="flex-row items-center rounded-2xl border border-sky-200 p-6">
                <View className="mr-4 h-16 w-16 overflow-hidden rounded-2xl shadow-lg">
                  <LinearGradient
                    colors={['#38bdf8', '#3b82f6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="h-full w-full items-center justify-center">
                    <Headphones size={28} color="#ffffff" />
                  </LinearGradient>
                </View>
                <View className="flex-1">
                  <View className="mb-2 flex-row items-center">
                    <Text className="text-xl font-bold text-slate-800">Listening</Text>
                    <View className="ml-2 rounded-full bg-sky-100 px-2 py-1">
                      <Text className="text-xs font-semibold text-sky-700">Parts 1-4</Text>
                    </View>
                  </View>
                  <Text className="text-sm leading-5 text-slate-600">
                    Photo Description, Question-Response, Conversations, Talks
                  </Text>
                </View>
                <ChevronRight size={20} color="#0ea5e9" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              className="rounded-2xl shadow-sm"
              onPress={onSelectReading}
              style={{
                shadowColor: '#10b981',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
              }}>
              <LinearGradient
                colors={['#f0fdf4', '#ecfdf5']} // from-emerald-50 to-green-50
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 16,
                }}
                className="flex-row items-center rounded-2xl border border-emerald-200 p-6">
                <View className="mr-4 h-16 w-16 overflow-hidden rounded-2xl shadow-lg">
                  <LinearGradient
                    colors={['#34d399', '#10b981']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="h-full w-full items-center justify-center">
                    <Book size={28} color="#ffffff" />
                  </LinearGradient>
                </View>
                <View className="flex-1">
                  <View className="mb-2 flex-row items-center">
                    <Text className="text-xl font-bold text-slate-800">Reading</Text>
                    <View className="ml-2 rounded-full bg-emerald-100 px-2 py-1">
                      <Text className="text-xs font-semibold text-emerald-700">Parts 5-7</Text>
                    </View>
                  </View>
                  <Text className="text-sm leading-5 text-slate-600">
                    Incomplete Sentences, Text Completion, Reading Comprehension
                  </Text>
                </View>
                <ChevronRight size={20} color="#10b981" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Main Dashboard Component
export default function Home() {
  const [showPracticeModal, setShowPracticeModal] = useState(false);

  const parts = {
    listening: [
      { name: 'Part 1: Photo Description', level: 'Intermediate', progress: 60, icon: '📷' },
      { name: 'Part 2: Question-Response', level: 'Advanced', progress: 75, icon: '💬' },
      { name: 'Part 3: Short Conversations', level: 'Beginner', progress: 40, icon: '👥' },
      { name: 'Part 4: Short Talks', level: 'Intermediate', progress: 55, icon: '🎤' },
    ],
    reading: [
      { name: 'Part 5: Incomplete Sentences', level: 'Advanced', progress: 80, icon: '📝' },
      { name: 'Part 6: Text Completion', level: 'Intermediate', progress: 65, icon: '📄' },
      { name: 'Part 7: Reading Comprehension', level: 'Beginner', progress: 35, icon: '📚' },
    ],
  };

  const levelGradients: Record<string, {colors: string[], textColor: string, borderColor: string}> = {
    Beginner: {
      colors: ['#FEF2F2', '#FFF1F2'],
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
    },
    Intermediate: {
      colors: ['#EFF6FF', '#EEF2FF'],
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
    },
    Advanced: {
      colors: ['#F0FDF4', '#ECFDF5'],
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
    },
    Default: {
      colors: ['#F1F5F9', '#F8FAFC'],
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200',
    },
  };

  const handlePracticeSelection = (type: 'listening' | 'reading') => {
    setShowPracticeModal(false);
    router.push(`/practice/${type}`);
  };

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          <View className="mb-8 overflow-hidden rounded-3xl shadow-lg">
            <LinearGradient
              colors={['#3b82f6', '#8b5cf6']} // from-blue-500 to-purple-600
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="p-6">
              <Text className="mb-2 text-2xl font-bold text-white">Chào buổi tối, Hoàng! 👋</Text>
              <Text className="text-base text-blue-100">
                Đừng để chuỗi ngày học của bạn bị ngắt quãng nhé!
              </Text>
              <View className="mt-4 flex-row items-center">
                <View className="flex-row items-center rounded-full bg-white/20 px-3 py-2">
                  <Flame size={16} color="#ffffff" />
                  <Text className="ml-2 font-semibold text-white">12 ngày streak</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <View className="mb-8">
            <View
              className="mb-6 items-center rounded-3xl border border-slate-100 bg-white p-6 shadow-lg"
              style={{
                shadowColor: '#3B82F6',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.1,
                shadowRadius: 24,
              }}>
              <View className="mb-4 flex-row items-center">
                <Target size={20} color="#3B82F6" />
                <Text className="ml-2 text-lg font-bold text-slate-800">Điểm số ước tính</Text>
              </View>
              <ProgressCircle
                progress={65}
                size={100}
                strokeWidth={8}
                gradientColors={['#3B82F6', '#1D4ED8']}>
                <Text className="text-2xl font-bold text-slate-800">650</Text>
                <Text className="text-xs text-slate-500">/ 990</Text>
              </ProgressCircle>
              <View className="mt-4 flex-row items-center rounded-full bg-blue-50 px-4 py-2">
                <TrendingUp size={14} color="#3B82F6" />
                <Text className="ml-2 text-sm font-semibold text-blue-700">Mục tiêu: 750+</Text>
              </View>
            </View>

            <View className="flex-row gap-4">
              <View
                className="flex-1 items-center rounded-2xl border border-slate-100 bg-white p-5 shadow-lg"
                style={{
                  shadowColor: '#F59E0B',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                }}>
                <View className="mb-3 flex-row items-center">
                  <Calendar size={16} color="#F59E0B" />
                  <Text className="ml-2 text-sm font-bold text-slate-800">Hôm nay</Text>
                </View>
                <Text className="text-xl font-bold text-slate-800">18/30</Text>
                <Text className="text-xs text-slate-500">câu hỏi</Text>
                <View className="mt-2 h-2 w-full overflow-hidden rounded-full bg-amber-100">
                  <LinearGradient
                    colors={['#fbbd23', '#f97316']} // from-amber-400 to-orange-500
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ width: '60%', height: '100%' }}
                  />
                </View>
              </View>

              <View
                className="flex-1 items-center rounded-2xl border border-slate-100 bg-white p-5 shadow-lg"
                style={{
                  shadowColor: '#EF4444',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                }}>
                <View className="mb-3 flex-row items-center">
                  <Award size={16} color="#EF4444" />
                  <Text className="ml-2 text-sm font-bold text-slate-800">Streak</Text>
                </View>
                <View className="mb-2 h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                  <LinearGradient
                    colors={['#fb923c', '#ef4444']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="h-full w-full items-center justify-center">
                    <Flame size={16} color="#ffffff" />
                  </LinearGradient>
                </View>
                <Text className="text-xl font-bold text-slate-800">12</Text>
                <Text className="text-xs text-slate-500">ngày</Text>
              </View>
            </View>
          </View>

          <View className="mb-8">
            <Text className="mb-6 text-xl font-bold text-slate-800">Lối tắt</Text>

            <TouchableOpacity
              className="mb-4 rounded-2xl shadow-lg"
              onPress={() => setShowPracticeModal(true)}
              style={{
                borderRadius: 16,
                shadowColor: '#0ea5e9',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
              }}>
              <LinearGradient
                colors={['#f0f9ff', '#eff6ff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 16,
                }}
                className="flex-row items-center rounded-2xl border border-sky-100 p-6">
                <View className="h-14 w-14 items-center justify-center overflow-hidden rounded-xl shadow-lg">
                  <LinearGradient
                    colors={['#38bdf8', '#3b82f6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      borderRadius: 12,
                    }}
                    className="h-full w-full items-center justify-center rounded-xl">
                    <Sparkles size={24} color="#ffffff" />
                  </LinearGradient>
                </View>
                <View className="ml-4 flex-1">
                  <Text className="mb-1 text-lg font-bold text-slate-800">Luyện theo Part</Text>
                  <Text className="text-sm leading-5 text-slate-600">
                    Tập trung vào điểm yếu của bạn
                  </Text>
                </View>
                <ChevronRight size={20} color="#0ea5e9" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              className="mb-4 rounded-2xl shadow-lg"
              style={{
                shadowColor: '#f43f5e',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
              }}>
              <LinearGradient
                colors={['#fff1f2', '#ffe4e6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 16,
                }}
                className="flex-row items-center rounded-2xl border border-rose-100 p-6">
                <View className="h-14 w-14 items-center justify-center overflow-hidden rounded-xl shadow-lg">
                  <LinearGradient
                    colors={['#f472b6', '#ec4899']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="h-full w-full items-center justify-center">
                    <Timer size={24} color="#ffffff" />
                  </LinearGradient>
                </View>
                <View className="ml-4 flex-1">
                  <Text className="mb-1 text-lg font-bold text-slate-800">Làm Full Test</Text>
                  <Text className="text-sm leading-5 text-slate-600">
                    Kiểm tra toàn diện trong 120 phút
                  </Text>
                </View>
                <ChevronRight size={20} color="#f43f5e" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              className="rounded-2xl shadow-lg"
              style={{
                shadowColor: '#f59e0b',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
              }}>
              <LinearGradient
                colors={['#fffbeb', '#fff7ed']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 16,
                }}
                className="flex-row items-center rounded-2xl border border-amber-100 p-6">
                <View className="h-14 w-14 items-center justify-center overflow-hidden rounded-xl shadow-lg">
                  <LinearGradient
                    colors={['#fbbd23', '#f97316']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="h-full w-full items-center justify-center">
                    <RotateCcw size={24} color="#ffffff" />
                  </LinearGradient>
                </View>
                <View className="ml-4 flex-1">
                  <Text className="mb-1 text-lg font-bold text-slate-800">Ôn tập câu sai</Text>
                  <Text className="text-sm leading-5 text-slate-600">
                    Bạn có 42 câu sai cần ôn tập
                  </Text>
                </View>
                <View className="rounded-full bg-amber-100 px-2 py-1">
                  <Text className="text-xs font-bold text-amber-700">42</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View>
            <Text className="mb-6 text-xl font-bold text-slate-800">Lộ trình của bạn</Text>

            <View
              className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-lg"
              style={{
                shadowColor: '#0ea5e9',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
              }}>
              <View className="mb-5 flex-row items-center">
                <View className="h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-lg">
                  <LinearGradient
                    colors={['#38bdf8', '#3b82f6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="h-full w-full items-center justify-center">
                    <Headphones size={20} color="#ffffff" />
                  </LinearGradient>
                </View>
                <View className="ml-3">
                  <Text className="text-lg font-bold text-slate-800">Listening</Text>
                  <Text className="text-sm text-slate-500">Parts 1-4</Text>
                </View>
              </View>

              {parts.listening.slice(0, 2).map((part, index) => {
                const levelStyle = levelGradients[part.level] || levelGradients.Default;
                return (
                  <View key={index} className="mb-4">
                    <View className="mb-2 flex-row items-center justify-between">
                      <View className="flex-1 flex-row items-center">
                        <Text className="mr-2 text-lg">{part.icon}</Text>
                        <Text className="flex-1 text-sm font-semibold text-slate-700">
                          {part.name}
                        </Text>
                      </View>
                      <View
                        className={`overflow-hidden rounded-full border ${levelStyle.borderColor}`}>
                        <LinearGradient
                          colors={levelStyle.colors}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          className="px-2 py-1">
                          <Text className={`text-xs font-bold ${levelStyle.textColor}`}>
                            {part.level}
                          </Text>
                        </LinearGradient>
                      </View>
                    </View>
                    <View className="mb-1 h-2 overflow-hidden rounded-full bg-slate-100">
                      <LinearGradient
                        colors={['#38bdf8', '#3b82f6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ width: `${part.progress}%`, height: '100%' }}
                      />
                    </View>
                    <Text className="text-xs font-medium text-slate-500">
                      {part.progress}% hoàn thành
                    </Text>
                  </View>
                );
              })}
            </View>

            <View
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg"
              style={{
                shadowColor: '#10b981',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
              }}>
              <View className="mb-5 flex-row items-center">
                <View className="h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-lg">
                  <LinearGradient
                    colors={['#34d399', '#10b981']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="h-full w-full items-center justify-center">
                    <Book size={20} color="#ffffff" />
                  </LinearGradient>
                </View>
                <View className="ml-3">
                  <Text className="text-lg font-bold text-slate-800">Reading</Text>
                  <Text className="text-sm text-slate-500">Parts 5-7</Text>
                </View>
              </View>

              {parts.reading.slice(0, 2).map((part, index) => {
                const levelStyle = levelGradients[part.level] || levelGradients.Default;
                return (
                  <View key={index} className="mb-4">
                    <View className="mb-2 flex-row items-center justify-between">
                      <View className="flex-1 flex-row items-center">
                        <Text className="mr-2 text-lg">{part.icon}</Text>
                        <Text className="flex-1 text-sm font-semibold text-slate-700">
                          {part.name}
                        </Text>
                      </View>
                      <View
                        className={`overflow-hidden rounded-full border ${levelStyle.borderColor}`}>
                        <LinearGradient
                          colors={levelStyle.colors}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          className="px-2 py-1">
                          <Text className={`text-xs font-bold ${levelStyle.textColor}`}>
                            {part.level}
                          </Text>
                        </LinearGradient>
                      </View>
                    </View>
                    <View className="mb-1 h-2 overflow-hidden rounded-full bg-slate-100">
                      <LinearGradient
                        colors={['#34d399', '#10b981']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ width: `${part.progress}%`, height: '100%' }}
                      />
                    </View>
                    <Text className="text-xs font-medium text-slate-500">
                      {part.progress}% hoàn thành
                    </Text>
                  </View>
                );
              })}

              <TouchableOpacity className="mt-4 flex-row items-center justify-center rounded-xl bg-emerald-50 p-3">
                <Text className="font-semibold text-emerald-700">Xem tất cả Reading Parts</Text>
                <ChevronRight size={16} color="#10b981" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <PracticeModal
        visible={showPracticeModal}
        onClose={() => setShowPracticeModal(false)}
        onSelectListening={() => handlePracticeSelection('listening')}
        onSelectReading={() => handlePracticeSelection('reading')}
      />
    </View>
  );
}
