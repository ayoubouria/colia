import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";

const UserCard = (props) => {
  // const [sender, setSender] = useState(props.sender);]
  const sender = props.sender;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    console.log("sender :" + sender);
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axios.get(`${API_URL}/users/${props.sender}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response);
        setData(response.data.data.user);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("sender :" + sender);
    fetchData();
    console.log(data);
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-gray-100 mt-7  w-11/12 rounded-lg py-4 mx-auto"
    >
      {loading ? (
        <ActivityIndicator size="small" color="#353535" />
      ) : (
        <View className="flex-row">
          <View className="flex justify-center items-center px-5">
            <Ionicons name="person-outline" size={20} />
          </View>
          <View>
            <Text className="font-bold ml-2">{data.name}</Text>
            <Text className="text-gray-500 ml-2">{data.email}</Text>
            <Text className="text-gray-500 ml-2">{data.telephone}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default UserCard;
