import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  Image,
  ActivityIndicator
} from "react-native";
import colors from "../config/colors";

export default function AppLoader({ isLoading }) {
  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={isLoading}
      style={{ zIndex: 1100 }}
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            /*animating={this.state.loading}*/
            color={colors.primary}
          />

          {/* If you want to image set source here */}
          {/* <Image
            source={require('../assets/images/loader.gif')}
            style={{ height: 80, width: 80 }}
            resizeMode="contain"
            resizeMethod="resize"
          /> */}
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#rgba(0, 0, 0, 0.5)",
    zIndex: 1000
  },
  activityIndicatorWrapper: {
    backgroundColor: colors.silver,
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
