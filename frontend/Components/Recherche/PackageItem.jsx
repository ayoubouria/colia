import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const PackageItem = (props) => {
  return (
    <View className="bg-white flex-row rounded-lg w-full">
      <View className="flex-col ml-3">
        <Text className="text-xl  pt-2 ">{props.data.name}</Text>
        <View className="flex-row  mt-2 ml-[9.5px]">
          <Image
            className="w-3 h-3 mt-0.5"
            source={require("../../assets/icons/placeholder.png")}
          />
          <Text className="text-xs ml-2">{props.data.pickupAddress.name}</Text>
        </View>
        <View className="ml-[9.5px] mt-0.5">
          <Ionicons name="ellipsis-vertical-outline" size={14} />
        </View>
        <View className="flex-row ml-[9.5px]">
          <Image
            className="w-3 h-3 mt-0.5"
            source={require("../../assets/icons/placeholder.png")}
          />
          <Text className="text-xs ml-2">
            {props.data.deliveryAddress.name}
          </Text>
        </View>
        <View className="flex-row mt-2 ml-[9.5px]">
          <Ionicons name="calendar-outline" size={14} className="ml-[9.5px]" />
          <Text className="text-xs ml-[9.5px]">Avant le 22/05</Text>
          <View className="flex-row ml-3">
            <Ionicons name="cube-outline" size={14} />
            {props.data.dimensions.size ? (
              <Text className="text-xs ml-2">{props.data.dimensions.size}</Text>
            ) : (
              <Text className="text-xs ml-2">
                {props.data.dimensions.width}x{props.data.dimensions.length}x
                {props.data.dimensions.height}
              </Text>
            )}
          </View>
        </View>
        <View>
          <Text className="font-bold text-lg ml-[7px] mt-2">
            {" "}
            {props.data.price.suggested} DHS
          </Text>
        </View>
      </View>

      <Image
        className="w-20 h-32 ml-auto"
        source={require("../../assets/images/COLIA-VF.png")}
      />
    </View>
  );
};
export default PackageItem;
