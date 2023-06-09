import React from "react";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useState, useEffect } from "react";
import { TEST, API_URL } from "@env";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import RechercheHeader from "../../Components/Recherche/RechercheHeader";
import PackageItem from "../../Components/Recherche/PackageItem";
import Map from "../../Components/Recherche/Map";

const Recherche = ({ navigation}) => {
  const [map, setMap] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(false);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchData();
    }, 2000);
  }, []);
  const fetchData = () => {
    console.log("fetching data");
    console.log(API_URL);
    axios
      .get(`${API_URL}/packages`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjNhNDU0ZDBjNDk2YmRhMWNkYmRmMyIsImlhdCI6MTY4NDI1NDcyMCwiZXhwIjoxNjkyMDMwNzIwfQ.AVKlCAoUFkzdysXQUdXlPRvlR9FZf3Xegv03SkmDDX8`,
        },
      })
      .then((response) => {
        // console.log(response.data.data.packages);
        setLoading(false);
        console.log(response.data.data.packages)
        setData(response.data.data.packages);
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
      });
  };
  const handleGoingBack = () => { 
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      return ;
    });
  };
  useEffect(() => {
    fetchData();
    // handleGoingBack();
  }, []);

  const handleMap = () => {
    setMap(!map);
  };
  const navigateToSearch = () => {
    navigation.navigate("SearchScreen");
  };

  // console.log(TEST);
  // console.log(props.route);
  return (
    <View className="flex-1 bg-gray-200 ">
      <RechercheHeader handleMap={handleMap} map={map} navigateToSearch={navigateToSearch} />
      <View className="flex-row">
        {scroll ? (
          <ActivityIndicator size="large" color="#f44f2a" />
        ) : (
          <View></View>
        )}
      </View>
      {map ? (
        loading ? (
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
              {/* {console.log(data)} */}
              {data.map((item) => {
                return (
                  <TouchableOpacity
                    key={item._id}
                    activeOpacity={0.5}
                    className="mt-4"
                    onPress={() => {
                      navigation.navigate("PackageScreen", {
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
        )
      ) : (
        <Map navigation={navigation} />
      )}
    </View>
  );
};

export default Recherche;
