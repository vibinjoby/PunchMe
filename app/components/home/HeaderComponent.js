import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

export default function HeaderComponent({ navigation }) {
  const handleAddJobs = () => {
    navigation.navigate("AddJob");
  };
  return (
    <View style={styles.header}>
      <Image
        width={300}
        height={300}
        source={require("../../assets/punchMe_logo/punchMe_logo.png")}
      />
      <TouchableOpacity
        style={{ width: "60%", marginTop: -15 }}
        onPress={handleAddJobs}
      >
        <Text style={styles.addJob}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row"
  },
  addJob: {
    color: "#fff",
    fontSize: 50,
    textAlign: "right"
  }
});
