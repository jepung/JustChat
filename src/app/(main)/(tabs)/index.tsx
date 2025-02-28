import { View, Text } from "react-native";
import React from "react";
import { useAtomValue } from "jotai";
import profileAtom from "../../../store/profileStore";

const HomeScreen = () => {
  const profile = useAtomValue(profileAtom);
  return (
    <View>
      <Text>
        Hi, {profile?.full_name} - {profile?.username}{" "}
      </Text>
    </View>
  );
};

export default HomeScreen;
