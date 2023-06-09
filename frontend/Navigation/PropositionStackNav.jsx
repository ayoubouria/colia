import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabNav from "./HomeTabNav";
import Propositions from "../Screens/Propositions/Propositions";

const Stack = createNativeStackNavigator();

export default function PropositionsStackNav() {
  return (
    <Stack.Navigator
      initialRouteName="HomeTabNav"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeTabNav" component={HomeTabNav} />
      <Stack.Screen name="Propositions" component={Propositions} />
    </Stack.Navigator>
  );
}
