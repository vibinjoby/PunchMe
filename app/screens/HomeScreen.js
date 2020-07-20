import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import TimerComponent from "../components/home/TimerComponent";
import { MemoizedPunchInTimeComp } from "../components/home/PunchInComponent";
import { MemoizedDetailsComponent } from "../components/home/DetailsComponent";
import PunchButtonComponent from "../components/home/PunchButtonComponent";

import JobContext from "../context/JobContext";
import utils from "../helpers/utils";
import db from "../helpers/db";
import commons from "../config/commonConstants";

export default function HomeScreen({ route }) {
  //Fetch the route params for job title and hourly pay for saving in the activity log after user punches out
  const jobTitle = route.params && route.params.title;
  const jobEarning = route.params && route.params.hourlyPay;

  const [punchDetails, setPunchDetails] = useState([]);
  const [timerTime, setTimerTime] = useState({
    hour: commons.CLOCK_INITIAL_ZERO,
    minute: commons.CLOCK_INITIAL_ZERO,
    seconds: commons.CLOCK_INITIAL_ZERO,
  });
  const [breakTime, setBreakTime] = useState({
    hour: commons.CLOCK_INITIAL_ZERO,
    minute: commons.CLOCK_INITIAL_ZERO,
    seconds: commons.CLOCK_INITIAL_ZERO,
  });
  const [isBreak, setIsBreak] = useState(false);
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchTimerObj, setPunchTimerObj] = useState();
  const [breakTimerObj, setBreakTimerObj] = useState();

  let jobActivityDetails = {};

  const handlePunchIn = (isResuming, context) => {
    const punchInTime = utils.getCurrentTime();

    //When there is a active job started in another tab do not start a new one
    if (context && context.isJobActive)
      return Alert.alert(
        "Cannot Start Job!!",
        "You have already started a job, End the active job to start a new one"
      );
    context && context.onJobStart(true);

    setIsPunchedIn(true);
    const timer = setInterval(() => {
      timerTime.seconds = parseInt(timerTime.seconds) + 1;
      timerTime.seconds = utils.prefixZero(timerTime.seconds);
      if (parseInt(timerTime.seconds) === 60) {
        timerTime.minute = parseInt(timerTime.minute) + 1;
        timerTime.minute = utils.prefixZero(timerTime.minute);
        timerTime.seconds = 0;
      }
      if (parseInt(timerTime.minute) === 60) {
        timerTime.hour = (parseInt(timerTime.hour) + 1).toString();
        timerTime.hour = utils.prefixZero(timerTime.hour);
        timerTime.minute = 0;
      }
      setTimerTime({
        hour: timerTime.hour,
        minute: timerTime.minute,
        seconds: timerTime.seconds,
      });
    }, 1000);
    setPunchTimerObj(timer);
    updatePunchDetails(
      `${isResuming ? "Resuming" : "Started"} shift at ${punchInTime}`,
      true
    );

    //Add the punch in time to activity log
    jobActivityDetails.punchIn = punchInTime;
  };

  const handlePunchOut = (context) => {
    const punchOutTime = utils.getCurrentTime();
    // Remove the flag in the context when the job ends
    context && context.onJobStart(false);

    setIsPunchedIn(false);
    setIsBreak(false);

    clearInterval(punchTimerObj);
    clearInterval(breakTimerObj);
    updatePunchDetails(`Ending shift at ${punchOutTime}`);

    // Add the punch out time,break time and total hours worked to activity log
    jobActivityDetails.punchOut = punchOutTime;
    jobActivityDetails.breakTime = `${breakTime.minute} minutes`;
    jobActivityDetails.totalHours = `${timerTime.hour} hours ${timerTime.minute} minutes`;

    // Save the activity details to DB after punching out
    db.addActivity(
      jobTitle,
      jobActivityDetails.totalHours,
      jobActivityDetails.breakTime,
      jobEarning,
      jobActivityDetails.punchIn,
      jobActivityDetails.punchOut
    )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePunchDetails = (message, inTime) => {
    const newPunchDetails = [...punchDetails];
    newPunchDetails.push({
      id: punchDetails.length + 1,
      message,
      ...(inTime && { punchInTime: utils.getCurrentTime() }),
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
      breakTime.seconds = utils.prefixZero(breakTime.seconds);
      if (parseInt(breakTime.seconds) === 60) {
        breakTime.minute = parseInt(breakTime.minute) + 1;
        breakTime.minute = utils.prefixZero(breakTime.minute);
        breakTime.seconds = 0;
      }
      if (parseInt(breakTime.minute) === 60) {
        breakTime.hour = (parseInt(breakTime.hour) + 1).toString();
        breakTime.hour = utils.prefixZero(breakTime.hour);
        breakTime.minute = 0;
      }
      setBreakTime({
        hour: breakTime.hour,
        minute: breakTime.minute,
        seconds: breakTime.seconds,
      });
    }, 1000);
    setBreakTimerObj(timer);

    updatePunchDetails(`Break at ${utils.getCurrentTime()}`);
  };

  const handleResume = () => {
    setIsBreak(false);
    clearInterval(breakTimerObj);
    handlePunchIn(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.componentSpacing}>
        <TimerComponent
          timerTime={timerTime}
          breakTime={breakTime}
          isBreak={isBreak}
        />
      </View>
      <View style={styles.componentSpacing}>
        <MemoizedPunchInTimeComp data={punchDetails} />
      </View>
      <View style={styles.componentSpacing}>
        <MemoizedDetailsComponent data={punchDetails} />
      </View>
      <View style={styles.componentSpacing}>
        <JobContext.Consumer>
          {(context) => (
            <PunchButtonComponent
              onPunchIn={() => handlePunchIn(false, context)}
              onPunchOut={() => handlePunchOut(context)}
              onBreak={handleBreak}
              onResume={handleResume}
              isBreak={isBreak}
              isPunchedIn={isPunchedIn}
            />
          )}
        </JobContext.Consumer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  componentSpacing: {
    marginVertical: 10,
  },
});
