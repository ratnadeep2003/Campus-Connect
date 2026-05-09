const express = require('express')
const CourseAssign = require('../models/CourseAssignSchema');

const router = express.Router()

// Get All Records
router.get('/', async (req, res) => {

    try {
        let allCourseAssigns = await CourseAssign.find()
            .populate("studentId")
            .populate("courseId")

        res.json({ status: "success", data: allCourseAssigns });
    } catch (err) {
        res.json({ status: 'error', message: err });
    }

});

// Get Sngle Records
router.get('/:id', async (req, res) => {

    try {

        const studentId = req.params.id;
        // console.log(studentId);

        let singleCourseAssign = await CourseAssign.find({ studentId: studentId })
            .populate('courseId');

        res.json({ status: 'success', data: singleCourseAssign })
    } catch (err) {
        res.json({ status: 'error', message: err });
    }

});

// Create Record
router.post('/', async (req, res) => {

    try {

        const data = req.body;

        let courseAssignData = await CourseAssign.create(data)

        res.json({ "status": 'success', "data": courseAssignData });

    } catch (err) {
        res.json({ status: 'error', message: err });
    }

});

// Update Record
router.put('/:id', async (req, res) => {

    try {

        const data = req.body;
        const courseAssignId = req.params.id;

        const updatedRecord = await CourseAssign.findByIdAndUpdate(courseAssignId, data, { new: true })

        res.json({ "status": "success", "data": updatedRecord });

    } catch (err) {
        res.json({ status: 'error', message: err });
    }


});

// Delete Record
router.delete('/:id', async (req, res) => {

    try {

        const courseAssignId = req.params.id;

        const deletedRecord = await CourseAssign.findByIdAndDelete(courseAssignId, { new: true });

        res.json({ "status": "success", "data": deletedRecord });

    } catch (err) {
        res.json({ status: 'error', message: err });
    }


});

module.exports = router;

