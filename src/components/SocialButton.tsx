import { Text, TouchableOpacity, View } from "react-native";

interface SocialButtonProps {
  label: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  onPress?: () => void;
}

export default function SocialButton({
  label,
  icon,
  iconBg,
  iconColor,
  onPress,
}: SocialButtonProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-center bg-background border-[1.5px] border-border rounded-lg py-3.5 px-5 gap-2.5"
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View
        className="w-7 h-7 rounded-full items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        <Text
          className="text-body-md font-poppins-bold"
          style={{ color: iconColor }}
        >
          {icon}
        </Text>
      </View>
      <Text className="text-body-md font-poppins-semibold text-foreground">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
