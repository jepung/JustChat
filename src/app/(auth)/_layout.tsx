import { Redirect, Stack } from "expo-router";
import { useAtomValue } from "jotai";
import React from "react";
import sessionAtom from "../../store/authStore";

const AuthLayout = () => {
  const session = useAtomValue(sessionAtom);

  if (session) {
    return <Redirect href={"/(main)"} />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default AuthLayout;
