import React from "react";
import { Stack } from "expo-router";

export const isAuth = false;
const AppLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
};

export default AppLayout;
