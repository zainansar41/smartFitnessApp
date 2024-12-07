import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged } from "firebase/auth";

import RootStack from "./screens/navigators/RootStack";
import { auth } from "./configs/firebase";

WebBrowser.maybeCompleteAuthSession();

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { UserProvider } from "./context/useAuth";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export default function App() {
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (!user) {
  //       // Remove the `@user` key when the user is logged out
  //       await AsyncStorage.removeItem("@user");
  //       console.log("User logged out, @user key removed from AsyncStorage.");
  //     }
  //   });

  //   // Cleanup the subscription when the component unmounts
  //   return () => unsubscribe();
  // }, []);

  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <GestureHandlerRootView>
        <NavigationContainer theme={CombinedDarkTheme}>
          <UserProvider>
            <RootStack />
            <StatusBar style="light" />
          </UserProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
