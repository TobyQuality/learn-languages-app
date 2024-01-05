const mysql = require("mysql");

// create a  MySQL pool object
require("dotenv").config();

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

// create an object that contains pool functions
const database = {
  // function to save a new word to the database
  findAll: async (language) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM ${language}`, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
  save: async (language, word) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO ? (word) VALUES (?)`,
        [language, word],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(`New word ${word} with id has been inserted `);
        }
      );
    });
  },
  deleteById: async (id, language) => {
    console.log(id, language);
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM ${language} WHERE id = (?)`,
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(`${result} deleted from ${language} table`);
        }
      );
    });
  },
  findById: async (language, id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM finnish WHERE id = ?`,
        [language, id],
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
      pool.query(
        `CREATE TABLE  (id INT(21) NOT NULL, word VARCHAR(255) NOT NULL, tags_id int, PRIMARY KEY (id), FOREIGN KEY (tags_id) REFERENCES tags(id))`,
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
      pool.query(
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
      pool.query(
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
  alterFinnishTable: async () => {
    return new Promise((resolve, reject) => {
      pool.query(`ALTER TABLE finnish ADD UNIQUE (word)`, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(`${result} altered finnish table`);
      });
    });
  },
};

module.exports = database;
