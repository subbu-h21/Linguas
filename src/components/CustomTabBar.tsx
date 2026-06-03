import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useEffect } from 'react';

const TAB_COUNT = 5;
const CIRCLE_SIZE = 50;
const PAD_TOP = 10;

type TabConfig = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
};

type TabBarProps = {
  state: {
    index: number;
    routes: { key: string; name: string }[];
  };
  navigation: {
    emit: (event: {
      type: string;
      target: string;
      canPreventDefault: boolean;
    }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
};

// Keyed by route name so lookup is always correct regardless of route order
const TAB_CONFIG: Record<string, TabConfig> = {
  home: { label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  learn: { label: 'Learn', icon: 'book-outline', activeIcon: 'book' },
  'ai-teacher': { label: 'AI Teacher', icon: 'sparkles-outline', activeIcon: 'sparkles' },
  chat: { label: 'Chat', icon: 'chatbubble-outline', activeIcon: 'chatbubble' },
  profile: { label: 'Profile', icon: 'person-outline', activeIcon: 'person' },
};

function getCircleX(index: number, tabWidth: number) {
  return index * tabWidth + (tabWidth - CIRCLE_SIZE) / 2;
}

export default function CustomTabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const tabWidth = width / TAB_COUNT;

  const circleX = useSharedValue(getCircleX(state.index, tabWidth));

  useEffect(() => {
    circleX.value = withSpring(getCircleX(state.index, tabWidth), {
      damping: 20,
      stiffness: 220,
      mass: 0.8,
    });
  }, [state.index, tabWidth, circleX]);

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
          const tab = TAB_CONFIG[route.name];
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
              accessibilityRole="button"
              accessibilityLabel={`${tab.label} tab`}
              accessibilityState={{ selected: isActive }}
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
