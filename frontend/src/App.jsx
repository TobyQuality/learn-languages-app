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

/**
 * The main application component representing the entire application structure.
 * @component
 * @name App
 * @returns {JSX.Element} The rendered JSX element of the application.
 */
const App = () => {
  /**
   * State variable to manage the user's authentication status.
   * @type {Object | null}
   */
  const [user, setUser] = useState(null);
  /**
   * Object containing parameters extracted from the current URL path.
   * @type {Object}
   */
  const { id } = useParams();

  /**
   * Effect hook to run the authentication check when the component mounts.
   * Retrieves the user from local storage if available.
   */
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

  /**
   * Function to handle user logout.
   * Clears local storage, sets user to null, sets the token to an empty string,
   * and redirects to the login page.
   */
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
