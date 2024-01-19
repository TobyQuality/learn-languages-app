const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const database = require("../database/crudrepository");

loginRouter.post("/", async (request, response) => {
  const { password, username } = request.body;
  console.log(request.body);

  const user = await database.findUser(username);
  let userInfo = user[0];

  console.log("THIS IS THE USER: ", user);

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

  response.status(200).send({
    token: token,
    username: userInfo.username,
    id: userInfo.id,
    usertype: userInfo.usertype,
  });
});

module.exports = loginRouter;
