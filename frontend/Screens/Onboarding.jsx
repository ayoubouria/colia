import { Text, View, StyleSheet, Image } from "react-native";
import { OnboardFlow } from "react-native-onboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
export default function OnboardingScreen() {
  const [isViewed, setIsViewed] = useState(false);
  useEffect(() => {
    AsyncStorage.setItem("isViewed", "true");
  }, []);
  return (
    <View className="bg-white">
      <OnboardFlow
        pages={[
          {
            title: "Quick Delivery At Your Doorstep",
            subtitle: "Enjoy quick pick-up and delivery to your destination",
            imageUri: Image.resolveAssetSource(require("../assets/images/Take-Away-rafiki.png")).uri,
          },
          {
            title: "Flexible Payment",
            subtitle: "Different modes of payment either before and after delivery without stress",
            imageUri:Image.resolveAssetSource(require("../assets/images/E-Wallet-pana.png")).uri,
          },
          {
            title: "Real-time Tracking",
            subtitle:
              "Track your packages/items from the comfort of your home till final destination",
            imageUri:Image.resolveAssetSource(require("../assets/images/Carpool-rafiki.png")).uri,
          },
        ]}
        type="fullscreen" // Change to either 'fullscreen', 'bottom-sheet', or 'inline'
      />
    </View>
  );
}
