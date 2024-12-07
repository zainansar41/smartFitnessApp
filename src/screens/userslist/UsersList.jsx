import React, { useEffect, useState } from "react";
import { FlatList, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUsersList } from "../../hooks/useUsersList";

export default function UsersListScreen({ navigation }) {
  const { users, loading, error } = useUsersList();
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userJSON = await AsyncStorage.getItem("@user");
        const user = userJSON ? JSON.parse(userJSON) : null;
        console.log("Current User:", user); // Log current user data
        setCurrentUserId(user?.uid || null);
      } catch (e) {
        console.error("Error fetching current user from AsyncStorage:", e);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (users.length) {
      console.log("Users from Database:", users); // Log all users fetched from the database
    }
  }, [users]);

  const handleUserPress = (userId) => {
    // Navigate to ChatRoom screen, passing the selected user's ID
    navigation.navigate("ChatRoom", { otherUserId: userId });
  };

  if (loading || currentUserId === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Users List
      </Text>

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <FlatList
        data={users.filter((user) => user.id !== currentUserId)} // Exclude current user
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#CCC",
            }}
            onPress={() => handleUserPress(item.uid)}
          >
            <Text style={{ fontSize: 16 }}>{item.displayName}</Text>
            <Text>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
