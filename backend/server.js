const express = require("express");
const cors = require("cors");
const pool = require("./db");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// HOME ROUTE
app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "Geo API Running Successfully",
  });

});


// STATES ROUTE
app.get("/api/states", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT DISTINCT state_name
      FROM villages
      ORDER BY state_name ASC
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message,
    });

  }

});


// VILLAGES ROUTE
app.get("/api/villages", async (req, res) => {

  try {

    const search = req.query.search || "";

    const result = await pool.query(
      `
      SELECT DISTINCT
        village_name,
        district_name,
        state_name,
        sub_district_name,
        source_file
      FROM villages
      WHERE village_name ILIKE $1
      LIMIT 20
      `,
      [`%${search}%`]
    );

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message,
    });

  }

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});


module.exports = app;