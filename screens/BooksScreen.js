import React, { useContext, useState } from "react";
import { View, FlatList, Image } from "react-native";
import { Text, Card, TextInput, Chip } from "react-native-paper";
import { AppContext } from "../context/AppContext";

export default function BooksScreen({ favorites, toggleFavorite }) {

  const { books } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = books.filter((b) => {
    const matchSearch = b.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchLang =
      filter === "all" || b.language === filter;

    return matchSearch && matchLang;
  });

  return (
    <View style={{ flex: 1, padding: 10 }}>

      <TextInput
        placeholder="Пошук"
        value={search}
        onChangeText={setSearch}
      />

      <View style={{ flexDirection: "row" }}>
        <Chip onPress={() => setFilter("all")}>All</Chip>
        <Chip onPress={() => setFilter("ua")}>UA</Chip>
        <Chip onPress={() => setFilter("en")}>EN</Chip>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ margin: 10, padding: 10 }}>

            <Image
              source={{ uri: item.image }}
              style={{ width: 80, height: 110 }}
            />

            <Text>{item.title}</Text>
            <Text>{item.author}</Text>
            <Text>⭐ {item.rating}</Text>

          </Card>
        )}
      />

    </View>
  );
}