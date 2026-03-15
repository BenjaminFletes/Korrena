import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Calendario",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="calendar" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="aprendizaje"
        options={{
          title: "Aprender",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="book" color={color} />
          ),
        }}
      />

      {/* NUEVA PESTAÑA DE TERAPIA */}
      <Tabs.Screen
        name="terapia"
        options={{
          title: "Terapia IA",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="heartbeat" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
