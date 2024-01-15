import axios from "axios";

const Game = (languagetolearn, languagetoshow) => {
  const [languageToLearn, setLanguageToLearn] = useState(languagetolearn);
  const [languageToShow, setLanguageToShow] = useState(languagetoshow);
  const [wordsForLearning, setWordsForLearning] = useState([]);
  const [wordsForShowing, setWordsForShowing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(
        `http://localhost:8000/api/languages/${languageToLearn}`
      );
      setWordsForLearning(response.data);
      response = await axios.get(
        `http://localhost:8000/api/languages/${languageToShow}`
      );
      setWordsForShowing(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{game.name}</h1>
      <p>{game.description}</p>
    </div>
  );
};

export default Game;
