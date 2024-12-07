import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
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
    <View style={{ flex: 1 }}>
      {/* <Text style={styles.title}>Profile</Text> */}
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
          <IconButton
            icon="camera"
            size={24}
            style={styles.updateImageButton}
            onPress={() => alert('Update Image')}
          />
        </View>
        <Text style={styles.userName}>John Doe</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your height"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholderTextColor="#aaa"
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
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={handleSave} style={styles.button}>
          <Text style={{alignSelf:"center",justifyContent:"center",textAlign:"center",color:"white",fontSize:20-2}}>Save</Text>
        </TouchableOpacity>
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
    textAlign: "center",
    color:"white"
  },
  profileHeader: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#000',
  },
  updateImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color:"white"
  },
  input: {
    width: "100%",
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: '#333',
  },
  dropdown: {
    width: "100%",
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdownText: {
    color: "white",
  },
  dropdownList: {
    width: "100%",
    maxHeight: 150,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    color:"white",
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
  },
  button: {
    height:"8%",
    width: "100%",
    padding: 16,
    borderRadius: 8,
    backgroundColor:"brown"
  },
});