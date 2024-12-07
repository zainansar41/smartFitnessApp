import React, { useState } from "react";
import { FlatList, TextInput, View, Button, Text } from "react-native";
import { useChatRoom } from "../../hooks/useChatRoom";
import { getAuth } from "firebase/auth";

export default function ChatRoom({ route }) {
  const { otherUserId } = route.params;
  const [text, setText] = useState("");

  // Get the current user's ID from Firebase Auth
  const currentUserId = getAuth()?.currentUser?.uid;

  const { messages, loading, error, sendMessage } = useChatRoom(
    currentUserId,
    otherUserId
  );

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(text.trim());
      setText("");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Chat Room
      </Text>

      {loading && <Text>Loading messages...</Text>}
      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              marginVertical: 5,
              alignSelf:
                item.senderId === currentUserId ? "flex-end" : "flex-start",
              backgroundColor:
                item.senderId === currentUserId ? "#DCF8C6" : "#ECECEC",
              padding: 10,
              borderRadius: 10,
              maxWidth: "75%",
            }}
          >
            <Text>{item.content}</Text>
            <Text style={{ fontSize: 10, color: "#888" }}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )}
      />

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#CCC",
            borderRadius: 5,
            padding: 10,
          }}
        />
        <Button title="Send" onPress={handleSend} disabled={!text.trim()} />
      </View>
    </View>
  );
}
