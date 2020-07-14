import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import Screens from "../components/Screens";
import TimerComponent from "../components/home/TimerComponent";
import { MemoizedPunchInTimeComp } from "../components/home/PunchInComponent";
import { MemoizedDetailsComponent } from "../components/home/DetailsComponent";
import PunchButtonComponent from "../components/home/PunchButtonComponent";
import moment from "moment";

export default function HomeScreen() {
  const [punchDetails, setPunchDetails] = useState([]);
  const [timerTime, setTimerTime] = useState({
    hour: "00",
    minute: "00",
    seconds: "00"
  });
  const [breakTime, setBreakTime] = useState({
    hour: "00",
    minute: "00",
    seconds: "00"
  });
  const [isBreak, setIsBreak] = useState(false);
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchTimerObj, setPunchTimerObj] = useState();
  const [breakTimerObj, setBreakTimerObj] = useState();

  const prefixZero = number => {
    return parseInt(number) < 10 ? `0${number}` : number;
  };

  const getCurrentTime = () => {
    return moment(new Date()).format("hh:mm A");
  };

  const handlePunchIn = isResuming => {
    setIsPunchedIn(true);
    const timer = setInterval(() => {
      timerTime.seconds = parseInt(timerTime.seconds) + 1;
      timerTime.seconds = prefixZero(timerTime.seconds);
      if (parseInt(timerTime.seconds) === 60) {
        timerTime.minute = parseInt(timerTime.minute) + 1;
        timerTime.minute = prefixZero(timerTime.minute);
        timerTime.seconds = 0;
      }
      if (parseInt(timerTime.minute) === 60) {
        timerTime.hour = (parseInt(timerTime.hour) + 1).toString();
        timerTime.hour = prefixZero(timerTime.hour);
        timerTime.minute = 0;
      }
      setTimerTime({
        hour: timerTime.hour,
        minute: timerTime.minute,
        seconds: timerTime.seconds
      });
    }, 1000);
    setPunchTimerObj(timer);
    updatePunchDetails(
      `${isResuming ? "Resuming" : "Started"} shift at ${getCurrentTime()}`,
      true
    );
  };

  const handlePunchOut = () => {
    setIsPunchedIn(false);

    clearInterval(punchTimerObj);
    clearInterval(breakTimerObj);
    updatePunchDetails(`Ending shift at ${getCurrentTime()}`);
  };

  const updatePunchDetails = (message, inTime) => {
    const newPunchDetails = [...punchDetails];
    newPunchDetails.push({
      id: punchDetails.length + 1,
      message,
      ...(inTime && { punchInTime: getCurrentTime() })
    });
    setPunchDetails(newPunchDetails);
  };

  const handleBreak = () => {
    if (!isPunchedIn) {
      return Alert.alert(
        "Not Punched In!!!",
        "Please punch in first to take break"
      );
    }
    setIsBreak(true);
    clearInterval(punchTimerObj);
    const timer = setInterval(() => {
      breakTime.seconds = parseInt(breakTime.seconds) + 1;
      breakTime.seconds = prefixZero(breakTime.seconds);
      if (parseInt(breakTime.seconds) === 60) {
        breakTime.minute = parseInt(breakTime.minute) + 1;
        breakTime.minute = prefixZero(breakTime.minute);
        breakTime.seconds = 0;
      }
      if (parseInt(breakTime.minute) === 60) {
        breakTime.hour = (parseInt(breakTime.hour) + 1).toString();
        breakTime.hour = prefixZero(breakTime.hour);
        breakTime.minute = 0;
      }
      setBreakTime({
        hour: breakTime.hour,
        minute: breakTime.minute,
        seconds: breakTime.seconds
      });
    }, 1000);
    setBreakTimerObj(timer);

    updatePunchDetails(`Break at ${getCurrentTime()}`);
  };

  const handleResume = () => {
    setIsBreak(false);
    clearInterval(breakTimerObj);
    handlePunchIn(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.componentSpacing}>
        <TimerComponent timerTime={timerTime} breakTime={breakTime} />
      </View>
      <View style={styles.componentSpacing}>
        <MemoizedPunchInTimeComp data={punchDetails} />
      </View>
      <View style={styles.componentSpacing}>
        <MemoizedDetailsComponent data={punchDetails} />
      </View>
      <View style={styles.componentSpacing}>
        <PunchButtonComponent
          onPunchIn={() => handlePunchIn(false)}
          onPunchOut={handlePunchOut}
          onBreak={handleBreak}
          onResume={handleResume}
          isBreak={isBreak}
          isPunchedIn={isPunchedIn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
    flexDirection: "row",
    width: "100%"
  },
  container: {
    flex: 1,
    justifyContent: "space-around"
  },
  addJob: {
    color: "#fff",
    fontSize: 50,
    textAlign: "right"
  },
  componentSpacing: {
    marginVertical: 10
  }
});
