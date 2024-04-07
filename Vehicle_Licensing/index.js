const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vehicles',
  password: '',
  port: 5432,
});

const app = express();

app.use(bodyParser.json());

// Set Content Security Policy
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self' http://conoret.com");
  next();
});

// Route to handle storing personal info
app.post('/personal_info', async (req, res) => {
  const {
    ownerIdentificationType,
    ownerIdentificationNumber,
    ownerName,
    ownerSurname,
    ownerAddress,
    ownerContacts,
    ownerEmail,
    proxyIdentificationNumber,
    representationIdentificationNumber,
    vehicleIdentificationNumber,
  } = req.body;

  try {
    const client = await pool.connect();
    const query = `
      INSERT INTO personal_info (
        identification_type,
        identification_number,
        name,
        surname,
        address,
        contacts,
        email,
        proxy_identification_number,
        representation_identification_number,
        vehicle_identification_number
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;
    const values = [
      ownerIdentificationType,
      ownerIdentificationNumber,
      ownerName,
      ownerSurname,
      ownerAddress,
      ownerContacts,
      ownerEmail,
      proxyIdentificationNumber,
      representationIdentificationNumber,
      vehicleIdentificationNumber,
    ];
    await client.query(query, values);
    client.release();
    res.status(200).send('Personal info stored successfully');
  } catch (error) {
    console.error('Error storing personal info:', error);
    res.status(500).send('Error storing personal info');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

