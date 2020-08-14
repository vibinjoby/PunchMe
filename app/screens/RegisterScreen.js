import React, { useContext } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { useColorScheme } from "react-native-appearance";

import CustomTextInput from "../components/login/CustomTextInput";
import CustomButton from "../components/login/CustomButton";
import registerService from "../services/registerService";
import CustomErrorText from "../components/login/CustomErrorText";
import routes from "../navigation/routes";
import AppThemeContext from "../context/AppThemeContext";
import colors from "../config/colors";

export default function RegisterScreen({ navigation, route }) {
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;
  const handleRegister = async values => {
    try {
      const { id } = await registerService.registerUser(values);
      console.log(id);
      navigation.navigate(routes.LOGIN);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <ScrollView
      style={[
        styles.container,
        themeColor === "light" && { backgroundColor: colors.lightBackground }
      ]}
    >
      <View
        style={{
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: "#1D1D1D"
        }}
      >
        <Image
          style={{ width: 50, height: 65 }}
          source={require("../assets/profile_pic/profile_pic_2x.png")}
        />
      </View>
      <Formik
        initialValues={{
          fName: "",
          lName: "",
          email: "",
          password: "",
          confirmPwd: ""
        }}
        validationSchema={yup.object().shape({
          fName: yup
            .string()
            .min(3)
            .label("First Name")
            .required(),
          lName: yup
            .string()
            .min(3)
            .label("Last Name")
            .required(),
          email: yup
            .string()
            .email()
            .label("Email")
            .required(),
          password: yup
            .string()
            .min(6)
            .label("Password")
            .required(),
          confirmPwd: yup
            .string()
            .label("Confirm Password")
            .oneOf([yup.ref("password"), null], "Passwords must match")
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
              placeholder="First name here"
              textHeader="FIRST NAME"
              autoFocus
              onFocus={() => validateForm()}
              onBlur={() => setFieldTouched("fName")}
              customStyles={{ marginTop: 20 }}
              onChangeText={handleChange("fName")}
            />
            {touched.fName && errors.fName && (
              <CustomErrorText> {errors.fName}</CustomErrorText>
            )}
            <CustomTextInput
              placeholder="Last name here"
              textHeader="LAST NAME"
              customStyles={{ marginTop: 20 }}
              onBlur={() => setFieldTouched("lName")}
              onChangeText={handleChange("lName")}
            />
            {touched.lName && errors.lName && (
              <CustomErrorText> {errors.lName}</CustomErrorText>
            )}
            <CustomTextInput
              placeholder="Email here"
              textHeader="EMAIL"
              textContentType="emailAddress"
              keyboardType="email-address"
              onBlur={() => setFieldTouched("email")}
              onChangeText={handleChange("email")}
              customStyles={{ marginTop: 20 }}
            />
            {touched.email && errors.email && (
              <CustomErrorText> {errors.email}</CustomErrorText>
            )}
            <CustomTextInput
              placeholder="Password here"
              textHeader="PASSWORD"
              secureTextEntry
              textContentType="password"
              onBlur={() => setFieldTouched("password")}
              onChangeText={handleChange("password")}
              customStyles={{ marginTop: 20 }}
            />
            {touched.password && errors.password && (
              <CustomErrorText> {errors.password}</CustomErrorText>
            )}
            <CustomTextInput
              placeholder="Confirm Password here"
              textHeader="CONFIRM PASSWORD"
              secureTextEntry
              textContentType="password"
              onBlur={() => setFieldTouched("confirmPwd")}
              onChangeText={handleChange("confirmPwd")}
              customStyles={{ marginTop: 20 }}
            />
            {touched.confirmPwd && errors.confirmPwd && (
              <CustomErrorText> {errors.confirmPwd}</CustomErrorText>
            )}
            <CustomButton
              title="REGISTER"
              customStyles={{ marginTop: 20 }}
              disabled={!isValid || isSubmitting}
              onPress={() => handleRegister(values)}
            />
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 40
  }
});
