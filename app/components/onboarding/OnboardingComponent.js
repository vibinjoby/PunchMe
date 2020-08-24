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
    if (pageNumber == 2) {
      handleSignIn();
    } else {
      pagerRef.setPage(pageNumber + 1);
    }
  };
  const handlePrevious = () => {
    pagerRef.setPage(pageNumber - 1);
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
        transitionStyle="scroll"
        onPageSelected={(e) => (pageNumber = e.nativeEvent.position)}
      >
        {onboardingData.map((item) => (
          <View key={item.id}>
            <OnboardingScreen
              headerTxt={item.header}
              imageUri={item.imageUri}
              position={item.id}
              onNext={handleNext}
              onPrev={handlePrevious}
              onSignIn={handleStart}
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
    marginBottom: 30,
  },
});
