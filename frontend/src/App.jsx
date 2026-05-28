import { useState } from "react";
import axios from "axios";

function App() {

  const [search, setSearch] = useState("");
  const [villages, setVillages] = useState([]);

  const handleSearch = async (value) => {

    setSearch(value);

    if (value.length < 2) {
      setVillages([]);
      return;
    }

    try {

      const response = await axios.get(
        `https://geo-api-backend-4iym.vercel.app/api/villages?search=${value}`
      );

      console.log(response.data);

      setVillages(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >

      <h1
        style={{
          color: "#333",
          marginBottom: "20px",
        }}
      >
        VILLAGE NAME SEARCH
      </h1>

      <input
        type="text"
        placeholder="Search village..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />

      <div style={{ marginTop: "25px" }}>

        {villages.length === 0 && search.length >= 2 ? (

          <p>No villages found</p>

        ) : (

          villages.map((village, index) => (

            <div
              key={index}
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >

              <h2
                style={{
                  margin: "0 0 10px 0",
                  color: "#222",
                }}
              >
                {village.village_name}
              </h2>

              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>District:</strong> {village.district_name}
              </p>

              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Sub District:</strong> {village.sub_district_name}
              </p>

              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>State:</strong> {village.state_name}
              </p>

              <p
                style={{
                  margin: "5px 0",
                  color: "#777",
                  fontSize: "14px",
                }}
              >
                <strong>Source File:</strong> {village.source_file}
              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default App;