import React, { useState } from 'react';
import { View, Text, Button, Alert, TextInput, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ApplicationLicenseScreen = () => {
  const navigation = useNavigation();
  const [nationalId, setNationalId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToQuizScreen = () => {
    navigation.navigate('QuizScreen');
  };

  const navigateToApplication = () => {
    navigation.navigate('ApplicationForm');
  };

  const handleDrivingTest = async () => {
    try {
      setModalVisible(true);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const handleModalSubmit = async () => {
    try {
      setModalVisible(false);
      const score = await fetchScore(nationalId);
      if (score !== null) {
        Alert.alert('Score', `Your driving test score is: ${score}`);
      } else {
        Alert.alert('Error', 'Failed to fetch driving test score.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const fetchScore = async (nationalId) => {
    try {
      const response = await fetch(`http://localhost:8080/quizzes/practicalscore?applicant_national_id=${nationalId}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          return data[0].score; // Assuming only one score entry per applicant
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching score:', error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DRIVING LICENCE</Text>
      <View style={styles.buttonContainer}>
        <Button title="Apply for Drivers License" onPress={navigateToApplication} />
        <Button title="Take Quiz" onPress={navigateToQuizScreen} />
        <Button title="Driving Test" onPress={handleDrivingTest} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter National ID:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNationalId}
              value={nationalId}
              keyboardType="numeric"
            />
            <View style={styles.buttonRow}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Submit" onPress={handleModalSubmit} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default ApplicationLicenseScreen;

