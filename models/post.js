const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: 'Title is required',
        minlength: 4,
        maxlength: 150
    },
    body: {
        type: String,
        required: 'body is required',
        minlength: 4,
        maxlength: 2000
    }
});

postSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});

module.exports = mongoose.model("Post", postSchema);