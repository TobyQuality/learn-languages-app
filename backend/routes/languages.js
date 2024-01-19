const express = require("express");
const database = require("../database/crudrepository");

/**
 * Express Router for handling language-related routes.
 * @typedef {Object} LanguagesRouter
 * @property {function} get - Function to handle GET requests for retrieving words.
 * @property {function} post - Function to handle POST requests for adding new words.
 * @property {function} getJoin - Function to handle GET requests for joining two languages.
 * @property {function} getById - Function to handle GET requests for retrieving a word by ID.
 * @property {function} putById - Function to handle PUT requests for updating a word by ID.
 * @property {function} deleteById - Function to handle DELETE requests for deleting a word by ID.
 */

/**
 * @type {LanguagesRouter}
 */
const languagesRouter = express.Router();

/**
 * Handle GET requests to retrieve all words in a specific language.
 * @function
 * @name get
 * @memberof LanguagesRouter
 * @path {GET} /:language
 * @param {string} req.params.language - The language for which to retrieve words.
 * @returns {Object} - JSON response containing words in the specified language.
 */
languagesRouter.get("/:language", async (req, res) => {
  const words = await database.findAll(req.params.language);
  return res.json(words);
});

/**
 * Handle GET requests to join words from two languages.
 * @function
 * @name getJoin
 * @memberof LanguagesRouter
 * @path {GET} /join/:language1/:language2
 * @param {string} req.params.language1 - The first language.
 * @param {string} req.params.language2 - The second language.
 * @returns {Object} - JSON response containing joined words from two languages.
 */
languagesRouter.get("/join/:language1/:language2", async (req, res) => {
  const words = await database.joinLanguages(
    req.params.language1,
    req.params.language2
  );
  return res.json(words);
});

/**
 * Handle POST requests to add a new word to a specific language.
 * @function
 * @name post
 * @memberof LanguagesRouter
 * @path {POST} /:language
 * @param {string} req.params.language - The language to which the word will be added.
 * @param {Object} req.body - The request body containing the new word.
 * @param {string} req.body.word - The new word to be added.
 * @returns {Object} - JSON response containing information about the newly added word.
 */
languagesRouter.post("/:language", async (req, res) => {
  const newWord = await database.saveWord(req.params.language, req.body.word);
  return res.status(201).json(newWord);
});

/**
 * Handle GET requests to retrieve a word by its ID.
 * @function
 * @name getById
 * @memberof LanguagesRouter
 * @path {GET} /:language/:myId([0-9]+)
 * @param {string} req.params.language - The language from which to retrieve the word.
 * @param {number} req.params.myId - The ID of the word to be retrieved.
 * @returns {Object} - JSON response containing information about the word.
 */
languagesRouter.get("/:language/:myId([0-9]+)", async (req, res) => {
  const id = parseInt(req.params.myId);
  try {
    const word = await database.findById(id);
    return res.json(word);
  } catch (error) {
    return res.status(404).end();
  }
});

/**
 * Handle PUT requests to update a word by its ID.
 * @function
 * @name putById
 * @memberof LanguagesRouter
 * @path {PUT} /:language/:myId([0-9]+)
 * @param {string} req.params.language - The language in which the word exists.
 * @param {number} req.params.myId - The ID of the word to be updated.
 * @param {Object} req.body - The request body containing updated information.
 * @returns {Object} - JSON response containing information about the updated word.
 */
languagesRouter.put("/:language/:myId([0-9]+)", async (req, res) => {
  const language = req.params.language;
  const id = parseInt(req.params.myId);
  if (!locationValidator(req.body)) {
    return res.status(400).end();
  }
  try {
    const updatedLocation = await database.update({ ...req.body, id });
    return res.status(200).json(updatedLocation);
  } catch (error) {
    return res.status(404).end();
  }
});

/**
 * Handle DELETE requests to delete a word by its ID.
 * @function
 * @name deleteById
 * @memberof LanguagesRouter
 * @path {DELETE} /:language/:myId([0-9]+)
 * @param {string} req.params.language - The language from which to delete the word.
 * @param {number} req.params.myId - The ID of the word to be deleted.
 * @returns {Object} - JSON response indicating the success of the deletion.
 */
languagesRouter.delete("/:language/:myId([0-9]+)", async (req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.myId);
  const language = req.params.language;
  try {
    const deleteLocation = await database.deleteById(id, language);
    return res.status(204).json(deleteLocation);
  } catch (error) {
    return res.status(404).end();
  }
});

module.exports = languagesRouter;
