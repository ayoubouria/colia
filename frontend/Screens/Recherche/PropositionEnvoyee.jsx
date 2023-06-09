import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const PropositionEnvoyee = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Proposition Envoyee",
      // headerTitleAlign: "center",
      // headerTintColor: "#f44f2a",
      // headerStyle: {
      //   backgroundColor: "#fff",
      //   shadowColor: "#fff",
      // },
    });
  }, []);

  return (
    <View className="flex-1 mt-32 items-center">
      <Image
        className="w-40 h-40 rounded-full"
        source={require("../../assets/images/check.png")}
      />
      <Text className="text-2xl font-bold mt-5">Proposition envoyée</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-[#f44f2a] w-6/12 p-3 mx-auto rounded-2xl mt-10"
        onPress={() => navigation.navigate("HomeTabNav")}
      >
        <Text className="text-center text-white">Retour au page d'accueil</Text>
      </TouchableOpacity>
    </View>
  );
};
export default PropositionEnvoyee;
