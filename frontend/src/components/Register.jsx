import React, { useState } from "react";
import registerService from "../services/register";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const info = {};
      const user = await registerService.register({
        username: username,
        password: password,
        name: name,
        email: email,
      });
      if (user) {
        setUsername("");
        setPassword("");
        setName("");
        setEmail("");
        setSuccess(true);
        setTimeout(() => {
          setSuccess("");
          window.location.href = "/login";
        }, 3000);
      }
    } catch (exception) {
      setError("Registration failed");
      setTimeout(() => {}, 5000);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <div>
          name
          <input
            type="text"
            id="name"
            value={name}
            name="Name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          email
          <input
            type="text"
            id="email"
            value={email}
            name="Email"
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <button type="submit" id="register-button">
          register
        </button>
      </form>
      <div>
        <p>{success}</p>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Register;
