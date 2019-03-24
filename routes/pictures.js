const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const Picture = require('../database/models/imageModel');

router.use(bodyParser.json());

router.get('/', (req, res) => {
    Picture.find((err, pics) => {
        if (err) {
            return console.error(err);
        }
        res.json(pics);
    });

});


router.get('/:hashtags', (req, res) => {
    Picture.find({ hashtags: { $in: req.params.hashtags.split['#'] } }, (err, pics) => {
        if (err) {
            return console.log(err);
        }
        res.json(pics);
    }
    )
});


router.post('/', (req, res) => {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded');
    }
    let picFile = req.files.file;
    const { description } = req.body;
    picFile.mv(`./public/images/${picFile.name}`, err => {
        if (err) {
            return res.status(500).send(err);
        }
        // save the picture to the mongodb
        const pic = new Picture({
            file: `http://localhost:5001/public/images/${picFile.name}`,
            description,
            hashtags: req.body.hashtags.split('#').slice(1)
        });
        pic.save((err, pic) => {
            if (err) {
                return console.error(err);
            }
            return res.json({
                message: "success",
            });
        });
    })
});

module.exports = router;