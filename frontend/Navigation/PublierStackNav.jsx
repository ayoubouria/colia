import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Publier_1 from "../Screens/Publier/Publier_1";
import Publier_2 from "../Screens/Publier/Publier_2";
import Publier_3 from "../Screens/Publier/Publier_3";
import Publier_4 from "../Screens/Publier/Publier_4";

const Stack = createNativeStackNavigator();

export default function PublierStackNav() {
  return (
    <Stack.Navigator
      initialRouteName="Publier_1"
      screenOptions={{ headerShown: false }}
    >
        <Stack.Screen name="Publier_1" component={Publier_1} />
        <Stack.Screen name="Publier_2" component={Publier_2} />
        <Stack.Screen name="Publier_3" component={Publier_3} /> 
        <Stack.Screen name="Publier_4" component={Publier_4} />


    </Stack.Navigator>
  );
}
