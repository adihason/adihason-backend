const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const picturesRouter = require("./routes/pictures");
const searchRouter = require("./routes/search");
const mongoose = require('mongoose');
const cors = require ('cors');
const fileUpload = require('express-fileupload');
const app = express();

const PORT = 5001;

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.static(path.join("../frontend")));
app.use('/public/images', express.static('public/images'));
app.use("/pictures", picturesRouter);
app.use("/search", searchRouter);

mongoose.connect('mongodb://localhost:27017/Pictures', {useNewUrlParser: true})
.then(result => {
    app.listen(PORT, () => {
        console.log('server is running port: ' + PORT);
    });
})
.catch(err => {
    console.log(err);
});


module.exports = app;