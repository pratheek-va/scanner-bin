import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import Colors from "../../constants/Colors";
import BoldText from "../../constants/BoldText";
import RegularText from "../../constants/RegularText";
import SemiBoldText from "../../constants/SemiBoldText";
import MainButton from "../../components/MainButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchInfo } from "../../store/actions/scans";
import * as authActions from "../../store/actions/auth";

const UserProfileScreen = (props) => {
  const moneyEarned = useSelector((state) => state.scans.moneyEarned);
  const noItemsScanned = useSelector((state) => state.scans.noItemsScanned);
  const email = useSelector((state) => state.auth.email);
  const fullName = useSelector((state) => state.auth.fullName);
  const [isLoading, setIsLoading] = useState(false);

  // const userData = await AsyncStorage.getItem("userData");
  // const transformedData = JSON.parse(userData);
  // const { token, userId } = transformedData;

  const dispatch = useDispatch();

  const loadInfo = useCallback(async () => {
    setIsLoading(true);
    await dispatch(fetchInfo());
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    loadInfo();
  }, [dispatch, loadInfo]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  return (
    <View style={styles.userContainer}>
      <View style={styles.cover}>
        <TouchableOpacity
          onPress={() => {
            dispatch(authActions.logout());
          }}
        >
          <SemiBoldText style={styles.logoutButton}>LOGOUT</SemiBoldText>
        </TouchableOpacity>
      </View>
      <View style={styles.screenItemAlignment}>
        <View style={styles.userInfoSection}>
          <View style={styles.userInfo}>
            <View style={styles.userProfilePicture}>
              <Image
                style={styles.photo}
                source={require("../../assets/profilepic.png")}
              ></Image>
            </View>
            <View style={styles.userName}>
              <BoldText style={styles.userNameText}>{fullName}</BoldText>
              <RegularText>{email}</RegularText>
            </View>

            <View style={styles.info}>
              <View style={{ ...styles.infos, ...styles.info1 }}>
                <SemiBoldText>Items Recycled</SemiBoldText>
                <RegularText style={styles.text}>{noItemsScanned}</RegularText>
              </View>
              <View style={{ ...styles.infos, ...styles.info2 }}>
                <SemiBoldText>Your Money</SemiBoldText>
                <RegularText style={styles.text}>{moneyEarned}</RegularText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate({ name: "Withdraw" });
            }}
          >
            <MainButton
              form={false}
              style={{ color: Colors.black, backgroundColor: Colors.black }}
            >
              withdraw
            </MainButton>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    margin: Dimensions.get("screen").width / 12,
    alignSelf: "flex-end",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfoSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  screenItemAlignment: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    position: "relative",
    height: Dimensions.get("screen").height,
    padding: Dimensions.get("window").width / 8,
  },
  cover: {
    position: "absolute",
    top: 0,
    left: 0,
    height: Dimensions.get("window").height * 0.5,
    width: Dimensions.get("window").width,
    backgroundColor: Colors.green,
    borderBottomLeftRadius: Dimensions.get("window").width / 10,
    borderBottomRightRadius: Dimensions.get("window").width / 10,
  },
  userContainer: {
    flex: 1,
    position: "relative",
  },
  userInfo: {
    height: Dimensions.get("window").height * 0.3,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    shadowRadius: 6,
    shadowOpacity: 0.26,
    justifyContent: "flex-end",
  },
  userProfilePicture: {
    position: "absolute",
    width: Dimensions.get("window").width / 4,
    height: Dimensions.get("window").width / 4,
    borderRadius: Dimensions.get("window").width / 8,
    left: "50%",
    bottom: "80%",
    transform: [{ translateX: -50 }],
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  userNameText: {
    fontSize: 18,
  },
  info: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  infos: {
    alignItems: "center",
    width: "50%",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  info1: {
    borderRightWidth: 1,
  },
  text: {
    padding: 5,
    fontSize: 18,
  },
  userName: {
    marginBottom: Dimensions.get("window").width / 13,
    alignItems: "center",
  },
  buttonSection: {
    width: "100%",
    justifyContent: "flex-end",
  },
});

export default UserProfileScreen;
