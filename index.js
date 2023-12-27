const express = require("express");
const locationsRouter = require("./routes/languages");
const port = 8080;
const app = express();

// Use the express.json() middleware to parse the request body
app.use(express.json());

// Use the locationsRouter for all routes starting with /api/locations
app.use("/api/languages", locationsRouter);

// use middleware to validate the request body
app.use((req, res, next) => {
  const location = req.body.location;
  if (!location.latitude || !location.longitude) {
    return res.status(400).json({
      error: "Missing coordinates",
    });
  }
  // check if latitude and longitude are numbers
  if (isNaN(location.latitude) || isNaN(location.longitude)) {
    return res.status(400).json({
      error: "Coordinates are not valid",
    });
  }
  // check if latitude is within -90 and 90
  if (location.latitude < -90 || location.latitude > 90) {
    return res.status(400).json({
      error: "Latitude is not valid",
    });
  }
  // check if longitude is within -180 and 180
  if (location.longitude < -180 || location.longitude > 180) {
    return res.status(400).json({
      error: "Longitude is not valid",
    });
  }
  next();
});

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message to the console when the server starts
  console.log(`Example app listening on port ${port}`);
});
