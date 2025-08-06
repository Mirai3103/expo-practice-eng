import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  User,
  LogOut,
  Settings,
  Trophy,
  Calendar,
  TrendingUp,
  Shield,
  HelpCircle,
  Star,
  Award,
} from 'lucide-react-native';
import { useAuth } from '~/hooks/useAuth';
import { Image } from 'expo-image';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const handleSignOut = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đăng xuất', style: 'destructive', onPress: signOut },
      ]
    );
  };

  const menuItems = [
    {
      icon: Trophy,
      title: 'Thành tích',
      subtitle: 'Xem điểm số và ranking',
      color: '#f59e0b',
      bgColor: '#fffbeb',
    },
    {
      icon: Calendar,
      title: 'Lịch sử luyện tập',
      subtitle: 'Theo dõi quá trình học',
      color: '#3b82f6',
      bgColor: '#eff6ff',
    },
    {
      icon: Settings,
      title: 'Cài đặt',
      subtitle: 'Tùy chỉnh ứng dụng',
      color: '#6b7280',
      bgColor: '#f9fafb',
    },
    {
      icon: HelpCircle,
      title: 'Trợ giúp',
      subtitle: 'FAQ và hỗ trợ',
      color: '#10b981',
      bgColor: '#f0fdf4',
    },
  ];

  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar barStyle="light-content" backgroundColor="#3b82f6" />
      
      {/* Header */}
      <View className="overflow-hidden rounded-b-3xl shadow-lg">
        <LinearGradient
          colors={['#3b82f6', '#8b5cf6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="pb-8 pt-10">
          
          <View className="items-center px-6">
            <View className="mb-4 h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white/20 shadow-lg">
              {/* <User size={40} color="#ffffff" /> */}
              <Image source={{
                uri:user?.user_metadata?.avatar_url,
              }} contentFit="cover" style={{borderRadius:100,width:80,height:80}}/>
            </View>
            
            <Text className="mb-2 text-2xl font-bold text-white">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
            </Text>
            
            <Text className="text-base text-white/80">
              {user?.email}
            </Text>
            
            <View className="mt-4 flex-row gap-6">
              <View className="items-center">
                <View className="mb-2 h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <Star size={24} color="#ffffff" />
                </View>
                <Text className="text-xs font-semibold text-white/90">Level 5</Text>
              </View>
              
              <View className="items-center">
                <View className="mb-2 h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <Award size={24} color="#ffffff" />
                </View>
                <Text className="text-xs font-semibold text-white/90">650 pts</Text>
              </View>
              
              <View className="items-center">
                <View className="mb-2 h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <TrendingUp size={24} color="#ffffff" />
                </View>
                <Text className="text-xs font-semibold text-white/90">12 days</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      <ScrollView className="flex-1 p-6">
        {/* Stats Cards */}
        <View className="mb-8 flex-row gap-4">
          <View
            className="flex-1 items-center rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            style={{
              shadowColor: '#3b82f6',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
            }}>
            <Text className="mb-1 text-2xl font-bold text-slate-800">47</Text>
            <Text className="text-xs text-slate-600">Bài đã làm</Text>
          </View>
          
          <View
            className="flex-1 items-center rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            style={{
              shadowColor: '#10b981',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
            }}>
            <Text className="mb-1 text-2xl font-bold text-slate-800">78%</Text>
            <Text className="text-xs text-slate-600">Độ chính xác</Text>
          </View>
          
          <View
            className="flex-1 items-center rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            style={{
              shadowColor: '#f59e0b',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
            }}>
            <Text className="mb-1 text-2xl font-bold text-slate-800">5h</Text>
            <Text className="text-xs text-slate-600">Thời gian học</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mb-8 gap-3">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              style={{
                shadowColor: item.color,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
              }}>
              
              <View
                className="mr-4 h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: item.bgColor }}>
                <item.icon size={24} color={item.color} />
              </View>
              
              <View className="flex-1">
                <Text className="mb-1 text-base font-bold text-slate-800">
                  {item.title}
                </Text>
                <Text className="text-sm text-slate-600">
                  {item.subtitle}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          onPress={handleSignOut}
          className="mb-8 rounded-2xl shadow-sm"
          style={{
            shadowColor: '#ef4444',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
          }}>
          <LinearGradient
            colors={['#fef2f2', '#fecaca']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 16 }}
            className="flex-row items-center justify-center border border-red-100 p-4">
            
            <LogOut size={24} color="#ef4444" />
            <Text className="ml-3 text-lg font-bold text-red-600">
              Đăng xuất
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
