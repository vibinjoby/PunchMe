import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import colors from "../config/colors";
import CustomTextInput from "../components/login/CustomTextInput";
import CustomButton from "../components/login/CustomButton";

export default function ForgotPwdScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <View style={styles.loginHeader}>
        <Image
          style={styles.headerLogo}
          source={require("../assets/punchMe_logo/punchme_logo_2x.png")}
        />
        <Text style={styles.headerTxt}>PUNCH ME</Text>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.forgtPwdTxt}>FORGOT PASSWORD?</Text>
        <Text style={styles.subheaderTxt}>
          Enter the email address you used to create your account and we will
          email you a link to reset your password
        </Text>
      </View>
      <View style={styles.formContent}>
        <CustomTextInput placeholder="Enter your email id" textHeader="EMAIL" />
      </View>
      <CustomButton title="SEND EMAIL" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    marginTop: 40,
    flex: 1
  },
  loginHeader: {
    alignItems: "center"
  },
  headerLogo: {
    width: 72,
    height: 88
  },
  headerTxt: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.yellow,
    marginTop: 10
  },
  subHeader: {
    marginTop: 30
  },
  forgtPwdTxt: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center"
  },
  subheaderTxt: {
    color: colors.silver,
    textAlign: "center",
    marginHorizontal: 50,
    fontSize: 15,
    marginTop: 20
  },
  formContent: {
    paddingVertical: 20,
    paddingHorizontal: 40
  }
});
