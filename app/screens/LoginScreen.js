import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { useColorScheme } from "react-native-appearance";

import colors from "../config/colors";
import routes from "../navigation/routes";
import CustomTextInput from "../components/login/CustomTextInput";
import CustomButton from "../components/login/CustomButton";
import loginService from "../services/loginService";
import CustomErrorText from "../components/login/CustomErrorText";
import AppThemeContext from "../context/AppThemeContext";
import utils from "../helpers/utils";
import AppLoader from "../helpers/AppLoader";

export default function LoginScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
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
      const isSuccess = await loginService.loginUser(
        values.email,
        values.password
      );
      if (isSuccess) {
        setIsLoading(false);
        return navigation.navigate(routes.HOME);
      }
    } catch (error) {
      utils.showAlertPopupWithLoading(setIsLoading, error);
    }
  };

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
