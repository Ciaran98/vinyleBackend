const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Album = require("../models/Album");
const auth = require("../middleware/auth");
router.post(
  "/",
  [auth, [check("name", "Name of album is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.user.isAdmin) {
      return res.status(400).json({ errors: "User is not Admin" });
    }

    try {
      const albums = await Album.find().sort({ albumIndex: -1 });
      const newAlbum = new Album({
        name: req.body.name,
        runDate: albums[0].runDate + 86400000,
        albumIndex: albums[0].albumIndex + 1,
      });
      const album = await newAlbum.save();

      res.json(album);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const albums = await Album.find().sort({ albumIndex: 1 });
    res.json(albums);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/getVinyleFromDate", async (req, res) => {
  try {
    const album = await Album.findOne({ runDate: req.query.time });
    if (!album) {
      return res.status(404).json({ msg: "Album Not Found",name: "The Gods We Can Touch", albumIndex: 1  });
    }
    res.json(album);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ name: "The Gods We Can Touch", albumIndex: 1 });
  }
});
module.exports = router;
