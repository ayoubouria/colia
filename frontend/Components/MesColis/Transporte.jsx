import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import PackageItem from "../Recherche/PackageItem";

const Transporte = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchData();
    }, 2000);
  }, []);
  const fetchData = async () => {

    // console.log(user._id);
    // console.log(token);
    try {
      const token = await AsyncStorage.getItem("token");
      const user = await JSON.parse(await AsyncStorage.getItem("user"));
      const response = await axios.get(
        `${API_URL}/packages?deliverer=${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setData(response.data.data.packages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#f44f2a" />
        </View>
      ) : (
        <SafeAreaView>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            className="flex-col px-5 mb-60"
          >
            {data.map((item) => {
              return (
                <TouchableOpacity
                  key={item._id}
                  activeOpacity={0.5}
                  className="mt-4"
                  onPress={() => {
                    props.navigation.navigate("PackageScreen", {
                      packageId: item._id,
                      packageName: item.name,
                    });
                  }}
                >
                  <PackageItem key={item._id} data={item} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

export default Transporte;
