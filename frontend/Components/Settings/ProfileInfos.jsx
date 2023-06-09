import { View, Text } from "react-native";

const ProfileInfos = (props) => {
  return (
    <View className="w-11/12 flex-col justify-center mx-auto p-5 border-2 border-gray-300 rounded-lg mt-4">
      <View className="flex-row">
        <Text className="text-sm text-gray-500">Email :</Text>
        <Text className=" ml-2">{props.email}</Text>
      </View>
      <View className="flex-row mt-2">
        <Text className="text-sm text-gray-500">Tel     :</Text>
        <Text className=" ml-2">{props.tel}</Text>
      </View>
    </View>
  );
};
export default ProfileInfos;
