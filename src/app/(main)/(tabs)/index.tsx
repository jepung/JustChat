import { useAtomValue } from "jotai";
import React from "react";
import { Image, Text, View } from "react-native";
import profileAtom from "../../../store/profileStore";
import { Pressable, ScrollView } from "react-native-gesture-handler";

const HomeScreen = () => {
  const profile = useAtomValue(profileAtom);

  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: "white", flex: 1 }}
      style={{ backgroundColor: "white" }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
          backgroundColor: "white",
          paddingVertical: 20,
          paddingHorizontal: 30,
        }}
      >
        <Image
          source={{ uri: profile?.avatar_url }}
          style={{ width: 60, height: 60 }}
        />
        <View style={{ gap: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {profile?.full_name}
          </Text>
          <Text style={{ fontSize: 14 }}>@{profile?.username}</Text>
        </View>
      </Pressable>
      <View style={{ height: 1, backgroundColor: "lightgray" }} />
    </ScrollView>
  );
};

export default HomeScreen;
