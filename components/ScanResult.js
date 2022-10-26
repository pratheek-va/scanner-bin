import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import BoldText from "../constants/BoldText";
import Colors from "../constants/Colors";

const ScanResult = (props) => {
  return (
    <View style={styles.centered}>
      <View style={styles.scanResultContainer}>
        <BoldText>EARNED: {props.moneyEarned}</BoldText>
        <BoldText>{props.date}</BoldText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scanResultContainer: {
    borderColor: Colors.green,
    borderWidth: 5,
    flexDirection: "row",
    width: Dimensions.get("screen").width - 50,
    paddingVertical: Dimensions.get("screen").width / 20,
    justifyContent: "space-between",
    paddingHorizontal: Dimensions.get("screen").width / 15,
  },
  centered: {
    margin: 20,
    alignItems: "center",
  },
});
export default ScanResult;
