const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'drivers',
  password: '38745', // Add your PostgreSQL password here
  port: 5432,
});

const getPayments = (request, response) => {
  pool.query('SELECT * FROM Payment ORDER BY payment_id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getPaymentById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM Payment WHERE payment_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createPayment = (request, response) => {
  const { applicant_id, transaction_id, amount, payment_date } = request.body;

  pool.query(
    'INSERT INTO Payment (applicant_id, transaction_id, amount, payment_date) VALUES ($1, $2, $3, $4)',
    [applicant_id, transaction_id, amount, payment_date],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Payment added with ID: ${results.insertId}`);
    }
  );
};

const updatePayment = (request, response) => {
  const id = parseInt(request.params.id);
  const { applicant_id, transaction_id, amount, payment_date } = request.body;

  pool.query(
    'UPDATE Payment SET applicant_id = $1, transaction_id = $2, amount = $3, payment_date = $4 WHERE payment_id = $5',
    [applicant_id, transaction_id, amount, payment_date, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Payment modified with ID: ${id}`);
    }
  );
};

const deletePayment = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM Payment WHERE payment_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Payment deleted with ID: ${id}`);
  });
};

module.exports = {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};

