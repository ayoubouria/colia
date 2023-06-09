import { Switch, Text, TouchableHighlight, View } from "react-native";
import { useState } from "react";
import { useColorScheme } from "nativewind";
const DarkModeButton = () => {
  const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);
  const toggleDarkModeSwitch = () => {
    setDarkModeEnabled((previousState) => !previousState);
    toggleColorScheme();
  }
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View>
      <TouchableHighlight
        onPress={() => toggleDarkModeSwitch()}
        underlayColor="#f9dcd5"
        className="flex-row items-center px-5 py-3 rounded-lg border-t-[0.5px] border-gray-300 h-16"
      >
        <View className="flex-row justify-between items-center w-full">
          <Text className="text-lg dark:text-white">Dark mode</Text>
          <Switch
            className="mr-4 ml-4"
            trackColor={{ false: "#767577", true: "#f44f2a" }}
            thumbColor={isDarkModeEnabled ? "white" : "white"}
            onValueChange={toggleDarkModeSwitch}
            value={isDarkModeEnabled}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default DarkModeButton;
