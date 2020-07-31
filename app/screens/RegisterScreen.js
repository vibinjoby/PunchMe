import React from "react";
import { View, StyleSheet, Image } from "react-native";
import CustomTextInput from "../components/login/CustomTextInput";
import CustomButton from "../components/login/CustomButton";

export default function RegisterScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
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
      <CustomTextInput
        placeholder="First name here"
        textHeader="FIRST NAME"
        customStyles={{ marginTop: 20 }}
      />
      <CustomTextInput
        placeholder="Last name here"
        textHeader="LAST NAME"
        customStyles={{ marginTop: 20 }}
      />
      <CustomTextInput
        placeholder="Email here"
        textHeader="EMAIL"
        textContentType="emailAddress"
        keyboardType="email-address"
        customStyles={{ marginTop: 20 }}
      />
      <CustomTextInput
        placeholder="Password here"
        textHeader="PASSWORD"
        secureTextEntry
        textContentType="password"
        customStyles={{ marginTop: 20 }}
      />
      <CustomTextInput
        placeholder="Confirm Password here"
        textHeader="CONFIRM PASSWORD"
        secureTextEntry
        textContentType="password"
        customStyles={{ marginTop: 20 }}
      />
      <CustomButton title="REGISTER" customStyles={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 40
  }
});
