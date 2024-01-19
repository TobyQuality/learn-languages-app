// Play.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Select, MenuItem, Typography } from "@mui/material";

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
  const [languageToLearn, setLanguageToLearn] = useState("finnish");
  const [languageToShow, setLanguageToShow] = useState("english");

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

  const randomizeWord = () => {
    let uniqueWord = false;
    while (!uniqueWord) {
      // get a random index
      let randomIndex = Math.floor(Math.random() * wordsForLearning.length);
      // check if the index has already been used
      let findIndex = usedIndexes.find((index) => index === randomIndex);
      // if the index has not been used, then use it
      if (!findIndex) {
        let wordToShow = wordsForShowing[randomIndex];
        let theValueOfTheForeignKey = wordToShow[languageToLearn + "_id"];
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
      <Typography variant="h2">Play</Typography>
      <div>
        <Typography variant="body1">Score: {score}</Typography>
      </div>
      <form onSubmit={handlePlay}>
        <label htmlFor="languages-to-learn">Choose a language to learn:</label>
        <Select
          name="languages-to-learn"
          id="languages-to-learn"
          value={languageToLearn}
          onChange={(e) => setLanguageToLearn(e.target.value)}
        >
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
        <label htmlFor="languages-to-show">Choose a language to show:</label>
        <Select
          name="languages-to-show"
          id="languages-to-show"
          value={languageToShow}
          onChange={(e) => setLanguageToShow(e.target.value)}
        >
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
        <Button type="submit">Play</Button>
      </form>
      {gameIsOn && (
        <div>
          <Typography variant="body1">{time}</Typography>
          <Typography variant="body1">{wordToBeShown.word}</Typography>
          <Typography variant="body1">SCORE: {score}</Typography>
          <form onSubmit={giveAnswer}>
            <TextField type="text" variant="outlined" />
            <Button type="submit">Answer</Button>
          </form>
        </div>
      )}
      <div>
        <Typography variant="h3">{notification}</Typography>
      </div>
    </div>
  );
};

export default Play;
