import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
        <Text style={[styles.iconText, { color: iconColor }]}>{icon}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 10,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Poppins-Bold",
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#001132",
  },
});
