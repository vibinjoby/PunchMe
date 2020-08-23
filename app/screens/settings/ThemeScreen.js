import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../../config/colors";
import AppThemeContext from "../../context/AppThemeContext";
import { useColorScheme } from "react-native-appearance";
import Divider from "../../components/Divider";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ThemeScreen() {
  // Theme based colors
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  const themeCtx = useContext(AppThemeContext);
  const data = [
    { key: 1, name: "Dark", value: "dark" },
    { key: 2, name: "Light", value: "light" },
    { key: 3, name: "System Preference", value: "systemTheme" }
  ];

  const handleThemeSelection = item => {
    themeCtx.updateTheme(item);
  };

  return (
    <View
      style={[
        styles.container,
        themeColor === "light" && { backgroundColor: "#EEEEEE" }
      ]}
    >
      <View
        style={[
          styles.themeContainer,
          themeColor === "dark" && { backgroundColor: colors.darkSecondary }
        ]}
      >
        {data.map(item => (
          <React.Fragment key={item.name}>
            <TouchableOpacity onPress={() => handleThemeSelection(item.value)}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    styles.text,
                    themeColor === "light" && { color: colors.black }
                  ]}
                >
                  {item.name}
                </Text>
                {appTheme.theme === item.value && (
                  <MaterialCommunityIcons
                    style={styles.icon}
                    name="check"
                    size={30}
                    color={themeColor === "light" ? colors.black : colors.white}
                  />
                )}
              </View>
            </TouchableOpacity>
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
  themeContainer: {
    backgroundColor: colors.white,
    marginTop: 20,
    paddingLeft: 20
  },
  icon: { marginTop: 10, position: "absolute", right: 10 },
  text: {
    fontFamily: "ProximaNovaRegular",
    fontSize: 20,
    height: 40,
    marginTop: 20,
    color: colors.white
  }
});
