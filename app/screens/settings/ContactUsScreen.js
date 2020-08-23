import { Text, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import colors from "../../config/colors";
import AppThemeContext from "../../context/AppThemeContext";
import { useColorScheme } from "react-native-appearance";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Divider from "../../components/Divider";

export default function ContactUsScreen() {
  //Theme
  const appTheme = useContext(AppThemeContext);
  const systemTheme = useColorScheme();
  const themeColor =
    appTheme.theme === "systemTheme" ? systemTheme : appTheme.theme;

  const ContactContentComp = ({ title, subTitle, iconName }) => (
    <View
      style={[
        styles.contentContainer,
        themeColor === "dark" && { backgroundColor: "#1A1A1A" }
      ]}
    >
      <View style={styles.content}>
        <Text
          style={[
            styles.contentTitle,
            themeColor === "dark" && { color: colors.white }
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.contentSubTitle,
            themeColor === "dark" && { color: colors.white }
          ]}
        >
          {subTitle}
        </Text>
      </View>
      <View style={styles.iconImg}>
        <MaterialCommunityIcons
          name={iconName}
          size={40}
          color={themeColor === "dark" ? colors.white : colors.black}
        />
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        themeColor === "light" && { backgroundColor: "#EEEEEE" }
      ]}
    >
      <View
        style={[
          styles.contactContainer,
          ,
          themeColor === "dark" && { backgroundColor: "#1A1A1A" }
        ]}
      >
        <Text
          style={[
            styles.header,
            themeColor === "dark" && { color: colors.white }
          ]}
        >
          Get in Touch
        </Text>
        <Text style={styles.subHeader}>Reach us your way 24/7</Text>
        <ContactContentComp
          title="Call us"
          subTitle="+1 437 246 1995"
          iconName="phone"
        />
        <Divider />
        <ContactContentComp
          title="Email us"
          subTitle="punchme2020@gmail.com"
          iconName="email"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  },
  contactContainer: {
    backgroundColor: colors.white,
    marginTop: 20,
    paddingLeft: 20,
    paddingTop: 20
  },
  header: {
    fontSize: 22,
    fontFamily: "ProximaNovaBold",
    color: colors.black
  },
  subHeader: {
    color: "#666666",
    fontFamily: "ProximaNovaRegular",
    fontSize: 18,
    marginTop: 30
  },
  contentTitle: {
    fontFamily: "ProximaNovaAltLight",
    fontSize: 22
  },
  contentSubTitle: {
    marginTop: 10,
    fontFamily: "ProximaNovaRegular",
    fontSize: 20
  },
  contentContainer: {
    marginTop: 20,
    flexDirection: "row",
    marginBottom: 20
  },
  iconImg: {
    position: "absolute",
    right: 0,
    height: 50,
    width: 50,
    alignSelf: "flex-end"
  }
});
