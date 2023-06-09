import Recherche from "../Screens/Recherche/Recherche";
import PackageScreen from "../Screens/Recherche/PackageScreen";
import SearchScreen from "../Screens/Recherche/SearchScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomwTabNav from "./HomeTabNav";
import ProposeDeliveryScreen from "../Screens/Recherche/ProposeDeliveryScreen";
import UserProfile from "../Screens/Settings/UserProfile";
import SettingsStackNav from "./SettingsStackNav";
import PropositionsStackNav from "./PropositionStackNav";
import Recu from "../Screens/Propositions/Recu";
import PropositionEnvoyee from "../Screens/Recherche/PropositionEnvoyee";
import PropositionAccepte from "../Screens/Propositions/PropositionAccepte";
const Stack = createNativeStackNavigator();


export default function LoginStackNav() {
    return (
  
        <Stack.Navigator initialRouteName="HomeTabNav"  screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeTabNav" component={HomwTabNav} />
          <Stack.Screen name="PackageScreen" component={PackageScreen} />
          {/* <Stack.Screen name="Recherche" component={Recherche} /> */}
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="ProposeDeliveryScreen" component={ProposeDeliveryScreen} />
          <Stack.Screen name="SettingsStackNav" component={SettingsStackNav} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="PropositionsStackNav" component={PropositionsStackNav} />
          <Stack.Screen name="Recu" component={Recu} />
          <Stack.Screen name="PropositionEnvoyee" component={PropositionEnvoyee} />
          <Stack.Screen name="PropositionAccepte" component={PropositionAccepte} />
        </Stack.Navigator>
    );
  }