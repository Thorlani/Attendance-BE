const router = require("express").Router();
const Commercial = require("../model/CommercialTransaction");
const { courseValidation } = require("../validation");
const upload = require("../utils/multer");
const { cloudinary } = require("../utils/cloudinary");

router.post("/", upload.single("Image"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);

  //Validate the user creation data
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user already exists
  const matricExists = await Commercial.findOne({ matric: req.body.matric });
  if (matricExists)
    return res.status(400).send("A user with this matric already exists");

  const post = new Commercial({
    matric: req.body.matric,
    name: req.body.name,
    imagePath: result.secure_url,
  });
  try {
    const ctPost = await post.save();
    res.send(ctPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Commercial.find();
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:profileId", async (req, res) => {
  try {
    const posts = await Commercial.findById(req.params.profileId);
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/find/:matricNumber", async (req, res) => {
  Commercial.find({ matric: req.params.matricNumber }, function (error, data) {
    if (error) {
      return console.log(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
