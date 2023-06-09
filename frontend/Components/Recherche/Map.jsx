import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { API_URL } from "@env";
import axios from "axios";

const Map = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
        console.log(response.data.data.packages);
        setData(response.data.data.packages);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const mapRef = useRef(null);
  return (
    <View className="flex-1 justify-center items-center">
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 30.5731104,
            longitude: -7.589843399999999,
            latitudeDelta: 5,
            longitudeDelta: 5,
          }}
          provider={PROVIDER_GOOGLE}
        >
          {data.map((item) => {
            if (
              item.deliveryAddress &&
              item.deliveryAddress.latitude &&
              item.deliveryAddress.longitude &&
              loading == false
            ) {
              // const latitude = parseFloat(item.deliveryAddress.latitude);
              // const longitude = parseFloat(item.deliveryAddress.longitude);
              // console.log("latitude", latitude);
              // console.log("longitude", longitude);
              const longitude = item.deliveryAddress.longitude;
              const latitude = item.deliveryAddress.latitude;
              console.log(typeof latitude);
              console.log(typeof item.deliveryAddress.latitude);
              return (
                <Marker
                  key={item._id}
                  coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                  }}
                  title={item.name}
                  description={"Some description"}
                  onPress={() => {
                    props.navigation.navigate("PackageScreen", {
                      packageId: item._id,
                      packageName: item.name,
                    });
                  }}
                />
              );
            } else {
              console.log("Invalid delivery address:", item.deliveryAddress);
              return null;
            }
          })}
        </MapView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
