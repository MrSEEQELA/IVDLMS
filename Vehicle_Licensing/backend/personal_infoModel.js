const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "vehicles",
  password: "",
  port: 5432,
});

// Get personal info from the database
const getPersonalInfo = async (query) => {
  try {
    return await new Promise(function (resolve, reject) {
      // Define the SQL query to fetch personal info
      let sql = "SELECT * FROM personal_info";

      // If a search query is provided, add a WHERE clause to filter results
      if (query) {
        sql += ` WHERE owner_name ILIKE '%${query}%'`; // Adjust column name if needed
      }

      // Execute the SQL query
      pool.query(sql, (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

// Create personal info
const createPersonalInfo = (body) => {
  return new Promise(function (resolve, reject) {
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
    } = body;

    pool.query(
      "INSERT INTO personal_info (owner_identification_type, owner_identification_number, owner_name, owner_surname, owner_address, owner_contacts, owner_email, proxy_identification_number, representation_identification_number, vehicle_identification_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
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
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows && results.rows.length > 0) {
          resolve(
            `Personal info has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

// Delete personal info
const deletePersonalInfo = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM personal_info WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Personal info deleted with ID: ${id}`);
      }
    );
  });
};

// Update personal info record
const updatePersonalInfo = (id, body) => {
  return new Promise(function (resolve, reject) {
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
    } = body;
    
    pool.query(
      "UPDATE personal_info SET owner_identification_type = $1, owner_identification_number = $2, owner_name = $3, owner_surname = $4, owner_address = $5, owner_contacts = $6, owner_email = $7, proxy_identification_number = $8, representation_identification_number = $9, vehicle_identification_number = $10 WHERE id = $11 RETURNING *",
      [
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
        id,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Personal info updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

module.exports = {
  getPersonalInfo,
  createPersonalInfo,
  deletePersonalInfo,
  updatePersonalInfo,
};

