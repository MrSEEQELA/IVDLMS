const { Pool } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const eurekaHelper = require('./eurekaHelper');
const cors = require('cors');

const app = express();
const port = 3011;

// PostgreSQL Pool setup
const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'drivers', // Make sure this is the correct database name
  password: '', // Add your password here if needed
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
const getQuizzes = (request, response) => {
  pool.query('SELECT * FROM quizzes ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getQuizById = async (request, response) => {
  const id = parseInt(request.params.id);
  console.log('ID:', id); // Add this line for logging

  try {
    const quiz = await pool.query('SELECT * FROM quizzes WHERE id = $1', [id]);
    const questions = await pool.query('SELECT * FROM questions WHERE quiz_id = $1', [id]);
    const questionIds = questions.rows.map(q => q.id);
    
    const answers = await pool.query('SELECT * FROM answers WHERE question_id = ANY($1::int[])', [questionIds]);

    const questionsWithAnswers = questions.rows.map(question => {
      return {
        ...question,
        answers: answers.rows.filter(answer => answer.question_id === question.id)
      };
    });

    response.status(200).json({ quiz: quiz.rows[0], questions: questionsWithAnswers });
  } catch (error) {
    console.error('Error fetching quiz by ID:', error); // Add this line for error logging
    response.status(500).send('Server error');
  }
};


const createQuiz = (request, response) => {
  const { title, description } = request.body;

  pool.query(
    'INSERT INTO quizzes (title, description) VALUES ($1, $2) RETURNING *',
    [title, description],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows[0]);
    }
  );
};

const createQuestion = (request, response) => {
  const { id } = request.params;
  const { question_text, answers } = request.body;

  pool.query(
    'INSERT INTO questions (quiz_id, question_text) VALUES ($1, $2) RETURNING *',
    [id, question_text],
    async (error, results) => {
      if (error) {
        throw error;
      }
      
      const questionId = results.rows[0].id;
      const answerPromises = answers.map(answer => {
        return pool.query(
          'INSERT INTO answers (question_id, answer_text, is_correct) VALUES ($1, $2, $3) RETURNING *',
          [questionId, answer.answer_text, answer.is_correct]
        );
      });

      try {
        const answerResults = await Promise.all(answerPromises);
        response.status(201).json({
          question: results.rows[0],
          answers: answerResults.map(result => result.rows[0])
        });
      } catch (error) {
        throw error;
      }
    }
  );
};

const submitQuizResponses = async (request, response) => {
  const { national_id, quiz_id, responses, score } = request.body; // Expecting an array of { question_id, selected_answer_id }

  try {
    // Insert user responses into the database
    const insertPromises = responses.map(response => {
      return pool.query(
        'INSERT INTO user_responses (national_id, quiz_id, question_id, selected_answer_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [national_id, quiz_id, response.question_id, response.selected_answer_id]
      );
    });

    await Promise.all(insertPromises);

    // Store the score in the quiz_scores table
    await pool.query(
      'INSERT INTO quiz_scores (national_id, quiz_id, score) VALUES ($1, $2, $3)',
      [national_id, quiz_id, score]
    );

    response.status(200).json({ message: 'Quiz responses submitted and score stored successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).send('Server error');
  }
};

const getQuizScore = async (request, response) => {
  const { national_id, quiz_id } = request.params;

  try {
    // Query the database to get the total number of questions in the quiz
    const totalQuestionsQuery = 'SELECT COUNT(*) AS total_questions FROM questions WHERE quiz_id = $1';
    const totalQuestionsResult = await pool.query(totalQuestionsQuery, [quiz_id]);
    const totalQuestions = totalQuestionsResult.rows[0].total_questions;

    // Query the database to get the number of correct answers for the user and quiz
    const correctAnswersQuery = `
      SELECT COUNT(*) AS correct_count
      FROM answers
      INNER JOIN user_responses
      ON answers.question_id = user_responses.question_id
      AND answers.id = user_responses.selected_answer_id
      WHERE user_responses.quiz_id = $1
      AND user_responses.national_id = $2
      AND answers.is_correct = true;
    `;
    const correctAnswersResult = await pool.query(correctAnswersQuery, [quiz_id, national_id]);
    const correctCount = correctAnswersResult.rows[0].correct_count;

    // Calculate the percentage score
    const percentageScore = (correctCount / totalQuestions) * 100;

    response.status(200).json({ score: percentageScore });
  } catch (error) {
    console.error(error);
    response.status(500).send('Server error');
  }
};

const getQuestionsByQuizId = async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    const questions = await pool.query('SELECT * FROM questions WHERE quiz_id = $1', [id]);
    const questionIds = questions.rows.map(q => q.id);
    
    const answers = await pool.query('SELECT * FROM answers WHERE question_id = ANY($1::int[])', [questionIds]);

    const questionsWithAnswers = questions.rows.map(question => {
      return {
        ...question,
        answers: answers.rows.filter(answer => answer.question_id === question.id)
      };
    });

    response.status(200).json(questionsWithAnswers);
  } catch (error) {
    console.error(error);
    response.status(500).send('Server error');
  }
};

// Route to handle insertion of practical scores
app.post('/quizzes/practicalscore', async (req, res) => {
  const { applicant_national_id, employment_id, score } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO practicalscore (applicant_national_id, employment_id, score) VALUES ($1, $2, $3) RETURNING *',
      [applicant_national_id, employment_id, score]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting practical score:', error);
    res.status(500).send('Server error');
  }
});


// Define routes for quizzes
app.get('/quizzes', getQuizzes);
app.get('/quizzes/:id', getQuizById);
app.post('/quizzes', createQuiz);
app.post('/quizzes/:id/questions', createQuestion);
app.get('/quizzes/:id/questions', getQuestionsByQuizId);
app.post('/quizzes/:id/submit', submitQuizResponses);
app.get('/quizzes/:quiz_id/scores/:national_id', getQuizScore);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

eurekaHelper.registerWithEureka('QUIZ-INFO', port);

