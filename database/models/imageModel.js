const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImagesSchema = new Schema({
    file: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    hashtags: {
        type: Array,
        required: true
    }
}
);

const ImagesModel = mongoose.model('picture', ImagesSchema);
module.exports = ImagesModel;