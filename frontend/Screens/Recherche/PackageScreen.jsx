import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Linking,
} from "react-native";
import { useEffect, useState } from "react";
import UserCard from "../../Components/Package/UserCard";
import LivraisonInfos from "../../Components/Package/LivraisonInfos";
import PackageInfos from "../../Components/Package/PackageInfo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const PackageScreen = ({ navigation }) => {
  const route = useRoute();
  const id = route.params.packageId;
  const name = route.params.packageName;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [senderPhoneNumber, setSenderPhoneNumber] = useState("");
  const [user, setUser] = useState({});
  const [isSender, setIsSender] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchData();
    }, 2000);
  }, []);
  const handleCallPress = (phoneNumber) => {
    const phoneNumberWithProtocol = `tel:0656472867`;
    Linking.openURL(phoneNumberWithProtocol);
  };
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axios.get(`${API_URL}/packages/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data.package);
        setLoading(false);
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);
          if (parsedUser._id === response.data.data.package.sender) {
            setIsSender(true);
          }
        }
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const fetchSenderPhoneNumber = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          `${API_URL}/users/${data.sender}?fields=telephone`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSenderPhoneNumber(response.data.data.user.telephone);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    // console.log(id)
    // console.log(route.params);
    navigation.setOptions({ headerShown: true, title: name });
    fetchData();
    fetchSenderPhoneNumber();
  }, []);

  return (
    <ScrollView className="flex-1 mb-10">
      {loading ? (
        <View className="justify-center items-center">
          <ActivityIndicator size="large" color="#f44f2a" />
        </View>
      ) : (
        <View>
          <UserCard sender={data.sender} />
          <TouchableOpacity
            activeOpacity={0.7}
            className="mt-5 rounded-2xl bg-[#f44f2a] w-11/12 p-3 mx-auto"
            onPress={() => {
              const url = `https://www.google.com/maps/dir/?api=1&origin=${data.pickupAddress.name}&destination=${data.deliveryAddress.name}&travelmode=driving`;
              Linking.openURL(url);
            }}
          >
            <Text className="text-center text-white">Voir l'itnéraire</Text>
          </TouchableOpacity>
          <View className="flex-row items-center mt-5 p-3 mx-auto border-gray-200 border-2 rounded-lg w-11/12">
            <Text className="mr-4 font-bold text-lg">Proposition de tarif</Text>
            <Ionicons name="card-outline" size={20} />
            <Text className="pl-2">{data.price.suggested} DHS</Text>
          </View>

          <LivraisonInfos data={data} />
          <PackageInfos data={data} />
          {isSender ? (
            <View className="flex-row mt-4">
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-gray-100 w-5/12 p-3 mx-auto rounded-2xl"
                onPress={() => {
                  // fetchSenderPhoneNumber();
                  // console.log(senderPhoneNumber);
                  // handleCallPress(senderPhoneNumber);
                }}
              >
                <Text className="text-center text-[#f44f2a]">Supprimer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-[#f44f2a] w-5/12 p-3 mx-auto rounded-2xl"
                onPress={() => {}}
              >
                <Text className="text-center text-white">Les Propositions</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row mt-4">
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-gray-100 w-5/12 p-3 mx-auto rounded-2xl"
                onPress={() => {
                  // fetchSenderPhoneNumber();
                  // console.log(senderPhoneNumber);
                  handleCallPress(senderPhoneNumber);
                }}
              >
                <Text className="text-center text-[#f44f2a]">Discuter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                className="bg-[#f44f2a] w-5/12 p-3 mx-auto rounded-2xl"
                onPress={() => {
                  navigation.navigate("ProposeDeliveryScreen", {
                    packageId: id,
                    packageName: name,
                    sender: data.sender,
                    price: data.price.suggested,
                  });
                }}
              >
                <Text className="text-center text-white">Me proposer</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default PackageScreen;
