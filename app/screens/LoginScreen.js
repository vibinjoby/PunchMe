import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { useColorScheme } from "react-native-appearance";
import * as GoogleSignIn from "expo-google-sign-in";
import jwtDecode from "jwt-decode";

import colors from "../config/colors";
import routes from "../navigation/routes";
import CustomTextInput from "../components/login/CustomTextInput";
import CustomButton from "../components/login/CustomButton";
import loginService from "../services/loginService";
import CustomErrorText from "../components/login/CustomErrorText";
import AppThemeContext from "../context/AppThemeContext";
import UserContext from "../context/UserContext";
import utils from "../helpers/utils";
import AppLoader from "../helpers/AppLoader";
import GoogleSignInButton from "../components/login/GoogleSignInButton";
import commons from "../config/commonConstants";

export default function LoginScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const userInfoCtx = useContext(UserContext);
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  const handleRegisterClick = () => {
    navigation.navigate(routes.REGISTER);
  };

  const handleForgotPwdClick = () => {
    navigation.navigate(routes.FORGOT_PWD);
  };

  const handleLoginClick = async values => {
    try {
      setIsLoading(true);
      const data = await loginService.loginUser(values.email, values.password);
      if (data) {
        setIsLoading(false);
        //Set the decoded token obj to the user context
        userInfoCtx.setUserInfo(jwtDecode(data));
        return navigation.navigate(routes.HOME);
      }
    } catch (error) {
      utils.showAlertPopupWithLoading(setIsLoading, error);
    }
  };

  const _syncUserWithStateAsync = async () => {
    setIsLoading(true);
    const user = await GoogleSignIn.signInSilentlyAsync();
    setIsLoading(false);
    if (user) navigation.navigate(routes.HOME);
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        _syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };

  useEffect(() => {
    (async function() {
      const value = await utils.fetchAsyncStorageData(commons.TOKEN_KEY);

      if (value) navigation.navigate(routes.HOME);

      await GoogleSignIn.initAsync({
        // You may ommit the clientId when the firebase `googleServicesFile` is configured
        clientId:
          "393073135707-d5tupl6ed5b43vus0l8cc6mckfnrfb69.apps.googleusercontent.com"
      });
      _syncUserWithStateAsync();
    })();
  });

  return (
    <>
      <AppLoader isLoading={isLoading} />
      <View
        style={[
          styles.container,
          themeColor === "light" && { backgroundColor: colors.lightBackground }
        ]}
      >
        <View style={styles.loginHeader}>
          <Image
            style={styles.headerLogo}
            source={require("../assets/punchMe_logo/punchme_logo_2x.png")}
          />
          <Text style={styles.headerTxt}>PUNCH ME</Text>
        </View>
        <View style={styles.formContent}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email()
                .label("Email")
                .required(),
              password: yup
                .string()
                .min(6)
                .label("Password")
                .required()
            })}
          >
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              isSubmitting,
              validateForm
            }) => (
              <>
                <CustomTextInput
                  autoFocus
                  placeholder="Enter your email id"
                  textHeader="EMAIL"
                  onBlur={() => setFieldTouched("email")}
                  onFocus={() => validateForm()}
                  onChangeText={handleChange("email")}
                />
                {touched.email && errors.email && (
                  <CustomErrorText> {errors.email}</CustomErrorText>
                )}
                <CustomTextInput
                  textHeader="PASSWORD"
                  secureTextEntry
                  placeholder="Enter your password"
                  onBlur={() => setFieldTouched("password")}
                  customStyles={{ width: "100%", marginTop: 20 }}
                  onChangeText={handleChange("password")}
                />
                {touched.password && errors.password && (
                  <CustomErrorText> {errors.password}</CustomErrorText>
                )}
                <Text
                  style={[
                    styles.forgotPwdTxt,
                    {
                      color: themeColor === "dark" ? colors.white : colors.black
                    }
                  ]}
                  onPress={handleForgotPwdClick}
                >
                  Forgot password?
                </Text>

                <CustomButton
                  title="LOGIN"
                  onPress={() => handleLoginClick(values)}
                  disabled={!isValid || isSubmitting}
                  customStyles={{ marginTop: 20 }}
                />
              </>
            )}
          </Formik>
          <GoogleSignInButton onPress={signInAsync} />
        </View>

        <View>
          <Text
            style={[
              styles.dontHaveAccTxt,
              { color: themeColor === "dark" ? "#FFFFFFA3" : "#555555A3" }
            ]}
          >
            Don’t have an account?
          </Text>
          <TouchableOpacity onPress={handleRegisterClick}>
            <Text
              style={[
                styles.registerTxt,
                { color: themeColor === "dark" ? colors.white : colors.black }
              ]}
            >
              REGISTER
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
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
    fontFamily: "ProximaNovaBold",
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
  forgotPwdTxt: {
    fontFamily: "ProximaNovaBold",
    textAlign: "right",
    marginTop: 10
  },
  dontHaveAccTxt: {
    fontSize: 14,
    fontFamily: "ProximaNovaRegular",
    textAlign: "center"
  },
  registerTxt: {
    fontSize: 14,
    fontFamily: "ProximaNovaBold",
    marginTop: 10,
    textAlign: "center"
  }
});
