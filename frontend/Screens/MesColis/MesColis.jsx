import React from "react";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Envoi from "../../Components/MesColis/Envoi";
import Transporte from "../../Components/MesColis/Transporte";



export default function MesColis({ navigation}) {
  const [activeTab, setActiveTab] = useState("transporte");
  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };
  return (
    <View className="flex-1 bg-white ">
      <View className="pt-10 px-5">
        <Text className="text-2xl">Mes Colis</Text>
      </View>
      <View className="mt-4 flex-row justify-center px-5 rounded-2xl">
        <TouchableOpacity
          className="border-b-2 w-1/2"
          activeOpacity={0.5}
          onPress={() => handleTabPress("transporte")}
          style={[
            activeTab === "transporte"
              ? { borderBottomWidth: 2, borderBottomColor: "#f44f2a" }
              : { borderBottomWidth: 0 },
          ]}
        >
          <Text
            className=" text-lg text-center"
            style={[activeTab === "transporte" ? { color: "#f44f2a" } : {}]}
          >
            Je Transporte
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border-b-2  w-1/2"
          activeOpacity={0.5}
          onPress={() => handleTabPress("envoi")}
          style={[
            activeTab === "envoi"
              ? { borderBottomWidth: 2, borderBottomColor: "#f44f2a" }
              : { borderBottomWidth: 0 },
          ]}
        >
          <Text
            className="text-lg text-center"
            style={[activeTab === "envoi" ? { color: "#f44f2a" } : {}]}
          >
            J'envoie
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-center items-center bg-gray-200">
        {activeTab === "transporte" ? (
          <Transporte navigation={navigation}/>
        ) : (
          <Envoi navigation={navigation}/>
        )}
      </View>
    </View>
  );
}
