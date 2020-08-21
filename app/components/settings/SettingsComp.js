import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Text
} from "react-native";
import colors from "../../config/colors";

export default function SettingsComp({
  themeColor,
  navigation,
  linkText,
  imgUri,
  targetScreenName,
  iconColor,
  onPress
}) {
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => onPress(targetScreenName, navigation)}
      >
        <View
          style={[
            styles.section,
            themeColor === "light" && { backgroundColor: colors.white }
          ]}
        >
          <View style={[styles.iconBorder, { backgroundColor: iconColor }]}>
            <Image style={styles.img} source={imgUri} resizeMode="contain" />
          </View>
          <Text
            style={[
              styles.text,
              themeColor === "dark" && { color: colors.white }
            ]}
          >
            {linkText}
          </Text>
          <Image
            style={styles.next}
            source={require("../../assets/next.png")}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: "black",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#969696"
  },
  iconBorder: {
    backgroundColor: "tomato",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    textAlign: "left",
    fontFamily: "ProximaNovaRegular",
    fontSize: 17
  },
  img: {
    width: 25,
    height: 25
  },
  next: {
    width: 32,
    height: 20
  }
});
