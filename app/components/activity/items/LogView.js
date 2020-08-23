import React from "react";
import { StyleSheet } from "react-native";
import FlexiView from "../general/FlexiView";
import FlexiText from "../general/FlexiText";

const LogView = (props) => {
  return (
    <FlexiView style={styles.logContainer} layoutType={3}>
      <FlexiView style={styles.logHolder} layoutType={2}>
        <FlexiView style={styles.logRow} layoutType={2}>
          <FlexiText
            style={styles.logHeaderLeft}
            text="Sunday, July 26, 2020"
            fontFamily="light"
            fontSize={16}
          />
          <FlexiText
            style={styles.logHeaderRight}
            text="11h 00m"
            fontFamily="light"
            fontSize={16}
          />
        </FlexiView>
        <FlexiView style={styles.logRow} layoutType={2}>
          <FlexiView style={styles.logDataLeftContainer} layoutType={2}>
            <FlexiText
              style={styles.logTextKey}
              text="Start Time :"
              fontFamily="light"
              fontSize={16}
            />
            <FlexiText
              style={styles.logTextValue}
              noColorChange={true}
              color="#9E9E9E"
              text="10:00 AM"
              fontFamily="light"
              fontSize={16}
            />
          </FlexiView>
          <FlexiView style={styles.logDataRightContainer} layoutType={2}>
            <FlexiText
              style={styles.logTextKey}
              text="End Time :"
              fontFamily="light"
              fontSize={16}
            />
            <FlexiText
              style={styles.logTextValue}
              noColorChange={true}
              color="#9E9E9E"
              text="11:00 PM"
              fontFamily="light"
              fontSize={16}
            />
          </FlexiView>
        </FlexiView>
        <FlexiView style={styles.logRow} layoutType={2}>
          <FlexiView style={styles.logDataLeftContainer} layoutType={2}>
            <FlexiText
              style={styles.logTextKey}
              style={styles.logText}
              text="Total Break :"
              fontFamily="light"
              fontSize={16}
            />
            <FlexiText
              style={styles.logTextValue}
              noColorChange={true}
              color="#9E9E9E"
              text="0h 30m"
              fontFamily="light"
              fontSize={16}
            />
          </FlexiView>
          <FlexiView style={styles.logDataRightContainer} layoutType={2}>
            <FlexiText
              style={styles.logTextKey}
              text="Total Pay :"
              fontFamily="light"
              fontSize={14}
            />
            <FlexiText
              style={styles.logTextValue}
              text="$154"
              fontFamily="light"
              fontSize={16}
              noColorChange={true}
              color="#9E9E9E"
            />
          </FlexiView>
        </FlexiView>
      </FlexiView>
    </FlexiView>
  );
};

const styles = StyleSheet.create({
  logContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 0,
    paddingRight: 0,
  },

  logHolder: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },

  logRow: {
    alignItems: "center",
    flexDirection: "row",
  },

  logHeaderLeft: {
    flex: 0.7,
    paddingBottom: 10,
    paddingTop: 5,
  },
  logHeaderRight: {
    flex: 0.3,
  },

  logDataLeftContainer: {
    flexDirection: "row",
    flex: 0.6,
    paddingTop: 5,
    paddingBottom: 5,
  },
  logDataRightContainer: {
    flexDirection: "row",
    flex: 0.4,
    paddingTop: 5,
    paddingBottom: 5,
  },
  logTextKey: {},
  logTextValue: {
    paddingLeft: 4,
  },
});

export default LogView;
