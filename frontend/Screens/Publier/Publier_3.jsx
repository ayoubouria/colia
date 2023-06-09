import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useRoute } from "@react-navigation/native";

const Publier_3 = ({ navigation }) => {
  const route = useRoute();
  const name = route.params.name;
  const dimensions = route.params.dimensions;
  const weight = route.params.weight;
  // -----------------------Departure-------------------
  const [departureLongitude, setDepartureLongitude] = useState(0);
  const [departureLatitude, setDepartureLatitude] = useState(0);
  const [departureCity, setDepartureCity] = useState("");
  const handleDepartureSelect = (data, details) => {
    const { geometry } = details;
    const { location } = geometry;
    setDepartureLatitude(location.lat);
    setDepartureLongitude(location.lng);
    setDepartureCity(
      details.name + ", " + details.address_components[1].long_name
    );
  };
  // -----------------------Arrival-------------------
  const [arrivalLongitude, setArrivalLongitude] = useState(0);
  const [arrivalLatitude, setArrivalLatitude] = useState(0);
  const [arrivalCity, setArrivalCity] = useState("");
  const handleArrivalSelect = (data, details) => {
    const { geometry } = details;
    const { location } = geometry;
    // console.log(location.lat, location.lng);
    setArrivalLatitude(location.lat);
    setArrivalLongitude(location.lng);
    console.log("location", location);
    // console.log("details", details.address_components[1].long_name);
    setArrivalCity(
      details.name + ", " + details.address_components[1].long_name
    );
  };
  // -----------------------dates--------------------------
  // const [date, setDate] = useState(new Date(1598051730000));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChangeStartDay = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartDate(currentDate);
  };
  const onChangeEndDay = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndDate(currentDate);
  };

  const showModeStartDate = (currentMode) => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange: onChangeStartDay,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepickerEndDate = () => {
    showModeEndDate("date");
  };

  const showModeEndDate = (currentMode) => {
    DateTimePickerAndroid.open({
      value: endDate,
      onChange: onChangeEndDay,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepickerStartDate = () => {
    showModeStartDate("date");
  };
  const formatDate = (date) => {
    return format(date, "dd MMM");
  };
  // ---------------------------------useEffect-------------------------
  const [error, setError] = useState("");
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Nouvelle Annonce",
    });
  }, []);
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
            <View className="bg-[#f9dcd5] rounded-full w-10 h-10 justify-center items-center ">
              <Ionicons name="car-outline" size={24} color="#f44f2a" />
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
          <View className="w-11/12 mx-auto mt-4 p-2 bg-[#f9dcd5]  rounded-lg">
            <Text className="text-[#f44f2a] ">
              Ces informations seront visibles au transporteur que vous aurez
              choisi pour la livraison
            </Text>
          </View>
          {error === "" ? null : (
            <Text className="text-red-500 text-center">{error}</Text>
          )}
          <Text className="text-xl font-semibold ml-4 mt-4">Départ</Text>
          <Text className="text-sm ml-4 mt-5 text-gray-500">
            Ville ou adresse
          </Text>
          <View>
            <GooglePlacesAutocomplete
              placeholder="Saissisez une ville ou une adresse"
              onPress={handleDepartureSelect}
              className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
              query={{
                key: "AIzaSyCWUx1QA5ZML7Ymb3ChcybKP34YcYkcr7c",
                language: "en",
                components: "country:ma",
              }}
              styles={{
                textInputContainer: styles.textInputContainer,
                textInput: styles.textInput,
                listView: styles.listView,
                description: styles.description,
              }}
              fetchDetails
              autoFocus={false}
              debounce={200}
            />
          </View>
          <Text className="text-xl font-semibold ml-4 mt-4">Arrivée</Text>
          <Text className="text-sm ml-4 mt-5 text-gray-500">
            Ville ou adresse
          </Text>
          <View>
            <GooglePlacesAutocomplete
              placeholder="Saissisez une ville ou une adresse"
              onPress={handleArrivalSelect}
              className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
              query={{
                key: "AIzaSyCWUx1QA5ZML7Ymb3ChcybKP34YcYkcr7c",
                language: "en",
                components: "country:ma",
              }}
              styles={{
                textInputContainer: styles.textInputContainer,
                textInput: styles.textInput,
                listView: styles.listView,
                description: styles.description,
              }}
              fetchDetails
              autoFocus={false}
              debounce={200}
            />
          </View>
          <Text className="text-xl font-semibold ml-4 mt-4">Dates</Text>
          <Text className="text-sm ml-4 mt-5 text-gray-500">
            Quand la livraison doit-elle être effectuée ?
          </Text>
          <Text className="text-sm ml-4 mt-5 text-gray-500">Date de début</Text>
          <TouchableOpacity
            onPress={showDatepickerStartDate}
            className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
          >
            <Text>{formatDate(startDate)}</Text>
          </TouchableOpacity>
          <Text className="text-sm ml-4 mt-5 text-gray-500">Date de fin</Text>
          <TouchableOpacity
            onPress={showDatepickerEndDate}
            className="p-4 border-2 border-gray-200 rounded-lg w-11/12 mx-auto"
          >
            <Text>{formatDate(endDate)}</Text>
          </TouchableOpacity>
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
              const pickupAddress = {
                name: departureCity,
                latitude: departureLatitude,
                longitude: departureLongitude,
              };
              const deliveryAddress = {
                name: arrivalCity,
                latitude: arrivalLatitude,
                longitude: arrivalLongitude,
              };
              const desiredDeliveryDate = {
                start: startDate,
                end: endDate,
              };
              if (
                !pickupAddress.name ||
                !deliveryAddress.name ||
                !desiredDeliveryDate.start ||
                !desiredDeliveryDate.end
              ) {
                setError("Veuillez remplir tous les champs");
              } else {
                // console.log(pickupAddress, deliveryAddress, dates)
                navigation.navigate("Publier_4", {
                  name,
                  dimensions,
                  weight,
                  pickupAddress,
                  deliveryAddress,
                  desiredDeliveryDate,
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
    height: "60%",
  },
  searchContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
  },
  textInputContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: "90%",
    marginLeft: 10,
    marginTop: 10,
  },
  textInput: {
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  listView: {
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
    marginTop: 5,
  },
  description: {
    fontSize: 16,
  },
});

export default Publier_3;
