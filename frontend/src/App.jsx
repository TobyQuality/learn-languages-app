import { Routes, Route, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import WordForm from "./components/WordForm";
import FinnishWords from "./components/FinnishWords";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h1>Learn Finnish</h1>
      {!user && <LoginForm />}
      {user && (
        <div>
          <h2>Learn languages Application</h2>
          <p>{user.name} has logged in</p>
          <button onClick={logout}>logout</button>
          <Navigation />
        </div>
      )}
      <Routes>
        <Route path="/word" element={<WordForm />} />
        <Route path="/" element={<FinnishWords />} />
      </Routes>
    </div>
  );
};

export default App;
