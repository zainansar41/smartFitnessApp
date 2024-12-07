import React, { useState } from "react";
import { 
  StyleSheet, 
  View, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from "react-native";
import { Button, Text, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async () => {
    // Validate inputs
    if (!name.trim()) {
      // Show error - name is required
      return;
    }

    if (!validateEmail(email)) {
      // Show error - invalid email
      return;
    }

    if (!validatePassword(password)) {
      // Show error - weak password
      return;
    }

    setIsLoading(true);
    try {
      // Simulated signup logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomTabs" }],
      });
    } catch (error) {
      // Handle signup error
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={SignupStyles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={SignupStyles.keyboardContainer}
      >
        <ScrollView 
          contentContainerStyle={SignupStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={SignupStyles.contentContainer}>
            <Image
              source={require('../../assets/logo.jpg')} // Replace with your actual logo
              style={SignupStyles.logo}
              resizeMode="contain"
            />
            
            <Text style={SignupStyles.titleText}>Create Your Account</Text>
            <Text style={SignupStyles.subtitleText}>Sign up to get started</Text>
            
            <View style={SignupStyles.inputContainer}>
              <TextInput
                value={name}
                onChangeText={setName}
                style={SignupStyles.input}
                placeholder="Full Name"
                placeholderTextColor="#6b7280"
                autoCapitalize="words"
                accessibilityLabel="Name input"
              />
              
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={SignupStyles.input}
                placeholder="Email Address"
                placeholderTextColor="#6b7280"
                autoCorrect={false}
                accessibilityLabel="Email input"
              />
              
              <View style={SignupStyles.passwordContainer}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  style={SignupStyles.input}
                  placeholder="Password"
                  placeholderTextColor="#6b7280"
                  accessibilityLabel="Password input"
                />
                <TouchableOpacity 
                  style={SignupStyles.eyeIcon}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <IconButton 
                    icon={isPasswordVisible ? "eye-off" : "eye"}
                    size={24}
                    color="#00796b"
                  />
                </TouchableOpacity>
              </View>
              
              <Text style={SignupStyles.passwordHint}>
                Password must be at least 8 characters, 
                include uppercase, lowercase, and a number
              </Text>
            </View>
            
            <Button 
              mode="contained" 
              onPress={handleSignup} 
              style={SignupStyles.button}
              loading={isLoading}
              disabled={isLoading || !name || !email || !password}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
            
            <View style={SignupStyles.loginContainer}>
              <Text style={SignupStyles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={SignupStyles.loginLinkText}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const SignupStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 24,
    borderRadius: 75,
  },
  titleText: {
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
    backgroundColor: '#ffffff',
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
  passwordHint: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#00796b',

  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#6b7280',
    fontSize: 16,
  },
  loginLinkText: {
    color: '#00796b',
    fontWeight: '700',
    fontSize: 16,
  },
});