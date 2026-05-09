const mongoose = require('mongoose');
let courseAssignSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
});
const CourseAssign = mongoose.model('course-assign', courseAssignSchema);
module.exports = CourseAssign;