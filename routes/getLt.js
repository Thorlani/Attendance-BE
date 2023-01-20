const router = require("express").Router();
const LT = require("../model/Lt");

router.get("/", async (req, res) => {
  try {
    const posts = await LT.find();
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const posts = await LT.findById(req.params.postId);
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
