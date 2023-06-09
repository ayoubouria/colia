import React from "react";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useEffect } from "react";

const SearchScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Rechercher" });
    navigation.setOptions({ tabBarVisible: true });
    console.log(navigation);
  }, []);
  return (
    <View className="flex-col r">
      <Text className="text-sm ml-4 mt-5 text-gray-500">Lieu de Depart</Text>

      <TextInput
        className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
        placeholder="Exemple: Hay Al Fath, Casablanca"
      />
      <Text className="text-sm ml-4 mt-5 text-gray-500">Lieu d'arrivée</Text>

      <TextInput
        className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
        placeholder="Exemple: Agdal, Rabat"
      />
    </View>
  );
};

export default SearchScreen;
