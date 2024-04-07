const Pool = require('pg').Pool;
const express = require('express');
const app = express();
const port = 5000;

const personalInfoModel = require('./personal_info_model');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vehicles',
  password: '', // Add your password here
  port: 5432,
});

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  personalInfoModel.getPersonalInfo(pool)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.post('/personal_info', (req, res) => {
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
    vehicleIdentificationNumber
  } = req.body;

  personalInfoModel.createPersonalInfo(pool, {
    ownerIdentificationType,
    ownerIdentificationNumber,
    ownerName,
    ownerSurname,
    ownerAddress,
    ownerContacts,
    ownerEmail,
    proxyIdentificationNumber,
    representationIdentificationNumber,
    vehicleIdentificationNumber
  })
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.delete('/personal_info/:id', (req, res) => {
  const id = req.params.id;

  personalInfoModel.deletePersonalInfo(pool, id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

