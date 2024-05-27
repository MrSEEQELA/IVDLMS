import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const ManageDriverScreen = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [practicalResults, setPracticalResults] = useState({});
  const [activeSection, setActiveSection] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedCoordinator, setSelectedCoordinator] = useState(null); // Added coordinator state

  useEffect(() => {
    fetchQuizzes();
    fetchApplicants();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/quizzes');
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      Alert.alert('Error', 'Failed to fetch quizzes. Please try again.');
    }
  };

  const fetchApplicants = async () => {
    try {
      const response = await axios.get('http://localhost:8080/applicants');
      setApplicants(response.data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      Alert.alert('Error', 'Failed to fetch applicants. Please try again.');
    }
  };

  const handleAddQuestion = async () => {
    if (!selectedQuiz || !question || !option1 || !option2 || !option3 || !option4 || !correctAnswer) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:8080/quizzes/${selectedQuiz.id}/questions`, {
        question_text: question,
        answers: [
          { answer_text: option1, is_correct: correctAnswer === 'A' },
          { answer_text: option2, is_correct: correctAnswer === 'B' },
          { answer_text: option3, is_correct: correctAnswer === 'C' },
          { answer_text: option4, is_correct: correctAnswer === 'D' },
        ],
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Question added successfully.');
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setCorrectAnswer('');
      } else {
        Alert.alert('Error', 'Failed to add question. Please try again.');
      }
    } catch (error) {
      console.error('Error adding question:', error);
      Alert.alert('Error', 'Failed to add question. Please try again.');
    }

    setLoading(false);
  };

  const handleCreateQuiz = async () => {
    if (!quizTitle || !quizDescription) {
      Alert.alert('Error', 'Please enter a quiz title and description.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/quizzes', {
        title: quizTitle,
        description: quizDescription,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Quiz created successfully.');
        setQuizTitle('');
        setQuizDescription('');
        fetchQuizzes(); // Refresh the quizzes list after creating a new quiz
      } else {
        Alert.alert('Error', 'Failed to create quiz. Please try again.');
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      Alert.alert('Error', 'Failed to create quiz. Please try again.');
    }

    setLoading(false);
  };

const handleRecordPracticalTest = async () => {
  if (!selectedApplicant || !selectedCoordinator || !practicalResults[selectedApplicant.national_id]) {
    Alert.alert('Error', 'Please fill in all fields.');
    return;
  }

  // Calculate the total score based on the ratings for each metric
  const totalScore = Object.values(practicalResults[selectedApplicant.national_id]).reduce((acc, rating) => acc + rating, 0);
  // Calculate the average score as a percentage to the nearest whole number
  const score = Math.round((totalScore / Object.keys(practicalResults[selectedApplicant.national_id]).length) * 10);

  setLoading(true);

  try {
    const response = await axios.post('http://localhost:8080/quizzes/practicalscore', {
      applicant_national_id: selectedApplicant.national_id,
      employment_id: selectedCoordinator.employment_id,
      score: score, // Store the calculated score in the database
    });

    if (response.status === 201) {
      Alert.alert('Success', 'Practical test result recorded successfully.');
      // Clear form after successful submission
      setSelectedApplicant(null);
      setPracticalResults({});
    } else {
      Alert.alert('Error', 'Failed to record practical test result. Please try again.');
    }
  } catch (error) {
    console.error('Error recording practical test result:', error);
    Alert.alert('Error', 'Failed to record practical test result. Please try again.');
  }

  setLoading(false);
};


  const renderQuizSection = () => (
    <>
      <Text style={styles.title}>Create Quiz:</Text>
      <TextInput
        style={styles.input}
        placeholder="Quiz Title"
        value={quizTitle}
        onChangeText={setQuizTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Quiz Description"
        value={quizDescription}
        onChangeText={setQuizDescription}
      />
      <Button title="Create Quiz" onPress={handleCreateQuiz} disabled={loading} />

      <Text style={styles.title}>Select Quiz:</Text>
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.quizItem,
              selectedQuiz && selectedQuiz.id === item.id && styles.selectedQuizItem,
            ]}
            onPress={() => setSelectedQuiz(item)}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedQuiz && (
        <View style={styles.form}>
          <Text style={styles.title}>Add Question:</Text>
          <TextInput
            style={styles.input}
            placeholder="Question"
            value={question}
            onChangeText={setQuestion}
          />
          <TextInput
            style={styles.input}
            placeholder="Option 1"
            value={option1}
            onChangeText={setOption1}
          />
          <TextInput
            style={styles.input}
            placeholder="Option 2"
            value={option2}
            onChangeText={setOption2}
          />
          <TextInput
            style={styles.input}
            placeholder="Option 3"
            value={option3}
            onChangeText={setOption3}
          />
          <TextInput
            style={styles.input}
            placeholder="Option 4"
            value={option4}
            onChangeText={setOption4}
          />
          <TextInput
            style={styles.input}
            placeholder="Correct Answer (e.g., A, B, C, D)"
            value={correctAnswer}
            onChangeText={setCorrectAnswer}
          />
          <Button
            title="Add Question"
            onPress={handleAddQuestion}
            disabled={loading}
          />
        </View>
      )}
    </>
  );

  const renderApplicantsSection = () => (
    <>
      <Text style={styles.title}>Applicants and Quiz Scores:</Text>
      <FlatList
        data={applicants}
        keyExtractor={(item) => item.national_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.applicantItem}>
            <Text>{item.first_name} {item.last_name} - Score: {item.quizScore}</Text>
          </View>
        )}
      />
    </>
  );

  const renderPracticalTestSection = () => {
    const metrics = [
      { id: 'speedControl', label: 'Speed Control (1-10)' },
      { id: 'laneDiscipline', label: 'Lane Discipline (1-10)' },
      { id: 'turning', label: 'Turning (1-10)' },
      { id: 'parking', label: 'Parking (1-10)' },
      { id: 'observation', label: 'Observation (1-10)' },
    ];

    return (
      <View>
        <Text style={styles.title}>Record Practical Driving Test Results:</Text>
        {selectedApplicant && (
          <View style={styles.form}>
            <Text>National ID: {selectedApplicant.national_id}</Text>
            <Text>Name: {selectedApplicant.first_name} {selectedApplicant.last_name}</Text>
            {/* Add coordinator selection */}
            <TextInput
              style={styles.input}
              placeholder="Coordinator Employment ID"
              value={selectedCoordinator ? selectedCoordinator.employment_id.toString() : ''}
              onChangeText={(text) => {
                setSelectedCoordinator({ employment_id: parseInt(text) });
              }}
            />
            {metrics.map((metric) => (
              <View key={metric.id}>
                <Text>{metric.label}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter rating (1-10)"
                  keyboardType="numeric"
                  value={
                    practicalResults[selectedApplicant.national_id] &&
                    practicalResults[selectedApplicant.national_id][metric.id] !== undefined
                      ? practicalResults[selectedApplicant.national_id][metric.id].toString()
                      : ''
                  }
                  onChangeText={(text) => {
                    const value = parseInt(text) || '';
                    setPracticalResults((prevResults) => ({
                      ...prevResults,
                      [selectedApplicant.national_id]: {
                        ...prevResults[selectedApplicant.national_id],
                        [metric.id]: value,
                      },
                    }));
                  }}
                />
              </View>
            ))}
            <Button
              title="Record Result"
              onPress={handleRecordPracticalTest}
              disabled={loading}
            />
          </View>
        )}
        <Text>Select an applicant to record practical test results.</Text>
        <FlatList
          data={applicants}
          keyExtractor={(item) => item.national_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.applicantItem,
                selectedApplicant && selectedApplicant.national_id === item.national_id && styles.selectedApplicantItem,
              ]}
              onPress={() => setSelectedApplicant(item)}
            >
              <Text>{item.national_id} - {item.first_name} {item.last_name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Button title="Quiz" onPress={() => setActiveSection('quiz')} />
        <Button title="View Applicants" onPress={() => setActiveSection('applicants')} />
        <Button title="Practical Test" onPress={() => setActiveSection('practicalTest')} />
      </View>
      <View style={styles.content}>
        {activeSection === 'quiz' && renderQuizSection()}
        {activeSection === 'applicants' && renderApplicantsSection()}
        {activeSection === 'practicalTest' && renderPracticalTestSection()}
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  quizItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedQuizItem: {
    backgroundColor: '#d3d3d3',
  },
  applicantItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedApplicantItem: {
    backgroundColor: '#d3d3d3',
  },
  form: {
    marginBottom: 20,
  },
});

export default ManageDriverScreen;

 


