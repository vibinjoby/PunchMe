import React, { useState } from "react";
import { StyleSheet, View, Text, SectionList, Image } from "react-native";
import FontLoad from "./FontLoad";
import { AppLoading } from "expo";

function getItemLayout(item) {
  console.log("========== getItemLayout ========= " + item);
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
            <Text style={styles.punch_time}>
              {"PUNCH IN : " + item.punch_in}
            </Text>
            <Text style={[styles.punch_time, styles.padding_sm]}>
              {"PUNCH OUT : " + item.punch_out}
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

export default function RecyclerView(props) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const data = props.data;

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={FontLoad}
        onFinish={() => {
          setFontLoaded(true);
          setRefreshing(false);
        }}
      />
    );
  }

  return (
    <SectionList
      sections={data}
      keyExtractor={(item, index) => {
        return index;
      }}
      renderItem={({ item }) => {
        return getItemLayout(item);
      }}
      renderSectionHeader={({ section }) => {
        return getHeaderLayout(section.title);
      }}
      onRefresh={() => {
        setRefreshing(true);
        props.onRefresh();
      }}
      refreshing={refreshing}
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
