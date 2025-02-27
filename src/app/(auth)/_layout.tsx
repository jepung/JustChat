import React from "react";
import { Redirect, Slot, Stack } from "expo-router";
import { isAuth } from "../_layout";

const AuthLayout = () => {
  if (isAuth) {
    return <Redirect href={"/(main)/(tabs)"} />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default AuthLayout;
