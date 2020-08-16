import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { useColorScheme } from "react-native-appearance";

import colors from "../config/colors";
import CustomTextInput from "../components/login/CustomTextInput";
import CustomButton from "../components/login/CustomButton";
import loginService from "../services/loginService";
import routes from "../navigation/routes";
import CustomErrorText from "../components/login/CustomErrorText";
import AppThemeContext from "../context/AppThemeContext";
import AppLoader from "../helpers/AppLoader";
import utils from "../helpers/utils";

export default function ForgotPwdScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  const handleSendMail = async values => {
    //If the mail is sent to the user, navigate to the temporary password screen
    try {
      setIsLoading(true);
      const result = await loginService.forgotPassword(values.email);
      if (result)
        navigation.navigate(routes.TEMP_PWD, { username: result.username });
      setIsLoading(false);
    } catch (error) {
      utils.showAlertPopupWithLoading(setIsLoading, error);
      console.log(error);
    }
  };

  return (
    <>
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
        <View style={styles.subHeader}>
          <Text style={styles.subheaderTxt}>
            Enter the email address you used to create your account and we will
            email you a link to reset your password
          </Text>
        </View>
        <View style={styles.formContent}>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email()
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
                  placeholder="Enter your email id"
                  textHeader="EMAIL"
                  onBlur={() => setFieldTouched("email")}
                  onChangeText={handleChange("email")}
                  autoFocus
                  onFocus={() => validateForm()}
                />
                {touched.email && errors.email && (
                  <CustomErrorText> {errors.email}</CustomErrorText>
                )}
                <CustomButton
                  title="SEND EMAIL"
                  onPress={() => handleSendMail(values)}
                  disabled={!isValid || isSubmitting}
                  customStyles={{ marginTop: 20 }}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
      <AppLoader isLoading={isLoading} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    paddingTop: 40,
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
    fontFamily: "ProximaNovaBold",
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
    color: "grey",
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
