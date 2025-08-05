import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  LogIn,
  Shield,
  Sparkles,
  Trophy,
  Headphones,
  Book,
  Target,
} from 'lucide-react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { supabase } from '~/utils/supabase';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: "658600165325-81lh9k55qb91jn01r1nn2s32edb5uc77.apps.googleusercontent.com", // from Google Console
      offlineAccess: true,
      scopes: ['profile', 'email'],
    });

    // Check if user is already signed in
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      
      // Check if device supports Google Play Services
      await GoogleSignin.hasPlayServices();
      
      // Get user info from Google
      const userInfo = await GoogleSignin.signIn();
      
      if (userInfo.data?.idToken) {
        console.log('userInfo.data?.idToken', userInfo.data?.idToken);
        // Sign in with Supabase using Google ID token
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data?.idToken,
        });

        if (error) {
          throw error;
        }

        if (data.user) {
          // Navigate to main app
          router.replace('/(tabs)');
        }
      } else {
        throw new Error('No ID token received from Google');
      }
    } catch (error: any) {
      console.error('Google Sign-In Error:', JSON.stringify(error));
      
      let errorMessage = 'Đã có lỗi xảy ra khi đăng nhập';
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        errorMessage = 'Đăng nhập đã bị hủy';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        errorMessage = 'Đang trong quá trình đăng nhập';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        errorMessage = 'Google Play Services không khả dụng';
      }
      
      Alert.alert('Lỗi đăng nhập', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" backgroundColor="#3b82f6" />
      
      {/* Header Section */}
      <View className="flex-1">
        <View className="overflow-hidden rounded-b-[40px] shadow-2xl">
          <LinearGradient
            colors={['#3b82f6', '#8b5cf6', '#ec4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="px-6 pb-14 pt-14">
            
            {/* App Logo/Brand */}
            <View className="mb-8 items-center">
              <Text className="mb-2 text-3xl font-bold text-white">TOEIC Quiz</Text>
              <Text className="text-lg text-white/80">Nâng cao kỹ năng tiếng Anh của bạn</Text>
            </View>

            {/* Features Preview */}
            <View className="flex-row justify-around">
              <View className="items-center">
                <View className="mb-2 h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <Headphones size={24} color="#ffffff" />
                </View>
                <Text className="text-xs font-semibold text-white/90">Listening</Text>
              </View>
              <View className="items-center">
                <View className="mb-2 h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <Book size={24} color="#ffffff" />
                </View>
                <Text className="text-xs font-semibold text-white/90">Reading</Text>
              </View>
              <View className="items-center">
                <View className="mb-2 h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <Target size={24} color="#ffffff" />
                </View>
                <Text className="text-xs font-semibold text-white/90">Practice</Text>
              </View>
              <View className="items-center">
                <View className="mb-2 h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <Sparkles size={24} color="#ffffff" />
                </View>
                <Text className="text-xs font-semibold text-white/90">Progress</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Content Section */}
        <View className="flex-1 px-6 pt-6">
          {/* Welcome Text */}
          <View className="mb-12 items-center">
            <Text className="mb-3 text-2xl font-bold text-slate-800">Chào mừng bạn đến!</Text>
            <Text className="text-center text-base leading-6 text-slate-600">
              Đăng nhập để bắt đầu hành trình chinh phục TOEIC của bạn
            </Text>
          </View>

          {/* Benefits */}
          <View className="mb-12 gap-4">
            <View className="flex-row items-center rounded-2xl bg-white p-4 shadow-sm">
              <View className="mr-4 h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-blue-50">
                <Shield size={24} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="mb-1 font-bold text-slate-800">Lưu tiến trình</Text>
                <Text className="text-sm text-slate-600">Theo dõi quá trình học tập của bạn</Text>
              </View>
            </View>

            <View className="flex-row items-center rounded-2xl bg-white p-4 shadow-sm">
              <View className="mr-4 h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-emerald-50">
                <Trophy size={24} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="mb-1 font-bold text-slate-800">Thành tích cá nhân</Text>
                <Text className="text-sm text-slate-600">Xem điểm số và thống kê chi tiết</Text>
              </View>
            </View>

            <View className="flex-row items-center rounded-2xl bg-white p-4 shadow-sm">
              <View className="mr-4 h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-purple-50">
                <Sparkles size={24} color="#8b5cf6" />
              </View>
              <View className="flex-1">
                <Text className="mb-1 font-bold text-slate-800">Học tập thông minh</Text>
                <Text className="text-sm text-slate-600">AI đề xuất nội dung phù hợp</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sign In Button */}
        <View className="px-6 pb-8">
          <TouchableOpacity
            onPress={signInWithGoogle}
            disabled={isLoading}
            className="mb-4 rounded-2xl shadow-lg"
            style={{
              shadowColor: '#3b82f6',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 24,
            }}>
            <LinearGradient
              colors={isLoading ? ['#94a3b8', '#64748b'] : ['#ffffff', '#f8fafc']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 16 }}
              className="flex-row items-center justify-center border border-slate-200 px-6 py-4">
              
              {isLoading ? (
                <ActivityIndicator size="small" color="#475569" />
              ) : (
                <>
                  {/* Google Logo SVG would go here, using LogIn icon for now */}
                  <View className="mr-4 h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                    <LogIn size={16} color="#475569" />
                  </View>
                  <Text className="text-lg font-bold text-slate-800">Tiếp tục với Google</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <Text className="text-center text-xs leading-5 text-slate-500">
            Bằng cách đăng nhập, bạn đồng ý với{' '}
            <Text className="font-semibold text-blue-600">Điều khoản dịch vụ</Text> và{' '}
            <Text className="font-semibold text-blue-600">Chính sách bảo mật</Text> của chúng tôi
          </Text>
        </View>
      </View>
    </View>
  );
}
