const router = require("express").Router();
const CL = require("../model/Cl");

router.get("/", async (req, res) => {
  try {
    const posts = await CL.find();
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const posts = await CL.findById(req.params.postId);
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
