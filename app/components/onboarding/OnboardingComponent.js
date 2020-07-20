import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import ViewPager from "@react-native-community/viewpager";
import OnboardingScreen from "../../screens/OnboardingScreen";
import commons from "../../config/commonConstants";

export default function OnboardingComponent({ handleStart }) {
  const onboardingData = commons.ONBOARDING_DATA;
  let pageNumber = 0;

  let pagerRef = useRef();

  const handleNext = () => {
    pagerRef.setPage(pageNumber + 1);
  };
  return (
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
          <View key={item.id}>
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
