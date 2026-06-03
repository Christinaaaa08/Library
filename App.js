import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";

import { View, ActivityIndicator, Alert } from "react-native";

import LoginScreen from "./screens/LoginScreen";
import MainTabs from "./screens/MainTabs";
import { AppContext } from "./context/AppContext";

const Stack = createNativeStackNavigator();

const API_URL = "http://10.16.137.209:3000";

export default function App() {
  const [user, setUser] = useState(null);
  const [darkTheme, setDarkTheme] = useState(true);
  const [loading, setLoading] = useState(true);

  // 📚 КНИГИ (ВЖЕ ПРАВИЛЬНІ + БІЛЬШЕ)
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Кобзар",
      author: "Тарас Шевченко",
      language: "ua",
      rating: "5",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      title: "Harry Potter",
      author: "J.K. Rowling",
      language: "en",
      rating: "4.9",
      image: "https://picsum.photos/200/301",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      language: "en",
      rating: "5",
      image: "https://picsum.photos/200/302",
    },
    {
      id: 4,
      title: "Тигролови",
      author: "Іван Багряний",
      language: "ua",
      rating: "4.8",
      image: "https://picsum.photos/200/303",
    },
  ]);

  useEffect(() => {
    const load = async () => {
      try {
        const u = await AsyncStorage.getItem("user");
        const t = await AsyncStorage.getItem("theme");

        if (u) setUser(JSON.parse(u));
        if (t !== null) setDarkTheme(JSON.parse(t));
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
    };

    load();
  }, []);

  // 🔥 LOGIN через API
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Помилка", data.message || "Login failed");
        return;
      }

      const userData = {
        email: data.user.email,
        token: data.token,
      };

      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (e) {
      console.log(e);
      Alert.alert("Server error", "Сервер недоступний");
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  const toggleTheme = async () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    await AsyncStorage.setItem("theme", JSON.stringify(newTheme));
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const theme = darkTheme ? MD3DarkTheme : MD3LightTheme;

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        darkTheme,
        toggleTheme,

        // 📚 ВАЖЛИВО — КНИГИ ТУТ
        books,
        setBooks,
      }}
    >
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!user ? (
              <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
              <Stack.Screen name="Main" component={MainTabs} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AppContext.Provider>
  );
}