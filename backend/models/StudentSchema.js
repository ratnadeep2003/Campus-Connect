const mongoose = require('mongoose');

let studentSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    mobile: String
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;