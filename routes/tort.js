const router = require("express").Router();
const Tort = require("../model/LawOfTort");
const { courseValidation } = require("../validation");
const upload = require("../utils/multer");
const { cloudinary } = require("../utils/cloudinary");

router.post("/", upload.single("Image"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);

  //Validate the user creation data
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user already exists
  const matricExists = await Tort.findOne({ matric: req.body.matric });
  if (matricExists)
    return res.status(400).send("A user with this matric already exists");

  const post = new Tort({
    matric: req.body.matric,
    name: req.body.name,
    imagePath: result.secure_url,
  });
  try {
    const ltPost = await post.save();
    res.send(ltPost);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Tort.find();
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:profileId", async (req, res) => {
  try {
    const posts = await Tort.findById(req.params.profileId);
    res.json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/find/:matric", async (req, res) => {
  try {
    const result = await Tort.find(
      { matric: req.params.matric },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          return data;
        }
      }
    );
    res.json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
