const router = require("express").Router();
const IP = require("../model/Ip");

router.get("/", async (req, res) => {
  try {
    const posts = await IP.find();
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const posts = await IP.findById(req.params.postId);
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
