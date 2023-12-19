const mysql = require("mysql");

// create a  MySQL connection object
require("dotenv").config();

const connection = mysql.createConnection(process.env);

// create an object that contains connection functions
const database = {
  save: async ({ location }) => {
    return new Promise((resolve, reject) => {
      const { latitude, longitude } = location;
      connection.query(
        "INSERT INTO locations (latitude, longitude) VALUES (?, ?)",
        [latitude, longitude],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(
            `New location with latitude ${latitude} and longitude ${longitude} added with id:  + ${result.insertId} `
          );
        }
      );
    });
  },
  findAll: async () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM locations", (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
  deleteById: async (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM locations WHERE id = ?",
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve("Deleted rows: " + result.affectedRows);
        }
      );
    });
  },
  findById: async (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM locations WHERE id = ?",
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },
};

module.exports = database;
