import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import Screens from "../../components/Screens";

export default function TermsConditionsScreen() {
  return (
    <Screens>
      <Text style={styles.container}>
        We reserve the right to amend these terms and conditions at any time. If
        you disagree with any of these Terms and Conditions of Use, you must
        immediately discontinue your access to the Punch Me and your use of the
        services offered on this application. Continued use of Punch Me will
        constitute acceptance of these Terms and Conditions of Use, as may be
        amended from time to time.
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
    color: "white"
  }
});
