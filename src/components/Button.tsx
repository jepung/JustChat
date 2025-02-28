import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";

interface IButtonProps extends PressableProps {
  type?: string;
  isLoading?: boolean;
  text: string;
}

const Button = ({ disabled, text, isLoading, onPress }: IButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "lightgray" : COLORS.red,
        padding: 12,
        borderRadius: 20,
        marginTop: 10,
      }}
    >
      {isLoading ? (
        <View>
          <ActivityIndicator size={18} color={"white"} />
        </View>
      ) : (
        <Text style={{ textAlign: "center", color: "white" }}>{text}</Text>
      )}
    </Pressable>
  );
};

export default Button;
