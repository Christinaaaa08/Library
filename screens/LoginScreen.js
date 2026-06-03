import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";
import { useApp } from "../context/AppContext";

export default function LoginScreen() {
  const { login } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email.includes("@")) {
      Alert.alert("Помилка", "Невірний email");
      return;
    }

    if (password.length < 4) {
      Alert.alert("Помилка", "Пароль мінімум 4 символи");
      return;
    }

    login(email, password);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>

          <Text variant="headlineMedium">📚 Library Login</Text>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={{ marginTop: 20 }}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ marginTop: 10 }}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            style={{ marginTop: 20 }}
          >
            Login
          </Button>

        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:"center", padding:20 },
  card: { padding:10 }
});