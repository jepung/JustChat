import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  AppState,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";
import * as EmailValidator from "email-validator";
import { AuthService } from "../services/auth.service";

interface IAuthProps {
  type: "login" | "register";
}

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const Auth = ({ type }: IAuthProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSecure, setIsSecure] = useState<boolean>(true);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const isButtonDisabled = useMemo(() => {
    return password.length < 6 || !EmailValidator.validate(email);
  }, [email, password]);

  const resetState = () => {
    setEmail("");
    setPassword("");
    setIsSecure(true);
  };

  const switchPageHandler = () => {
    resetState();
    if (type === "login") {
      return router.push("/register");
    }
    return router.back();
  };

  const loginHandler = async () => {
    setIsButtonLoading(true);
    const { error } = await AuthService.login(email, password);
    setIsButtonLoading(false);

    if (error) {
      return Alert.alert("Failed", error.message);
    }
  };

  const registerHandler = async () => {
    setIsButtonLoading(true);
    const { error } = await AuthService.register(email, password);
    setIsButtonLoading(false);

    if (error) {
      return Alert.alert("Failed", error.message);
    }

    return Alert.alert("Success", "Check your email");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 50, fontWeight: 600, color: COLORS.red }}>
          {type === "login" ? "Hello" : "Welcome"}
        </Text>
        <Text style={{ fontSize: 50, fontWeight: 600 }}>
          {type === "login" ? "there" : "newcomers"}!
        </Text>
      </View>
      <View style={{ marginTop: 20, gap: 15 }}>
        <View style={styles.inputContainer}>
          <AntDesign name="mail" size={22} color={"gray"} />
          <TextInput
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter your email"
            style={{ flex: 1, fontSize: 16 }}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={22} color={"gray"} />
          <TextInput
            secureTextEntry={isSecure}
            autoCapitalize="none"
            placeholder="Enter your password"
            style={{ flex: 1, fontSize: 16 }}
            value={password}
            onChangeText={setPassword}
          />
          <AntDesign
            name={isSecure ? "eyeo" : "eye"}
            size={20}
            onPress={() => setIsSecure(!isSecure)}
          />
        </View>
        <Pressable
          onPress={type === "login" ? loginHandler : registerHandler}
          disabled={isButtonDisabled || isButtonLoading}
          style={{
            backgroundColor: isButtonDisabled ? "lightgray" : COLORS.red,
            padding: 12,
            borderRadius: 20,
            marginTop: 10,
          }}
        >
          {isButtonLoading ? (
            <View>
              <ActivityIndicator size={18} color={"white"} />
            </View>
          ) : (
            <Text style={{ textAlign: "center", color: "white" }}>
              Sign {type === "login" ? "In" : "Up"}
            </Text>
          )}
        </Pressable>
      </View>
      <View style={{ marginTop: 12, flex: 1 }}>
        <Text style={{ textAlign: "center", color: "gray", fontSize: 12 }}>
          {type === "login"
            ? "Dont have an account?"
            : "Already have an account?"}{" "}
          <Text
            onPress={switchPageHandler}
            style={{ color: COLORS.red, fontWeight: "bold" }}
          >
            {type === "login" ? "Create an account" : "Login"}
          </Text>
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 12, textAlign: "center" }}>
          Made with <AntDesign name="heart" color={COLORS.red} /> by jepung
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, flex: 1 },
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
