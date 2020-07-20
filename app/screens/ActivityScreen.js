import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Toolbar from "../components/activity/Toolbar";
import EmptyActivity from "../components/activity/EmptyActivity";
import RecyclerView from "../components/activity/RecyclerView";

export default function ActivityScreen() {
  return (
    <SafeAreaView>
      <View>
        <Toolbar title="All Activity"></Toolbar>
        {/* <View style={[styles.emptyContainer]}>
          <EmptyActivity message="NO ACTIVITY FOUND" />
        </View> */}
        <View style={styles.activityContainer}>
          <RecyclerView></RecyclerView>
        </View>
      </View>
    </SafeAreaView>
  );
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
