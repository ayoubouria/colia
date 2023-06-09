import { View, Text, TextInput, Image, TouchableHighlight } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileInfos from "../../Components/Settings/ProfileInfos";
import Avis from "../../Components/Settings/Avis";
export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Profile",
      // headerTitleAlign: "center",
      // headerTintColor: "#f44f2a",
      // headerStyle: {
      //   backgroundColor: "#fff",
      //   shadowColor: "#fff",
      // },
    });
    AsyncStorage.getItem("user").then((user) => {
      const parsedUser = JSON.parse(user);
      if (parsedUser) {
        setUser(parsedUser);
        console.log(parsedUser);
      }
      // console.log(user);
    });
  }, []);

  return (
    <View className="flex-col bg-white mt-16">
      <View className="flex-col items-center">
        <Image
          className="w-32 h-32 rounded-full"
          source={require("../../assets/images/avatar.jpg")}
        />
        <Text className="text-xl font-semibold mt-5">{user?.name}</Text>
      </View>
      <View className="flex-col mt-10">
        <Text className="text-sm ml-5 text-gray-500">Informations</Text>
        <ProfileInfos email={user?.email} tel={user?.telephone} />
        <Text className="text-sm ml-5 text-gray-500 mt-5">Avis</Text>
        <Avis score={user?.reviewScore} count={user?.reviewCount} reviews={user?.reviews} />
      </View>
    </View>
  );
}
