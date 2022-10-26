import React from "react";

import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import BoldText from "../constants/BoldText";

const MainButton = (props) => {
  return (
    <View style={styles.button}>
      <View style={styles.buttonComponent}>
        <View
          style={{
            ...styles.dash,
            backgroundColor: props.form ? "#fff" : props.style.backgroundColor,
          }}
        ></View>
        <BoldText
          style={{
            ...styles.text,
            color: props.style.color,
          }}
        >
          {props.children}
        </BoldText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    borderWidth: 3,
    borderColor: Colors.green,
    padding: 12,
  },
  buttonComponent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dash: {
    flex: 1,
    marginRight: 12,
    height: 5,
    marginTop: 7,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "700",
    color: Colors.textColor,
  },
});

export default MainButton;
