import { useState } from "react";
import { FlatList, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useFirestore } from "../../hooks/useFirestore";

export default function Home({ navigation }) {
  const [newItem, setNewItem] = useState("");
  const { data, loading, error, createData, deleteData } =
    useFirestore("todos");

  const handleAddItem = () => {
    if (newItem.trim()) {
      createData({ title: newItem, completed: false });
      setNewItem("");
    }
  };

  const handleDeleteItem = (id) => {
    deleteData(id);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{
        paddingBottom:16,
        fontSize:14,
        textAlign:'center'
      }}>
        Test Playground for Firestore CRUD hook.
      </Text>
      <TextInput
        mode="outlined"
        placeholder="Add new item"
        value={newItem}
        onChangeText={setNewItem}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button mode="elevated" onPress={handleAddItem} loading={loading}>
        Add Item
      </Button>

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      {data && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}
            >
              <Text>{item.title}</Text>
              <Button onPress={() => handleDeleteItem(item.id)}>Delete</Button>
            </View>
          )}
        />
      ) : (
        <Text style={{
          paddingVertical:24,
          textAlign:'center'
        }}>No items found</Text>
      )}
    </View>
  );
}
