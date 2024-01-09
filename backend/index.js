const express = require("express");
const languagesRouter = require("./routes/languages");
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const middleware = require("./utils/middleware");
const port = 8080;
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(middleware.tokenExtractor);
app.use("/api/languages", app.use(middleware.userExtractor), languagesRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);

// use middleware to validate the request body
app.use((req, res, next) => {
  /*
  const word = req.body.word;
  if (!word) {
    return res.status(400).json({
      error: "Missing word",
    });
  }
  // check if word is a string
  if (typeof word !== "string") {
    return res.status(400).json({
      error: "word is not valid",
    });
  }
  */
  console.log("SERVER: req.body: ", req.body);
  next();
});

const server = app
  .listen(port, () => {
    console.log(`Server listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("SERVER: Error starting server: ", err);
    process.exit(1);
  });

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
