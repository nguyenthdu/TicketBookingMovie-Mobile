import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const VnPay = ({ route, navigation }) => {
  const { url } = route.params;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("url", url);
  }, [url]);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleNavigationStateChange = (newNavState) => {
    console.log("newNavState", newNavState);
    if (newNavState.url.includes("vnpay-payment-return")) {
      const queryStringIndex = newNavState.url.indexOf("?");
      const queryString = newNavState.url.substring(queryStringIndex + 1);
      console.log("queryString", queryString);
      navigation.navigate("VerifyPayment", {
        params: queryString,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading && <ActivityIndicator size="large" />}
      <WebView
        source={{ uri: url }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </SafeAreaView>
  );
};

export default VnPay;

const styles = StyleSheet.create({});
