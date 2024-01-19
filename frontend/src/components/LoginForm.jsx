// LoginForm.jsx
import { useState } from "react";
import loginService from "../services/login";
import languagesService from "../services/languages";
import { Link } from "react-router-dom";
import { useTokenContext } from "../TokenContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Log in to application
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ mt: 3, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Link to="/register">Register</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
