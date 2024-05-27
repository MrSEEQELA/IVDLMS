import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';

const ApplicationForm = () => {
  const [applicantData, setApplicantData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    national_id: '',
    dob: '',
  });

  // Function to handle submission of application
  const submitApplication = async () => {
    try {
      // Check if all required fields are filled
      if (!validateForm(applicantData)) {
        return;
      }

      // Make a POST request to submit the application data
      const response = await fetch('http://localhost:8080/applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicantData),
      });

      // Check if the request was successful
      if (response.ok) {
        setSuccessMessage('Application submitted successfully');
        setPaymentRequired(true);
        setShowInputFields(false);
        fetchQuestion(); // Fetch question when application is submitted
      } else {
        console.error('Failed to submit application');
        // Handle errors, e.g., show an error message to the user
        Alert.alert('Error', 'Failed to submit application. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      // Handle network errors, e.g., show an error message to the user
      Alert.alert('Error', 'Network error. Please check your internet connection.');
    }
  };

  // Function to validate form fields
  const validateForm = (data) => {
    for (const key in data) {
      if (!data[key]) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return false;
      }
    }
    return true;
  };
  // Function to handle changes in input fields
  const handleChange = (field, value) => {
    // Update the state with the field and its value
    setApplicantData({ ...applicantData, [field]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply for Driver's License</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={applicantData.first_name}
          onChangeText={(text) => handleChange('first_name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={applicantData.last_name}
          onChangeText={(text) => handleChange('last_name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={applicantData.phone_number}
          onChangeText={(text) => handleChange('phone_number', text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={applicantData.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="National ID"
          value={applicantData.national_id}
          onChangeText={(text) => handleChange('national_id', text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Date Of Birth"
          value={applicantData.dob}
          onChangeText={(text) => handleChange('dob', text)}
          keyboardType="numeric"
        />
        
        <View style={styles.buttonContainer}>
          <Button title="Submit Application" onPress={submitApplication} />
        </View>
      </View>
    </View>
  );
};

const styles = {
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
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
};

export default ApplicationForm;

