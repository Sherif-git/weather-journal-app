// Setup empty JS object to act as endpoint for all routes


projectData = {};
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})

//GET route

app.get('/all', (req,res) => {
    res.send(projectData);
    projectData = {};
})

//POST route
app.post('/postData', (req,res) => {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }
    console.log(projectData);
})






