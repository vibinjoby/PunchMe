import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";

import colors from "../config/colors";
import routes from "../navigation/routes";
import CustomTextInput from "../components/login/CustomTextInput";
import CustomButton from "../components/login/CustomButton";
import loginService from "../services/loginService";
import CustomErrorText from "../components/login/CustomErrorText";
import Screens from "../components/Screens";

export default function LoginScreen({ route, navigation }) {
  const handleRegisterClick = () => {
    navigation.navigate(routes.REGISTER);
  };

  const handleForgotPwdClick = () => {
    navigation.navigate(routes.FORGOT_PWD);
  };

  const handleLoginClick = async values => {
    const isSuccess = await loginService.loginUser(
      values.email,
      values.password
    );
    if (isSuccess) return navigation.navigate(routes.HOME);
    alert("Invalid Username / Password");
  };

  return (
    <Screens style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView style={styles.container}>
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
                  style={{
                    textAlign: "right",
                    color: colors.white,
                    marginTop: 10,
                    fontWeight: "bold"
                  }}
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
      </ScrollView>
    </Screens>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
