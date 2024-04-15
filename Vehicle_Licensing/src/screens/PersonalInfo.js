import React, { useState } from 'react';
import VehicleInfo from './VehicleInfo'; // Correct casing
import { View, TextInput, Button, Text, StyleSheet, Picker } from 'react-native';
import axios from 'axios';

const PersonalInfoScreen = ({ navigation }) => {
  const [ownerIdentificationType, setOwnerIdentificationType] = useState('');
  const [ownerIdentificationNumber, setOwnerIdentificationNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerSurname, setOwnerSurname] = useState('');
  const [ownerAddress, setOwnerAddress] = useState('');
  const [ownerContacts, setOwnerContacts] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [proxyIdentificationNumber, setProxyIdentificationNumber] = useState('');
  const [representationIdentificationNumber, setRepresentationIdentificationNumber] = useState('');
  const [vehicleIdentificationNumber, setVehicleIdentificationNumber] = useState('');

const navigateToVehicleInfo = async () => {
  try {
    const response = await axios.post('http://localhost:3001/personal_info', {
      ownerIdentificationType,
      ownerIdentificationNumber,
      ownerName,
      ownerSurname,
      ownerAddress,
      ownerContacts,
      ownerEmail,
      proxyIdentificationNumber,
      representationIdentificationNumber,
      vehicleIdentificationNumber,
    });
    console.log(response.data); // Assuming the response contains a success message

    // Check if response indicates success (you may need to adjust this condition based on your server response)
    if (response.status === 200) {
      // Assuming the server response contains a success message
      alert('Personal info stored successfully'); // Display a success message
      // Navigate to the VehicleInfo screen
      navigation.navigate('VehicleInfo', {
        ownerIdentificationType,
        ownerIdentificationNumber,
        ownerName,
        ownerSurname,
        ownerAddress,
        ownerContacts,
        ownerEmail,
        proxyIdentificationNumber,
        representationIdentificationNumber,
        vehicleIdentificationNumber,
      });
    } else {
      // Handle other status codes or error conditions
      alert('Failed to store personal info'); // Display an error message
    }
  } catch (error) {
    console.error('Error storing personal info:', error);
    // Handle error here
    alert('Error storing personal info. Please try again.'); // Display an error message
  }
};



  return (
    <View style={styles.container}>
      <Text style={styles.heading}>A. Particulars of Owner</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Type of Identification:</Text>
        <Picker
          selectedValue={ownerIdentificationType}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setOwnerIdentificationType(itemValue)}
        >
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="Traffic Registration No." value="Traffic Registration No." />
          <Picker.Item label="Lesotho ID Doc" value="Lesotho ID Doc" />
          <Picker.Item label="Business Registration No." value="Business Registration No." />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Identification Number"
        value={ownerIdentificationNumber}
        onChangeText={setOwnerIdentificationNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={ownerName}
        onChangeText={setOwnerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={ownerSurname}
        onChangeText={setOwnerSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={ownerAddress}
        onChangeText={setOwnerAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Contacts"
        value={ownerContacts}
        onChangeText={setOwnerContacts}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={ownerEmail}
        onChangeText={setOwnerEmail}
      />
      <Text style={styles.heading}>B. Organisation's Proxy</Text>
      <TextInput
        style={styles.input}
        placeholder="Identification Number"
        value={proxyIdentificationNumber}
        onChangeText={setProxyIdentificationNumber}
      />
      <Text style={styles.heading}>C. Organisation's Representation</Text>
      <TextInput
        style={styles.input}
        placeholder="Identification Number"
        value={representationIdentificationNumber}
        onChangeText={setRepresentationIdentificationNumber}
      />
      <Text style={styles.heading}>E. Particulars Of Vehicle</Text>
      <TextInput
        style={styles.input}
        placeholder="Identification Number"
        value={vehicleIdentificationNumber}
        onChangeText={setVehicleIdentificationNumber}
      />
      <Button title="Next" onPress={navigateToVehicleInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default PersonalInfoScreen;

