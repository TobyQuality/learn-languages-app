const database = require("../database/crudrepository");
const jwt = require("jsonwebtoken");

/**
 * Middleware to extract the token from the request's authorization header.
 * @function
 * @name tokenExtractor
 * @param {Object} request - Express request object.
 * @param {Object} response - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }
  console.log("REQUEST TOKEN: " + request.token);
  next();
};

/**
 * Middleware to extract user information based on the decoded token.
 * This should always be used after tokenExtractor.
 * @function
 * @name userExtractor
 * @param {Object} request - Express request object.
 * @param {Object} response - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const userExtractor = async (request, response, next) => {
  if (request.method === "POST" || request.method === "DELETE") {
    const token = request.token;
    console.log("TOKEN: " + token);
    // to prevent internal server error from happening,
    // it is important to first check if token is not undefined
    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      request.decodedTokensId = decodedToken.id;
    }

    if (!token || !request.decodedTokensId) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
  }

  try {
    request.user = await database.findUserById(request.decodedTokensId);
  } catch (error) {
    return response
      .status(400)
      .json({ error: "unexpected error occurred, please try again" });
  }

  next();
};

module.exports = { tokenExtractor, userExtractor };
