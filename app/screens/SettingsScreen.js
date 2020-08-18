import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Switch,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Screens from "../components/Screens";
import commons from "../config/commonConstants";

export default function Settings({ navigation }) {
  const SettingsComponent = (linkText, imgUri, targetScreenName) => (
    <View>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate(targetScreenName)}
      >
        <View style={styles.Section}>
          <Image style={styles.img} source={imgUri} />
          <Text style={styles.text}>{linkText}</Text>
          <Image style={styles.next} source={require("../assets/next.png")} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
  return (
    <Screens style={styles.container}>
      <TouchableOpacity>
        <Image
          style={{
            alignSelf: "center",
            margin: "5%",
            padding: "10%",
          }}
          source={require("../assets/moon.png")}
        />
      </TouchableOpacity>
      <Text style={styles.name}>Test Name</Text>
      <View style={styles.Section}>
        <Text style={styles.notification}>Receive Notification</Text>
        <View style={styles.container}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            ios_backgroundColor="black"
          />
        </View>
      </View>
      <View style={styles.Section}>
        <Image style={styles.img} source={require("../assets/moon.png")} />
        <Text style={styles.text}>Dark Mode</Text>
        <View style={styles.container}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            ios_backgroundColor="black"
          />
        </View>
      </View>
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
    backgroundColor: "black",
    alignItems: "center",
    marginBottom: 20,
    padding: 30,
  },
  name: {
    fontWeight: "bold",
    alignSelf: "center",
    color: "#FFFFFF",
    padding: "1%",
    fontSize: 20,
    marginBottom: 10,
  },
  notification: {
    color: "#C7C7CC",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 17,
  },
  Section: {
    backgroundColor: "black",
    padding: 10,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 0.2,
    borderColor: "#969696",
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
