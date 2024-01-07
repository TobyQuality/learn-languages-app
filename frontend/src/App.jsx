import { Routes, Route, useParams } from "react-router-dom";
import Navigation from "./components/Navigation";
import WordForm from "./components/WordForm";
import FinnishWords from "./components/FinnishWords";

const App = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Learn Finnish</h1>
      <Navigation />
      <Routes>
        <Route path="/word" element={<WordForm />} />
        <Route path="/" element={<FinnishWords />} />
      </Routes>
    </div>
  );
};

export default App;
