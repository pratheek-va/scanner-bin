import React, { useState } from "react";
import { AppStackNavigator, AuthStackNavigator } from "./ScanNavigator";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import StartupScreen from "../screens/StartupScreen";

const AppNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <AppStackNavigator />}
      {!isAuth && didTryAutoLogin && <AuthStackNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
