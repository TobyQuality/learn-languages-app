const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const database = require("../database/crudrepository");

usersRouter.get("/", async (request, response) => {
  const users = await database.findAllUsers();
  response.json(users);
});

usersRouter.get("/:username", async (request, response) => {
  const username = request.params.username;
  const user = await database.findUser(username);
  response.json(user);
});

usersRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  console.log("REQUEST BODY", request.body);
  console.log("USERNAME", username);
  console.log("PASSWORD", password);

  if (!password) {
    return response.status(400).json({
      error: "password missing",
    });
  }
  if (!username) {
    return response.status(400).json({
      error: "username missing",
    });
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: "password must be at least 3 characters long",
    });
  }
  if (username.length < 3) {
    return response.status(400).json({
      error: "user name must be at least 3 characters long",
    });
  }

  const saltRounds = 10;
  const passwordhash = await bcrypt.hash(password, saltRounds);

  const savedUser = await database.saveUser(username, passwordhash);

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
