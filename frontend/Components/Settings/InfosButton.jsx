import { Text, View, TouchableHighlight } from "react-native";

const InfosButton = ({navigation}) => {
  return (
    <View>
      <TouchableHighlight
        onPress={() => navigation.navigate("Profile")}
        underlayColor="#f9dcd5"
        className="flex-row items-center px-5 py-3 rounded-lg border-[0.5px] border-gray-300 h-16"
      >
        <View className="flex-row justify-between items-center w-full">
          <Text className="text-lg dark:text-white">Informations utiles</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};
export default InfosButton;
