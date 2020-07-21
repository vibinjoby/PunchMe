import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SectionList,
  Image,
  RefreshControl,
} from "react-native";
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
      <Text numberOfLines={1} style={styles.headerText}>
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
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setTimeout(() => {
              props.onRefresh();
            }, 1000);
          }}
          colors="#FFAA20"
        ></RefreshControl>
      }
    ></SectionList>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: "#FFFFFF",
    fontSize: 16,
    padding: 6,
    alignSelf: "center",
    fontFamily: "ProximaNovaAltLight",
    marginTop: 22,
    marginBottom: 7,
    borderRadius: 8,
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 3,
    backgroundColor: "#000000",
    overflow: "hidden",
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
