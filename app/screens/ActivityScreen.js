import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Toolbar from "../components/activity/Toolbar";
import EmptyActivity from "../components/activity/EmptyActivity";
import RecyclerView from "../components/activity/RecyclerView";
import db from "../helpers/db";
import { AppLoading } from "expo";
import util from "../helpers/utils";

function getActivitiesFromDB(callback) {
  console.log("inside");
  db.fetchActivities().then((data) => {
    console.log("======== fetchActivities " + new Date() + " ==========");
    callback(data);
  });
}

export default function ActivityScreen() {
  const [data, setData] = useState();
  const [activityLoaded, setActivityLoaded] = useState(false);

  // useEffect(() => {
  //   db.fetchActivities().then((data) => {
  //     setData(data);
  //   });
  // }, []);

  if (!activityLoaded && !data) {
    return (
      <View>
        <Toolbar title="All Activity"></Toolbar>
        <View style={[styles.emptyContainer]}>
          <EmptyActivity message="NO ACTIVITY FOUND" />
        </View>
        <AppLoading
          startAsync={() => {
            console.log("======== startAsync " + new Date() + " ==========");
            getActivitiesFromDB((data) => {
              setData(getFormattedData(data.rows));
            });
          }}
          onFinish={() => {
            console.log("======== onFinish " + new Date() + " ==========");
            setActivityLoaded(true);
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Toolbar title="All Activity"></Toolbar>
        {/* <View style={[styles.emptyContainer]}>
          <EmptyActivity message="NO ACTIVITY FOUND" />
        </View> */}
        <View style={styles.activityContainer}>
          <RecyclerView data={data}></RecyclerView>
        </View>
      </View>
    </SafeAreaView>
  );
}

function getFormattedData(data) {
  console.log(data);
  let logs = new Map();
  for (let i = 0; i < data.length; i++) {
    let row = data.item(i);
    let key = row.created_timestamp;
    key = util.getFormattedDate(key);
    if (logs.has(key)) {
      let logsArray = logs.get(key);
      logsArray.push(row);
    } else {
      let logsArray = [row];
      logs.set(key, logsArray);
    }
  }

  let jsonLogs = [];
  for (const [key, value] of logs) {
    let row = {
      title: key,
      data: value,
    };
    jsonLogs.push(row);
  }

  console.log(jsonLogs);
  return jsonLogs;
}

const styles = StyleSheet.create({
  emptyContainer: {
    width: "100%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  activityContainer: {
    width: "100%",
    height: "90%",
  },
});
