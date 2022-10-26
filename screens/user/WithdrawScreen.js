import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import SemiBoldText from "../../constants/SemiBoldText";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MainButton from "../../components/MainButton";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import * as scanActions from "../../store/actions/scans";

const WithdrawScreen = (props) => {
  const dispatch = useDispatch();
  const moneyEarned = useSelector((state) => state.scans.moneyEarned);

  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [amount, setAmount] = useState("");

  const textChangeHandler = (amount) => {
    const isNumber = Number(amount);
    if (isNumber && parseInt(amount) <= moneyEarned) {
      setAmount(amount);
      setIsValid(true);
    } else {
      setAmount(amount);
      setIsValid(false);
      console.log("amount exceeded the given value");
    }
  };
  const withdrawHandler = useCallback(async () => {
    const isNumber = Number(amount);
    if (isValid && isNumber) {
      setIsLoading(true);
      await dispatch(scanActions.withdraw(parseInt(amount)));
      setIsLoading(false);
      props.navigation.navigate({ name: "User Profile" });
    }
  }, [dispatch, setIsLoading, amount]);

  return (
    <View style={styles.withdrawContainer}>
      <SemiBoldText>Max. Amount: {moneyEarned}</SemiBoldText>
      <View style={styles.withdrawInput}>
        <MaterialCommunityIcons name="currency-inr" size={35} color="black" />
        <TextInput
          onChangeText={textChangeHandler}
          value={amount}
          keyboardType="number-pad"
          style={styles.withdrawAmount}
          placeholder="Enter Amount"
        />
      </View>
      {!isValid && (
        <Text style={styles.errorText}>Please enter valid amount</Text>
      )}
      <View style={{ marginTop: Dimensions.get("screen").width / 15 }}>
        {(isLoading && (
          <ActivityIndicator
            style={styles.loading}
            color={Colors.green}
            size="large"
          />
        )) || (
          <TouchableOpacity onPress={withdrawHandler}>
            <MainButton style={{ backgroundColor: Colors.black }}>
              proceed
            </MainButton>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: { justifyContent: "center", alignItems: "center" },

  withdrawAmount: {
    flex: 1,
    fontFamily: "open-sans-bold",
    fontSize: 35,
  },
  withdrawContainer: {
    padding: Dimensions.get("window").width / 15,
  },
  withdrawText: {
    fontSize: 30,
  },
  withdrawInput: {
    flexDirection: "row",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Dimensions.get("screen").width / 25,
  },
  errorText: {
    padding: Dimensions.get("screen").width / 40,
    color: "red",
  },
});
export default WithdrawScreen;
