const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'drivers',
  password: '38745', // Add your PostgreSQL password here
  port: 5432,
});

const getDrivingTests = (request, response) => {
  pool.query('SELECT * FROM DrivingTest ORDER BY test_id ASC', (error, results) => {
    if (error) {
      console.error('Error getting driving tests:', error);
      response.status(500).json({ error: 'Internal server error' });
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const getDrivingTestById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM DrivingTest WHERE test_id = $1', [id], (error, results) => {
    if (error) {
      console.error('Error getting driving test by ID:', error);
      response.status(500).json({ error: 'Internal server error' });
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const createDrivingTest = (request, response) => {
  const { test_date } = request.body;

  pool.query(
    'INSERT INTO DrivingTest (test_date) VALUES ($1) RETURNING *',
    [test_date],
    (error, results) => {
      if (error) {
        console.error('Error inserting driving test:', error);
        response.status(500).json({ error: 'Failed to insert driving test' });
      } else {
        response.status(201).json(results.rows[0]);
      }
    }
  );
};

const updateDrivingTest = (request, response) => {
  const id = parseInt(request.params.id);
  const { applicant_id, test_date, result } = request.body;

  pool.query(
    'UPDATE DrivingTest SET applicant_id = $1, test_date = $2, result = $3 WHERE test_id = $4',
    [applicant_id, test_date, result, id],
    (error, results) => {
      if (error) {
        console.error('Error updating driving test:', error);
        response.status(500).json({ error: 'Failed to update driving test' });
      } else {
        response.status(200).send(`Driving Test modified with ID: ${id}`);
      }
    }
  );
};

const deleteDrivingTest = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM DrivingTest WHERE test_id = $1', [id], (error, results) => {
    if (error) {
      console.error('Error deleting driving test:', error);
      response.status(500).json({ error: 'Failed to delete driving test' });
    } else {
      response.status(200).send(`Driving Test deleted with ID: ${id}`);
    }
  });
};

module.exports = {
  getDrivingTests,
  getDrivingTestById,
  createDrivingTest,
  updateDrivingTest,
  deleteDrivingTest,
};

