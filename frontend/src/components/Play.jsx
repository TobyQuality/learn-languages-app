// this component is used to display words and guess them in either Finnish or English.
// There is a button to toggle between the two languages.
// The player has ten seconds to guess the word.
// If the player guesses correctly, he will be awarded a point.
// If the player guesses incorrectly, the correct answer will be displayed.
// There is randomly generated word from the list of words that the player has added to their list of words to learn.
// There will be ten words in total.
// The player can see how many words he has guessed correctly.

import { useState, useEffect } from "react";
import axios from "axios";

const Play = () => {
  const languages = ["finnish", "english"];
  const [words, setWords] = useState([]);
  const [languageToLearn, setLanguageToLearn] = useState("");
  const [languageToShow, setLanguageToShow] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    for (let i = 0; i < languages.length; i++) {
      axios
        .get(`http://localhost:8080/api/languages/${languages[i]}`)
        .then((response) => {
          setWords(response?.data);
        })
        .catch((error) => {
          console.error("Error fetching words:", error);
        });
    }
  }, []);

  const handlePlay = async (event) => {
    event.preventDefault();
    if (languageToLearn === languageToShow) {
      setNotification("The languages are the same, change them to play");
      setTimeout(() => {
        setNotification("");
      }, 5000);
    } else {
      startGame();
    }
  };

  const startGame = () => {};

  return (
    <div>
      <h2>Play</h2>
      <div>
        <p>Score: </p>
      </div>

      <form>
        <div>
          <label for="language-to-learn">Choose a language to learn:</label>
          <select name="languages-to-learn" id="languages-to-learn">
            {languages.map((language) => (
              <option value={language}>{language}</option>
            ))}
          </select>
          <button
            onClick={() =>
              setLanguageToLearn(
                document.getElementById("languages-to-learn").value
              )
            }
            id="toggle-language-button"
          >
            learn language
          </button>
        </div>
        <div>
          <label for="language-to-show">Choose a language to learn:</label>
          <select name="languages-to-show" id="languages-to-show">
            {languages.map((language) => (
              <option value={language}>{language}</option>
            ))}
          </select>
          <button
            onClick={() =>
              setLanguageToShow(
                document.getElementById("languages-to-show").value
              )
            }
            id="toggle-language-button"
          >
            show questions
          </button>
        </div>
        <button onSubmit={handlePlay}></button>
      </form>
      <div>
        <h3>{notification}</h3>
      </div>
    </div>
  );
};

export default Play;
