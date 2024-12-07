import { createStackNavigator } from "@react-navigation/stack";
import UsersList from "../userslist/UsersList";
import ChatRoom from "../chatroom/ChatRoom";

const Stack = createStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
      <Stack.Screen name="UsersList" component={UsersList} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
}
