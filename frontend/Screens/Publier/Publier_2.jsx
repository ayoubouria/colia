import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Publier_2({ navigation }) {
  const [isDimensionsEnabled, setIsDimensionsEnabled] = useState(false);
  const [dimensions, setDimensions] = useState("");
  const [xxlDimensions, setXxlDimensions] = useState(false);
  const [xlDimensions, setXlDimensions] = useState(false);
  const [lDimensions, setLDimensions] = useState(false);
  const [mDimensions, setMDimensions] = useState(false);
  const [sDimensions, setSDimensions] = useState(false);
  const setAllDimensionsFalse = () => {
    setXxlDimensions(false);
    setXlDimensions(false);
    setLDimensions(false);
    setMDimensions(false);
    setSDimensions(false);
  };
  // ---------------------Weight----------------------
  const [isWeightEnabled, setIsWeightEnabled] = useState(false);
  const [weight, setWeight] = useState("");
  const [infFiveKgCategory, setInfFiveKgCategory] = useState(false);
  const [fiveToThirtyKgCategory, setFiveToThirtyKgCategory] = useState(false);
  const [thirtyToHundredKgCategory, setThirtyToHundredKgCategory] =
    useState(false);
  const [supHundredKgCategory, setSupHundredKgCategory] = useState(false);
  const setAllCategoriesFalse = () => {
    setInfFiveKgCategory(false);
    setFiveToThirtyKgCategory(false);
    setThirtyToHundredKgCategory(false);
    setSupHundredKgCategory(false);
  };

  // --------------------------------------------------------------------------------
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const toggleDimensionsSwitch = () =>
    setIsDimensionsEnabled((previousState) => !previousState);
  const toggleWeightSwitch = () =>
    setIsWeightEnabled((previousState) => !previousState);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Nouvelle Annonce",
    });
  }, []);
  return (
    <SafeAreaView className="bg-white dark:bg-slate-900">
      <ScrollView className="bg-white  dark:bg-gray-900 mb-20 ">
        <View className="flex-row py-7 mx-auto">
          <View className="flex-col">
            <TouchableOpacity className="bg-[#f9dcd5] rounded-full w-10 h-10 justify-center items-center ml-2">
              <Ionicons name="cube-outline" size={24} color="#f44f2a" />
            </TouchableOpacity>
            <Text className="text-center text-xs">Colis</Text>
          </View>
          <View className="bg-gray-100 h-0.5 w-16 mt-5"></View>
          <View className="flex-col">
            <View className="bg-gray-100 rounded-full w-10 h-10 justify-center items-center ">
              <Ionicons name="car-outline" size={24} color="#9CA3AF" />
            </View>
            <Text className="text-center text-xs">Trajet</Text>
          </View>
          <View className="bg-gray-100 h-0.5 w-16 mt-5"></View>
          <View className="flex-col">
            <View className="bg-gray-100 rounded-full w-10 h-10 justify-center items-center ">
              <Ionicons name="card-outline" size={24} color="#9CA3AF" />
            </View>
            <Text className="text-center text-xs">Prix</Text>
          </View>
        </View>
        <View className="mx-auto border-gray-200 border-2 rounded-lg w-11/12 pb-5">
          <Text className="text-xl font-semibold ml-4">
            Que souhaitez-vous faire transporter ?
          </Text>
          {error === "" ? null : (
            <Text className="text-red-500 text-center">{error}</Text>
          )}
          <Text className="text-sm ml-4 mt-5 text-gray-500">
            Nom de l'objet
          </Text>

          <TextInput
            className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
            placeholder="Exemple: Un colis, un document, un meuble, ..."
            onChangeText={(text) => setName(text)}
          />
          <Text className="text-xl font-semibold ml-4 mt-4">Dimensions</Text>
          <View className="w-11/12 mx-auto mt-4 p-2 bg-[#f9dcd5]  rounded-lg">
            <Text className="text-[#f44f2a] ">
              Plus les dimensions seront précises, plus vous aurez de chances de
              trouver la personne idéale pour livrer votre bien !
            </Text>
          </View>
          <View className="flex-row mt-4 justify-center items-center">
            <Switch
              className="mr-4 ml-4"
              trackColor={{ false: "#767577", true: "#f44f2a" }}
              thumbColor={isDimensionsEnabled ? "white" : "white"}
              onValueChange={toggleDimensionsSwitch}
              value={isDimensionsEnabled}
            />
            <Text className=" text-gray-500 mr-auto">
              {isDimensionsEnabled
                ? "Je connaisles dimensions de l'objet"
                : "Je ne connais pas les dimmensions"}
            </Text>
          </View>
          {isDimensionsEnabled ? (
            <View>
              <View className="mt-3">
                <Text className="text-sm ml-4 mt-2 text-gray-500">
                  Longeur(cm)
                </Text>
                <TextInput
                  className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
                  placeholder="100cm"
                />
              </View>
              <View>
                <Text className="text-sm ml-4 mt-2 text-gray-500">
                  Largeur(cm)
                </Text>
                <TextInput
                  className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
                  placeholder="100cm"
                />
              </View>
              <View>
                <Text className="text-sm ml-4 mt-2 text-gray-500">
                  Hauteur(cm)
                </Text>
                <TextInput
                  className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
                  placeholder="100cm"
                />
              </View>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                className={`bg-white rounded-lg w-11/12 mx-auto mt-4 flex-row border-2 border-gray-200 items-center ${
                  xxlDimensions ? "border-[#f44f2a]" : ""
                }`}
                onPress={() => {
                  setAllDimensionsFalse();
                  setXxlDimensions(true);
                  setDimensions("XXL");
                }}
              >
                <View>
                  <Image
                    className=" items-center h-10 w-10 ml-4"
                    source={require("../../assets/icons/scooter.png")}
                  />
                </View>
                <View className="py-2">
                  <Text className="font-semibold ml-4 ">Taille XXL</Text>
                  <Text className="text-sm ml-4  text-gray-500">
                    Nécessite un petit utilitaire (scooter, armoire,canapé,lit
                    ...)
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className={`bg-white rounded-lg w-11/12 mx-auto mt-2 flex-row border-2 border-gray-200 items-center ${
                  xlDimensions ? "border-[#f44f2a]" : ""
                }`}
                onPress={() => {
                  setAllDimensionsFalse();
                  setXlDimensions(true);
                  setDimensions("XL");
                }}
              >
                <View>
                  <Image
                    className=" items-center h-9 w-9 ml-4"
                    source={require("../../assets/icons/table.png")}
                  />
                </View>
                <View className="py-2 w-11/12">
                  <Text className="font-semibold ml-4 ">Taille XL</Text>
                  <Text className="text-sm ml-4  text-gray-500">
                    Tient dans un break ou un monospace (commode, fauteuil,
                    table basse ...)
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className={`bg-white rounded-lg w-11/12 mx-auto mt-2 flex-row border-2 border-gray-200 items-center ${
                  lDimensions ? "border-[#f44f2a]" : ""
                }`}
                onPress={() => {
                  setAllDimensionsFalse();
                  setLDimensions(true);
                  setDimensions("L");
                }}
              >
                <View>
                  <Image
                    className=" items-center h-9 w-9 ml-4"
                    source={require("../../assets/icons/guitar.png")}
                  />
                </View>
                <View className="py-2 w-11/12">
                  <Text className="font-semibold ml-4 ">Taille L</Text>
                  <Text className="text-sm ml-4  text-gray-500">
                    L'equivalent d'un coffre de voiture (valise, carton, sac de
                    voyage ...)
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className={`bg-white rounded-lg w-11/12 mx-auto mt-2 flex-row border-2 border-gray-200 items-center ${
                  mDimensions ? "border-[#f44f2a]" : ""
                }`}
                onPress={() => {
                  setAllDimensionsFalse();
                  setMDimensions(true);
                  setDimensions("M");
                }}
              >
                <View>
                  <Image
                    className=" items-center h-8 w-8 ml-4"
                    source={require("../../assets/icons/suitcase.png")}
                  />
                </View>
                <View className="py-2 w-11/12">
                  <Text className="font-semibold ml-4 ">Taille M</Text>
                  <Text className="text-sm ml-4  text-gray-500">
                    Tient dans une valise cabine (ordinateur, platine vinyle
                    ...)
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className={`bg-white rounded-lg w-11/12 mx-auto mt-2 flex-row border-2 border-gray-200 items-center ${
                  sDimensions ? "border-[#f44f2a]" : ""
                }`}
                onPress={() => {
                  setAllDimensionsFalse();
                  setSDimensions(true);
                  setDimensions("S");
                }}
              >
                <View>
                  <Image
                    className=" items-center h-9 w-9 ml-4"
                    source={require("../../assets/icons/sneakers.png")}
                  />
                </View>
                <View className="py-2 w-11/12">
                  <Text className="font-semibold ml-4 ">Taille S</Text>
                  <Text className="text-sm ml-4  text-gray-500">
                    Tient dans une boite a chaussures (téléphone, clés ,vêtement
                    ...)
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <Text className="text-xl font-semibold ml-4 mt-4">Poids</Text>
          <View className="flex-row mt-4 justify-center items-center">
            <Switch
              className="mr-4 ml-4"
              trackColor={{ false: "#767577", true: "#f44f2a" }}
              thumbColor={isWeightEnabled ? "white" : "white"}
              onValueChange={toggleWeightSwitch}
              value={isWeightEnabled}
            />
            <Text className=" text-gray-500 mr-auto">
              {isWeightEnabled
                ? "Je connaisles dimensions de l'objet"
                : "Je ne connais pas les dimmensions"}
            </Text>
          </View>
          {isWeightEnabled ? (
            <View>
              <View className="mt-3">
                <Text className="text-sm ml-4 mt-2 text-gray-500">
                  Poids(kg)
                </Text>
                <TextInput
                  className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
                  placeholder="10kg"
                />
              </View>
            </View>
          ) : (
            <View className="flex-row">
              <View className="flex-col w-6/12">
                <TouchableOpacity
                  className={`bg-white justify-center items-center rounded-lg p-2 w-11/12 mx-auto mt-2 flex-row border-2 border-gray-200 ${
                    infFiveKgCategory ? "border-[#f44f2a]" : ""
                  }`}
                  onPress={() => {
                    setAllCategoriesFalse();
                    setWeight("< 5 kg");
                    setInfFiveKgCategory(true);
                  }}
                >
                  <Text> {"< 5 kg"} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`bg-white justify-center p-2 rounded-lg w-11/12 mx-auto mt-2 flex-row border-2 border-gray-200 items-center ${
                    fiveToThirtyKgCategory ? "border-[#f44f2a]" : ""
                  }`}
                  onPress={() => {
                    setAllCategoriesFalse();
                    setWeight("5 - 30 kg");
                    setFiveToThirtyKgCategory(true);
                  }}
                >
                  <Text> {"5 - 30 kg"} </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-col w-6/12">
                <TouchableOpacity
                  className={`bg-white justify-center p-2  rounded-lg w-11/12 mx-auto mt-2 flex-row border-2 border-gray-200 items-center ${
                    thirtyToHundredKgCategory ? "border-[#f44f2a]" : ""
                  }`}
                  onPress={() => {
                    setAllCategoriesFalse();
                    setWeight("30 - 100 kg");
                    setThirtyToHundredKgCategory(true);
                  }}
                >
                  <Text> {"30 - 100 kg"} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`bg-white justify-center p-2  rounded-lg w-11/12 mx-auto mt-2 flex-row border-2 border-gray-200 items-center ${
                    supHundredKgCategory ? "border-[#f44f2a]" : ""
                  }`}
                  onPress={() => {
                    setAllCategoriesFalse();
                    setWeight("> 100 kg");
                    setSupHundredKgCategory(true);
                  }}
                >
                  <Text> {"> 100 kg"} </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View className="flex-row mt-4">
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
              if (name === "" || dimensions === "" || weight === "") {
                setError("Veuillez remplir tous les champs");
              } else {
                navigation.navigate("Publier_3", {
                  name: name,
                  dimensions: dimensions,
                  weight: weight,
                });
              }
            }}
          >
            <Text className="text-center text-white">Suivant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
