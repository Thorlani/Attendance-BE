const router = require("express").Router();
const CL = require("../model/Cl");
// const upload = require("../utils/multer");
// const { cloudinary } = require("../utils/cloudinary");

router.post("/", async (req, res) => {
  // const result = await cloudinary.uploader.upload(req.file.path);

  const post = new CL({
    matric: req.body.matric,
    name: req.body.name,
    // imagePath: result.secure_url,
  });
  try {
    const clPost = await post.save();
    res.send(clPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
