import React, { useCallback, useState } from "react";
import scannerScreen from "./ScannerScreen";
import { scanResult } from "../../store/actions/scans";
import { postResult } from "../../store/actions/results";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import Colors from "../../constants/Colors";
import MainButton from "../../components/MainButton";
import SemiBoldText from "../../constants/SemiBoldText";

const scanButtonScreen = (props) => {
  const dispatch = useDispatch();

  let scanned = false;

  const reward = props.route.params ? props.route.params.reward : null;

  const postHandler = useCallback(
    (reward) => {
      dispatch(postResult(reward));
    },
    [dispatch]
  );

  const scanHandler = useCallback(
    (reward) => {
      dispatch(scanResult(reward));
    },
    [dispatch]
  );

  if (reward) {
    scanned = true;
    scanHandler(reward);
    postHandler(reward);
  }

  return (
    <View style={styles.scanButtonContainer}>
      {scanned && (
        <View style={styles.scanResultContainer}>
          <Text style={styles.scanText}>You Earned</Text>
          <Text style={styles.scanText}>{reward}</Text>
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.5}
        onScanned={scanHandler}
        onPress={() => {
          props.navigation.navigate({ name: "Scan" });
        }}
      >
        <View style={styles.scanButton}>
          <SemiBoldText style={{ fontSize: 25 }}>Start Scan</SemiBoldText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({ name: "All Scans" });
        }}
      >
        <MainButton form={false} style={{ backgroundColor: Colors.black }}>
          All scans
        </MainButton>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scanButton: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").width / 2,
    borderRadius: Dimensions.get("window").width / 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: Colors.green,
    alignSelf: "center",
  },
  scanButtonContainer: {
    flex: 1,
    padding: Dimensions.get("window").width / 8,
    justifyContent: "space-around",
    backgroundColor: "#fff",
  },
  scanResultContainer: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 3,
    borderRadius: Dimensions.get("window").width / 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: Colors.green,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  scanText: {
    fontSize: 16,
    fontFamily: "open-sans-semi-bold",
  },
});

export default scanButtonScreen;
