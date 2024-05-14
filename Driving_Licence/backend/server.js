const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./applicantModel');
const payment = require('./paymentModel');
const KnowledgeTestQuestion = require('./knowledge_test_questionsModel');
const driving = require('./drivingtestModel');
const appinfo = require('./applicantinfoModel');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

// Applicant endpoints
app.get('/applicants', db.getApplicants);
app.get('/applicants/:id', db.getApplicantById);
app.post('/applicants', db.createApplicant);
app.put('/applicants/:id', db.updateApplicant);
app.delete('/applicants/:id', db.deleteApplicant);

// Payment endpoints
app.get('/payments', payment.getPayments);
app.get('/payments/:id', payment.getPaymentById);
app.post('/payments', payment.createPayment);
app.put('/payments/:id', payment.updatePayment);
app.delete('/payments/:id', payment.deletePayment);

// Knowledge Test endpoints
app.get('/knowledge-tests', async (request, response) => {
  try {
    const questions = await KnowledgeTestQuestion.findAll();
    response.status(200).json(questions);
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});
// Define other CRUD operations for Knowledge Test using KnowledgeTestQuestion model methods

// Routes for DrivingTest table
app.get('/driving-tests', driving.getDrivingTests);
app.post('/driving-tests', driving.createDrivingTest); // Route for submitting driving tests
// Define other CRUD operations for DrivingTest

// Routes for ApplicantInfo table
app.get('/applicant-info', appinfo.getApplicantInfo);
// Define other CRUD operations for ApplicantInfo

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

