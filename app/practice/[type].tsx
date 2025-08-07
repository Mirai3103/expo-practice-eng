import { useGlobalSearchParams, router } from 'expo-router';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  StatusBar 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { 
  ArrowLeft, 
  ChevronRight,
  ImageIcon,
  MessageCircleQuestion,
  Users,
  Mic,
  FileText,
  ClipboardEdit,
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Star,
  Play,
  Settings,
  Zap
} from 'lucide-react-native';
import theme from '~/theme';

const { width } = Dimensions.get('window');

// Define types for better type safety using colors from tailwind config
type PartData = {
  id: string;
  title: string;
  description: string;
  icon: any;
  currentLevel: string;
  targetLevel: string;
  progress: number;
  accentColors: string[];
  estimatedTime: string;
  difficulty: number;
  completedSessions: number;
  totalQuestions: number;
};

type SkillData = {
  title: string;
  subtitle: string;
  totalProgress: number;
  parts: PartData[];
  primaryColors: string[];
};

const skillsData: Record<string, SkillData> = {
  listening: {

    title: "Luyện Kỹ Năng Nghe",
    subtitle: "Nâng cao khả năng nghe hiểu tiếng Anh",
    totalProgress: 61,
    primaryColors: [theme.colors.primary[500], theme.colors.primary[600]],
    parts: [
      {
        id: "1",
        title: "Part 1: Photo Description",
        description: "Mô tả hình ảnh chi tiết, phân tích ngữ cảnh",
        icon: ImageIcon,
        currentLevel: "Intermediate",
        targetLevel: "Advanced", 
        progress: 65,
        estimatedTime: "15-20 phút",
        difficulty: 3,
        completedSessions: 12,
        totalQuestions: 150,
        accentColors: ['#3B82F6', '#1D4ED8']
      },
      {
          id: "2",
        title: "Part 2: Question-Response",
        description: "Phản hồi nhanh và chính xác với các câu hỏi",
        icon: MessageCircleQuestion,
        currentLevel: "Advanced",
        targetLevel: "Expert",
        progress: 80,
        estimatedTime: "10-15 phút",
        difficulty: 4,
        completedSessions: 18,
        totalQuestions: 200,
        accentColors: ['#0EA5E9', '#0284C7']
      },
      {
        id: "3",
        title: "Part 3: Short Conversations",
        description: "Hiểu nội dung cuộc hội thoại giữa nhiều người",
        icon: Users,
        currentLevel: "Beginner",
        targetLevel: "Intermediate",
        progress: 45,
        estimatedTime: "20-25 phút",
        difficulty: 2,
        completedSessions: 8,
        totalQuestions: 120,
        accentColors: ['#10B981', '#059669']
      },
      {
        id: "4",
        title: "Part 4: Short Talks",
        description: "Nghe hiểu bài thuyết trình và diễn thuyết",
        icon: Mic,
        currentLevel: "Intermediate",
        targetLevel: "Advanced",
        progress: 55,
        estimatedTime: "25-30 phút",
        difficulty: 4,
        completedSessions: 10,
        totalQuestions: 180,
        accentColors: ['#6366F1', '#4F46E5']
      }
    ]
  },
  reading: {
    title: "Luyện Kỹ Năng Đọc",
    subtitle: "Phát triển khả năng đọc hiểu toàn diện",
    totalProgress: 57,
    primaryColors: [theme.colors.primary[500], theme.colors.primary[600]],
    parts: [
      {
        id: "5",
        title: "Part 5: Incomplete Sentences",
        description: "Hoàn thành câu với ngữ pháp chính xác",
        icon: FileText,
        currentLevel: "Advanced",
        targetLevel: "Expert",
        progress: 75,
        estimatedTime: "15-20 phút",
        difficulty: 3,
        completedSessions: 15,
        totalQuestions: 250,
        accentColors: ['#A855F7', '#9333EA']
      },
      {
        id: "6", 
        title: "Part 6: Text Completion",
        description: "Điền từ vào chỗ trống trong đoạn văn",
        icon: ClipboardEdit,
        currentLevel: "Intermediate",
        targetLevel: "Advanced",
        progress: 60,
        estimatedTime: "20-25 phút",
        difficulty: 3,
        completedSessions: 11,
        totalQuestions: 190,
        accentColors: ['#F97316', '#EA580C']
      },
      {
        id: "71",
        title: "Part 7-1: Single Passage", 
        description: "Đọc hiểu văn bản đơn và trả lời câu hỏi",
        icon: BookOpen,
        currentLevel: "Beginner",
        targetLevel: "Intermediate",
        progress: 35,
        estimatedTime: "30-40 phút",
        difficulty: 4,
        completedSessions: 6,
        totalQuestions: 300,
        accentColors: ['#F43F5E', '#E11D48']
      },
      {
        id: "72",
        title: "Part 7-2: Double Passages",
        description: "Đọc hiểu văn bản kép và trả lời câu hỏi",
        icon: BookOpen,
        currentLevel: "Intermediate",
        targetLevel: "Advanced",
        progress: 45,
        estimatedTime: "30-40 phút",
        difficulty: 4,
        completedSessions: 6,
        totalQuestions: 300,
        accentColors: ['#F43F5E', '#E11D48']
      },
      {
        id: "73",
        title: "Part 7-3: Triple Passages",
        description: "Đọc hiểu văn bản ba và trả lời câu hỏi",
        icon: BookOpen,
        currentLevel: "Intermediate",
        targetLevel: "Advanced",
        progress: 45,
        estimatedTime: "30-40 phút",
        difficulty: 4,
        completedSessions: 6,
        totalQuestions: 300,
        accentColors: ['#F43F5E', '#E11D48']
      }
    ]
  }
};

const getLevelBadgeColor = (level: string) => {
  switch (level) {
    case 'Beginner': return { 
      bg: 'bg-red-50', 
      text: 'text-red-700', 
      border: 'border-red-200',
      gradientColors: ['#FEF2F2', '#FFF1F2']
    };
    case 'Intermediate': return { 
      bg: 'bg-blue-50', 
      text: 'text-blue-700', 
      border: 'border-blue-200',
      gradientColors: ['#EFF6FF', '#EEF2FF']
    };
    case 'Advanced': return { 
      bg: 'bg-green-50', 
      text: 'text-green-700', 
      border: 'border-green-200',
      gradientColors: ['#F0FDF4', '#ECFDF5']
    };
    case 'Expert': return { 
      bg: 'bg-purple-50', 
      text: 'text-purple-700', 
      border: 'border-purple-200',
      gradientColors: ['#F5F3FF', '#EDE9FE']
    };
    default: return { 
      bg: 'bg-gray-50', 
      text: 'text-gray-700', 
      border: 'border-gray-200',
      gradientColors: ['#F1F5F9', '#F8FAFC']
    };
  }
};

const getDifficultyStars = (difficulty: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star 
      key={i} 
      size={12} 
      color={i < difficulty ? "#F59E0B" : "#E5E7EB"} 
      fill={i < difficulty ? "#F59E0B" : "#E5E7EB"}
    />
  ));
};

// Enhanced Practice Card Component matching home page design
const PracticeCard = ({ part }: { part: PartData }) => {
  const IconComponent = part.icon;
  const [questionCount, setQuestionCount] = useState(2);
  const questionOptions = [5, 10, 15, 20, 25, 30];
  
  const handleSliderChange = (value: number) => {
    setQuestionCount(Math.round(value));
  };
  
  const handlePractice = (id:string) => {
    const selectedQuestionCount = questionOptions[questionCount];
    console.log(`Starting practice for ${part.id} with ${selectedQuestionCount} questions`);
    router.push(`/practice/${part.id}/${id}/start?questionCount=${selectedQuestionCount}&sessionId=${Date.now()}`)
  };

  const currentLevelStyle = getLevelBadgeColor(part.currentLevel);
  const targetLevelStyle = getLevelBadgeColor(part.targetLevel);

  return (
    <View 
      className="mb-6 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg"
      style={{
        shadowColor: part.accentColors[0],
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
      }}>
      
      {/* Header Section - Similar to home page cards */}
      <View className="p-6">
        <View className="mb-4 flex-row items-center">
          <View className="mr-4 h-16 w-16 overflow-hidden rounded-2xl shadow-lg">
            <LinearGradient
              colors={part.accentColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="h-full w-full items-center justify-center">
              <IconComponent size={28} color="#ffffff" />
            </LinearGradient>
          </View>
          <View className="flex-1">
            <Text className="mb-2 text-xl font-bold text-slate-800">
              {part.title}
            </Text>
            <Text className="text-sm leading-5 text-slate-600">
              {part.description}
            </Text>
          </View>
        </View>

        

        {/* Progress Section */}
        <View className="mb-6">
         

          {/* Level Progress */}
          <View className="flex-row items-center justify-between mb-1">
            <View className="overflow-hidden rounded-full border-2 border-slate-200">
              <LinearGradient
                colors={currentLevelStyle.gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="px-4 py-2">
                <Text className={`text-sm font-bold ${currentLevelStyle.text}`}>
                  {part.currentLevel}
                </Text>
              </LinearGradient>
            </View>
           
            <View className={`overflow-hidden rounded-full border-2 border-dashed ${targetLevelStyle.border} bg-slate-50`}>
              <View className="px-4 py-2">
                <Text className="text-sm font-bold text-slate-400">
                  {part.targetLevel}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Question Count Selector */}
        <View className="mb-6">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Settings size={18} color="#64748b" />
              <Text className="ml-2 text-base font-bold text-slate-800">Số câu hỏi</Text>
            </View>
            <View className="overflow-hidden rounded-full border border-slate-200 bg-slate-50">
              <View className="px-4 py-2">
                <Text className="text-sm font-bold text-slate-800">
                  {questionOptions[questionCount]} câu
                </Text>
              </View>
            </View>
          </View>
          
          <View className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={5}
              step={1}
              value={questionCount}
              onValueChange={handleSliderChange}
              minimumTrackTintColor={part.accentColors[0]}
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor={part.accentColors[0]}
            />
            
            <View className="mt-2 flex-row justify-between px-2">
              {questionOptions.map((option, index) => (
                <View key={option} className="items-center">
                  <View className={`h-2 w-2 rounded-full ${
                    index === questionCount ? 'bg-slate-800' : 'bg-slate-300'
                  }`} />
                  <Text className={`mt-1 text-xs ${
                    index === questionCount ? 'font-semibold text-slate-800' : 'text-slate-400'
                  }`}>
                    {option}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          onPress={()=>handlePractice(part.id)}
          activeOpacity={0.8}
          className="rounded-2xl shadow-lg"
          style={{
            shadowColor: part.accentColors[0],
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            borderRadius: 16,
          }}
  
          >
            
          <LinearGradient
            colors={part.accentColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 16,
            }}
            className="flex-row items-center justify-center rounded-2xl py-4">
            <Play size={24} color="#ffffff" />
            <Text className="ml-3 text-lg font-bold text-white">Bắt đầu luyện tập</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function PracticeType() {
  const { type } = useGlobalSearchParams<{ type: string }>();
  const skillData = skillsData[type as string];

  if (!skillData) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <Text className="text-lg text-slate-600">Skill not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" backgroundColor="#3b82f6" />
      
      {/* Enhanced Header matching home page style */}
      <View className="overflow-hidden rounded-b-3xl shadow-lg">
        <LinearGradient
          colors={skillData.primaryColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="py-3">
          <View className="px-3">
            <View className="mb-6 flex-row items-center justify-between">
              <TouchableOpacity 
                onPress={() => router.back()}
                className="rounded-full bg-white/20 p-2">
                <ArrowLeft size={24} color="#ffffff" />
              </TouchableOpacity>
              <View className="flex-1 items-center">
                <Text className="text-2xl font-bold text-white">
                  {skillData.title}
                </Text>
             
              </View>
              <View style={{ width: 40 }} />
            </View>

            {/* Overall Progress Card */}
            <View className="rounded-2xl border border-white/20 bg-white/10 p-4">
              <View className="mb-3 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Target size={20} color="#ffffff" />
                  <Text className="ml-2 text-lg font-bold text-white">Tiến độ tổng thể</Text>
                </View>
                <Text className="text-xl font-bold text-white">{skillData.totalProgress}%</Text>
              </View>
              
              <View className="mb-3 h-3 overflow-hidden rounded-full bg-white/20">
                <View 
                  className="h-full rounded-full bg-white"
                  style={{ width: `${skillData.totalProgress}%` }}
                />
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-white/70">
                  {skillData.parts.length} phần luyện tập
                </Text>
                <View className="flex-row items-center">
                  <Trophy size={16} color="#ffffff" />
                  <Text className="ml-1 text-sm font-semibold text-white">
                    {skillData.parts.reduce((acc, part) => acc + part.completedSessions, 0)} hoàn thành
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Content */}
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ padding: 20, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}>
        
        {skillData.parts.map((part) => (
          <PracticeCard key={part.id} part={part} />
        ))}
        
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}