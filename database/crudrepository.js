const mysql = require("mysql");

// create a  MySQL connection object
require("dotenv").config();

const connection = mysql.createConnection(process.env);

// create an object that contains connection functions
const database = {
  save: async ({ word, language }) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO ${language} (word) VALUES (?)`,
        [word],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(
            `New word ${word} with id has been inserted: ${result.insertId} `
          );
        }
      );
    });
  },
  findAll: async ({ language }) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${language}`, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
  deleteById: async ({ id, language }) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `FROM ${language} WHERE id = ?`,
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
        `SELECT * FROM ${language} WHERE id = ?`,
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
