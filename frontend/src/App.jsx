// App.jsx
import { Routes, Route, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import WordForm from "./components/WordForm";
import LoginForm from "./components/LoginForm";
import languagesService from "./services/languages";
import Register from "./components/Register";
import Play from "./components/Play";
import { Button, Typography } from "@mui/material";

const App = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      languagesService.setToken(user.token);
      console.log("User is logged in");
      console.log(user);
    }
  }, []);

  // when user logs out, clear the local storage and set the user to null
  // also set the token to an empty string
  // and redirect to the login page
  const logout = () => {
    window.localStorage.clear();
    setUser(null);
    languagesService.setToken("");
    window.location.href = "/login";
  };

  return (
    <div>
      {!user && <LoginForm />}
      {user && (
        <div>
          <Typography variant="h2">Learn languages Application</Typography>
          <Button onClick={logout} variant="contained">
            Logout
          </Button>
          <Navigation />
        </div>
      )}
      <Routes>
        <Route path="/word" element={<WordForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </div>
  );
};

export default App;
