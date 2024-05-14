const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'drivers',
  password: '38745', // Add your PostgreSQL password here
  port: 5432,
});

const getApplicantInfo = (request, response) => {
  pool.query('SELECT * FROM ApplicantInfo ORDER BY applicant_id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getApplicantInfoById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM ApplicantInfo WHERE applicant_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createApplicantInfo = (request, response) => {
  const { applicant_id, date_of_birth, address, gender } = request.body;

  pool.query(
    'INSERT INTO ApplicantInfo (applicant_id, date_of_birth, address, gender) VALUES ($1, $2, $3, $4)',
    [applicant_id, date_of_birth, address, gender],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Applicant Info added with ID: ${results.insertId}`);
    }
  );
};

const updateApplicantInfo = (request, response) => {
  const id = parseInt(request.params.id);
  const { date_of_birth, address, gender } = request.body;

  pool.query(
    'UPDATE ApplicantInfo SET date_of_birth = $1, address = $2, gender = $3 WHERE applicant_id = $4',
    [date_of_birth, address, gender, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Applicant Info modified with ID: ${id}`);
    }
  );
};

const deleteApplicantInfo = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM ApplicantInfo WHERE applicant_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Applicant Info deleted with ID: ${id}`);
  });
};

module.exports = {
  getApplicantInfo,
  getApplicantInfoById,
  createApplicantInfo,
  updateApplicantInfo,
  deleteApplicantInfo,
};

