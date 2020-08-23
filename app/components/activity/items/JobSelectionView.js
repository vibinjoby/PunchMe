import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import FlexiView from "../general/FlexiView";

const JobSelectionView = (props) => {
  //   const [selectedJobPosition, setSelectedJobPosition] = useState(0);

  const data = [
    {
      id: 1,
      value: "Amecan",
    },
    {
      id: 2,
      value: "Security",
    },
    {
      id: 3,
      value: "Sobeys",
    },
    {
      id: 4,
      value: "FoodLand",
    },
  ];

  return (
    <FlexiView style={styles.jobContainer}>
      <FlexiView style={styles.jobLeftSide} />
      <FlexiView style={styles.jobRightSide}>
        <DropDownPicker
          items={data}
          defaultValue={data[0].value}
          containerStyle={{ height: 40 }}
          itemStyle={{ justifyContent: "center" }}
          dropDownStyle={{ backgroundColor: "#373737" }}
        />
      </FlexiView>
    </FlexiView>
  );
};

const styles = StyleSheet.create({
  jobContainer: {
    flex: 1,
    flexDirection: "row",
  },
  jobLeftSide: {
    flex: 0.6,
  },
  jobRightSide: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4,
    height: "60%",
  },
  dropDown: {
    borderRadius: 8,
  },
});

export default JobSelectionView;
