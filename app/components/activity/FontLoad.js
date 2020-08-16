import * as Font from "expo-font";

export default function FontLoad() {
  return Font.loadAsync({
    ProximaNovaAltBold: require("../../assets/fonts/Proxima-Nova-Alt-Bold.ttf"),
    ProximaNovaAltLight: require("../../assets/fonts/Proxima-Nova-Alt-Light.ttf"),
    ProximaNovaAltThin: require("../../assets/fonts/Proxima-Nova-Alt-Thin.otf"),
    ProximaNovaBlack: require("../../assets/fonts/ProximaNovaBlack.otf"),
    ProximaNovaBold: require("../../assets/fonts/ProximaNovaBold.otf"),
    ProximaNovaRegular: require("../../assets/fonts/ProximaNovaRegular.otf"),
    ProximaNovaThin: require("../../assets/fonts/ProximaNovaThin.otf")
  });
}
