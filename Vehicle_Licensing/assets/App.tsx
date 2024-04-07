import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Register from './Register'; // Import the Register component

const App = ({ navigation }) => {
  const handleVehicleRegistration = () => {
    // Add navigation logic or call any functions related to vehicle registration
    console.log('Navigate to Vehicle Registration');
    // Example navigation usage:
    // navigation.navigate('Register');
  };

  const handleRenewal = () => {
    // Add navigation logic or call any functions related to renewal
    console.log('Navigate to Renewal');
  };

  const handleChangeOfOwnership = () => {
    // Add navigation logic or call any functions related to change of ownership
    console.log('Navigate to Change Of Ownership');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleVehicleRegistration}>
        <Text style={styles.buttonText}>Vehicle Registration</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRenewal}>
        <Text style={styles.buttonText}>Renewal</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleChangeOfOwnership}>
        <Text style={styles.buttonText}>Change Of Ownership</Text>
      </TouchableOpacity>

      {/* Include Register component for vehicle registration */}
      <Register />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;

