import React, { useContext, useState } from "react";
import { View, Alert, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput, Card, Text, useTheme } from "react-native-paper";
import { AppContext } from "../context/AppContext";

export default function SettingsScreen() {
  const { books, setBooks, logout, toggleTheme } = useContext(AppContext);
  const theme = useTheme();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addBook = () => {
    if (!title || !author) {
      Alert.alert("Помилка", "Заповніть всі поля");
      return;
    }

    const newBook = {
      id: Date.now(),
      title,
      author,
      language: "ua",
      rating: "4.5",
      image: "https://picsum.photos/200",
    };

    setBooks((prev) => [...prev, newBook]);

    setTitle("");
    setAuthor("");

    Alert.alert("Успіх", "Книгу додано 📚");
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {/* HEADER */}
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        ⚙️ Налаштування
      </Text>

      {/* THEME + LOGOUT */}
      <Card style={styles.card}>
        <Card.Content>

          <Button
            mode="contained"
            onPress={toggleTheme}
            style={styles.btn}
          >
            🌙 Змінити тему
          </Button>

          <Button
            mode="outlined"
            onPress={logout}
            style={styles.btn}
          >
            🚪 Вийти
          </Button>

        </Card.Content>
      </Card>

      {/* ADD BOOK */}
      <Card style={styles.card}>
        <Card.Content>

          <Text style={styles.sectionTitle}>
            ➕ Додати книгу
          </Text>

          <TextInput
            label="Назва книги"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            label="Автор"
            value={author}
            onChangeText={setAuthor}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={addBook}
            style={styles.addBtn}
          >
            Додати книгу
          </Button>

        </Card.Content>
      </Card>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    marginBottom: 15,
    borderRadius: 16,
    padding: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  input: {
    marginBottom: 10,
    backgroundColor: "transparent",
  },

  btn: {
    marginBottom: 10,
    borderRadius: 12,
  },

  addBtn: {
    marginTop: 10,
    borderRadius: 12,
  },
});