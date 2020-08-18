export default Object.freeze({
  FIRST_TIME_APP_LOAD: "FIRST_TIME_APP_LOAD",
  CLOCK_INITIAL_ZERO: "00",
  API_URL: "http://ec2-3-16-255-54.us-east-2.compute.amazonaws.com:3000",
  SETTINGS_LINK: [
    {
      id: 1,
      title: "My Account",
      imgUri: require("../assets/helpCenter.png"),
      targetScreenName: "Myaccount",
    },
    {
      id: 2,
      title: "Report a Problem",
      imgUri: require("../assets/report.png"),
      targetScreenName: "Report",
    },
    {
      id: 3,
      title: "Contact Us",
      imgUri: require("../assets/terms.png"),
      targetScreenName: "Contactus",
    },
    {
      id: 4,
      title: "Log Out",
      imgUri: require("../assets/about.png"),
      targetScreenName: "TermsAndConditions",
    },
  ],
  ONBOARDING_DATA: [
    {
      id: 1,
      header: "Easy To Use!",
      subHeader:
        "Get all the updates instantly without missing Experience a rich UI for your comfort",
      imageUri: require("../assets/onboardingScreen.png"),
      buttonTxt: "Next",
    },
    {
      id: 2,
      header: "Calculate your Payment!",
      subHeader:
        "Get all the updates instantly without missing Experience a rich UI for your comfort",
      imageUri: require("../assets/onboardingScreen2.png"),
      buttonTxt: "Start",
    },
  ],
  DEFAULT_TIMER: {
    hour: "00",
    minute: "00",
    seconds: "00",
  },
  IS_TABLE_CREATED: "is_tables_created",
  YES: "Y",
  TOKEN_KEY: "token",
  NOTIFICATION_TOKEN: "notification_token",
});
