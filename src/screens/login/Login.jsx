import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuth } from "../../context/useAuth";

export default function Login({ navigation }) {
  const { loginWithEmail, loading, error, userInfo } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await loginWithEmail(email, password);
    if (userInfo) {
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomTabs" }],
      });
    }
  };

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Seedling for your project.</Text>
      {/* {error && <Text style={LoginStyles.error}>{error}</Text>} */}
      <TextInput
        style={LoginStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={LoginStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading || !email || !password}
        style={LoginStyles.button}
      >
        Login
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate("Signup")} // Navigate to Signup page
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  error: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  button: {
    marginTop: 16,
    width: "100%",
  },
  signupButton: {
    marginTop: 8,
  },
});
