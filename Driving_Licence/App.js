import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';

const App = () => {
  const [applicantData, setApplicantData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    national_id: '',
  });
  const [paymentData, setPaymentData] = useState({
    transactionId: '',
    amountPaid: '',
    paymentDate: '',
  });
  const [showInputFields, setShowInputFields] = useState(false);
  const [paymentRequired, setPaymentRequired] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [showDrivingTestInput, setShowDrivingTestInput] = useState(false);
  const [testDate, setTestDate] = useState('');

  // Function to handle submission of application
  const submitApplication = async () => {
    try {
      // Check if all required fields are filled
      if (!validateForm(applicantData)) {
        return;
      }

      // Make a POST request to submit the application data
      const response = await fetch('http://localhost:3000/applicants', {
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

  // Function to handle submission of payment details
  const submitPayment = async () => {
    try {
      // Check if all required fields are filled
      if (!validateForm(paymentData)) {
        return;
      }

      // Make a POST request to submit the payment data
      const response = await fetch('http://localhost:3000/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      // Check if the request was successful
      if (response.ok) {
        setSuccessMessage('Payment details submitted successfully');
        setPaymentRequired(false);
        setPaymentData({
          transactionId: '',
          amountPaid: '',
          paymentDate: '',
        });
      } else {
        console.error('Failed to submit payment details');
        // Handle errors, e.g., show an error message to the user
        Alert.alert('Error', 'Failed to submit payment details. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting payment details:', error);
      // Handle network errors, e.g., show an error message to the user
      Alert.alert('Error', 'Network error. Please check your internet connection.');
    }
  };

  // Function to handle changes in input fields
  const handleChange = (field, value) => {
    // Update the state with the field and its value
    setApplicantData({ ...applicantData, [field]: value });
  };

  // Function to handle changes in payment input fields
  const handlePaymentChange = (field, value) => {
    // Update the state with the field and its value
    setPaymentData({ ...paymentData, [field]: value });
  };

  // Function to fetch a random question from the server
  const fetchQuestion = async () => {
    try {
      console.log('Fetching question...');
      const response = await fetch('http://localhost:3000/knowledge-tests');
      console.log('Response:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('Question data:', data);
        setQuestion(data.question); // Update the state with the fetched question
        setAnswer(null); // Reset answer
      } else {
        console.error('Failed to fetch question');
        Alert.alert('Error', 'Failed to fetch question. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching question:', error);
      Alert.alert('Error', 'Network error. Please check your internet connection.');
    }
  };

  // Function to handle user's answer
  const handleAnswer = async (userAnswer) => {
    try {
      // Send the user's answer to the server for evaluation
      const response = await fetch('http://localhost:3000/evaluate-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, answer: userAnswer }),
      });

      if (response.ok) {
        const data = await response.json();
        // Display whether the answer was correct or not
        Alert.alert('Answer Evaluation', data.correct ? 'Correct Answer!' : 'Incorrect Answer!');
      } else {
        console.error('Failed to evaluate answer');
        Alert.alert('Error', 'Failed to evaluate answer. Please try again later.');
      }
    } catch (error) {
      console.error('Error evaluating answer:', error);
      Alert.alert('Error', 'Network error. Please check your internet connection.');
    }
  };

  // Function to handle submission of driving test
  const submitDrivingTest = () => {
    if (!testDate) {
      Alert.alert('Error', 'Please enter the test date.');
      return;
    }
    // Perform driving test submission logic here
    console.log('Driving Test Date:', testDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Lesotho IVDLMS</Text>
      {!showInputFields && !paymentRequired && !showDrivingTestInput && (
        <View style={styles.buttonContainer}>
          <Button title="Apply for Drivers License" onPress={() => setShowInputFields(true)} />
          <View style={styles.verticalButton}>
            <Button title="Knowledge Test Questions" onPress={() => fetchQuestion()} />
            <Button title="Driving Test" onPress={() => setShowDrivingTestInput(true)} />
          </View>
        </View>
      )}
      {showInputFields && (
        <View style={styles.inputContainer}>
          <Text style={styles.paymentTitle}>APPLICANT INFORMATION</Text>
          <Text style={styles.successMessage}>{successMessage}</Text>
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
          <View style={styles.buttonContainer}>
            <Button title="Submit Application" onPress={submitApplication} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Back" onPress={() => setShowInputFields(false)} />
          </View>
        </View>
      )}
      {paymentRequired && (
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentTitle}>Payment Details</Text>
          <Text style={styles.successMessage}>{successMessage}</Text>
          <TextInput
            style={styles.input}
            placeholder="Transaction ID"
            value={paymentData.transactionId}
            onChangeText={(text) => handlePaymentChange('transactionId', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount Paid (M)"
            value={paymentData.amountPaid}
            onChangeText={(text) => handlePaymentChange('amountPaid', text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Payment Date"
            value={paymentData.paymentDate}
            onChangeText={(text) => handlePaymentChange('paymentDate', text)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Submit Payment" onPress={submitPayment} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Back" onPress={() => { setPaymentRequired(false); setShowInputFields(true) }} />
          </View>
        </View>
      )}
      {showDrivingTestInput && (
        <View style={styles.inputContainer}>
          <Text style={styles.paymentTitle}>DRIVING TEST</Text>
          <Text style={styles.successMessage}>{successMessage}</Text>
          <TextInput
            style={styles.input}
            placeholder="Test Date"
            value={testDate}
            onChangeText={setTestDate}
          />
          <View style={styles.buttonContainer}>
            <Button title="Submit Driving Test" onPress={submitDrivingTest} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Back" onPress={() => setShowDrivingTestInput(false)} />
          </View>
        </View>
      )}
      {question && (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{question}</Text>
          <View style={styles.buttonContainer}>
            <Button title="True" onPress={() => handleAnswer(true)} />
            <Button title="False" onPress={() => handleAnswer(false)} />
          </View>
          {answer !== null && (
            <Text style={styles.answer}>
              Your answer: {answer ? 'True' : 'False'}
            </Text>
          )}
        </View>
      )}
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
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
  verticalButton: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  inputContainer: {
    marginTop: 20,
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
  paymentContainer: {
    marginTop: 20,
    width: '100%',
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    marginBottom: 10,
  },
  questionContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  answer: {
    marginTop: 10,
    fontWeight: 'bold',
  },
};

export default App;

