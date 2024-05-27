const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const eurekaHelper = require('./eurekaHelper');
const { Pool } = require('pg');

// Initialize Express app
const app = express();
const port = 3007;

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

// Vehicle info database operations
const getVehicleInfo = (request, response) => {
  pool.query('SELECT * FROM vehicle_info', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


const createVehicleInfo = (request, response) => {
  const {
    chasisnumber,
    make,
    series_name,
    vehicle_category,
    driven,
    vehicle_description,
    net_power_and_engine_capacity,
    fuel_type,
    tare_and_gross_vehicle_mass,
    permissible_v_mass,
    drawing_v_mass,
    transmission,
    colour,
    transpotation_of,
    economic_sector,
    v_street_address,
    ownership,
    identification_number,
  } = request.body;

  pool.query(
    'INSERT INTO vehicle_info (chasisnumber, make, series_name, vehicle_category, driven, vehicle_description, net_power_and_engine_capacity, fuel_type, tare_and_gross_vehicle_mass, permissible_v_mass, drawing_v_mass, transmission, colour, transpotation_of, economic_sector, v_street_address, ownership, identification_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *',
    [
      chasisnumber,
      make,
      series_name,
      vehicle_category,
      driven,
      vehicle_description,
      net_power_and_engine_capacity,
      fuel_type,
      tare_and_gross_vehicle_mass,
      permissible_v_mass,
      drawing_v_mass,
      transmission,
      colour,
      transpotation_of,
      economic_sector,
      v_street_address,
      ownership,
      identification_number,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Vehicle info has been added: ${JSON.stringify(results.rows[0])}`);
    }
  );
};

const deleteVehicleInfo = (request, response) => {
  const chasisnumber = request.params.chasisnumber;

  pool.query(
    'DELETE FROM vehicle_info WHERE chasisnumber = $1',
    [chasisnumber],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Vehicle info deleted with Chasis Number: ${chasisnumber}`);
    }
  );
};

const updateVehicleInfo = (request, response) => {
  const chasisnumber = request.params.chasisnumber;
  const {
    make,
    series_name,
    vehicle_category,
    driven,
    vehicle_description,
    net_power_and_engine_capacity,
    fuel_type,
    tare_and_gross_vehicle_mass,
    permissible_v_mass,
    drawing_v_mass,
    transmission,
    colour,
    transpotation_of,
    economic_sector,
    v_street_address,
    ownership,
    identification_number,
  } = request.body;

  pool.query(
    'UPDATE vehicle_info SET make = $1, series_name = $2, vehicle_category = $3, driven = $4, vehicle_description = $5, net_power_and_engine_capacity = $6, fuel_type = $7, tare_and_gross_vehicle_mass = $8, permissible_v_mass = $9, drawing_v_mass = $10, transmission = $11, colour = $12, transpotation_of = $13, economic_sector = $14, v_street_address = $15, ownership = $16, identification_number = $17 WHERE chasisnumber = $18 RETURNING *',
    [
      make,
      series_name,
      vehicle_category,
      driven,
      vehicle_description,
      net_power_and_engine_capacity,
      fuel_type,
      tare_and_gross_vehicle_mass,
      permissible_v_mass,
      drawing_v_mass,
      transmission,
      colour,
      transpotation_of,
      economic_sector,
      v_street_address,
      ownership,
      identification_number,
      chasisnumber,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Vehicle info updated: ${JSON.stringify(results.rows[0])}`);
    }
  );
};

// Vehicle info endpoints
app.get('/vehicle-info', getVehicleInfo);
app.post('/vehicle-info', createVehicleInfo);
app.delete('/vehicle-info/:chasisnumber', deleteVehicleInfo);
app.put('/vehicle-info/:chasisnumber', updateVehicleInfo);

// Base endpoint
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

// Start the server
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

eurekaHelper.registerWithEureka('VEHICLE-INFO', 3007);

