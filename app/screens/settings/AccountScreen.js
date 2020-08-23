import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../config/colors";
import AppThemeContext from "../../context/AppThemeContext";
import { useColorScheme } from "react-native-appearance";
import UserContext from "../../context/UserContext";
import Divider from "../../components/Divider";

export default function AccountScreen() {
  // Theme based colors
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  const userInfoCtx = useContext(UserContext);

  const data = [
    {
      key: 1,
      text: "First Name",
      value: userInfoCtx.userInfo.col_user_name.split(" ")[0]
    },
    {
      key: 2,
      text: "Last Name",
      value: userInfoCtx.userInfo.col_user_name.split(" ")[1]
        ? userInfoCtx.userInfo.col_user_name.split(" ")[1]
        : "N/A"
    },
    {
      key: 3,
      text: "Email",
      value: userInfoCtx.userInfo.col_user_email
    }
  ];

  const MyAccComp = ({ text, value }) => (
    <View
      style={{
        flexDirection: "row",
        padding: 20
      }}
    >
      <Text
        style={[
          styles.labelTxt,
          themeColor === "dark" && { color: colors.white }
        ]}
      >
        {text}
      </Text>
      <Text
        style={[
          styles.labelValue,
          themeColor === "dark" && { color: colors.white }
        ]}
      >
        {value}
      </Text>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        themeColor === "light" && { backgroundColor: "#EEEEEE" }
      ]}
    >
      <View
        style={[
          styles.myAccContainer,
          themeColor === "dark" && { backgroundColor: colors.darkSecondary }
        ]}
      >
        {data.map(item => (
          <React.Fragment key={item.key}>
            <MyAccComp text={item.text} value={item.value} />
            {item.key !== data.length && <Divider />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  myAccContainer: {
    backgroundColor: colors.white,
    marginTop: 20,
    paddingLeft: 20
  },
  labelTxt: {
    fontSize: 17,
    fontFamily: "ProximaNovaAltLight"
  },
  labelValue: {
    position: "absolute",
    left: 130,
    top: 20,
    fontSize: 17,
    fontFamily: "ProximaNovaRegular"
  }
});
