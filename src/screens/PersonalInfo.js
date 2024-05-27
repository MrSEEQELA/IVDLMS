import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Picker, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const PersonalInfoScreen = () => {
  const [IdentificationType, setIdentificationType] = useState('');
  const [IdentificationNumber, setIdentificationNumber] = useState('');
  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');
  const [Address, setAddress] = useState('');
  const [Contacts, setContacts] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [D_O_B, setDOB] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const validateIdentificationNumber = (idNumber) => {
    const idNumberRegex = /^\d{12}$/;
    return idNumberRegex.test(idNumber);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!validateIdentificationNumber(IdentificationNumber)) {
      newErrors.IdentificationNumber = 'Identification Number must be exactly 12 digits.';
    }

    if (!validateEmail(Email)) {
      newErrors.Email = 'Email must be in a valid format.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const personalInfoResponse = await axios.post('http://localhost:8080/personal-info', {
        IdentificationType,
        IdentificationNumber,
        Name,
        Surname,
        Address,
        Contacts,
        Email,
        Password,
        D_O_B,
      });

      if (personalInfoResponse.status === 201) {
        console.log('Account created successfully:', personalInfoResponse.data);
        Alert.alert('Success', 'Personal info stored successfully');
        navigation.navigate('Login'); // Navigate back to the login screen
      } else {
        console.error('Failed to create account:', personalInfoResponse.data);
        Alert.alert('Error', 'Failed to store personal info. Please try again.');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      Alert.alert('Error', 'Error storing data. Please try again.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>CREATE AN ACCOUNT</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Type of Identification:</Text>
          <Picker
            selectedValue={IdentificationType}
            style={styles.picker}
            onValueChange={(itemValue) => setIdentificationType(itemValue)}
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
          value={IdentificationNumber}
          onChangeText={setIdentificationNumber}
          keyboardType="numeric"
          maxLength={12}
        />
        {errors.IdentificationNumber && <Text style={styles.errorText}>{errors.IdentificationNumber}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={Name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Surname"
          value={Surname}
          onChangeText={setSurname}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={Address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Contacts"
          value={Contacts}
          onChangeText={setContacts}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={Email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {errors.Email && <Text style={styles.errorText}>{errors.Email}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={Password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Date Of Birth"
          value={D_O_B}
          onChangeText={setDOB}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
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
    textAlign: 'center',
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default PersonalInfoScreen;

