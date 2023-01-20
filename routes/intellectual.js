const router = require("express").Router();
const Intellectual = require("../model/IntellectualProperty");
const { courseValidation } = require("../validation");

router.post("/", async (req, res) => {
  //Validate the user creation data
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user already exists
  const matricExists = await Intellectual.findOne({ matric: req.body.matric });
  if (matricExists)
    return res.status(400).send("A user with this matric already exists");

  const post = new Intellectual({
    matric: req.body.matric,
    name: req.body.name,
  });
  try {
    const ipPost = await post.save();
    res.send(ipPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Intellectual.find();
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
