import React, { useReducer, useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import Colors from "../../constants/Colors";
import AppName from "../../components/AppName";
import MainButton from "../../components/MainButton";
import MainText from "../../components/MainText";
import Input from "../../components/Input";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as authActions from "../../store/actions/auth";

const image = {
  uri: "https://wallpaperboat.com/wp-content/uploads/2019/09/nature-Bavaria-photos.jpg",
};

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

const LoginScreen = (props) => {
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
      email: "",
      password: "",
    },
    inputValidities: {
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

  const loginHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        authActions.login(
          formState.inputValues.email,
          formState.inputValues.password
        )
      );
      // props.navigation.navigate({ name: "TabNavigator" });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.loginFormContainer}>
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.green} />
          </View>
        )}
        <View style={styles.loginFormComponent1}>
          <AppName>ScannerBin</AppName>
          <MainText>Login</MainText>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
            <View style={styles.loginInputField}>
              <KeyboardAvoidingView behavior="padding">
                <Input
                  id="email"
                  email
                  onInputChange={inputChangeHandler}
                  intialValue=""
                  initiallyValid={false}
                  errorMessage="Please enter a valid email"
                  name="email"
                  required
                />
                <Input
                  id="password"
                  form="login"
                  inputType="password"
                  password
                  secureTextEntry
                  onInputChange={inputChangeHandler}
                  intialValue=""
                  initiallyValid={false}
                  errorMessage="Please enter a valid password"
                  required
                  name="lock"
                />
              </KeyboardAvoidingView>
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity onPress={loginHandler}>
            <MainButton form={true} style={styles.buttonColor}>
              login now
            </MainButton>
          </TouchableOpacity>
        </View>

        <View style={styles.loginFormComponent2}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate({ name: "signup" })}
          >
            <Text style={styles.signup}>signup now</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
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
  arrowStyle: {
    marginHorizontal: 10,
  },
  inputAlign: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    marginBottom: Dimensions.get("window").width / 12,
    padding: 5,
  },
  buttonColor: {
    color: Colors.textColor,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },

  loginFormContainer: {
    flex: 1,
    padding: 50,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  loginFormComponent1: {
    flex: 1,
    justifyContent: "center",
  },
  loginFormComponent2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signup: {
    fontWeight: "700",
    fontSize: 12,
    color: Colors.textColor,
    textTransform: "uppercase",
  },
  forgotPassword: {
    color: Colors.textColor,
    fontSize: 12,
  },
  userInputs: {
    color: Colors.textColor,
    flex: 1,
  },
  loginInputField: {
    paddingTop: 45,
    paddingBottom: 25,
  },
});

export default LoginScreen;
