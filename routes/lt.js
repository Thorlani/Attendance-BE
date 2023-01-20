const router = require("express").Router();
const LT = require("../model/Lt");
// const upload = require("../utils/multer");
// const { cloudinary } = require("../utils/cloudinary");

router.post("/", async (req, res) => {
  // const result = await cloudinary.uploader.upload(req.file.path);

  const post = new LT({
    matric: req.body.matric,
    name: req.body.name,
    // imagePath: result.secure_url,
  });
  try {
    const ltPost = await post.save();
    res.send(ltPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
