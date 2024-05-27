import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Button, StyleSheet, Modal, TextInput } from 'react-native';

const MyVehiclesScreen = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [editableFields, setEditableFields] = useState({ colour: '', transportation_of: '' });
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:8080/registrations');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await response.json();
        setVehicles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setLoading(false);
        Alert.alert('Error', 'Failed to fetch vehicles. Please try again later.');
      }
    };

    fetchVehicles();
  }, []);

  const handleRenew = async (chasisnumber) => {
    try {
      const response = await fetch(`http://localhost:8080/vehicle-info?chasisnumber=${chasisnumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch vehicle info');
      }
      const data = await response.json();
      setSelectedVehicle(data);
      setEditableFields({ colour: data.colour, transportation_of: data.transportation_of });
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching vehicle info:', error);
      Alert.alert('Error', 'Failed to fetch vehicle info. Please try again later.');
    }
  };

  const handleDeregister = (chasisnumber) => {
    console.log('Deregister vehicle with chasis number:', chasisnumber);
  };

  const handleChangeOwnership = (chasisnumber) => {
    console.log('Change ownership for chasis number:', chasisnumber);
  };

  const handleSaveChanges = () => {
    setModalVisible(false);
    setPasswordModalVisible(true);
  };

  const handlePasswordSubmit = async () => {
    setPasswordModalVisible(false);
    try {
      const response = await fetch(`http://localhost:8080/registrations/${selectedVehicle.chasisnumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...selectedVehicle,
          ...editableFields,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to renew vehicle registration');
      }
      Alert.alert('Success', 'Vehicle registration renewed successfully');
    } catch (error) {
      console.error('Error renewing vehicle registration:', error);
      Alert.alert('Error', 'Failed to renew vehicle registration. Please try again later.');
    }
  };

  const handleChange = (field, value) => {
    setEditableFields((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={vehicles}
          renderItem={({ item, index }) => (
            <View style={styles.vehicleContainer}>
              <Text>{`Vehicle ${index + 1}`}</Text>
              <Text>Registration Number: {item.registrationnumber}</Text>
              <Text>Chasis Number: {item.chasisnumber}</Text>
              <Text>Identification Number: {item.identification_number}</Text>
              <Text>Issue Date: {item.issuedate}</Text>
              <Text>Expire Date: {item.expiredate}</Text>
              <Text>Status: {item.status}</Text>
              <View style={styles.buttonContainer}>
                <Button title="Renew" onPress={() => handleRenew(item.chasisnumber)} />
                <Button title="Deregister" onPress={() => handleDeregister(item.chasisnumber)} />
                <Button title="Change Ownership" onPress={() => handleChangeOwnership(item.chasisnumber)} />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.chasisnumber.toString()}
        />
      )}

      {selectedVehicle && (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Renew Vehicle</Text>
              <Text>Registration Number: {selectedVehicle.registrationnumber}</Text>
              <Text>Chasis Number: {selectedVehicle.chasisnumber}</Text>
              <Text>Identification Number: {selectedVehicle.identification_number}</Text>
              <Text>Issue Date: {selectedVehicle.issuedate}</Text>
              <Text>Expire Date: {selectedVehicle.expiredate}</Text>
              <Text>Status: {selectedVehicle.status}</Text>
         
              <Button title="Save Changes" onPress={handleSaveChanges} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}

      <Modal visible={passwordModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
            />
            <Button title="Submit" onPress={handlePasswordSubmit} />
            <Button title="Cancel" onPress={() => setPasswordModalVisible(false)} />
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
  },
  vehicleContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default MyVehiclesScreen;

