const Pool = require('pg').Pool;
const express = require('express');
const bodyParser = require('body-parser');
const eurekaHelper = require('./eurekaHelper');
const cors = require('cors');

const app = express();
const port = 3010;

const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'drivers',
  password: '',
  port: 5432,
});


app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const getApplicants = (request, response) => {
  pool.query('SELECT * FROM applicant ORDER BY national_id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getApplicantById = (request, response) => {
  const nationalId = request.params.id;
  
  console.log("National ID: " + nationalId);

  if (!nationalId) {
    response.status(400).json({ error: 'National ID is required' });
    return;
  }

  const sql = 'SELECT first_name, last_name, national_id FROM applicant WHERE national_id = $1';
  const values = [nationalId];

  pool.query(sql, values, (error, results) => {
    if (error) {
      response.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.rows.length === 0) {
      response.status(404).json({ error: 'Applicant not found' });
      return;
    }

    const applicantDetails = results.rows[0];
    response.status(200).json({ applicantDetails });
  });
};


const createApplicant = (request, response) => {
  const { first_name, last_name, phone_number, email, national_id, dob } = request.body;

  pool.query(
    'INSERT INTO applicant (first_name, last_name, phone_number, email, national_id, dob) VALUES ($1, $2, $3, $4, $5, $6)',
    [first_name, last_name, phone_number, email, national_id, dob],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Applicant added with ID: ${results.insertId}`);
    }
  );
};

const updateApplicant = (request, response) => {
  const id = parseInt(request.params.id);
  const { first_name, last_name, phone_number, email, national_id, dob } = request.body;

  pool.query(
    'UPDATE applicant SET first_name = $1, last_name = $2, phone_number = $3, email = $4, dob =$5 WHERE national_id = $6',
    [first_name, last_name, phone_number, email, national_id, dob],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Applicant modified with ID: ${id}`);
    }
  );
};

const deleteApplicant = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM applicant WHERE national_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Applicant deleted with ID: ${id}`);
  });
};

app.get('/applicants', getApplicants);
app.get('/applicants/:id', getApplicantById);
app.post('/applicants', createApplicant);
app.put('/applicants/:id', updateApplicant);
app.delete('/applicants/:id', deleteApplicant);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});


eurekaHelper.registerWithEureka('DRIVER-INFO', 3010);

