import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const LivraisonInfos = (props) => {
  const data = props.data;
  console.log(data);
  const startDate = new Date(data.desiredDeliveryDate.start);
  const endDate = new Date(data.desiredDeliveryDate.end);
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "novembre",
    "décembre",
  ];
  return (
    <View className="flex-col  mt-5 p-3 mx-auto border-gray-200 border-2 rounded-lg w-11/12">
      <Text className="mr-4 font-bold text-lg">Informations de livraison</Text>
      <View className="flex-row mt-3 items-center">
        <Text className="text-[17px]">Livraison Souhaitée :</Text>
        <View className="bg-gray-100 flex-row p-2 rounded-lg ml-4">
          <Ionicons name="calendar-outline" size={20} />
          <Text>
            {startDate.getDay() + " " + months[startDate.getMonth()]} -{" "}
            {endDate.getDay() + " " + months[endDate.getMonth()]}
          </Text>
        </View>
      </View>
      <View className="flex-row mt-4 p-2 ml-6">
        <View className="flex-col">
          <View className="w-4 h-4 rounded-full bg-[#f44f2a]"></View>
          <View className="w-1.5 h-32 h-max-32 ml-1 rounded-full bg-[#f44f2a]"></View>
          <View className="w-4 h-4 rounded-full bg-[#f44f2a]"></View>
        </View>
        <View className="flex-col ml-6 ">
          <Text className="text-gray-500">Départ</Text>
          <Text className="font-blod text-2xl w-12/12">{data.pickupAddress.name}</Text>

          <Text className="text-gray-500 mt-14">Arrivé</Text>
          <Text className="font-blod text-2xl ">{data.deliveryAddress.name}</Text>
        </View>
      </View>
    </View>
  );
};
export default LivraisonInfos;
