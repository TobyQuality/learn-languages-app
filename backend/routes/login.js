const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
/**
 * Express Router for handling login-related routes.
 * @typedef {Object} LoginRouter
 * @property {function} post - Function to handle POST requests for user login.
 */

/**
 * @type {LoginRouter}
 */
const loginRouter = require("express").Router();
const database = require("../database/crudrepository");

/**
 * Handle POST requests for user login.
 * @function
 * @name post
 * @memberof LoginRouter
 * @path {POST} /
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @returns {Object} - JSON response containing authentication token and user information.
 */
loginRouter.post("/", async (request, response) => {
  /**
   * @type {Object}
   * @property {string} password - The user's password.
   * @property {string} username - The user's username.
   */
  const { password, username } = request.body;

  /**
   * @type {Array}
   * @description Array containing user information retrieved from the database.
   */
  const user = await database.findUser(username);
  let userInfo = user[0];

  /**
   * @type {boolean}
   * @description Boolean indicating whether the provided password is correct.
   */
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(password, user[0].passwordhash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  /**
   * @type {Object}
   * @property {string} username - The user's username.
   * @property {number} id - The user's ID.
   */
  const userForToken = {
    username: user[0].username,
    id: user[0].id,
  };

  /**
   * @type {string}
   * @description JSON Web Token (JWT) generated for user authentication.
   */
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
