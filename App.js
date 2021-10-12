import React, { useEffect, useRef, useState } from "react";
import { WebView } from "react-native-webview";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import LoadingScreen from "./components/Screens/LoadingScreen";
import NetInfo from "@react-native-community/netinfo";
import { AntDesign } from "@expo/vector-icons";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const webviewRef = useRef(null);
  const backButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goBack();
  };

  const check = async () => {
    let status = NetInfo.fetch().then((status) => status);
    return status;
  };

  useEffect(() => {
    // check().then((status) => {
    //   if (status.isInternetReachable) {
    //     setTimeout(() => {
    //       setLoading(false);
    //     }, 100);
    //   } else {
    //     alert("Internet not Connected");
    //     setLoading(false);
    //   }
    // });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        style={styles.webContainer}
        onLoadEnd={() => setLoading(false)}
        source={{ uri: "https://glammzar.com/" }}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
          setCurrentUrl(navState.url);
        }}
      />
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => backButtonHandler()}
      >
        {canGoBack && <AntDesign name="arrowleft" size={24} color="black" />}
      </TouchableOpacity>
      {loading && <LoadingScreen />}
      <StatusBar hidden style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webContainer: {
    flex: 1,
    marginTop:
      Platform.OS === "ios"
        ? Constants.statusBarHeight * 1.2
        : Constants.statusBarHeight,
  },
  backBtn: {
    position: "absolute",
    marginLeft: 18,
    marginTop: Constants.statusBarHeight,
  },
});
