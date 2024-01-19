// this component is used to display words and guess them in either Finnish or English.
// There is a button to toggle between the two languages.
// The player has ten seconds to guess the word.
// If the player guesses correctly, he will be awarded a point.
// If the player guesses incorrectly, the correct answer will be displayed.
// There is randomly generated word from the list of words that the player has added to their list of words to learn.
// There will be ten words in total.
// The player can see how many words he has guessed correctly.

import { useState } from "react";
import axios from "axios";

const Play = () => {
  const languages = ["finnish", "english"];
  let usedIndexes = [];
  const [wordsForLearning, setWordsForLearning] = useState([]);
  const [wordsForShowing, setWordsForShowing] = useState([]);
  const [score, setScore] = useState(0);
  const [notification, setNotification] = useState("");
  const [gameIsOn, setGameIsOn] = useState(false);
  const [wordToBeGuessed, setWordToBeGuessed] = useState("");
  const [wordToBeShown, setWordToBeShown] = useState("");
  const [time, setTime] = useState(10);
  const [turn, setTurn] = useState(0);

  const handlePlay = async (event) => {
    event.preventDefault();

    // reset the game if one is already on
    if (gameIsOn) {
      setGameIsOn(false);
      usedIndexes = [];
      setScore(0);
      setNotification("");
      setWordToBeGuessed("");
      setWordToBeShown("");
      setTurn(0);
      setTime(10);
    }

    let languageToLearn = document.getElementById("languages-to-learn").value;
    let languageToShow = document.getElementById("languages-to-show").value;
    console.log("LANGUAGE TO LEARN: ", languageToLearn);
    console.log("LANGUAGE TO SHOW: ", languageToShow);

    if (languageToLearn === languageToShow) {
      setNotification("The languages are the same, change them to play");
      setTimeout(() => {
        setNotification("");
      }, 5000);
    } else {
      try {
        let response1 = await axios.get(
          `http://localhost:8080/api/languages/${languageToLearn}`
        );
        setWordsForLearning(response1.data);
        let response2 = await axios.get(
          `http://localhost:8080/api/languages/${languageToShow}`
        );
        setWordsForShowing(response2.data);
        setGameIsOn(true);
        setTurn(0);
        randomizeWord();
      } catch (error) {
        console.log(error);
      }
    }
  };

  /*
    TODO:
    Sana tulee hakea siten, että sillä on vierasavaimena indeksi,
    joka vastaa arvattavan kielen sanan indeksiä.

    Kun ajastin on päällä, on pelaajalla 10 sekuntia aikaa arvata sana.
    Jos pelaaja arvaa oikein, hän saa pisteen.
    Jos pelaaja arvaa väärin, hän ei saa pistettä.
    Kun pelaaja on antanut vastauksen tai aika loppuu, tulee uusi sana.

    Kun kaikki sanat on arvattu, peli loppuu ja pelaaja näkee pistemääränsä.
  */

  const randomizeWord = async () => {
    let uniqueWord = false;
    while (!uniqueWord) {
      // get a random index
      let randomIndex = Math.floor(Math.random() * wordsForLearning.length);
      // check if the index has already been used
      let findIndex = usedIndexes.find((index) => index === randomIndex);
      // if the index has not been used, then use it
      if (!findIndex) {
        let wordToShow = wordsForShowing[randomIndex];
        let theValueOfTheForeignKey =
          wordToShow[
            document.getElementById("languages-to-learn").value + "_id"
          ];
        let wordToGuess = wordsForLearning.find(
          (word) => word.id === theValueOfTheForeignKey
        );
        if (wordToGuess) {
          usedIndexes.concat(...usedIndexes, randomIndex);
          setWordToBeShown(wordToShow);
          setWordToBeGuessed(wordToGuess);
          uniqueWord = true;
        }
      } else {
        if (usedIndexes.length === wordsForLearning.length) {
          setGameIsOn(false);
          usedIndexes = [];
          setNotification(`You got ${score} points!`);
        }
      }
    }
  };

  const giveAnswer = (event) => {
    event.preventDefault();
    // force players answer to lowercase
    const playersAnswer = event.target[0].value.toLowerCase();
    // see if players answer is found in the words for learning
    const findAnswer = wordsForLearning.find(
      (word) => word.word === playersAnswer
    );

    // get the id of the word to be shown
    if (findAnswer) {
      if (findAnswer.id === wordToBeGuessed.id) {
        setNotification("Correct!");
        setTime(10);
        setScore(score + 1);
        setTurn(turn + 1);
        randomizeWord();
        setTimeout(() => {
          setNotification("");
        }, 3000);
      } else {
        setNotification(`Incorrect.`);
        setTimeout(() => {
          setNotification("");
        }, 3000);
      }
    }
  };

  if (gameIsOn) {
    setTimeout(() => {
      setTime(time - 1);
    }, 1000);
  }

  if (time === 0) {
    if (turn < wordsForLearning.length) {
      setTime(10);
      randomizeWord();
      setTurn(turn + 1);
    } else {
      setGameIsOn(false);
      usedIndexes = [];
      setTurn(0);
      setNotification(`You got ${score} points!`);
    }
  }

  return (
    <div>
      <h2>Play</h2>
      <div>
        <p>Score: </p>
      </div>
      <form onSubmit={handlePlay}>
        <label for="language-to-learn">Choose a language to learn:</label>
        <select name="languages-to-learn" id="languages-to-learn">
          {languages.map((language) => (
            <option value={language}>{language}</option>
          ))}
        </select>
        <label for="language-to-show">Choose a language to show:</label>
        <select name="languages-to-show" id="languages-to-show">
          {languages.map((language) => (
            <option value={language}>{language}</option>
          ))}
        </select>
        <button type="submit">Play</button>
      </form>
      {gameIsOn && (
        <div>
          <p>{time}</p>
          <p>{wordToBeShown.word}</p>
          <p>SCORE: {score}</p>
          <form onSubmit={giveAnswer}>
            <input type="text"></input>
            <button type="submit">Answer</button>
          </form>
        </div>
      )}
      <div>
        <h3>{notification}</h3>
      </div>
    </div>
  );
};

export default Play;
