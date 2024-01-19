const express = require("express");
const languagesRouter = require("./routes/languages");
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const middleware = require("./utils/middleware");
const port = 8080;
const app = express();
const cors = require("cors");

/**
 * Middleware to parse incoming JSON requests.
 * @name express.json
 * @function
 */
app.use(express.json());
/**
 * Middleware to enable Cross-Origin Resource Sharing (CORS).
 * @name cors
 * @function
 */
app.use(cors());
/**
 * Middleware to extract the token from the request's authorization header.
 * @name tokenExtractor
 * @function
 */
app.use(middleware.tokenExtractor);
/**
 * Routes handling language-related endpoints.
 * @name languagesRouter
 * @type {express.Router}
 */
app.use("/api/languages", languagesRouter);
/**
 * Routes handling login-related endpoints.
 * @name loginRouter
 * @type {express.Router}
 */
app.use("/api/login", loginRouter);
/**
 * Routes handling user-related endpoints.
 * @name usersRouter
 * @type {express.Router}
 */
app.use("/api/users", usersRouter);

/**
 * Express application listening on the specified port.
 * @name app
 * @type {express.Application}
 */
const server = app
  .listen(port, () => {
    console.log(`Server listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("SERVER: Error starting server: ", err);
    process.exit(1);
  });

/**
 * Handles graceful shutdown of the server and associated resources.
 * @function
 * @name gracefulShutdown
 */
const gracefulShutdown = () => {
  console.log("Starting graceful shutdown...");
  // Close the server
  if (server) {
    console.log("Server was opened, so we can close it...");
    server.close((err) => {
      // Give error message if server closing does not work
      if (err) {
        console.error("SERVER: Error closing Express server: ", err);
        server.close((err) => {
          if (err) {
            console.error("SERVER: Error closing Express server: ", err);
          } else {
            console.log("SERVER: Stopped.");
          }
          // Try to close db, give errors is that does not work
          console.log("MySQL: Starting graceful shutdown...");

          pool.end((err) => {
            if (err) {
              console.error("MySQL: Error closing MySQL pool: ", err);
            } else {
              console.log("MySQL: Stopped.");
            }

            console.log("MySQL: Shutdown complete.");
            process.exit(1); // Use 1 or appropiate error code
          });
        });
      }
    });
  }
};

process.on("SIGTERM", gracefulShutdown); // Some other app requirest shutdown.
process.on("SIGINT", gracefulShutdown); // ctrl-c
