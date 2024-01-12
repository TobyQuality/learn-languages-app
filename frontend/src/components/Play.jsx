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
  const languages = [];
  const [words, setWords] = useState([]);
  const [languageToLearn, setLanguageToLearn] = useState("");
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
  // if the user has chosen a language to learn,
  // show the form to choose a language to show
  useEffect(() => {
    languageToLearn !== ""
      ? document
          .getElementById("languages-to-show-form")
          .setAttribute("style", "visibility: visible)")
      : document
          .getElementById("languages-to-show-form")
          .setAttribute("style", "visibility: hidden)");
  }, [languageToLearn]);
  return (
    <div>
      <h2>Play</h2>
      <form>
        <div>
          <button type="submit" id="play-button">
            play
          </button>
        </div>
      </form>
      <div>
        <p>Score: </p>
      </div>

      <div>
        <form>
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
            toggle language
          </button>
        </form>
        <form style={{ visibility: "visible" }} id="languages-to-show-form">
          <label for="language-to-show">Choose a language to learn:</label>
          <select name="languages-to-show" id="languages-to-show">
            {languages.map((language) => {
              if (language !== languageToLearn) {
                return <option value={language}>{language}</option>;
              }
            })}
          </select>

          <div>
            <button type="submit" id="guess-button">
              guess
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Play;
