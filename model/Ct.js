const mongoose = require('mongoose');

const ctSchema = new mongoose.Schema({
    matric: {
        type: String,
        required: true,
        max:255
    },
    name: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Ct', ctSchema)