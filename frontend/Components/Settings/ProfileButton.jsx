import { View, Text, Image, TouchableHighlight, Switch } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProfileButton = ({ navigation }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => {
      setUser(JSON.parse(user));
      console.log(user);
    });
  }, []);
  return (
    <View className="mx-auto mt-1 w-full ">
      <TouchableHighlight
        onPress={() => navigation.navigate("UserProfile")}
        underlayColor="#f9dcd5"
        className="flex-row items-center px-5 py-3 rounded-lg "
      >
        <View className="flex-row items-center">
          <Image
            className="w-16 h-16 rounded-full"
            source={require("../../assets/images/avatar.jpg")}
          />
          <View className="flex-col">
            <Text className="ml-3 font-semibold text-lg dark:text-white">{user.name}</Text>
            <Text className="text-xs ml-3 text-gray-500 dark:text-gray-300">
              {user.email}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default ProfileButton;
