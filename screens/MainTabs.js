import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BooksScreen from "./BooksScreen";
import FavoritesScreen from "./FavoritesScreen";
import SettingsScreen from "./SettingsScreen";

import { AppContext } from "../context/AppContext";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { darkTheme } = React.useContext(AppContext);
  const theme = useTheme();

  const initialBooks = [
    { id: 1, title: "Тигролови", author: "Багряний", image: "https://upload.wikimedia.org/wikipedia/uk/3/3b/Tyholovy_cover.jpg", rating: 5, lang: "ua" },
    { id: 2, title: "Місто", author: "Підмогильний", image: "https://upload.wikimedia.org/wikipedia/uk/7/7e/Misto_roman.jpg", rating: 5, lang: "ua" },
    { id: 3, title: "1984", author: "Orwell", image: "https://covers.openlibrary.org/b/id/1535415-L.jpg", rating: 5, lang: "en" },
    { id: 4, title: "Harry Potter", author: "Rowling", image: "https://covers.openlibrary.org/b/id/7984916-L.jpg", rating: 5, lang: "en" },
  ];

  const [books, setBooks] = useState(initialBooks);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("favorites").then((f) => {
      if (f) setFavorites(JSON.parse(f));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: darkTheme ? "#0f172a" : "#fff" },
        tabBarStyle: { backgroundColor: darkTheme ? "#111827" : "#fff" },
        tabBarActiveTintColor: "#8b5cf6",
      }}
    >
      <Tab.Screen
        name="Books"
        children={() => (
          <BooksScreen
            books={books}
            setBooks={setBooks}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" color={color} size={22} />
          ),
        }}
      />

      <Tab.Screen
        name="Favorites"
        children={() => (
          <FavoritesScreen
            books={books.filter((b) => favorites.includes(b.id))}
          />
        )}
      />

      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}