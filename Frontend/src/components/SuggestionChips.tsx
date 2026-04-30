import React from "react";
import { StyleSheet, ScrollView, Pressable, Text, View } from "react-native";
import { COLORS, SPACING } from "../constants/theme";

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  accentColor?: string;
}

export const SuggestionChips = ({
  suggestions,
  onSelect,
  accentColor = COLORS.accent,
}: SuggestionChipsProps) => {
  if (!suggestions.length) return null;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {suggestions.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => onSelect(item)}
            style={({ pressed }) => [
              styles.chip,
              { borderColor: accentColor },
              pressed && { backgroundColor: `${accentColor}10` },
            ]}
          >
            <Text style={[styles.text, { color: COLORS.text.secondary }]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.md,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
