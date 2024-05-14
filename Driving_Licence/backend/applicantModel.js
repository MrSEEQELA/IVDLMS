const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'drivers',
  password: '38745',
  port: 5432,
});

const getApplicants = (request, response) => {
  pool.query('SELECT * FROM Applicant ORDER BY applicant_id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getApplicantById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM Applicant WHERE applicant_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createApplicant = (request, response) => {
  const { first_name, last_name, phone_number, email, national_id } = request.body;

  pool.query(
    'INSERT INTO Applicant (first_name, last_name, phone_number, email, national_id) VALUES ($1, $2, $3, $4, $5)',
    [first_name, last_name, phone_number, email, national_id],
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
  const { first_name, last_name, phone_number, email, national_id } = request.body;

  pool.query(
    'UPDATE Applicant SET first_name = $1, last_name = $2, phone_number = $3, email = $4, national_id = $5 WHERE applicant_id = $6',
    [first_name, last_name, phone_number, email, national_id, id],
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

  pool.query('DELETE FROM Applicant WHERE applicant_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Applicant deleted with ID: ${id}`);
  });
};

module.exports = {
  getApplicants,
  getApplicantById,
  createApplicant,
  updateApplicant,
  deleteApplicant,
};

