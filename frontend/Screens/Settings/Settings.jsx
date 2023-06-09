import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Switch,
  StatusBar
} from "react-native";
import { useState, useEffect } from "react";
import ProfileButton from "../../Components/Settings/ProfileButton";
import DarkModeButton from "../../Components/Settings/DarkModeButton";
import LanguesButton from "../../Components/Settings/LanguesButton";
import InfosButton from "../../Components/Settings/InfosButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from '@react-navigation/native';
import { useColorScheme } from "nativewind";


export default function Settings({ navigation }) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const handleDisconnect = async () => {
    // Clear stored user data
    await AsyncStorage.clear();

    // Navigate to login screen
    navigation.navigate("SignIn")

    // Reset app state or navigate to a login screen
    // ...
  };
  return (
    <View className="flex-1 bg-white dark:bg-gray-900 ">
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorScheme === "dark" ? "#111827": "#ffffff"}
      />
      <View className="pt-10 px-5">
        <Text className="text-2xl dark:text-white">Paramètres</Text>
      </View>
      <Text className="text-sm ml-5 mt-10  text-gray-500">Profile</Text>
      <ProfileButton navigation={navigation} />
      <View className="flex-col mt-10">
        <Text className="text-sm ml-5 text-gray-500">Paramètres</Text>
      </View>
      <View className="flex-col mt-5">
        <DarkModeButton />
        <LanguesButton navigation={navigation} />
        <InfosButton navigation={navigation} />
      </View>
      <View className="mt-auto mb-20">
        <TouchableOpacity
          onPress={() => {
            handleDisconnect();
          }}
          activeOpacity={0.7}
          className="bg-[#f44f2a] w-5/12 p-3 mx-auto rounded-2xl"
        >
          <Text className="text-center text-white">Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
