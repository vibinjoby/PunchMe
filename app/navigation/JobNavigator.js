import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import Screens from "../components/Screens";
import HeaderComponent from "../components/home/HeaderComponent";
import NoJobsScreen from "../screens/NoJobsScreen";

const Tab = createMaterialTopTabNavigator();
export default function JobNavigator({ route, navigation }) {
  //TO-DO:-Fetch jobs from database
  const jobsArr = [];
  if (route && route.params && route.params.jobName) {
    jobsArr.push(route.params.jobName);
  }
  //re-render the component only if a new job is added
  useEffect(() => {}, [route.params && route.params.jobName]);

  return (
    <Screens>
      <HeaderComponent navigation={navigation} />
      {jobsArr.length === 0 ? (
        <NoJobsScreen />
      ) : (
        <Tab.Navigator>
          {jobsArr.map((jobName, index) => (
            <Tab.Screen name={jobName} component={HomeScreen} key={index} />
          ))}
        </Tab.Navigator>
      )}
    </Screens>
  );
}
