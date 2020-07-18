import React, { useEffect, useRef } from "react";
import { Animated, Text, Easing } from "react-native";

export default function CustomBlinkTextComponent({
  style,
  blinkPeriod,
  children,
  intervalPeriod
}) {
  //Set the initial opacity value to 0
  const initialOpacityVal = blinkPeriod ? 0 : 1;
  const fadeAnim = useRef(new Animated.Value(initialOpacityVal)).current;
  let isFade = true;

  useEffect(() => {
    //For fade in animation change the opacity value to 1
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: blinkPeriod,
      useNativeDriver: true,
      easing: Easing.linear
    });

    //For Fade out animation change the opacity value to 0
    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: blinkPeriod,
      useNativeDriver: true
    });

    setInterval(
      //IIFE to execute the function first time without any delay for the animation
      (function repeatAnimation() {
        isFade ? fadeIn.start() : fadeOut.start();
        // toggle the bool for every fade
        isFade = !isFade;
        return repeatAnimation;
      })(),
      intervalPeriod
    );
  }, [blinkPeriod]);
  return (
    <Animated.View
      style={{
        opacity: fadeAnim
      }}
    >
      <Text style={style}>{children}</Text>
    </Animated.View>
  );
}
