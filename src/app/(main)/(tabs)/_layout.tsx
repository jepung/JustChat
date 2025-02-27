import React from "react";
import { Tabs } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          tabBarShowLabel: false,
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          headerTitle: "Chats",
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
