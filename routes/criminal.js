const router = require("express").Router();
const Criminal = require("../model/CriminalLaw");
const { courseValidation } = require("../validation");

router.post("/", async (req, res) => {
  //Validate the user creation data
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user already exists
  const matricExists = await Criminal.findOne({ matric: req.body.matric });
  if (matricExists)
    return res.status(400).send("A user with this matric already exists");

  const post = new Criminal({
    matric: req.body.matric,
    name: req.body.name,
  });
  try {
    const clPost = await post.save();
    res.send(clPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Criminal.find();
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
