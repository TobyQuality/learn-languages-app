const express = require("express");
const database = require("../database/crudrepository");

const languagesRouter = express.Router();

languagesRouter.get("/:language", async (req, res) => {
  const language = req.params.language;
  const languages = await database.findAll(language);
  return res.json(languages);
});

languagesRouter.post("/:language", async (req, res) => {
  const language = req.params.language;
  const newWord = await database.save(req.body);
  return res.status(201).json(newWord);
});

languagesRouter.get("/:language/:myId([0-9]+)", async (req, res) => {
  const language = req.params.language;
  const id = parseInt(req.params.myId);
  try {
    const word = await database.findById(id);
    return res.json(word);
  } catch (error) {
    return res.status(404).end();
  }
});

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

languagesRouter.delete("/:language/:myId([0-9]+)", async (req, res) => {
  const language = req.params.language;
  const id = parseInt(req.params.myId);
  try {
    const deleteLocation = await database.deleteById(id);
    return res.status(204).json(deleteLocation);
  } catch (error) {
    return res.status(404).end();
  }
});

module.exports = languagesRouter;
