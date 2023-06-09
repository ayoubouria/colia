import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Recu = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userFrom, setUserFrom] = useState({});
  const fetchUserFrom = async (userFrom) => {
    // console.log(userFrom);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}/users/${userFrom}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserFrom(response.data.data.user);
      console.log(response.data.data.user);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const fetchPropositions = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}/propositions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      // console.log(response.data.data.propositions[0].userFrom);
      await fetchUserFrom(response.data.data.propositions[0].userFrom);
      setLoading(false);
      console.log(response.data.data.propositions);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Reçu",
      // headerTitleAlign: "center",
      // headerTintColor: "#f44f2a",
      // headerStyle: {
      //   backgroundColor: "#fff",
      //   shadowColor: "#fff",
      // },
    });
    const fetchData = async () => {
      try {
        await fetchPropositions();

        // console.log("userFrom");
        // console.log(userFrom);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <View className="flex-col mt-8">
      <Text className="text-2xl text-center ">Les propositions Reçu</Text>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          size="large"
          color="#f44f2a"
        />
      ) : (
        <View className="flex flex-col mt-10">
          {data.data.propositions.map((proposition) => (
            <View
              key={proposition.id}
              className="flex-col mx-auto border-2 border-slate-400 rounded-lg p-3"
            >
              <Text className="font-semibold">{userFrom.name}</Text>
              <Text className="mt-3">{proposition.message}</Text>
              <View className="flex-row mt-2">
                <Text className="text-gray-500">Prix proposé:</Text>
                <Text>{proposition.price} Dhs</Text>
              </View>
              <View className="flex-row mt-4">
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="bg-gray-100 w-5/12 p-3 mx-auto rounded-2xl"
                >
                  <Text className="text-center text-[#f44f2a]">Refuser</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="bg-[#f44f2a] w-5/12 p-3 mx-auto rounded-2xl"
                  onPress={() => navigation.navigate("PropositionAccepte")}
                >
                  <Text className="text-center text-white">Accepter</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
export default Recu;
