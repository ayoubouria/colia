import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "react-native";
export default function Publier({ navigation }) {
  return (
    <View className="flex-1 bg-white dark:bg-slate-900">
      <View className="pt-10 px-5">
        <Text className="text-2xl">Nouvelle Annonce</Text>
      </View>
      <View className="mt-6 mx-5">
        <Text className="text-gray-700">
          Créez une nouvelle demande de livraison
        </Text>
      </View>
      <View>
        <TouchableOpacity
          className="bg-orange-500 rounded-lg mx-5 mt-10"
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Publier_2")}
        >
          <Text className="text-white text-center py-3 text-lg">Publier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
