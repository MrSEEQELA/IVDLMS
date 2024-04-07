const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
const personal_infoModel = require("./personal_infoModel"); // Updated import statement

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:19006");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", (req, res) => {
  personal_infoModel // Updated model function call
    .getPersonalInfo()
    .then((personalInfo) => {
      // Extract the search query from request query parameters
      const query = req.query.q;

      // If there's a search query, filter personal info based on it
      if (query) {
        personalInfo = personalInfo.filter((info) =>
          info.owner_name.toLowerCase().includes(query.toLowerCase())
        );
      }

      res.status(200).send(personalInfo);
    })
    .catch((error) => {
      console.error("Error fetching personal info:", error);
      res.status(500).send(error);
    });
});


app.post("/personal_info", (req, res) => { // Updated endpoint route
  personal_infoModel // Updated model function call
    .createPersonalInfo(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/personal_info/:id", (req, res) => { // Updated endpoint route
  personal_infoModel // Updated model function call
    .deletePersonalInfo(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/personal_info/:id", (req, res) => { // Updated endpoint route
  const id = req.params.id;
  const body = req.body;
  personal_infoModel // Updated model function call
    .updatePersonalInfo(id, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

