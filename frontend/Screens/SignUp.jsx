import React from "react";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Touchable,
} from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import { useState } from "react";

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const postUser = () => {
    setError("");
    axios
      .post(`${API_URL}/users/signup`, {
        name: name,
        email: email,
        password: password,
        passwordConfirm: confirmPassword,
        telephone: telephone,
      })
      .then((response) => {
        console.log(response.data);
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setError("Veuiilez remplir tous les champs correctemen");
      });
  };

  return (
    <View className="flex-col items-center bg-white mt-16">
      <ScrollView className="w-full">
        <Text className="text-3xl font-bold text-center">S’inscrire</Text>
        <View className="flex-col w-11/12 mx-auto">
          <View className="mb-4">
            {error === "" ? null : (
              <Text className="text-red-500 text-center">{error}</Text>
            )}
          </View>
          <Text className="text-sm ml-4 mt-5 text-gray-500">Nom et prénom</Text>

          <TextInput
            className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
            placeholder="Nom et prénom        "
            onChangeText={(text) => setName(text)}
          />
          <Text className="text-sm ml-4 mt-5 text-gray-500">E-mail</Text>

          <TextInput
            className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
            placeholder="E-mail"
            onChangeText={(text) => setEmail(text)}
          />
          <Text className="text-sm ml-4 mt-5 text-gray-500">Tel :</Text>

          <TextInput
            className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
            placeholder="+212 6 00 00 00 00"
            onChangeText={(text) => setTelephone(text)}
          />
          <Text className="text-sm ml-4 mt-5 text-gray-500">Password</Text>

          <TextInput
            className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
            placeholder="*************"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <Text className="text-sm ml-4 mt-5 text-gray-500">
            Confirm Password
          </Text>

          <TextInput
            className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
            placeholder="*************"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <View className="flex-row w-11/12 mx-auto mt-7">
          <TouchableOpacity
            className="bg-gray-100 w-5/12 p-3 mx-auto rounded-2xl"
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text className="text-center text-[#f44f2a]">Retour</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#f44f2a] w-5/12 p-3 mx-auto rounded-2xl"
            onPress={() => {
              postUser();
            }}
          >
            <Text className="text-center text-white">S’inscrire</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
