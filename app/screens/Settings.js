import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, Text, View, Image } from "react-native";
import Screens from "../components/Screens";
import colors from "../config/colors";

export default function Settings({ navigation: { setParams } }) {
  return (
    <Screens style={styles.container}>
      <View style={styles.heading}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          Settings
        </Text>
      </View>
      <View style={styles.options}>
        <View style={styles.Section}>
          <Image
            style={styles.img}
            source={require("../assets/helpCenter.png")}
          />
          <Text style={styles.text}>Help Center</Text>
          <Image style={styles.next} source={require("../assets/next.png")} />
        </View>
        <View style={styles.Section}>
          <Image style={styles.img} source={require("../assets/report.png")} />
          <Text style={styles.text}>Report a Problem</Text>
          <Image style={styles.next} source={require("../assets/next.png")} />
        </View>
        <View style={styles.Section}>
          <Image style={styles.img} source={require("../assets/terms.png")} />
          <Text style={styles.text}>Terms and Policies</Text>
          <Image style={styles.next} source={require("../assets/next.png")} />
        </View>
        <View style={styles.Section}>
          <Image style={styles.img} source={require("../assets/about.png")} />
          <Text style={styles.text}>About Us</Text>
          <Image style={styles.next} source={require("../assets/next.png")} />
        </View>
        <View style={styles.Section}>
          <Image style={styles.img} source={require("../assets/contact.png")} />
          <Text style={styles.text}>Contact Us</Text>
          <Image style={styles.next} source={require("../assets/next.png")} />
        </View>
      </View>
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
