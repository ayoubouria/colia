import React from "react";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const PackageInfos = (props) => {
  const { data } = props;
  return (
    <View className="flex-col  mt-5 p-3 mx-auto border-gray-200 border-2 rounded-lg w-11/12">
      <Text className="mr-4 font-bold text-lg">Informations sur la colis</Text>
      <View className="flex-row mt-2">
        <View className="bg-gray-100 flex-row p-2 rounded-lg ml-4">
          <Ionicons name="barbell-outline" size={20} />
          {data.weight.approximate ? (
            <Text className="ml-2">{data.weight.approximate}</Text>
          ) : (
            <Text className="ml-2">{data.weight.exact} kg</Text>
          )}
        </View>
        <View className="bg-gray-100 flex-row p-2 rounded-lg ml-4 ">
          <Ionicons name="cube-outline" size={20} />
          {data.dimensions.size ? (
            <Text className="ml-2">{data.dimensions.size}</Text>
          ) : (
            <Text className="ml-2">
              {data.dimensions.width} x {data.dimensions.length} x
              {data.dimensions.height}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default PackageInfos;
