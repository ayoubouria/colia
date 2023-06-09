import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginStackNav from "./Navigation/LoginStackNav";
import HomeTabNav from "./Navigation/HomeTabNav";
import RechercheStackNav from "./Navigation/RechercheStackNav";
import { StatusBar, Text } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignIn from "./Screens/SignIn";
import SignUp from "./Screens/SignUp";
import { ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
  },
};

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const handleLogin = async () => {
    try {
      const currentUser = await AsyncStorage.getItem("user");
      if (currentUser) {
        setIsAuth(true);
        setUser(JSON.parse(currentUser));
        setLoading(false);
        console.log("test");
        console.log("user" + currentUser);
        console.log("isAuth :" + isAuth);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleLogin();
    console.log("isAuth :" + isAuth);
    console.log("loading :" + loading);
  }, []);

  // useFocusEffect(
  //   useCallback(() => {

  //     const subscription = BackHandler.addEventListener(
  //       "hardwareBackPress",
  //       true
  //     );

  //     return () => subscription.remove();
  //   },[])
  // );
  // handleLogin();
  return (
    <NavigationContainer theme={MyTheme}>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          size="large"
          color="#f44f2a"
        />
      ) : (
        <Stack.Navigator
          initialRouteName={isAuth ? "RechercheStackNav" : "LoginStackNav"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LoginStackNav" component={LoginStackNav} />
          <Stack.Screen
            name="RechercheStackNav"
            component={RechercheStackNav}
            options={{ gestureEnabled: false, headerLeft: () => null }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ gestureEnabled: false, headerLeft: () => null }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ gestureEnabled: false, headerLeft: () => null }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
    // </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
