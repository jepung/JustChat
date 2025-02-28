import React from "react";
import { Alert, View } from "react-native";
import Button from "../../components/Button";
import { AuthService } from "../../services/auth.service";

const SettingsScreen = () => {
  const logoutHandler = async () => {
    const { error } = await AuthService.logout();
    if (error) {
      return Alert.alert("Failed", error.message);
    }
    return Alert.alert("Success", "Redirected to login");
  };
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Button text="Logout" onPress={logoutHandler} />
    </View>
  );
};

export default SettingsScreen;
