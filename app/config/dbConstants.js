export default {
  SELECT_ALL_JOBS: "SELECT * FROM jobs",
  SELECT_ALL_ACTIVIES: "SELECT * FROM activities ORDER BY id DESC",
  SELECT_LAST_ACTIVITY_JOB:
    "SELECT * FROM activities where activity_title = ? ORDER BY id DESC LIMIT 1",
  SELECT_JOB_NAME: "SELECT * FROM jobs where job_name=? COLLATE NOCASE",
  INSERT_INTO_ACTIVITIES:
    "INSERT INTO activities (activity_title,work_description , break_description, earning_description,punch_details, punch_in, punch_out, created_timestamp) VALUES (?, ?, ?,?,?,?,?,?);",
  INSERT_INTO_JOBS:
    "INSERT INTO jobs (job_name, hourly_pay, notes,created_timestamp) VALUES (?, ?, ?, ?);",
  CREATE_JOBS_TABLE:
    "CREATE TABLE IF NOT EXISTS jobs (id INTEGER PRIMARY KEY NOT NULL, job_name TEXT NOT NULL, hourly_pay REAL NOT NULL, notes TEXT,created_timestamp TEXT NOT NULL);",
  CREATE_ACTIVITIES_TABLE:
    "CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY NOT NULL, activity_title TEXT NOT NULL,work_description TEXT, break_description TEXT, earning_description TEXT,punch_details TEXT, punch_in TEXT, punch_out TEXT, created_timestamp TEXT NOT NULL);",
  DELETE_ALL_ACTIVITIES: "DELETE FROM activities;",
  DELETE_ALL_JOBS: "DELETE FROM jobs;"
};
