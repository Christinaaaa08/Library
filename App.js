import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

import { AppContext } from "./context/AppContext";
import AuthStack from "./navigation/AuthStack";
import AppTabs from "./navigation/AppTabs";

export default function App() {
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(true);

  const theme = dark
    ? {
        ...MD3DarkTheme,
        colors: {
          ...MD3DarkTheme.colors,
          primary: "#a855f7",
          background: "#0b0b0b",
        },
      }
    : {
        ...MD3LightTheme,
        colors: {
          ...MD3LightTheme.colors,
          primary: "#6d28d9",
          background: "#ffffff",
        },
      };

  useEffect(() => {
    const load = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      const savedTheme = await AsyncStorage.getItem("dark");

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedTheme !== null) setDark(JSON.parse(savedTheme));

      setLoading(false);
    };
    load();
  }, []);

  const login = async (u) => {
    setUser(u);
    await AsyncStorage.setItem("user", JSON.stringify(u));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  const toggleTheme = async () => {
    const newTheme = !dark;
    setDark(newTheme);
    await AsyncStorage.setItem("dark", JSON.stringify(newTheme));
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AppContext.Provider value={{ user, login, logout, dark, toggleTheme }}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {user ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
      </PaperProvider>
    </AppContext.Provider>
  );
}