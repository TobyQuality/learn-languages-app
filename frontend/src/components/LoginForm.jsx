import { useState } from "react";
import loginService from "../services/login";
import languagesService from "../services/languages";
import { Link } from "react-router-dom";
import { useTokenContext } from "../TokenContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { tokenState, tokenDispatch } = useTokenContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      console.log("USER: ", user);

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      tokenDispatch({ type: "SET_TOKEN", payload: user.token });
      tokenDispatch({ type: "SET_USERNAME", payload: user.username });
      tokenDispatch({ type: "SET_ID", payload: user.id });
      tokenDispatch({ type: "SET_USERTYPE", payload: user.usertype });

      setTimeout(() => {
        console.log("User: ", tokenState);
      }, 1000);

      languagesService.setToken(user.token);
      if (user) {
        window.location.href = "/";
        setUsername("");
        setPassword("");
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LoginForm;
