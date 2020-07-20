import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import Screens from "../components/Screens";
import commons from "../config/commonConstants";

export default function Settings({ navigation }) {
  const SettingsComponent = (linkText, imgUri, targetScreenName) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(targetScreenName)}
    >
      <View style={styles.Section}>
        <Image style={styles.img} source={imgUri} />
        <Text style={styles.text}>{linkText}</Text>
        <Image style={styles.next} source={require("../assets/next.png")} />
      </View>
    </TouchableWithoutFeedback>
  );
  return (
    <Screens style={styles.container}>
      <FlatList
        data={commons.SETTINGS_LINK}
        renderItem={({ item }) =>
          SettingsComponent(item.title, item.imgUri, item.targetScreenName)
        }
        keyExtractor={(item) => item.title}
      />
    </Screens>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    marginBottom: 20,
    padding: 30,
  },
  Section: {
    backgroundColor: "#1A1A1A",
    padding: 10,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
  },
  text: {
    color: "#C7C7CC",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 42,
    height: 42,
  },
  next: {
    justifyContent: "center",
    width: 32,
    height: 20,
  },
});
