import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button, Alert } from 'react-native';

const QuestionScreen = ({ route, navigation }) => {
  const { quizId } = route.params;
  const [questions, setQuestions] = useState([]);
  const [nationalId, setNationalId] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [quizFinished, setQuizFinished] = useState(false);
  const [idEntered, setIdEntered] = useState(false);
  const [applicantDetails, setApplicantDetails] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (idEntered) {
      fetchQuestions();
      const timer = setTimeout(() => {
        handleTimerExpiration();
      }, timeLeft * 1000);

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [idEntered]);

const fetchQuestions = async () => {
  try {
    const response = await fetch(`http://localhost:8080/quizzes/${quizId}/questions`);
    const data = await response.json();
    const shuffledQuestions = shuffleArray(data.map((question, index) => ({ ...question, originalNumber: index + 1 })));
    const numberedQuestions = shuffledQuestions.map((question, index) => {
      const shuffledAnswers = shuffleArray(question.answers.map((answer, answerIndex) => ({
        ...answer,
        originalNumber: answerIndex + 1
      })));
      return {
        ...question,
        number: index + 1,
        answers: shuffledAnswers.map((answer, answerIndex) => ({ ...answer, number: answerIndex + 1 }))
      };
    });
    setQuestions(numberedQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};


// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


  const fetchApplicantDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/applicants/${id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.applicantDetails) {
          setApplicantDetails(data.applicantDetails);
        } else {
          Alert.alert('Error', 'Applicant details not found.');
        }
      } else {
        Alert.alert('Error', 'Failed to fetch applicant details.');
      }
    } catch (error) {
      console.error('Error fetching applicant details:', error);
      Alert.alert('Error', 'Failed to fetch applicant details.');
    }
  };

  const handleAnswerPress = (questionIndex, answerId) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question, index) => {
        if (index === questionIndex) {
          return {
            ...question,
            answers: question.answers.map((answer) => {
              if (answer.id === answerId) {
                return { ...answer, selected: true };
              } else {
                return { ...answer, selected: false };
              }
            }),
          };
        } else {
          return question;
        }
      });
    });
  };

const calculateScore = () => {
  let totalQuestions = 0;
  let correctAnswers = 0;

  questions.forEach((question) => {
    const selectedAnswer = question.answers.find((answer) => answer.selected);
    if (selectedAnswer) {
      totalQuestions++;
      if (selectedAnswer.is_correct) {
        correctAnswers++;
      }
    }
  });

  if (totalQuestions === 0) {
    return 0; // Avoid division by zero
  }

  const percentage = Math.round((correctAnswers / totalQuestions) * 100); // Round to nearest whole number
  return percentage;
};

  const submitQuizResponses = async () => {
    const score = calculateScore();
    setScore(score);
    setQuizFinished(true); // Stop the quiz and timer

    console.log(`Applicant Details:
     National ID: ${applicantDetails.national_id},
     Name: ${applicantDetails.first_name}, 
     Surname: ${applicantDetails.last_name},
     Score: ${score}`);

    try {
      const response = await fetch(`http://localhost:8080/quizzes/${quizId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          national_id: nationalId,
          quiz_id: quizId,
          responses: questions.map((question) => ({
            question_id: question.id,
            selected_answer_id: question.answers.find((answer) => answer.selected)?.id || null,
          })),
          score: parseFloat(score), // Ensure the score is a number
        }),
      });
      if (response.ok) {
        Alert.alert('Success', 'Quiz responses submitted successfully.');
      } else {
        Alert.alert('Error', 'Failed to submit quiz responses.');
      }
    } catch (error) {
      console.error('Error submitting quiz responses:', error);
      Alert.alert('Error', 'Failed to submit quiz responses. Please try again later.');
    }
  };

  const handleTimerExpiration = () => {
    submitQuizResponses();
  };

  useEffect(() => {
    if (!idEntered) {
      return; // No need to start the timer if ID is not entered
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(interval);
          handleTimerExpiration();
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [idEntered]);

  const formattedTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleStartQuiz = async () => {
    if (!nationalId || nationalId.length !== 12) {
      Alert.alert('Error', 'Please enter a 12-digit National ID.');
      return;
    }
    await fetchApplicantDetails(nationalId); // Fetch applicant details before starting the quiz
    setIdEntered(true);
  };

  if (!idEntered) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Enter Your National ID</Text>
        <TextInput
          style={styles.input}
          placeholder="National ID"
          value={nationalId}
          onChangeText={setNationalId}
          keyboardType="numeric"
        />
        <Button title="Start Quiz" onPress={handleStartQuiz} />
      </View>
    );
  }

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Quiz Completed</Text>
        <Text style={styles.headerText}>{`National ID: ${applicantDetails.national_id}`}</Text>
        <Text style={styles.headerText}>{`Name: ${applicantDetails.first_name || 'N/A'}`}</Text>
        <Text style={styles.headerText}>{`Surname: ${applicantDetails.last_name || 'N/A'}`}</Text>
        <Text style={styles.headerText}>{`Score: ${score}%`}</Text>
        <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formattedTime()}</Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>{`National ID: ${nationalId}`}</Text>
        <Text style={styles.headerText}>{`Name: ${applicantDetails.first_name || 'N/A'}`}</Text>
        <Text style={styles.headerText}>{`Surname: ${applicantDetails.last_name || 'N/A'}`}</Text>
      </View>
      <FlatList
        style={styles.flatList}
        data={questions}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{`${item.number}. ${item.question_text}`}</Text>
            <FlatList
              style={styles.answerList}
              data={item.answers}
              renderItem={({ item: answer }) => (
                <TouchableOpacity
                  style={[
                    styles.answerButton,
                    answer.selected && styles.selectedAnswerButton,
                  ]}
                  onPress={() => handleAnswerPress(item.number - 1, answer.id)}>
                  <Text style={styles.answerText}>{answer.answer_text}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(answer) => answer.id.toString()}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Submit Quiz Responses" onPress={submitQuizResponses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  flatList: {
    flex: 1,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answerList: {
    marginTop: 10,
  },
  answerButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginVertical: 5,
  },
  selectedAnswerButton: {
    backgroundColor: 'green',
  },
  answerText: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  timer: {
    alignSelf: 'flex-end',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuestionScreen;

