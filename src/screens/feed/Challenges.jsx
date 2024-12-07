import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Button, Modal, Portal, Provider, Checkbox } from 'react-native-paper';

const mockData = [
  {
    id: '1',
    createdBy: 'John Doe',
    dueDate: '2023-12-31',
    goal: 'Walk 10,000 steps daily',
    participants: ['Alice', 'Bob', 'Charlie'],
  },
  {
    id: '2',
    createdBy: 'Jane Smith',
    dueDate: '2023-11-30',
    goal: 'Run 5km daily',
    participants: ['David', 'Eve', 'Frank'],
  },
];

const allParticipants = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank'];

export default function Challenges() {
  const [challenges, setChallenges] = useState(mockData);
  const [filteredChallenges, setFilteredChallenges] = useState(mockData);
  const [modalVisible, setModalVisible] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    id: '',
    createdBy: '',
    dueDate: '',
    goal: '',
    participants: [],
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filterParticipant, setFilterParticipant] = useState('');
  const [filterCreatedBy, setFilterCreatedBy] = useState('');

  const handleAddChallenge = () => {
    const updatedChallenges = [...challenges, { ...newChallenge, id: (challenges.length + 1).toString() }];
    setChallenges(updatedChallenges);
    setFilteredChallenges(updatedChallenges);
    setModalVisible(false);
    setNewChallenge({
      id: '',
      createdBy: '',
      dueDate: '',
      goal: '',
      participants: [],
    });
  };

  const toggleParticipant = (participant) => {
    setNewChallenge((prev) => {
      const participants = prev.participants.includes(participant)
        ? prev.participants.filter((p) => p !== participant)
        : [...prev.participants, participant];
      return { ...prev, participants };
    });
  };

  const applyFilters = () => {
    let filtered = challenges;
    if (filterParticipant) {
      filtered = filtered.filter((challenge) =>
        challenge.participants.includes(filterParticipant)
      );
    }
    if (filterCreatedBy) {
      filtered = filtered.filter((challenge) =>
        challenge.createdBy.toLowerCase().includes(filterCreatedBy.toLowerCase())
      );
    }
    setFilteredChallenges(filtered);
  };

  const renderChallenge = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.goalText}>{item.goal}</Text>
        <Text style={styles.createdByText}>Created by: {item.createdBy}</Text>
        <Text style={styles.dueDateText}>Due date: {item.dueDate}</Text>
        <Text style={styles.participantsText}>Participants:</Text>
        {item.participants.map((participant, index) => (
          <Text key={index} style={styles.participantName}>
            {participant}
          </Text>
        ))}
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => alert(`You have started the challenge: ${item.goal}`)}>
          Start
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <TextInput
            label="Filter by Participant"
            value={filterParticipant}
            onChangeText={setFilterParticipant}
            style={styles.input}
            placeholder="Enter participant name"
          />
          <TextInput
            label="Filter by Created By"
            value={filterCreatedBy}
            onChangeText={setFilterCreatedBy}
            style={styles.input}
            placeholder="Enter creator's name"
          />
          <Button mode="contained" onPress={applyFilters} style={styles.filterButton}>
            Apply Filters
          </Button>
        </View>
        <FlatList
          data={filteredChallenges}
          renderItem={renderChallenge}
          keyExtractor={(item) => item.id}
        />
        <Button mode="contained" onPress={() => setModalVisible(true)} style={styles.addButton}>
          Add Challenge
        </Button>
        <Portal>
          <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainer}>
            <TextInput
              label="Goal"
              value={newChallenge.goal}
              onChangeText={(text) => setNewChallenge({ ...newChallenge, goal: text })}
              style={styles.input}
              placeholder="Enter goal"
            />
            <TextInput
              label="Created By"
              value={newChallenge.createdBy}
              onChangeText={(text) => setNewChallenge({ ...newChallenge, createdBy: text })}
              style={styles.input}
              placeholder="Enter creator's name"
            />
            <TextInput
              label="Due Date"
              value={newChallenge.dueDate}
              onChangeText={(text) => setNewChallenge({ ...newChallenge, dueDate: text })}
              style={styles.input}
              placeholder="Enter due date"
            />
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setDropdownVisible(!dropdownVisible)}
            >
              <Text style={styles.dropdownText}>
                {newChallenge.participants.length > 0 ? newChallenge.participants.join(', ') : 'Select participants'}
              </Text>
            </TouchableOpacity>
            {dropdownVisible && (
              <ScrollView style={styles.dropdownList}>
                {allParticipants.map((participant) => (
                  <TouchableOpacity
                    key={participant}
                    style={styles.dropdownItem}
                    onPress={() => toggleParticipant(participant)}
                  >
                    <Checkbox
                      status={newChallenge.participants.includes(participant) ? 'checked' : 'unchecked'}
                    />
                    <Text>{participant}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            <Button mode="contained" onPress={handleAddChallenge} style={styles.saveButton}>
              Save
            </Button>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  goalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#00796b',
  },
  createdByText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#00796b',
  },
  dueDateText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#00796b',
  },
  participantsText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#00796b',
  },
  participantName: {
    fontSize: 14,
    color: '#00796b',
  },
  addButton: {
    marginTop: 16,
    backgroundColor: '#00796b',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
    height: 50,
    paddingLeft: 16,
    backgroundColor: '#ffffff',
  },
  dropdown: {
    width: '100%',
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#00796b',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  dropdownText: {
    color: '#000',
  },
  dropdownList: {
    width: '100%',
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#00796b',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#00796b',
  },
  saveButton: {
    backgroundColor: '#00796b',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#00796b',
  },
});