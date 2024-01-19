const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const database = require("../database/crudrepository");

loginRouter.post("/", async (request, response) => {
  const { password, username } = request.body;
  console.log(request.body);
  console.log("USERNAME: " + username);
  console.log("PASSWORD: " + password);

  const user = await database.findUser(username);

  console.log("USERNAME: " + user[0].username);
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(password, user[0].passwordhash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user[0].username,
    id: user[0].id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response.status(200).send({ token, username: user.username, id: user.id });
});

module.exports = loginRouter;
