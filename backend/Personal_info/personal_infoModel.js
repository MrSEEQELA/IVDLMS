const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const eurekaHelper = require('./eurekaHelper');
const { Pool } = require('pg');

// Initialize Express app
const app = express();
const port = 3008;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'vehicles',
  password: '', // Add your PostgreSQL password here
  port: 5432,
});

// Personal info database operations
const getPersonalInfo = (request, response) => {
  pool.query('SELECT * FROM personal_info', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getPersonByID = (request, response) => {
  const identification_number = request.params.id;
  
  console.log("id: " + identification_number)

  if (!identification_number) {
    response.status(400).json({ error: 'Identification number is required' });
    return;
  }

  const sql = 'SELECT password, identification_number FROM personal_info WHERE identification_number = $1';
  const values = [identification_number];

  pool.query(sql, values, (error, results) => {
    if (error) {
      response.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.rows.length === 0) {
      response.status(404).json({ error: 'Personal info not found' });
      return;
    }

    const storedPersonalInfo = results.rows[0];
    response.status(200).json({ storedPersonalInfo });
  });
};

const getPassword = (request, response) => {
  const identification_number = request.query.identification_number;

  if (!identification_number) {
    response.status(400).json({ error: 'Identification number is required' });
    return;
  }

  const sql = 'SELECT password FROM personal_info WHERE identification_number = $1';
  const values = [identification_number];

  pool.query(sql, values, (error, results) => {
    if (error) {
      response.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.rows.length === 0) {
      response.status(404).json({ error: 'Personal info not found' });
      return;
    }

    const storedPassword = results.rows[0].password;
    response.status(200).json({ storedPassword });
  });
};



const createPersonalInfo = (request, response) => {
  const {
    IdentificationType,
    IdentificationNumber,
    Name,
    Surname,
    Address,
    Contacts,
    Email,
    Password,
    D_O_B
  } = request.body;

  pool.query(
    'INSERT INTO personal_info (identification_type, identification_number, name, surname, address, contacts, email, password, d_o_b) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [
      IdentificationType,
      IdentificationNumber,
      Name,
      Surname,
      Address,
      Contacts,
      Email,
      Password,
      D_O_B
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Personal info has been added: ${JSON.stringify(results.rows[0])}`);
    }
  );
};

const deletePersonalInfo = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'DELETE FROM personal_info WHERE identification_number = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Personal info deleted with ID: ${id}`);
    }
  );
};

const updatePersonalInfo = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    IdentificationType,
    Name,
    Surname,
    Address,
    Contacts,
    Email,
    Password,
    D_O_B
  } = request.body;

  pool.query(
    'UPDATE personal_info SET identification_type = $1, name = $3, surname = $4, address = $5, contacts = $6, email = $7, password = $8, d_o_b = $9 WHERE identification_number = $2 RETURNING *',
    [
      IdentificationType,
      id,
      Name,
      Surname,
      Address,
      Contacts,
      Email,
      Password,
      D_O_B
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Personal info updated: ${JSON.stringify(results.rows[0])}`);
    }
  );
};

// Personal info endpoints
app.get('/personal-info/:id', getPersonByID);
app.get('/personal-info/get-password', getPassword);
app.get('/personal-info', getPersonalInfo);
app.post('/personal-info', createPersonalInfo);
app.delete('/personal-info/:id', deletePersonalInfo);
app.put('/personal-info/:id', updatePersonalInfo);

// Base endpoint
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

// Start the server
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

eurekaHelper.registerWithEureka('PERSONAL-INFO', 3008);

