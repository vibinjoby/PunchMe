import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import Screens from "../components/Screens";
import HeaderComponent from "../components/home/HeaderComponent";
import NoJobsScreen from "../screens/NoJobsScreen";
import db from "../helpers/db";
import colors from "../config/colors";
import JobContext from "../context/JobContext";

const Tab = createMaterialTopTabNavigator();
export default function JobNavigator({ route, navigation }) {
  const [jobsArr, setJobsArr] = useState([]);
  const [isJobActive, setIsJobActive] = useState(false);
  const [hourlyPay, setHourlyPay] = useState();
  const [jobTitle, setJobTitle] = useState();

  const HomeComponent = () => (
    <HomeScreen jobTitle={jobTitle} hourlyPay={hourlyPay} />
  );

  const handleActiveJobs = () => {
    setIsJobActive(!isJobActive);
  };

  const handleDataFromDB = data => {
    //Append the data from db to jobs array state to re-render the component with data
    if (data && data.rows._array) {
      const jobsDataArr = [];
      data.rows._array.forEach(e =>
        jobsDataArr.push({ name: e.job_name, hourlyPay: e.hourly_pay })
      );
      setJobsArr(jobsDataArr);
    }
  };

  //re-render the component only if a new job is added
  useEffect(() => {
    //Fetch jobs from database
    db.fetchJobs()
      .then(data => handleDataFromDB(data))
      .catch(err => console.log(err));
  }, [route.params]);

  return (
    <Screens>
      <HeaderComponent navigation={navigation} />
      {jobsArr.length === 0 ? (
        <NoJobsScreen />
      ) : (
        <JobContext.Provider
          value={{ isJobActive, onJobStart: handleActiveJobs }}
        >
          <Tab.Navigator
            tabBarOptions={{
              style: { backgroundColor: "black" },
              indicatorStyle: { backgroundColor: colors.white },
              scrollEnabled: true,
              labelStyle: { fontSize: 15, fontWeight: "bold" }
            }}
          >
            {jobsArr.map((job, index) => (
              <Tab.Screen
                name={job.name}
                component={HomeScreen}
                key={index}
                initialParams={{ title: job.name, hourlyPay: job.hourly_pay }}
              />
            ))}
          </Tab.Navigator>
        </JobContext.Provider>
      )}
    </Screens>
  );
}
