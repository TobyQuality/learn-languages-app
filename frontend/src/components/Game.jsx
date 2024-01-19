import axios from "axios";

const Game = (languagetolearn, languagetoshow) => {
  const [languageToLearn, setLanguageToLearn] = useState(languagetolearn);
  const [languageToShow, setLanguageToShow] = useState(languagetoshow);
  const [wordsForLearning, setWordsForLearning] = useState([]);
  const [wordsForShowing, setWordsForShowing] = useState([]);
  const [joinLanguages, setJoinLanguages] = useState("");

  return (
    <div>
      <h1>{game.name}</h1>
      <p>{game.description}</p>
    </div>
  );
};

export default Game;
