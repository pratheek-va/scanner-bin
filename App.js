import "react-native-gesture-handler";
import React, { useState } from "react";
import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import AppLoading from "expo-app-loading";
import { StyleSheet, View, Dimensions } from "react-native";
import scansReducer from "./store/reducers/scans";
import authReducer from "./store/reducers/auth";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import AppNavigator from "./navigation/AppNavigator";
import resultReducer from "./store/reducers/results";
import ScanResult from "./components/ScanResult";

const rootReducer = combineReducers({
  scans: scansReducer,
  auth: authReducer,
  result: resultReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-semi-bold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <View style={styles.appContainer}>
      <Provider store={store}>
        <AppNavigator></AppNavigator>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    height: Dimensions.get("screen").height,
  },
});
