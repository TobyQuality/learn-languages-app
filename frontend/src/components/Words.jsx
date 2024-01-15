import { useState, useEffect } from "react";
import axios from "axios";

const Words = (language) => {
  console.log(language)
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
      <ul>
        {words.map((word) => (
          <li key={word.id}>{word.word}</li>
        ))}
      </ul>
    </div>
  );
};

export default Words;
