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
    //const findAllResult = await connection.findAll(language);
    //console.log(findAllResult);
    const resultSave = await connection.save();
    console.log(resultSave);
    //const resultFindById = await connection.findById();
    //console.log(resultFindById);
    //const resultDelete = await connection.deleteById();
    //console.log(resultDelete);
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
