import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import Screens from "../components/Screens";

export default function TermsandsconditionsScreen() {
  return (
    <Screens>
      <Text style={styles.container}>
        If you are an owner of an account on this website, you are solely
        responsible for maintaining the confidentiality of your private user
        details (username and password). You are responsible for all activities
        that occur under your account or password. We reserve all rights to
        terminate accounts, edit or remove content and cancel orders in their
        sole discretion.
      </Text>
    </Screens>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    padding: 20,
    fontSize: 18,
    color: "white",
  },
});
