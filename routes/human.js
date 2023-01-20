const router = require("express").Router();
const Human = require("../model/HumanRight");
const { courseValidation } = require("../validation");

router.post("/", async (req, res) => {
  //Validate the user creation data
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user already exists
  const matricExists = await Human.findOne({ matric: req.body.matric });
  if (matricExists)
    return res.status(400).send("A user with this matric already exists");

  const post = new Human({
    matric: req.body.matric,
    name: req.body.name,
  });
  try {
    const hrPost = await post.save();
    res.send(hrPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Human.find();
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
