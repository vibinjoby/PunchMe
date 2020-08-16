import React, { useRef, useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { useColorScheme } from "react-native-appearance";

import colors from "../config/colors";
import CustomButton from "../components/login/CustomButton";
import { TextInput } from "react-native-gesture-handler";
import routes from "../navigation/routes";
import loginService from "../services/loginService";
import AppThemeContext from "../context/AppThemeContext";
import utils from "../helpers/utils";
import AppLoader from "../helpers/AppLoader";

export default function TempPwdScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { username } = route.params;

  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  const firstTI = useRef();
  const secondTI = useRef();
  const thirdTI = useRef();
  const fourthTI = useRef();

  const handleNext = async values => {
    // Check if the temporary password is accepted and then navigate to change password screen
    try {
      setIsLoading(true);
      const tempCode = `${values.firstNum}${values.secondNum}${values.thirdNum}${values.fourthNum}`;
      const data = await loginService.checkTemporaryPwd(username, tempCode);
      if (data && data.message === "Accepted")
        navigation.navigate(routes.CHANGE_PWD, {
          username,
          tempPwd: tempCode
        });
      setIsLoading(false);
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
        <View style={styles.formContent}>
          <Text
            style={{
              color: themeColor === "dark" ? colors.white : "#717171",
              textAlign: "center"
            }}
          >
            Enter the 4 digit code received on Your registered email address
          </Text>

          <Formik
            initialValues={{
              firstNum: "",
              secondNum: "",
              thirdNum: "",
              fourthNum: ""
            }}
            validationSchema={yup.object().shape({
              firstNum: yup.string().required(),
              secondNum: yup.string().required(),
              thirdNum: yup.string().required(),
              fourthNum: yup.string().required()
            })}
          >
            {({
              values,
              handleChange,
              isValid,
              setFieldTouched,
              isSubmitting,
              validateForm
            }) => (
              <>
                <View style={styles.codeInputContainer}>
                  <TextInput
                    style={styles.codeTextInput}
                    maxLength={1}
                    keyboardType="decimal-pad"
                    autoFocus
                    onBlur={() => setFieldTouched("firstNum")}
                    onFocus={() => validateForm()}
                    returnKeyType="next"
                    ref={firstTI}
                    onChangeText={handleChange("firstNum")}
                    onKeyPress={e => {
                      if (e.nativeEvent.key !== "Backspace")
                        secondTI.current.focus();
                    }}
                    blurOnSubmit={false}
                  />
                  <TextInput
                    style={styles.codeTextInput}
                    maxLength={1}
                    keyboardType="decimal-pad"
                    ref={secondTI}
                    onBlur={() => setFieldTouched("secondNum")}
                    onChangeText={handleChange("secondNum")}
                    onKeyPress={e => {
                      thirdTI.current.focus();
                      if (e.nativeEvent.key === "Backspace")
                        firstTI.current.focus();
                    }}
                  />
                  <TextInput
                    style={styles.codeTextInput}
                    maxLength={1}
                    keyboardType="decimal-pad"
                    ref={thirdTI}
                    onBlur={() => setFieldTouched("thirdNum")}
                    onChangeText={handleChange("thirdNum")}
                    onKeyPress={e => {
                      fourthTI.current.focus();
                      if (e.nativeEvent.key === "Backspace")
                        secondTI.current.focus();
                    }}
                  />
                  <TextInput
                    style={styles.codeTextInput}
                    maxLength={1}
                    keyboardType="decimal-pad"
                    ref={fourthTI}
                    onBlur={() => setFieldTouched("fourthNum")}
                    onChangeText={handleChange("fourthNum")}
                    onKeyPress={e => {
                      if (e.nativeEvent.key === "Backspace")
                        thirdTI.current.focus();
                    }}
                  />
                </View>
                <CustomButton
                  title="Next"
                  onPress={() => handleNext(values)}
                  disabled={!isValid || isSubmitting}
                  customStyles={{ marginTop: 20 }}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black
  },
  codeInputContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  codeTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#D45779",
    width: 50,
    fontSize: 40,
    textAlign: "center"
  },
  formContent: {
    marginHorizontal: 40,
    marginVertical: 40
  }
});
