import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { TextInput } from "react-native";
import { Octicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { supabase } from "../../lib/supabase";
import { useAtomValue } from "jotai";
import { sessionAtom } from "../../store/authStore";
import { router } from "expo-router";
import { REGEX } from "../../constants/regex";

const PLACEHOLDER_AVATAR_URI = "https://avatar.iran.liara.run/public/boy";
const CompleteProfileScreen = () => {
  const session = useAtomValue(sessionAtom);
  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [avatar, setAvatar] = useState<ImagePicker.ImagePickerAsset | null>();
  const [isButtonSubmitLoading, setIsButtonSubmitLoading] =
    useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const isButtonSubmitDisabled = useMemo(() => {
    return (
      username.length < 3 ||
      !REGEX.username.test(username) ||
      fullName.length < 3 ||
      !REGEX.fullName.test(fullName)
    );
  }, [username, fullName]);

  const resetState = () => {
    setIsButtonSubmitLoading(false);
    setUsername("");
    setFullName("");
    setAvatar(null);
  };

  const imagePickerHandler = async () => {
    bottomSheetRef.current?.close();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: false,
      allowsEditing: true,
      quality: 1,
      exif: false,
    });
    if (result.canceled || !result.assets) {
      return;
    }
    setAvatar(result.assets[0]);
  };

  const uploadImageHandler = async (): Promise<{
    data: {
      id: string;
      path: string;
      fullPath: string;
    } | null;
    error: Error | null;
  }> => {
    const imageBuffer = await fetch(avatar?.uri ?? PLACEHOLDER_AVATAR_URI).then(
      (data) => data.arrayBuffer()
    );
    const imageExt = avatar?.uri.split(".").pop()?.toLowerCase() ?? "jpeg";

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`${Date.now()}.${imageExt}`, imageBuffer, {
        contentType: avatar?.mimeType ?? "image/jpeg",
      });

    if (error) {
      return {
        data: null,
        error,
      };
    }

    return {
      data,
      error: null,
    };
  };

  const submitHandler = async () => {
    setIsButtonSubmitLoading(true);
    try {
      const { data: avatar, error: uploadImageError } =
        await uploadImageHandler();
      if (uploadImageError) {
        return Alert.alert("Failed", uploadImageError.message);
      }

      const userData = {
        id: session?.user.id,
        username,
        full_name: fullName,
        avatar_url: avatar?.path,
        email: session?.user.email,
        updated_at: new Date(),
      };

      const { error: uploadProfileError } = await supabase
        .from("profiles")
        .upsert(userData);

      if (uploadProfileError) {
        return Alert.alert("Failed", uploadProfileError.message);
      }

      return Alert.alert("Success", "Profile updated", [
        { onPress: () => router.replace("/(main)/(tabs)") },
      ]);
    } catch (e) {
      if (e instanceof Error) {
        return Alert.alert("Failed", e.message);
      }
    } finally {
      resetState();
    }
  };

  useEffect(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ fontSize: 50, fontWeight: 600, color: COLORS.red }}>
          Complete
        </Text>
        <Text style={{ fontSize: 50, fontWeight: 600 }}>your profile</Text>
      </View>
      <View style={{ marginTop: 30, gap: 15, flex: 1 }}>
        <Pressable
          onPress={() => bottomSheetRef.current?.expand()}
          style={{
            width: 150,
            height: 150,
            marginBottom: 20,
            backgroundColor: "gray",
            alignSelf: "center",
            borderRadius: 150,
            overflow: "hidden",
          }}
        >
          <Image
            source={{
              uri: avatar?.uri ?? PLACEHOLDER_AVATAR_URI,
            }}
            style={{ width: 150, height: 150 }}
          />
        </Pressable>
        <View style={styles.inputContainer}>
          <Octicons name="person" size={25} color={"gray"} />
          <TextInput
            keyboardType="default"
            autoCapitalize="none"
            placeholder="Enter your full name"
            style={{ flex: 1, fontSize: 16 }}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Octicons name="mention" size={20} color={"gray"} />
          <TextInput
            keyboardType="default"
            autoCapitalize="none"
            placeholder="Enter your username"
            style={{ flex: 1, fontSize: 16 }}
            value={username}
            onChangeText={setUsername}
          />
        </View>
      </View>
      <View>
        <Pressable
          onPress={submitHandler}
          disabled={isButtonSubmitLoading || isButtonSubmitDisabled}
          style={{
            backgroundColor: isButtonSubmitDisabled ? "lightgray" : COLORS.red,
            padding: 12,
            borderRadius: 20,
            marginTop: 10,
          }}
        >
          {isButtonSubmitLoading ? (
            <View>
              <ActivityIndicator size={18} color={"white"} />
            </View>
          ) : (
            <Text style={{ textAlign: "center", color: "white" }}>
              Continue
            </Text>
          )}
        </Pressable>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enableDynamicSizing
        enablePanDownToClose
      >
        <BottomSheetView>
          <SafeAreaView edges={["bottom"]}>
            <TouchableOpacity
              onPress={imagePickerHandler}
              style={{ padding: 10 }}
            >
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                Choose Image
              </Text>
            </TouchableOpacity>
            <Pressable
              style={{ padding: 10 }}
              onPress={() => {
                setAvatar(null);
                bottomSheetRef.current?.close();
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                Remove Image
              </Text>
            </Pressable>
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default CompleteProfileScreen;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 30, flex: 1 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 100,
    gap: 10,
  },
});
