import React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants/theme";
import { Persona, PersonaId } from "../types/chat";

interface PersonaSelectorProps {
  personas: Persona[];
  activeId: PersonaId | null;
  onSelect: (id: PersonaId) => void;
}

export const PersonaSelector = ({
  personas,
  activeId,
  onSelect,
}: PersonaSelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Mentors</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {personas.map((persona) => {
          const isActive = persona.id === activeId;
          return (
            <Pressable
              key={persona.id}
              onPress={() => onSelect(persona.id)}
              style={({ pressed }) => [
                styles.item,
                isActive && styles.activeItem,
                pressed && { backgroundColor: "rgba(255, 255, 255, 0.05)" },
              ]}
            >
              <View style={[styles.dot, { backgroundColor: persona.color }]} />
              <Text style={[styles.name, isActive && styles.activeName]}>
                {persona.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "700",
    color: "#676767",
    paddingHorizontal: 12,
    paddingVertical: 12,
    textTransform: "uppercase",
  },
  scrollContent: {
    gap: 4,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    gap: 12,
  },
  activeItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  name: {
    fontSize: 14,
    color: "#ececec",
    fontWeight: "500",
  },
  activeName: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
