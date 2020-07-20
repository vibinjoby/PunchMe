import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Screens from "../components/Screens";
import { FlatList } from "react-native-gesture-handler";

export default function Settings() {
  const SettingsComponent = (linkText, imgUri) => (
    <View style={styles.Section}>
      <Image style={styles.img} source={imgUri} />
      <Text style={styles.text}>{linkText}</Text>
      <Image style={styles.next} source={require("../assets/next.png")} />
    </View>
  );
  const settingsLinks = [
    {
      id: 1,
      title: "Help Center",
      imgUri: require("../assets/helpCenter.png")
    },
    {
      id: 2,
      title: "Report a Problem",
      imgUri: require("../assets/report.png")
    },
    {
      id: 3,
      title: "Terms and Policies",
      imgUri: require("../assets/terms.png")
    },
    {
      id: 4,
      title: "About Us",
      imgUri: require("../assets/about.png")
    },
    {
      id: 5,
      title: "Contact Us",
      imgUri: require("../assets/contact.png")
    }
  ];
  return (
    <Screens style={styles.container}>
      <FlatList
        data={settingsLinks}
        renderItem={({ item }) => SettingsComponent(item.title, item.imgUri)}
        keyExtractor={item => item.id}
      />
    </Screens>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  heading: {
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    marginBottom: 20,
    padding: 30
  },
  Section: {
    backgroundColor: "#1A1A1A",
    padding: 10,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20
  },
  text: {
    color: "#C7C7CC",
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: 42,
    height: 42
  },
  next: {
    justifyContent: "center",
    width: 32,
    height: 20
  }
});
