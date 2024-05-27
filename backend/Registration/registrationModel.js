// Import the necessary modules
const { Pool } = require("pg");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const eurekaHelper = require('./eurekaHelper');

// Initialize Express app
const app = express();
const port = 3009;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a new Pool instance to connect to the PostgreSQL database
const pool = new Pool({
  user: "postgres",
  host: "postgres",
  database: "vehicles",
  password: "",
  port: 5432, // Default PostgreSQL port
});

// Function to get all registrations from the database
const getRegistrations = (request, response) => {
  pool.query('SELECT * FROM registration', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// Function to create a new registration in the database
const createRegistration = (request, response) => {
  const { registrationnumber, chasisnumber, identification_number, issueDate, expireDate, Status } = request.body;

  pool.query(
    "INSERT INTO registration (registrationnumber, chasisnumber, identification_number, issueDate, expireDate, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [registrationnumber, chasisnumber, identification_number, issueDate, expireDate, status],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows[0]);
    }
  );
};


const deleteRegistration = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'DELETE FROM registration WHERE registrationnumber = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Registration info deleted with ID: ${id}`);
    }
  );
};

const updateRegistration = (request, response) => {
  const id = parseInt(request.params.id);
  const {
   registrationnumber, 
   chasisnumber, 
   identification_number, 
   issueDate, 
   expireDate, 
   status
  } = request.body;

  pool.query(
    'UPDATE registration SET chasisnumber = $2, identification_number = $3, issueDate = $4, expireDate = $5,  status = $6,  WHERE registrationnumber = $1 RETURNING *',
    [
   registrationnumber, 
   chasisnumber, 
   identification_number, 
   issueDate, 
   expireDate, 
   status
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Registration info updated: ${JSON.stringify(results.rows[0])}`);
    }
  );
};


// Function to fetch registration by identification number
const getRegistrationByIdentificationNumber = (request, response) => {
  const identificationNumber = request.params.identification_number;

  pool.query(
    'SELECT * FROM registration WHERE identification_number = $1',
    [identificationNumber],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length > 0) {
        response.status(200).json(results.rows);
      } else {
        // Sending 404 when not found something is a good practice
        response.status(404).send('Registration not found');
      }
    }
  );
};





app.get('/registrations/:identificationNumber', getRegistrationByIdentificationNumber);
app.get('/registrations', getRegistrations);
app.post('/registrations', createRegistration);
app.delete('/registrations/:id', deleteRegistration);
app.put('/registrations/:id', updateRegistration);



// Base endpoint
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

// Start the server
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

eurekaHelper.registerWithEureka('REGISTRATION', 3009);


