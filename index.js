const express = require("express");
const cors = require("cors");
const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "mayk2003",
  database: "Hospital",
  connectionLimit: 10,
});

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

//Register new patient
app.post("/api/register", (req, res) => {
  pool.query(
    `insert into Patient (S_id, name, email, password) values (${req.body.StudentNumber}, '${req.body.Name}', '${req.body.email}', '${req.body.Password}');`,
    (err, result, fields) => {
      if (err) {
        res.status = 400;
        res.json(err);
      }
      res.status = 200;
      res.json(result);
    }
  );
});

app.post("/api/login", (req, res) => {
  pool.query(
    `select * from patient where email='${req.body.Username}' and password='${req.body.Password}' `,
    (err, result, fields) => {
      if (err) {
        res.status = 400;
        res.json(err);
      }
      res.status = 200;
      res.json(result);
    }
  );
});

console.log("Server is running on port 3001");
app.listen(3001);
