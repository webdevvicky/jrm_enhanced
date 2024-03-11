
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); 
const app = express();
const routeIndex = require('./routes/routeIndex/index')
const authRoutes = require('./routes/auth')


app.use(bodyParser.json());


// cors setting for cross origin requests

const ORIGIN = process.env.ORIGIN || "http://localhost:5173"

app.use(cors({
    origin: ORIGIN , 
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization','id','role'],
}));

// required for environment variables loading 
require('dotenv').config();

const PORT = process.env.PORT || 3000

mongoose.connect('mongodb://127.0.0.1/jrmdb');


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));





 app.use('/',routeIndex)


 app.listen(PORT,()=>{
    console.log("app running sucesfully with port "+ PORT)
})



