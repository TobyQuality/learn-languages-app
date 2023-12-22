const languagesRouter = express.Router();

languagesRouter.get("/finnish", async (req, res) => {
  const languages = await database.findAll();
  return res.json(locations);
});

languagesRouter.get("/:myId([0-9]+)", async (req, res) => {
  const id = parseInt(req.params.myId);
  try {
    const location = await database.findById(id);
    return res.json(location);
  } catch (error) {
    return res.status(404).end();
  }
});

languagesRouter.delete("/:myId([0-9]+)", async (req, res) => {
  const id = parseInt(req.params.myId);
  try {
    const deleteLocation = await database.deleteById(id);
    return res.status(204).json(deleteLocation);
  } catch (error) {
    return res.status(404).end();
  }
});

languagesRouter.post("/", async (req, res) => {
  if (!locationValidator(req.body)) {
    return res.status(400).end();
  }
  const savedLocation = await database.save(req.body);
  return res.status(201).json(savedLocation);
});

languagesRouter.put("/:myId([0-9]+)", async (req, res) => {
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

module.exports = languagesRouter;
