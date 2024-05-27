import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const QuizScreen = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('http://localhost:8080/quizzes');
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleQuizPress = (quizId) => {
    navigation.navigate('QuestionScreen', { quizId: quizId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={quizzes}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.quizItem} onPress={() => handleQuizPress(item.id)}>
            <Text style={styles.quizTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  quizItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.25, // for iOS shadow
    shadowRadius: 3.84, // for iOS shadow
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizScreen;

