import React from "react";

import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const AppName = (props) => {
  return (
    <View style={styles.appName}>
      <View style={styles.smallDash}></View>
      <Text style={styles.appNameText}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  appName: {
    flexDirection: "row",
  },
  smallDash: {
    width: 20,
    height: 2,
    backgroundColor: Colors.green,
    marginTop: 15,
  },
  appNameText: { fontSize: 20, color: Colors.textColor },
});

export default AppName;
