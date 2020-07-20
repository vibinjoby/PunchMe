import React, { useState } from "react";
import { StyleSheet, View, Text, SectionList, Image } from "react-native";
import FontLoad from "./FontLoad";
import { AppLoading } from "expo";

const LOGS = [
  {
    log_id: 1,
    date: "Today",
    data: [
      {
        id: 1,
        activity_title: "Foodland Job",
        work_description: "Worked for 8 hours 31 minutes",
        break_description: "Break 30 minutes",
        earning_description: "You earned CAD 116.34",
        punch_in: "PUNCH IN : 09:59 AM",
        punch_out: "PUNCH OUT : 06:32 PM",
      },
      {
        id: 2,
        activity_title: "Security Job",
        work_description: "Worked for 5 hours 30 minutes",
        break_description: "Break 30 minutes",
        earning_description: "You earned CAD 116.34",
        punch_in: "PUNCH IN : 09:59 AM",
        punch_out: "PUNCH OUT : 06:32 PM",
      },
    ],
  },
  {
    log_id: 2,
    date: "Yesterday",
    data: [
      {
        id: 1,
        activity_title: "Foodland Job",
        work_description: "Worked for 8 hours 31 minutes",
        break_description: "Break 30 minutes",
        earning_description: "You earned CAD 116.34",
        punch_in: "PUNCH IN : 09:59 AM",
        punch_out: "PUNCH OUT : 06:32 PM",
      },
      {
        id: 2,
        activity_title: "Security Job",
        work_description: "Worked for 5 hours 30 minutes",
        break_description: "Break 30 minutes",
        earning_description: "You earned CAD 116.34",
        punch_in: "PUNCH IN : 09:59 AM",
        punch_out: "PUNCH OUT : 06:32 PM",
      },
    ],
  },
];

function getItemLayout(item) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemInnerContainer}>
        <Image
          style={styles.bagIcon}
          source={require("../../assets/work.png")}
        />
        <View style={styles.logDetailsContainer}>
          <Text style={styles.title}>{item.activity_title}</Text>
          <Text style={styles.sub_title}>{item.work_description}</Text>
          <Text style={styles.work_description}>{item.break_description}</Text>
          <Text style={styles.earning_description}>
            {item.earning_description}
          </Text>
          <View style={styles.punch_time_container}>
            <Text style={styles.punch_time}>{item.punch_in}</Text>
            <Text style={[styles.punch_time, styles.padding_sm]}>
              {item.punch_out}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function getHeaderLayout(title) {
  return (
    <View>
      <Text numberOfLines={1} style={styles.header}>
        {title.toUpperCase()}
      </Text>
    </View>
  );
}

export default function RecyclerView() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={FontLoad}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <SectionList
      sections={LOGS}
      keyExtractor={(item, index) => {
        return index;
      }}
      renderItem={({ item }) => {
        return getItemLayout(item);
      }}
      renderSectionHeader={({ section }) => {
        return getHeaderLayout(section.date);
      }}
    ></SectionList>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    color: "#7D7D7D",
    alignSelf: "center",
    paddingTop: 18,
    paddingBottom: 18,
    fontFamily: "ProximaNovaAltLight",
  },
  itemContainer: {
    backgroundColor: "#000000",
    marginTop: 15,
    marginBottom: 15,
  },
  itemInnerContainer: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    padding: 20,
  },
  bagIcon: {
    alignSelf: "center",
  },
  logDetailsContainer: {
    padding: 12,
    paddingLeft: 20,
  },
  title: {
    fontFamily: "ProximaNovaAltBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  sub_title: {
    marginTop: 6,
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "ProximaNovaAltLight",
  },
  work_description: {
    marginTop: 8,
    fontSize: 14,
    color: "#7D7D7D",
    fontFamily: "ProximaNovaAltLight",
  },
  earning_description: {
    marginTop: 8,
    fontSize: 14,
    color: "#388E3C",
    fontFamily: "ProximaNovaAltLight",
  },

  punch_time_container: {
    flexDirection: "row",
    paddingTop: 10,
  },

  punch_time: {
    marginTop: 8,
    fontSize: 14,
    color: "#7D7D7D",
    fontFamily: "ProximaNovaAltLight",
  },

  padding_sm: {
    paddingLeft: 10,
  },
});
