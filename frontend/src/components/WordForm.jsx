import { useState } from "react";
import axios from "axios";
import Words from "./Words";
import { useQuery } from "@tanstack/react-query";

const WordForm = () => {
  const languages = ["finnish", "english"];
  const [language, setLanguage] = useState("finnish"); // Default language
  const [word, setWord] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/languages/${language}`, {
        language,
        word,
      })
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
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="finnish">Finnish</option>
          <option value="english">English</option>
        </select>
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

export default WordForm;
