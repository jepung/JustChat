import { Stack } from "expo-router";
import AuthProvider from "../providers/AuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AppLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(main)" />
        </Stack>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default AppLayout;
