import { View, Text } from "react-native";
import React from "react";
import { Redirect, Slot } from "expo-router";
import { isAuth } from "../_layout";

const MainLayout = () => {
  if (!isAuth) {
    return <Redirect href={"login"} />;
  }
  return <Slot />;
};

export default MainLayout;
