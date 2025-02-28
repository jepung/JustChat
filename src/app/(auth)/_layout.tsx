import React from "react";
import { Redirect, Slot, Stack } from "expo-router";
import { useAtomValue } from "jotai";
import { sessionAtom } from "../../store/authStore";
import { supabase } from "../../lib/supabase";

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
