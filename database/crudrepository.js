const mysql = require("mysql");

// create a  MySQL connection object
require("dotenv").config();

const connection = mysql.createConnection(process.env);

// create an object that contains connection functions
const database = {
  save: async ({ word, language }) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO ? (word) VALUES (?)`,
        [language, word],
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
      connection.query(`SELECT * FROM finnish`, [language], (error, result) => {
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
  createFinnishTable: async ({ language }) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `CREATE TABLE finnish (id INT(21) NOT NULL, word VARCHAR(255) NOT NULL, tags_id int, PRIMARY KEY (id), FOREIGN KEY (tags_id) REFERENCES tags(id))`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(`Table ${language} created`);
        }
      );
    });
  },
  createTagsTable: async ({ language }) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `CREATE TABLE tags (id INT(21) NOT NULL, tag VARCHAR(255) NOT NULL, PRIMARY KEY (id))`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(`Table ${language} created`);
        }
      );
    });
  },
  insertIntoTable: async ({ language }) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO finnish (word) VALUES ('kissa')`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(`${result} inserted into ${language} table`);
        }
      );
    });
  },
};

module.exports = database;
