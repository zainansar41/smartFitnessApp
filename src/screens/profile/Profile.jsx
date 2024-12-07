import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const [height, setHeight] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [weight, setWeight] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const bodyTypes = ["Lean", "Bulky", "Medium"];

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem(
        "userProfile",
        JSON.stringify({ height, bodyType, weight })
      );
      alert("Profile saved successfully!");
    } catch (error) {
      alert("Failed to save profile.");
    }
  };

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setBodyType(item);
        setDropdownVisible(false);
      }}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex:1}}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter your height"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownText}>
            {bodyType ? bodyType : "Select body type"}
          </Text>
        </TouchableOpacity>
        {dropdownVisible && (
          <FlatList
            data={bodyTypes}
            renderItem={renderDropdownItem}
            keyExtractor={(item) => item}
            style={styles.dropdownList}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter your weight"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Save
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginTop: 32,
    marginBottom: 32,
    color: "#fff",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#00796b",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  dropdown: {
    width: "100%",
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#00796b",
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  dropdownText: {
    color: "#000",
  },
  dropdownList: {
    width: "100%",
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "#00796b",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    marginBottom: 16,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#00796b",
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
  },
});
