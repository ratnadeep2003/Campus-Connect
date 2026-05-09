const express = require('express')
const Course = require('../models/CourseSchema');

const router = express.Router()

// Get All Records
router.get('/', async (req, res) => {

    try {
        let allCourses = await Course.find();

        res.json({ status: "success", data: allCourses });
    } catch (err) {
        res.json({ status: 'error', message: err });
    }

});

// Get Sngle Records
router.get('/:id', async (req, res) => {

    try {

        const courseId = req.params.id;
        // console.log(courseId);

        let singleCourse = await Course.findById(courseId);

        res.json({ status: 'success', data: singleCourse })
    } catch (err) {
        res.json({ status: 'error', message: err });
    }

});

// Create Record
router.post('/', async (req, res) => {

    try {

        const data = req.body;

        let courseData = await Course.create(data)

        res.json({ "status": 'success', "data": courseData });

    } catch (err) {
        res.json({ status: 'error', message: err });
    }

});

// Update Record
router.put('/:id', async (req, res) => {

    try {

        const data = req.body;
        const courseId = req.params.id;

        const updatedRecord = await Course.findByIdAndUpdate(courseId, data, { new: true })

        res.json({ "status": "success", "data": updatedRecord });

    } catch (err) {
        res.json({ status: 'error', message: err });
    }


});

// Delete Record
router.delete('/:id', async (req, res) => {

    try {

        const courseId = req.params.id;

        const deletedRecord = await Course.findByIdAndDelete(courseId, { new: true });

        res.json({ "status": "success", "data": deletedRecord });

    } catch (err) {
        res.json({ status: 'error', message: err });
    }


});

module.exports = router;

