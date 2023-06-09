import Envoi from "../Components/MesColis/Envoi";
import PackageScreen from "../Screens/Recherche/PackageScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabNav from "./HomeTabNav";

const Stack = createNativeStackNavigator();

export default function MesColisStackNav() {
    return (
  
        <Stack.Navigator initialRouteName="HomeTabNav"  screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabNav" component={HomeTabNav} />
            <Stack.Screen name="Envoi" component={Envoi} />
            <Stack.Screen name="PackageScreen" component={PackageScreen} />
        </Stack.Navigator>
    );
  }