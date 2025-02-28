import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Redirect, router, Slot, Stack } from "expo-router";
import { useAtomValue } from "jotai";
import { sessionAtom } from "../../store/authStore";
import { supabase } from "../../lib/supabase";

const MainLayout = () => {
  const session = useAtomValue(sessionAtom);

  if (!session) {
    return <Redirect href={"login"} />;
  }

  const checkUserProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", session.user.id)
      .single();

    if (!data) {
      return router.replace("/complete-profile");
    }
  };

  useEffect(() => {
    if (session) {
      checkUserProfile();
    }
  }, [session]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="complete-profile" />
    </Stack>
  );
};

export default MainLayout;
