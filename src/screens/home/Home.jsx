
import React from "react";
import { View, StyleSheet, Dimensions,ScrollView } from "react-native";
import { Text, Card, IconButton } from "react-native-paper";

const userData = [
  {
    userId: 1,
    userName: "John Doe",
    stepsTaken: 12000,
    caloriesBurned: 500,
    activeMinutes: 60
  },
  {
    userId: 2,
    userName: "Jane Smith",
    stepsTaken: 15000,
    caloriesBurned: 600,
    activeMinutes: 75
  },
  {
    userId: 3,
    userName: "Alice Johnson",
    stepsTaken: 8000,
    caloriesBurned: 300,
    activeMinutes: 45
  },
  {
    userId: 4,
    userName: "Bob Brown",
    stepsTaken: 10000,
    caloriesBurned: 400,
    activeMinutes: 50
  },
  {
    userId: 5,
    userName: "Charlie Davis",
    stepsTaken: 7000,
    caloriesBurned: 250,
    activeMinutes: 30
  }
];

const { width } = Dimensions.get('window');

export default function Home({ navigation }) {
  const renderUserCard = (item) => (
    <Card style={styles.card} elevation={4}>
      <View style={styles.cardContent}>
        <View style={styles.userHeader}>
          <Text style={styles.userName}>{item.userName}</Text>
          <IconButton 
            icon="fitness" 
            size={24} 
            style={styles.fitnessIcon}
          />
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Steps</Text>
            <Text style={styles.statValue}>{item.stepsTaken}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Calories</Text>
            <Text style={styles.statValue}>{item.caloriesBurned}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Active Min</Text>
            <Text style={styles.statValue}>{item.activeMinutes}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Fitness Tracker</Text>
        <IconButton 
          icon="chart-line" 
          size={24} 
          onPress={() => {/* Add navigation or chart view */}}
        />
      </View>
      
      <ScrollView contentContainerStyle={styles.listContainer}>
        {userData.map((item) => renderUserCard(item))}
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  fitnessIcon: {
    margin: 0,
  }
});