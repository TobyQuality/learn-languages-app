const mysql = require("mysql");

/**
 * Create a MySQL pool object.
 * @typedef {Object} MySQLPool
 * @property {function} query - Function to execute SQL queries.
 */

/**
 * @type {MySQLPool}
 */
require("dotenv").config();

/**
 * Represents a connection pool to a MySQL database.
 * @type {Object}
 */
var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

/**
 * An object that contains functions related to database operations.
 * @typedef {Object} Database
 * @property {function} findAll - Function to retrieve all records from a table.
 * @property {function} saveWord - Function to save a new word to the database.
 * @property {function} saveUser - Function to save a new user to the database.
 * @property {function} deleteById - Function to delete a record by its ID.
 * @property {function} findById - Function to retrieve a record by its ID.
 * @property {function} findUsers - Function to retrieve all users.
 * @property {function} findUser - Function to retrieve a user by username.
 * @property {function} findUserById - Function to retrieve a user by ID.
 * @property {function} createTable - Function to create a new table.
 * @property {function} alterTable - Function to alter an existing table.
 * @property {function} changeUserInformation - Function to change user information.
 * @property {function} insertTestUser - Function to insert a test user.
 * @property {function} describeTable - Function to describe the structure of a table.
 * @property {function} joinLanguages - Function to perform an inner join between two tables.
 * @property {function} insertToTableLanguageForeignKey - Function to insert a foreign key into a table.
 * @property {function} updateForeignKey - Function to update a foreign key.
 */

/**
 * @type {Database}
 */
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
  saveWord: async (language, word) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO ${language} (word) VALUES (?)`,
        [word],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(`New word ${word} with id has been inserted `);
        }
      );
    });
  },
  saveUser: async (username, passwordhash) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO users (username, passwordhash) VALUES (?, ?)`,
        [username, passwordhash],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(`New user ${username} with id has been inserted `);
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
        `SELECT * FROM ${language} WHERE id = ?`,
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
  findUsers: async () => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users`, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
  findUser: async (username) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE username = ?`,
        [username],
        (error, result) => {
          if (error) {
            console.log("ERROR: " + error);
            reject(error);
          }
          console.log("RESULT: " + result[0]);
          resolve(result);
        }
      );
    });
  },
  findUserById: async (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users WHERE id = ?`, [id], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result[0]);
      });
    });
  },
  createTable: async () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `CREATE TABLE same_meanings (id INT NOT NULL AUTO_INCREMENT, finnish_id INT UNIQUE, english_id INT UNIQUE, persian_id INT UNIQUE, PRIMARY KEY (id), FOREIGN KEY(finnish_id) REFERENCES finnish(id), FOREIGN KEY(english_id) REFERENCES english(id))`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(`Table users created`);
        }
      );
    });
  },
  /* this code requires to be modified by individual needs */
  alterTable: async () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `ALTER TABLE users ADD FOREIGN KEY(finnish_id) REFERENCES finnish(id)`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(`${result} altered finnish table`);
        }
      );
    });
  },
  // this code requires to be modified by individual needs
  changeUserInformation: async () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE users SET usertype = 'admin' WHERE username = 'admin'`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(`${result} changed user information`);
        }
      );
    });
  },
  insertTestUser: async () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO users (usertype) VALUES (?, ?, 'admin') `,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(`${result} inserted test user`);
        }
      );
    });
  },
  describeTable: async (table) => {
    return new Promise((resolve, reject) => {
      pool.query(`DESCRIBE ${table}`, [table], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
  joinLanguages: async (language1, language2) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM ${language1} INNER JOIN ${language2} ON ${language1}.${language2}_id = ${language2}.id`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  },
  insertToTableLanguageForeignKey: async (language1, language2, id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO ${language1} (${language2}_id) VALUES (?)`,
        [id],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(`${result} inserted to ${language1} table`);
        }
      );
    });
  },
  updateForeignKey: async () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE english SET finnish_id = 8 WHERE id = 3`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(`${result}`);
        }
      );
    });
  },
};

module.exports = database;
