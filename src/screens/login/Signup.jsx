import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Signup({ navigation }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "BottomTabs" }],
    });
  };

  return (
    <View style={SignupStyles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={SignupStyles.logo}
      />
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={SignupStyles.input}
        mode="outlined"
        placeholder="Enter your name"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        style={SignupStyles.input}
        mode="outlined"
        placeholder="Enter your email"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={SignupStyles.input}
        mode="outlined"
        placeholder="Enter your password"
      />
      <Button mode="contained" onPress={handleSignup} style={SignupStyles.button}>
        Sign Up
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate("Login")}
        style={SignupStyles.loginButton}
      >
        Already have an account? Login
      </Button>
    </View>
  );
}

const SignupStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: '#e0f7fa',
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
  loginButton: {
    marginTop: 16,
    color: '#00796b',
  },
});