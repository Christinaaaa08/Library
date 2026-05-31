import React from "react";
import { FlatList, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

const books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "Animal Farm", author: "George Orwell" },
  { id: 3, title: "Harry Potter and the Sorcerer’s Stone", author: "J.K. Rowling" },
  { id: 4, title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling" },
  { id: 5, title: "Harry Potter and the Prisoner of Azkaban", author: "J.K. Rowling" },
  { id: 6, title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 7, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
  { id: 8, title: "The Fellowship of the Ring", author: "J.R.R. Tolkien" },
  { id: 9, title: "The Two Towers", author: "J.R.R. Tolkien" },
  { id: 10, title: "The Return of the King", author: "J.R.R. Tolkien" },
  { id: 11, title: "Fahrenheit 451", author: "Ray Bradbury" },
  { id: 12, title: "Brave New World", author: "Aldous Huxley" },
  { id: 13, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 14, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 15, title: "Crime and Punishment", author: "Fyodor Dostoevsky" },
  { id: 16, title: "The Idiot", author: "Fyodor Dostoevsky" },
  { id: 17, title: "War and Peace", author: "Leo Tolstoy" },
  { id: 18, title: "Anna Karenina", author: "Leo Tolstoy" },
  { id: 19, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 20, title: "Dune", author: "Frank Herbert" },
];

export default function BooksScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ margin: 10, borderRadius: 12 }}>
            <Card.Content>
              <Text variant="titleLarge">{item.title}</Text>
              <Text style={{ opacity: 0.7 }}>{item.author}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}