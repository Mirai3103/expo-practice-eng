import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import theme from '~/theme';
import HomeIcon from '~/components/icons/HomeIcon';
import QuizIcon from '~/components/icons/QuizIcon';
import RankIcon from '~/components/icons/RankIcon';
import UserIcon from '~/components/icons/UserIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary[500],
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon fill={color} />,
          headerShown: false,
          sceneStyle:{
          }
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color }) => <QuizIcon fill={color} />,
        }}
      />
      <Tabs.Screen
        name="rank"
        options={{
          title: 'Rank',
          tabBarIcon: ({ color }) => <RankIcon fill={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UserIcon fill={color} />,
        }}
      />
    </Tabs>
  );
}
