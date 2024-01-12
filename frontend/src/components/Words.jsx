// This file contains the FinnishWords component which is used to display the Finnish words
// that the user has added to their list of words to learn.

import { useState, useEffect } from "react";
import axios from "axios";

const Words = (language) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    // Fetch words from the backend when the component mounts
    axios
      .get(`http://localhost:8080/api/languages/${language}`)
      .then((response) => {
        setWords(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching words:", error);
      });
  }, []);

  return (
    <div>
      <h2>${language} Words</h2>
      <ul>
        {words.map((word) => (
          <li key={word.id}>{word.word}</li>
        ))}
      </ul>
    </div>
  );
};

export default Words;
