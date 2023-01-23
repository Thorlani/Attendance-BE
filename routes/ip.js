const router = require("express").Router();
const IP = require("../model/Ip");
const upload = require("../utils/multer");
const { cloudinary } = require("../utils/cloudinary");

router.post("/",  upload.single("Image"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);

  const post = new IP({
    matric: req.body.matric,
    name: req.body.name,
    imagePath: result.secure_url,
  });
  try {
    const ipPost = await post.save();
    res.send(ipPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
