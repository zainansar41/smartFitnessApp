import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomTabs" }],
      });
  };

  return (
    <View style={LoginStyles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={LoginStyles.logo}
      />
      <TextInput
        style={LoginStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={LoginStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleLogin} style={LoginStyles.button}>
        Login
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate("Signup")}
        style={LoginStyles.signupButton}
      >
        Don't have an account? Sign Up
      </Button>
    </View>
  );
}

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    // backgroundColor: '#e0f7fa',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 32,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#00796b',
  },
  input: {
    width: '100%',
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#00796b',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#00796b',
  },
  signupButton: {
    marginTop: 16,
  },
});