const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const Picture = require('../database/models/imageModel');

router.use(bodyParser.json());


router.get('/:hashtags', (req, res) => {
    Picture.find({ hashtags: req.params.hashtags }, (err, pics) => {
        if (err) {
            return console.log(err);
        }
        res.json(pics);
    }
    )
});

module.exports = router;