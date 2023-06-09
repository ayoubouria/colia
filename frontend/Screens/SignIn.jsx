import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import OnboardingScreen from "./Onboarding";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "date-fns";

export default function SignIn({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isViewed, setIsViewed] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = () => {
    // console.log(username, password);
    // console.log(API_URL + "/users/login");
    setError("");
    console.log(username.toLowerCase());
    axios
      .post(`${API_URL}/users/login`, {
        email: username.toLowerCase(),
        password: password,
      })
      .then((response) => {
        // console.log(response.data.token);
        const token = response.data.token;
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("user", JSON.stringify(response.data.data.user));
        // AsyncStorage.setItem("token", "hyhyhyhyhyh");
        // const token = AsyncStorage.getItem("token");
        // console.log(token);
        navigation.navigate("RechercheStackNav", {
          screen: "HomeTabNav",
        });
      })
      .catch((error) => {
        console.log(error.message);
        setError("Email ou mot de passe incorrect");
      });
    // fetch star wars api
    // axios.get("http://192.168.1.15:3000/api/v1/users").then((response) => {
    //   console.log(response);
    // });
  };
  // const handleLogin = async(e) => {
  //   e.preventDefault();
  //   await login();
  // };
  useEffect(() => {}, []);
  const handleOnboarding = async () => {
    await AsyncStorage.setItem("isViewed", "true");
    setIsViewed(false);
    // console.log(isViewed);
    setLoading(false);
  };
  handleOnboarding();

  return (
    <View className="flex-col items-center justify-center bg-white pt-20 pb-20 ">
      {/* {isViewed ? null : <OnboardingScreen />} */}
      {loading ? (
        <ActivityIndicator size="large" color="#f44f2a" />
      ) : (
        <View className="w-full flex-col items-center justify-center">
          <View>
            <Image
              className=" items-center w-auto h-64 "
              source={require("../assets/images/COLIA-VF.png")}
            />
            <Text className="text-4xl font-bold text-center text-gray-800 mt-6 p-6">
              Login
            </Text>
          </View>
          <View className="mb-4">
            {error === "" ? null : (
              <Text className="text-red-500 text-center">{error}</Text>
            )}
          </View>
          <TextInput
            className="bg-gray-50 border  text-gray-900 text-sm rounded-lg ring-gray-500 border-gray-500 block w-10/12  p-4"
            placeholder="E-Mail"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            className="bg-gray-50 border  text-gray-900 text-sm rounded-lg ring-gray-500 border-gray-500 block w-10/12 p-4 mt-4"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableHighlight
            underlayColor={"#db4625"}
            className="bg-[#f44f2a] rounded-lg font-bold mt-4 p-4 w-7/12 items-center"
            // onPress={() => {
            //   navigation.navigate("HomeTabNav", {
            //     screen: "Recherche",
            //     params: { data: "data" },
            //   });
            // }}
            onPress={login}
          >
            <Text className="text-l text-white">Login</Text>
          </TouchableHighlight>
          <View className="w-9/12 flex-row ml-28 mt-2">
            <Text>Don't have an account?</Text>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text className="text-[#f44f2a] pl-2">Sign Up</Text>
            </TouchableHighlight>
          </View>
        </View>
      )}
    </View>
  );
}
