import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../app/screens/HomeScreen";
import Screens from "../app/components/Screens";

const Tab = createMaterialTopTabNavigator();
export default function JobNavigator({ navigation }) {
  console.log(navigation);
  const jobsArr = ["Sobeys", "Foodland", "Walmart"];

  const handleAddJobs = () => {
    navigation.navigate("AddJob");
  };
  return (
    <Screens>
      <View style={styles.header}>
        <Image
          width={300}
          height={300}
          source={require("../assets/punchMe_logo/punchMe_logo.png")}
        />
        <TouchableOpacity
          style={{ width: "60%", marginTop: -15 }}
          onPress={handleAddJobs}
        >
          <Text style={styles.addJob}>+</Text>
        </TouchableOpacity>
      </View>
      <Tab.Navigator>
        {jobsArr.map((jobName, index) => (
          <Tab.Screen name={jobName} component={HomeScreen} key={index} />
        ))}
      </Tab.Navigator>
    </Screens>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
    flexDirection: "row",
    width: "100%"
  },
  container: {
    flex: 1,
    justifyContent: "space-around"
  },
  addJob: {
    color: "#fff",
    fontSize: 50,
    textAlign: "right"
  },
  componentSpacing: {
    marginVertical: 10
  }
});
