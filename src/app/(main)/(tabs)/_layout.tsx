import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React from "react";
import ChatProvider from "../../../providers/ChatProvider";

const TabsLayout = () => {
  return (
    <ChatProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: "Home",
            tabBarShowLabel: false,
            tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
            headerRight: () => (
              <AntDesign
                name="setting"
                size={24}
                color={"black"}
                style={{ marginRight: 20 }}
                onPress={() => router.push("settings")}
              />
            ),
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
    </ChatProvider>
  );
};

export default TabsLayout;
