import * as SQLite from "expo-sqlite";
import moment from "moment";

import constants from "../config/dbConstants";

const db = SQLite.openDatabase("punchme.db");

//Initialize the database by creating two tables for jobs and activites if not exists
export const init = () => {
  let promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        constants.CREATE_JOBS_TABLE,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
      tx.executeSql(
        constants.CREATE_ACTIVITIES_TABLE,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const addJobs = (jobName, hourlyPay, notes) => {
  const timestamp = moment().format("MMMM Do YYYY, h:mm:ss a");
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        constants.INSERT_INTO_JOBS,
        [jobName, hourlyPay, notes, timestamp],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const addActivity = (
  activityTitle,
  workDesc,
  breakDesc,
  earningDesc,
  punchInTime,
  punchOutTime
) => {
  const timestamp = moment().format("MMMM Do YYYY, h:mm:ss a");
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        constants.INSERT_INTO_ACTIVITIES,
        [
          activityTitle,
          workDesc,
          breakDesc,
          earningDesc,
          punchInTime,
          punchOutTime,
          timestamp
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchJobs = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        constants.SELECT_ALL_JOBS,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchActivities = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        constants.SELECT_ALL_ACTIVIES,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
