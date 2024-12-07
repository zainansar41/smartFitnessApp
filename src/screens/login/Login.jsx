import React, { useState } from "react";
import { StyleSheet, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Button, Text, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      // You might want to add a toast or alert here
      return;
    }

    setIsLoading(true);
    try {
      // Simulated login logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomTabs" }],
      });
    } catch (error) {
      // Handle login error
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={LoginStyles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={LoginStyles.keyboardContainer}
      >
        <View style={LoginStyles.contentContainer}>
          <Image
            source={require('../../assets/logo.jpg')} // Replace with your actual logo
            style={LoginStyles.logo}
            resizeMode="contain"
          />
          
          <Text style={LoginStyles.welcomeText}>Welcome Back</Text>
          <Text style={LoginStyles.subtitleText}>Log in to continue</Text>
          
          <View style={LoginStyles.inputContainer}>
            <TextInput
              style={LoginStyles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#6b7280"
              autoCorrect={false}
              accessibilityLabel="Email input"
            />
            
            <View style={LoginStyles.passwordContainer}>
              <TextInput
                style={LoginStyles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor="#6b7280"
                accessibilityLabel="Password input"
              />
              <TouchableOpacity 
                style={LoginStyles.eyeIcon}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <IconButton 
                  icon={isPasswordVisible ? "eye-off" : "eye"}
                  size={24}
                  color="#00796b"
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              onPress={() => navigation.navigate("ForgotPassword")}
              style={LoginStyles.forgotPasswordContainer}
            >
              <Text style={LoginStyles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          
          <Button 
            mode="contained" 
            onPress={handleLogin} 
            style={LoginStyles.button}
            loading={isLoading}
            disabled={isLoading || !email || !password}
          >
            {isLoading ? "Logging In..." : "Login"}
          </Button>
          
          <View style={LoginStyles.signupContainer}>
            <Text style={LoginStyles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={LoginStyles.signupLinkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 24,
    borderRadius: 75,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 16,
    paddingRight: 50, // Space for eye icon
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#00796b',
    borderRadius: 12,
    color: '#fff',
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingRight: 8,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#00796b',
    fontSize: 14,
  },
  button: {
    width: '100%',
    padding: 8,
    borderRadius: 12,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    color: '#6b7280',
    fontSize: 16,
  },
  signupLinkText: {
    color: '#00796b',
    fontWeight: '700',
    fontSize: 16,
  },
});