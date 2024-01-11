import { Routes, Route, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import WordForm from "./components/WordForm";
import FinnishWords from "./components/FinnishWords";
import LoginForm from "./components/LoginForm";
import languagesService from "./services/languages";

const App = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      languagesService.setToken(user.token);
    }
  }, []);

  // when user logs out, clear the local storage and set the user to null
  // also set the token to empty string
  // and redirect to login page
  const logout = () => {
    window.localStorage.clear();
    setUser(null);
    languagesService.setToken("");
    window.location.href = "/login";
  };

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
        <Route path="/showwords" element={<FinnishWords />} />
      </Routes>
    </div>
  );
};

export default App;
