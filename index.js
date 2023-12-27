const express = require("express");
const languagesRouter = require("./routes/languages");
const port = process.env.PORT || 8080;
const app = express();
const cors = require("cors");

// Use the express.json() middleware to parse the request body
app.use(express.json());

// Use the locationsRouter for all routes starting with /api/locations
app.use("/api/languages", languagesRouter);

// use middleware to validate the request body
app.use((req, res, next) => {
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
  next();
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message to the console when the server starts
  console.log(`Example app listening on port ${port}`);
});
