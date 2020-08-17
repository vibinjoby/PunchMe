import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../../config/colors";

export default function GoogleSignInButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={require("../../assets/google-logo.png")}
        style={styles.googleBtn}
      />
      <Text style={styles.loginBtnTxt}>SIGN IN WITH GOOGLE</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 8,
    marginBottom: 10,
    padding: 15
  },
  googleBtn: {
    width: 20,
    height: 20
  },
  loginBtnTxt: {
    fontFamily: "ProximaNovaBold",
    textAlign: "center"
  }
});
