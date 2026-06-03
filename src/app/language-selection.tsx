import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import type { Language } from "@/types/learning";

export default function LanguageSelection() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("es");
  const [search, setSearch] = useState("");

  const filtered = languages.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleConfirm() {
    router.back();
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right"]}
    >
      {/* Header */}
      <View className="flex-row items-center px-5 pt-2 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Text className="text-[28px] text-foreground leading-9">‹</Text>
        </TouchableOpacity>
        <Text className="flex-1 text-center text-h4 font-poppins-semibold text-foreground">
          Choose a language
        </Text>
        <View style={styles.backBtn} />
      </View>

      {/* Search */}
      <View className="px-5 mb-5">
        <View className="flex-row items-center bg-[#F6F7FB] rounded-xl px-3.5 py-[11px] gap-2">
          <Text className="text-[15px]">🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search languages"
            placeholderTextColor="#6B7280"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Language List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <Text className="text-h4 font-poppins-semibold text-foreground mb-3">
            Popular
          </Text>
        )}
        renderItem={({ item }) => (
          <LanguageRow
            language={item}
            isSelected={item.id === selectedId}
            onSelect={() => setSelectedId(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-3" />}
        showsVerticalScrollIndicator={false}
      />

      {/* Continue button */}
      <View className="px-5 pt-3 pb-2">
        <TouchableOpacity
          className="btn--primary"
          onPress={handleConfirm}
          activeOpacity={0.85}
        >
          <Text className="btn__text--light">Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Earth illustration */}
      <Image
        source={images.earth}
        className="w-[80%] h-[120px] self-center"
        resizeMode="cover"
      />
    </SafeAreaView>
  );
}

function LanguageRow({
  language,
  isSelected,
  onSelect,
}: {
  language: Language;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.75}
      style={[styles.langRow, isSelected && styles.langRowSelected]}
    >
      <Image
        source={{ uri: language.flag }}
        className="w-11 h-11 rounded-full bg-[#F6F7FB]"
        resizeMode="cover"
      />
      <View className="flex-1 ml-3">
        <Text className="text-body-lg font-poppins-semibold text-foreground">
          {language.name}
        </Text>
        <Text className="text-body-sm font-poppins text-muted">
          {language.learners} learners
        </Text>
      </View>
      {isSelected ? (
        <View className="w-7 h-7 rounded-full bg-[#4D88FF] items-center justify-center">
          <Text className="text-white text-sm font-bold">✓</Text>
        </View>
      ) : (
        <Text className="text-[22px] text-muted leading-7">›</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // SafeAreaView — className not supported
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  // TouchableOpacity — exception per style rules
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  // TextInput — exception per style rules
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#001132",
    padding: 0,
  },
  // FlatList contentContainerStyle — exception per style rules
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  // TouchableOpacity with conditional selected state — exception per style rules
  langRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  langRowSelected: {
    borderColor: "#6C4EF5",
    backgroundColor: "#F5F2FF",
  },
});
