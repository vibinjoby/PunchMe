import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Toolbar from "../components/activity/Toolbar";
import EmptyActivity from "../components/activity/EmptyActivity";
import RecyclerView from "../components/activity/RecyclerView";
import util from "../helpers/utils";
import logService from "../services/logService";
import FlexiView from "../components/activity/general/FlexiView";
import db from "../helpers/db";

const getActivitiesFromDB = async (callback) => {
  const result = await logService.getLogs();
  callback(result);
};

const getJobsFromDB = () => {
  return db.fetchJobs();
};

const getSchedules = (callback) => {
  // const schedules =
};

export default function ActivityScreen() {
  const [data, setData] = useState();
  const [activityLoaded, setActivityLoaded] = useState(false);

  if (!activityLoaded || !data) {
    setTimeout(() => {
      getFormattedJobs(getJobsFromDB());
      getActivitiesFromDB((jsonRes) => {
        setActivityLoaded(true);
        if (jsonRes) {
          console.log("============ DATA => " + JSON.stringify(jsonRes.data));
          const success = jsonRes.data.success;
          if (success) {
            let jsonLog = getFormattedData(jsonRes.data.logs);
            setData(jsonLog);
          } else {
            setData(null);
          }
        }
      });
    }, 1000);

    return (
      <SafeAreaView>
        <FlexiView>
          <Toolbar title="Logs"></Toolbar>
          <ActivityIndicator
            style={styles.loader}
            size="small"
            color="#FFAA20"
          />
        </FlexiView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <FlexiView>
        <Toolbar title="Logs"></Toolbar>
        <FlexiView style={styles.activityContainer}>
          {getBodyLayout(data)}
        </FlexiView>
      </FlexiView>
    </SafeAreaView>
  );

  function getBodyLayout(data) {
    if (data && data.length > 0) {
      console.log("======== getBodyLayout if ====== " + data.length);
      return (
        <RecyclerView
          data={data}
          onRefresh={() => {
            setActivityLoaded(false);
          }}
        ></RecyclerView>
      );
    } else {
      console.log("======== getBodyLayout else ====== ");
      return (
        <FlexiView style={styles.emptyContainer}>
          <EmptyActivity
            style={styles.emptyContainer}
            message="NO ACTIVITY FOUND"
            onPress={() => {
              setActivityLoaded(false);
            }}
          />
        </FlexiView>
      );
    }
  }
}

function getFormattedJobs(jobs) {
  console.log("======= JOBS ========= " + JSON.stringify(jobs));
}

function getFormattedData(data) {
  console.log(" =========== getFormattedData ========== " + data);

  let listViewItems = [];

  for (let i = 0; i < data.length; i++) {
    let log = data[i];
    let key = log.log_start;
    key = util.getFormatedDateFromMillies(key);
    const start = util.getOnlyTime(log.log_start);
    const end = util.getOnlyTime(log.log_end);
    let hours = util.getDateDifference(log.log_start, log.log_end);
    let breakHours = "0h";
    let pay = 14 * hours;
    const logItem = {
      type: 3,
      log_date: key,
      log_hours: hours + "h",
      log_start: start,
      log_end: end,
      log_break: breakHours,
      log_pay: "$" + pay,
    };

    listViewItems.push(logItem);
  }

  if (listViewItems.length > 0) {
    const logHeading = {
      type: 2,
    };
    listViewItems.unshift(logHeading);
    const logOverView = {
      type: 1,
    };
    listViewItems.unshift(logOverView);
    const logSchedule = {
      type: 0,
    };
    listViewItems.unshift(logSchedule);
  }
  return listViewItems;
}

const styles = StyleSheet.create({
  emptyContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activityContainer: {
    width: "100%",
    height: "95%",
  },
  loader: {
    flex: 2,
    margin: 20,
    alignSelf: "center",
  },
});
