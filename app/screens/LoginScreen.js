import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import colors from "../config/colors";
import routes from "../navigation/routes";
import CustomTextInput from "../components/login/CustomTextInput";
import CustomButton from "../components/login/CustomButton";

export default function LoginScreen({ route, navigation }) {
  const handleRegisterClick = () => {
    navigation.navigate(routes.REGISTER);
  };

  const handleForgotPwdClick = () => {
    navigation.navigate(routes.FORGOT_PWD);
  };

  const handleLoginClick = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <View style={styles.loginHeader}>
        <Image
          style={styles.headerLogo}
          source={require("../assets/punchMe_logo/punchme_logo_2x.png")}
        />
        <Text style={styles.headerTxt}>PUNCH ME</Text>
      </View>
      <View style={styles.formContent}>
        <CustomTextInput placeholder="Enter your email id" textHeader="EMAIL" />

        <Text style={[styles.formText, { marginTop: 30 }]}>PASSWORD</Text>
        <View style={{ flexDirection: "row" }}>
          <CustomTextInput
            placeholder="Enter your password"
            customStyles={{ width: "100%" }}
          />
          <Text
            style={{
              color: colors.white,
              marginLeft: -80,
              marginTop: 27,
              fontWeight: "bold"
            }}
            onPress={handleForgotPwdClick}
          >
            FORGOT?
          </Text>
        </View>
      </View>

      <CustomButton title="LOGIN" onPress={handleLoginClick} />

      <View style={{ marginVertical: 20 }}>
        <View
          style={{
            alignSelf: "center",
            position: "absolute",
            borderBottomColor: colors.white,
            borderBottomWidth: 1,
            height: "50%",
            width: "80%"
          }}
        />
        <Text
          style={{
            alignSelf: "center",
            paddingHorizontal: 15,
            color: colors.white,
            backgroundColor: colors.black
          }}
        >
          Social Logins
        </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.googleLogo}>
          <Text style={styles.googleTxt}>G</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ color: "#FFFFFFA3", textAlign: "center" }}>
          Don’t have an account?
        </Text>
        <TouchableOpacity onPress={handleRegisterClick}>
          <Text
            style={{
              marginTop: 10,
              color: colors.white,
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            REGISTER
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.black
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
  formContent: {
    padding: 40
  },
  formText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 10
  },
  googleLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.yellow,
    justifyContent: "center",
    alignItems: "center"
  },
  googleTxt: {
    fontSize: 40,
    fontWeight: "800"
  }
});
