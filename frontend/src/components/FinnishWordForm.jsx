import { useState } from "react";
import axios from "axios";

const FinnishWordForm = () => {
  const [word, setWord] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/languages/finnish", { word })
      .then((response) => {
        console.log("New word added:", response.data);
        // Optionally update state or perform any actions upon successful addition
      })
      .catch((error) => {
        console.error("Error adding word:", error);
      });
  };

  return (
    <div>
      <h2>Add New Word</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default FinnishWordForm;
