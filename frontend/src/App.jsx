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

      setVillages(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Village Autocomplete</h1>

      <input
        type="text"
        placeholder="Search village..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          fontSize: "16px",
        }}
      />

      <div style={{ marginTop: "20px" }}>

        {villages.map((village, index) => (

          <div
            key={index}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >

            <h3>{village.area_name}</h3>

            <p>
              {village.district_name}, {village.state_name}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;