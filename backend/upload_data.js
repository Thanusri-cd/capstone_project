const fs = require("fs");
const csv = require("csv-parser");
const pool = require("./config/db");

const BATCH_SIZE = 1000;
const rows = [];

fs.createReadStream("../data/final_villages.csv")
  .pipe(csv())
  .on("data", (data) => {
    rows.push(data);
  })
  .on("end", async () => {
    console.log(`Total rows loaded: ${rows.length}`);

    try {
      for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        const batch = rows.slice(i, i + BATCH_SIZE);

        const values = [];
        const placeholders = [];

        batch.forEach((row, index) => {
          const baseIndex = index * 9;

          placeholders.push(`
            ($${baseIndex + 1},
             $${baseIndex + 2},
             $${baseIndex + 3},
             $${baseIndex + 4},
             $${baseIndex + 5},
             $${baseIndex + 6},
             $${baseIndex + 7},
             $${baseIndex + 8},
             $${baseIndex + 9})
          `);

          values.push(
             row.mdds_stc ? parseInt(parseFloat(row.mdds_stc)) : null,
             row.state_name || null,

             row.mdds_dtc ? parseInt(parseFloat(row.mdds_dtc)) : null,
             row.district_name || null,

             row.mdds_sub_dt ? parseInt(parseFloat(row.mdds_sub_dt)) : null,
             row.sub_district_name || null,

             row.mdds_plcn ? parseInt(parseFloat(row.mdds_plcn)) : null,
             row.area_name || null,

             row.source_file || null
            );
        });

        const query = `
          INSERT INTO villages (
            mdds_stc,
            state_name,
            mdds_dtc,
            district_name,
            mdds_sub_dt,
            sub_district_name,
            mdds_plcn,
            area_name,
            source_file
          )
          VALUES ${placeholders.join(",")}
        `;

        await pool.query(query, values);

        console.log(`Uploaded ${i + batch.length} rows`);
      }

      console.log("All data uploaded successfully!");
      process.exit();

    } catch (error) {
      console.error("Upload Error:", error);
    }
  });