import React from "react";
import { View, Image } from "react-native";
import { Text, Card } from "react-native-paper";
import { useRoute } from "@react-navigation/native";

export default function BookDetailScreen() {
  const { book } = useRoute().params;

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#0b0b0f" }}>
      <Card>
        <Image
          source={{ uri: "https://placehold.co/400x600" }}
          style={{ height: 300 }}
        />

        <Card.Content>
          <Text variant="headlineMedium">{book.title}</Text>
          <Text>{book.author}</Text>
          <Text>Категорія: {book.category}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}