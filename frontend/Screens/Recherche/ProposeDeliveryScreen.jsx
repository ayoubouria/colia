import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import UserCard from "../../Components/Package/UserCard";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProposeDeliveryScreen = ({ navigation }) => {
  const route = useRoute();
  const name = route.params.packageName;
  const id = route.params.packageId;
  const sender = route.params.sender;
  let initPrice = route.params.price;
  const [price, setPrice] = useState(`${initPrice}`);
  // console.log("name : " + name + " id : " + id);
  //   const hello = "hello";
  const textMessage =
    "Bonjour, je suis disponible pour effectuer votre livraison \n Quelles sont les disponibilités de l'expéditeur et du destinataire ? \n Merci de votre retour.\n A bientôt";
  const [message, setMessage] = useState(textMessage);
  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: name });
  }, []);
  const addPrice = () => {
    let updatedPrice = parseInt(price) + 1;
    setPrice(updatedPrice.toString());
  };
  const removePrice = () => {
    let updatedPrice = parseInt(price) - 1;
    setPrice(updatedPrice.toString());
  };
  return (
    <View className="flex-1 mb-10 align-bottom">
      <View>
        <UserCard sender={sender} />
      </View>
      <Text className="font-bold text-xl w-11/12 mx-auto mt-7">
        Faire ma proposition
      </Text>
      <Text className="w-11/12 mx-auto mt-6"> Ma proposition </Text>
      <View className="flex-row w-8/12 ml-4 mt-4 border-2 border-gray-200 rounded-lg p-2">
        <View className="flex-row justify-between w-full my-auto">
          <Ionicons name="card-outline" size={28} />
          <TextInput
            editable
            className="ml-3 w-8/12 text-xl"
            keyboardType="numeric"
            value={price}
            onChangeText={(text) => {
              setPrice(text);
              // console.log(text);
            }}
          />
          <Text className="text-xl">Dhs</Text>
        </View>
        <View className="ml-5 flex-row ">
          <TouchableOpacity
            className="bg-[#f9dcd5] rounded-full w-10 h-10 justify-center items-center"
            onPress={removePrice}
          >
            <Ionicons name="remove-outline" size={26} color="#f44f2a" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#f9dcd5] rounded-full w-10 h-10 justify-center items-center ml-2"
            onPress={addPrice}
          >
            <Ionicons name="add-outline" size={26} color="#f44f2a" />
          </TouchableOpacity>
        </View>
      </View>
      <Text className="w-11/12 mx-auto mt-6"> Message </Text>
      <TextInput
        className="w-11/12 mx-auto mt-4 border-2 border-gray-200 rounded-lg p-2 h-[170px] "
        multiline={true}
        numberOfLines={5}
        textAlignVertical="top"
        maxHeight={170}
        onChangeText={(text) => {
          setMessage(text);
        }}
        value={message}
      />
      <View className="flex-col items-end">
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-[#f44f2a] w-5/12 p-3 mx-auto rounded-2xl mt-5"
          onPress={() => {
            navigation.navigate("PropositionEnvoyee")
          }}
        >
          <Text className="text-white text-center">Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProposeDeliveryScreen;
