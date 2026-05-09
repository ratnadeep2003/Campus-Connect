const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb' }));

mongoose.connect('mongodb://localhost:27017/')
    .then((res) => {
        console.log('Database connect...')
    }).catch((err) => {
        console.log('Database ERROR...')
    });


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/student', require('./routes/studentRoutes'));
app.use('/course', require('./routes/courseRoutes'));
app.use('/course-assign', require('./routes/courseAssignRoutes'));

const port = 8080
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});
