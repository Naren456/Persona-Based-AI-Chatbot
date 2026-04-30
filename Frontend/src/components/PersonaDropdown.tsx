import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Modal, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS } from "../constants/theme";
import { Persona, PersonaId } from "../types/chat";

interface PersonaDropdownProps {
  personas: Persona[];
  activeId: PersonaId | null;
  onSelect: (id: PersonaId) => void;
}

export const PersonaDropdown = ({
  personas,
  activeId,
  onSelect,
}: PersonaDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const activePersona = personas.find((p) => p.id === activeId);

  const handleSelect = (id: PersonaId) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setIsOpen(true)}
        style={({ pressed }) => [
          styles.trigger,
          pressed && { opacity: 0.7 },
        ]}
      >
        <Text style={styles.triggerText}>
          {activePersona?.name || "Select Mentor"}
        </Text>
        <Ionicons name="chevron-down" size={16} color={COLORS.secondary} />
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.overlay}>
            <View style={styles.dropdown}>
              {personas.map((persona) => {
                const isActive = persona.id === activeId;
                return (
                  <Pressable
                    key={persona.id}
                    onPress={() => handleSelect(persona.id)}
                    style={({ pressed }) => [
                      styles.item,
                      isActive && styles.activeItem,
                      pressed && { backgroundColor: "rgba(255, 255, 255, 0.05)" },
                    ]}
                  >
                    <View style={[styles.dot, { backgroundColor: persona.color }]} />
                    <View style={styles.itemInfo}>
                      <Text style={[styles.itemName, isActive && { color: "#ffffff" }]}>
                        {persona.name}
                      </Text>
                      <Text style={styles.itemRole}>{persona.accent}</Text>
                    </View>
                    {isActive && (
                      <Ionicons name="checkmark" size={20} color={COLORS.accent} />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  triggerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    paddingTop: 60,
    paddingHorizontal: 12,
  },
  dropdown: {
    backgroundColor: "#2f2f2f",
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    ...SHADOWS.md,
    minWidth: 200,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    gap: 12,
  },
  activeItem: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ececec",
  },
  itemRole: {
    fontSize: 12,
    color: "#b4b4b4",
    marginTop: 2,
  },
});
