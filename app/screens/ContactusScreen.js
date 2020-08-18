import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ViewComponent,
} from "react-native";
import React from "react";
import Screens from "../components/Screens";
import { color } from "react-native-reanimated";

export default function ContactusScreen() {
  return (
    <SafeAreaView>
      <Text style={styles.container}>Get In Touch</Text>
      <Text style={styles.subcontainer}>Venom Coders</Text>
      <View style={styles.details}>
        <Text style={{ color: "white" }}>Email</Text>
        <Text style={styles.content}>Punchme2020@gmail.com</Text>
      </View>
      <View style={styles.details}>
        <Text style={{ color: "white" }}>Mob</Text>
        <Text style={styles.content}>+16476753056</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
  },
  subcontainer: {
    alignItems: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    padding: 10,
    fontSize: 18,
    color: "white",
  },
  details: {
    flexDirection: "row",
    textAlignVertical: "center",
    margin: "2%",
    padding: "5%",
    fontSize: 15,
  },
  content: {
    marginLeft: "5%",
    width: "70%",
    color: "white",
    fontSize: 15,
    justifyContent: "space-around",
    borderWidth: 0.5,
    textAlign: "center",
  },
});
