import { Redirect, router, Stack } from "expo-router";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { ProfileService } from "../../services/profile.service";
import sessionAtom from "../../store/authStore";
import profileAtom from "../../store/profileStore";

const MainLayout = () => {
  const session = useAtomValue(sessionAtom);
  const setProfile = useSetAtom(profileAtom);

  const checkUserProfile = async () => {
    const { data } = await ProfileService.getProfile(session!);
    if (!data) {
      return router.replace("/complete-profile");
    } else {
      setProfile(data);
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
