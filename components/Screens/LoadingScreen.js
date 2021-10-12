import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function LoadingScreen(props) {
  const animation = useRef();

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        autoPlay
        loop
        style={{
          width: 150,
          height: 150,
          backgroundColor: "#fff",
        }}
        source={require("../../assets/loader.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    position: "absolute",
    opacity: 0.97,
  },
});
export default LoadingScreen;
