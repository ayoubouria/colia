import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabNav from "./HomeTabNav";
import Settings from "../Screens/Settings/Settings";
import UserProfile from "../Screens/Settings/UserProfile";
import ProfileButton from "../Components/Settings/ProfileButton";

const Stack = createNativeStackNavigator();

export default function MesColisStackNav() {
    return (
  
        <Stack.Navigator initialRouteName="HomeTabNav"  screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabNav" component={HomeTabNav} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            
        </Stack.Navigator>
    );
  }