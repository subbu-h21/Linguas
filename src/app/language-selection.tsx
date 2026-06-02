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
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text className="flex-1 text-center text-h4 font-poppins-semibold text-foreground">
          Choose a language
        </Text>
        <View style={styles.backBtn} />
      </View>

      {/* Search */}
      <View className="px-5 mb-5">
        <View style={styles.searchRow}>
          <Text style={styles.searchIcon}>🔍</Text>
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
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
        style={styles.earth}
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
        style={styles.flag}
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
        <View style={styles.checkCircle}>
          <Text style={styles.checkText}>✓</Text>
        </View>
      ) : (
        <Text style={styles.chevron}>›</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 28,
    color: "#001132",
    lineHeight: 36,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F7FB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    gap: 8,
  },
  searchIcon: {
    fontSize: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#001132",
    padding: 0,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  separator: {
    height: 12,
  },
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
  flag: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F6F7FB",
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#4D88FF",
    alignItems: "center",
    justifyContent: "center",
  },
  checkText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  chevron: {
    fontSize: 22,
    color: "#6B7280",
    lineHeight: 28,
  },
  earth: {
    width: "80%",
    height: 120,
    alignSelf: "center",
  },
});
