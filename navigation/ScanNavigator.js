import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import scannerScreen from "../screens/scan/ScannerScreen";
import UserProfileScreen from "../screens/user/UserProfileScreen";
import SemiBoldText from "../constants/SemiBoldText";
import scanButtonScreen from "../screens/scan/ScanButtonScreen";
import LoginScreen from "../screens/user/LoginScreen";
import SignupScreen from "../screens/user/SignupScreen";
import ScanResultsScreen from "../screens/scan/ScanResultsScreen";
import WithdrawScreen from "../screens/user/WithdrawScreen";

const AppTab = createBottomTabNavigator();

const AppStack = createStackNavigator();

const ScanStack = createStackNavigator();

const AuthStack = createStackNavigator();

const UserStack = createStackNavigator();

export const UserStackNavigator = () => {
  return (
    <UserStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <UserStack.Screen
        name="User Profile"
        component={UserProfileScreen}
        options={{
          header: () => {},
        }}
      />
      <UserStack.Screen
        name="Withdraw"
        component={WithdrawScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.green,
          },
        }}
      />
    </UserStack.Navigator>
  );
};

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        header: () => {},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <AuthStack.Screen name="login" component={LoginScreen} />
      <AuthStack.Screen name="signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

const ScanStackNavigator = () => {
  return (
    <ScanStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <ScanStack.Screen
        name="Scan QR"
        component={scanButtonScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.green,
          },
        }}
      />
      <ScanStack.Screen
        name="Scan"
        component={scannerScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.green,
          },
        }}
      />
      <ScanStack.Screen
        name="All Scans"
        component={ScanResultsScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.green,
          },
        }}
      />
    </ScanStack.Navigator>
  );
};

export const AppTabNavigator = () => {
  return (
    <AppTab.Navigator
      screenOptions={{
        headerTitle: "",
        headerStyle: {
          height: "5%",
          elevation: 0,
          backgroundColor: Colors.forstGreen,
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.green,
          height: Dimensions.get("screen").width / 6,
        },
      }}
    >
      <AppTab.Screen
        name="Scanner"
        component={ScanStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabBarIcons}>
                {!focused ? (
                  <AntDesign
                    name="scan1"
                    size={focused ? 24 : 20}
                    color={Colors.black}
                  />
                ) : (
                  <View style={styles.tabBarIcons}>
                    <AntDesign
                      name="scan1"
                      size={focused ? 24 : 20}
                      color={Colors.black}
                    />
                    <SemiBoldText>Scan QR</SemiBoldText>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
      <AppTab.Screen
        name="User Profile"
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.tabBarIcons}>
                {!focused ? (
                  <FontAwesome
                    name="user"
                    size={focused ? 24 : 20}
                    color="black"
                  />
                ) : (
                  <View style={styles.tabBarIcons}>
                    <FontAwesome
                      name="user"
                      size={focused ? 24 : 20}
                      color="black"
                    />
                    <SemiBoldText>Profile</SemiBoldText>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
    </AppTab.Navigator>
  );
};

export const AppStackNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <AppStack.Screen
        name="App Tab"
        component={AppTabNavigator}
        options={{ header: () => {} }}
      />
      <AppStack.Screen
        name="Withdraw"
        component={WithdrawScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.green,
          },
        }}
      />
    </AppStack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarIcons: {
    alignItems: "center",
    justifyContent: "center",
  },
});
