import React from "react";
import { View, StyleSheet } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";

import CustomTextInput from "../components/login/CustomTextInput";
import colors from "../config/colors";
import CustomButton from "../components/login/CustomButton";
import loginService from "../services/loginService";
import routes from "../navigation/routes";
import CustomErrorText from "../components/login/CustomErrorText";

export default function ChangePwdScreen({ route, navigation }) {
  const { username, tempPwd } = route.params;

  const handleChangePwd = async values => {
    const result = await loginService.createNewPassword(
      username,
      tempPwd,
      values.password
    );
    if (result) {
      navigation.navigate(routes.LOGIN);
    }
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ password: "", confirmPwd: "" }}
        validationSchema={yup.object().shape({
          password: yup
            .string()
            .min(6)
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
              value={values.password}
              placeholder="Password here"
              onBlur={() => setFieldTouched("password")}
              textHeader="New Password"
              secureTextEntry
              customStyles={{ marginBottom: 20 }}
              onChangeText={handleChange("password")}
              autoFocus
              onFocus={() => validateForm()}
            />
            {touched.password && errors.password && (
              <CustomErrorText> {errors.password}</CustomErrorText>
            )}
            <CustomTextInput
              value={values.confirmPwd}
              placeholder="Password here"
              onBlur={() => setFieldTouched("confirmPwd")}
              textHeader="Confirm New Password"
              secureTextEntry
              customStyles={{ marginBottom: 20 }}
              onChangeText={handleChange("confirmPwd")}
            />
            {touched.confirmPwd && errors.confirmPwd && (
              <CustomErrorText> {errors.confirmPwd}</CustomErrorText>
            )}
            <CustomButton
              title="Change Password"
              disabled={!isValid || isSubmitting}
              onPress={() => {
                handleChangePwd(values);
              }}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: colors.black,
    paddingHorizontal: 40
  }
});
