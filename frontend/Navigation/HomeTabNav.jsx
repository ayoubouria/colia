import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Recherche from "../Screens/Recherche/Recherche";
// import Publier from "../Screens/Publier/Publier_1";
import PublierStackNav from "./PublierStackNav";
import Messagerie from "./../Screens/Messagerie";
import Ionicons from "react-native-vector-icons/Ionicons";
import RechercheStackNav from "./RechercheStackNav";
import MesColisStackNav from "./MesColisStackNav";
import MesColis from "../Screens/MesColis/MesColis";
import Settings from "../Screens/Settings/Settings";
import Propositions from "../Screens/Propositions/Propositions";
import { useColorScheme } from "nativewind";
const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {

  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function HomeTabNav(props) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  // console.log(props.route.params.data);
  return (
    <Tab.Navigator
      initialRouteName="SignIn"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "Recherche") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name == "MesColis") {
            iconName = focused ? "cube" : "cube-outline";
          } else if (route.name == "Publier") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name == "Propositions") {
            iconName = focused ? "documents" : "documents-outline";
          } else if (route.name == "Paramètres") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        activeTintColor: "#f44f2a", // Color of the active tab text and icon
        inactiveTintColor: "gray",
        headerShown: false,
        tabBarActiveTintColor: "#f44f2a",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#111827" : "white",
          color: "white",
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          borderRadius: 15,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Recherche" component={Recherche} />
      <Tab.Screen name="MesColis" component={MesColis} />
      <Tab.Screen name="Publier" component={PublierStackNav} />
      <Tab.Screen name="Propositions" component={Propositions} />
      <Tab.Screen name="Paramètres" component={Settings} />
    </Tab.Navigator>
  );
}
