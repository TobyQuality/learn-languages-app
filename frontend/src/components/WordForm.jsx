import { useState, useEffect } from "react";
import axios from "axios";
import { useTokenContext } from "../TokenContext";

const WordForm = () => {
  const [language, setLanguage] = useState("finnish"); // Default language
  const [word, setWord] = useState("");

  const storedUser = window.localStorage.getItem("loggedUser");

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

  //to get usertype from the context
  const usertype = storedUser ? JSON.parse(storedUser).usertype : null;
  console.log("USERTYPE:", usertype);

  const checkAdmin = () => {
    if (usertype === "admin") {
      return true;
    } else {
      return false;
    }
  };

  const isAdmin = checkAdmin();

  return (
    <div>
      {isAdmin && (
        <div>
          <h2>Add New Word</h2>
          <form onSubmit={handleSubmit}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
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
      )}
      {!isAdmin && (
        <div>
          <h2>Only admin can add new words</h2>
        </div>
      )}
    </div>
  );
};

export default WordForm;
