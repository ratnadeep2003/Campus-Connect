const express = require('express')
const Student = require('../models/StudentSchema');

const router = express.Router()


router.get('/', async (req, res) => {

    try {
        let allStudents = await Student.find();

        res.json({ status: "success", data: allStudents });
    } catch (err) {
        res.json({ status: 'error', message: err });
    }

});

router.get('/:id', async (req, res) => {

    try {

        const studentId = req.params.id;
        // console.log(studentId);

        let singleStudent = await Student.findById(studentId);

        res.json({ status: 'success', data: singleStudent })
    } catch (err) {
        res.json({ status: 'error', message: err });
    }

});

router.post('/', async (req, res) => {

    try {

        const data = req.body;

        let StudentData = await Student.create(data)

        res.json({ "status": 'success', "data": StudentData });

    } catch (err) {
        res.json({ status: 'error', message: err });
    }

});

router.put('/:id', async (req, res) => {

    try {

        const data = req.body;
        const studentId = req.params.id;

        const UpdatedRecord = await Student.findByIdAndUpdate(studentId, data, { new: true })

        res.json({ "status": "success", "data": UpdatedRecord });

    } catch (err) {
        res.json({ status: 'error', message: err });
    }


});

router.delete('/:id', async (req, res) => {

    try {

        const studentId = req.params.id;

        const deleteRecord = await Student.findByIdAndDelete(studentId, { new: true });

        res.json({ "status": "success", "data": deleteRecord });

    } catch (err) {
        res.json({ status: 'error', message: err });
    }


});

module.exports = router;

