import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

export default function HeaderComponent({ navigation }) {
  const handleAddJobs = () => {
    navigation.navigate("AddJob");
  };
  return (
    <View style={styles.header}>
      <Image
        style={styles.logo}
        width={40}
        height={50}
        source={require("../../assets/punchMe_logo/punchMe_logo.png")}
      />
      <TouchableOpacity
        style={{
          marginTop: -15,
          width: "80%"
        }}
        onPress={handleAddJobs}
      >
        <Text style={styles.addJob}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingLeft: 10
  },
  logo: {
    marginLeft: 10
  },
  addJob: {
    color: "#fff",
    fontSize: 50,
    textAlign: "right"
  }
});
