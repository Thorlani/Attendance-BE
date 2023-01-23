const router = require("express").Router();
const HR = require("../model/Hr");
const upload = require("../utils/multer");
const { cloudinary } = require("../utils/cloudinary");

router.post("/", upload.single("Image"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);

  const post = new HR({
    matric: req.body.matric,
    name: req.body.name,
    imagePath: result.secure_url,
  });
  try {
    const hrPost = await post.save();
    res.send(hrPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
