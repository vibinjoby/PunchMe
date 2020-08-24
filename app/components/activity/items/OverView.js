import React from "react";
import { StyleSheet } from "react-native";
import FlexiView from "../general/FlexiView";
import FlexiText from "../general/FlexiText";
import DropDownPicker from "react-native-dropdown-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const OverView = (props) => {
  const data = [
    {
      id: 1,
      label: "Amecan",
      value: "Amecan",
    },
    {
      id: 2,
      label: "Security",
      value: "Security",
    },
    {
      id: 3,
      label: "Sobeys",
      value: "Sobeys",
    },
    {
      id: 4,
      label: "FoodLand",
      value: "FoodLand",
    },
  ];

  return (
    <FlexiView style={styles.overViewContainer}>
      <FlexiView style={styles.dropDownContainer}>
        <DropDownPicker
          items={data}
          style={styles.dropdown}
          defaultValue={data[0].value}
          containerStyle={{ height: 38 }}
          itemStyle={styles.dropdownItem}
          dropDownStyle={styles.dropDownItems}
          labelStyle={styles.dropDownLabel}
        />
      </FlexiView>

      <FlexiView style={styles.overViewHolder} layoutType={2}>
        <FlexiView style={styles.tabContainer} layoutType={2}>
          <TouchableOpacity>
            <FlexiText
              style={styles.tabFirst}
              text="DAY TOTAL"
              fontFamily="Bold"
              fontSize={18}
              noColorChange={true}
              color="#FFAA20"
            ></FlexiText>
            <FlexiView
              style={styles.tabLine}
              noColorChange={true}
              color="#FFAA20"
            ></FlexiView>
          </TouchableOpacity>
          <TouchableOpacity>
            <FlexiText
              style={styles.tabSecond}
              text="WEEK TOTAL"
              fontFamily="Bold"
              fontSize={18}
            ></FlexiText>
          </TouchableOpacity>
        </FlexiView>
        <FlexiView style={styles.graphContainer} layoutType={2}>
          <AnimatedCircularProgress
            size={200}
            width={10}
            fill={35}
            rotation={360}
            tintColor="#4B4BF9"
            onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor="#2B2E33"
          />
          <FlexiView style={styles.graphInfo} layoutType={2}>
            <FlexiText text="08h 1m" fontFamily="Bold" fontSize={30} />
            <FlexiText text="of 8h" fontFamily="light" fontSize={20} />
          </FlexiView>
        </FlexiView>
        <FlexiView style={styles.fragment} layoutType={2}>
          <FlexiView style={styles.infoContainer}>
            <FlexiView style={styles.halfSpace} layoutType={2}>
              <FlexiText
                style={styles.infoKey}
                text="START TIME"
                fontFamily="light"
                fontSize={14}
              />
              <FlexiText
                style={styles.infoValue}
                text="7:13 AM"
                fontFamily="light"
                fontSize={12}
                noColorChange={true}
                color="#D1D1D1"
              />
            </FlexiView>
            <FlexiText
              style={styles.divider}
              noColorChange={true}
              color="#707070"
            />
            <FlexiView style={styles.halfSpace} layoutType={2}>
              <FlexiText
                style={styles.infoKey}
                text="END TIME"
                fontFamily="light"
                fontSize={14}
              />
              <FlexiText
                style={styles.infoValue}
                text="7:13 PM"
                fontFamily="light"
                fontSize={12}
                noColorChange={true}
                color="#D1D1D1"
              />
            </FlexiView>
          </FlexiView>
        </FlexiView>
      </FlexiView>
    </FlexiView>
  );
};

const styles = StyleSheet.create({
  overViewContainer: {
    paddingBottom: 30,
    paddingLeft: 0,
    paddingRight: 0,
  },

  overViewHolder: {
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  dropDownContainer: {
    zIndex: 10,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 30,
  },
  dropdown: {
    flex: 0.3,
    width: "30%",
    marginEnd: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  dropDownItems: {
    width: "30%",
    justifyContent: "flex-end",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    color: "#ffffff",
  },
  dropdownItem: {
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: "center",
  },
  dropDownLabel: {
    fontFamily: "ProximaNovaAltLight",
    textAlign: "center",
    fontSize: 14,
  },
  row: {
    justifyContent: "center",
    alignItems: "center",
  },
  fragment: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tabFirst: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 4,
    paddingTop: 4,
  },
  tabSecond: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 4,
    paddingTop: 4,
  },
  tabLine: {
    marginTop: 6,
    paddingBottom: 2,
    paddingTop: 2,
  },
  graphContainer: {
    paddingBottom: 16,
    paddingTop: 16,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  graphInfo: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  halfSpace: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
  },
  infoKey: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  infoValue: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  divider: {
    flex: 0.01,
  },
});

export default OverView;
