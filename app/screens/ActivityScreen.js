import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
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

  if (!activityLoaded && !data) {
    return (
      <SafeAreaView>
        <View>
          <Toolbar title="All Activity"></Toolbar>
          <ActivityIndicator
            style={styles.loader}
            size="small"
            color="#FFAA20"
          />
          <AppLoading
            startAsync={() => {
              getActivitiesFromDB((data) => {
                setTimeout(() => {
                  setData(getFormattedData(data.rows));
                }, 1000);
              });
            }}
            onFinish={() => {
              setActivityLoaded(true);
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Toolbar title="All Activity"></Toolbar>
        <View style={styles.activityContainer}>{getBodyLayout(data)}</View>
      </View>
    </SafeAreaView>
  );
}

function getBodyLayout(data) {
  if (data) {
    return <RecyclerView data={data}></RecyclerView>;
  } else {
    return (
      <View style={styles.emptyContainer}>
        <EmptyActivity
          style={styles.emptyContainer}
          message="NO ACTIVITY FOUND"
        />
      </View>
    );
  }
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
    alignSelf: "center",
  },
  activityContainer: {
    width: "100%",
    height: "90%",
  },
  loader: {
    margin: 20,
    alignSelf: "center",
  },
});
