import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
const RechercheHeader = (props) => {
  return (
    <View className=" bg-white pb-5 rounded-2xl shadow-xl">
      <View className="flex-row pt-10 px-5">
        <Text className="text-2xl">Rechercher</Text>
        {/* <Text className="ml-auto pt-2 mr-2 text-[#f44f2a]">{vue ? "Vue Carte" : "Vue Liste"}</Text> */}
        <TouchableOpacity
          className="flex-row ml-auto pt-2 mr-2 "
          activeOpacity={0.5}
          onPress={() => {
            props.handleMap();
          }}
        >
          {props.map ? (
            <Ionicons name="map-outline" size={20} color="#f44f2a" />
          ) : (
            <Ionicons name="albums-outline" size={24} color="#f44f2a" />
          )}
          <Text className="text-[#f44f2a] ml-2">
            {props.test ? "Vue Carte" : "Vue Liste"}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-5 mx-5 border-2 rounded-md border-gray-400">
        {/* <Ionicons name="search-outline" size={24} color="black" />
    <TextInput
      className="bg-gray-50 border  text-gray-900 text-sm rounded-lg ring-gray-500 border-gray-500 block w-10/12 p-2"
      placeholder="Rechercher"
      onChangeText={(text) => {setSearch(text); console.log(search)}}
    /> */}
        <TouchableOpacity
          className="flex-row py-2 content-center pl-2"
          onPress={() => {
            props.navigateToSearch();
          }}
        >
          <View className="pt-0.5">
            <Ionicons name="search-outline" size={26} color="grey" />
          </View>

          <Text className="text-gray-500 text-lg ml-2">
            Rechercher une ville, région
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RechercheHeader;
