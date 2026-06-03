import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F7FB' }} edges={['top']}>
      <View className="flex-1 justify-center items-center gap-2">
        <Text className="text-h2 font-poppins-bold text-foreground">Profile</Text>
        <Text className="text-body-md font-poppins text-muted">Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
