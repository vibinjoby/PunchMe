import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";

export default function Termsandsconditions() {
  return (
    <SafeAreaView>
      <Text styles={styles.container}>Terms and Policies</Text>
      <View>
        <Text styles={styles.heading}>
          If you are an owner of an account on this website, you are solely
          responsible for maintaining the confidentiality of your private user
          details (username and password). You are responsible for all
          activities that occur under your account or password. We reserve all
          rights to terminate accounts, edit or remove content and cancel orders
          in their sole discretion.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    marginBottom: 20,
    padding: 30,
  },
  heading: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    fontSize: 18,
    padding: 30,
    color: "white",
  },
});
