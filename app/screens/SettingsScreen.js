import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Switch } from "react-native";
import commons from "../config/commonConstants";
import SettingsComp from "../components/settings/SettingsComp";
import AppThemeContext from "../context/AppThemeContext";
import { useColorScheme } from "react-native-appearance";
import colors from "../config/colors";
import utils from "../helpers/utils";

export default function Settings({ route, navigation }) {
  //Theme
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = isNotificationEnabled => {
    //Store the result in the async storage
    utils.storeAsyncStorageData(
      commons.IS_NOTIFICATION_ENABLED,
      isNotificationEnabled ? commons.YES : "N"
    );
    setIsEnabled(isNotificationEnabled);
  };

  useEffect(() => {
    (async function() {
      //Enable/disable the notification switch based on the user's preference on screen load
      const isNotificationEnabled = await utils.fetchAsyncStorageData(
        commons.IS_NOTIFICATION_ENABLED
      );
      setIsEnabled(isNotificationEnabled.includes(commons.YES));
    })();
  }, []);

  return (
    <View
      style={[
        styles.container,
        themeColor === "light" && { backgroundColor: colors.white }
      ]}
    >
      <View style={styles.profileContainer}>
        <View style={styles.profileView}>
          <Text style={styles.profileName}>LA</Text>
        </View>
        <Text
          style={[
            styles.username,
            themeColor === "light" && { color: colors.black }
          ]}
        >
          Lijosh Abraham
        </Text>
      </View>
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
            styles.switch,
            themeColor === "light" && { backgroundColor: colors.white }
          ]}
        >
          <Switch
            trackColor={{ false: "#767577", true: colors.yellow }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
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
  profileContainer: {
    alignItems: "center",
    marginVertical: 30
  },
  profileView: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  profileName: {
    fontSize: 45,
    fontFamily: "ProximaNovaRegular",
    color: colors.white
  },
  username: {
    fontFamily: "ProximaNovaRegular",
    fontSize: 27,
    color: colors.white
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
    fontFamily: "ProximaNovaRegular",
    color: colors.white,
    justifyContent: "center",
    paddingLeft: 20,
    alignItems: "center",
    fontSize: 17
  },
  switch: {
    paddingRight: 20
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
