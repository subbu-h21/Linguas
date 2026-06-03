import { Tabs } from 'expo-router';
import CustomTabBar from '@/components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="home" options={{ headerShown: false, title: 'Home' }} />
      <Tabs.Screen name="learn" options={{ headerShown: false, title: 'Learn' }} />
      <Tabs.Screen name="ai-teacher" options={{ headerShown: false, title: 'AI Teacher' }} />
      <Tabs.Screen name="chat" options={{ headerShown: false, title: 'Chat' }} />
      <Tabs.Screen name="profile" options={{ headerShown: false, title: 'Profile' }} />
    </Tabs>
  );
}
