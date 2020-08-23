import React from "react";
import { StyleSheet } from "react-native";
import FlexiView from "../general/FlexiView";
import FlexiText from "../general/FlexiText";

const ScheduleView = (item) => {
  const schedule = item.scheduleToday;

  return (
    <FlexiView style={styles.scheduleContainer} layoutType={3}>
      <FlexiView style={styles.scheduleHolder} layoutType={2}>
        <FlexiText
          style={styles.scheduleHeadingText}
          text="Schedule"
          fontFamily="Bold"
          fontSize={22}
        />
        <FlexiText
          style={styles.scheduleSubHeadingText}
          text="July 26, 2020"
          fontFamily="light"
          fontSize={18}
        />
        <FlexiText
          style={styles.scheduleText}
          text="No shifts today"
          fontFamily="light"
          fontSize={18}
          noColorChange={true}
          color="#D45779"
        />
      </FlexiView>
    </FlexiView>
  );
};

const styles = StyleSheet.create({
  scheduleContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 0,
    paddingRight: 0,
  },

  scheduleHolder: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },

  scheduleHeadingText: {
    paddingTop: 0,
    paddingBottom: 0,
  },

  scheduleSubHeadingText: {
    paddingTop: 10,
    paddingBottom: 10,
  },

  scheduleText: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default ScheduleView;
