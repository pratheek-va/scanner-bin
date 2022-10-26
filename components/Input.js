import React, { useReducer, useEffect } from "react";
import Colors from "../constants/Colors";
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";

import { Text, View, StyleSheet, TextInput, Dimensions } from "react-native";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };

    case INPUT_BLUR:
      return { ...state, touched: true };

    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue,
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: "INPUT_CHANGE", value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  const Icon = props.icon;

  return (
    <View style={{ ...styles.signupInputs, ...props.style }}>
      <View style={styles.inputAlign}>
        <MaterialIcons name={props.name} size={20} color="white" />
        <AntDesign
          style={styles.arrowStyle}
          name="arrowright"
          size={20}
          color="white"
        />
        <TextInput
          {...props}
          style={styles.userInputs}
          value={inputState.value}
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
        />
      </View>
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  arrowStyle: {
    marginHorizontal: 10,
  },
  userInput: {
    color: Colors.textColor,
    borderBottomColor: "rgba(255,255,255,0.3)",
    borderBottomWidth: 1,
  },
  userInputText: {
    color: Colors.textColor,
  },
  signupInputs: {
    color: Colors.textColor,
    marginBottom: 15,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "open-sans",
    color: "red",
    fontSize: 13,
  },
  inputAlign: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    marginTop: Dimensions.get("window").width / 12,
    padding: 5,
  },
  userInputs: {
    color: Colors.textColor,
    flex: 1,
  },
});

export default Input;
