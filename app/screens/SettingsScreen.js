import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Switch,
  TouchableOpacity
} from "react-native";
import commons from "../config/commonConstants";
import SettingsComp from "../components/settings/SettingsComp";
import AppThemeContext from "../context/AppThemeContext";
import { useColorScheme } from "react-native-appearance";
import colors from "../config/colors";

export default function Settings({ route, navigation }) {
  //Theme
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  return (
    <View
      style={[
        styles.container,
        themeColor === "light" && { backgroundColor: colors.white }
      ]}
    >
      <TouchableOpacity>
        <Image
          style={{
            alignSelf: "center",
            margin: "5%",
            padding: "10%"
          }}
          source={require("../assets/moon.png")}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.username,
          themeColor === "light" && { color: colors.black }
        ]}
      >
        Test Name
      </Text>
      <View
        style={[
          styles.section,
          themeColor === "light" && { backgroundColor: colors.white }
        ]}
      >
        <Text
          style={[
            styles.notification,
            themeColor === "light" && { color: colors.black }
          ]}
        >
          Receive Notification
        </Text>
        <View
          style={[
            styles.container,
            themeColor === "light" && { backgroundColor: colors.white }
          ]}
        >
          <Switch trackColor={{ false: colors.light, true: colors.yellow }} />
        </View>
      </View>
      <FlatList
        data={commons.SETTINGS_LINK}
        renderItem={({ item }) => (
          <SettingsComp
            themeColor={themeColor}
            linkText={item.title}
            imgUri={item.imgUri}
            targetScreenName={item.targetScreenName}
            iconColor={item.iconColor}
            navigation={navigation}
            onPress={item.onPress}
          />
        )}
        keyExtractor={item => item.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  name: {
    fontWeight: "bold",
    alignSelf: "center",
    color: colors.white,
    padding: "1%",
    fontSize: 20,
    marginBottom: 10
  },
  notification: {
    color: colors.white,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 17
  },
  section: {
    backgroundColor: colors.black,
    padding: 10,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "#969696"
  },
  text: {
    color: "#C7C7CC",
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: 42,
    height: 42
  }
});
