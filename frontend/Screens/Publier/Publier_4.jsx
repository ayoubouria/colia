import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { ca } from "date-fns/locale";

const infosPlaceHolder = `Pour que tout se passe bien, soyez le plus précis possible concerant:
- Vos disponibilités (le soir, le week-end, etc.)
- L'eniverenement (rue étroite, étage sans ascenseur, etc.)
- Les principaux objets à transporter (meubles, électroménager, etc.)
`;

const Publier_4 = ({ navigation }) => {
  const route = useRoute();
  console.log(route.params);
  const name = route.params.name;
  const deliveryAddress = route.params.deliveryAddress;
  const desiredDeliveryDate = route.params.desiredDeliveryDate;
  const dimensions = route.params.dimensions;
  const pickupAddress = route.params.pickupAddress;
  const weight = route.params.weight;
  const [price, setPrice] = useState(`90`);

  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        const user = JSON.parse(value);
        return user._id;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const postPackage = async () => {
    const userId = await getUserId();
    const token = await getToken();
    const priceNumber = parseInt(price);
    const priceObject = {
      suggested: priceNumber,
      final: priceNumber,
    };
    const packageData = {
      name: name,
      deliveryAddress: deliveryAddress,
      desiredDeliveryDate: desiredDeliveryDate,
      dimensions: {
        size: dimensions,
      },
      pickupAddress: pickupAddress,
      weight: 
      {
        approximate: weight,
      },
      price: priceObject,
      sender: userId,
    };
    try {
      const response = await axios.post(`${API_URL}/packages`, packageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Nouvelle Annonce",
    });
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
    <SafeAreaView className="bg-white dark:bg-slate-900">
      <ScrollView
        className="bg-white  dark:bg-gray-900 mb-20 "
        keyboardShouldPersistTaps="handled"
        listViewDisplayed={false}
      >
        <View className="flex-row py-7 mx-auto">
          <View className="flex-col">
            <TouchableOpacity
              className="bg-[#f9dcd5] rounded-full w-10 h-10 justify-center items-center ml-2"
              onPress={() => {
                navigation.navigate("Publier_2");
              }}
            >
              <Ionicons name="cube-outline" size={24} color="#f44f2a" />
            </TouchableOpacity>
            <Text className="text-center text-xs">Colis</Text>
          </View>
          <View className="bg-[#f44f2a] h-0.5 w-16 mt-5"></View>
          <View className="flex-col">
            <TouchableOpacity
              className="bg-[#f9dcd5] rounded-full w-10 h-10 justify-center items-center "
              onPress={() => {
                navigation.navigate("Publier_3");
              }}
            >
              <Ionicons name="car-outline" size={24} color="#f44f2a" />
            </TouchableOpacity>
            <Text className="text-center text-xs">Trajet</Text>
          </View>
          <View className="bg-[#f44f2a] h-0.5 w-16 mt-5"></View>
          <View className="flex-col">
            <View className="bg-[#f9dcd5] rounded-full w-10 h-10 justify-center items-center ">
              <Ionicons name="card-outline" size={24} color="#f44f2a" />
            </View>
            <Text className="text-center text-xs">Prix</Text>
          </View>
        </View>
        <Text className="font-bold text-xl w-11/12 mx-auto mt-7">
          Quel est votre budget ?
        </Text>
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
                // console.log(typeof text);
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
        <Text className="font-bold text-xl w-11/12 mx-auto mt-7">
          Informations complémentaires
        </Text>
        <View className="w-11/12 mx-auto mt-4 p-2 bg-[#f9dcd5]  rounded-lg">
          <Text className="text-[#f44f2a] ">
            Attention, ces informations sont publiques. Pour préserver votre vie
            privée,vous ne devez pas indiquer vos coordonnées personnelles
            (adresse, téléphone, email, etc.)
          </Text>
        </View>
        <Text className="text-sm ml-6 mt-5 text-gray-500">
          Informations complémentaires
        </Text>
        <TextInput
          className="w-11/12 mx-auto mt-4 border-2 border-gray-200 rounded-lg p-2 h-[170px] "
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          maxHeight={170}
          onChangeText={(text) => {
            setMessage(text);
          }}
          placeholderTextColor={"#D1D5DB"}
          placeholder={infosPlaceHolder}
        />
        <View className="flex-row mt-9">
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-gray-100 w-5/12 p-3 mx-auto rounded-2xl"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text className="text-center text-[#f44f2a]">Retour</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-[#f44f2a] w-5/12 p-3 mx-auto rounded-2xl"
            onPress={() => {
              //   navigation.navigate("Publier_4");
              // console.log(typeof price)
              // console.log(priceNumber);
              postPackage();
              navigation.navigate("Publier_1");
            }}
          >
            <Text className="text-center text-white">Valider</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Publier_4;
