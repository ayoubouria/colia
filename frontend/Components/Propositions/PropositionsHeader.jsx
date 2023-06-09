import { View, Text, TouchableHighlight } from "react-native";
import Ionincons from "react-native-vector-icons/Ionicons";

const PropositionsHeader = ({ navigation }) => {
  return (
    <View className="mt-7">
      <View>
        <TouchableHighlight
          onPress={() => navigation.navigate("Recu")}
          underlayColor="#f9dcd5"
          className="flex-row items-center px-5 py-3 rounded-lg border-t-[0.5px] border-gray-300 h-14"
        >
          <View className="flex-row justify-between items-center w-full">
            <Text className="text-lg">Reçu</Text>
            <Ionincons name="arrow-forward-outline" size={20} />
          </View>
        </TouchableHighlight>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => navigation.navigate("Recu")}
          underlayColor="#f9dcd5"
          className="flex-row items-center px-5 py-3 rounded-lg border-[0.5px] border-gray-300 h-14"
        >
          <View className="flex-row justify-between items-center w-full">
            <Text className="text-lg">Envoyé</Text>
            <Ionincons name="arrow-forward-outline" size={20} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default PropositionsHeader;
