const router = require("express").Router();
const IpCounter = require("../model/IpCounter");

router.post("/", async (req, res) => {
  const post = new IpCounter({
    number: req.body.number,
  });
  try {
    const count = await post.save();
    res.send(count);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/", async (req, res) => {
  const post = new IpCounter({
    number: req.body.number,
  });
  try {
    const count = await post.save();
    res.send(count);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await IpCounter.find();
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
