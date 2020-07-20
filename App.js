import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import ViewPager from "@react-native-community/viewpager";
import OnboardingScreen from "./app/screens/OnboardingScreen";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  const [showRealApp, setShowRealApp] = useState(false);
  let pagerRef = useRef();
  let pageNumber = 0;

  const handleNext = () => {
    pagerRef.setPage(pageNumber + 1);
  };
  const handleStart = () => {
    setShowRealApp(true);
  };

  const onboardingData = [
    {
      header: "Easy To Use!",
      subHeader:
        "Get all the updates instantly without missing Experience a rich UI for your comfort",
      imageUri: require("./app/assets/onboardingScreen.png"),
      buttonTxt: "Next",
    },
    {
      header: "Easy To Use!",
      subHeader:
        "Get all the updates instantly without missing Experience a rich UI for your comfort",
      imageUri: require("./app/assets/onboardingScreen.png"),
      buttonTxt: "Next",
    },
    {
      header: "Easy To Use!",
      subHeader:
        "Get all the updates instantly without missing Experience a rich UI for your comfort",
      imageUri: require("./app/assets/onboardingScreen.png"),
      buttonTxt: "Start",
    },
  ];
  return showRealApp ? (
    <NavigationContainer theme={DarkTheme}>
      <AppNavigator />
    </NavigationContainer>
  ) : (
    <View style={{ flex: 1, backgroundColor: "#1A1A1A" }}>
      <ViewPager
        ref={(viewPager) => {
          pagerRef = viewPager;
        }}
        style={styles.viewPager}
        initialPage={pageNumber}
        showPageIndicator
        transitionStyle="curl"
        onPageSelected={(e) => (pageNumber = e.nativeEvent.position)}
      >
        {onboardingData.map((item) => (
          <View>
            <OnboardingScreen
              headerTxt={item.header}
              subHeaderTxt={item.subHeader}
              imageUri={item.imageUri}
              onNext={handleNext}
              onStart={handleStart}
              buttonTxt={item.buttonTxt}
            />
          </View>
        ))}
      </ViewPager>
    </View>
  );
}
const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    marginBottom: 70,
  },
});
