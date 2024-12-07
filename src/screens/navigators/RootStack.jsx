import { createStackNavigator } from "@react-navigation/stack";

import BottomTabs from "./BottomTabs";
import Login from "./../login/Login";
import Signup from "../login/Signup";
import Settings from "./../settings/Settings";
import { useAuth } from "../../context/useAuth";

const Stack = createStackNavigator();

export default function RootStack() {
  const { userInfo } = useAuth();

  if (userInfo) {
    return (
      <Stack.Navigator
        initialRouteName="BottomTabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    );
  }
}
