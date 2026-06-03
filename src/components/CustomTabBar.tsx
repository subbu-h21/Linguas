import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_WIDTH = SCREEN_WIDTH / TAB_COUNT;
const CIRCLE_SIZE = 50;
const PAD_TOP = 10;

type TabConfig = {
  routeName: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
};

const TAB_CONFIG: TabConfig[] = [
  { routeName: 'home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { routeName: 'learn', label: 'Learn', icon: 'book-outline', activeIcon: 'book' },
  {
    routeName: 'ai-teacher',
    label: 'AI Teacher',
    icon: 'sparkles-outline',
    activeIcon: 'sparkles',
  },
  {
    routeName: 'chat',
    label: 'Chat',
    icon: 'chatbubble-outline',
    activeIcon: 'chatbubble',
  },
  { routeName: 'profile', label: 'Profile', icon: 'person-outline', activeIcon: 'person' },
];

function getCircleX(index: number) {
  return index * TAB_WIDTH + (TAB_WIDTH - CIRCLE_SIZE) / 2;
}

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const circleX = useSharedValue(getCircleX(state.index));

  useEffect(() => {
    circleX.value = withSpring(getCircleX(state.index), {
      damping: 20,
      stiffness: 220,
      mass: 0.8,
    });
  }, [state.index]);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: circleX.value }],
  }));

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom > 0 ? insets.bottom : 12 }]}>
      {/* Sliding active circle — renders behind tab icons */}
      <Animated.View style={[styles.circle, circleStyle]} pointerEvents="none" />

      {/* Tab items */}
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const tab = TAB_CONFIG[index];
          if (!tab) return null;
          const isActive = state.index === index;

          function onPress() {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isActive && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tab}
              activeOpacity={0.75}
            >
              {/* Icon area — same height as circle for vertical alignment */}
              <View style={styles.iconSlot}>
                <Ionicons
                  name={isActive ? tab.activeIcon : tab.icon}
                  size={22}
                  color={isActive ? '#FFFFFF' : '#9CA3AF'}
                />
              </View>
              {!isActive && (
                <Text style={styles.label} numberOfLines={1}>
                  {tab.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    paddingTop: PAD_TOP,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 12,
  },
  circle: {
    position: 'absolute',
    top: PAD_TOP,
    left: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#6C4EF5',
    zIndex: 0,
  },
  row: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
  },
  iconSlot: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#9CA3AF',
    marginTop: 1,
    textAlign: 'center',
  },
});
