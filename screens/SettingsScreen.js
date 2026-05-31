import React from "react";
import { View } from "react-native";
import { Text, Switch, Button, useTheme } from "react-native-paper";
import { useApp } from "../context/AppContext";

export default function SettingsScreen() {
  const { user, logout, dark, toggleTheme } = useApp();
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 20 }}>
        User: {user?.name}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ marginRight: 10 }}>Dark theme</Text>
        <Switch value={dark} onValueChange={toggleTheme} />
      </View>

      <Button mode="contained" onPress={logout} style={{ marginTop: 20 }}>
        Logout
      </Button>
    </View>
  );
}