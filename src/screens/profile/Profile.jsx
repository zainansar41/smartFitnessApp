import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function Profile() {
  return (
    <View style={styles.container}>//192.168.10.1
      <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
