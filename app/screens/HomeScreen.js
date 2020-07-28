import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Alert, AppState } from "react-native";

import TimerComponent from "../components/home/TimerComponent";
import { MemoizedPunchInTimeComp } from "../components/home/PunchInComponent";
import { MemoizedDetailsComponent } from "../components/home/DetailsComponent";
import PunchButtonComponent from "../components/home/PunchButtonComponent";
import JobContext from "../context/JobContext";
import utils from "../helpers/utils";
import db from "../helpers/db";
import commons from "../config/commonConstants";
import Loader from "../helpers/Loader";

export default function HomeScreen({ route, navigation }) {
  let isMounted = false;
  let jobActivityDetails = {};
  let punchModelObj = {};

  //Fetch the route params for job title and hourly pay for saving in the activity log after user punches out
  const jobTitle = route.params && route.params.title;
  const jobEarning = route.params && route.params.hourlyPay;

  //Consume Context objects
  const jobContext = useContext(JobContext);

  const [isLoading, setIsLoading] = useState(false);

  const [punchInTime, setPunchInTime] = useState();
  const [punchDetails, setPunchDetails] = useState([]);
  const [timerTime, setTimerTime] = useState({
    hour: commons.CLOCK_INITIAL_ZERO,
    minute: commons.CLOCK_INITIAL_ZERO,
    seconds: commons.CLOCK_INITIAL_ZERO
  });
  const [breakTime, setBreakTime] = useState({
    hour: commons.CLOCK_INITIAL_ZERO,
    minute: commons.CLOCK_INITIAL_ZERO,
    seconds: commons.CLOCK_INITIAL_ZERO
  });
  const [isBreak, setIsBreak] = useState(false);
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchTimerObj, setPunchTimerObj] = useState(null);
  const [breakTimerObj, setBreakTimerObj] = useState(null);

  useEffect(() => {
    //check if the job is Punched in before the app was closed
    checkForOpenPunch();

    //Add an event listener only when the screen is mounted for the first time
    if (!isMounted) {
      AppState.addEventListener("change", handleStateChanges);
    }
    isMounted = true;
  }, [punchTimerObj, breakTimerObj]);

  function handleStateChanges(nextAppState) {
    //Check if the app's state is active or inactive and call the appropriate handlers
    nextAppState === "active" ? foregroundHandler() : backgroundHandler();
  }

  function foregroundHandler() {
    calculateTime();
    handleStartTimer(false);
  }

  function backgroundHandler() {
    clearInterval(punchTimerObj);
    setPunchTimerObj(null);
  }

  async function calculateTime() {
    let punchObj = await utils.fetchAsyncStorageData(jobTitle);
    if (!punchObj) return;

    punchObj = JSON.parse(punchObj);
    setIsPunchedIn(true);

    if (!punchObj.isBreak) {
      let punchDuration = utils.getDuration(punchObj.punchInTime);
      timerTime.hours = utils.prefixZero(punchDuration.hours);
      timerTime.minutes = utils.prefixZero(punchDuration.minutes);
      timerTime.seconds = utils.prefixZero(punchDuration.seconds);

      // Handling  calculate timer logic for resuming punch in after break
      if (punchObj.breakPunchIn) {
        punchDuration = utils.getBreakExcludedPunchTime(
          punchDuration,
          punchObj
        );
        timerTime.hours = punchDuration.split(":")[0];
        timerTime.minutes = punchDuration.split(":")[1];
        timerTime.seconds = punchDuration.split(":")[2];
      }

      let newTime = {
        hour: timerTime.hours,
        minute: timerTime.minutes,
        seconds: timerTime.seconds
      };

      setIsBreak(false);
      setTimerTime(newTime);
    } else {
      let breakDuration = utils.getTotalBreakOnlyHours(punchObj);

      breakTime.hour = utils.prefixZero(breakDuration.split(":")[0]);
      breakTime.minute = utils.prefixZero(breakDuration.split(":")[1]);
      breakTime.seconds = utils.prefixZero(breakDuration.split(":")[2]);

      let newTime = {
        hour: breakTime.hour,
        minute: breakTime.minute,
        seconds: breakTime.seconds
      };
      setIsBreak(true);
      setBreakTime(newTime);
    }
    setIsLoading(false);
  }

  function handleStartTimer(isStoreData) {
    //Store the punchin details in async storage
    isStoreData && utils.storePunchInDetails(jobTitle, punchModelObj);
    if (!punchTimerObj) {
      const timer = setInterval(function() {
        calculateTime();
      }, 1000);
      setPunchTimerObj(timer);
    }
  }

  function handleBreakTimer() {
    if (!breakTimerObj) {
      const timer = setInterval(function() {
        calculateTime();
      }, 1000);
      setBreakTimerObj(timer);
    }
  }

  function calculateTimerForResume(punchObj) {
    let duration = utils.getDuration(punchObj.punchInTime);
    const punchDuration = utils.getBreakExcludedPunchTime(duration, punchObj);
    timerTime.hours = punchDuration.split(":")[0];
    timerTime.minutes = punchDuration.split(":")[1];
    timerTime.seconds = punchDuration.split(":")[2];

    let newTime = {
      hour: timerTime.hours,
      minute: timerTime.minutes,
      seconds: timerTime.seconds
    };
    setTimerTime(newTime);
  }

  async function checkForOpenPunch() {
    let punchObj = await utils.fetchAsyncStorageData(jobTitle);

    if (!punchObj) {
      db.fetchLastActivityForJob(jobTitle).then(data => {
        try {
          // When the app reloads set the last punch details if there is no active timer running
          if (data.rows._array && data.rows._array.length) {
            const { punch_in, punch_details } = data.rows._array[0];
            setPunchDetails(JSON.parse(punch_details));
            setPunchInTime(punch_in);
          }
        } catch (error) {
          console.log(error);
        }
      });
    }

    //If there is no punch in time previously saved for the job then return from the function
    if (!punchObj) return;

    //Navigate to the active job's tab
    navigation.navigate(jobTitle);

    if (punchObj.punchDetails) {
      setPunchDetails(punchObj.punchDetails);
    }

    punchObj = JSON.parse(punchObj);

    setPunchInTime(punchObj.createdDateTimeStamp);

    //When there is only entry for punch-in time add it to the details
    if (!punchObj.punchDetails)
      punchObj.punchDetails = [
        {
          id: 1,
          message: `Started shift at ${punchObj.createdDateTimeStamp}`
        }
      ];

    //If there is punch details in the object update in the state for component re-render
    setPunchDetails(punchObj.punchDetails);
    if (punchObj.breakPunchIn) {
      const breakDuration = utils.getTotalBreakOnlyHours(punchObj);
      breakTime.hour = utils.prefixZero(breakDuration.split(":")[0]);
      breakTime.minute = utils.prefixZero(breakDuration.split(":")[1]);
      breakTime.seconds = utils.prefixZero(breakDuration.split(":")[2]);

      let newTime = {
        hour: breakTime.hour,
        minute: breakTime.minute,
        seconds: breakTime.seconds
      };

      setBreakTime(newTime);
    }
    //When the app loads and if there is a activer timer running with the break the main timer needs to be shown with the punch duration
    if (punchObj.punchDuration) {
      calculateTimerForResume(punchObj);
    }

    jobContext.onJobStart(true);

    !punchObj.isBreak ? handleStartTimer(false) : handleBreakTimer();
  }

  function handlePunchIn(isResuming) {
    //When there is a active job started in another tab do not start a new one
    if (!isResuming && jobContext.isJobActive)
      return Alert.alert(
        "Cannot Start Job!!",
        "You have already started a job, End the active job to start a new one"
      );
    !isResuming && setPunchInTime(utils.getCurrentTime());
    jobContext.onJobStart(true);

    //Populate with values in the punch model object
    if (!isResuming) {
      punchModelObj.punchInTime = utils.getCurrentTime("HH:mm:ss");
      punchModelObj.createdDateTimeStamp = utils.getCurrentDateTimeStamp(
        "hh:mm a"
      );
    } else {
      punchModelObj.resumedTime = utils.getCurrentTime("HH:mm:ss");
    }

    handleStartTimer(!isResuming);

    setIsPunchedIn(true);
    updatePunchDetails(
      `${
        isResuming ? "Resuming" : "Started"
      } shift at ${utils.getCurrentTime()}`,
      true
    );

    //If the user is resuming his work from break do not show notification
    !isResuming &&
      utils.registerAndSendPushNotifications(
        `${jobTitle} PUNCH IN!!`,
        `You have punched in at ${utils.getCurrentTime()}`
      );
  }

  async function handlePunchOut() {
    //Reset the punchintime to empty
    setPunchInTime();
    const punchOutTime = utils.getCurrentTime();
    // Remove the flag in the context when the job ends
    jobContext.onJobStart(false);

    setIsPunchedIn(false);
    setIsBreak(false);

    clearInterval(punchTimerObj);
    clearInterval(breakTimerObj);

    updatePunchDetails(`Ending shift at ${punchOutTime}`);

    // Add the punch out time,break time and total hours worked to activity log
    jobActivityDetails.punchOut = punchOutTime;
    jobActivityDetails.breakTime = `Break ${parseInt(
      breakTime.minute
    )} minutes`;
    jobActivityDetails.totalHours = `Worked for ${parseInt(
      timerTime.hour
    )} hours ${parseInt(timerTime.minute)} minutes`;

    //Calculate the total earnings based on the hourly pay and the hours worked
    const totalEarnings = utils.calculateEarnings(
      parseFloat(jobEarning),
      parseInt(timerTime.hour),
      parseInt(timerTime.minute)
    );

    // Save the activity details to DB after punching out
    try {
      let punchObj = await utils.fetchAsyncStorageData(jobTitle);
      //If the user punches in and punches out without taking a break, create a punch model obj
      const details = [
        {
          id: 1,
          message: `Started shift at ${
            JSON.parse(punchObj).createdDateTimeStamp
          }`
        },
        {
          id: 2,
          message: `Ending shift at ${punchOutTime}`
        }
      ];

      if (punchObj) {
        //Adding the ending shift details to the punch details object
        punchObj = JSON.parse(punchObj);
        punchObj.punchDetails &&
          punchObj.punchDetails.push({
            id: punchObj.punchDetails.length + 1,
            message: `Ending shift at ${punchOutTime}`
          });
      }

      db.addActivity(
        jobTitle,
        jobActivityDetails.totalHours,
        jobActivityDetails.breakTime,
        `You Earned ${totalEarnings} CAD`,
        // If there is no data for punch details in the async storage create a new model object and save it in db
        punchObj && punchObj.punchDetails
          ? JSON.stringify(punchObj.punchDetails)
          : JSON.stringify(details),
        punchInTime,
        jobActivityDetails.punchOut
      )
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
      //Reset the timer object to null so that when new punch in request comes timer is recreated
      setPunchTimerObj(null);
    } catch (error) {
      console.log(`Something went wrong while saving to ${error}`);
    }
    //Remove the async storage entry for the job when the user punches out
    utils.removeAsyncStorageData(jobTitle);

    //If the user is punching out send a notification
    utils.registerAndSendPushNotifications(
      `${jobTitle} PUNCH OUT!!`,
      `You have punched out at ${punchOutTime}`
    );

    //Reset the timers to default
    setBreakTime({
      hour: commons.CLOCK_INITIAL_ZERO,
      minute: commons.CLOCK_INITIAL_ZERO,
      seconds: commons.CLOCK_INITIAL_ZERO
    });
    setTimerTime({
      hour: commons.CLOCK_INITIAL_ZERO,
      minute: commons.CLOCK_INITIAL_ZERO,
      seconds: commons.CLOCK_INITIAL_ZERO
    });
  }

  function updatePunchDetails(message, inTime) {
    const newPunchDetails = [...punchDetails];
    newPunchDetails.push({
      id: punchDetails.length + 1,
      message,
      ...(inTime && { punchInTime: utils.getCurrentTime() })
    });
    setPunchDetails(newPunchDetails);
  }

  async function handleBreak() {
    if (!isPunchedIn) {
      return Alert.alert(
        "Not Punched In!!!",
        "Please punch in first to take break"
      );
    }

    //Populate the punch model object with break details
    const data = await utils.fetchAsyncStorageData(jobTitle);
    punchModelObj = JSON.parse(data);
    punchModelObj.isBreak = true;
    //Save the punch duration before taking the break
    const duration = utils.getDuration(punchModelObj.punchInTime);
    punchModelObj.punchDuration = utils.getBreakExcludedPunchTime(
      duration,
      punchModelObj
    );

    if (punchModelObj.breakPunchOut) {
      // when there is a previous record for break punch out use that to calculate the break duration and delete the break out entry
      punchModelObj.breakDuration = utils.getTotalBreakOnlyHours(punchModelObj);
      delete punchModelObj.breakPunchOut;
    }
    punchModelObj.breakPunchIn = utils.getCurrentTime("HH:mm:ss");
    //When there is only entry for punch-in time add it to the details
    if (!punchModelObj.punchDetails)
      punchModelObj.punchDetails = [
        {
          id: 1,
          message: `Started shift at ${punchModelObj.createdDateTimeStamp}`
        }
      ];
    //Add the punch details to the object
    const details = punchModelObj.punchDetails
      ? [...punchModelObj.punchDetails]
      : [];
    details.push({
      id: details.length + 1,
      message: `Break at ${utils.getCurrentTime()}`
    });
    punchModelObj.punchDetails = details;

    utils.storeAsyncStorageData(jobTitle, punchModelObj).then(() => {
      clearInterval(punchTimerObj);
      clearInterval(breakTimerObj);
      setBreakTimerObj(null);
      handleBreakTimer();
    });

    updatePunchDetails(`Break at ${utils.getCurrentTime()}`);
  }

  async function handleResume() {
    setIsBreak(false);

    //Populate the punch model object with break details
    const data = await utils.fetchAsyncStorageData(jobTitle);
    punchModelObj = JSON.parse(data);
    punchModelObj.isBreak = false;

    //Save the break duration before resuming the work only if there was previously a break entry
    if (punchModelObj.breakPunchOut) {
      punchModelObj.breakDuration = utils.getDuration(
        punchModelObj.breakPunchIn
      );
    }

    punchModelObj.breakPunchOut = utils.getCurrentTime("HH:mm:ss");

    const details = punchModelObj.punchDetails
      ? [...punchModelObj.punchDetails]
      : [];
    details.push({
      id: details.length + 1,
      message: `Resuming shift at ${utils.getCurrentTime()}`
    });
    punchModelObj.punchDetails = details;

    utils.storeAsyncStorageData(jobTitle, punchModelObj).then(() => {
      clearInterval(breakTimerObj);
      clearInterval(punchTimerObj);
      setPunchTimerObj(null);
      handleStartTimer(false);
    });
  }
  return (
    <View style={styles.container}>
      <Loader isLoading={isLoading} />
      <View style={styles.componentSpacing}>
        <TimerComponent
          timerTime={timerTime}
          breakTime={breakTime}
          isBreak={isBreak}
        />
      </View>
      <View style={styles.componentSpacing}>
        <MemoizedPunchInTimeComp data={punchInTime} />
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
  container: {
    flex: 1,
    justifyContent: "space-around"
  },
  componentSpacing: {
    marginVertical: 10
  }
});
