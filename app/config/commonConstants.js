export default Object.freeze({
  FIRST_TIME_APP_LOAD: "FIRST_TIME_APP_LOAD",
  CLOCK_INITIAL_ZERO: "00",
  SETTINGS_LINK: [
    {
      id: 1,
      title: "Help Center",
      imgUri: require("../assets/helpCenter.png")
    },
    {
      id: 2,
      title: "Report a Problem",
      imgUri: require("../assets/report.png")
    },
    {
      id: 3,
      title: "Terms and Policies",
      imgUri: require("../assets/terms.png"),
      targetScreenName: "TermsAndConditions"
    },
    {
      id: 4,
      title: "About Us",
      imgUri: require("../assets/about.png")
    },
    {
      id: 5,
      title: "Contact Us",
      imgUri: require("../assets/contact.png")
    }
  ],
  ONBOARDING_DATA: [
    {
      id: 1,
      header: "Easy To Use!",
      subHeader:
        "Get all the updates instantly without missing Experience a rich UI for your comfort",
      imageUri: require("../assets/onboardingScreen.png"),
      buttonTxt: "Next"
    },
    {
      id: 2,
      header: "Easy To Use!",
      subHeader:
        "Get all the updates instantly without missing Experience a rich UI for your comfort",
      imageUri: require("../assets/onboardingScreen.png"),
      buttonTxt: "Next"
    },
    {
      id: 3,
      header: "Easy To Use!",
      subHeader:
        "Get all the updates instantly without missing Experience a rich UI for your comfort",
      imageUri: require("../assets/onboardingScreen.png"),
      buttonTxt: "Start"
    }
  ]
});
