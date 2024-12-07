import React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Text, Card, IconButton } from "react-native-paper";

const userData = [
  {
    userId: 1,
    userName: "John Doe",
    stepsTaken: 12000,
    caloriesBurned: 500,
    activeMinutes: 60,
    heartRate: 75,
    bloodPressure: "120/80",
    sleepHours: 7,
    waterIntake: 2.5, // in liters
    previousHeartRates: [72, 74, 76, 78],
    previousBloodPressures: ["118/78", "119/79", "121/81", "122/82"],
  },
];

const { width } = Dimensions.get("window");

export default function Home({ navigation }) {
  const renderUserCard = (item) => (
    <Card style={styles.card} elevation={4}>
      <View style={styles.cardContent}>
        <View style={styles.userHeader}>
          <Text style={styles.userName}>{item.userName}</Text>
          <IconButton icon="fitness" size={24} style={styles.fitnessIcon} />
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
          <View style={styles.statItem}>
            <IconButton icon="heart" size={24} style={styles.statIcon} />
            <Text style={styles.statLabel}>Heart Rate</Text>
            <Text style={styles.statValue}>{item.heartRate} bpm</Text>
          </View>
          <View style={styles.statItem}>
            <IconButton icon="blood-bag" size={24} style={styles.statIcon} />
            <Text style={styles.statLabel}>Blood Pressure</Text>
            <Text style={styles.statValue}>{item.bloodPressure}</Text>
          </View>
          <View style={styles.statItem}>
            <IconButton icon="sleep" size={24} style={styles.statIcon} />
            <Text style={styles.statLabel}>Sleep Hours</Text>
            <Text style={styles.statValue}>{item.sleepHours} hrs</Text>
          </View>
          <View style={styles.statItem}>
            <IconButton icon="water" size={24} style={styles.statIcon} />
            <Text style={styles.statLabel}>Water Intake</Text>
            <Text style={styles.statValue}>{item.waterIntake} L</Text>
          </View>
        </View>
        <View style={styles.previousStatsContainer}>
          <Text style={styles.previousStatsTitle}>Previous Heart Rates:</Text>
          {item.previousHeartRates.map((rate, index) => (
            <Text key={index} style={styles.previousStatValue}>
              {rate} bpm
            </Text>
          ))}
          <Text style={styles.previousStatsTitle}>Previous Blood Pressures:</Text>
          {item.previousBloodPressures.map((bp, index) => (
            <Text key={index} style={styles.previousStatValue}>
              {bp}
            </Text>
          ))}
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.title}>Today's Goal</Text>
            <Text>Steps: 10000 | Calories: 400 | Active Min: 30</Text>
          </View>
          <View>
            <IconButton
              icon="heart"
              size={24}
              onPress={() => navigation.navigate("Profile")}
            />
            <Text>Heart Rate</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View>
            <Text style={styles.title}>Remaining Goal</Text>
            <Text>Steps: 2000 | Calories: 156 | Active Min: 14</Text>
          </View>
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 12,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  statItem: {
    alignItems: "center",
    width: "30%",
    marginBottom: 16,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  fitnessIcon: {
    margin: 0,
  },
  statIcon: {
    margin: 0,
  },
  previousStatsContainer: {
    marginTop: 16,
  },
  previousStatsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  previousStatValue: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});