import React from "react";
import { Redirect, Slot } from "expo-router";
import { isAuth } from "../_layout";

const AuthLayout = () => {
  if (isAuth) {
    return <Redirect href={"/(main)/(tabs)"} />;
  }
  return <Slot />;
};

export default AuthLayout;
