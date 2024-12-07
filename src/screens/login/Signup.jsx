import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function Signup({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomTabs" }],
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
        mode="outlined"
        placeholder="Enter your name"
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        mode="outlined"
        placeholder="Enter your email"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        placeholder="Enter your password"
      />

      <Button
        mode="contained"
        onPress={handleSignup}
        loading={loading}
        disabled={loading || !email || !password || !name}
        style={styles.button}
      >
        Sign Up
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate("Login")}
        style={styles.loginButton}
      >
        Already have an account? Log In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
  loginButton: {
    marginTop: 8,
  },
});
