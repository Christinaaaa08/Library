import React from "react";
import { FlatList } from "react-native";
import { Card, Text } from "react-native-paper";

export default function FavoritesScreen({ books }) {
  return (
    <FlatList
      data={books}
      keyExtractor={(i) => i.id.toString()}
      renderItem={({ item }) => (
        <Card style={{ margin: 10 }}>
          <Card.Content>
            <Text>{item.title}</Text>
          </Card.Content>
        </Card>
      )}
    />
  );
}