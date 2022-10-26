import React, { useState, useEffect } from "react";
import ScanResult from "../../components/ScanResult";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as scanActions from "../../store/actions/results";

const ScanResultsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const scans = useSelector((state) => state.result.scans);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(scanActions.fetchResults()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  if (scans.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No scans found</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={scans}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ScanResult
          moneyEarned={itemData.item.reward}
          date={itemData.item.date}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  scanResultContainer: {},
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScanResultsScreen;
