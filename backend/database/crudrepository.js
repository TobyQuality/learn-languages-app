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
        `ALTER TABLE english ADD FOREIGN KEY(finnish_id) REFERENCES finnish(id)`,
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(`${result} altered finnish table`);
        }
      );
    });
  },
  insertTestUser: async (username, password) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO users (username, passwordhash, usertype) VALUES (?, ?, 'admin')`,
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
        `SELECT * FROM ${language1} INNER JOIN ${language2} ON ${language1}.id = ${language2}.${language1}_id`,
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
};

module.exports = database;
