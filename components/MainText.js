import React from "react";

import { StyleSheet, View, Text } from "react-native";
import SemiBoldText from "../constants/SemiBoldText";
import Colors from "../constants/Colors";

const MainText = (props) => {
  return (
    <View style={styles.loginFormComponent2}>
      <SemiBoldText style={styles.mainText}>{props.children}</SemiBoldText>
      <View style={styles.bigDash}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainText: {
    fontSize: 55,
    padding: 20,
    color: Colors.textColor,
  },
  bigDash: {
    width: 100,
    height: 5,
    backgroundColor: Colors.textColor,
    alignSelf: "center",
  },
});

export default MainText;
