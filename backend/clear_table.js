const pool = require("./config/db");

async function clearTable() {
  try {
    await pool.query("TRUNCATE TABLE villages RESTART IDENTITY");

    console.log("Villages table cleared!");

  } catch (error) {
    console.error(error);
  }
}

clearTable();