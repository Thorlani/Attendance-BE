const router = require("express").Router();
const HrCounter = require("../model/HrCounter");

router.post("/", async (req, res) => {
  const post = new HrCounter({
    number: req.body.number,
  });
  try {
    const count = await post.save();
    res.send(count);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const updated = await HrCounter.updateOne(
      { _id: req.params.postId },
      { $set: { number: req.body.number } }
    );
    res.json(updated);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await HrCounter.find();
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
