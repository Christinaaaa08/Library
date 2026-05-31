import React, { useState } from "react";
import { View, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useApp } from "../context/AppContext";

const users = [
  { username: "admin", password: "1234", name: "Admin" },
  { username: "user", password: "1111", name: "User" },
];

export default function LoginScreen() {
  const { login } = useApp();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) {
      Alert.alert("Error", "Wrong login");
      return;
    }

    login(found);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput label="Username" onChangeText={setUsername} />
      <TextInput label="Password" secureTextEntry onChangeText={setPassword} />

      <Button mode="contained" onPress={handleLogin} style={{ marginTop: 20 }}>
        Login
      </Button>
    </View>
  );
}