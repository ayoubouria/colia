import React from "react";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableHighlight,
} from "react-native";
import PropositionsHeader from "../../Components/Propositions/PropositionsHeader";

export default function Proposition({ navigation }) {
  return (
    <View className="flex-1 bg-white ">
      <View className="pt-10 px-5">
        <Text className="text-2xl">Propositions</Text>
      </View>
      <PropositionsHeader navigation={navigation} />
      <View className="flex-col mt-10">
        <Text className="text-sm ml-5 text-gray-500">Notifications</Text>
      </View>
      <View className="border-[0.5px] border-gray-300 mt-2"></View>
    </View>
  );
}
