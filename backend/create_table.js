const pool = require("./config/db");

async function createTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS villages (
        id SERIAL PRIMARY KEY,
        mdds_stc INTEGER,
        state_name TEXT,
        mdds_dtc INTEGER,
        district_name TEXT,
        mdds_sub_dt INTEGER,
        sub_district_name TEXT,
        mdds_plcn BIGINT,
        area_name TEXT,
        source_file TEXT
      );
    `);

    console.log("Villages table created successfully!");

  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createTable();