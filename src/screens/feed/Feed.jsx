import { useState } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { useRealtimeDB } from "../../hooks/useRealtimeDB";

export default function Feed() {
  const [newItem, setNewItem] = useState("");
  const { data, loading, error, createData, deleteData } =
    useRealtimeDB("todos");

  const handleAddItem = () => {
    if (newItem.trim()) {
      createData({ title: newItem, completed: false });
      setNewItem("");
    }
  };

  const handleDeleteItem = (key) => {
    deleteData(key);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Test playground for realtime db hook.
      </Text>
      <TextInput
        mode="outlined"
        placeholder="Add new item"
        value={newItem}
        onChangeText={setNewItem}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button mode="elevated" onPress={handleAddItem} disabled={loading}>
        Add Item
      </Button>

      {loading && (
        <ActivityIndicator
          style={{
            padding: 24,
          }}
        />
      )}
      {error && <Text style={{ color: "red" }}>{error}</Text>}

      {data ? (
        <FlatList
          style={{
            paddingTop: 24,
          }}
          data={Object.entries(data)}
          keyExtractor={([key]) => key}
          renderItem={({ item: [key, value] }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}
            >
              <Text>{value.title}</Text>
              <Button onPress={() => handleDeleteItem(key)}>Delete</Button>
            </View>
          )}
        />
      ) : (
        <Text
          style={{
            textAlign: "center",
            padding: 24,
          }}
        >
          No items found
        </Text>
      )}
    </View>
  );
}
