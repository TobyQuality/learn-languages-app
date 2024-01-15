// UNDER CONSTRUCTION
const connection = require("./database/crudrepository.js");
const readlineSync = require("readline-sync");

const word = readlineSync.question("Enter word: ", {
  keepWhitespace: true,
});
const language = readlineSync.question("Enter language: ", {
  keepWhitespace: true,
});

//perform crud operations
const main = async () => {
  try {
    const describeTable = await connection.describeTable(language);
    console.log(describeTable);
    //const changeUserInformation = await connection.changeUserInformation(
    //  word,
    //  parseInt(language)
    //);
    //console.log(changeUserInformation);
    // findUsers = await connection.findUsers();
    // console.log(findUsers);
    //const createTable = await connection.createTable();
    //console.log(createTable);
    //const alterTable = await connection.alterTable();
    //console.log(alterTable);
    //const findAllResult = await connection.findAll(language);
    //console.log(findAllResult);
    //const resultSave = await connection.save(language, word);
    //console.log(resultSave);
    //const resultFindById = await connection.findById();
    //console.log(resultFindById);
    //const resultDelete = await connection.deleteById();
    //console.log(resultDelete);
    //const testUser = await connection.saveUser(word, language);
    //console.log(testUser);
  } catch (err) {
    console.log(err);
  } /*finally {
    try {
      await connection.close().then(() => console.log("Connection closed"));
    } catch (err) {
      console.log(err);
    }
  }*/
};

main();
