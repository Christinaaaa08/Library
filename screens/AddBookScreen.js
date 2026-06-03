import React, { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function AddBookScreen({ addBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [lang, setLang] = useState("UA");

  const handleAdd = () => {
    if (!title || !author) {
      Alert.alert("Помилка", "Заповніть всі поля");
      return;
    }

    addBook({
      title,
      author,
      lang,
      rating: 4.5,
      image: "https://covers.openlibrary.org/b/olid/OL12345M-L.jpg",
    });

    setTitle("");
    setAuthor("");

    Alert.alert("Успіх", "Книгу додано");
  };

  return (
    <View style={{ padding: 15 }}>
      <TextInput label="Назва" value={title} onChangeText={setTitle} />
      <TextInput label="Автор" value={author} onChangeText={setAuthor} />

      <Button onPress={handleAdd} mode="contained" style={{ marginTop: 20 }}>
        Додати книгу
      </Button>
    </View>
  );
}