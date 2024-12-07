import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Picker } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const [height, setHeight] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [weight, setWeight] = useState('');

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify({ height, bodyType, weight }));
      alert('Profile saved successfully!');
    } catch (error) {
      alert('Failed to save profile.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your height"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <Picker
        selectedValue={bodyType}
        style={styles.picker}
        onValueChange={(itemValue) => setBodyType(itemValue)}
      >
        <Picker.Item label="Select body type" value="" />
        <Picker.Item label="Ectomorph" value="ectomorph" />
        <Picker.Item label="Mesomorph" value="mesomorph" />
        <Picker.Item label="Endomorph" value="endomorph" />
      </Picker>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
    color: '#00796b',
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
  picker: {
    width: '100%',
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
});