//Notification of Change of Ownership form

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Picker, ScrollView } from 'react-native';
import axios from 'axios';

  

const ChangeOOScreen = ({ navigation }) => {
  const [ownerIdentificationType, setOwnerIdentificationType] = useState('');
  const [ownerIdentificationNumber, setOwnerIdentificationNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerSurname, setOwnerSurname] = useState('');
  const [ownerAddress, setOwnerAddress] = useState('');
  const [ownerContacts, setOwnerContacts] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [proxyIdentificationType, setProxyIdentificationType] = useState('');
  const [proxyIdentificationNumber, setProxyIdentificationNumber] = useState('');
  const [proxyFullName, setProxyFullName] = useState('');
  const [newownerIdentificationNumber, setNewownerIdentificationNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [newownerName, setNewownerName] = useState('');
  const [newownerSurname, setNewownerSurname] = useState('');
  const [newownerAddress, setNewownerAddress] = useState('');
  const [newownerContacts, setNewownerContacts] = useState('');
  const [newownerEmail, setNewownerEmail] = useState('');
  const [newProxyIdentificationType, setNewProxyIdentificationType] = useState('');
  const [newProxyIdentificationNumber, setNewProxyIdentificationNumber] = useState('');
  const [newProxyFullName, setNewProxyFullName] = useState('');
  
  const navigateToAttachScreen = () => {
    navigation.navigate('Attach');
  };

  const navigateToVehicleInfo = async () => {
    try {
      const response = await axios.post('http://localhost:3001/personalinfo', {
        ownerIdentificationType,
          ownerIdentificationNumber,
          ownerName,
          newownerName,
          ownerSurname,
          newownerSurname,
          ownerAddress,
          newownerAddress,
          ownerContacts,
          newownerContacts,
          ownerEmail,
          newownerEmail,
          proxyIdentificationType,
          proxyIdentificationNumber,
          newProxyIdentificationNumber,
          proxyFullName,
          newProxyFullName,
          proxyIdentificationNumber,
          newProxyIdentificationNumber,
          newownerIdentificationNumber,
          registrationNumber,
          postalAddress,
      });

      console.log(response.data);

      if (response.status === 200) {
        alert('Personal info stored successfully');
        navigation.navigate('VehicleInfo', {
          ownerIdentificationType,
          ownerIdentificationNumber,
          ownerName,
          newownerName,
          ownerSurname,
          newownerSurname,
          ownerAddress,
          newownerAddress,
          ownerContacts,
          newownerContacts,
          ownerEmail,
          newownerEmail,
          proxyIdentificationType,
          proxyIdentificationNumber,
          newProxyIdentificationNumber,
          proxyFullName,
          newProxyFullName,
          proxyIdentificationNumber,
          newProxyIdentificationNumber,
          newownerIdentificationNumber,
          registrationNumber,
          postalAddress,
        });
      } else {
        alert('Failed to store personal info');
      }
    } catch (error) {
      console.error('Error storing personal info:', error);
      alert('Error storing personal info. Please try again.');
    }
  };



  return (
  <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={true} // Add this line to show vertical scroll bar
    >
  <View style={styles.container}>
    <Text style={styles.heading}>A-1.  Particulars of Seller/Owner</Text>
    {/* Input fields for owner's particulars */}
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
    
   
    
    
        <Text style={styles.heading}>B-1.  Particulars of Buyer</Text>
    {/* Input fields for owner's particulars */}
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
      value={newownerIdentificationNumber}
      onChangeText={setNewownerIdentificationNumber}
    />
    <TextInput
      style={styles.input}
      placeholder="Name"
      value={newownerName}
      onChangeText={setNewownerName}
    />
    <TextInput
      style={styles.input}
      placeholder="Surname"
      value={newownerSurname}
      onChangeText={setOwnerSurname}
    />
    <TextInput
      style={styles.input}
      placeholder="Address"
      value={newownerAddress}
      onChangeText={setNewownerAddress}
    />
    <TextInput
      style={styles.input}
      placeholder="Contacts"
      value={newownerContacts}
      onChangeText={setNewownerContacts}
    />
    <TextInput
      style={styles.input}
      placeholder="Email"
      value={newownerEmail}
      onChangeText={setNewownerEmail}
    />
    
    {/* Input field for vehicle identification */}
    <Text style={styles.heading}>C.  Identification of Vehicle</Text>
    <TextInput
      style={styles.input}
      placeholder="Registration Number"
      value={registrationNumber}
      onChangeText={setRegistrationNumber}
    />
    
    
    {/* Input field for new address */}
    <Text style={styles.heading}>D.  New Address</Text>
    <TextInput
      style={styles.input}
      placeholder="Postal Address"
      value={postalAddress}
      onChangeText={setPostalAddress}
    />
    
    <Button title="Next" onPress={navigateToAttachScreen} />
  </View>
  </ScrollView>
);
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
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


export default ChangeOOScreen;

