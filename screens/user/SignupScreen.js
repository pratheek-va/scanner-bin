import React, { useState, useReducer, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from "../../constants/Colors";
import AppName from "../../components/AppName";
import MainButton from "../../components/MainButton";
import MainText from "../../components/MainText";
import * as authActions from "../../store/actions/auth";
import Input from "../../components/Input";

const image = { uri: "https://wallpapercave.com/wp/wp4825549.jpg" };

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATEE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities)
      updatedForm = updatedFormIsValid && updatedValidities[key];

    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const SignupScreen = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occured!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      fullName: "",
      email: "",
      password: "",
    },
    inputValidities: {
      fullName: false,
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const signupHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        authActions.signup(
          formState.inputValues.fullName,
          formState.inputValues.email,
          formState.inputValues.password
        )
      );
      props.navigation.navigate({ name: "login" });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.signupFormContainer}>
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.green} />
          </View>
        )}
        <AppName>ScannerBin</AppName>
        <MainText>Signup</MainText>
        <KeyboardAvoidingView behavior="padding">
          <Input
            id="fullName"
            onInputChange={inputChangeHandler}
            intialValue=""
            initiallyValid={false}
            errorMessage="Please enter a valild input"
            name="person"
          />
          <Input
            id="email"
            onInputChange={inputChangeHandler}
            intialValue=""
            initiallyValid={false}
            email
            errorMessage="Please enter a valid email!"
            name="email"
            required
          />
          <Input
            id="password"
            secureTextEntry
            onInputChange={inputChangeHandler}
            intialValue=""
            initiallyValid={false}
            required
            minLength={8}
            errorMessage="Please enter a valid password"
            name="lock"
            style={{ marginBottom: Dimensions.get("screen").width / 5 }}
          />
        </KeyboardAvoidingView>

        <TouchableOpacity onPress={signupHandler}>
          <MainButton form={true} style={styles.text}>
            signup now
          </MainButton>
        </TouchableOpacity>
        <View style={styles.userExists}>
          <Text style={styles.text}>Already a user?</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate({
                name: "login",
              });
            }}
          >
            <Text style={styles.text}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  text: {
    color: Colors.textColor,
    fontWeight: "700",
  },
  image: {
    height: "100%",
  },
  signupFormContainer: {
    flex: 1,
    padding: 50,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },

  userExists: {
    color: Colors.textColor,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  userInputText: {
    color: Colors.textColor,
  },
  signupInputs: {
    color: Colors.textColor,
    marginBottom: 15,
    borderBottomColor: "rgba(255,255,255,0.3)",
    borderBottomWidth: 1,
  },
});

export default SignupScreen;
