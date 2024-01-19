// WordForm.jsx
import { useState } from "react";
import axios from "axios";
import { Select, MenuItem, Button, TextField, Typography } from "@mui/material";

/**
 * Component for adding new words to the application.
 * @returns {JSX.Element} - WordForm component JSX element.
 */
const WordForm = () => {
  const [language, setLanguage] = useState("finnish"); // Default language
  const [word, setWord] = useState("");

  const storedUser = window.localStorage.getItem("loggedUser");

  /**
   * Handles the form submission to add a new word.
   * @param {Event} e - Form submit event.
   */
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

  /**
   * Checks if the user is an admin.
   * @returns {boolean} - True if user is admin, false otherwise.
   */
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
          <Typography variant="h2">Add New Word</Typography>
          <form onSubmit={handleSubmit}>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              label="Select Language"
            >
              <MenuItem value="finnish">Finnish</MenuItem>
              <MenuItem value="english">English</MenuItem>
            </Select>
            <TextField
              type="text"
              placeholder="Enter word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
            <Button type="submit">Add</Button>
          </form>
        </div>
      )}
      {!isAdmin && (
        <div>
          <Typography variant="h2">Only admin can add new words</Typography>
        </div>
      )}
    </div>
  );
};

export default WordForm;
