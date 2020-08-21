import * as SQLite from "expo-sqlite";
import moment from "moment";

import constants from "../config/dbConstants";
import utils from "../helpers/utils";
import dbConstants from "../config/dbConstants";

const db = SQLite.openDatabase("punchme.db");

//Initialize the database by creating two tables for jobs and activites if not exists
export const init = async () => {
  //If the table is created return immediately else continue
  const result = await utils.getDbInitialData();
  if (result) return;

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

const checkIfJobExist = jobName => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        dbConstants.SELECT_JOB_NAME,
        [jobName],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const addJobs = async (jobName, hourlyPay, notes) => {
  const timestamp = moment().format("MMMM Do YYYY, h:mm:ss a");

  //If a job name already exists do not insert record and return with rejected promise
  const result = await checkIfJobExist(jobName);
  if (result && result.length > 0) {
    return Promise.reject("Job Name already exists");
  }
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
  punchDetails,
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
          punchDetails,
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

export const deleteAllData = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Delete all activites data
      tx.executeSql(
        constants.DELETE_ALL_ACTIVITIES,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
      //Delete all jobs data
      tx.executeSql(
        constants.DELETE_ALL_JOBS,
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

export const fetchLastActivityForJob = jobName => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        constants.SELECT_LAST_ACTIVITY_JOB,
        [jobName],
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

export default {
  init,
  addJobs,
  addActivity,
  fetchJobs,
  deleteAllData,
  fetchActivities,
  fetchLastActivityForJob
};
