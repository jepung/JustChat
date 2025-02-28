import { Redirect, router, Stack } from "expo-router";
import { useAtomValue } from "jotai";
import React from "react";
import { ProfileService } from "../../services/profile.service";
import sessionAtom from "../../store/authStore";

const MainLayout = () => {
  const session = useAtomValue(sessionAtom);

  const checkUserProfile = async () => {
    const { data } = await ProfileService.getProfile(session!);
    if (!data) {
      return router.replace("/complete-profile");
    }
  };

  if (!session) {
    return <Redirect href={"login"} />;
  } else {
    checkUserProfile();
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="complete-profile" />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          headerTitle: "Settings",
        }}
      />
    </Stack>
  );
};

export default MainLayout;
