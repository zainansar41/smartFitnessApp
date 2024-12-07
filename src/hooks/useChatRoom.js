import { useEffect, useState } from "react";
import { onValue, push, ref } from "firebase/database";
import { db } from "../configs/firebase";

/**
 * Hook for managing a chat room between two users.
 * @param {string} currentUserId - The ID of the logged-in user.
 * @param {string} otherUserId - The ID of the user to chat with.
 * @returns {object} - Contains chat messages, loading state, and methods to send a message.
 */
export const useChatRoom = (currentUserId, otherUserId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate a deterministic chatRoomId (alphabetical order of user IDs)
  const chatRoomId =
    currentUserId < otherUserId
      ? `${currentUserId}_${otherUserId}`
      : `${otherUserId}_${currentUserId}`;

  const chatRoomRef = ref(db, `chatrooms/${chatRoomId}/messages`);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onValue(
      chatRoomRef,
      (snapshot) => {
        const data = snapshot.val();
        const chatMessages = data
          ? Object.entries(data).map(([key, value]) => ({
              id: key,
              ...value,
            }))
          : [];
        setMessages(chatMessages);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [chatRoomId]);

  const sendMessage = async (content) => {
    try {
      const message = {
        senderId: currentUserId,
        content: String(content),
        timestamp: new Date().toISOString(),
      };
      await push(chatRoomRef, message);
    } catch (err) {
      setError(err.message);
    }
  };

  return { messages, loading, error, sendMessage };
};
