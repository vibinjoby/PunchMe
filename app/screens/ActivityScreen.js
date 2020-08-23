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
import db from "../helpers/db";
import util from "../helpers/utils";

function getActivitiesFromDB(callback) {
  db.fetchActivities().then((data) => {
    callback(data);
  });
}

export default function ActivityScreen() {
  const [data, setData] = useState();
  const [activityLoaded, setActivityLoaded] = useState(false);

  if (!activityLoaded || !data) {
    getActivitiesFromDB((data) => {
      setTimeout(() => {
        setActivityLoaded(true);
        if (data) {
          let jsonLog = getFormattedData(data.rows);
          setData(jsonLog);
        }
      }, 1000);
    });

    return (
      <SafeAreaView>
        <View>
          <Toolbar title="All Activity"></Toolbar>
          <ActivityIndicator
            style={styles.loader}
            size="small"
            color="#FFAA20"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Toolbar title="Logs"></Toolbar>
        <View style={styles.activityContainer}>{getBodyLayout(data)}</View>
      </View>
    </SafeAreaView>
  );

  function getBodyLayout(data) {
    if (!(data && data.length > 0)) {
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
        <View style={styles.emptyContainer}>
          <EmptyActivity
            style={styles.emptyContainer}
            message="NO ACTIVITY FOUND"
            onPress={() => {
              setActivityLoaded(false);
            }}
          />
        </View>
      );
    }
  }
}

function getFormattedData(data) {
  console.log(" =========== getFormattedData ========== " + data);
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

  console.log("====== getFormattedData ========= " + jsonLogs);
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
  loader: {
    flex: 2,
    margin: 20,
    alignSelf: "center",
  },
});
