const mongoose = require('mongoose');

let courseSchema = mongoose.Schema({
    title: String,
    description: String,
    duration: String,
    fees: String
});

const Course = mongoose.model('course', courseSchema);

module.exports = Course;