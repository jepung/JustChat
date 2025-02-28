import { useAtomValue } from "jotai";
import React from "react";
import { Text, View } from "react-native";
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
