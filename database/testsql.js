// UNDER CONSTRUCTION
const connection = require("./mysql_connector.js");

//perform crud operations
const main = async () => {
  try {
    await connection.connect().then(() => console.log("Connected to database"));
    //const findAllResult = await connection.findAll();
    const resultSave = await connection.save();
    console.log(resultSave);
    //const resultFindById = await connection.findById();
    //console.log(resultFindById);
    //const resultDelete = await connection.deleteById();
    //console.log(resultDelete);
  } catch (err) {
    console.log(err);
  } finally {
    try {
      await connection.close().then(() => console.log("Connection closed"));
    } catch (err) {
      console.log(err);
    }
  }
};

main();
